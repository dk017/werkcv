import Link from "next/link";
import { AGENCY_WORKSPACE_LANGUAGE_NOTICE } from "@/lib/agency-review-scope";

/** These limitations must be visible before purchase, not only after checkout. */
export default function AgencyPurchaseNotes({ locale }: { locale: "nl" | "en" }) {
  const english = locale === "en";
  return (
    <div className="mt-3 max-w-sm space-y-2 rounded-lg bg-[var(--wk-surface)] px-3 py-2 text-left text-xs leading-relaxed text-[var(--wk-ink-muted)]" data-agency-purchase-notes lang={locale}>
      {english ? <p>{AGENCY_WORKSPACE_LANGUAGE_NOTICE}</p> : null}
      <details>
      <summary className="cursor-pointer font-semibold underline underline-offset-4">{english ? "Monthly billing · DPA awaiting verification" : "Maandabonnement · DPA wacht op verificatie"}</summary>
      <p>{english ? "Monthly subscription, not a one-time payment. Check the tax breakdown and final total in checkout before paying. To stop renewal, email contact@werkcv.nl; access continues until the paid period ends." : "Maandabonnement, geen eenmalige betaling. Controleer de btw-specificatie en het eindbedrag in de checkout vóór betaling. Opzeggen kan via contact@werkcv.nl; je houdt toegang tot het einde van de betaalde periode."}</p>
      <p>{english ? "Our processor details and DPA are still awaiting verification. Start with fictional data; review the current status before purchasing for real candidate use." : "Onze verwerkersinformatie en DPA wachten nog op verificatie. Begin met fictieve gegevens; bekijk de actuele status vóór aanschaf voor echte kandidaatdata."} <Link className="font-semibold underline underline-offset-4" href={english ? "/en/agency/privacy#dpa" : "/agency/privacy#dpa"}>{english ? "Privacy and DPA status" : "Privacy- en DPA-status"}</Link></p>
      </details>
    </div>
  );
}
