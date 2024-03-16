import type { MetaFunction } from "@remix-run/node";
import { NavOuterComponent } from "../nav";
import { Breadcrumbs } from "~/breadcrumbs";

export const meta: MetaFunction = () => {
  return [
    { title: "Закупки | Дальневосточное АГП" },
    { name: "description", content: "Закупки" },
  ];
};

export default function AZakupki() {
  return (
    <>
      <NavOuterComponent active="zakupki" />
      <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
        <Breadcrumbs
          prev="/about"
          nprev="О предприятии"
          tek="История предприятия"
        />
        <h1 className="text-blue">Закупки</h1>
      </main>
    </>
  );
}
