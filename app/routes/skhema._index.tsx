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
    { title: "Схема зон ответственности | Дальневосточное АГП" },
    { name: "description", content: "Схема зон ответственности" },
  ];
};


export default function Component() {
  return (
    <>
      <NavOuterComponent active="katalog" />
      <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
        <Breadcrumbs
          tek="Схема зон ответственности"
        />
                <h1 className="text-blue">Схема зон ответственности</h1>
                <h2 className="smaller-heading">Кликните, чтобы открыть в новой вкладке</h2>
                <a href="/assets/skhema_1.jpg"><img src="/assets/skhema_1.jpg" alt="skhema 1" className="map"/></a>
                <a href="/files/skhema_pdf_9.pdf" className="fw-bold text-inherit text-center mt-4">Скачать с сервера в формате PDF</a>
      </main>
    </>
  );
}
