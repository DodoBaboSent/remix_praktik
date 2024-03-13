import { ActionFunctionArgs, MetaFunction, json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { db } from "~/db.server";
import { badRequest } from "~/request.server";

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData()
    const group_name = form.get("groupName")
    if (typeof group_name !== "string") {
        return badRequest({
            fields: group_name,
            fieldErrors: "Ошибка",
            formError: null
        })
    }
    if (group_name.length == 0) {
        return badRequest({
            fields: group_name,
            fieldErrors: "Название не может быть пустым",
            formError: null
        })
    } else {
        const new_group = await db.techGroup.create({
            data: {
                name: group_name!.toString()
            }
        })
        throw redirect("/admin/admin-panel/tech")
    }
    return null
}

export default function AdminPanel() {
    const action_data = useActionData<typeof action>()

    return (
        <>
            <form className="p-3 border rounded d-flex flex-column" method="post">
                <div className="d-flex flex-column">
                    <label htmlFor="groupName_id">Название</label>
                    <input type="text" name="groupName" id="groupName_id" defaultValue={action_data?.fields?.toString()} />
                </div>
                {action_data?.fieldErrors ? <>
                    <div className="p-3 rounded bg-danger">
                        <p className="text-light fw-bold m-0">{action_data.fieldErrors}</p>
                    </div>
                </> : null}
                <button type="submit" className="btn btn-primary mt-3">Добавить</button>
            </form>
        </>
    );
}
