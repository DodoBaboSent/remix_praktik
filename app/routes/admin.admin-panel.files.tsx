import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { SetStateAction, useState } from "react";
import { AdTab } from "~/admin-tabs";
import { db } from "~/db.server";
import { requireUser } from "~/sessions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request, "/admin/admin-panel");
  const files = await db.file.findMany();
  const albums = await db.photoAlbum.findMany();
  const photos = await db.img.findMany();
  return json({ user, files, albums, photos });
}

export default function AdminPanel() {
  const { user, files, albums, photos } = useLoaderData<typeof loader>();

  const [tab, setTab] = useState("files");

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
              value="files"
              checked={tab == "files"}
              onChange={onOptionChange}
              hidden
              defaultChecked
            />
            {"  "}Файлы
          </label>
          <label className="border rounded p-2 bg-primary text-light admin-tab">
            <input
              type="radio"
              name="tab"
              id="tabType"
              value="albums"
              checked={tab == "albums"}
              onChange={onOptionChange}
              hidden
            />
            {"  "}Фотоальбомы
          </label>
          <label className="border rounded p-2 bg-primary text-light admin-tab">
            <input
              type="radio"
              name="tab"
              id="tabType"
              value="photo"
              checked={tab == "photo"}
              onChange={onOptionChange}
              hidden
            />
            {"  "}Фото
          </label>
        </fieldset>
        <div className="d-flex flex-column p-2">
          {tab == "files" ? (
            <>
              <h1>Файлы</h1>
              <div className="d-flex flex-column p-3 border rounded">
                {files.map((El) => {
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
                          {El.fileName}
                        </p>
                        <p
                          className="border-end p-2 m-0"
                          style={{ width: "400px" }}
                          key={El.id + "_path"}
                        >
                          {El.filePath}
                        </p>
                        <p
                          className="border-end p-2 m-0"
                          style={{ width: "100px" }}
                          key={El.id + "_type"}
                        >
                          {El.type}
                        </p>
                        <a
                          href={"/admin/delFile/" + El.id}
                          className="text-light m-0 p-2 bg-danger"
                        >
                          Удалить
                        </a>
                        <a
                          href={"/admin/chgFile/" + El.id}
                          className="text-light m-0 p-2 bg-success"
                        >
                          Редактировать
                        </a>
                      </div>
                    </>
                  );
                })}
                <a
                  href={"/admin/addFile/"}
                  className="p-3 m-0 bg-success text-light mt-2"
                >
                  Добавить файлы
                </a>
              </div>
            </>
          ) : tab == "albums" ? (
            <>
              <h1>Альбомы</h1>
              <div className="d-flex flex-column p-3 border rounded">
                {albums.map((El) => {
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
                          {El.name}
                        </p>
                        <p
                          className="border-end p-2 m-0"
                          style={{ width: "400px" }}
                          key={El.id + "_path"}
                        >
                          {El.thumb}
                        </p>
                        <a
                          href={"/admin/delAlbum/" + El.id}
                          className="text-light m-0 p-2 bg-danger"
                        >
                          Удалить
                        </a>
                        <a
                          href={"/admin/chgAlbum/" + El.id}
                          className="text-light m-0 p-2 bg-success"
                        >
                          Редактировать
                        </a>
                      </div>
                    </>
                  );
                })}
                <a
                  href={"/admin/addAlbum/"}
                  className="p-3 m-0 bg-success text-light mt-2"
                >
                  Добавить альбомы
                </a>
              </div>
            </>
          ) : (
            <>
              <h1>Фото</h1>
              <div className="d-flex flex-column p-3 border rounded">
                {photos.map((El) => {
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
                          {El.name}
                        </p>
                        <p
                          className="border-end p-2 m-0"
                          style={{ width: "400px" }}
                          key={El.id + "_path"}
                        >
                          {El.filePath}
                        </p>
                        <p
                          className="border-end p-2 m-0"
                          style={{ width: "400px" }}
                          key={El.id + "_album"}
                        >
                          {
                            albums.find((haystack) => {
                              return haystack.id == El.photoAlbumId;
                            })?.name
                          }
                        </p>
                        <a
                          href={"/admin/delPhoto/" + El.id}
                          className="text-light m-0 p-2 bg-danger"
                        >
                          Удалить
                        </a>
                        <a
                          href={"/admin/chgPhoto/" + El.id}
                          className="text-light m-0 p-2 bg-success"
                        >
                          Редактировать
                        </a>
                      </div>
                    </>
                  );
                })}
                <a
                  href={"/admin/addPhoto/"}
                  className="p-3 m-0 bg-success text-light mt-2"
                >
                  Добавить фото
                </a>
              </div>
            </>
          )}
        </div>
      </form>
    </>
  );
}
