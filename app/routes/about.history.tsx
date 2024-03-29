import type { MetaFunction } from "@remix-run/node";
import { NavOuterComponent } from "../nav";
import { Breadcrumbs } from "~/breadcrumbs";

export const meta: MetaFunction = () => {
  return [
    { title: "История | Дальневосточное АГП" },
    { name: "description", content: "История" },
  ];
};

export default function About() {
  return (
    <>
      <NavOuterComponent active="about" />
      <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
        <Breadcrumbs
          prev="/about"
          nprev="О предприятии"
          tek="История предприятия"
        />
        <h1 className="text-blue">История предприятия</h1>
        <h2 className="smaller-heading"></h2>
        <p className="smaller-text">
          07.07.1954 г. - создан отдельно действующий топографогеодезический
          отряд №216 с непосредственным подчинением ГУГК МВД СССР в г.
          Хабаровске.
        </p>
        <p className="smaller-text">
          <strong className="text-orange">
            01.02.1957 г. на базе отдельно действующего отряда №216 организовано
            Дальневосточное аэрогеодезическое предприятие ГУГК МВД СССР (ДВ АГП,
            г. Хабаровск).
          </strong>
        </p>
        <p className="smaller-text">
          01.02.1957 г. были организованы отряды №216 и №217: Отряд №216,
          нестационарный – г.Иман (ныне г. Дальнереченск), отряд №217,
          стационарный – г. Хабаровск.
        </p>
        <p className="smaller-text">
          06.03.1957 г. создан планово-производственный отдел (ППО) ДВ АГП.
        </p>
        <p className="smaller-text">
          10.03.1958 г. организация камерального производства ДВ АГП: созданы
          стереобригада и фотограмметрическая группа. ДВ АГП ГУГК Министерства
          геологии и охраны недр СССР с 04.04.1960 г. 01.01.1962 г. ДВ АГП
          переименовано в Предприятие №2 ГУГК при СМ СССР.
        </p>
        <p className="smaller-text">
          01.01.1963 г. Наименования камеральных подразделений были изменены на
          следующие:
        </p>
        <ol>
          <li className="smaller-text">
            группы стереотопографическая и картографическая объединены в цех
            камеральных работ (ЦКР);
          </li>
          <li className="smaller-text">
            проектно-вычислительное бюро, проектно-рекогносцировочное бюро.
          </li>
        </ol>
        <p className="smaller-text">
          01.03.1967 г. организован фотоцех (цех №3).
        </p>
        <p className="smaller-text">
          01.01.1987 г. Предприятие №2 реорганизовано в Дальневосточное
          аэрогеодезическое производственное объединение ''Дальаэрогеодезия'' с
          непосредственным подчинением ГУГК при СМ СССР; в состав ПО
          ''Дальаэрогеодезия» входят вновь образованное Предприятие №25, ОКЭ
          №21, 22, 23, 27, экспедиция 307 и все вспомогательные службы.
        </p>
        <p className="smaller-text">
          01.04.1989 г.Предприятие №25 переименовано в Приморское АГП ПО
          «Дальаэрогеодезия» при СМ СССР
        </p>
        <p className="smaller-text">
          01.01.1990 г.Предприятие №27 переименовано в Хабаровское
          аэрогеодезическое предприятие ПО «Дальаэрогеодезия» (присвоенный №27
          сохранен для внутриведомственного пользования).
        </p>
        <p className="smaller-text">
          24.12.1991 г. Главкартография РСФСР преобразована в Комитет геодезии и
          картографии РСФСР (Госгеодезия РСФСР).
        </p>
        <p className="smaller-text">
          01.01.1992 г. ПО «Дальаэрогеодезия» присвоено наименование
          «Дальневосточное аэрогеодезическое предприятие» Комитета по геодезии и
          картографии Министерства экологии и природных ресурсов РФ (ДВ АГП), и
          в этот же день Хабаровское АГП реорганизовано в связи с его вхождением
          в качестве структурного подразделения Дальневосточного АГП – на базе
          Хабаровского АГП создана Хабаровская топографо-геодезическая
          экспедиция (ХТГЭ).
        </p>
        <p className="smaller-text">
          12.01.1992 г. Комитет по геодезии и картографии РСФСР переименован в
          Комитет по геодезии и картографии Министерства экологии и природных
          ресурсов РФ.
        </p>
        <p className="smaller-text">
          30.09.1992 г. Комитет по геодезии и картографии Министерства экологии
          и природных ресурсов РФ реорганизован в Федеральную службу геодезии и
          картографии России с непосредственным подчинением Правительству РФ
          (ФСГиК Роскартография).
        </p>
        <p className="smaller-text">
          01.01.1994 г. организован Дальневосточный производственный центр
          геоинформации (Дальгеоинформ) – структурное подразделение ДВ АГП.
        </p>
        <p className="smaller-text">
          01.01.1999 г. на базе Приморского центра геодезии и картографии
          (ПЦГиК) ДВ АГП создано Приморское государственное унитарное
          аэрогеодезическое предприятие (ПримАГП) Федеральной службы геодезии и
          картографии России.
        </p>
        <p className="smaller-text">
          С 01.04.2003г. организована Хабаровская топографо-геодезическая
          экспедиция (г.Хабаровск).
        </p>
        <p className="smaller-text">
          С 18.05.2004г. созданы следующие филиалы ФГУП «ДВ АГП» - Амурская
          топографо-геодезическая экспедиция (г.Свободный), партия №4 Хабровской
          топографо-геодезической экспедиции (г.Петропавловск-Камчатский),
          Сахалинская топографо-геодезическая экспедиция (г.Южно-Сахалинск).
        </p>
        <p className="smaller-text">
          С 1.01.2006г. Дальгеоинформ преобразован в цех №1 камерального
          производства ФГУП «ДВ АГП».
        </p>
        <p className="smaller-text">
          C 20.09.2012 ФГУП "ДВ АГП" реорганизовано в форме преобразования в
          открытое акционерное общество "Дальневосточное аэрогеодезическое
          предприятие" (Распоряжение Федарального агенства по управлению
          государственным имуществом №1421-р от 23 августа 2012 года).
        </p>
        <p className="smaller-text">
          В настоящее время в открытое акционерное общество «Дальневосточное
          аэрогеодезическое предприятие» входят 4 топографо-геодезические
          экспедиции – Амурская, Камчатская, Сахалинская, Хабаровская, цех
          картографических работ, производственно-техническая база.
        </p>
      </main>
    </>
  );
}
