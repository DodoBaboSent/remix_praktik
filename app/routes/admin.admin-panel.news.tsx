import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { SetStateAction, useState } from "react";
import { AdTab } from "~/admin-tabs";
import { db } from "~/db.server";
import { requireUser } from "~/sessions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request, "/admin/admin-panel");
  const news = await db.news.findMany();
  return json({ user, news });
}

export default function AdminPanel() {
  const { user, news } = useLoaderData<typeof loader>();

  const [tab, setTab] = useState("news");

  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTab(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <form method="post">
        <fieldset>
          <legend>Управление файлами</legend>
          <label className="border rounded p-2 bg-primary text-light admin-tab">
            <input
              type="radio"
              name="tab"
              id="tabType"
              value="news"
              checked={tab == "news"}
              onChange={onOptionChange}
              hidden
              defaultChecked
            />
            {"  "}Новости
          </label>
        </fieldset>
        <div className="d-flex flex-column p-2">
          {tab == "news" ? (
            <>
              <h1>Новости</h1>
              <div className="d-flex flex-column p-3 border rounded">
                <div className="d-flex flex-row border-bottom">
                  <p className="border-end p-2 m-0" style={{width: 400}}>ID</p>
                  <p className="border-end p-2 m-0" style={{width: 400}}>BODY</p>
                  <p className="border-end p-2 m-0" style={{width: 400}}>CREATED AT</p>
                </div>
                {news.map((El) => {
                  return (
                    <>
                      <div
                        className="d-flex flex-row border-bottom panel-row"
                        key={El.id + "_div"}
                      >
                        <p
                          className="border-end p-2 m-0"
                          style={{ width: "400px" }}
                          key={El.id + "_id"}
                        >
                          {El.id}
                        </p>
                        <p
                          className="border-end p-2 m-0"
                          style={{ width: "400px" }}
                          key={El.id + "_name"}
                        >
                          {El.body}
                        </p>
                        <p
                          className="border-end p-2 m-0"
                          style={{ width: "400px" }}
                          key={El.id + "_path"}
                        >
                          {El.createdAt}
                        </p>
                        <a
                          href={"/admin/delNew/" + El.id}
                          className="text-light m-0 p-2 bg-danger"
                        >
                          Удалить
                        </a>
                        <a
                          href={"/admin/chgNew/" + El.id}
                          className="text-light m-0 p-2 bg-success"
                        >
                          Редактировать
                        </a>
                      </div>
                    </>
                  );
                })}
                <a
                  href={"/admin/addNew/"}
                  className="p-3 m-0 bg-success text-light mt-2"
                >
                  Добавить новость
                </a>
              </div>
            </>
          ) : null}
        </div>
      </form>
    </>
  );
}
