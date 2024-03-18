import { ActionFunctionArgs, MetaFunction, json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { db } from "~/db.server";
import { badRequest } from "~/request.server";
import { validateBody, validateName } from "~/validators.server";


export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData()
    const new_body = form.get("newBody")
    const new_name = form.get("newName")
    if (
        typeof new_body !== "string" ||
        typeof new_name !== "string"
    ) {
        return badRequest({
            fieldErrors: null,
            fields: null,
            formError: "Некоторые поля отсутствуют.",
        });
    }
    const fields = { new_body, new_name };
    const fieldErrors = {
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
    
        const new_new = await db.news.create({
            data: {
                body: new_body!.toString(),
                name: new_name
            }
        })
        throw redirect("/admin/admin-panel/news")
    
    return null
}

export default function AdminPanel() {
    const action_data = useActionData<typeof action>()

    return (
        <>
            <form className="p-3 border rounded d-flex flex-column" method="post">
            <div className="d-flex flex-column">
                    <label htmlFor="newName_id">Название</label>
                    <input type="text" name="newName" id="newName_id" defaultValue="Lorem ipsum..." />
                </div>
                {action_data?.fieldErrors?.new_name ? <>
                    <div className="p-3 rounded bg-danger">
                        <p className="text-light fw-bold m-0">{action_data.fieldErrors.new_name}</p>
                    </div>
                </> : null}
                <div className="d-flex flex-column">
                    <label htmlFor="newBody_id">Тело</label>
                    <textarea name="newBody" id="newBody_id" defaultValue="Lorem ipsum..." />
                </div>
                {action_data?.fieldErrors?.new_body ? <>
                    <div className="p-3 rounded bg-danger">
                        <p className="text-light fw-bold m-0">{action_data.fieldErrors.new_body}</p>
                    </div>
                </> : null}
                <button type="submit" className="btn btn-primary mt-3">Добавить</button>
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
            </form>
        </>
    );
}
