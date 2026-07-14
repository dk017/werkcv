import Link from "next/link";
import type { CVData } from "@/lib/cv";
import { UseExampleButton } from "@/components/cv-voorbeelden/UseExampleButton";

type RoleCvPrefillPanelProps = {
  roleLabel: string;
  templateId: string;
  colorThemeId: string;
  sampleCV: CVData;
  proofItems: string[];
  motivationHref?: string;
};

export function RoleCvPrefillPanel({
  roleLabel,
  templateId,
  colorThemeId,
  sampleCV,
  proofItems,
  motivationHref,
}: RoleCvPrefillPanelProps) {
  const firstExperience = sampleCV.experience[0];

  return (
    <section id="prefilled-role-cv" className="scroll-mt-24 border-b-4 border-black bg-[#FFF4D6]">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid border-4 border-black bg-white shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b-4 border-black p-6 sm:p-8 lg:border-b-0 lg:border-r-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">
              Vooraf ingevuld — direct bewerkbaar
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
              Begin niet met een leeg document: open dit {roleLabel} CV
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
              Profieltekst, relevante werkervaring, vaardigheden en voorbeeldresultaten staan al op hun plek. Gebruik
              de structuur, maar vervang namen, werkgevers, cijfers, diploma&apos;s en certificeringen altijd door je
              eigen controleerbare gegevens.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {proofItems.map((item) => (
                <div key={item} className="border-2 border-black bg-[#E9FBF8] p-3 text-sm font-black text-slate-800">
                  ✓ {item}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <UseExampleButton
                templateId={templateId}
                colorThemeId={colorThemeId}
                sampleCV={sampleCV}
                label={`Open ingevuld ${roleLabel} CV`}
                startSource="role_example_page"
              />
              <Link href="/prijzen" className="text-sm font-black text-slate-800 underline decoration-2 underline-offset-4">
                Gratis bewerken · betaal pas bij PDF
              </Link>
            </div>
          </div>

          <aside className="bg-[#FFFEF9] p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Dit staat al klaar</p>
            <div className="mt-4 border-2 border-black bg-white p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">Voorbeeldprofiel</p>
              <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-slate-700">
                {sampleCV.personal.summary}
              </p>
            </div>
            {firstExperience ? (
              <div className="mt-3 border-2 border-slate-300 bg-white p-4">
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">Eerste ervaringsblok</p>
                <p className="mt-1 text-sm font-black text-slate-900">{firstExperience.role}</p>
                <ul className="mt-2 space-y-2 text-xs leading-relaxed text-slate-600">
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
                className="mt-4 block border-2 border-black bg-yellow-300 p-4 text-sm font-black text-black transition-colors hover:bg-yellow-400"
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
