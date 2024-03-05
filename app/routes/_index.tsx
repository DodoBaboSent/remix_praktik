import type { MetaFunction } from "@remix-run/node";
import { NavComponent } from "./nav"

export const meta: MetaFunction = () => {
  return [
    { title: "Главная | Дальневосточное АГП" },
    { name: "description", content: "Главная страница предприятия" },
  ];
};

export default function Index() {
  return (
    <>
      <aside className="d-flex flex-column col col-lg-3 col-xl-2 col-xxl-2">
        <div className="d-flex flex-row padded-menu align-items-center">
          <p className="to-home nav-elem-1">
            <a href="#" className="dotted-underline">На главную</a>
          </p>
          <div className="nav-elem-2">
            <a href="mailto:dvagp@dvagp.ru" className="text-decoration-none">
              <img src="assets/icon-contacts.gif" alt="contacts" />
            </a>
          </div>
          <div>
            <a href="sitemap/index.html" className="text-decoration-none" />
            <a href="sitemap/index.html" className="text-decoration-none">
              <img src="assets/icon-sitemap.gif" alt="sitemap" />
            </a>
          </div>
        </div>
        <div className="d-flex flex-column mt-4">
          <div className="padded-map">
            <p className="text-white text-wrap mb-0 text-center"><a href="#" className="text-inherit">Карта Дальнего Востока (топографическая)</a></p>
          </div>
        </div>
      </aside>
      <main className="d-flex flex-column col col-lg-6 col-xl-7 col-xxl-7">
        <h1 className="mb-4 text-start text-blue">О нашем предприятии</h1>
        <p className="text-start mt-0 smaller-text">Предприятие осуществляет топографо-геодезическое и картографическое обеспечение территории Дальнего Востока Российской Федерации, включая Хабаровский и Камчатский края,  Амурскую и Сахалинскую области, Еврейскую автономную область, что составляет около 2 миллионов квадратных километров, без учета территории шельфа дальневосточных морей.</p>
        <p className="padded-annot smaller-text">Имеет структурные подразделения в городах Хабаровске, Южно-Сахалинске, Петропавловске-Камчатском, Свободном</p>
      </main>
    </>
  );
}
