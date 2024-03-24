import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { NavOuterComponent } from "../nav";
import { db } from "~/db.server";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Главная | Дальневосточное АГП" },
    { name: "description", content: "Главная страница предприятия" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const news = await db.news.findMany({
    take: 2,
  });
  return json({ news });
}

export default function Index() {
  const { news } = useLoaderData<typeof loader>();
  return (
    <>
      <NavOuterComponent />
      <main className="d-flex flex-column col col-lg-6 col-xl-7 col-xxl-7">
        <h1 className="mb-4 text-start text-blue">О нашем предприятии</h1>
        <p className="text-start mt-0 smaller-text">
          Предприятие осуществляет топографо-геодезическое и картографическое
          обеспечение территории Дальнего Востока Российской Федерации, включая
          Хабаровский и Камчатский края, Амурскую и Сахалинскую области,
          Еврейскую автономную область, что составляет около 2 миллионов
          квадратных километров, без учета территории шельфа дальневосточных
          морей.
        </p>
        <p className="padded-annot smaller-text">
          Имеет структурные подразделения в городах Хабаровске, Южно-Сахалинске,
          Петропавловске-Камчатском, Свободном
        </p>
      </main>
      <aside className="d-flex flex-column col col-lg-3 col-xl-3 col-xxl-3">
        <h1 className="mb-4 text-start text-blue mb-4">Новости</h1>
        {news.map((El) => {
          return (
            <>
              <div className="d-flex flex-column">
                <p className="text-start fs-6 gray-text mb-0 mt-0">
                  {new Date(El.createdAt).toLocaleDateString(new Intl.Locale("ru"))}
                </p>
                <p className="text-start">
                  <a
                    href={`/article/${El.id}`}
                    className="text-inherit fw-bold"
                  >
                    {El.body.length > 100 ? `${El.body.slice(0, -100)}...` : El.body}
                  </a>
                </p>
              </div>
            </>
          );
        })}
        <div className="d-flex flex-row align-items-center mt-3">
          <img src="/assets/icon-archive.gif" alt="archive" className="me-1" />
          <p className="mb-0">
            <a href="/news/" className="text-inherit">
              Архив новостей
            </a>
          </p>
        </div>
      </aside>
    </>
  );
}
