export function isAnalyticsAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;

  const configured = process.env.ANALYTICS_ADMIN_EMAILS || process.env.ADMIN_EMAILS || "";
  const allowedEmails = configured
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (allowedEmails.length === 0) {
    return process.env.NODE_ENV !== "production";
  }

  return allowedEmails.includes(email.toLowerCase());
}
