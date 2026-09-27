import Link from "next/link";
import CvCheckTool from "@/components/cv-check/CvCheckTool";
import CopyPromptButton from "@/components/seo/CopyPromptButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { cvDownloadPrice } from "@/lib/site-content";

export const CHATGPT_GUIDE_UPDATED = { iso: "2026-09-27", display: "27 september 2026" } as const;
const PATH = "/cv-gids/cv-maken-met-chatgpt";

const SOURCES = {
  tilburg: {
    href: "https://www.tilburguniversity.edu/nl/actueel/persberichten/werkgevers-gedogen-sollicitatiebrief-en-cv-van-chatgpt",
    label: "Tilburg University en Rendement, 19 november 2024",
  },
  openai: {
    href: "https://help.openai.com/en/articles/7730893-data-controls-faq",
    label: "OpenAI Help Center, Data controls in ChatGPT",
  },
};

// Tested on 27 Sep 2026 (see docs/product/2026-09-27-chatgpt-cv-page-research.md): these rules
// brought leftovers from 24/24 to 0/16 and added personality traits from 5/8 to 0/8.
const RULES = `Regels:
- Gebruik alleen feiten uit mijn gegevens. Voeg geen eigenschappen, vaardigheden, programma's, cijfers of resultaten toe die er niet in staan.
- Schrijf platte tekst: geen opmaaktekens zoals ** of #, en geen invulvelden zoals [telefoonnummer]. Laat onbekende gegevens gewoon weg.
- Gebruik de kopjes Profiel, Werkervaring, Opleiding, Vaardigheden en Talen, met de nieuwste functie bovenaan.
- Noteer elke taal als moedertaal of met een ERK-niveau (A1 t/m C2).
- Zet geen uitleg, tips of alternatieven in het cv. Begin direct met het cv.
- Zet na het cv een regel met ---EINDE CV--- en daaronder maximaal 3 vragen over informatie die ontbreekt.`;

const PROMPTS = [
  {
    id: "volledig_cv",
    title: "1. Een cv van je eigen gegevens",
    when: "Je hebt nog geen cv, of je oude cv is erg verouderd.",
    text: `Maak een Nederlands cv van mijn gegevens.\n${RULES}\n\nMijn gegevens:\n[plak hier je functies met jaartallen, taken, opleiding, talen en programma's]`,
  },
  {
    id: "vacature",
    title: "2. Je cv aanpassen aan een vacature",
    when: "Je hebt een cv en wilt het afstemmen op één vacature.",
    text: `Pas mijn cv aan op de vacature hieronder. Leg de nadruk op wat ik al heb dat de vacature vraagt.\n${RULES}\n- Neem niets uit de vacature over als ervaring als het niet in mijn cv staat. Noem ontbrekende eisen alleen onder de vragen na het cv.\n\nMijn cv:\n[plak hier je cv]\n\nVacature:\n[plak hier de volledige vacaturetekst]`,
  },
  {
    id: "profiel",
    title: "3. Alleen een profieltekst",
    when: "Je cv staat, maar je profiel is vaag of te lang.",
    text: `Schrijf een profieltekst van 3 tot 4 zinnen voor mijn cv, voor de functie [functie]. Gebruik alleen feiten uit mijn gegevens: functie, jaren ervaring, belangrijkste taken en één resultaat als dat erin staat. Geen eigenschappen zoals 'resultaatgericht' of 'teamspeler' als ik die niet met een voorbeeld onderbouw. Platte tekst, geen uitleg.\n\nMijn gegevens:\n[plak hier je werkervaring]`,
  },
  {
    id: "werkervaring",
    title: "4. Taken omzetten in sterke werkervaring",
    when: "Je werkervaring is een lijst taken zonder resultaat.",
    text: `Maak van deze taken 3 tot 5 korte cv-punten per functie. Begin elk punt met een werkwoord in de verleden tijd. Behoud getallen, programma's en namen precies zoals ik ze geef en verzin geen resultaten. Staat er geen resultaat bij, vraag er dan na de lijst naar. Platte tekst, geen opmaaktekens.\n\nMijn taken:\n[plak hier je taken per functie]`,
  },
  {
    id: "controle",
    title: "5. Laat ChatGPT je eigen cv nalezen",
    when: "Je wilt een tweede blik voordat je verstuurt.",
    text: `Lees mijn cv na als een Nederlandse recruiter. Noem maximaal 5 verbeterpunten, van belangrijk naar minder belangrijk, met bij elk punt het citaat uit mijn cv waar het over gaat. Herschrijf niets en voeg geen feiten toe.\n\nMijn cv:\n[plak hier je cv]`,
  },
];

const TEST_ROWS = [
  { finding: "Opmaaktekens zoals ** en ## die als sterretjes in je cv terechtkomen", popular: "24 van 24", ours: "0 van 16" },
  { finding: "Advies of alternatieven midden in de cv-tekst (\"Als je wél ervaring hebt, voeg dan toe…\")", popular: "8 van 8 aangepaste cv's", ours: "0 van 8" },
  { finding: "Invulvelden zoals [jouw telefoonnummer]", popular: "7 van 24", ours: "0 van 16" },
  { finding: "Eigenschappen die niet in de notities stonden (stressbestendig, resultaatgericht)", popular: "5 van 8", ours: "0 van 8" },
  { finding: "Een ontbrekende eis uit de vacature geclaimd als ervaring", popular: "0 van 8", ours: "0 van 8" },
];

const CHECKLIST = [
  "Geen sterretjes, hekjes of streepjes van de opmaak meer in je tekst.",
  "Geen invulvelden zoals [telefoonnummer] of XX% meer.",
  "Geen zinnen van de chatbot, zoals 'Hieronder staat je cv' of 'Als je wél ervaring hebt…'.",
  "Elke functie, datum, opleiding en elk getal klopt en kun je in een gesprek toelichten.",
  "Geen eigenschappen die je niet met een voorbeeld kunt onderbouwen.",
  "Talen staan als moedertaal of met een niveau (A1–C2); werkgevers vragen vaak B2 of hoger.",
  "Je contactgegevens staan bovenaan in de tekst, niet alleen in een kop- of voettekst.",
  "Je cv is in de taal van de vacature en past op 1 tot 2 pagina's.",
];

const FAQ = [
  {
    question: "Mag ik mijn cv met ChatGPT schrijven?",
    answer:
      "Bij de meeste werkgevers wel. In onderzoek van Tilburg University en Rendement (2024) laat 79% van de organisaties sollicitanten zelf bepalen of ze een taalmodel gebruiken, zolang de informatie in het cv of de brief klopt. 11% zegt dat sollicitanten geen taalmodel mogen gebruiken. Staat er in de vacature iets over AI, volg dat dan.",
  },
  {
    question: "Zien werkgevers dat mijn cv met AI is gemaakt?",
    answer:
      "Soms, vooral aan restanten zoals opmaaktekens, invulvelden en algemene eigenschappen zonder voorbeeld. Werkgevers schatten zelf dat een kwart van de cv's met een taalmodel is geschreven. Voor een cv zijn ze minder streng dan voor een brief; waar ze zich vooral zorgen over maken, is of kennis en vaardigheden nog te beoordelen zijn (62%). Een cv met concrete, controleerbare feiten valt dus minder op dan een cv vol algemene woorden.",
  },
  {
    question: "Is het veilig om mijn cv in ChatGPT te plakken?",
    answer:
      "Plak geen BSN, paspoort- of bankgegevens en laat je adres, telefoonnummer en e-mail weg; die vul je later zelf in. Standaard kan OpenAI gesprekken gebruiken om modellen te trainen. Dat zet je uit via Instellingen → Data controls → 'Improve the model for everyone'. Een tijdelijke chat wordt niet voor training gebruikt en maximaal 30 dagen bewaard.",
  },
  {
    question: "Verzint ChatGPT werkervaring?",
    answer:
      "In onze test van 27 september 2026 (24 cv's, model gpt-5.5) claimde het geen ontbrekende eisen uit de vacature. Wel voegde het in 5 van de 8 cv's eigenschappen toe die niet in de notities stonden, en liet het opmaaktekens, invulvelden en advies in de tekst staan. Controleer dus vooral wat erbij is gekomen.",
  },
  {
    question: "Kan ChatGPT ook de opmaak en een PDF van mijn cv maken?",
    answer: `ChatGPT levert vooral tekst. Voor een nette opmaak die sollicitatiesystemen goed lezen, zet je de tekst in een cv-template. In de WerkCV-editor is dat gratis; de PDF kost eenmalig ${cvDownloadPrice.display}, zonder abonnement.`,
  },
  {
    question: "Moet mijn cv in het Nederlands of Engels?",
    answer:
      "In de taal van de vacature. Laat ChatGPT dan ook in die taal schrijven en controleer of kopjes, datums en taalniveaus consequent zijn. De cv-check hieronder meldt het als je cv en de vacature in verschillende talen zijn.",
  },
];

const RELATED = [
  { href: "/cv-check", label: "Gratis cv-check", body: "Check je cv op leesbaarheid, inhoud en Nederlandse regels." },
  { href: "/cv-check/vacature", label: "CV vergelijken met vacature", body: "Zie per eis of je cv die aantoont." },
  { href: "/cv-tips/cv-schrijven-met-ai", label: "Cv schrijven met AI", body: "Wat AI goed kan bij je cv, en waar je zelf moet opletten." },
  { href: "/tools/profieltekst-generator", label: "Profieltekst generator", body: "Een korte profieltekst op basis van je eigen gegevens." },
];

export default function ChatGptCvGuide() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "CV maken met ChatGPT: prompts, valkuilen en een gratis check",
    inLanguage: "nl-NL",
    datePublished: "2026-09-27",
    dateModified: CHATGPT_GUIDE_UPDATED.iso,
    author: { "@type": "Organization", name: "WerkCV", url: "https://werkcv.nl" },
    publisher: { "@type": "Organization", name: "WerkCV", url: "https://werkcv.nl" },
    mainEntityOfPage: `https://werkcv.nl${PATH}`,
    citation: [SOURCES.tilburg.href, SOURCES.openai.href],
  };

  return (
    <main>
      <JsonLd data={articleJsonLd} />
      <FAQJsonLd questions={FAQ} />

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "CV-gids", href: "/cv-gids" },
              { label: "CV maken met ChatGPT", href: PATH },
            ]}
          />
          <p className="wk-eyebrow mt-4">CV-gids · ChatGPT</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-[var(--wk-ink)] sm:text-4xl md:text-5xl">
            CV maken met ChatGPT: prompts, valkuilen en een gratis check
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--wk-ink-muted)] sm:text-lg sm:leading-8">
            Je mag ChatGPT gebruiken voor je cv: in Nederlands onderzoek vindt 79% van de werkgevers dat prima, zolang alles klopt. Wij lieten het nieuwste model van OpenAI 24 cv&apos;s schrijven met de prompts uit populaire gidsen. Het verzon geen werkervaring, maar geen enkel resultaat was klaar om te versturen: er stonden opmaaktekens, invulvelden en advies in de tekst. Met de prompts op deze pagina ging dat van 24 van 24 naar 0 van 16.
          </p>
          <p className="mt-2 text-sm text-[var(--wk-ink-muted)]">
            Door de redactie van WerkCV · <time dateTime={CHATGPT_GUIDE_UPDATED.iso}>Laatst bijgewerkt: {CHATGPT_GUIDE_UPDATED.display}</time>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#prompts" className="wk-button wk-button-primary">
              Naar de prompts
            </a>
            <a href="#check" className="wk-button wk-button-secondary">
              Check je ChatGPT-cv
            </a>
          </div>

          <div className="wk-card mt-8 p-5">
            <h2 className="font-semibold text-[var(--wk-ink)]">In het kort</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--wk-ink-muted)]">
              <li>Geef ChatGPT je eigen feiten en regels mee; vraag niet om &lsquo;een voorbeeld-cv&rsquo;, want dat bevat verzonnen namen, werkgevers en data.</li>
              <li>Vraag om platte tekst zonder invulvelden, en om vragen ná het cv in plaats van advies erin.</li>
              <li>Plak geen BSN, adres of telefoonnummer, en zet training op je gesprekken uit.</li>
              <li>Haal restanten weg en check het resultaat voordat je verstuurt.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Mag je ChatGPT gebruiken voor je cv?</h2>
          <p className="mt-4 leading-7 text-[var(--wk-ink-muted)]">
            Bij de meeste werkgevers wel. In het onderzoek van Tilburg University en Rendement laat 79% van de organisaties sollicitanten zelf bepalen of en hoe ze een taalmodel gebruiken, zolang de informatie in de brief of het cv overeenkomt met de werkelijkheid. 11% zegt dat sollicitanten geen taalmodel mogen gebruiken. Werkgevers schatten dat 25% van de cv&apos;s en 29% van de brieven met een taalmodel wordt geschreven.
          </p>
          <p className="mt-4 leading-7 text-[var(--wk-ink-muted)]">Waar werkgevers zich zorgen over maken:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-7 text-[var(--wk-ink-muted)]">
            <li>kennis en vaardigheden zijn lastiger te beoordelen (62%);</li>
            <li>sollicitanten zijn minder zichzelf (49%);</li>
            <li>sollicitanten geven onbewust foute informatie (28%);</li>
            <li>privacy van sollicitatiegegevens (15%).</li>
          </ul>
          <p className="mt-4 text-sm text-[var(--wk-ink-muted)]">
            Bron:{" "}
            <a href={SOURCES.tilburg.href} className="underline underline-offset-4" rel="noopener" target="_blank">
              {SOURCES.tilburg.label}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Wat er misging toen ChatGPT 24 cv&apos;s schreef</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--wk-ink-muted)]">
            Op 27 september 2026 lieten we het huidige OpenAI-model (gpt-5.5, via de API, standaardinstellingen) cv&apos;s schrijven voor 8 fictieve sollicitanten, van magazijnmedewerker tot verpleegkundige. We gebruikten de drie prompts die populaire gidsen aanraden: &lsquo;schrijf een voorbeeld-cv voor een [functie]&rsquo;, &lsquo;maak een cv van deze gegevens&rsquo; en &lsquo;pas mijn cv aan op deze vacature&rsquo;. In elke vacature stonden twee eisen die de sollicitant niet had. Daarna deden we hetzelfde met de prompts van deze pagina.
          </p>
          <div className="wk-table-scroll-hint mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--wk-border)]">
                  <th className="py-2 pr-4">Wat we zagen</th>
                  <th className="py-2 pr-4">Populaire prompts</th>
                  <th className="py-2">Prompts van deze pagina</th>
                </tr>
              </thead>
              <tbody>
                {TEST_ROWS.map((row) => (
                  <tr key={row.finding} className="border-b border-[var(--wk-border)] align-top">
                    <td className="py-2 pr-4">{row.finding}</td>
                    <td className="py-2 pr-4 font-semibold">{row.popular}</td>
                    <td className="py-2 font-semibold">{row.ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 max-w-3xl space-y-3 leading-7 text-[var(--wk-ink-muted)]">
            <p>
              <strong className="text-[var(--wk-ink)]">Wat goed ging:</strong> het model claimde geen ontbrekende eisen. Het zei zelf dat je Salesforce of een reachtruckcertificaat niet moet noemen als je het niet hebt.
            </p>
            <p>
              <strong className="text-[var(--wk-ink)]">Wat misging:</strong> het antwoord is geen kant-en-klaar cv. Advies, alternatieve zinnen en invulvelden staan tussen de cv-tekst, dus wie alles kopieert, stuurt dat mee. Talen kregen woorden als &lsquo;vloeiend&rsquo; of &lsquo;redelijk&rsquo; in plaats van een niveau. En de &lsquo;voorbeeld-cv&rsquo;-prompt leverde verzonnen namen, adressen en werkgevers op, soms met een geboortedatum en &lsquo;referenties op aanvraag&rsquo;.
            </p>
            <p>
              <strong className="text-[var(--wk-ink)]">Met de prompts hieronder</strong> kwamen er geen restanten en geen extra eigenschappen in de cv&apos;s. Waar een taalniveau ontbrak, vroeg het model ernaar in plaats van te gokken. Beantwoord die vragen en vul het cv daarmee aan.
            </p>
            <p className="text-sm">
              Beperkingen: 8 fictieve sollicitanten en één model op één dag. De ChatGPT-app kan een ander model of andere instellingen gebruiken, en uitkomsten verschillen per keer.
            </p>
          </div>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Stappenplan: zo maak je een cv met ChatGPT</h2>
          <ol className="mt-6 space-y-5">
            {[
              {
                title: "Bescherm je gegevens",
                body: "Laat je BSN, adres, telefoonnummer en e-mail weg; die vul je later zelf in. Zet in ChatGPT training op je gesprekken uit (Instellingen → Data controls → 'Improve the model for everyone') of gebruik een tijdelijke chat. Die wordt niet voor training gebruikt en maximaal 30 dagen bewaard.",
                source: SOURCES.openai,
              },
              {
                title: "Schrijf je eigen feiten op",
                body: "Per functie: werkgever, jaartallen, 3 tot 5 taken en wat het opleverde als je dat weet. Daarnaast je opleiding, talen met niveau en de programma's die je gebruikt. Hoe concreter je input, hoe minder ChatGPT hoeft in te vullen.",
              },
              {
                title: "Gebruik een prompt met regels",
                body: "Neem prompt 1 of 2 hieronder. De regels zorgen voor platte tekst zonder invulvelden, alleen jouw feiten, Nederlandse kopjes en taalniveaus, en vragen ná het cv in plaats van advies erin.",
              },
              {
                title: "Beantwoord de vragen en controleer wat erbij kwam",
                body: "Lees het cv regel voor regel. Staat er een eigenschap, programma of getal dat je niet gaf? Haal het weg of vervang het door een voorbeeld dat klopt. Beantwoord de vragen onder het cv en laat het cv daarmee aanvullen.",
              },
              {
                title: "Zet het in een nette opmaak en check het",
                body: `Kopieer alleen de cv-tekst, zonder de vragen. Zet die in een cv-template met één kolom, zodat sollicitatiesystemen hem goed lezen, en plak de tekst in de check hieronder. In de WerkCV-editor is een template gratis; de PDF kost eenmalig ${cvDownloadPrice.display}.`,
              },
            ].map((step, index) => (
              <li key={step.title} className="wk-card p-5">
                <h3 className="font-semibold text-[var(--wk-ink)]">
                  Stap {index + 1}. {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{step.body}</p>
                {step.source && (
                  <p className="mt-2 text-xs text-[var(--wk-ink-muted)]">
                    Bron:{" "}
                    <a href={step.source.href} className="underline underline-offset-4" rel="noopener" target="_blank">
                      {step.source.label}
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="prompts" className="wk-section scroll-mt-24">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Prompts om te kopiëren</h2>
          <p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">
            Vervang alles tussen [haken] door je eigen tekst. Prompt 1 en 2 zijn de geteste versies uit de tabel hierboven.
          </p>
          <div className="mt-6 space-y-5">
            {PROMPTS.map((prompt) => (
              <article key={prompt.id} className="wk-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-[var(--wk-ink)]">{prompt.title}</h3>
                    <p className="mt-1 text-sm text-[var(--wk-ink-muted)]">{prompt.when}</p>
                  </div>
                  <CopyPromptButton text={prompt.text} promptId={prompt.id} />
                </div>
                <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-[var(--wk-surface)] p-4 text-sm leading-6 text-[var(--wk-ink)]">
                  {prompt.text}
                </pre>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="check" className="wk-section scroll-mt-24 bg-[var(--wk-surface)]">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Check wat ChatGPT schreef</h2>
          <p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">
            Plak de cv-tekst of upload je cv. De check vindt restanten zoals invulvelden, opmaaktekens en chatbottekst, en kijkt naar leesbaarheid voor sollicitatiesystemen, inhoud en Nederlandse regels zoals taalniveaus. Met een vacature zie je per eis of je cv die aantoont. Gratis, zonder account, en je cv wordt niet opgeslagen.
          </p>
          <div className="mt-6">
            <CvCheckTool
              locale="nl"
              initialInputMode="text"
              entry="chatgpt_guide"
              methodologyHref="/cv-check/methodologie"
              editorHref="/editor?template=professional&startSource=chatgpt_guide"
            />
          </div>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Checklist voordat je verstuurt</h2>
          <ul className="mt-4 space-y-2">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex gap-3 leading-7 text-[var(--wk-ink-muted)]">
                <span aria-hidden="true" className="font-semibold text-[var(--wk-ink)]">
                  ☐
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLandingLink
              href="/editor?template=professional&startSource=chatgpt_guide"
              trackingLocation="chatgpt_guide:checklist"
              trackingLabel="open_editor"
              className="wk-button wk-button-primary"
            >
              Zet je tekst in een cv-template
            </TrackedLandingLink>
            <Link href="/templates" className="wk-button wk-button-secondary">
              Bekijk de templates
            </Link>
          </div>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Veelgestelde vragen over een cv met ChatGPT</h2>
          <div className="mt-6 space-y-3">
            {FAQ.map((item) => (
              <details key={item.question} className="wk-card p-4">
                <summary className="cursor-pointer font-semibold text-[var(--wk-ink)]">{item.question}</summary>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Verder met je cv</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {RELATED.map((item) => (
              <Link key={item.href} href={item.href} className="wk-card block p-5 transition hover:border-[var(--wk-ink)]">
                <span className="font-semibold text-[var(--wk-ink)]">{item.label}</span>
                <span className="mt-2 block text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
