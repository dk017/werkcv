export const DEFAULT_CONSUMER_EXCLUDED_EMAILS = [
  "dhinesh217@gmail.com",
  "dhineshkumar.stoic@gmail.com",
] as const;

export function normalizeConsumerEmail(email: string | null | undefined): string {
  return (email || "").trim().toLowerCase();
}

export function configuredConsumerExcludedEmails(
  envValue = process.env.ANALYTICS_EXCLUDED_EMAILS,
): string[] {
  const configured = (envValue || "")
    .split(",")
    .map(normalizeConsumerEmail)
    .filter(Boolean);

  return [...new Set([...DEFAULT_CONSUMER_EXCLUDED_EMAILS, ...configured])];
}

export function isConsumerExcludedEmail(
  email: string | null | undefined,
  envValue = process.env.ANALYTICS_EXCLUDED_EMAILS,
): boolean {
  const normalized = normalizeConsumerEmail(email);
  if (!normalized || !normalized.includes("@")) return true;
  if (configuredConsumerExcludedEmails(envValue).includes(normalized)) return true;

  const [localPart, domain] = normalized.split("@");
  if (!localPart || !domain) return true;
  if (domain === "werkcv.nl" || domain === "example.com" || domain.endsWith(".example.com")) {
    return true;
  }
  if (localPart.includes("+")) return true;

  return /(^|[._-])(test|e2e|synthetic|fixture)([._-]|$)/i.test(localPart);
}
