import Link from "next/link";
import { getSampleReport } from "@/lib/agency-evidence-sample";

/** Uses the same source-resolved, explicitly fictional sample as the free checker. */
export default function AgencyEvidencePreview({ locale }: { locale: "nl" | "en" }) {
  const english = locale === "en";
  const report = getSampleReport(locale);
  const rows = [report.requirements[2], report.requirements[4], report.requirements[5]];
  return (
    <aside className="wk-card min-w-0 p-5 sm:p-6" data-evidence-preview>
      <p className="wk-eyebrow">{english ? "Fictional example · recruiter view" : "Fictief voorbeeld · recruiterweergave"}</p>
      <h2 className="mt-3 text-2xl font-semibold">{english ? "See the source. Keep the gap visible." : "Zie de bron. Houd het ontbrekende zichtbaar."}</h2>
      <div className="mt-5 space-y-3">
        {rows.map((row) => (
          <div key={row.requirement} className={`min-w-0 rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] p-4 ${row.status === "supported" ? "bg-[var(--wk-success-soft)]" : "bg-[var(--wk-warning-soft)]"}`}>
            <p className="text-sm font-bold">{row.requirement}</p>
            <p className="mt-1 text-xs font-bold">{row.statusLabel}</p>
            {row.cv.snippet ? <blockquote className="mt-2 text-xs leading-relaxed">“{row.cv.snippet}”<cite className="mt-1 block not-italic text-[var(--wk-ink-muted)]">CV · {row.cv.section} · {english ? "line" : "regel"} {row.cv.line}</cite></blockquote> : null}
            {row.status !== "supported" ? <p className="mt-2 text-xs leading-relaxed">{row.action}</p> : null}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-[var(--wk-ink-muted)]">{english ? "Prewritten illustration, not a live AI result. Evidence review stays internal; the client receives the approved introduction and selected CV. Copy the accompanying email separately." : "Vooraf gemaakt voorbeeld, geen live AI-uitslag. De bewijscontrole blijft intern; de klant ontvangt de goedgekeurde introductie en het gekozen CV. Kopieer de begeleidende e-mail apart."}</p>
      <Link href={english ? "/en/candidate-proposal-checker" : "/tools/kandidaatvoorstel-checker"} className="wk-button wk-button-quiet mt-3">{english ? "Inspect the sample sources →" : "Bekijk de voorbeeldbronnen →"}</Link>
    </aside>
  );
}
