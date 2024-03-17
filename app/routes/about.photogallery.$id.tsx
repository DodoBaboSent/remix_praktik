import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { NavOuterComponent } from "../nav";
import { Breadcrumbs } from "~/breadcrumbs";
import { db } from "~/db.server";
import { useLoaderData } from "@remix-run/react";


export async function loader({ request, params }: LoaderFunctionArgs) {
  const imgs = await db.img.findMany({
    where: {
      photoAlbumId: params.id,
    },
  });
  return json({ imgs });
}

export default function About() {
  const { imgs } = useLoaderData<typeof loader>();
  return (
    <>
      <NavOuterComponent active="about" />
      <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
        <Breadcrumbs
          prev="/about"
          nprev="О предприятии"
          tek="Фотоальбом"
        />
        <div className="d-flex flex-row flex-wrap justify-content-evenly mt-3">
        {imgs.map((El) => {
          return (
            <>
              <div className="d-flex flex-column" key={El.id + "_div"}>
                <a href={"/assets/" + El.filePath} key={El.id + "_a"}>
                  <img
                    src={"/assets/" + El.filePath}
                    alt={El.name}
                    key={El.id + "_img"}
                    className="img-thumbnail mt-3"
                  />
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
