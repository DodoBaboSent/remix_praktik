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
    const data = await db.tech.findMany()
    const dataImg = await db.techImg.findMany()
    return json({ tech, data, dataImg })
}

export default function About() {
    const { tech, data, dataImg } = useLoaderData<typeof loader>()
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
                                        <tr className="row-t" key={"group" + currEll.id + index}>
                                            <td className="col-t" colSpan={colspan}><strong>{currEll.name}</strong></td>
                                        </tr>
                                        {data.filter((filterEl) => {
                                            return (filterEl.techGroupId == currEll.id)
                                        }).map((currEll_in, index, arr) => {
                                            if (index == 0) {
                                                return (<>
                                                    <tr className="row-t smaller-text" key={currEll_in.id + index + "tr"}>
                                                        <td className="col-t" key={currEll_in.id + index + "td"}>{currEll_in.name}</td>
                                                        <td className="col-t br-right tighter-cell" key={currEll_in.id + index + "td_quant"}>{currEll_in.quant}</td>
                                                        {dataImg.filter((filEll) => {
                                                            return (filEll.techGroupId == currEll.id)
                                                        }).map((imgCurr, index) => {
                                                            return (
                                                                <>
                                                                    <td className="col-img" rowSpan={arr.length} key={imgCurr.techGroupId!+index+"_img"}>
                                                                        <div className="d-flex flex-column" key={imgCurr.techGroupId!+index+"_div"}>
                                                                            <img src={"/assets/"+imgCurr.img} alt={imgCurr.name} key={imgCurr.techGroupId!+index+"_img_tag"}/>
                                                                            <p key={imgCurr.techGroupId!+index+"_p"}>{imgCurr.name}</p>
                                                                        </div>
                                                                    </td>
                                                                </>
                                                            )
                                                        })}
                                                    </tr>
                                                </>)
                                            } else {
                                                return (<><tr className="row-t smaller-text" key={currEll_in.id + index + "tr"}>
                                                    <td className="col-t" key={currEll_in.id + index + "td"}>{currEll_in.name}</td>
                                                    <td className="col-t br-right tighter-cell" key={currEll_in.id + index + "td_quant"}>{currEll_in.quant}</td>
                                                </tr></>)
                                            }

                                        })}
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

