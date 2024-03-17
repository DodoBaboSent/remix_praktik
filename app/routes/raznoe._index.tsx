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
    { title: "Разное | Дальневосточное АГП" },
    { name: "description", content: "Разное" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const docs = await db.file.findMany({
    where: {
      type: "raz",
    },
  });
  return json({ docs });
}

export default function Component() {
  const { docs } = useLoaderData<typeof loader>();
  return (
    <>
      <NavOuterComponent active="katalog" />
      <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
        <Breadcrumbs
          tek="Разное"
        />
        <h1 className="text-blue">Разное</h1>
        <h2 className="smaller-heading"></h2>
        <p className="smaller-text">
          <strong>Раскрытие информации: </strong>
        </p>
        {docs.map((El) => {
          return (
            <>
              <p className="smaller-text">
                <a href={"/files/" + El.filePath} className="text-inherit">
                  {El.fileName}
                </a>{" "}
                ({El.filePath})
              </p>
            </>
          );
        })}
      </main>
    </>
  );
}
