import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";


export async function loader({ params }: LoaderFunctionArgs) {
    const change_id = await db.techImg.findFirst({
        where: {
            id: params.id
        }
    })
    return json(change_id)
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData()
    const old_id = form.get("oldValue")
    const img_id = form.get("imgId")
    const img_name = form.get("imgName")
    let success = false
    const updated_db = await db.techImg.update({
        where: {
            id: old_id!.toString()
        },
        data: {
            id: img_id!.toString(),
            name: img_name?.toString()
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
                    <label htmlFor="imgId_id">ID</label>
                    <input type="text" name="imgId" id="imgId_id" defaultValue={change_id?.id} />
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="imgName_id">Name</label>
                    <input type="text" name="imgName" id="imgName_id" defaultValue={change_id?.name} />
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="imgPath_id">Img</label>
                    <input type="text" name="imgPath" id="imgPath_id" defaultValue={change_id?.img} />
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="imgGroup_id">Img</label>
                    <input type="text" name="imgPath" id="imgPath_id" defaultValue={change_id?.techGroupId !== null ? change_id?.techGroupId : ""} />
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
