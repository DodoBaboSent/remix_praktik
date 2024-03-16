import {
  json,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import * as svg_captcha from "svg-captcha"

export async function loader({ request }: LoaderFunctionArgs) {
  const captcha = svg_captcha.create()
  const data = captcha.data
  const text = captcha.text
  return json({data, text});
}
