import { LoaderFunctionArgs, json } from "@remix-run/node"
import { ReactNode } from "react"
import { getUser } from "./sessions.server"
import { useLoaderData } from "@remix-run/react"

type AdmNavProps = {
    children: ReactNode
}

export async function loader({ request }: LoaderFunctionArgs) {
    const user = await getUser(request)
    return json(user)
}

export function AdmNav({ children }: AdmNavProps) {
    const user = useLoaderData<typeof loader>();

    return (
        <>
            <div className="d-flex flex-column">
                {typeof user?.role !== "undefined" ? <><h1>{user?.role.length}</h1></> : <><p>No user</p></>}
                <div className="d-flex flex-row">{children}</div>
            </div>
        </>
    )
}