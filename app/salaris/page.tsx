import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { formatEuro } from "@/lib/tools/calculator-utils";
import { getSalaryRolePageGroups, resolveSalaryRoleBenchmark } from "@/lib/tools/salary-role-pages";

function monthlyFromHourly(hourly: number, weeklyHours: number) {
  return Math.round(((hourly * weeklyHours * 52) / 12) * 100) / 100;
}

export const metadata: Metadata = {
  title: "Salaris Per Beroep 2026 - CBS Salarischeck per Rol | WerkCV",
  description:
    "Bekijk salaris per beroep in Nederland met CBS-benchmarks per rol. Open vaste salarispagina's voor onder meer tandarts, software developer, accountant, verpleegkundige en chauffeur.",
  alternates: {
    canonical: "https://werkcv.nl/salaris",
  },
};

export default function SalarisPerBeroepPage() {
  const groups = getSalaryRolePageGroups();

  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-black text-2xl tracking-tight text-black">
              Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
            </span>
          </Link>
          <Link href="/tools" className="text-sm font-bold text-slate-600 transition-colors hover:text-slate-900">
            ← Alle tools
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Salaris per beroep", href: "/salaris" },
            ]}
          />
        </div>

        <section className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-blue-300 bg-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-800">
                Geld
              </span>
              <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-700">
                Bijgewerkt 8 april 2026
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-black leading-tight text-slate-900 sm:text-5xl">
              Salaris per beroep 2026
            </h1>
            <p className="max-w-3xl text-lg font-medium text-slate-600">
              Open vaste salarispagina&apos;s per beroep en zie direct welke bruto maandrange past bij 32, 36 of 40 uur.
              WerkCV gebruikt hiervoor de nieuwste officiele CBS-beroepsdata die op 8 april 2026 beschikbaar is: de
              voorlopige cijfers over 2024.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/tools/salaris-calculator"
                className="inline-flex items-center justify-center gap-2 border-2 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-teal-300"
              >
                Open brede salarischeck
              </Link>
              <Link
                href="/tools/netto-bruto-calculator"
                className="inline-flex items-center justify-center gap-2 border-2 border-black bg-white px-5 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-slate-100"
              >
                Reken daarna netto door
              </Link>
            </div>
          </div>

          <aside className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-500">
              Waarom dit cluster nuttig is
            </p>
            <div className="space-y-3 text-sm text-slate-600">
              <p>Zoekers op beroepsniveau zitten vaak al in een onderhandelings-, offercheck- of overstapmoment.</p>
              <p>Daarom koppelt WerkCV elke salarispagina meteen aan netto, onderhandeling en CV-routes.</p>
              <p>Voor beroepen waar CBS geen losse uitsplitsing heeft, benoemen we expliciet welke bredere officiele beroepsgroep we gebruiken.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12 grid gap-3 sm:grid-cols-3">
          {[
            ["Bron", "CBS 2024", "nieuwste officiele beroepsjaar in deze dataset"],
            ["Weergave", "25 / 50 / 75", "onderkant, mediaan en bovenkant van de marktband"],
            ["Doel", "Van salaris naar CV", "iedere pagina linkt door naar tools en sollicitatieactie"],
          ].map(([label, value, note]) => (
            <div key={label} className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-slate-500">{label}</p>
              <p className="text-lg font-black text-slate-900">{value}</p>
              <p className="mt-1 text-xs text-slate-500">{note}</p>
            </div>
          ))}
        </section>

        <section className="mb-12 space-y-10">
          {groups.map((group) => (
            <div key={group.label}>
              <div className="mb-5">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Beroepscluster</p>
                <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{group.label}</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.pages.map((page) => {
                  const benchmark = resolveSalaryRoleBenchmark(page);
                  const monthlyMedian = monthlyFromHourly(benchmark.hourlyMedian, 40);
                  const monthlyP25 = monthlyFromHourly(benchmark.hourlyP25, 40);
                  const monthlyP75 = monthlyFromHourly(benchmark.hourlyP75, 40);

                  return (
                    <Link
                      key={page.slug}
                      href={`/salaris/${page.slug}`}
                      className="group block border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Salarispagina</p>
                          <h3 className="text-xl font-black text-slate-900 group-hover:text-teal-700">{page.roleLabel}</h3>
                        </div>
                        <span className="rounded-full border border-blue-300 bg-blue-50 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-blue-700">
                          CBS
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Mediaan 40 uur: <span className="font-black text-slate-900">{formatEuro(monthlyMedian)}</span>
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        Marktband: {formatEuro(monthlyP25)} - {formatEuro(monthlyP75)}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-slate-500">
                        {benchmark.cbsOccupationLabel}
                        {page.benchmarkNote ? " - met extra bronnuance op de pagina." : ""}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        <RelatedToolsSection
          title="Gebruik salaris per beroep samen met deze tools"
          description="De beroepspagina's geven je marktcontext. Gebruik daarna deze tools om een aanbod door te rekenen of je volgende stap scherper te formuleren."
          tools={[
            {
              href: "/tools/salaris-calculator",
              title: "Salaris check",
              description: "Vergelijk meerdere beroepen en corrigeer voor uren, ervaring, regio en opleiding.",
              badge: "Geld",
            },
            {
              href: "/tools/netto-bruto-calculator",
              title: "Netto bruto calculator",
              description: "Zie wat een bruto salarisrange ongeveer netto betekent in 2026.",
              badge: "Geld",
            },
            {
              href: "/tools/salaris-onderhandeling",
              title: "Salaris onderhandeling",
              description: "Zet je benchmark om naar een script of e-mail voor recruiter of werkgever.",
              badge: "AI",
            },
            {
              href: "/editor",
              title: "Maak gratis je CV",
              description: "Gebruik je salarisdoel meteen als input voor je volgende sollicitatiestap.",
              badge: "CV",
            },
          ]}
        />

        <section className="mt-12 border-2 border-slate-200 bg-slate-50 p-6">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Bronnen</p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <a
                href="https://opendata.cbs.nl/ODataApi/OData/85517NED/TypedDataSet"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                CBS OData 85517NED - uurloonpercentielen per beroep
              </a>
            </li>
            <li>
              <a
                href="https://opendata.cbs.nl/ODataApi/OData/85517NED/Beroep"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                CBS OData 85517NED - beroepslabels en codes
              </a>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
