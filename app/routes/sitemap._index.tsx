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
    { title: "Карта сайта | Дальневосточное АГП" },
    { name: "description", content: "Карта сайта" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const links = await db.sLink.findMany();
  return json({ links });
}

export default function Component() {
  const { links } = useLoaderData<typeof loader>();
  return (
    <>
      <NavOuterComponent active="katalog" />
      <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
        <Breadcrumbs tek="Карта сайта" />
        <h1 className="text-blue">Карта сайта</h1>
        <ul>
          {links.map((El) => {
            if (El.parentId == null) {
              return (
                <>
                  <li className="smaller-text">
                    <a
                      href={"/" + El.link}
                      key={El.id + "_outer_a"}
                      className="text-inherit"
                    >
                      {El.text}
                    </a>
                    <ul key={El.id + "_list_o"}>
                      {links
                        .filter((predicate) => {
                          return predicate.parentId === El.id;
                        })
                        .map((El_i) => {
                          return (
                            <>
                              <li
                                className="smaller-text"
                                key={El_i.id + "_list_i_li"}
                              >
                                <a
                                  href={"/" + El.link + "/" + El_i.link}
                                  className="text-inherit"
                                  key={El_i.id + "_list_i_a"}
                                >
                                  {El_i.text}
                                </a>
                              </li>
                            </>
                          );
                        })}
                    </ul>
                  </li>
                </>
              );
            } else {
              return <></>;
            }
          })}
        </ul>
      </main>
    </>
  );
}
