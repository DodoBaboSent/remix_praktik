import { LoaderFunctionArgs, MetaFunction, json} from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { requireUser } from "~/sessions.server";


export async function loader({request}:LoaderFunctionArgs) {
    const user = await requireUser(request, "/admin/admin-panel")
    return json(user)
}

export default function AdminPanel() {
    const user = useLoaderData<typeof loader>()

    return (
        <>
            <h1>{user?.username}</h1>
            <h1>{user?.role}</h1>
        </>
    );
}
