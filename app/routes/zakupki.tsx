import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
      { title: "Закупки | Дальневосточное АГП" },
      { name: "description", content: "Закупки" },
    ];
  };