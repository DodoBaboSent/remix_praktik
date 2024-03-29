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
    { title: "Законодательные основы | Дальневосточное АГП" },
    { name: "description", content: "Законодательные основы" },
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
      <main className="d-flex flex-column col col-lg-6 col-xl-7 col-xxl-10">
        <Breadcrumbs
          prev="/about"
          nprev="О предприятии"
          tek="Законодательные основы"
        />
        <h1 className="text-blue">Законодательные основы</h1>
        <h2 className="smaller-heading"></h2>
        {files.map((file) => {
          if (file.type === "leg") {
            return (
              <>
                <a
                  href={"/files/" + file.filePath}
                  className="fw-bold text-inherit smaller-text"
                  download
                  key={file.id+file.type+"_dwld"}
                >
                  Скачать {file.fileName} ({file.filePath})
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
