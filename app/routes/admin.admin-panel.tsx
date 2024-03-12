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
        { name: "test2", link: "" },
    ]

    return (
        <>
            <h1>{user?.username}</h1>
            <h1>{user?.role}</h1>
            <div className="d-flex flex-column border rounded p-2">
                <AdTab href={tabs} />
                <Outlet></Outlet>
            </div>
        </>
    );
}
