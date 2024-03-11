type BreadProps = {
    prev?: string,
    nprev?: string,
    tek?: string
}

export function Breadcrumbs(props: BreadProps) {

    return (
        <>
            <div className="d-flex flex-row align-items-center mb-4">
                <a href="/" className="text-inherit">Главная</a>
                <img src="/assets/breadcrumbs-arrow.gif" alt="arrow" className="arrow mx-1" />
                {props.prev !== undefined ?
                    <>
                        <a href={props.prev} className="text-inherit">{props.nprev}</a>
                        <img src="/assets/breadcrumbs-arrow.gif" alt="arrow" className="arrow mx-1" />
                    </> : <></>}
                <p className="gray-text mb-0">{props.tek}</p>
            </div>
        </>
    )
}

