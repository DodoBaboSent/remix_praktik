import { LoaderFunctionArgs, ActionFunctionArgs, json, unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData, NodeOnDiskFile, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { db } from "~/db.server";
import { badRequest } from "~/request.server";
import { requireUser } from "~/sessions.server";
import { TechGroups } from "~/tech_groups";


export async function loader({ params, request }: LoaderFunctionArgs) {
    const user = requireUser(request, "/admin/")
    const change_id = await db.techImg.findFirst({
        where: {
            id: params.id
        }
    })
    const techGroup = await db.techGroup.findMany()
    return json({ change_id, techGroup })
}

function validateFile(img_file: NodeOnDiskFile) {
    if (img_file == null) {
        return "Отсутствует файл изображения"
    }
}

async function validateGroup(img_group: string) {
    const techGroup = await db.techGroup.findMany()
    if (!techGroup.find((haystack) => haystack.id == img_group)) {
        return "Группа не найдена"
    }
}

async function validateId(img_id: string, old_id: string) {
    if (img_id.length == 0) {
        return "ID не может быть пустым"
    }
    if (img_id !== old_id) {
        const overlap = await db.techImg.findFirst({
            where: {
                id: img_id
            }
        })
        if (overlap !== null) {
            return "Такой ID уже занят"
        }
    }
}

async function validateName(img_name: string, old_name: string) {
    if (img_name.length == 0) {
        return "Название не может быть пустым"
    }
    if (img_name !== old_name) {
        const overlap = await db.techImg.findFirst({
            where: {
                name: img_name
            }
        })
        if (overlap !== null) {
            return "Такое имя уже занято"
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
    )
    const form = await unstable_parseMultipartFormData(request, uploadHandler)
    const old_id = form.get("oldValue")
    const old_name = form.get("oldName")
    const img_id = form.get("imgId")
    let img_file = form.get("imgPath") as NodeOnDiskFile
    const group_id = form.get("imgGroup")
    const img_name = form.get("imgName")
    if (
        typeof img_name !== "string" ||
        img_file.size == null ||
        img_file.size == 0 ||
        typeof group_id !== "string" ||
        typeof img_id !== "string" ||
        typeof old_id !== "string" ||
        typeof old_name !== "string"
    ) {
        return badRequest({
            fieldErrors: null,
            fields: null,
            formError: "Некоторые поля отсутствуют.",
        });
    }
    const fields = { img_name, img_file, group_id, img_id };
    const fieldErrors = {
        img_file: validateFile(img_file),
        img_id: await validateId(img_id, old_id),
        img_name: await validateName(img_name, old_name),
        img_group: await validateGroup(group_id)
    };
    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({
            fieldErrors,
            fields,
            formError: null,
        });
    }
    const updated_db = await db.techImg.update({
        where: {
            id: old_id!.toString()
        },
        data: {
            id: img_id!.toString(),
            name: img_name!.toString(),
            img: img_file.name,
            techGroupId: group_id!.toString()
        }
    })
    throw redirect("/admin/admin-panel/tech")
    return null
}

export default function AdminPanel() {
    const { change_id, techGroup } = useLoaderData<typeof loader>()
    const action_data = useActionData<typeof action>()


    return (
        <>
            <form className="d-flex flex-column p-3 border rounded" method="post" encType="multipart/form-data">
                <input type="text" name="oldValue" id="oldValue_id" hidden value={change_id?.id} />
                <input type="text" name="oldName" id="oldName_id" hidden value={change_id?.name} />
                <div className="d-flex flex-column">
                    <label htmlFor="imgId_id">ID</label>
                    <input type="text" name="imgId" id="imgId_id" defaultValue={change_id?.id} />
                    {action_data?.fieldErrors?.img_id ? (
                        <div className="p-3 rounded bg-danger mt-2">
                            <p className="text-light fw-bold m-0">{action_data.fieldErrors.img_id}</p>
                        </div>
                    ) : null}
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="imgName_id">Name</label>
                    <input type="text" name="imgName" id="imgName_id" defaultValue={change_id?.name} />
                    {action_data?.fieldErrors?.img_name ? (
                        <div className="p-3 rounded bg-danger mt-2">
                            <p className="text-light fw-bold m-0">{action_data.fieldErrors.img_name}</p>
                        </div>
                    ) : null}
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="imgPath_id">Img</label>
                    <input type="file" name="imgPath" id="imgPath_id" />
                    {action_data?.fieldErrors?.img_file ? (
                        <div className="p-3 rounded bg-danger mt-2">
                            <p className="text-light fw-bold m-0">{action_data.fieldErrors.img_file}</p>
                        </div>
                    ) : null}
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="imgGroup_id">Group</label>
                    <input type="text" name="imgGroup" id="imgGroup_id" defaultValue={change_id?.techGroupId !== null ? change_id?.techGroupId : ""} />
                    {action_data?.fieldErrors?.img_group ? (
                        <div className="p-3 rounded bg-danger mt-2">
                            <p className="text-light fw-bold m-0">{action_data.fieldErrors.img_group}</p>
                        </div>
                    ) : null}
                </div>
                <button type="submit" className="btn btn-primary mt-3">Сохранить изменения</button>
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
            <TechGroups techGroup={techGroup}/>
        </>
    );
}
