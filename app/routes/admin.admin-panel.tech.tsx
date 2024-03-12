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
    return json({user, tech, techGroup, techImg})
}

export default function AdminPanel() {
    const {user, tech, techGroup, techImg} = useLoaderData<typeof loader>()

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
                        <input type="radio" name="tab" id="tabType" value="group" checked={tab == "group"} onChange={onOptionChange} hidden/>
                        {"  "}Группы
                    </label>
                    <label className="border rounded p-2 bg-primary text-light admin-tab">
                        <input type="radio" name="tab" id="tabType" value="img" checked={tab == "img"} onChange={onOptionChange} hidden/>
                        {"  "}Изображения
                    </label>
                    <label className="border rounded p-2 bg-primary text-light admin-tab">
                        <input type="radio" name="tab" id="tabType" value="tech" checked={tab == "tech"} onChange={onOptionChange} hidden/>
                        {"  "}Оборудование
                    </label>
                </fieldset>
            </form>
        </>
    );
}
