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
  const albums = await db.photoAlbum.findMany();
  return json({ albums });
}

export default function About() {
  const { albums } = useLoaderData<typeof loader>();
  return (
    <>
      <NavOuterComponent active="about" />
      <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
        <Breadcrumbs
          prev="/about"
          nprev="О предприятии"
          tek="Фотоальбом"
        />
        <h1 className="text-blue">Фотоальбом</h1>
        <h2 className="smaller-heading">
          Выберите интересующий Вас фотоальбом для просмотра фотографий.
        </h2>
        <div className="d-flex flex-row flex-wrap justify-content-evenly mt-3">
          {albums.map((El) => {
            return (
              <>
                <div className="d-flex flex-column" key={El.id+"_album"}>
                  <a href={"photogallery/"+El.id+"/"} key={El.id+"_link_thumb"}>
                    <img
                      src={"/assets/"+El.thumb}
                      alt="tech-thumb"
                      className="img-thumbnail mb-2"
                      key={El.id+"_thumb"}
                    />
                  </a>
                  <a href={"photogallery/"+El.id+"/"} key={El.id+"_link_text"}>
                    <p className="img-capt text-inherit text-center">
                      {El.name}
                    </p>
                  </a>
                </div>
              </>
            );
          })}
        </div>
      </main>
    </>
  );
}
