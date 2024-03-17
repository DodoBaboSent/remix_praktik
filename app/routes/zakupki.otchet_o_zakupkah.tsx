import type { MetaFunction } from "@remix-run/node";
import { NavOuterComponent } from "../nav";
import { Breadcrumbs } from "~/breadcrumbs";


export default function OZakupki() {
  return (
    <>
      <NavOuterComponent active="zakupki" />
      <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
        <Breadcrumbs
          prev="/zakupki"
          nprev="Закупки"
          tek="Квартальные отчеты о закупках"
        />
        <h1 className="text-blue">Квартальные отчеты о закупках</h1>
      </main>
    </>
  );
}
