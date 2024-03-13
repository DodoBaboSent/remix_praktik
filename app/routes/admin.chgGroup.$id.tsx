import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";


export async function loader({ params }: LoaderFunctionArgs) {
    const change_id = await db.techGroup.findFirst({
        where: {
            id: params.id
        }
    })
    return json(change_id)
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData()
    const old_id = form.get("oldValue")
    const group_id = form.get("groupId")
    const group_name = form.get("groupName")
    let success = false
    const updated_db = await db.techGroup.update({
        where: {
            id: old_id!.toString()
        },
        data: {
            id: group_id!.toString(),
            name: group_name?.toString()
        }
    }).finally(() => {
        success = true
    })
    return json({ updated_db, success })
}

export default function AdminPanel() {
    const change_id = useLoaderData<typeof loader>()
    const data = useActionData<typeof action>()


    return (
        <>
            <form className="d-flex flex-column p-3 border rounded" method="post">
                <input type="text" name="oldValue" id="oldValue_id" hidden value={change_id?.id} />
                <div className="d-flex flex-column">
                    <label htmlFor="groupId_id">ID</label>
                    <input type="text" name="groupId" id="groupId_id" defaultValue={change_id?.id} />
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="groupName_id">Name</label>
                    <input type="text" name="groupName" id="groupName_id" defaultValue={change_id?.name} />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Сохранить изменения</button>
            </form>
            {data?.success == true ? <>
                <div className="d-flex flex-column border rounded mt-3 p-3">
                    <p className="p-3 rounded bg-success text-light m-0">Изменения внесены успешно</p>
                </div>
            </> : <></>}
        </>
    );
}
