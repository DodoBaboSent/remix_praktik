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
  const docs = await db.file.findMany({
    where: {
      type: "pay",
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
          tek="Карта сайта"
        />
        <h1 className="text-blue">Карта сайта</h1>
        <h2 className="smaller-heading">TODO: Создать индекс ссылок в бд</h2>
        <ul>
          <li className="smaller-text">
            <a href="/about" className="text-inherit">
              О предприятии
            </a>
            <ul>
              <li className="smaller-text">
                <a
                  href="/about/obshaya-info"
                  className="text-inherit"
                >
                  Общая информация
                </a>
              </li>
              <li className="smaller-text">
                <a
                  href="/about/rekvizits/"
                  className="text-inherit"
                >
                  Реквизиты предприятия
                </a>
              </li>
              <li className="smaller-text">
                <a href="/about/phones/" className="text-inherit">
                  Руководство "ДВ АГП"
                </a>
              </li>
              <li className="smaller-text">
                <a href="/about/history/" className="text-inherit">
                  История предприятия
                </a>
              </li>
              <li className="smaller-text">
                <a
                  href="/about/structura/"
                  className="text-inherit"
                >
                  Структура предприятия
                </a>
              </li>
              <li className="smaller-text">
                <a href="/about/licenses/" className="text-inherit">
                  Лицензии
                </a>
              </li>
              <li className="smaller-text">
                <a href="/about/tech/" className="text-inherit">
                  Техническое оснащение
                </a>
              </li>
              <li className="smaller-text">
                <a
                  href="/about/legislation/"
                  className="text-inherit"
                >
                  Законодательные основы
                </a>
              </li>
              <li className="smaller-text">
                <a href="/about/vacancy/" className="text-inherit">
                  Вакансии
                </a>
              </li>
              <li className="smaller-text">
                <a
                  href="/about/photogallery/"
                  className="text-inherit"
                >
                  Фотоальбом
                </a>
              </li>
              <li className="smaller-text">
                <a href="/about/contacts/" className="text-inherit">
                  Отправить сообщение
                </a>
              </li>
            </ul>
          </li>
          <li className="smaller-text">
            <a href="/vidy/" className="text-inherit">
              Виды деятельности
            </a>
          </li>
          <li className="smaller-text">
            <a href="/katalog/" className="text-inherit">
              Каталог продукции
            </a>
          </li>
          <li className="smaller-text">
            <a href="/skhema/" className="text-inherit">
              Схема зон ответственности
            </a>
          </li>
          <li className="smaller-text">
            <a href="/guestbook/" className="text-inherit">
              Отзывы
            </a>
          </li>
          <li className="smaller-text">
            <a href="/payservice/" className="text-inherit">
              Платные услуги
            </a>
          </li>
          <li className="smaller-text">
            <a href="/raznoe/" className="text-inherit">
              Разное
            </a>
          </li>
          <li className="smaller-text">
            <a href="/zakupki/" className="text-inherit">
              Закупки
            </a>
            <ul>
              <li className="smaller-text">
                <a
                  href="/zakupki/pologenie_o_zakupkah/"
                  className="text-inherit"
                >
                  Положение о закупках
                </a>
              </li>
              <li className="smaller-text">
                <a
                  href="/zakupki/activnie_zakupki/"
                  className="text-inherit"
                >
                  Закупки
                </a>
              </li>
              <li className="smaller-text">
                <a
                  href="/zakupki/otchet_o_zakupkah/"
                  className="text-inherit"
                >
                  Отчеты о закупках
                </a>
              </li>
            </ul>
          </li>
          <li className="smaller-text">
            <a href="/news/" className="text-inherit">
              Новости
            </a>
          </li>
          <li className="smaller-text">
            <a href="/noprofilat/" className="text-inherit">
              Непрофильные активы
            </a>
          </li>
        </ul>
      </main>
    </>
  );
}
