/** Preserve only recognised return context; never forward arbitrary query parameters. */
export function getAgencyAccountLoginHref(input: { locale?: string; status?: string; error?: string }): string {
  const next = new URLSearchParams();
  if (input.locale === "en") next.set("locale", "en");
  if (input.status === "success") next.set("status", "success");
  if (input.error === "AGENCY_QUOTA_REACHED") next.set("error", input.error);
  const path = `/agency/account${next.size ? `?${next}` : ""}`;
  return `/login?${new URLSearchParams({ next: path, ...(input.locale === "en" ? { locale: "en" } : {}) })}`;
}
