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

export async function loader({ params }: LoaderFunctionArgs) {
  const change_id = await db.img.findFirst({
    where: {
      id: params.id,
    },
  });
  const techGroup = await db.photoAlbum.findMany();
  return json({ change_id, techGroup });
}

function validateFile(photo_file: NodeOnDiskFile) {
  return null;
}

async function validateGroup(photo_group: string) {
  const techGroup = await db.photoAlbum.findMany();
  if (!techGroup.find((haystack) => haystack.id == photo_group)) {
    return "Альбом не найден";
  }
}

async function validateId(photo_id: string, old_id: string) {
  if (photo_id.length == 0) {
    return "ID не может быть пустым";
  }
  if (photo_id !== old_id) {
    const overlap = await db.img.findFirst({
      where: {
        id: photo_id,
      },
    });
    if (overlap !== null) {
      return "Такой ID уже занят";
    }
  }
}

async function validateName(photo_name: string, old_name: string) {
  if (photo_name.length == 0) {
    return "Название не может быть пустым";
  }
  if (photo_name !== old_name) {
    const overlap = await db.img.findFirst({
      where: {
        name: photo_name,
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
  const photo_id = form.get("photoId");
  let photo_file = form.get("photoPath") as NodeOnDiskFile;
  const group_id = form.get("photoGroup");
  const photo_name = form.get("photoName");
  if (
    typeof photo_name !== "string" ||
    typeof group_id !== "string" ||
    typeof photo_id !== "string" ||
    typeof old_id !== "string" ||
    typeof old_name !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Некоторые поля отсутствуют.",
    });
  }
  const fields = { photo_name, photo_file, group_id, photo_id };
  const fieldErrors = {
    photo_file: validateFile(photo_file),
    photo_id: await validateId(photo_id, old_id),
    photo_name: await validateName(photo_name, old_name),
    photo_group: await validateGroup(group_id),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }
  if (photo_file.size !== 0 || photo_file !== null) {
    if (photo_file.name == "") {
        const updated_db = await db.img.update({
            where: {
              id: old_id!.toString(),
            },
            data: {
              id: photo_id!.toString(),
              name: photo_name!.toString(),
              photoAlbumId: group_id!.toString(),
            },
          });
    } else {
      const updated_db = await db.img.update({
        where: {
          id: old_id!.toString(),
        },
        data: {
          id: photo_id!.toString(),
          name: photo_name!.toString(),
          filePath: photo_file.name,
          photoAlbumId: group_id!.toString(),
        },
      });
    }
  } else {
    const updated_db = await db.img.update({
      where: {
        id: old_id!.toString(),
      },
      data: {
        id: photo_id!.toString(),
        name: photo_name!.toString(),
        photoAlbumId: group_id!.toString(),
      },
    });
  }
  throw redirect("/admin/admin-panel/files");
  return null;
}

export default function AdminPanel() {
  const { change_id, techGroup } = useLoaderData<typeof loader>();
  const action_data = useActionData<typeof action>();

  const [showGroups, setShowGroups] = useState(false);

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
          <label htmlFor="photoId_id">ID</label>
          <input
            type="text"
            name="photoId"
            id="photoId_id"
            defaultValue={change_id?.id}
          />
          {action_data?.fieldErrors?.photo_id ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.photo_id}
              </p>
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="photoName_id">Name</label>
          <input
            type="text"
            name="photoName"
            id="photoName_id"
            defaultValue={change_id?.name}
          />
          {action_data?.fieldErrors?.photo_name ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.photo_name}
              </p>
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="photoPath_id">Photo</label>
          <input type="file" name="photoPath" id="photoPath_id" />
          {action_data?.fieldErrors?.photo_file ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.photo_file}
              </p>
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="photoGroup_id">Album</label>
          <input
            type="text"
            name="photoGroup"
            id="photoGroup_id"
            defaultValue={
              change_id?.photoAlbumId !== null ? change_id?.photoAlbumId : ""
            }
          />
          {action_data?.fieldErrors?.photo_group ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.photo_group}
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
      {showGroups ? (
        <>
          <div
            className="border rounded p-3 d-flex flex-row mt-2 hover-cursor"
            onClick={() => setShowGroups(false)}
          >
            <p className="fw-bold m-0">
              ▼ Нажмите, чтобы скрыть список альбомов
            </p>
          </div>
          <h1>Группы</h1>
          <div className="d-flex flex-column p-3 border rounded">
            {techGroup.map((El) => {
              return (
                <>
                  <div
                    className="d-flex flex-row border-bottom panel-row"
                    key={El.id + "_div"}
                  >
                    <p
                      className="border-end p-2 m-0"
                      style={{ width: "400px" }}
                      key={El.id + "_id"}
                    >
                      {El.id}
                    </p>
                    <p
                      className="border-end p-2 m-0"
                      style={{ width: "400px" }}
                      key={El.id + "_name"}
                    >
                      {El.name}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div
            className="border rounded p-3 d-flex flex-row mt-2 hover-cursor"
            onClick={() => setShowGroups(true)}
          >
            <p className="fw-bold m-0">
              ▼ Нажмите, чтобы раскрыть список альбомов
            </p>
          </div>
        </>
      )}
    </>
  );
}
