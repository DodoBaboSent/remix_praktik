import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { NavOuterComponent } from "../nav";
import { Breadcrumbs } from "~/breadcrumbs";
import { db } from "~/db.server";
import { useLoaderData, Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Новости | Дальневосточное АГП" },
    { name: "description", content: "Новости" },
  ];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  let { pageNumber = 0 } = params;
  const news = await db.news.findMany({
    take: 5,
    skip: Number(pageNumber) * 5,
  });
  const count = await db.news.count();
  return json({ pageNumber, news, count });
}

export default function Component() {
  const { pageNumber, news, count } = useLoaderData<typeof loader>();
  const page = Number(pageNumber);
  return (
    <>
      <NavOuterComponent active="katalog" />
      <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
        <Breadcrumbs tek="Новости" />
        {news.map((El) => {
          return (
            <>
              <div className="d-flex flex-column">
                <p className="text-start fs-6 gray-text mb-0 mt-0">
                  {El.createdAt}
                </p>
                <p className="text-start">
                  <a href={"/new/" + El.id} className="text-inherit fw-bold">
                    {El.name}
                  </a>
                </p>
                <p>
                  {El.body.length > 100
                    ? `${El.body.slice(0, -100)}...`
                    : El.body}
                </p>
              </div>
            </>
          );
        })}
        <div className="d-flex flex-row p-3 mt-3">
          <Link
            to={`/news/${page > 0 ? page - 1 : 0}`}
            className="me-2 text-black"
          >
            Назад
          </Link>
          <Link
            to={`/news/${page < count / 5 ? page + 1 : count / 5}`}
            className="me-2 text-black"
          >
            Вперёд
          </Link>
        </div>
      </main>
    </>
  );
}
