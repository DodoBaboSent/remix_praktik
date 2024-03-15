import type { MetaFunction } from "@remix-run/node";
import { NavOuterComponent } from "../nav"
import { Breadcrumbs } from "~/breadcrumbs";

export const meta: MetaFunction = () => {
    return [
        { title: "О предприятии | Дальневосточное АГП" },
        { name: "description", content: "О нас" },
    ];
};

export default function About() {

    return (
        <>
            <NavOuterComponent active="about" />
            <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
                <Breadcrumbs prev="/about" nprev="О предприятии" tek="Структура предприятия"/>
                <h1 className="text-blue">Структура предприятия</h1>
                <h2 className="smaller-heading"></h2>
                <img src="/assets/structure23.png" alt="structure" className="structure"/>
            </main>
        </>
    );
}

