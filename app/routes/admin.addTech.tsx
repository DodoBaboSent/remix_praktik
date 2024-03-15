import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { db } from "~/db.server";
import { badRequest } from "~/request.server";

function validateName(name: string) {
  if (name.length <= 3) {
    return "Имя должно быть больше 3 символов";
  }
}

async function validateGroup(group: string) {
  const techGroup = await db.techGroup.findMany();
  if (!techGroup.find((haystack) => haystack.id == group)) {
    return "Группа не найдена";
  }
}

function validateQuant(quant: string) {
  if (Number(quant) == 0) {
    return "Количество не может быть равно нулю";
  }
  if (typeof Number(quant) !== "number") {
    return "Количество должно быть числом";
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const tech_name = form.get("techName");
  const tech_group = form.get("techGroup");
  const tech_quant = form.get("techQuant");
  if (
    typeof tech_name !== "string" ||
    typeof tech_group !== "string" ||
    typeof tech_quant !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Некоторые поля отсутствуют.",
    });
  }
  const fields = { tech_name, tech_group, tech_quant };
  const fieldErrors = {
    tech_name: validateName(tech_name),
    tech_group: await validateGroup(tech_group),
    tech_quant: validateQuant(tech_quant),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const new_tech = await db.tech.create({
    data: {
      name: tech_name!.toString(),
      quant: Number(tech_quant),
      techGroupId: tech_group!.toString(),
    },
  });
  throw redirect("/admin/admin-panel/tech");

  return null;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const techGroup = await db.techGroup.findMany();
  return json({ techGroup });
}

export default function AdminPanel() {
  const action_data = useActionData<typeof action>();
  const { techGroup } = useLoaderData<typeof loader>();
  const [showGroups, setShowGroups] = useState(false);

  return (
    <>
      <form className="p-3 border rounded d-flex flex-column" method="post">
        <div className="d-flex flex-column">
          <label htmlFor="techName_id">Name</label>
          <input type="text" name="techName" id="techName_id" />
          {action_data?.fieldErrors?.tech_name ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.tech_name}
              </p>
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="techQuant_id">Quantity</label>
          <input type="text" name="techQuant" id="techQuant_id" />
          {action_data?.fieldErrors?.tech_quant ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.tech_quant}
              </p>
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="techGroup_id">Group</label>
          <input type="text" name="techGroup" id="techGroup_id" />
          {action_data?.fieldErrors?.tech_group ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.tech_group}
              </p>
            </div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Создать технику
        </button>
        <div id="form-error-message">
          {action_data?.formError ? (
            <p className="border p-3 rounded border-danger mt-1" role="alert">
              {action_data.formError}
            </p>
          ) : null}
        </div>
      </form>
      {showGroups ? (
        <>
          <div
            className="border rounded p-3 d-flex flex-row mt-2 hover-cursor"
            onClick={() => setShowGroups(false)}
          >
            <p className="fw-bold m-0">▼ Нажмите, чтобы скрыть список групп</p>
          </div>
          <h1>Группы</h1>
          <div className="d-flex flex-column p-3 border rounded">
            {techGroup.map((El) => {
              return (
                <>
                  <div
                    className="d-flex flex-row border-bottom panel-row"
                    key={El.id + "_div"}
                  >
                    <p
                      className="border-end p-2 m-0"
                      style={{ width: "400px" }}
                      key={El.id + "_id"}
                    >
                      {El.id}
                    </p>
                    <p
                      className="border-end p-2 m-0"
                      style={{ width: "400px" }}
                      key={El.id + "_name"}
                    >
                      {El.name}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div
            className="border rounded p-3 d-flex flex-row mt-2 hover-cursor"
            onClick={() => setShowGroups(true)}
          >
            <p className="fw-bold m-0">
              ▼ Нажмите, чтобы раскрыть список групп
            </p>
          </div>
        </>
      )}
    </>
  );
}
