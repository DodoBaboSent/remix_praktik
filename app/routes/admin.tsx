import type { MetaFunction } from "@remix-run/node";
import { NavOuterComponent } from "../nav"
import { Outlet } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "Администрирование | Дальневосточное АГП" },
        { name: "description", content: "Администрирование" },
        { name: "robots", content: "none" },
    ];
};

export default function Admin() {



    return (
        <>
            <Outlet />
        </>
    );
}
