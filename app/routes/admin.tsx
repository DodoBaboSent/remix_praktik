import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { badRequest } from "~/request.server";
import { login, createUserSession } from "~/sessions.server";

export const meta: MetaFunction = () => {
    return [
        { title: "Администрирование | Дальневосточное АГП" },
        { name: "description", content: "Администрирование" },
        { name: "robots", content: "none" },
    ];
  };

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