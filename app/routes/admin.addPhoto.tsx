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
import { validateFile } from "~/validators.server";

async function validateGroup(photo_group: string){
    const techGroup = await db.photoAlbum.findMany()
    if (!techGroup.find((haystack) => haystack.id == photo_group)) {
        return "Альбом не найден"
    }
}

async function validateName(photo_name: string) {
    if (photo_name.length == 0) {
        return "Название не может быть пустым"
    }
    const overlap = await db.img.findFirst({
        where: {
            name: photo_name
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
    const photo_name = form.get("photoName")
    let photo_file = form.get("photoFile") as NodeOnDiskFile;
    const photo_group = form.get("photoGroup")
    if (
        typeof photo_name !== "string" ||
        photo_file.size == null ||
        photo_file.size == 0 ||
        typeof photo_group !== "string"
    ) {
        return badRequest({
            fieldErrors: null,
            fields: null,
            formError: "Некоторые поля отсутствуют.",
        });
    }
    const fields = { photo_name, photo_file, photo_group };
    const fieldErrors = {
        photo_file: validateFile(photo_file),
        photo_name: await validateName(photo_name),
        photo_group: await validateGroup(photo_group)
    };
    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({
            fieldErrors,
            fields,
            formError: null,
        });
    }
    const new_photo = await db.img.create({
        data: {
            name: photo_name!.toString(),
            filePath: photo_file!.name,
            photoAlbumId: photo_group!.toString(),
        }
    })
    throw redirect("/admin/admin-panel/files")
    return null
}

export async function loader({ request }: LoaderFunctionArgs) {
    const techGroup = await db.photoAlbum.findMany()
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
                    <label htmlFor="photoName_id">Название</label>
                    <input type="text" name="photoName" id="photoName_id" defaultValue={action_data?.fields?.photo_name} />
                </div>
                {action_data?.fieldErrors?.photo_name ? (
                    <div className="p-3 rounded bg-danger mt-2">
                        <p className="text-light fw-bold m-0">{action_data.fieldErrors.photo_name}</p>
                    </div>
                ) : null}
                <div className="d-flex flex-column">
                    <label htmlFor="photoFile_id">Файл</label>
                    <input type="file" name="photoFile" id="photoFile_id" />
                </div>
                {action_data?.fieldErrors?.photo_file ? (
                    <div className="p-3 rounded bg-danger mt-2">
                        <p className="text-light fw-bold m-0">{action_data.fieldErrors.photo_file}</p>
                    </div>
                ) : null}
                <div className="d-flex flex-column">
                    <label htmlFor="photoGroup_id">Группа</label>
                    <input type="text" name="photoGroup" id="photoGroup_id" />
                </div>
                {action_data?.fieldErrors?.photo_group ? (
                    <div className="p-3 rounded bg-danger mt-2">
                        <p className="text-light fw-bold m-0">{action_data.fieldErrors.photo_group}</p>
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
            {showGroups ? <>
                <div className="border rounded p-3 d-flex flex-row mt-2 hover-cursor" onClick={() => setShowGroups(false)}>
                    <p className="fw-bold m-0">▼ Нажмите, чтобы скрыть список групп</p>
                </div>
                <h1>Группы</h1>
                <div className="d-flex flex-column p-3 border rounded">
                    {techGroups.map((El) => {
                        return (<>
                            <div className="d-flex flex-row border-bottom panel-row" key={El.id + "_div"}>
                                <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_id"}>{El.id}</p>
                                <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_name"}>{El.name}</p>
                            </div>
                        </>)
                    })}
                </div>
            </> : <>
                <div className="border rounded p-3 d-flex flex-row mt-2 hover-cursor" onClick={() => setShowGroups(true)}>
                    <p className="fw-bold m-0">▼ Нажмите, чтобы раскрыть список групп</p>
                </div>
            </>}
        </>
    );
}
