import type { MetaFunction } from "@remix-run/node";
import { NavOuterComponent } from "../nav"
import { Breadcrumbs } from "~/breadcrumbs";

export const meta: MetaFunction = () => {
    return [
        { title: "Отправить сообщение | Дальневосточное АГП" },
        { name: "description", content: "Отправить сообщение" },
    ];
};

export default function About() {
    return (
        <>
            <NavOuterComponent active="about" />
            <main className="d-flex flex-column col col-lg-6 col-xl-7 col-xxl-10">
                <Breadcrumbs prev="/about" nprev="О предприятии" tek="Отправить сообщение"/>
                <h1 className="text-blue">Отправить сообщение</h1>
                <h2 className="smaller-heading">Вы можете связаться с нами при помощи формы обратной связи. Или любым удобным способом указанным ниже.</h2>
                <div className="row mt-4"><main className="col col-lg-6 col-xl-4 col-xxl-6"><form className="row g-3 padded-form">
                    <div className="col-12 mt-0">
                        <label htmlFor="name" className="form-label">Ваше имя*</label>
                        <input type="text" name="name" id="name" className="form-control" />
                    </div>
                    <div className="col-12">
                        <label htmlFor="email" className="form-label">Укажите ваш E-Mail</label>
                        <input type="email" name="email" id="email" className="form-control" />
                    </div>
                    <div className="col-12">
                        <label htmlFor="tel" className="form-label">Ваш номер телефона</label>
                        <input type="tel" name="tel" id="tel" className="form-control" />
                    </div>
                    <div className="col-12">
                        <label htmlFor="text" className="form-label">Ваше сообщение*</label>
                        <textarea name="text" id="text" className="form-control"></textarea>
                    </div>
                    <div className="col-4 py-4"><img src="http://dvagp.ru/captcha.php?get_captcha=70808&height=30&width=100" alt="captcha" /></div>
                    <div className="col-7"><label htmlFor="captcha" className="form-label">Введите каптчу</label><input type="text" id="captcha" name="captcha" className="form-control" /></div>
                    <div className="col-4">
                        <button className="send-btn w100">Отправить</button>
                    </div>
                </form></main>
                    <aside className="col col-lg-5">
                        <p className="smaller-text"><strong>Телефоны:</strong> (4212) 32-72-32, 32-66-27, 32-40-58</p>
                        <p className="smaller-text"><strong>Факс:</strong> 30-43-19</p>
                        <p className="smaller-text"><strong>Почтовый адрес:</strong> 680000, Россия, г.Хабаровск, ул. Шеронова, 97</p>
                        <div className="d-flex flex-row">
                            <img src="/assets/icon-contacts.gif" alt="contact" className="me-2 fit-contact" />
                            <p className="smaller-text mb-0">E-mail: <a href="mailto:dvagp@dvagp.ru" className="text-inherit">dvagp@dvagp.ru</a></p>
                        </div>
                    </aside></div>
            </main>
        </>
    );
}