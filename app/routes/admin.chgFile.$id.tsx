import {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  json,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
  NodeOnDiskFile,
  redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";
import { FileLegend } from "~/file_legent";
import { badRequest } from "~/request.server";
import { validateFile, validateType } from "~/validators.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const change_id = await db.file.findFirst({
    where: {
      id: Number(params.id),
    },
  });
  return json({ change_id });
}

async function validateName(name: string, old_name: string) {
  if (name.length == 0) {
    return "Название не может быть пустым";
  }
  if (name !== old_name) {
    const overlap = await db.file.findFirst({
      where: {
        fileName: name,
      },
    });
    if (overlap !== null) {
      return "Такое имя уже занято";
    }
  }
}

async function validateId(id: string, old_id: string) {
  if (id.length == 0) {
    return "ID не может быть пустым";
  }
  if (id !== old_id) {
    const overlap = await db.file.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (overlap !== null) {
      return "Такой ID уже занят";
    }
  }
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
  const old_id = form.get("oldValue");
  const old_name = form.get("oldName");
  const file_id = form.get("fileId");
  const typeFile = form.get("typeFile");
  let file_file = form.get("filePath") as NodeOnDiskFile;
  const file_name = form.get("fileName");
  if (
    typeof file_name !== "string" ||
    file_file.size == null ||
    file_file.size == 0 ||
    typeof file_id !== "string" ||
    typeof old_id !== "string" ||
    typeof old_name !== "string" ||
    typeof typeFile !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Некоторые поля отсутствуют.",
    });
  }
  const fields = { file_name, file_file, file_id, typeFile };
  const fieldErrors = {
    img_file: validateFile(file_file),
    img_id: await validateId(file_id, old_id),
    img_name: await validateName(file_name, old_name),
    typeFile: validateType(typeFile)
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }
  const updated_db = await db.file.update({
    where: {
      id: Number(old_id),
    },
    data: {
      id: Number(file_id),
      fileName: file_name!.toString(),
      filePath: file_file.name,
    },
  });
  throw redirect("/admin/admin-panel/files");
  return null;
}

export default function AdminPanel() {
  const { change_id } = useLoaderData<typeof loader>();
  const action_data = useActionData<typeof action>();

  return (
    <>
      <form
        className="d-flex flex-column p-3 border rounded"
        method="post"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="oldValue"
          id="oldValue_id"
          hidden
          value={change_id?.id}
        />
        <input
          type="text"
          name="oldName"
          id="oldName_id"
          hidden
          value={change_id?.fileName}
        />
        <div className="d-flex flex-column">
          <label htmlFor="fileId_id">ID</label>
          <input
            type="text"
            name="fileId"
            id="fileId_id"
            defaultValue={change_id?.id}
          />
          {action_data?.fieldErrors?.img_id ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.img_id}
              </p>
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="fileName_id">Name</label>
          <input
            type="text"
            name="fileName"
            id="fileName_id"
            defaultValue={change_id?.fileName}
          />
          {action_data?.fieldErrors?.img_name ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.img_name}
              </p>
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="filePath_id">Img</label>
          <input type="file" name="filePath" id="filePath_id" />
          {action_data?.fieldErrors?.img_file ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.img_file}
              </p>
            </div>
          ) : null}
        </div>
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
          Сохранить изменения
        </button>
        <div id="form-error-message">
          {action_data?.formError ? (
            <p className="border p-3 rounded border-danger mt-1" role="alert">
              {action_data.formError}
            </p>
          ) : null}
        </div>
      </form>
      <FileLegend/>
    </>
  );
}
