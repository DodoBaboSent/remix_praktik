import type { MetaFunction } from "@remix-run/node";
import { NavOuterComponent } from "../nav";
import { Breadcrumbs } from "~/breadcrumbs";

export const meta: MetaFunction = () => {
  return [
    { title: "Руководство | Дальневосточное АГП" },
    { name: "description", content: "Руководство" },
  ];
};

export default function About() {
  return (
    <>
      <NavOuterComponent active="about" />
      <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
        <Breadcrumbs
          prev="/about"
          nprev="О предприятии"
          tek="Руководство ДВ АГП"
        />
        <h1 className="text-blue">Руководство "ДВ АГП"</h1>
        <h2 className="smaller-heading">г. Хабаровск (код города 4212)</h2>
        <table>
          <tbody>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                <strong>Общий адрес АО "ДВ АГП"</strong>
              </td>
              <td className="col-t smaller-text">
                <a href="mailto:dvagp@dvagp.ru">dvagp@dvagp.ru</a>
              </td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                <strong>Генеральный директор</strong>
              </td>
              <td className="col-t smaller-text">32-40-58</td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">Сивкова Марина Михайловна</td>
              <td className="col-t smaller-text">
                <a href="mailto:director@dvagp.ru">director@dvagp.ru</a>
              </td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                <strong>Секретарь</strong>
              </td>
              <td className="col-t smaller-text">30-43-19</td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">Тибура Евгения Ивановна</td>
              <td className="col-t smaller-text">
                <a href="mailto:secretary@dvagp.ru">secretary@dvagp.ru</a>
              </td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                <strong>Главный инженер</strong>
              </td>
              <td className="col-t smaller-text">32-74-07</td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                <strong>Агафонов Иван Иванович</strong>
              </td>
              <td className="col-t smaller-text">
                <a href="mailto:main_engineer@dvagp.ru">
                  main_engineer@dvagp.ru
                </a>
              </td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                <strong>
                  Заместитель генерального директора по юридическому и
                  корпоративному управлению
                </strong>
              </td>
              <td className="col-t smaller-text">
                <a href="mailto:ok@dvagp.ru">ok@dvagp.ru</a>
              </td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                <strong>Дейнека Екатерина Сергеевна</strong>
              </td>
              <td className="col-t smaller-text">---</td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                <strong>Руководитель управления делами</strong>
              </td>
              <td className="col-t smaller-text">
                <a href="mailto:gnatishin_ev@dvagp.ru">gnatishin_ev@dvagp.ru</a>
              </td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                Гнатишин Евгений Владимирович
              </td>
              <td className="col-t smaller-text">---</td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                <strong>Планово-экономический отдел</strong>
              </td>
              <td className="col-t smaller-text">32-66-96</td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                Доставалова Анжелика Михайловна
              </td>
              <td className="col-t smaller-text">
                <a href="mailto:dostavalova@dvagp.ru">dostavalova@dvagp.ru</a>
              </td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                Качелаева Марина Николаевна
              </td>
              <td className="col-t smaller-text">
                <a href="mailto:kachelaeva@dvagp.ru">kachelaeva@dvagp.ru</a>
              </td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                Тынэлькут Светлана Сергеевна
              </td>
              <td className="col-t smaller-text">
                <a href="mailto:commerce@dvagp.ru">commerce@dvagp.ru</a>
              </td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                <strong>Главный бухгалтер</strong>
              </td>
              <td className="col-t smaller-text">32-93-23</td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                Федоренко Юлия Александровна
              </td>
              <td className="col-t smaller-text">
                <a href="mailto:main_buch@dvagp.ru">main_buch@dvagp.ru</a>
              </td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                <strong>Бухгалтерия - Общий отдел</strong>
              </td>
              <td className="col-t smaller-text">32-72-75</td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                Наумова Людмила Александровна
              </td>
              <td className="col-t smaller-text">
                <a href="mailto:buch@dvagp.ru">buch@dvagp.ru</a>
              </td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                <strong>
                  Начальник метрологического обеспечения - главный метролог
                </strong>
              </td>
              <td className="col-t smaller-text">32-41-06</td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">Бондар Петр Ефимович</td>
              <td className="col-t smaller-text">
                <a href="mailto:boms@dvagp.ru">boms@dvagp.ru</a>
              </td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                <strong>Начальник отдела технического контроля</strong>
              </td>
              <td className="col-t smaller-text">32-66-00</td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                Маркова Татьяна Александровна
              </td>
              <td className="col-t smaller-text">---</td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                <strong>Специалист по снабжению и реализации</strong>
              </td>
              <td className="col-t smaller-text">30-25-27</td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                Ванющкина Надежда Яковлевна
              </td>
              <td className="col-t smaller-text">
                <a href="mailto:omts@dvagp.ru">omts@dvagp.ru</a>
              </td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                <strong>Начальник картографического отдела</strong>
              </td>
              <td className="col-t smaller-text">35-83-57</td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">Бабичева Ирина Петровна</td>
              <td className="col-t smaller-text">---</td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                <strong>И.о начальника топографо-геодезического отдела</strong>
              </td>
              <td className="col-t smaller-text">---</td>
            </tr>
            <tr className="row-t smaller-text">
              <td className="col-t smaller-text">
                Сапронов Дмитрий Михайлович
              </td>
              <td className="col-t smaller-text">---</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}
