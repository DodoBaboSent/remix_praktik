import {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { db } from "~/db.server";
import { badRequest } from "~/request.server";
import { requireUser } from "~/sessions.server";
import { TechGroups } from "~/tech_groups";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const user = requireUser(request, "/admin/");
  const change_id = await db.tech.findFirst({
    where: {
      id: params.id,
    },
  });
  const techGroup = await db.techGroup.findMany();
  return json({ change_id, techGroup });
}

async function validateId(tech_id: string, old_id: string) {
  if (tech_id.length == 0) {
    return "ID не может быть пустым";
  }
  if (tech_id !== old_id) {
    const overlap = await db.techImg.findFirst({
      where: {
        id: tech_id,
      },
    });
    if (overlap !== null) {
      return "Такой ID уже занят";
    }
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

async function validateName(tech_name: string, old_name: string) {
  if (tech_name.length == 0) {
    return "Название не может быть пустым";
  }
  if (tech_name !== old_name) {
    const overlap = await db.techImg.findFirst({
      where: {
        name: tech_name,
      },
    });
    if (overlap !== null) {
      return "Такое имя уже занято";
    }
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const old_id = form.get("oldValue");
  const old_name = form.get("oldName");
  const tech_id = form.get("techId");
  const tech_name = form.get("techName");
  const tech_group = form.get("techGroup");
  const tech_quant = form.get("techQuant");
  if (
    typeof old_id !== "string" ||
    typeof tech_id !== "string" ||
    typeof tech_name !== "string" ||
    typeof tech_group !== "string" ||
    typeof tech_quant !== "string" ||
    typeof old_name !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Некоторые поля отсутствуют.",
    });
  }
  const fields = { tech_name, tech_id, tech_group, tech_quant };
  const fieldErrors = {
    tech_id: await validateId(tech_id, old_id),
    tech_name: await validateName(tech_name, old_name),
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
  const updated_db = await db.tech.update({
    where: {
      id: old_id!.toString(),
    },
    data: {
      id: tech_id!.toString(),
      name: tech_name!.toString(),
      quant: Number(tech_quant),
      techGroupId: tech_group!.toString(),
    },
  });
  throw redirect("/admin/admin-panel/tech");
  return null;
}

export default function AdminPanel() {
  const { change_id, techGroup } = useLoaderData<typeof loader>();
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
          <label htmlFor="techId_id">ID</label>
          <input
            type="text"
            name="techId"
            id="techId_id"
            defaultValue={change_id?.id}
          />
          {action_data?.fieldErrors?.tech_id ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.tech_id}
              </p>
            </div>
          ) : null}
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="techName_id">Name</label>
          <input
            type="text"
            name="techName"
            id="techName_id"
            defaultValue={change_id?.name}
          />
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
          <input
            type="text"
            name="techQuant"
            id="techQuant_id"
            defaultValue={change_id?.quant}
          />
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
          <input
            type="text"
            name="techGroup"
            id="techGroup_id"
            defaultValue={change_id?.techGroupId?.toString()}
          />
          {action_data?.fieldErrors?.tech_group ? (
            <div className="p-3 rounded bg-danger mt-2">
              <p className="text-light fw-bold m-0">
                {action_data.fieldErrors.tech_group}
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
      <TechGroups techGroup={techGroup} />
    </>
  );
}
