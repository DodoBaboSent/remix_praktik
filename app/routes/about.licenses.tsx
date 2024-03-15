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
    { title: "О предприятии | Дальневосточное АГП" },
    { name: "description", content: "О нас" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const files = await db.file.findMany();
  return json({ files });
}

export default function About() {
  const { files } = useLoaderData<typeof loader>();

  return (
    <>
      <NavOuterComponent active="about" />
      <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
        <Breadcrumbs
          prev="/about"
          nprev="О предприятии"
          tek="Лицензии"
        />
        <h1 className="text-blue">Лицензии</h1>
        <h2 className="smaller-heading"></h2>
        {files.map((El) => {
          if (El.type === "lic") {
            return (
              <>
                <h3
                  className="smaller-heading text-center mt-4 mb-4"
                  key={El.id + "_h3"}
                >
                  {El.fileName}
                </h3>
                <a href="/assets/lic 1.jpg" key={El.id + "_a"}>
                  <img
                    src={"/assets/" + El.filePath}
                    alt={El.filePath}
                    className="license"
                    key={El.id + "_img"}
                  />
                </a>
                <a
                  href={"/assets/" + El.filePath}
                  className="text-center"
                  key={El.id + "_a_zoom"}
                >
                  Для увеличения нажмите на изображение
                </a>
              </>
            );
          } else {
            return <></>;
          }
        })}
      </main>
    </>
  );
}
