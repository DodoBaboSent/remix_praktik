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
import { validateBody } from "~/validators.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const user = await requireUser(request, "/admin/");
  const change_id = await db.news.findFirst({
    where: {
      id: params.id,
    },
  });
  return json(change_id);
}

function validateName(body: string) {
  if (body.length == 0) {
    return "Имя не может быть пустым";
  }
}

async function validateId(id: string, old_id: string) {
  if (id.length == 0) {
    return "ID не может быть пустым";
  }
  if (id !== old_id) {
    const overlap = await db.news.findFirst({
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
  const new_id = form.get("newId");
  const new_body = form.get("newBody");
  const new_name = form.get("newName");
  if (
    typeof old_id !== "string" ||
    typeof new_id !== "string" ||
    typeof new_body !== "string" ||
    typeof new_name !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Некоторые поля отсутствуют.",
    });
  }
  const fields = { new_body, new_id, new_name };
  const fieldErrors = {
    new_id: await validateId(new_id, old_id),
    new_body: validateBody(new_body),
    new_name: validateName(new_name),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }
  const updated_db = await db.news.update({
    where: {
      id: old_id!.toString(),
    },
    data: {
      id: new_id!.toString(),
      body: new_body?.toString(),
      name: new_name,
    },
  });
  throw redirect("/admin/admin-panel/news");
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
        <div className="d-flex flex-column">
          <label htmlFor="newId_id">ID</label>
          <input
            type="text"
            name="newId"
            id="newId_id"
            defaultValue={change_id?.id}
          />
          {action_data?.fieldErrors?.new_id ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.new_id}
              </p>
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="newName_id">Name</label>
          <input
            type="text"
            name="newName"
            id="newName_id"
            defaultValue={change_id?.name}
          />
          {action_data?.fieldErrors?.new_name ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.new_name}
              </p>
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="newBody_id">Body</label>
          <textarea
            name="newBody"
            id="newBody_id"
            defaultValue={change_id?.body}
          />
          {action_data?.fieldErrors?.new_body ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.new_body}
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
