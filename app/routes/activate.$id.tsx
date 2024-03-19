import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { db } from "~/db.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const act = await db.user.update({
    where: {
      id: params.id,
    },
    data: {
      active: true,
    },
  });
  throw redirect("/")
  return null
}
