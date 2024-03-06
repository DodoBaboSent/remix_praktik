import type { MetaFunction } from "@remix-run/node";
import { NavOuterComponent } from "../nav"
import { Breadcrumbs } from "~/breadcrumbs";
import { db } from "~/db.server";

export const meta: MetaFunction = () => {
    return [
        { title: "О предприятии | Дальневосточное АГП" },
        { name: "description", content: "О нас" },
    ];
};

// const files = db.

export default function Legislation() {
    return (
        <>
            <NavOuterComponent active="about" />
            <main className="d-flex flex-column col col-lg-6 col-xl-7 col-xxl-7">
                <Breadcrumbs prev="/about" nprev="О предприятии" />
                <h1 className="text-blue">Законодательные основы</h1>
                <h2 className="smaller-heading"></h2>
                <a href="/files/UstavOAODVAGP.docx" className="fw-bold text-inherit smaller-text" download>Устав ОАО "ДВ АГП"</a>
                <a href="/files/Ukaz296.docx" className="fw-bold text-inherit smaller-text" download>УКАЗ Президента РФ от 12 марта 2012 № 296 "ОБ ОТКРЫТОМ АКЦИОНЕРНОМ ОБЩЕСТВЕ "РОСКАРТОГРАФИЯ"</a>
                <a href="/files/RoskartografiaDZO.docx" className="fw-bold text-inherit smaller-text" download>ПОРЯДОК ВЗАИМОДЕЙСТВИЯ ОАО «Роскартография» с открытыми акционерными обществами, акциями которых владеет ОАО «Роскартография»</a>
                <a href="/files/Izm_v_ustav.docx" download className="fw-bold text-inherit smaller-text">Изменения в Устав ОАО "ДВ АГП"</a>
            </main>
        </>
    );
}