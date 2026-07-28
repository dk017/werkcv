import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NavUserMenu from "@/components/NavUserMenu";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { buildDutchMetadata } from "@/lib/page-metadata";
import { profilePhotoPrice } from "@/lib/site-content";

const pageUrl = "https://werkcv.nl/ai-headshot-foto-tips";

const faqItems = [
  {
    question: "Hoeveel foto's moet ik uploaden voor een AI-headshot?",
    answer:
      "Eén recente, scherpe foto kan genoeg zijn. Twee tot vier foto's helpen wanneer ze dezelfde huidige look vanuit licht verschillende hoeken tonen. Bij WerkCV is de eerste foto de belangrijkste identiteitsreferentie.",
  },
  {
    question: "Kan ik een selfie gebruiken?",
    answer:
      "Ja, als je gezicht scherp, goed belicht en niet vervormd is. Houd de camera op ooghoogte en iets verder van je gezicht; een timer of hulp van iemand anders geeft meestal een natuurlijker perspectief dan een selfie van heel dichtbij.",
  },
  {
    question: "Kan ik een groepsfoto of screenshot uploaden?",
    answer:
      "Liever niet. Andere gezichten, kleine uitsneden en compressie maken de referentie onduidelijker. Gebruik waar mogelijk het originele fotobestand met alleen jezelf in beeld.",
  },
  {
    question: "Moet ik op alle foto's dezelfde kleding dragen?",
    answer:
      "Nee, maar kies foto's uit ongeveer dezelfde periode en met dezelfde huidige haarstijl, gezichtsbeharing en bril. Als je je kleding wilt behouden, maak dan de eerste foto met de kleding die je in het resultaat wilt terugzien.",
  },
  {
    question: "Welke bestandstypen accepteert WerkCV?",
    answer:
      "WerkCV accepteert één tot vier JPG-, PNG- of WebP-bestanden. Elke foto mag maximaal 8 MB zijn en de totale upload maximaal 24 MB.",
  },
  {
    question: "Wat als mijn bronfoto een lage resolutie heeft?",
    answer:
      "Gebruik bij voorkeur het originele bestand van je telefoon en minimaal ongeveer 1024 pixels aan de kortste zijde. WerkCV waarschuwt bij minder dan 512 pixels, maar een waarschuwing is geen garantie dat een grotere foto automatisch geschikt is: scherpte, licht en zichtbaarheid van het gezicht blijven belangrijk.",
  },
  {
    question: "Mag een AI-profielfoto op LinkedIn?",
    answer:
      "LinkedIn staat een artistieke weergave toe als die jouw gelijkenis weerspiegelt. Gebruik daarom alleen een resultaat waarin je jezelf eerlijk en direct herkent en controleer altijd de actuele platformregels.",
  },
  {
    question: "Bewaart WerkCV mijn oorspronkelijke foto's?",
    answer:
      "WerkCV gebruikt de bronfoto's voor de generatieaanvraag en bewaart de oorspronkelijke uploads daarna niet. Gegenereerde resultaten worden in je account bewaard zodat je er later naar kunt terugkeren. Je kunt om verwijdering vragen.",
  },
];

const quickChecks = [
  "Recent: de foto laat zien hoe je er nu uitziet.",
  "Solo: alleen jij staat in beeld.",
  "Scherp: ogen, haarlijn en gezichtscontouren zijn goed zichtbaar.",
  "Rustig licht: geen harde schaduw, flitsvlek of fel raam achter je.",
  "Natuurlijk: geen beautyfilter, zonnebril of sterke kleurcorrectie.",
  "Dichtbij genoeg: hoofd en schouders vullen het grootste deel van het beeld.",
];

const avoidChecks = [
  "Groepsfoto's of een uitgesneden gezicht uit een drukke foto.",
  "Screenshots, thumbnails of foto's die vaak zijn doorgestuurd.",
  "Een gezicht dat deels achter haar, handen, een telefoon of accessoires zit.",
  "Heel oude foto's of referenties met verschillende kapsels en leeftijden.",
  "Extreme groothoekselfies van heel dichtbij.",
  "Zware filters, portretvervaging over het gezicht of sterk tegenlicht.",
];

export const metadata: Metadata = buildDutchMetadata({
  title: "Welke foto's uploaden voor een AI-headshot? Praktische fototips",
  description:
    "Kies betere bronfoto's voor een herkenbare AI-profielfoto. Bekijk licht, uitsnede, resolutie, aantal foto's, bril, kleding en WerkCV-uploadregels.",
  path: "/ai-headshot-foto-tips",
  keywords: [
    "ai headshot foto tips",
    "foto uploaden ai headshot",
    "bronfoto ai profielfoto",
    "goede foto ai profielfoto",
    "ai headshot photo requirements",
    "profielfoto cv maken",
  ],
  type: "article",
});

export default function AiHeadshotFotoTipsPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9] text-slate-950">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Welke foto's uploaden voor een AI-headshot?",
          description:
            "Praktische richtlijnen voor bronfoto's waarmee je een herkenbare AI-profielfoto maakt.",
          mainEntityOfPage: pageUrl,
          datePublished: "2026-07-28",
          dateModified: "2026-07-28",
          inLanguage: "nl-NL",
          author: { "@id": "https://werkcv.nl/#organization" },
          publisher: { "@id": "https://werkcv.nl/#organization" },
        }}
      />
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
            </span>
          </Link>
          <nav className="flex items-center gap-3 text-sm font-bold text-slate-600">
            <Link href="/profielfoto-cv-maken" className="hidden hover:text-black sm:block">
              AI-profielfoto
            </Link>
            <LanguageSwitcher tone="solid" />
            <div className="hidden sm:block">
              <NavUserMenu />
            </div>
          </nav>
        </div>
      </header>

      <main>
        <article>
          <section className="border-b-4 border-black bg-[radial-gradient(circle_at_top_left,#E9FFFC_0,#FFFEF9_48%,#FFF4D8_100%)]">
            <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-800">
                Bronfoto-gids voor AI-headshots
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
                Welke foto&apos;s upload je voor een herkenbare AI-headshot?
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
                Begin met één recente, scherpe foto waarop alleen jij staat. Zet je beste en
                meest representatieve foto als eerste. Voeg alleen extra foto&apos;s toe als ze
                dezelfde huidige look duidelijker maken.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/profielfoto-cv-maken#profielfoto-tool"
                  className="inline-flex items-center justify-center border-2 border-black bg-[#4ECDC4] px-6 py-3 font-black text-black shadow-[4px_4px_0_#000] transition-transform hover:-translate-y-0.5"
                >
                  Maak mijn AI-profielfoto
                </Link>
                <a
                  href="#checklist"
                  className="inline-flex items-center justify-center border-2 border-black bg-white px-6 py-3 font-black text-black"
                >
                  Bekijk eerst de checklist
                </a>
              </div>
              <p className="mt-5 text-sm font-bold text-slate-600">
                Preview eerst. Download voor eenmalig {profilePhotoPrice.display}, inclusief btw.
                Geen abonnement.
              </p>
            </div>
          </section>

          <section id="checklist" className="mx-auto max-w-5xl scroll-mt-8 px-6 py-14">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="border-2 border-black bg-[#E9FFFC] p-6 shadow-[5px_5px_0_#000]">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-800">
                  Goede bronfoto
                </p>
                <h2 className="mt-2 text-3xl font-black">Kies deze eigenschappen</h2>
                <ul className="mt-5 space-y-3 font-medium leading-relaxed text-slate-700">
                  {quickChecks.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="font-black text-teal-700">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-2 border-black bg-[#FFF4D8] p-6 shadow-[5px_5px_0_#000]">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-800">
                  Liever vermijden
                </p>
                <h2 className="mt-2 text-3xl font-black">Deze foto&apos;s geven ruis</h2>
                <ul className="mt-5 space-y-3 font-medium leading-relaxed text-slate-700">
                  {avoidChecks.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="font-black text-amber-800">×</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="border-y-4 border-black bg-white">
            <div className="mx-auto max-w-4xl px-6 py-14">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-800">
                De eerste foto telt het zwaarst
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Gebruik foto 1 als je belangrijkste identiteitsreferentie
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-700">
                WerkCV behandelt de eerste upload als de hoofdreferentie. Kies daarvoor de foto
                die het beste laat zien hoe je gezicht, haar, bril en huidige leeftijd er nu
                uitzien. Extra foto&apos;s zijn ondersteunend: ze kunnen een andere kleine hoek of
                je normale glimlach tonen, maar horen de eerste foto niet tegen te spreken.
              </p>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[620px] border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-950 text-white">
                      <th className="border-2 border-black p-4">Aantal</th>
                      <th className="border-2 border-black p-4">Wanneer verstandig</th>
                      <th className="border-2 border-black p-4">Waarop letten</th>
                    </tr>
                  </thead>
                  <tbody className="font-medium text-slate-700">
                    <tr>
                      <td className="border-2 border-black p-4 font-black">1 foto</td>
                      <td className="border-2 border-black p-4">Recent, scherp en bijna recht van voren.</td>
                      <td className="border-2 border-black p-4">Gezicht en huidige look moeten volledig duidelijk zijn.</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border-2 border-black p-4 font-black">2–4 foto&apos;s</td>
                      <td className="border-2 border-black p-4">Handig voor subtiele hoeken, bril of gezichtsbeharing.</td>
                      <td className="border-2 border-black p-4">Zelfde persoon, periode en herkenbare look; geen tegenstrijdige referenties.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-4xl px-6 py-14">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-800">
              In vijf minuten
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Zo maak je thuis een bruikbare bronfoto
            </h2>
            <ol className="mt-8 space-y-5">
              {[
                ["Ga naar zacht daglicht", "Sta naar een raam gericht, niet met het raam achter je. Vermijd middagzon, plafondlicht en directe flits."],
                ["Zet de camera op ooghoogte", "Gebruik een timer, standaard of hulp van iemand anders. Houd voldoende afstand om groothoekvervorming te voorkomen."],
                ["Kies hoofd en schouders", "Laat je volledige hoofd, haarlijn, nek en schouders zien. Snijd oren, kin of haar niet af."],
                ["Kijk natuurlijk", "Kijk richting de camera met je normale neutrale blik of een ontspannen glimlach. Forceer geen brede grijns."],
                ["Draag je huidige look", "Gebruik je normale bril, kapsel en gezichtsbeharing. Wil je kleding behouden, draag dan het gewenste kledingstuk in foto 1."],
                ["Upload het origineel", "Gebruik het bestand uit je camera-app in plaats van een screenshot of socialmedia-download."],
              ].map(([title, text], index) => (
                <li key={title} className="grid gap-4 border-l-4 border-black pl-5 sm:grid-cols-[48px_1fr]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4ECDC4] font-black">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-black">{title}</h3>
                    <p className="mt-1 leading-relaxed text-slate-700">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="border-y-4 border-black bg-[#E9FFFC]">
            <div className="mx-auto grid max-w-5xl gap-8 px-6 py-14 lg:grid-cols-2">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-800">
                  WerkCV-uploadregels
                </p>
                <h2 className="mt-3 text-3xl font-black">Bestanden en resolutie</h2>
                <ul className="mt-5 space-y-3 font-medium leading-relaxed text-slate-700">
                  <li><strong>Formaat:</strong> JPG, PNG of WebP.</li>
                  <li><strong>Aantal:</strong> minimaal 1 en maximaal 4 foto&apos;s.</li>
                  <li><strong>Grootte:</strong> maximaal 8 MB per foto en 24 MB totaal.</li>
                  <li><strong>Advies:</strong> gebruik het origineel en liefst 1024 pixels of meer aan de kortste zijde.</li>
                  <li><strong>Waarschuwing:</strong> WerkCV meldt een korte zijde onder 512 pixels of een extreem brede/smalle uitsnede.</li>
                </ul>
              </div>
              <div className="border-2 border-black bg-white p-6 shadow-[5px_5px_0_#000]">
                <h2 className="text-2xl font-black">Bril, haar en kleding</h2>
                <div className="mt-5 space-y-4 text-slate-700">
                  <p><strong>Bril:</strong> draag hem als je hem normaal draagt. Draai iets van het raam weg als de glazen spiegelen.</p>
                  <p><strong>Haar of baard:</strong> gebruik referenties met je huidige stijl. Meng geen gladgeschoren en bebaarde periodes.</p>
                  <p><strong>Kleding:</strong> kies in de generator of je kleding behouden of aangepast mag worden. Een gereguleerd uniform hoort alleen in beeld als het echt bij jou en je functie past.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-4xl px-6 py-14">
            <h2 className="text-3xl font-black sm:text-4xl">
              Wat AI kan verbeteren — en wat niet
            </h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="border-2 border-black bg-white p-6">
                <h3 className="text-xl font-black">Wel geschikt voor</h3>
                <p className="mt-3 leading-relaxed text-slate-700">
                  Een rustigere achtergrond, evenwichtiger licht, een professionele vierkante
                  uitsnede en — als jij daarvoor kiest — een kleine aanpassing aan kleding of
                  expressie.
                </p>
              </div>
              <div className="border-2 border-black bg-white p-6">
                <h3 className="text-xl font-black">Geen betrouwbare reparatie</h3>
                <p className="mt-3 leading-relaxed text-slate-700">
                  Een verborgen of onscherp gezicht, foutieve leeftijdsinformatie of
                  tegenstrijdige referenties. AI kan bovendien details veranderen. Controleer
                  het resultaat altijd zelf.
                </p>
              </div>
            </div>
            <div className="mt-8 border-2 border-black bg-[#FFF4D8] p-6">
              <h3 className="text-xl font-black">Herkenbaarheidscheck vóór je downloadt</h3>
              <p className="mt-3 leading-relaxed text-slate-700">
                Controleer gezichtscontour, leeftijd, ogen, haarlijn, bril, moedervlekken,
                tanden en normale expressie. Gebruik een variant niet als jij of iemand die je
                goed kent je niet direct herkent.
              </p>
            </div>
          </section>

          <section className="border-y-4 border-black bg-white">
            <div className="mx-auto max-w-4xl px-6 py-14">
              <h2 className="text-3xl font-black sm:text-4xl">Veelgestelde vragen</h2>
              <div className="mt-8 divide-y-2 divide-slate-200 border-y-2 border-slate-200">
                {faqItems.map((item) => (
                  <details key={item.question} className="group py-5">
                    <summary className="cursor-pointer list-none pr-6 text-lg font-black">
                      {item.question}
                    </summary>
                    <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#4ECDC4]">
            <div className="mx-auto max-w-4xl px-6 py-14 text-center">
              <h2 className="text-3xl font-black sm:text-4xl">Je bronfoto klaar?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed">
                Maak vier previews, kies je favoriet en betaal alleen als je die wilt
                downloaden.
              </p>
              <Link
                href="/profielfoto-cv-maken#profielfoto-tool"
                className="mt-7 inline-flex border-2 border-black bg-white px-7 py-3 font-black shadow-[5px_5px_0_#000]"
              >
                Start met mijn foto
              </Link>
            </div>
          </section>

          <section className="mx-auto max-w-4xl px-6 py-10 text-sm leading-relaxed text-slate-600">
            <h2 className="font-black text-slate-900">Bronnen en redactionele basis</h2>
            <p className="mt-3">
              Deze gids combineert de actuele WerkCV-uploadregels met algemene fotografieprincipes
              en officiële profielrichtlijnen. Laatst inhoudelijk gecontroleerd op 28 juli 2026.
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a className="font-bold underline" href="https://www.linkedin.com/business/talent/blog/product-tips/tips-for-taking-professional-linkedin-profile-pictures">
                  LinkedIn — tips voor een professionele profielfoto
                </a>
              </li>
              <li>
                <a className="font-bold underline" href="https://www.linkedin.com/help/linkedin/answer/a1377087/profile-photo-guidelines-and-conditions">
                  LinkedIn — regels en voorwaarden voor profielfoto&apos;s
                </a>
              </li>
              <li>
                <Link className="font-bold underline" href="/privacy">
                  WerkCV — privacy en verwerking van foto&apos;s
                </Link>
              </li>
            </ul>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
