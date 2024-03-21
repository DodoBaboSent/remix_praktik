import { Breadcrumbs } from "~/breadcrumbs";
import { NavOuterComponent } from "~/nav";
import Fuse, { FuseResult } from "fuse.js";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { db } from "~/db.server";
import { badRequest } from "~/request.server";
import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { useState } from "react";
import fuzzysearch from "../fuzzysearch.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const search_t = search.get("type");
  const data_l = await db.sLink.findMany();
  const data_n = await db.news.findMany();
  const data_f = await db.file.findMany();
  const result_l = data_l.filter((value) => {
    return (
      fuzzysearch(
        search.get("query") !== null ? search.get("query")!.toLowerCase() : "",
        value.text.toLowerCase()
      ) ||
      fuzzysearch(
        search.get("query") !== null ? search.get("query")!.toLowerCase() : "",
        value.link.toLowerCase()
      )
    );
  });
  const result_f = data_f.filter((value) => {
    return (
      fuzzysearch(
        search.get("query") !== null ? search.get("query")!.toLowerCase() : "",
        value.fileName.toLowerCase()
      ) ||
      fuzzysearch(
        search.get("query") !== null ? search.get("query")!.toLowerCase() : "",
        value.filePath.toLowerCase()
      ) ||
      fuzzysearch(
        search.get("query") !== null ? search.get("query")!.toLowerCase() : "",
        value.type.toLowerCase()
      )
    );
  });
  const result_n = data_n.filter((value) => {
    return (
      fuzzysearch(
        search.get("query") !== null ? search.get("query")!.toLowerCase() : "",
        value.body.toLowerCase()
      ) ||
      fuzzysearch(
        search.get("query") !== null ? search.get("query")!.toLowerCase() : "",
        value.name.toLowerCase()
      )
    );
  });
  return json({ result_f, result_l, result_n, search_t });
}

export default function Search() {
  const loader_data = useLoaderData<typeof loader>();

  const [params] = useSearchParams();

  return (
    <>
      <NavOuterComponent active="katalog" />
      <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
        <Breadcrumbs tek="Карта сайта" />
        <h1 className="text-blue">Результаты поиска</h1>
        <Form>
          <fieldset className="mb-2">
            <label className="border rounded p-2 bg-primary text-light admin-tab">
              <input
                type="radio"
                name="type"
                value="links"
                defaultChecked={params.get("type") === "links"}
              />{" "}
              Ссылки
            </label>
            <label className="border rounded p-2 bg-primary text-light admin-tab">
              <input
                type="radio"
                name="type"
                value="files"
                defaultChecked={params.get("type") === "files"}
              />{" "}
              Файлы
            </label>
            <label className="border rounded p-2 bg-primary text-light admin-tab">
              <input
                type="radio"
                name="type"
                value="news"
                defaultChecked={params.get("type") === "news"}
              />{" "}
              Новости
            </label>
          </fieldset>
          <div className="d-flex flex-row">
            <input
              type="text"
              name="query"
              className="rounded border p-2 me-2"
              style={{ width: 500 }}
              defaultValue={params.get("query")!}
            ></input>
            <button type="submit" className="btn btn-primary me-2">Поиск</button>
          </div>
        </Form>
        <ul>
          {loader_data?.search_t === "links" ? (
            <>
              {loader_data.result_l.map((value, i) => {
                return (
                  <>
                    <li key={`${value.id}_${i}`}>
                      <p>{value.link}</p>
                      <p>{value.text}</p>
                    </li>
                  </>
                );
              })}
            </>
          ) : loader_data?.search_t === "files" ? (
            <>
              {loader_data.result_f.map((value, i) => {
                return (
                  <>
                    <li key={`${value.id}_${i}`}>
                      <p>{value.fileName}</p>
                      <p>{value.filePath}</p>
                      <p>{value.type}</p>
                    </li>
                  </>
                );
              })}
            </>
          ) : (
            <>
              {loader_data.result_n.map((value, i) => {
                return (
                  <>
                    <li key={`${value.id}_${i}`}>
                      <p>{value.body}</p>
                      <p>{value.name}</p>
                    </li>
                  </>
                );
              })}
            </>
          )}
        </ul>
      </main>
    </>
  );
}
