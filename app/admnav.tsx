import { LoaderFunctionArgs, json } from "@remix-run/node"
import { ReactNode } from "react"
import { getUser } from "./sessions.server"
import { Link, useLoaderData } from "@remix-run/react"

type AdmNavProps = {
    children: ReactNode
    user?: {
        role?: string,
        id?: string,
        username?: string,
    }
}

export function AdmNav({ children, user }: AdmNavProps) {
    return (
        <>
            <div className="d-flex flex-column">
                {typeof user?.role !== "undefined" ? <>{user?.role == "admin" || "master" ? <>
                    <div className="p-3 d-flex flex-row bg-secondary rounded mb-2">
                        <Link to={"/admin/admin-panel"} className="text-light me-2">Панель администратора</Link>
                        <Link to={"/admin/news-red"} className="text-light me-2">Редактор новостей</Link>
                    </div>
                </> : <></>}</> : <></>}
                <div className="row">{children}</div>
            </div>
        </>
    )
}