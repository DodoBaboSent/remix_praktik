import {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";
import { badRequest } from "~/request.server";
import { requireUser } from "~/sessions.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const user = await requireUser(request, "/admin/");
  const change_id = await db.techGroup.findFirst({
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
    const overlap = await db.techGroup.findFirst({
      where: {
        name: name,
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
    const overlap = await db.techGroup.findFirst({
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
  const group_id = form.get("groupId");
  const group_name = form.get("groupName");
  if (
    typeof old_id !== "string" ||
    typeof group_id !== "string" ||
    typeof group_name !== "string" ||
    typeof old_name !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Некоторые поля отсутствуют.",
    });
  }
  const fields = { group_name, group_id };
  const fieldErrors = {
    group_id: await validateId(group_id, old_id),
    group_name: await validateName(group_name, old_name),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }
  const updated_db = await db.techGroup.update({
    where: {
      id: old_id!.toString(),
    },
    data: {
      id: group_id!.toString(),
      name: group_name?.toString(),
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
          value={change_id?.name}
        />
        <div className="d-flex flex-column">
          <label htmlFor="groupId_id">ID</label>
          <input
            type="text"
            name="groupId"
            id="groupId_id"
            defaultValue={change_id?.id}
          />
          {action_data?.fieldErrors?.group_id ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.group_id}
              </p>
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="groupName_id">Name</label>
          <input
            type="text"
            name="groupName"
            id="groupName_id"
            defaultValue={change_id?.name}
          />
          {action_data?.fieldErrors?.group_name ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.group_name}
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
