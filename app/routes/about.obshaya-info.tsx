import type { MetaFunction } from "@remix-run/node";
import { NavOuterComponent } from "../nav"
import { Breadcrumbs } from "~/breadcrumbs";

export const meta: MetaFunction = () => {
    return [
        { title: "О предприятии | Дальневосточное АГП" },
        { name: "description", content: "О нас" },
    ];
};

export default function ObshayaInfo() {
    return (
        <>
            <NavOuterComponent active="about" />
            <main className="d-flex flex-column col col-lg-6 col-xl-10 col-xxl-10">
                <Breadcrumbs prev="/about" nprev="О предприятии" tek="Общая информация" />
                <h1 className="text-blue">Общая информация</h1>
                <h2 className="smaller-heading">Акционерное общество<br /> «Дальневосточное  аэрогеодезическое  предприятие» (АО  «ДВ  АГП») </h2>
                <p className="mb-3 smaller-text"><strong>Организационно-правовая форма: </strong>Акционерное общество</p>
                <p className="mb-3 smaller-text"><strong>Форма собственности: </strong>Государственная</p>
                <p className="mb-3 smaller-text"><strong>Основной вид деятельности: </strong>Топографо-геодезическая, картографическая, инженерно-геодезические изыскания.</p>
                <p className="mb-3 smaller-text"><strong>Генеральный директор: </strong>Сивкова Марина Михайловна.</p>
                <p className="mb-3 smaller-text"><strong>Адреса:</strong><br />
                    Юридический   адрес:  Россия, 680000, г. Хабаровск, ул.Шеронова, 97. <br />
                    Почтовый адрес: Россия, 680000, г.Хабаровск, ул.Шеронова, 97. <br />
                    E-mail:  dvagp@dvagp.ru <br />
                    Сайт:   <a href="http://dvagp.ru/" className="text-inherit">www.dvagp.ru</a>
                </p>
                <p className="mb-3 smaller-text"><strong>Год образования организации: </strong>1957 г. <br />
                    03.03.1992г. - Зарегистрировано  за № 601 <br />
                    26.06.2002г. - Внесение записи в единый государственный реестр  за № 1022700910814 <br />
                    15.07.2006г. - Переименовано  <br />
                    23.01.2007г. - Перерегистрация  <br />
                    07.08.2009г. - Перерегистрация  (Инспекция Федеральной налоговой службы по Центральному району города Хабаровска) <br />
                    <br />
                    20.09.2012г. - Приватизация путем преобразования в ОАО "ДВ АГП" (Инспекция Федеральной налоговой службы по Центральному району г. Хабаровска - ОГРН 1122721010334) <br />
                    <br />
                    В соответствии с Гражданским Кодексом РФ, решением общего соб­рания акционеров от 10 июня 2015 г., Уставом от 23 июня 2015 г., приказом №98п от 25 июня 2015 г. установлено название предприятия – акционерное общество «Дальневосточное аэрогеодезическое предприятие» (АО «ДВ АГП»). <br />
                </p>
                <p className="mb-3 smaller-text overflow-x-hidden"><strong>Схема проезда: </strong>
                    <img src="/assets/DVAGP.jpg" alt="dvagp" className="map" />
                </p>
                <p className="mb-3 smaller-text"><strong>Телефоны: </strong>(4212) 32-72-32, 32-66-27, 32-40-58</p>
                <p className="mb-3 smaller-text"><strong>Факс: </strong>30-43-19</p>
                <div className="d-flex flex-row">
                    <img src="/assets/icon-contacts.gif" alt="contact" className="me-2 fit-contact" />
                    <p className="smaller-text mb-0">E-mail: <a href="mailto:dvagp@dvagp.ru">dvagp@dvagp.ru</a></p>
                </div>
            </main>
        </>
    );
}