import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { AdTab } from "~/admin-tabs";
import { requireUser } from "~/sessions.server";


export async function loader({ request }: LoaderFunctionArgs) {
    const user = await requireUser(request, "/admin/admin-panel")
    return json(user)
}

export default function AdminPanel() {
    const user = useLoaderData<typeof loader>()

    const tabs: { name: string, link: string }[] = [
        { name: "Оснащение", link: "tech/" },
        { name: "Файлы", link: "files/" },
        { name: "Новости", link: "news/" },
    ]

    return (
        <>
            <h1>Панель администратора</h1>
            <h3>Уровень пользователя: {user?.role}</h3>
            <div className="d-flex flex-column border rounded p-2">
                <AdTab href={tabs} />
                <Outlet></Outlet>
            </div>
        </>
    );
}
