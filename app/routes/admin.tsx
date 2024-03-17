import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Администрирование | Дальневосточное АГП" },
        { name: "description", content: "Администрирование" },
        { name: "robots", content: "none" },
    ];
  };