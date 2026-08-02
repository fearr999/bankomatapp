import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null | undefined;

function getTransporter(): Transporter | null {
  if (transporter !== undefined) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    transporter = null;
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

export function isMailConfigured(): boolean {
  return Boolean(getTransporter());
}

export async function sendMail(to: string, subject: string, title: string, message: string): Promise<boolean> {
  const t = getTransporter();
  if (!t) return false;

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 480px; margin: 0 auto;">
      <div style="padding: 24px 0 16px;">
        <span style="display: inline-block; width: 32px; height: 32px; border-radius: 8px; background: #18181b; color: #fff; text-align: center; line-height: 32px; font-weight: 600; font-size: 14px;">C</span>
        <span style="font-weight: 600; font-size: 14px; margin-left: 8px; vertical-align: middle;">Corpi</span>
      </div>
      <h2 style="font-size: 18px; margin: 0 0 8px;">${title}</h2>
      <p style="color: #52525b; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">${message}</p>
      <a href="https://app.thecorpi.com" style="display: inline-block; background: #18181b; color: #fff; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-size: 14px; font-weight: 500;">Открыть Corpi</a>
    </div>
  `;

  try {
    await t.sendMail({ from, to, subject, html, text: `${title}\n\n${message}` });
    return true;
  } catch (err) {
    console.error("Отправка email не удалась:", (err as Error).message);
    return false;
  }
}
