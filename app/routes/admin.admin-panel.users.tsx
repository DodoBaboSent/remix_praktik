import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { SetStateAction, useState } from "react";
import { AdTab } from "~/admin-tabs";
import { db } from "~/db.server";
import { requireUser } from "~/sessions.server";


export async function loader({ request }: LoaderFunctionArgs) {
    const user = await requireUser(request, "/admin/admin-panel")
    const user_db = await db.user.findMany()
    return json({ user, user_db })
}

export default function AdminPanel() {
    const { user, user_db } = useLoaderData<typeof loader>()

    const [tab, setTab] = useState("users")

    const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTab(e.target.value)
        console.log(e.target.value)
    }

    return (
        <>
            <form method="post">
                <fieldset>
                    <legend>Оснащение</legend>
                    <label className="border rounded p-2 bg-primary text-light admin-tab">
                        <input type="radio" name="tab" id="tabType" value="users" checked={tab == "users"} onChange={onOptionChange} hidden defaultChecked />
                        {"  "}Пользователи
                    </label>
                </fieldset>
                <div className="d-flex flex-column p-2">
                    {tab == "users" ? <>
                        <h1>Пользователи</h1>
                        <div className="d-flex flex-column p-3 border rounded" style={{overflowX: "scroll"}}>
                            {user_db.map((El) => {
                                return (<>
                                    <div className="d-flex flex-row border-bottom panel-row" key={El.id + "_div"} style={{width: "max-content"}}>
                                        <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_id"}>{El.id}</p>
                                        <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_name"}>{El.username}</p>
                                        <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_name"}>{El.role}</p>
                                        <p className="border-end p-2 m-0" style={{ width: "600px" }} key={El.id + "_name"}>{El.passwordHash}</p>
                                        <a href={"/admin/delUser/" + El.id} className="text-light m-0 p-2 bg-danger">Удалить</a>
                                        <a href={"/admin/chgUser/" + El.id} className="text-light m-0 p-2 bg-success">Редактировать</a>
                                    </div>
                                </>)
                            })}
                            <a href={"/admin/addUser/"} className="p-3 m-0 bg-success text-light mt-3 rounded" style={{width: "max-content"}}>Создать пользователя</a>
                        </div>
                    </> : null }
                </div>
            </form>
        </>
    );
}
