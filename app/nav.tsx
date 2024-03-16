type NavProps = {
  active?: string;
};

interface Links {
  id: number;
  link: string;
  name: string;
}
interface GroupedLink {
  id: number;
  group: string;
  links: Links[];
}

export function NavOuterComponent(props: NavProps) {
  const min = 1337;
  const max = 123123;
  const rand = min + Math.random() * (max - min);
  return (
    <>
      <aside className="d-flex flex-column col col-lg-3 col-xl-2 col-xxl-2">
        <div className="d-flex flex-row padded-menu align-items-center">
          <p className="to-home nav-elem-1">
            <a href="/" className="dotted-underline">
              На главную
            </a>
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
          <NavComponent {...props} key={"NavWrapper_o_"+1488} />
          <div className="padded-map">
            <p className="text-white text-wrap mb-0 text-center">
              <a href="#" className="text-inherit">
                Карта Дальнего Востока (топографическая)
              </a>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

function renderGroup(props: string, id: number, link: string, links: GroupedLink[]) {
  const min = 1;
  const max = 10000;
  const rand = min + Math.random() * (max - min);
  if (props == link) {
    return (
      <>
        <ul
          key={id + "_ul_inner"}
          className="text-decoration-none list-style-none nav-cust smaller-nav"
        >
          {links.map((group, index) => {
            return group.links.map((group_link) => {
              let href = "/" + link + "/" + group_link.link;
              return (
                <li key={group_link.id + "_li_i_inner_"}>
                  <a
                    href={href}
                    key={group_link.id + "_i_inner_"}
                    className="text-inherit"
                  >
                    {group_link.name}
                  </a>
                </li>
              );
            });
          })}
        </ul>
      </>
    );
  } else {
    return <></>;
  }
}

function NavComponent(props: NavProps) {
  const min = 1;
  const max = 333300;
  const rand = min + Math.random() * (max - min);

  const groups: Links[] = [
    { link: "about", name: "О предприятии", id: 1 },
    { link: "vidy", name: "Виды деятельности", id: 2 },
    { link: "katalog", name: "Каталог продукции", id: 3 },
    { link: "skhema", name: "Схема зон ответственности", id: 4 },
    { link: "guestbook", name: "Отзывы", id: 5 },
    { link: "payservice", name: "Платные услуги", id: 6 },
    { link: "raznoe", name: "Разное", id: 7 },
    { link: "zakupki", name: "Закупки", id: 8 },
    { link: "noprofilat", name: "Непрофильные активы", id: 9 },
  ];

  const links: GroupedLink[] = [
    {
      id: 21,
      group: "about",
      links: [
        { link: "obshaya-info", name: "Общая информация", id: 10 },
        { link: "rekvizits", name: "Реквизиты предприятия", id: 11 },
        { link: "phones", name: 'Руководство "ДВ АГП"', id: 12 },
        { link: "history", name: "История предприятия", id: 13 },
        { link: "structura", name: "Структура предприятия", id: 14 },
        { link: "licenses", name: "Лицензии", id: 15 },
        { link: "tech", name: "Техническое оснащение", id: 16 },
        { link: "legislation", name: "Законодательные основы", id: 17 },
        { link: "vacancy", name: "Вакансии", id: 18 },
        { link: "photogallery", name: "Фотоальбом", id: 19 },
        { link: "contacts", name: "Отправить сообщение", id: 20 },
      ],
    },
    {
      id: 22,
      group: "zakupki",
      links: [
        { link: "pologenie_o_zakupkah", name: "Положение о закупках", id: 23 },
        { link: "activnie_zakupki", name: "Закупки", id: 24 },
        {
          link: "otchet_o_zakupkah",
          name: "Квартальные отчеты о закупках",
          id: 25,
        },
      ],
    },
  ];

  return (
    <>
      <ul
        className="list-style-none nav-cust"
        key={"Nav_inner_nav_links_list_" + 1337}
      >
        {groups.map((link, index) => {
          let href = "/" + link.link;
          return (
            <>
              <li className="bord-dotted" key={link.id + "_li_ada1411aa_"}>
                <a
                  href={href}
                  key={link.id + "_a_group_link_"}
                  className="text-inherit"
                >
                  {link.name}
                </a>
                {renderGroup(
                  props.active!,
                  link.id,
                  link.link,
                  links.filter((haystack) => {
                    return haystack.group == link.link;
                  })
                )}
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}
