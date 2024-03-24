
import type {
  ActionFunctionArgs,
} from "@remix-run/node";
import { useActionData, useSearchParams } from "@remix-run/react";
import { badRequest } from "~/request.server";
import { createUserSession, login } from "~/sessions.server";

function validateUsername(username: string) {
  if (username.length < 3) {
    return "Usernames must be at least 3 characters long";
  }
}


function validatePassword(password: string) {
  if (password.length < 4) {
    return "Passwords must be at least 6 characters long";
  }
}

function validateUrl(url: string) {
  const urls = ["/admin", "/", "/admin/admin-panel"];
  if (urls.includes(url)) {
    return url;
  }
  return "/";
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const loginType = "login";
  const password = form.get("password");
  const username = form.get("username");
  const redirectTo = validateUrl(
    (form.get("redirectTo") as string) || "/"
  );
  console.log(redirectTo)
  if (
    typeof loginType !== "string" ||
    typeof password !== "string" ||
    typeof username !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Некоторые поля отсутствуют.",
    });
  }

  const fields = { loginType, password, username };
  const fieldErrors = {
    password: validatePassword(password),
    username: validateUsername(username),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  switch (loginType) {
    case "login": {
      const user = await login({ username, password });
      console.log({ user });
      if (!user) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError:
            "Username/Password combination is incorrect",
        });
      }
      return createUserSession(user.id, redirectTo);
    }
    default: {
      return badRequest({
        fieldErrors: null,
        fields,
        formError: "Login type invalid",
      });
    }
  }
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-column align-items-center" data-light="">
        <h1>Войти</h1>
        <form method="post" className="d-flex flex-column p-3 border rounded">
          <input
            type="hidden"
            name="redirectTo"
            value={
              searchParams.get("redirectTo") ?? undefined
            }
          />
          <div className="mb-1 d-flex flex-column">
            <label htmlFor="username-input">Пользователь</label>
            <input
              type="text"
              id="username-input"
              name="username"
              className="rounded border border-dark"
              defaultValue={actionData?.fields?.username}
              aria-invalid={Boolean(
                actionData?.fieldErrors?.username
              )}
              aria-errormessage={
                actionData?.fieldErrors?.username
                  ? "username-error"
                  : undefined
              }
            />
            {actionData?.fieldErrors?.username ? (
              <p
                className="border rounded p-3 border-danger mt-1"
                role="alert"
                id="username-error"
              >
                {actionData.fieldErrors.username}
              </p>
            ) : null}
          </div>
          <div className="mb-1 d-flex flex-column">
            <label htmlFor="password-input">Пароль</label>
            <input
              id="password-input"
              name="password"
              type="password"
              className="rounded border border-dark"
              defaultValue={actionData?.fields?.password}
              aria-invalid={Boolean(
                actionData?.fieldErrors?.password
              )}
              aria-errormessage={
                actionData?.fieldErrors?.password
                  ? "password-error"
                  : undefined
              }
            />
            {actionData?.fieldErrors?.password ? (
              <p
                className="border p-3 rounded border-danger mt-1"
                role="alert"
                id="password-error"
              >
                {actionData.fieldErrors.password}
              </p>
            ) : null}
          </div>
          <div id="form-error-message">
            {actionData?.formError ? (
              <p
                className="border p-3 rounded border-danger mt-1"
                role="alert"
              >
                {actionData.formError}
              </p>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
