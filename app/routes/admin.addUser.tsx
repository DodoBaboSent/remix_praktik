import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { db } from "~/db.server";
import { badRequest } from "~/request.server";
import {
  validateName,
  validatePass,
  validateRole,
} from "~/validators.server";
import bcrypt from "bcryptjs";
import { requireUser } from "~/sessions.server";
import { render } from "@react-email/render";
import { Email } from "~/email/regMail";
import { sendTransEmail } from "~/email.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request, "/admin/");
  return null;
}

async function validateEmail(text: string) {
  if (!text.includes("@")) {
    return "Невалидная почта";
  }
  if (text.length <= 3) {
    return "Невалидная почта";
  }
  if (text === "master") {
    return null;
  }
  const data = await db.user.findUnique({
    where: {
      email: text,
    },
  });
  if (data) {
    return "Почта уже занята";
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const user_body = form.get("userBody");
  const user_name = form.get("userName");
  const user_pass = form.get("userPass");
  const user_mail = form.get("userMail");
  if (
    typeof user_body !== "string" ||
    typeof user_name !== "string" ||
    typeof user_mail !== "string" ||
    typeof user_pass !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Некоторые поля отсутствуют.",
    });
  }
  const fields = { user_body, user_name, user_pass, user_mail };
  const fieldErrors = {
    user_body: validateRole(user_body),
    user_name: validateName(user_name),
    user_pass: validatePass(user_pass),
    user_mail: await validateEmail(user_mail),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const user_user = await db.user.create({
    data: {
      role: user_body!.toString(),
      email: user_mail,
      username: user_name,
      active: false,
      passwordHash: (await bcrypt.hash(user_pass, 10)).toString(),
    },
  });
  const emailHtml = render(<Email id={`${user_user.id}`} />);
  const mail = sendTransEmail({ to: user_mail, subject: "Активация аккаунта", html: emailHtml });
  throw redirect("/admin/admin-panel/users");

  return null;
}

export default function AdminPanel() {
  const action_data = useActionData<typeof action>();

  return (
    <>
      <form className="p-3 border rounded d-flex flex-column" method="post">
        <div className="d-flex flex-column">
          <label htmlFor="userName_id">Имя пользователя</label>
          <input type="text" name="userName" id="userName_id" />
        </div>
        {action_data?.fieldErrors?.user_name ? (
          <>
            <div className="p-3 rounded bg-danger">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.user_name}
              </p>
            </div>
          </>
        ) : null}
        <div className="d-flex flex-column">
          <label htmlFor="userBody_id">Роль</label>
          <input type="text" name="userBody" id="userBody_id" />
        </div>
        {action_data?.fieldErrors?.user_body ? (
          <>
            <div className="p-3 rounded bg-danger">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.user_body}
              </p>
            </div>
          </>
        ) : null}
        <div className="d-flex flex-column">
          <label htmlFor="userMail_id">Почта</label>
          <input type="text" name="userMail" id="userMail_id" />
        </div>
        {action_data?.fieldErrors?.user_mail ? (
          <>
            <div className="p-3 rounded bg-danger">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.user_mail}
              </p>
            </div>
          </>
        ) : null}
        <div className="d-flex flex-column">
          <label htmlFor="userPass_id">Пароль</label>
          <input type="password" name="userPass" id="userPass_id" />
        </div>
        {action_data?.fieldErrors?.user_pass ? (
          <>
            <div className="p-3 rounded bg-danger">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.user_pass}
              </p>
            </div>
          </>
        ) : null}
        <button type="submit" className="btn btn-primary mt-3">
          Добавить
        </button>
        <div id="form-error-message">
          {action_data?.formError ? (
            <p className="border p-3 rounded border-danger mt-1" role="alert">
              {action_data.formError}
            </p>
          ) : null}
        </div>
      </form>
    </>
  );
}
