import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { formatEuro } from "@/lib/tools/calculator-utils";
import {
  getSalaryRolePageBySlug,
  getSalaryRolePageLinks,
  resolveSalaryRoleBenchmark,
  salaryRolePages,
} from "@/lib/tools/salary-role-pages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function monthlyFromHourly(hourly: number, weeklyHours: number) {
  return Math.round(((hourly * weeklyHours * 52) / 12) * 100) / 100;
}

function annualFromHourly(hourly: number, weeklyHours: number) {
  return Math.round((hourly * weeklyHours * 52) * 100) / 100;
}

export function generateStaticParams() {
  return salaryRolePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSalaryRolePageBySlug(slug);

  if (!page) {
    return {
      title: "Pagina niet gevonden | WerkCV",
    };
  }

  const benchmark = resolveSalaryRoleBenchmark(page);
  const canonical = `https://werkcv.nl/salaris/${page.slug}`;

  return {
    title: `Salaris ${page.roleLabel} 2026 - CBS Mediaan en Salarisband | WerkCV`,
    description:
      `Bekijk voor ${page.roleLabel} in Nederland de CBS-salarisband voor 32, 36 en 40 uur. ` +
      `Zie direct de 25e percentiel, mediaan en bovenkant van de markt op basis van ${benchmark.dataYear} data.`,
    keywords: [
      `salaris ${page.roleLabel}`,
      `wat verdient een ${page.roleLabel}`,
      `gemiddeld salaris ${page.roleLabel}`,
      `${page.roleLabel} salaris 2026`,
      `marktconform salaris ${page.roleLabel}`,
    ],
    alternates: {
      canonical,
    },
  };
}

export default async function SalaryRolePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getSalaryRolePageBySlug(slug);

  if (!page) {
    notFound();
  }

  const benchmark = resolveSalaryRoleBenchmark(page);
  const roleLinks = getSalaryRolePageLinks(page);
  const hoursRows = [32, 36, 40].map((weeklyHours) => ({
    weeklyHours,
    monthlyP25: monthlyFromHourly(benchmark.hourlyP25, weeklyHours),
    monthlyMedian: monthlyFromHourly(benchmark.hourlyMedian, weeklyHours),
    monthlyP75: monthlyFromHourly(benchmark.hourlyP75, weeklyHours),
    annualMedian: annualFromHourly(benchmark.hourlyMedian, weeklyHours),
  }));
  const fortyHourRow = hoursRows[2];
  const faqItems = [
    {
      question: `Wat verdient een ${page.roleLabel} in Nederland?`,
      answer:
        `Op basis van de officiele CBS-benchmark voor ${benchmark.cbsOccupationLabel} ligt de mediaan voor een ${page.roleLabel} ` +
        `bij 40 uur rond ${formatEuro(fortyHourRow.monthlyMedian)} bruto per maand. De marktband loopt ongeveer van ` +
        `${formatEuro(fortyHourRow.monthlyP25)} tot ${formatEuro(fortyHourRow.monthlyP75)} bruto per maand.`,
    },
    {
      question: `Is dit salaris voor ${page.roleLabel} bruto of netto?`,
      answer:
        "Deze pagina toont bruto salarisindicaties. Vakantiegeld, bonus, toeslagen, pensioen, ORT en belastingen zitten hier nog niet in verwerkt. Gebruik daarna de netto-bruto calculator voor een netto-inschatting.",
    },
    {
      question: "Waarom gebruikt WerkCV CBS 2024 data op een 2026-pagina?",
      answer:
        "Omdat dit op 8 april 2026 het nieuwste officiele CBS-jaar is in deze beroepsdataset. WerkCV noemt dat expliciet, zodat je weet op welk bronjaar de vergelijking rust.",
    },
    {
      question: `Hoe gebruik ik deze salarisrange als ${page.roleLabel} in een nieuwe baan?`,
      answer:
        "Gebruik de mediaan als nuchter middenpunt en de bovenkant van de band alleen als je profiel daar echt bij past qua ervaring, specialisatie, verantwoordelijkheid of schaarste. Trek die marktcheck daarna door naar netto, onderhandeling en een sterker CV.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-black text-2xl tracking-tight text-black">
              Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
            </span>
          </Link>
          <Link href="/salaris" className="text-sm font-bold text-slate-600 transition-colors hover:text-slate-900">
            ← Alle salarispagina&apos;s
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Salaris per beroep", href: "/salaris" },
              { label: `Salaris ${page.roleLabel}`, href: `/salaris/${page.slug}` },
            ]}
          />
        </div>

        <section className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-blue-300 bg-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-800">
                Geld
              </span>
              <span className="rounded-full border border-teal-300 bg-teal-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-teal-800">
                CBS {benchmark.dataYear}
              </span>
              <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-700">
                Bijgewerkt 8 april 2026
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-black leading-tight text-slate-900 sm:text-5xl">
              Salaris {page.roleLabel} 2026
            </h1>
            <p className="max-w-3xl text-lg font-medium text-slate-600">
              Bekijk wat een {page.roleLabel} in Nederland ongeveer bruto per maand verdient op basis van de nieuwste
              officiele CBS-benchmark die nu beschikbaar is. WerkCV rekent het uurloon om naar 32, 36 en 40 uur,
              zodat je sneller ziet waar een marktconforme band ongeveer ligt.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/tools/netto-bruto-calculator"
                className="inline-flex items-center justify-center gap-2 border-2 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-teal-300"
              >
                Reken daarna netto door
              </Link>
              <Link
                href="/tools/salaris-onderhandeling"
                className="inline-flex items-center justify-center gap-2 border-2 border-black bg-white px-5 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-slate-100"
              >
                Gebruik dit bij onderhandeling
              </Link>
            </div>
          </div>

          <aside className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-slate-500">Mediaan 40 uur</p>
              <p className="text-2xl font-black text-slate-900">{formatEuro(fortyHourRow.monthlyMedian)}</p>
              <p className="mt-1 text-xs text-slate-500">bruto per maand op basis van {benchmark.cbsOccupationLabel}</p>
            </div>
            <div className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-slate-500">Marktband 40 uur</p>
              <p className="text-lg font-black text-slate-900">
                {formatEuro(fortyHourRow.monthlyP25)} - {formatEuro(fortyHourRow.monthlyP75)}
              </p>
              <p className="mt-1 text-xs text-slate-500">25e percentiel tot 75e percentiel</p>
            </div>
            <div className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-slate-500">Bronsteekproef</p>
              <p className="text-2xl font-black text-slate-900">{benchmark.sampleSize}</p>
              <p className="mt-1 text-xs text-slate-500">werknemers in deze CBS-beroepsgroep</p>
            </div>
          </aside>
        </section>

        <section className="mb-12 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="border-b-2 border-black px-6 py-5">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Salaris per urennorm</p>
            <h2 className="text-2xl font-black text-slate-900">Indicatie voor 32, 36 en 40 uur</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  {["Uren per week", "25e percentiel", "Mediaan", "75e percentiel", "Mediaan per jaar"].map((heading) => (
                    <th key={heading} className="px-5 py-4 text-xs font-black uppercase tracking-wide text-slate-500">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hoursRows.map((row) => (
                  <tr key={row.weeklyHours} className="border-t border-slate-200">
                    <td className="px-5 py-4 font-black text-slate-900">{row.weeklyHours} uur</td>
                    <td className="px-5 py-4 text-sm text-slate-700">{formatEuro(row.monthlyP25)}</td>
                    <td className="px-5 py-4 text-sm font-black text-slate-900">{formatEuro(row.monthlyMedian)}</td>
                    <td className="px-5 py-4 text-sm text-slate-700">{formatEuro(row.monthlyP75)}</td>
                    <td className="px-5 py-4 text-sm text-slate-700">{formatEuro(row.annualMedian, 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {page.benchmarkNote ? (
          <section className="mb-12 border-2 border-amber-300 bg-amber-50 p-6">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-amber-800">Bronnuance</p>
            <p className="text-sm leading-relaxed text-amber-950">{page.benchmarkNote}</p>
          </section>
        ) : null}

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Wat deze benchmark goed laat zien</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>De officiele band tussen onderkant, midden en bovenkant van de markt voor deze CBS-beroepsgroep.</li>
              <li>Een vergelijkbare bruto maandindicatie voor verschillende urennormen.</li>
              <li>Een nuchter startpunt voor offerchecks, sollicitaties en salarisonderhandeling.</li>
              <li>Een bronvaste benchmark die expliciet benoemt welk CBS-jaar en welke beroepscode gebruikt zijn.</li>
            </ul>
          </div>
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Wat je nog zelf moet wegen</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Je precieze functiezwaarte, specialisatie, ploegendienst of leidinggevende rol.</li>
              <li>Toeslagen, bonus, ORT, pensioen, lease, reiskosten en andere arbeidsvoorwaarden.</li>
              <li>Regionale schaarste, werkgeverstype en cao-inschaling.</li>
              <li>Het verschil tussen een brede CBS-beroepsgroep en jouw exacte vacaturetitel.</li>
            </ul>
          </div>
        </section>

        <RelatedToolsSection
          title={`Gebruik salaris ${page.roleLabel} samen met deze tools`}
          description="Na deze marktcheck wil je meestal ook weten wat er netto overblijft, hoe je het gesprek voert en hoe je je volgende sollicitatiestap aanscherpt."
          tools={[
            {
              href: "/tools/netto-bruto-calculator",
              title: "Netto bruto calculator",
              description: "Reken een bruto salarisband direct om naar een bruikbare netto indicatie.",
              badge: "Geld",
            },
            {
              href: "/tools/salaris-calculator",
              title: "Salaris check",
              description: "Vergelijk dit beroep met andere rollen of pas uren, ervaring en regio aan.",
              badge: "Geld",
            },
            {
              href: "/tools/salaris-onderhandeling",
              title: "Salaris onderhandeling",
              description: "Gebruik je benchmark in een onderhandelingsscript of e-mail.",
              badge: "AI",
            },
            {
              href: "/editor",
              title: "Maak gratis je CV",
              description: "Zet je nieuwe salarisdoel direct om naar een sollicitatieklare CV-versie.",
              badge: "CV",
            },
          ]}
        />

        <section className="mb-12 mt-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Volgende stap</p>
          <h2 className="mb-3 text-2xl font-black text-slate-900 sm:text-3xl">
            Gebruik deze salarisrange meteen in je sollicitatieactie
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
            Wie zoekt op salaris per beroep zit meestal niet meer in de oriëntatiefase maar in een overstapmoment.
            Trek dat door: vergelijk netto, formuleer je salarisverhaal en zorg dat je CV klaarstaat.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {roleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block border-2 border-black bg-[#FFF4D6] p-4 transition-colors hover:bg-yellow-100"
              >
                <p className="font-black text-slate-900">{link.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{link.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-5">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">FAQ</p>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
              Veelgestelde vragen over salaris {page.roleLabel}
            </h2>
          </div>
          <div className="divide-y divide-slate-200 border-2 border-black bg-white">
            {faqItems.map((item) => (
              <div key={item.question} className="p-5">
                <h3 className="mb-2 font-black text-slate-900">{item.question}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-2 border-slate-200 bg-slate-50 p-6">
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
            <li>
              <span className="font-medium text-slate-900">{benchmark.cbsOccupationCode}</span>
              <span>{` - ${benchmark.cbsOccupationLabel} (${benchmark.dataNote})`}</span>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
