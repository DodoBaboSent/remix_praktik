import { LoaderFunctionArgs, MetaFunction, json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { db } from "~/db.server";
import { requireUser } from "~/sessions.server";


export async function loader({ params, request }: LoaderFunctionArgs) {
    const user = requireUser(request, "/admin/")
    const delete_id = await db.user.delete({
        where: {
            id: params.id
        }
    }).finally(() => {
        console.log("Deleted")
    })
    return json(params)
}

export default function AdminPanel() {
    const params = useLoaderData<typeof loader>()

    const [countDown, setCountDown] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        countDown > 0 && setTimeout(() => setCountDown(countDown - 1), 1000)
        if (countDown <= 0) {
            navigate("/admin/admin-panel/users")
        }
    }, [countDown])

    return (
        <>
            <h1>Пользователь {params.id} разрегистрирован</h1>
            <p>Переход на предыдущую страницу через: {countDown}</p>
        </>
    );
}
