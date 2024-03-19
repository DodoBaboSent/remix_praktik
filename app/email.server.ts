import * as nodemailer from "nodemailer";

type SendMailParams = {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  secure: true,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendTransEmail({
  from = "rodion.lugovov.75@bk.ru",
  to,
  subject,
  text,
  html,
}: SendMailParams) {
  const info = await transport.sendMail({ from, to, subject, text, html });
}
