import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { SetStateAction, useState } from "react";
import { AdTab } from "~/admin-tabs";
import { db } from "~/db.server";
import { requireUser } from "~/sessions.server";


export async function loader({ request }: LoaderFunctionArgs) {
    const user = await requireUser(request, "/admin/admin-panel")
    const techGroup = await db.techGroup.findMany()
    const techImg = await db.techImg.findMany()
    const tech = await db.tech.findMany()
    return json({ user, tech, techGroup, techImg })
}

export default function AdminPanel() {
    const { user, tech, techGroup, techImg } = useLoaderData<typeof loader>()

    const [tab, setTab] = useState("group")

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
                        <input type="radio" name="tab" id="tabType" value="group" checked={tab == "group"} onChange={onOptionChange} hidden defaultChecked />
                        {"  "}Группы
                    </label>
                    <label className="border rounded p-2 bg-primary text-light admin-tab">
                        <input type="radio" name="tab" id="tabType" value="img" checked={tab == "img"} onChange={onOptionChange} hidden />
                        {"  "}Изображения
                    </label>
                    <label className="border rounded p-2 bg-primary text-light admin-tab">
                        <input type="radio" name="tab" id="tabType" value="tech" checked={tab == "tech"} onChange={onOptionChange} hidden />
                        {"  "}Оборудование
                    </label>
                </fieldset>
                <div className="d-flex flex-column p-2">
                    {tab == "group" ? <>
                        <h1>Группы</h1>
                        <div className="d-flex flex-column p-3 border rounded">
                            {techGroup.map((El) => {
                                return (<>
                                    <div className="d-flex flex-row border-bottom panel-row" key={El.id + "_div"}>
                                        <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_id"}>{El.id}</p>
                                        <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_name"}>{El.name}</p>
                                        <a href={"/admin/delGroup/" + El.id} className="text-light m-0 p-2 bg-danger">Удалить</a>
                                        <a href={"/admin/chgGroup/" + El.id} className="text-light m-0 p-2 bg-success">Редактировать</a>
                                    </div>
                                </>)
                            })}
                            <a href={"/admin/addGroup/"} className="p-3 m-0 bg-success text-light mt-2">Создать группу</a>
                        </div>
                    </> : tab == "img" ? <>
                        <h1>Изображения</h1>
                        <div className="d-flex flex-column p-3 border rounded">
                            {techImg.map((El) => {
                                return (<>
                                    <div className="d-flex flex-row border-bottom panel-row" key={El.id + "_div"}>
                                        <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_id"}>{El.id}</p>
                                        <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_name"}>{El.name}</p>
                                        <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_img"}>{El.img}</p>
                                        <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_grp"}>
                                            {techGroup.find((haystack) => {
                                                return haystack.id == El.techGroupId
                                            })?.name}
                                        </p>
                                        <a href={"/admin/delImg/" + El.id} className="text-light m-0 p-2 bg-danger">Удалить</a>
                                        <a href={"/admin/chgImg/" + El.id} className="text-light m-0 p-2 bg-success">Редактировать</a>
                                    </div>
                                </>)
                            })}
                            <a href={"/admin/addImg/"} className="p-3 m-0 bg-success text-light mt-2">Создать изображение</a>
                        </div>
                    </> : <>
                    <h1>Техника</h1>
                        <div className="d-flex flex-column p-3 border rounded">
                            {tech.map((El) => {
                                return (<>
                                    <div className="d-flex flex-row border-bottom panel-row" key={El.id + "_div"}>
                                        <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_id"}>{El.id}</p>
                                        <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_name"}>{El.name}</p>
                                        <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_img"}>{El.quant}</p>
                                        <p className="border-end p-2 m-0" style={{ width: "400px" }} key={El.id + "_grp"}>
                                            {techGroup.find((haystack) => {
                                                return haystack.id == El.techGroupId
                                            })?.name}
                                        </p>
                                        <a href={"/admin/delTech/" + El.id} className="text-light m-0 p-2 bg-danger">Удалить</a>
                                        <a href={"/admin/chgTech/" + El.id} className="text-light m-0 p-2 bg-success">Редактировать</a>
                                    </div>
                                </>)
                            })}
                            <a href={"/admin/addTech/"} className="p-3 m-0 bg-success text-light mt-2">Создать технику</a>
                        </div>
                    </>}
                </div>
            </form>
        </>
    );
}
