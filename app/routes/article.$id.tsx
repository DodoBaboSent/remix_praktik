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
  const new_a = await db.news.findFirst({
    where: {
      id: params.id,
    },
  });
  return json({ new_a });
}

export default function Component() {
  const { new_a } = useLoaderData<typeof loader>();
  return (
    <>
      <NavOuterComponent active="katalog" />
      <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
        <Breadcrumbs tek="Новости" />
        <div className="d-flex flex-column p-2">
          <h1 className="text-blue">{new_a?.name}</h1>
          <h3 className="smaller-heading">
            {new Date(new_a!.createdAt).toLocaleDateString(
              new Intl.Locale("ru"),
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </h3>
          <p className="smaller-text">{new_a?.body}</p>
        </div>
      </main>
    </>
  );
}
