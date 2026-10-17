type Locale = "nl" | "en";

/**
 * Government ID and bank numbers do not belong on a CV, and the tools have no use for them. Before a CV
 * is stored for the editor link or sent to OpenAI for the vacancy comparison, the number after a BSN,
 * passport or ID label and any Dutch IBAN are replaced; the label stays, so the editor still shows the
 * line for the user to delete. check_cv reads the original text, because it reports these lines as a fix.
 */
const LABELLED_ID =
  // label, separator, then one token: digit groups (123 456 789, 12.34.56.789) or a passport-style code (NXC1234R5)
  /\b(bsn|burgerservicenummer|sofi-?nummer|(?:paspoort|passport|id-?kaart|identiteitskaart|identiteitsbewijs|id card)(?:\s*-?\s*(?:nr|nummer|number|no))?|documentnummer|document number)(\s*[.:#]?\s*)(\d(?:[ .-]?\d){5,11}|[A-Z]{1,3}[A-Z0-9]{5,9})\b/gi;
const DUTCH_IBAN = /\bNL\d{2}\s?[A-Z]{4}\s?(?:\d{4}\s?){2}\d{2}\b/gi;

export function redactGovernmentIds(text: string, locale: Locale): string {
  const placeholder = locale === "nl" ? "[verwijderd]" : "[removed]";
  return text
    .replace(LABELLED_ID, (whole, label: string, separator: string, value: string) =>
      // Only a value with digits is an ID number ("Paspoort aanwezig" is not).
      /\d/.test(value) ? `${label}${separator}${placeholder}` : whole,
    )
    .replace(DUTCH_IBAN, placeholder);
}
