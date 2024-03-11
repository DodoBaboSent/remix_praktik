type NavProps = {
    active?: string
}

interface Links { link: string; name: string }
interface GroupedLink {
    group: string,
    links: Links[]
}

export function NavOuterComponent(props: NavProps) {

    return (
        <>
            <aside className="d-flex flex-column col col-lg-3 col-xl-2 col-xxl-2">
                <div className="d-flex flex-row padded-menu align-items-center">
                    <p className="to-home nav-elem-1">
                        <a href="/" className="dotted-underline">На главную</a>
                    </p>
                    <div className="nav-elem-2">
                        <a href="mailto:dvagp@dvagp.ru" className="text-decoration-none">
                            <img src="/assets/icon-contacts.gif" alt="contacts" />
                        </a>
                    </div>
                    <div>
                        <a href="/sitemap" className="text-decoration-none" />
                        <a href="/sitemap" className="text-decoration-none">
                            <img src="/assets/icon-sitemap.gif" alt="sitemap" />
                        </a>
                    </div>
                </div>
                <div className="d-flex flex-column mt-4">
                    <NavComponent {...props} />
                    <div className="padded-map">
                        <p className="text-white text-wrap mb-0 text-center"><a href="#" className="text-inherit">Карта Дальнего Востока (топографическая)</a></p>
                    </div>
                </div>
            </aside>
        </>
    )
}

function NavComponent(props: NavProps) {
    const groups: Links[] = [
        { link: "about", name: "О предприятии" },
        { link: "vidy", name: "Виды деятельности" },
        { link: "katalog", name: "Каталог продукции" },
        { link: "skhema", name: "Схема зон ответственности" },
        { link: "guestbook", name: "Отзывы" },
        { link: "payservice", name: "Платные услуги" },
        { link: "raznoe", name: "Разное" },
        { link: "zakupki", name: "Закупки" },
        { link: "noprofilat", name: "Непрофильные активы" },
    ]

    const links: GroupedLink[] = [
        {
            group: "about", links: [
                { link: "obshaya-info", name: "Общая информация" },
                { link: "rekvizits", name: "Реквизиты предприятия" },
                { link: "phones", name: "Руководство \"ДВ АГП\"" },
                { link: "history", name: "История предприятия" },
                { link: "structura", name: "Структура предприятия" },
                { link: "licenses", name: "Лицензии" },
                { link: "tech", name: "Техническое оснащение" },
                { link: "legislation", name: "Законодательные основы" },
                { link: "vacancy", name: "Вакансии" },
                { link: "photogallery", name: "Фотоальбом" },
                { link: "contacts", name: "Отправить сообщение" },
            ]
        },
        {
            group: "zakupki", links: [
                { link: "pologenie_o_zakupkah", name: "Положение о закупках" },
                { link: "activnie_zakupki", name: "Закупки" },
                { link: "otchet_o_zakupkah", name: "Квартальные отчеты о закупках" },
            ]
        }
    ]

    function renderGroup(props: string, link: string) {
        if (props == link) {
            return (<ul key={props+"_ul"} className="text-decoration-none list-style-none nav-cust smaller-nav">
                {links.map((group) => {
                    return (
                        group.links.map((group_link) => {
                            let href = "/"+link+"/"+group_link.link
                            return <li key={group_link.link+"_li_i"}><a href={href} key={group_link.link+"_i"} className="text-inherit">{group_link.name}</a></li>
                        })
                    )
                })}
            </ul>)
        }
    }

    return (
        <>
            <ul className="list-style-none nav-cust" key={"nav_links_list"}>
                {groups.map((link) => {
                    let href = "/"+link.link
                    return (
                        <>
                            <li className="bord-dotted" key={link.link+"_li"}><a href={href} key={link.link} className="text-inherit">{link.name}</a>
                                {renderGroup(props.active!, link.link)}
                            </li>
                        </>
                    )
                })}
            </ul>
        </>
    )
}