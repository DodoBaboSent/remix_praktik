
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useEffect, useState } from "react";

export const links: LinksFunction = () => [
  {
    rel: "icon",
    href: "/favicon.ico",
    type: "image/png",
  },
  {
    rel: "stylesheet",
    href: "/style.css",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    integrity: "sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC",
    crossOrigin: "anonymous"
  },
];

export default function App() {

  const [windowSize, setWindowSize] = useState({
    windowWidth: 0
  })

  useEffect(() => {
    const currentWindowWidth = window.innerWidth;
    setWindowSize({
      windowWidth: currentWindowWidth,
    });
  }, []);


  useEffect(() => {
    const handleWindowSize = () => {
      const currentWindowWidth = window.innerWidth;
      setWindowSize({ windowWidth: currentWindowWidth })
    };
    window.addEventListener('resize', handleWindowSize)
    return () => {
      window.removeEventListener('resize', handleWindowSize)
    };
  }, [windowSize.windowWidth]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=1366, initial-scale=1" />
        <Meta />
        <Links />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
      </head>
      <body className="d-flex flex-column">
        <ScrollRestoration />
        <LiveReload />
        <header className="bg-header-right d-flex flex-row w-100" style={{ justifyContent: (windowSize.windowWidth >= 1366) ? "space-around" : undefined }}>
          <div className="d-flex align-items-center logo">
            <img src="assets/logoDVAGP.gif" alt="logo" className="img-logo" />
          </div>
          <div className="d-flex flex-column justify-content-center">
            <div className="d-flex flex-row mb-3">
              <div className="bar"></div>
              <p className="padded text-white m-0 fw-bold">Акционерное общество</p>
            </div>
            <h1 className="text-bold name">Дальневосточное аэрогеодезическое предприятие</h1>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="img-inside">
              <input type="text" className="search-box ps-4_5"></input>
            </div>
          </div>
        </header>
        <div className="container-fluid flex-row mt-4 mb-5">
          <div className="row px-2">
            <Outlet />
            <aside className="d-flex flex-column col col-lg-3 col-xl-3 col-xxl-3">
              <h1 className="mb-4 text-start text-blue mb-4">Новости</h1>
              <div className="d-flex flex-column">
                <p className="text-start fs-6 gray-text mb-0 mt-0">11.08.2022</p>
                <p className="text-start"><a href="http://dvagp.ru/news/39436/" className="text-inherit fw-bold">Сообщение о проведении внеочередного Общего собрания акционеров акционерного общества «Дальневосточное аэрогеодезическое предприятие»</a></p>
              </div>
              <div className="d-flex flex-row align-items-center mt-3">
                <img src="assets/icon-archive.gif" alt="archive" className="me-1" />
                <p className="mb-0"><a href="news/index.html" className="text-inherit">Архив новостей</a></p>
              </div>
            </aside>
          </div>
        </div>
        <footer className="container-fluid flex-row pt-4">
          <div className="row pb-4">
            <aside className="col col-lg-3 col-xl-2 col-xxl-2 d-flex flex-column">
              <p>
                <strong>© АО «ДВ АГП», 2023</strong> <br />
                Все права защищены и принадлежат <br />
                компании АО «ДВ АГП»
              </p>
            </aside>
            <main className="col col-lg-6 col-xl-7 col-xxl-7 d-flex flex-column">
              <p><strong>Контактные данные</strong><br />680000, Россия, г.Хабаровск, ул. Шеронова, 97<br />Тел.: (4212) 30-43-19, 32-40-58 Факс: 30-43-19<br />E-mail: dvagp@dvagp.ru</p>
            </main>
            <aside className="col col-lg-3 col-xl-2 col-xxl-2 d-flex flex-column">
              <p>Разработка сайта, 2023<br />Студент ХКОТСО Наугольнов А.И.</p>
            </aside>
          </div>
        </footer>
        <Scripts />
      </body>
    </html>
  );
}
