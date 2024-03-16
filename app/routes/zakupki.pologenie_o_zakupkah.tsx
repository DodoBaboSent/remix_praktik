import type { MetaFunction } from "@remix-run/node";
import { NavOuterComponent } from "../nav";
import { Breadcrumbs } from "~/breadcrumbs";

export const meta: MetaFunction = () => {
  return [
    { title: "Закупки | Дальневосточное АГП" },
    { name: "description", content: "Закупки" },
  ];
};

export default function PZakupki() {
  return (
    <>
      <NavOuterComponent active="zakupki" />
      <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
        <Breadcrumbs
          prev="/about"
          nprev="О предприятии"
          tek="История предприятия"
        />
        <h1 className="text-inherit polozhenie text-center">
          ПОЛОЖЕНИЕ
          <br />О ЗАКУПКАХ ТОВАРОВ, РАБОТ, УСЛУГ
          <br /> для нужд акционерного общества
          <br />
          <br />
          «Дальневосточное аэрогеодезическое предприятие»
          <br />
          <br />
          (АО «ДВ АГП»)
        </h1>
        <hr />
        <p className="polozhenie text-justify">
          Настоящее Положение о закупках товаров, работ, услуг АО «ДВ АГП»
          (далее – Общество) регулирует отношения, связанные с проведением
          закупок для нужд Общества, в целях создания условий для своевременного
          и полного обеспечения потребностей Общества в товарах, работах,
          услугах с необходимыми показателями цены, качества и надежности,
          эффективного использования денежных средств и реализации мер,
          направленных на сокращение издержек Общества, развития и
          стимулирования добросовестной конкуренции, обеспечения информационной
          открытости закупок, предотвращения коррупции и других злоупотреблений.
        </p>
        <hr />
        <p className="smaller-text">
          Скачать с сервера Положение о закупках ОАО "ДВ АГП" от 17.01.2013г. в
          формате: <br />{" "}
        </p>
        <ul className="smaller-text">
          <li>
            <a
              href="/files/Pologenie_o_zakupkah_OAO_DVAGP.doc"
              className="text-inherit"
              download
            >
              Microsoft Word
            </a>
          </li>
          <li>
            <a
              href="/files/Pologenie_o_zakupkah_OAO_DVAGP.rar"
              className="text-inherit"
              download
            >
              Архив WinRar
            </a>
          </li>
        </ul>
        <br />
        <div className="d-flex flex-row">
          <img
            src="/assets/printer.png"
            alt="printer icn"
            className="fit-icon"
            style={{width: "15px !important"}}
          />
          <a
            href="http://dvagp.ru/zakupki/pologenie_o_zakupkah/pologenie_o_zakupkah_print/"
            className="text-inherit smaller-text ms-2"
          >
            Версия для печати
          </a>
        </div>
      </main>
    </>
  );
}
