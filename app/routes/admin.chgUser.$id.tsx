import {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";
import { badRequest } from "~/request.server";
import bcrypt from "bcryptjs";
import { validatePass, validateRole } from "~/validators.server";
import { requireUser } from "~/sessions.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const user = requireUser(request, "/admin/");
  const change_id = await db.user.findFirst({
    where: {
      id: params.id,
    },
  });
  return json(change_id);
}

async function validateName(name: string, old_name: string) {
  if (name.length == 0) {
    return "Название не может быть пустым";
  }
  if (name !== old_name) {
    const overlap = await db.user.findFirst({
      where: {
        username: name,
      },
    });
    if (overlap !== null) {
      return "Такое имя уже занято";
    }
  }
}

async function validateId(id: string, old_id: string) {
  if (id.length == 0) {
    return "ID не может быть пустым";
  }
  if (id !== old_id) {
    const overlap = await db.user.findFirst({
      where: {
        id: id,
      },
    });
    if (overlap !== null) {
      return "Такой ID уже занят";
    }
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const old_id = form.get("oldValue");
  const old_name = form.get("oldName");
  const user_id = form.get("userId");
  const user_name = form.get("userName");
  const user_role = form.get("userRole");
  const user_pass = form.get("userPass");
  if (
    typeof old_id !== "string" ||
    typeof user_id !== "string" ||
    typeof user_name !== "string" ||
    typeof old_name !== "string" ||
    typeof user_role !== "string" ||
    typeof user_pass !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Некоторые поля отсутствуют.",
    });
  }
  const fields = { user_name, user_id, user_role, user_pass };
  const fieldErrors = {
    user_id: await validateId(user_id, old_id),
    user_name: await validateName(user_name, old_name),
    user_role: validateRole(user_role),
    user_pass: validatePass(user_pass),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }
  const updated_db = await db.user.update({
    where: {
      id: old_id!.toString(),
    },
    data: {
      id: user_id!.toString(),
      username: user_name?.toString(),
      role: user_role,
      passwordHash: (await bcrypt.hash(user_pass, 10)).toString(),
    },
  });
  throw redirect("/admin/admin-panel/tech");
  return null;
}

export default function AdminPanel() {
  const change_id = useLoaderData<typeof loader>();
  const action_data = useActionData<typeof action>();

  return (
    <>
      <form className="d-flex flex-column p-3 border rounded" method="post">
        <input
          type="text"
          name="oldValue"
          id="oldValue_id"
          hidden
          value={change_id?.id}
        />
        <input
          type="text"
          name="oldName"
          id="oldName_id"
          hidden
          value={change_id?.username}
        />
        <div className="d-flex flex-column">
          <label htmlFor="userId_id">ID</label>
          <input
            type="text"
            name="userId"
            id="userId_id"
            defaultValue={change_id?.id}
          />
          {action_data?.fieldErrors?.user_id ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.user_id}
              </p>
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="userName_id">Name</label>
          <input
            type="text"
            name="userName"
            id="userName_id"
            defaultValue={change_id?.username}
          />
          {action_data?.fieldErrors?.user_name ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.user_name}
              </p>
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="userRole_id">Role</label>
          <input
            type="text"
            name="userRole"
            id="userRole_id"
            defaultValue={change_id?.role}
          />
          {action_data?.fieldErrors?.user_role ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.user_role}
              </p>
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="userRole_id">Pass</label>
          <input
            type="password"
            name="userRole"
            id="userRole_id"
            defaultValue={`Введите новый пароль или повторите старый...`}
          />
          {action_data?.fieldErrors?.user_pass ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.user_pass}
              </p>
            </div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Сохранить изменения
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
