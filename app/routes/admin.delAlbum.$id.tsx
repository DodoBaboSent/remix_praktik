import { LoaderFunctionArgs, MetaFunction, json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { db } from "~/db.server";


export async function loader({ params }: LoaderFunctionArgs) {
    const delete_id = await db.photoAlbum.delete({
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
            navigate("/admin/admin-panel/files")
        }
    }, [countDown])

    return (
        <>
            <h1>Альбом {params.id} удален</h1>
            <p>Переход на предыдущую страницу через: {countDown}</p>
        </>
    );
}
