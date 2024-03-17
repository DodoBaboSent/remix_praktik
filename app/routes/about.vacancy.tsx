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
    { title: "Вакансии | Дальневосточное АГП" },
    { name: "description", content: "Вакансии" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const files = await db.file.findMany();
  return json({ files });
}

export default function Legislation() {
  const { files } = useLoaderData<typeof loader>();
  return (
    <>
      <NavOuterComponent active="about" />
      <main className="d-flex flex-column col col-lg-6 col-xl-10 col-xxl-10">
        <Breadcrumbs
          prev="/about"
          nprev="О предприятии"
          tek="Вакансии"
        />
        <h1 className="text-blue">Кадры, вакансии</h1>
        <h2 className="smaller-heading">---</h2>
      </main>
    </>
  );
}
