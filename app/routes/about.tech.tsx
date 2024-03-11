import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { NavOuterComponent } from "../nav"
import { Breadcrumbs } from "~/breadcrumbs";
import { db } from "~/db.server";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "О предприятии | Дальневосточное АГП" },
        { name: "description", content: "О нас" },
    ];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const tech = await db.techGroup.findMany()
    return json(tech)
}

export async function loadTech(id: string) {
    const data = await db.tech.findMany({
        where: {
            techGroupId: id
        }
    })
    return (
        <>
            {data.map((currEl, index) => {
                return (
                    <>
                        <tr className="row-t smaller-text" key={"tech"+currEl.id+index}>
                            <td className="col-t">{currEl.name}</td>
                            <td className="col-t br-right tighter-cell">{currEl.quant}</td>
                        </tr>
                    </>
                )
            })}
        </>
    )
}

export default function About() {
    const tech = useLoaderData<typeof loader>()

    return (
        <>
            <NavOuterComponent active="about" />
            <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
                <Breadcrumbs prev="/about" nprev="О предприятии" tek="Руководство ДВ АГП" />
                <h1 className="text-blue">Техническое оснащение</h1>
                <h2 className="smaller-heading"></h2>
                <div className="table-responsive">
                    <table className="table table-sm">
                        <thead>
                            <tr className="row-h">
                                <th className="col-t">Наименование технических средств</th>
                                <th className="col-t">Количество</th>
                                <th className="col-t">Изображение</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tech.map((currEll, index) => {
                                const colspan = 3
                                return (
                                    <>
                                        <tr className="row-t" key={"group"+currEll.id+index}>
                                            <td className="col-t" colSpan={colspan}><strong>{currEll.name}</strong></td>
                                        </tr>
                                        {loadTech(currEll.id)}
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}

