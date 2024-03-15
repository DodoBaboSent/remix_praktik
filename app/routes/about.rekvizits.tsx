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
                <Breadcrumbs prev="/about" nprev="О предприятии" tek="Реквизиты предприятия"/>
                <h1 className="text-blue">Реквизиты предприятия</h1>
                <h2 className="smaller-heading">Акционерное общество<br/> «Дальневосточное  аэрогеодезическое  предприятие» (АО  «ДВ  АГП») </h2>
                <p className="smaller-text mb-3"><strong>Название организации - </strong>Акционерное общество "Дальневосточное аэрогеодезическое предприятие".</p>
                <p className="smaller-text mb-3"><strong>Сокращенное название - </strong>АО "ДВ АГП".</p>
                <p className="smaller-text mb-3"><strong>Полное наименование на английском языке - </strong>Joint Stock Company "Far Eastern Aerogeodetic Enterprise"</p>
                <p className="smaller-text mb-3"><strong>Юридический адрес - </strong>РФ, 680000, Хабаровский край, г. Хабаровск, ул. Шеронова, 97</p>
                <p className="smaller-text mb-3"><strong>Почтовый адрес - </strong>РФ, 680000, Хабаровский край, г. Хабаровск, ул. Шеронова, 97</p>
                <p className="smaller-text mb-3"><strong>Электронный адрес - </strong><a href="mailto:dvagp@dvagp.ru" className="text-inherit">dvagp@dvagp.ru</a></p>
                <p className="smaller-text mb-3"><strong>Сайт предприятия - </strong><a href="http://www.dvagp.ru" className="text-inherit">www.dvagp.ru</a></p>
                <p className="smaller-text mb-3"><strong>Телефон/факс - </strong>Генеральный директор 8-4212-32-72-32. Приемная 8-4212-30-43-19</p>
                <p className="smaller-text mb-3"><strong>Рассчетный счет - </strong>40702810570000001230, <strong>корр. счет - </strong>30101810600000000608 Дальневосточный банк ПАО "СберБанк" г. Хабаровск</p>
                <p className="smaller-text mb-3"><strong>БИК - </strong>040813608</p>
                <p className="smaller-text mb-3"><strong>Идентификационный номер (ИНН) - </strong>2721196138</p>
                <p className="smaller-text mb-3"><strong>ОКВЭД - </strong>74.20.3</p>
                <p className="smaller-text mb-3"><strong>ОКПО - </strong>02570753</p>
                <p className="smaller-text mb-3"><strong>ОКАТО - </strong>08401375000</p>
                <p className="smaller-text mb-3"><strong>ОКОГУ - </strong>13423, <strong>ОКФС - </strong>12, <strong>ОКОПФ - </strong>12267</p>
                <p className="smaller-text mb-3"><strong>КПП - </strong>272101001</p>
                <p className="smaller-text mb-3"><strong>ОГРН - </strong>1122721010334</p>
                <p className="smaller-text mb-3"><strong>Руководитель - </strong>Генеральный директор - Сивкова Марина Михайловна</p>
                <p className="smaller-text mb-3"><strong>Главный бухгалтер - </strong>Федоренко Юлия Александровна</p>

            </main>
        </>
    );
}

