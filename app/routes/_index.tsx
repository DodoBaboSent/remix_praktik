import type { MetaFunction } from "@remix-run/node";
import { NavOuterComponent } from "../nav"

export const meta: MetaFunction = () => {
  return [
    { title: "Главная | Дальневосточное АГП" },
    { name: "description", content: "Главная страница предприятия" },
  ];
};

export default function Index() {
  return (
    <>
      <NavOuterComponent />
      <main className="d-flex flex-column col col-lg-6 col-xl-7 col-xxl-7">
        <h1 className="mb-4 text-start text-blue">О нашем предприятии</h1>
        <p className="text-start mt-0 smaller-text">Предприятие осуществляет топографо-геодезическое и картографическое обеспечение территории Дальнего Востока Российской Федерации, включая Хабаровский и Камчатский края,  Амурскую и Сахалинскую области, Еврейскую автономную область, что составляет около 2 миллионов квадратных километров, без учета территории шельфа дальневосточных морей.</p>
        <p className="padded-annot smaller-text">Имеет структурные подразделения в городах Хабаровске, Южно-Сахалинске, Петропавловске-Камчатском, Свободном</p>
      </main>
      <aside className="d-flex flex-column col col-lg-3 col-xl-3 col-xxl-3">
              <h1 className="mb-4 text-start text-blue mb-4">Новости</h1>
              <div className="d-flex flex-column">
                <p className="text-start fs-6 gray-text mb-0 mt-0">11.08.2022</p>
                <p className="text-start"><a href="http://dvagp.ru/news/39436/" className="text-inherit fw-bold">Сообщение о проведении внеочередного Общего собрания акционеров акционерного общества «Дальневосточное аэрогеодезическое предприятие»</a></p>
              </div>
              <div className="d-flex flex-row align-items-center mt-3">
                <img src="/assets/icon-archive.gif" alt="archive" className="me-1" />
                <p className="mb-0"><a href="news/index.html" className="text-inherit">Архив новостей</a></p>
              </div>
            </aside>
    </>
  );
}
