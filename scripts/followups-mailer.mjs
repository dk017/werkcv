import nodemailer from "nodemailer";

// Plain-text follow-up mail from contact@werkcv.nl. Same delivery rules as
// followups-signup-feedback.mjs: Resend API when configured, otherwise SMTP with port fallback.

function getResendApiKey() {
  return (process.env.FOLLOWUP_RESEND_API_KEY || process.env.RESEND_API_KEY || process.env.RESENT || process.env.SMTP_PASS || "").trim();
}

function shouldUseResendApi() {
  const transport = (process.env.FOLLOWUP_DELIVERY_MODE || "").trim().toLowerCase();
  if (transport === "resend") return true;
  if (transport === "smtp") return false;
  const host = (process.env.FOLLOWUP_SMTP_HOST || process.env.SMTP_HOST || "").trim().toLowerCase();
  return host === "smtp.resend.com" && Boolean(getResendApiKey());
}

export function fromName() {
  return process.env.FOLLOWUP_FROM_NAME || "WerkCV";
}

export function fromEmail() {
  return process.env.FOLLOWUP_FROM_EMAIL || process.env.AUTH_FROM_EMAIL || process.env.FOLLOWUP_SMTP_USER || process.env.SMTP_USER || "contact@werkcv.nl";
}

export function replyToEmail() {
  return process.env.FOLLOWUP_REPLY_TO || fromEmail();
}

async function sendViaResendApi({ from, to, replyTo, subject, text }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${getResendApiKey()}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, text }),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(payload?.message || payload?.error || `Resend API request failed with status ${response.status}`);
  return { messageId: payload?.id || null };
}

async function sendViaSmtp({ from, to, replyTo, subject, text }) {
  const host = process.env.FOLLOWUP_SMTP_HOST || process.env.SMTP_HOST;
  const user = process.env.FOLLOWUP_SMTP_USER || process.env.SMTP_USER;
  const pass = process.env.FOLLOWUP_SMTP_PASSWORD || process.env.SMTP_PASS;
  if (!host || !user || !pass) throw new Error("SMTP credentials are required");

  const preferred = Number(process.env.FOLLOWUP_SMTP_PORT || process.env.SMTP_PORT || 587);
  const ports = [...new Set([preferred, 465, 587, 2525].filter((port) => Number.isFinite(port) && port > 0))];
  let lastError = null;
  for (const port of ports) {
    const transporter = nodemailer.createTransport({
      host, port, secure: port === 465, auth: { user, pass },
      connectionTimeout: 15000, greetingTimeout: 15000, socketTimeout: 15000,
    });
    try {
      const info = await transporter.sendMail({ from, to, replyTo, subject, text });
      return { messageId: Array.isArray(info.messageId) ? info.messageId[0] : info.messageId || null };
    } catch (error) {
      lastError = error;
      const code = typeof error === "object" && error && "code" in error ? String(error.code || "") : "";
      // Only a connection problem is worth trying on another port.
      if (code && !["ETIMEDOUT", "ESOCKET", "ECONNECTION", "ECONNREFUSED"].includes(code)) throw error;
    } finally {
      transporter.close();
    }
  }
  throw lastError || new Error("SMTP connection failed");
}

export async function sendFollowupEmail({ to, subject, text }) {
  const message = { from: `${fromName()} <${fromEmail()}>`, to, replyTo: replyToEmail(), subject, text };
  return shouldUseResendApi() ? sendViaResendApi(message) : sendViaSmtp(message);
}
