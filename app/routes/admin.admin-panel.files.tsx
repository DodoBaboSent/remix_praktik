import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { SetStateAction, useState } from "react";
import { AdTab } from "~/admin-tabs";
import { db } from "~/db.server";
import { requireUser } from "~/sessions.server";


export async function loader({ request }: LoaderFunctionArgs) {
    const user = await requireUser(request, "/admin/admin-panel")
    const files = await db.file.findMany()
    return json({ user, files })
}

export default function AdminPanel() {
    const { user, files } = useLoaderData<typeof loader>()

    const [tab, setTab] = useState("files")

    const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTab(e.target.value)
        console.log(e.target.value)
    }

    return (
        <>
            <form method="post">
                <fieldset>
                    <legend>Управление файлами</legend>
                    <label className="border rounded p-2 bg-primary text-light admin-tab">
                        <input type="radio" name="tab" id="tabType" value="files" checked={tab == "files"} onChange={onOptionChange} hidden />
                        {"  "}Файлы
                    </label>
                </fieldset>
                <div className="d-flex flex-column p-2">
                    {tab == "files" ? <>
                        <h1>Файлы</h1>
                        <div className="d-flex flex-column p-3 border rounded">
                            {files.map((El) => {
                                return (<>
                                    <div className="d-flex flex-row border-bottom panel-row" key={El.id + "_div"}>
                                        <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_id"}>{El.id}</p>
                                        <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_name"}>{El.fileName}</p>
                                        <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_path"}>{El.filePath}</p>
                                        <a href={"/admin/delFile/" + El.id} className="text-light m-0 p-2 bg-danger">Удалить</a>
                                        <a href={"/admin/chgFile/" + El.id} className="text-light m-0 p-2 bg-success">Редактировать</a>
                                    </div>
                                </>)
                            })}
                            <a href={"/admin/addFile/"} className="p-3 m-0 bg-success text-light mt-2">Добавить файлы</a>
                        </div>
                    </> : <></>}
                </div>
            </form>
        </>
    );
}
