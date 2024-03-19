type AdTabProps = {
    href?: {name: string, link: string}[],
    role?: string,
}

export function AdTab(props: AdTabProps) {

    return (
        <>
            <div className="d-flex flex-row align-items-center mb-4 border rounded p-3">
                {props.href?.map((currEl) => {
                    if (props.role === "master") {
                        return(<>
                            <div className="p-2 rounded bg-primary d-flex me-2">
                                <a href={"/admin/admin-panel/"+currEl.link} style={{textDecoration: "none"}} className="text-light fw-bold">{currEl.name}</a>
                            </div>
                        </>)
                    } else if (props.role !== "master") {
                        if (currEl.link !== "users/") {
                            return(<>
                                <div className="p-2 rounded bg-primary d-flex me-2">
                                    <a href={"/admin/admin-panel/"+currEl.link} style={{textDecoration: "none"}} className="text-light fw-bold">{currEl.name}</a>
                                </div>
                            </>)
                        }
                    }
                })}
            </div>
        </>
    )
}

