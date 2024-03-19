import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { db } from "~/db.server";
import { badRequest } from "~/request.server";
import { requireUser } from "~/sessions.server";
import { validateName } from "~/validators.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request, "/admin/");
  return null
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const group_name = form.get("groupName");
  if (typeof group_name !== "string") {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Некоторые поля отсутствуют.",
    });
  }
  const fields = { group_name };
  const fieldErrors = {
    group_name: await validateName(group_name),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const new_group = await db.techGroup.create({
    data: {
      name: group_name!.toString(),
    },
  });
  throw redirect("/admin/admin-panel/tech");

  return null;
}

export default function AdminPanel() {
  const action_data = useActionData<typeof action>();

  return (
    <>
      <form className="p-3 border rounded d-flex flex-column" method="post">
        <div className="d-flex flex-column">
          <label htmlFor="groupName_id">Название</label>
          <input type="text" name="groupName" id="groupName_id" />
        </div>
        {action_data?.fieldErrors?.group_name ? (
          <>
            <div className="p-3 rounded bg-danger">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.group_name}
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
