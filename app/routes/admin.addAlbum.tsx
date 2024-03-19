import {
    ActionFunctionArgs, MetaFunction, json, redirect,
    unstable_createMemoryUploadHandler,
    unstable_parseMultipartFormData,
    unstable_createFileUploadHandler,
    unstable_composeUploadHandlers,
} from "@remix-run/node";
import type { LoaderFunctionArgs, NodeOnDiskFile } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { db } from "~/db.server";
import { badRequest } from "~/request.server";
import { requireUser } from "~/sessions.server";

function validateFile(album_file: NodeOnDiskFile) {
    if (album_file == null) {
        return "Отсутствует файл изображения"
    }
}


async function validateName(album_name: string) {
    if (album_name.length == 0) {
        return "Название не может быть пустым"
    }
    const overlap = await db.photoAlbum.findFirst({
        where: {
            name: album_name
        }
    })
    if (overlap !== null) {
        return "Такое имя уже занято"
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
    )
    const form = await unstable_parseMultipartFormData(request, uploadHandler)
    const album_name = form.get("albumName")
    let album_file = form.get("albumFile") as NodeOnDiskFile;
    if (
        typeof album_name !== "string" ||
        album_file.size == null ||
        album_file.size == 0 
    ) {
        return badRequest({
            fieldErrors: null,
            fields: null,
            formError: "Некоторые поля отсутствуют.",
        });
    }
    const fields = { album_name, album_file };
    const fieldErrors = {
        album_file: validateFile(album_file),
        album_name: await validateName(album_name),
    };
    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({
            fieldErrors,
            fields,
            formError: null,
        });
    }
    const new_album = await db.photoAlbum.create({
        data: {
            name: album_name!.toString(),
            thumb: album_file!.name,
        }
    })
    throw redirect("/admin/admin-panel/files")
    return null
}

export async function loader({ request }: LoaderFunctionArgs) {
    const user = requireUser(request, "/admin/");
    const techGroup = await db.techGroup.findMany()
    return json(techGroup)
}

export default function AdminPanel() {
    const action_data = useActionData<typeof action>()
    const techGroups = useLoaderData<typeof loader>()

    const [showGroups, setShowGroups] = useState(false)

    return (
        <>
            <form className="p-3 border rounded d-flex flex-column" method="post" encType="multipart/form-data">
                <div className="d-flex flex-column">
                    <label htmlFor="albumName_id">Название</label>
                    <input type="text" name="albumName" id="albumName_id" defaultValue={action_data?.fields?.album_name} />
                </div>
                {action_data?.fieldErrors?.album_name ? (
                    <div className="p-3 rounded bg-danger mt-2">
                        <p className="text-light fw-bold m-0">{action_data.fieldErrors.album_name}</p>
                    </div>
                ) : null}
                <div className="d-flex flex-column">
                    <label htmlFor="albumFile_id">Файл</label>
                    <input type="file" name="albumFile" id="albumFile_id" />
                </div>
                {action_data?.fieldErrors?.album_file ? (
                    <div className="p-3 rounded bg-danger mt-2">
                        <p className="text-light fw-bold m-0">{action_data.fieldErrors.album_file}</p>
                    </div>
                ) : null}
                <button type="submit" className="btn btn-primary mt-3">Добавить</button>
                <div id="form-error-message">
                    {action_data?.formError ? (
                        <p
                            className="border p-3 rounded border-danger mt-1"
                            role="alert"
                        >
                            {action_data.formError}
                        </p>
                    ) : null}
                </div>
            </form>
        </>
    );
}
