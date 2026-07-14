import Link from "next/link";
import { UseExampleButton } from "@/components/cv-voorbeelden/UseExampleButton";
import { getExampleBySlug } from "@/lib/cv-voorbeelden/registry";
import { formatEuro } from "@/lib/tools/calculator-utils";
import type { SalaryRoleCvProfile } from "@/lib/tools/salary-role-cv-profiles";

type SalaryRoleCvFunnelProps = {
  roleLabel: string;
  profile: SalaryRoleCvProfile;
  monthlyP25: number;
  monthlyMedian: number;
  monthlyP75: number;
};

export function SalaryRoleCvFunnel({
  roleLabel,
  profile,
  monthlyP25,
  monthlyMedian,
  monthlyP75,
}: SalaryRoleCvFunnelProps) {
  const example = getExampleBySlug(profile.exampleCategory, profile.exampleSlug);

  if (!example) {
    throw new Error(
      `Salary role CV example ${profile.exampleCategory}/${profile.exampleSlug} does not exist.`,
    );
  }

  const exampleHref = `/cv-voorbeelden/${profile.exampleCategory}/${profile.exampleSlug}`;

  return (
    <section id="cv-en-salaris" className="mb-12 scroll-mt-24">
      <div className="border-2 border-black bg-[#E9FBF8] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="border-b-2 border-black px-6 py-6 sm:px-8">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-teal-800">
            Van salarischeck naar sterk bewijs
          </p>
          <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
            Zo positioneer je je CV als {roleLabel} voor deze salarisband
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-700">
            Een salarisbenchmark bepaalt niet automatisch wat jij hoort te verdienen. Je plek in een aanbod hangt ook
            af van de exacte functie, cao, werkgever, ervaring en verantwoordelijkheden. Gebruik onderstaande indeling
            om te controleren welk niveau je met concrete voorbeelden kunt onderbouwen.
          </p>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="border-b-2 border-black p-6 sm:p-8 lg:border-b-0 lg:border-r-2">
            <h3 className="text-xl font-black text-slate-900">Lees de band als voorbereidingsmodel</h3>
            <div className="mt-5 grid gap-3">
              <article className="border-2 border-black bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-slate-500">Rond 25e percentiel</p>
                    <p className="mt-1 text-lg font-black text-slate-900">{formatEuro(monthlyP25)}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">40 uur</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Kan passen bij minder relevante ervaring, een smallere functie-inhoud of een instap in deze brede
                  beroepsgroep. Controleer altijd de echte vacature en eventuele salarisschaal.
                </p>
              </article>

              <article className="border-2 border-black bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-slate-500">Rond de mediaan</p>
                    <p className="mt-1 text-lg font-black text-slate-900">{formatEuro(monthlyMedian)}</p>
                  </div>
                  <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-800">Middenpunt</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Een bruikbaar referentiepunt als je de kerntaken zelfstandig uitvoert en je relevante ervaring,
                  vaardigheden en resultaten duidelijk kunt aantonen.
                </p>
              </article>

              <article className="border-2 border-black bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-slate-500">Rond 75e percentiel</p>
                    <p className="mt-1 text-lg font-black text-slate-900">{formatEuro(monthlyP75)}</p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">Sterk bewijs nodig</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Onderbouw dit niveau met relevante specialisatie, grotere scope, schaarse vaardigheden, zwaardere
                  verantwoordelijkheid of aantoonbare impact—niet alleen met het aantal dienstjaren.
                </p>
              </article>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Dit model helpt bij sollicitatievoorbereiding. CBS meet loonpercentielen binnen een beroepsgroep, maar
              verklaart hiermee niet waarom een individuele werknemer op een bepaald punt in de band zit.
            </p>
          </div>

          <aside className="bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="border-2 border-black bg-[#FFD93D] px-3 py-1 text-xs font-black uppercase tracking-wide text-black">
                Voorbeeld ingevuld
              </span>
              {profile.exampleFit === "related" ? (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                  Verwante basis — aanpassen nodig
                </span>
              ) : (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  Past bij dit beroep
                </span>
              )}
            </div>
            <h3 className="mt-4 text-2xl font-black text-slate-900">Start met het CV van {example.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{example.description}</p>

            <div className="mt-5 border-2 border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">Voorbeeldprofiel</p>
              <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-slate-700">
                {example.sampleCV.personal.summary}
              </p>
            </div>

            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">{profile.positioningTip}</p>

            <div className="mt-5 flex flex-col items-start gap-3">
              <UseExampleButton
                templateId={example.templateId}
                colorThemeId={example.colorThemeId}
                sampleCV={example.sampleCV}
                label={profile.exampleFit === "exact" ? "Start met ingevuld CV" : "Start met ingevuld basis-CV"}
                startSource="salary_role_page"
              />
              <Link href={exampleHref} className="text-sm font-bold text-teal-800 underline hover:text-teal-950">
                Bekijk eerst het volledige CV-voorbeeld →
              </Link>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Gratis te bewerken. Vervang alle voorbeeldnamen, werkgevers, resultaten en registraties door je eigen
              controleerbare informatie voordat je solliciteert.
            </p>
          </aside>
        </div>

        <div className="grid border-t-2 border-black bg-[#FFFEF9] lg:grid-cols-2">
          <div className="border-b-2 border-black p-6 sm:p-8 lg:border-b-0 lg:border-r-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Wat je positie kan beïnvloeden</p>
            <h3 className="mt-2 text-xl font-black text-slate-900">Salarisdrivers voor {roleLabel}</h3>
            <ul className="mt-4 space-y-3">
              {profile.salaryDrivers.map((driver) => (
                <li key={driver} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                  <span aria-hidden="true" className="mt-0.5 font-black text-teal-700">✓</span>
                  <span>{driver}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Bewijs, geen losse claims</p>
            <h3 className="mt-2 text-xl font-black text-slate-900">Zet dit concreet op je CV</h3>
            <ul className="mt-4 space-y-3">
              {profile.cvEvidence.map((evidence) => (
                <li key={evidence} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                  <span aria-hidden="true" className="mt-0.5 font-black text-[#FF6B6B]">→</span>
                  <span>{evidence}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-black bg-[#FFF4D6] p-6 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h3 className="text-lg font-black text-slate-900">Gebruik de band pas in gesprek nadat je bewijs scherp is</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Formuleer een gewenste band op basis van de functie, deze marktbenchmark en twee of drie relevante
                bewijzen uit je CV. Vergelijk daarna ook cao, bonus, toeslagen, pensioen, vakantiedagen en opleidingsbudget.
              </p>
              {profile.marketSignal ? (
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  <strong>Arbeidsmarktsignaal:</strong> {profile.marketSignal}{" "}
                  <a
                    href={profile.marketSignalSource === "hbo-wo"
                      ? "https://www.uwv.nl/nl/arbeidsmarktinformatie/kansen-beroep/kansrijke-beroepen-hbo-wo"
                      : "https://www.uwv.nl/nl/arbeidsmarktinformatie/kansen-beroep/kansrijke-beroepen"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-teal-800 underline"
                  >
                    Bekijk de actuele UWV-toelichting
                  </a>
                  .
                </p>
              ) : null}
            </div>
            <Link
              href="/tools/salaris-onderhandeling"
              className="inline-flex shrink-0 items-center justify-center border-2 border-black bg-[#FFD93D] px-5 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300"
            >
              Maak mijn onderhandelingsscript
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
