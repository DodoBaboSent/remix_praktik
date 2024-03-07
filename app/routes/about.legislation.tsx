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

const files = await db.file.findMany()

export default function Legislation() {
    return (
        <>
            <NavOuterComponent active="about" />
            <main className="d-flex flex-column col col-lg-6 col-xl-7 col-xxl-7">
                <Breadcrumbs prev="/about" nprev="О предприятии" />
                <h1 className="text-blue">Законодательные основы</h1>
                <h2 className="smaller-heading"></h2>
                {files.map((file) => {
                    return (
                        <>
                            <a href={"/files/"+file.filePath} className="fw-bold text-inherit smaller-text" download>{file.fileName}</a>
                        </>
                    )
                })}
            </main>
        </>
    );
}