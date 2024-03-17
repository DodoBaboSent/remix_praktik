import {
  ActionFunctionArgs,
  json,
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { NavOuterComponent } from "../nav";
import { Breadcrumbs } from "~/breadcrumbs";
import { db } from "~/db.server";
import { useActionData, useLoaderData } from "@remix-run/react";
import { badRequest } from "~/request.server";
import { capt } from "~/sessions.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Отзывы | Дальневосточное АГП" },
    { name: "description", content: "Отзывы" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const reviews = await db.review.findMany();
  const response = await fetch(request.url + "/captcha/");
  const cap: { data: string; text: string } = await response.json();
  const session = await capt.getSession(request.headers.get("Cookie"));
  session.set("CAP_text", cap.text);
  return json(
    { reviews, cap },
    { headers: { "Set-Cookie": await capt.commitSession(session) } }
  );
}

function validateEmail(mail: string) {
  if (!mail.includes("@")) {
    return "Невалидная почта";
  }
}
function validateName(name: string) {
  if (name.length <= 3) {
    return "Имя должно быть минимум 3 символа";
  }
}
function validateText(text: string) {
  if (text.length <= 3) {
    return "Текст должен быть минимум 3 символа";
  }
}
async function validateCap(text: string, req: Request) {
  const session = await capt.getSession(req.headers.get("Cookie"));
  const text_cap = session.get("CAP_text");
  if (text !== text_cap) {
    return "Каптча введена неправильно";
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const text = form.get("text");
  const capt = form.get("captcha");
  if (
    typeof name !== "string" ||
    typeof text !== "string" ||
    typeof capt !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Некоторые поля отсутствуют.",
    });
  }
  console.log(capt);
  const fields = { name, email, text, capt };
  let fieldErrors;
  if (email !== "" && typeof email == "string") {
    fieldErrors = {
      name: validateName(name),
      email: validateEmail(email),
      text: validateText(text),
      capt: await validateCap(capt, request),
    };
  } else {
    fieldErrors = {
      name: validateName(name),
      text: validateText(text),
      capt: await validateCap(capt, request),
    };
  }
  console.log(fieldErrors);
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }
  if (typeof email == "string") {
    const new_rev = await db.review.create({
      data: {
        name: name,
        email: email,
        text: text,
      },
    });
  } else {
    const new_rev = await db.review.create({
      data: {
        name: name,
        email: "",
        text: text,
      },
    });
  }

  throw redirect("/guestbook");

  return null;
}

export default function Component() {
  const { reviews, cap } = useLoaderData<typeof loader>();
  const action_data = useActionData<typeof action>();

  return (
    <>
      <NavOuterComponent active="katalog" />
      <main className="d-flex flex-column col col-lg-9 col-xl-10 col-xxl-10">
        <Breadcrumbs
          tek="Отправить сообщение"
        />
        <h1 className="text-blue">Отзывы</h1>
        <h2 className="smaller-heading">
          Будем очень Вам благодарны, если Вы оставите свой отзыв. Спасибо!
        </h2>
        <div className="row mt-4 mb-2">
          <main className="col col-lg-6 col-xl-4 col-xxl-3">
            <form method="post" className="row g-3 padded-form">
              <div className="col-12 mt-0">
                <label htmlFor="name_id" className="form-label">
                  Ваше имя*
                </label>
                <input
                  type="text"
                  name="name"
                  id="name_id"
                  className="form-control"
                />
                {action_data?.fieldErrors?.name ? (
                  <>
                    <div className="p-3 rounded bg-danger mt-2">
                      <p className="text-light fw-bold m-0">
                        {action_data.fieldErrors.name}
                      </p>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="col-12">
                <label htmlFor="email_id" className="form-label">
                  Укажите ваш E-Mail
                </label>
                <input
                  type="email"
                  name="email"
                  id="email_id"
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <label htmlFor="text_id" className="form-label">
                  Ваше отзыв*
                </label>
                <textarea
                  name="text"
                  id="text_id"
                  className="form-control"
                ></textarea>
                {action_data?.fieldErrors?.text ? (
                  <>
                    <div className="p-3 rounded bg-danger mt-2">
                      <p className="text-light fw-bold m-0">
                        {action_data.fieldErrors.text}
                      </p>
                    </div>
                  </>
                ) : null}
              </div>
              <div
                className="col-5 py-4"
                dangerouslySetInnerHTML={{ __html: cap.data }}
              ></div>
              <div className="col-7">
                <label htmlFor="captcha_id" className="form-label">
                  Введите каптчу
                </label>
                <input
                  type="text"
                  id="captcha_id"
                  name="captcha"
                  className="form-control"
                />
                {action_data?.fieldErrors?.capt ? (
                  <>
                    <div className="p-3 rounded bg-danger mt-2">
                      <p className="text-light fw-bold m-0">
                        {action_data.fieldErrors.text}
                      </p>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="col-4">
                <button className="send-btn w100">Отправить</button>
              </div>
            </form>
            <div id="form-error-message">
              {action_data?.formError ? (
                <p
                  className="border p-3 rounded border-danger mt-1"
                  role="alert"
                >
                  {action_data.formError}
                </p>
              ) : null}
            </div>
          </main>
        </div>
        {reviews.map((El) => {
          return (
            <>
              <div className="smaller-text padded-otzyv mt-3 w-75">
                <div className="d-flex flex-row mb-2">
                  <p className="fw-bold text-blue me-2 mb-0">{El.name}</p>
                  <p className="text-secondary me-2 mb-0">{new Date(El.createdAt).toLocaleDateString(new Intl.Locale("ru"))}</p>
                </div>
                {El.email ? (
                  <>
                    <p className="text-text-secondary mb-2">{El.email}</p>
                  </>
                ) : null}
                <p className="mb-2 p-3 bg-light rounded">{El.text}</p>
              </div>
            </>
          );
        })}
      </main>
    </>
  );
}
