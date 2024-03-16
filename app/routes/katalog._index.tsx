import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { NavOuterComponent } from "../nav";
import { Breadcrumbs } from "~/breadcrumbs";
import { db } from "~/db.server";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Каталог | Дальневосточное АГП" },
    { name: "description", content: "Каталог" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const imgs = await db.file.findMany({
    where: {
      type: "cat",
    },
  });
  return json({ imgs });
}

export default function Katalog() {
  const { imgs } = useLoaderData<typeof loader>();
  return (
    <>
      <NavOuterComponent active="katalog" />
      <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
        <Breadcrumbs
          prev="/about"
          nprev="О предприятии"
          tek="История предприятия"
        />
        <h1 className="text-blue">Каталог продукции</h1>
        <h2 className="smaller-heading">
          Кликните, чтобы открыть картинку в новой вкладке
        </h2>
        <div className="d-flex flex-wrap align-content-between">
          {imgs.map((El) => {
            return (
              <>
                <a href={"/assets/"+El.filePath}>
                  <img
                    src={"/assets/"+El.filePath}
                    alt="catalog 1"
                    className="fit-flex mx-2 my-2"
                  />
                </a>
              </>
            );
          })}
        </div>
      </main>
    </>
  );
}
