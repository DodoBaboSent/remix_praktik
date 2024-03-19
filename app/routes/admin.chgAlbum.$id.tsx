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
import { useState } from "react";
import { db } from "~/db.server";
import { badRequest } from "~/request.server";
import { requireUser } from "~/sessions.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const user = requireUser(request, "/admin/");
  const change_id = await db.photoAlbum.findFirst({
    where: {
      id: params.id,
    },
  });
  return json({ change_id });
}

function validateFile(album_file: NodeOnDiskFile) {
  return null;
}

async function validateId(album_id: string, old_id: string) {
  if (album_id.length == 0) {
    return "ID не может быть пустым";
  }
  if (album_id !== old_id) {
    const overlap = await db.photoAlbum.findFirst({
      where: {
        id: album_id,
      },
    });
    if (overlap !== null) {
      return "Такой ID уже занят";
    }
  }
}

async function validateName(album_name: string, old_name: string) {
  if (album_name.length == 0) {
    return "Название не может быть пустым";
  }
  if (album_name !== old_name) {
    const overlap = await db.photoAlbum.findFirst({
      where: {
        name: album_name,
      },
    });
    if (overlap !== null) {
      return "Такое имя уже занято";
    }
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 30_000_000,
      file: ({ filename }) => filename,
      directory: "./public/assets",
      avoidFileConflicts: false,
      filter({ contentType }) {
        return contentType.includes("image");
      },
    }),
    unstable_createMemoryUploadHandler()
  );
  const form = await unstable_parseMultipartFormData(request, uploadHandler);
  const old_id = form.get("oldValue");
  const old_name = form.get("oldName");
  const album_id = form.get("albumId");
  let album_file = form.get("albumPath") as NodeOnDiskFile;
  const album_name = form.get("albumName");
  if (
    typeof album_name !== "string" ||
    typeof album_id !== "string" ||
    typeof old_id !== "string" ||
    typeof old_name !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Некоторые поля отсутствуют.",
    });
  }
  const fields = { album_name, album_file, album_id };
  const fieldErrors = {
    album_file: validateFile(album_file),
    album_id: await validateId(album_id, old_id),
    album_name: await validateName(album_name, old_name),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }
  if (
    album_file.size !== 0 ||
    album_file.name != "" ||
    album_file.name.length !== 0 ||
    album_file.name !== null ||
    typeof album_file.name == "string" ||
    album_file !== null
  ) {
    if (album_file.name == "") {
      const old_img = await db.photoAlbum.findFirst({
        where: {
          id: old_id,
        },
      });
      const updated_db = await db.photoAlbum.update({
        where: {
          id: old_id!.toString(),
        },
        data: {
          id: album_id!.toString(),
          name: album_name!.toString(),
          thumb: old_img?.thumb,
        },
      });
    } else {
      const updated_db = await db.photoAlbum.update({
        where: {
          id: old_id!.toString(),
        },
        data: {
          id: album_id!.toString(),
          name: album_name!.toString(),
          thumb: album_file.name,
        },
      });
    }
  } else {
    console.log("Имя нет");
    const old_img = await db.photoAlbum.findFirst({
      where: {
        id: old_id,
      },
    });
    const updated_db = await db.photoAlbum.update({
      where: {
        id: old_id!.toString(),
      },
      data: {
        id: album_id!.toString(),
        name: album_name!.toString(),
        thumb: old_img?.thumb,
      },
    });
  }
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
          value={change_id?.name}
        />
        <div className="d-flex flex-column">
          <label htmlFor="albumId_id">ID</label>
          <input
            type="text"
            name="albumId"
            id="albumId_id"
            defaultValue={change_id?.id}
          />
          {action_data?.fieldErrors?.album_id ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.album_id}
              </p>
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="albumName_id">Name</label>
          <input
            type="text"
            name="albumName"
            id="albumName_id"
            defaultValue={change_id?.name}
          />
          {action_data?.fieldErrors?.album_name ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.album_name}
              </p>
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="albumPath_id">Thumb</label>
          <input type="file" name="albumPath" id="albumPath_id" />
          {action_data?.fieldErrors?.album_file ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.album_file}
              </p>
            </div>
          ) : null}
        </div>
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
    </>
  );
}
