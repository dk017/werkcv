import Link from "next/link";

export type EvidenceComparisonRow = {
  product: string;
  bestFor: string;
  price: string;
  output: string;
  evidence: string;
  href?: string;
};

export function EvidenceComparisonTable({
  rows,
  caption,
  locale,
}: {
  rows: EvidenceComparisonRow[];
  caption: string;
  locale: "nl" | "en";
}) {
  return (
    <div className="mt-7 overflow-x-auto rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)]" role="region" aria-label={`${caption}: ${locale === "nl" ? "horizontaal schuifbare vergelijking" : "horizontally scrollable comparison"}`} tabIndex={0}>
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-[var(--wk-surface-subtle)]">
          <tr>
            {(locale === "nl" ? ["Aanbieder", "Geschikt voor", "Prijsmodel", "Uitvoer / werkwijze", "Bronstatus"] : ["Tool", "Best for", "Price model", "Output / workflow", "Evidence"]).map((heading) => (
              <th key={heading} scope="col" className="p-4 text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--wk-ink-muted)]">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.product} className="border-t border-[var(--wk-border)] align-top">
              <th scope="row" className="p-4 font-extrabold text-[var(--wk-ink)]">
                {row.href ? <Link href={row.href} className="underline decoration-2 underline-offset-4">{row.product}</Link> : row.product}
              </th>
              <td className="p-4 font-medium leading-relaxed text-[var(--wk-ink-muted)]">{row.bestFor}</td>
              <td className="p-4 font-medium leading-relaxed text-[var(--wk-ink-muted)]">{row.price}</td>
              <td className="p-4 font-medium leading-relaxed text-[var(--wk-ink-muted)]">{row.output}</td>
              <td className="p-4 font-medium leading-relaxed text-[var(--wk-ink-muted)]">{row.evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
