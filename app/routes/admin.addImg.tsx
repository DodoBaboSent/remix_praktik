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
import { TechGroups } from "~/tech_groups";

function validateFile(img_file: NodeOnDiskFile) {
    if (img_file == null) {
        return "Отсутствует файл изображения"
    }
}

async function validateGroup(img_group: string){
    const techGroup = await db.techGroup.findMany()
    if (!techGroup.find((haystack) => haystack.id == img_group)) {
        return "Группа не найдена"
    }
}

async function validateName(img_name: string) {
    if (img_name.length == 0) {
        return "Название не может быть пустым"
    }
    const overlap = await db.techImg.findFirst({
        where: {
            name: img_name
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
    const img_name = form.get("imgName")
    let img_file = form.get("imgFile") as NodeOnDiskFile;
    const img_group = form.get("imgGroup")
    if (
        typeof img_name !== "string" ||
        img_file.size == null ||
        img_file.size == 0 ||
        typeof img_group !== "string"
    ) {
        return badRequest({
            fieldErrors: null,
            fields: null,
            formError: "Некоторые поля отсутствуют.",
        });
    }
    const fields = { img_name, img_file, img_group };
    const fieldErrors = {
        img_file: validateFile(img_file),
        img_name: await validateName(img_name),
        img_group: await validateGroup(img_group)
    };
    if (Object.values(fieldErrors).some(Boolean)) {
        return badRequest({
            fieldErrors,
            fields,
            formError: null,
        });
    }
    const new_img = await db.techImg.create({
        data: {
            name: img_name!.toString(),
            img: img_file!.name,
            techGroupId: img_group!.toString(),
        }
    })
    throw redirect("/admin/admin-panel/tech")
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

    return (
        <>
            <form className="p-3 border rounded d-flex flex-column" method="post" encType="multipart/form-data">
                <div className="d-flex flex-column">
                    <label htmlFor="imgName_id">Название</label>
                    <input type="text" name="imgName" id="imgName_id" defaultValue={action_data?.fields?.img_name} />
                </div>
                {action_data?.fieldErrors?.img_name ? (
                    <div className="p-3 rounded bg-danger mt-2">
                        <p className="text-light fw-bold m-0">{action_data.fieldErrors.img_name}</p>
                    </div>
                ) : null}
                <div className="d-flex flex-column">
                    <label htmlFor="imgFile_id">Файл</label>
                    <input type="file" name="imgFile" id="imgFile_id" />
                </div>
                {action_data?.fieldErrors?.img_file ? (
                    <div className="p-3 rounded bg-danger mt-2">
                        <p className="text-light fw-bold m-0">{action_data.fieldErrors.img_file}</p>
                    </div>
                ) : null}
                <div className="d-flex flex-column">
                    <label htmlFor="imgGroup_id">Группа</label>
                    <input type="text" name="imgGroup" id="imgGroup_id" />
                </div>
                {action_data?.fieldErrors?.img_group ? (
                    <div className="p-3 rounded bg-danger mt-2">
                        <p className="text-light fw-bold m-0">{action_data.fieldErrors.img_group}</p>
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
            <TechGroups techGroup={techGroups}/>
        </>
    );
}
