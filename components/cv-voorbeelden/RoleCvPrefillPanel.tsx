import Link from "next/link";
import type { CVData } from "@/lib/cv";
import { UseExampleButton } from "@/components/cv-voorbeelden/UseExampleButton";
import { cvDownloadPrice } from "@/lib/site-content";
import { citedAuthorityFictionalWarning } from "@/components/conversion/CitedAuthorityConversionBridge";
import CitedAuthorityBridgeTracker from "@/components/conversion/CitedAuthorityBridgeTracker";
import type { CitedAuthorityIntentId } from "@/lib/cited-authority-conversion";

type RoleCvPrefillPanelProps = {
  roleLabel: string;
  templateId: string;
  colorThemeId: string;
  sampleCV: CVData;
  proofItems: string[];
  motivationHref?: string;
  startSource: string;
  canonicalPath: string;
  heading?: string;
  primaryLabel?: string;
  eyebrow?: string;
  citedAuthorityIntentId?: CitedAuthorityIntentId;
};

export function RoleCvPrefillPanel({
  roleLabel,
  templateId,
  colorThemeId,
  sampleCV,
  proofItems,
  motivationHref,
  startSource,
  canonicalPath,
  heading,
  primaryLabel,
  eyebrow = "Vooraf ingevuld — direct bewerkbaar",
  citedAuthorityIntentId,
}: RoleCvPrefillPanelProps) {
  const firstExperience = sampleCV.experience[0];

  return (
    <section id="prefilled-role-cv" className="scroll-mt-24">
      {citedAuthorityIntentId ? (
        <CitedAuthorityBridgeTracker
          canonicalPath={canonicalPath}
          intentId={citedAuthorityIntentId}
          landingLocale="nl"
          startSource={startSource}
          targetId="prefilled-role-cv"
        />
      ) : null}
      <div className="wk-editorial-container mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="wk-editorial-prefill wk-card grid min-w-0 overflow-hidden bg-[var(--wk-surface)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="min-w-0 border-b border-[var(--wk-border)] p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <p className="wk-eyebrow">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-balance text-2xl font-extrabold tracking-[-0.035em] text-[var(--wk-ink)] sm:text-3xl">
              {heading ?? `Begin niet met een leeg document: open dit ${roleLabel} CV`}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted)] sm:text-base sm:leading-7">
              Profieltekst, relevante werkervaring, vaardigheden en voorbeeldresultaten staan al op hun plek. Gebruik
              de structuur, maar vervang namen, werkgevers, cijfers, diploma&apos;s en certificeringen altijd door je
              eigen controleerbare gegevens.
            </p>

            <p className="mt-4 rounded-[var(--wk-radius-sm)] bg-[var(--wk-warning-soft)] px-4 py-3 text-sm leading-6 text-[var(--wk-ink)]">
              <strong>Let op:</strong> {citedAuthorityFictionalWarning}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {proofItems.map((item) => (
                <div key={item} className="rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-3 text-sm font-bold text-[var(--wk-ink)]">
                  ✓ {item}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <UseExampleButton
                templateId={templateId}
                colorThemeId={colorThemeId}
                sampleCV={sampleCV}
                label={primaryLabel ?? `Open ingevuld ${roleLabel} CV`}
                startSource={startSource}
                pagePath={canonicalPath}
                uiLanguage="nl"
                trackingLocation={citedAuthorityIntentId ? `cited_authority:${citedAuthorityIntentId}:primary` : undefined}
                trackingLabel={citedAuthorityIntentId ? `${startSource}:open_editor` : undefined}
              />
              <Link href="/prijzen" className="wk-button wk-button-quiet">
                Gratis bouwen en volledig bekijken · PDF eenmalig {cvDownloadPrice.display} · geen abonnement
              </Link>
            </div>
          </div>

          <aside className="min-w-0 bg-[var(--wk-surface-subtle)] p-6 sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--wk-ink-muted)]">Dit staat al klaar</p>
            <div className="mt-4 rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-4">
              <p className="text-xs font-extrabold uppercase tracking-wide text-[var(--wk-ink-muted)]">Voorbeeldprofiel</p>
              <p className="mt-2 line-clamp-5 text-sm leading-6 text-[var(--wk-ink-muted)]">
                {sampleCV.personal.summary}
              </p>
            </div>
            {firstExperience ? (
              <div className="mt-3 rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-4">
                <p className="text-xs font-extrabold uppercase tracking-wide text-[var(--wk-ink-muted)]">Eerste ervaringsblok</p>
                <p className="mt-1 text-sm font-extrabold text-[var(--wk-ink)]">{firstExperience.role}</p>
                <ul className="mt-2 space-y-2 text-xs leading-5 text-[var(--wk-ink-muted)]">
                  {firstExperience.highlights.slice(0, 2).map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <span aria-hidden="true" className="font-black text-teal-700">→</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {motivationHref ? (
              <Link
                href={motivationHref}
                className="wk-button wk-button-secondary mt-4 w-full"
              >
                Maak daarna een passende motivatiebrief →
              </Link>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
}
