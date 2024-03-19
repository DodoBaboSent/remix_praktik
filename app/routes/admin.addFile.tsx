import {
  ActionFunctionArgs,
  MetaFunction,
  json,
  redirect,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler,
  unstable_composeUploadHandlers,
} from "@remix-run/node";
import type { LoaderFunctionArgs, NodeOnDiskFile } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { db } from "~/db.server";
import { FileLegend } from "~/file_legent";
import { badRequest } from "~/request.server";
import { requireUser } from "~/sessions.server";
import { validateFile, validateName, validateType } from "~/validators.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = requireUser(request, "/admin/");
}

export async function action({ request }: ActionFunctionArgs) {
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 30_000_000,
      file: ({ filename }) => filename,
      directory: "./public/files",
      avoidFileConflicts: false,
    }),
    unstable_createMemoryUploadHandler()
  );
  const form = await unstable_parseMultipartFormData(request, uploadHandler);
  const file_name = form.get("fileName");
  const typeFile = form.get("typeFile");
  let file_file = form.get("fileFile") as NodeOnDiskFile;
  if (
    typeof file_name !== "string" ||
    file_file.size == null ||
    file_file.size == 0 ||
    typeof typeFile !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Некоторые поля отсутствуют.",
    });
  }
  const fields = { file_name, file_file, typeFile };
  const fieldErrors = {
    file_file: validateFile(file_file),
    file_name: await validateName(file_name),
    typeFile: validateType(typeFile),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }
  const new_file = await db.file.create({
    data: {
      fileName: file_name!.toString(),
      filePath: file_file!.name,
      type: typeFile,
    },
  });
  throw redirect("/admin/admin-panel/files");
  return null;
}

export default function AdminPanel() {
  const action_data = useActionData<typeof action>();

  return (
    <>
      <form
        className="p-3 border rounded d-flex flex-column"
        method="post"
        encType="multipart/form-data"
      >
        <div className="d-flex flex-column">
          <label htmlFor="fileName_id">Название</label>
          <input
            type="text"
            name="fileName"
            id="fileName_id"
            defaultValue={action_data?.fields?.file_name}
          />
        </div>
        {action_data?.fieldErrors?.file_name ? (
          <div className="p-3 rounded bg-danger mt-2">
            <p className="text-light fw-bold m-0">
              {action_data.fieldErrors.file_name}
            </p>
          </div>
        ) : null}
        <div className="d-flex flex-column">
          <label htmlFor="fileFile_id">Файл</label>
          <input type="file" name="fileFile" id="fileFile_id" />
        </div>
        {action_data?.fieldErrors?.file_file ? (
          <div className="p-3 rounded bg-danger mt-2">
            <p className="text-light fw-bold m-0">
              {action_data.fieldErrors.file_file}
            </p>
          </div>
        ) : null}
        <div className="d-flex flex-column">
          <label htmlFor="typeFile_id">Тип</label>
          <input type="text" name="typeFile" id="typeFile_id" />
        </div>
        {action_data?.fieldErrors?.typeFile ? (
          <div className="p-3 rounded bg-danger mt-2">
            <p className="text-light fw-bold m-0">
              {action_data.fieldErrors.typeFile}
            </p>
          </div>
        ) : null}
        <button type="submit" className="btn btn-primary mt-3">
          Добавить
        </button>
        <div id="form-error-message">
          {action_data?.formError ? (
            <p className="border p-3 rounded border-danger mt-1" role="alert">
              {action_data.formError}
            </p>
          ) : null}
        </div>
      </form>
      <FileLegend />
    </>
  );
}
