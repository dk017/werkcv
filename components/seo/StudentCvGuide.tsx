import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import SimpleTable from "@/components/seo/GuideTable";
import { UseExampleButton } from "@/components/cv-voorbeelden/UseExampleButton";
import { studentCvSample } from "@/lib/cv-samples/student-cv";
import { cvDownloadPrice } from "@/lib/site-content";

// Owner page for "cv student / hoe maak je een cv student / cv bijbaantje" (merged 1 Nov 2026 with
// /cv-tips/cv-maken-als-student). Example and age pages stay separate: they own "voorbeeld" and "15/16 jarige".
const PATH = "/cv-maken-student" as const;
const UPDATED = { iso: "2026-11-01", display: "1 november 2026" };

const SOURCES = {
  uva: {
    label: "Universiteit van Amsterdam: curriculum vitae (studentenadvies)",
    href: "https://student.uva.nl/informatie/curriculum-vitae",
  },
  jeugdloon: {
    label: "Rijksoverheid: percentages minimumjeugdloon",
    href: "https://www.rijksoverheid.nl/themas/werk/minimumloon/bedragen-minimumloon/percentages-minimumjeugdloon",
  },
  werktijden: {
    label: "Rijksoverheid: hoeveel uur mag ik werken als ik 16 of 17 jaar ben?",
    href: "https://www.rijksoverheid.nl/vraag-en-antwoord/bijbaan-vakantiewerk-en-stage-door-jongeren/hoeveel-uur-werken-16-17-jaar",
  },
} as const;

const SUMMARY = [
  "Eén A4 is genoeg. Bovenaan staat wat je zoekt en wanneer je kunt.",
  "Je huidige opleiding staat bovenaan je opleidingen, met 'heden (verwacht afgerond: juli 2028)'.",
  "Weinig werkervaring is normaal. Oppassen, een krantenwijk, een commissie of een schoolproject telt mee als je opschrijft wat je deed en hoeveel.",
  "Voor een bijbaan zijn je beschikbaarheid en, onder de 21, je leeftijd vaak het eerste wat een werkgever wil weten.",
  "Cijfers zijn optioneel. Zet een gemiddelde of scriptiecijfer er alleen bij als het 7,5 of hoger is.",
];

const VARIANT_HEAD = ["", "Bijbaan of studentenjob", "Stage", "Eerste baan na je studie"] as const;
const VARIANT_ROWS = [
  ["Bovenaan", "Beschikbaarheid: dagen, uren per week, vakanties", "Stageperiode, uren per week en je opleiding", "De functie die je zoekt en je afstudeerdatum"],
  ["Belangrijkste bewijs", "Eerdere bijbaan, klantcontact, op tijd komen", "Vakken, projecten en vaardigheden die de stage vraagt", "Stage, scriptie en projecten met resultaat"],
  ["Leeftijd", "Mag erbij, onder de 21 vaak gevraagd", "Niet nodig", "Niet nodig"],
  ["Cijfers", "Nee", "Alleen als erom gevraagd wordt", "Optioneel, vanaf een 7,5"],
  ["Lengte", "1 A4", "1 A4", "1 A4, hooguit 2"],
];

const EXPERIENCE_ROWS = [
  ["Oppassen", "Oppas", "Oppas voor twee kinderen (4 en 7 jaar), twee middagen per week, 2023 – heden. Ophalen uit school, koken en huiswerk begeleiden."],
  ["Krantenwijk of folders", "Krantenwijk", "Bezorger, 350 adressen, elke woensdag en zaterdag, 2022 – 2024. Nooit een bezorging overgeslagen."],
  ["Sportclub", "Vrijwilliger bij de voetbalclub", "Trainer onder-10, één training en één wedstrijd per week, 2024 – heden. Team van 12 spelers, contact met ouders."],
  ["Studievereniging", "Lid van de feestcommissie", "Commissielid, 4 feesten per jaar voor 200 tot 300 gasten. Verantwoordelijk voor kaartverkoop en de deur."],
  ["Schoolproject", "Groepsopdracht marketing", "Marktonderzoek voor een fietsenwinkel met 5 studenten: 120 enquêtes afgenomen en het advies gepresenteerd aan de eigenaar."],
  ["Online verkopen", "Verkoop via Vinted", "Tweedehands kleding verkocht: 140 verkopen, beoordeling 4,9. Foto's, prijzen en verzending zelf geregeld."],
];

const FAQ = [
  {
    question: "Wat zet je op je cv als student?",
    answer:
      "Je naam en contactgegevens, een korte profieltekst met wat je zoekt, je opleiding (de huidige bovenaan, met verwachte afstudeerdatum), werkervaring en stages, nevenactiviteiten zoals een commissie of vrijwilligerswerk, vaardigheden en talen. Voor een bijbaan zet je je beschikbaarheid erbij.",
  },
  {
    question: "Hoe schrijf ik een cv voor een bijbaantje of studentenjob?",
    answer:
      "Begin met wanneer je kunt werken: welke dagen, hoeveel uur per week en in welke vakanties. Zet daarna eerdere bijbanen of klussen met wat je deed, en houd het op één A4. Werkgevers voor een bijbaan zoeken vooral iemand die betrouwbaar is en kan als zij iemand nodig hebben.",
  },
  {
    question: "Moet mijn leeftijd op mijn cv?",
    answer:
      "Voor een stage of een baan na je studie is dat niet nodig. Voor een bijbaan als je jonger bent dan 21 mag het er wel op, omdat je loon tot je 21e van je leeftijd afhangt. Ben je 16 of 17, dan gelden er ook regels voor je werktijden. Een werkgever vraagt er dan toch naar.",
  },
  {
    question: "Zet ik mijn cijfers op mijn cv?",
    answer:
      "Dat hoeft niet. Is je gemiddelde of scriptiecijfer 7,5 of hoger, dan kun je het noemen; dat is ook het advies van de Universiteit van Amsterdam. Een cum laude of een prijs zet je er altijd bij.",
  },
  {
    question: "Zet ik mijn middelbare school op mijn cv?",
    answer:
      "Ja, zolang het je hoogste afgeronde diploma is. Zit je in je propedeuse of later, dan zet je je huidige opleiding bovenaan en de middelbare school eronder met alleen het diploma en het jaar.",
  },
  {
    question: "Hoe lang mag een cv van een student zijn?",
    answer: "Eén A4. Pas na een paar stages en bijbanen die bij de functie passen, kan een tweede pagina nodig zijn.",
  },
  {
    question: "Kan ik als student gratis een cv maken bij WerkCV?",
    answer: `Je bouwt en bekijkt je cv gratis. Pas als je de pdf downloadt, betaal je eenmalig ${cvDownloadPrice.display}, zonder abonnement. Daarna kun je hetzelfde cv blijven aanpassen en opnieuw downloaden.`,
  },
];

const CHECKLIST = [
  "Bovenaan staat wat je zoekt: bijbaan, stage of eerste baan.",
  "Voor een bijbaan staat je beschikbaarheid erin: dagen, uren per week, vakanties.",
  "Je huidige opleiding staat bovenaan, met verwachte afstudeerdatum.",
  "Elke bijbaan of activiteit heeft een periode en minstens één concreet getal of resultaat.",
  "Geen 'heden' bij een bijbaan waar je al gestopt bent.",
  "Je e-mailadres bestaat uit je naam.",
  "Alles past op één A4.",
];

const RELATED = [
  { href: "/cv-voorbeelden/studenten-en-starters/student-cv", label: "CV voorbeeld student", body: "Een volledig ingevuld cv van een student met stage en bestuurswerk." },
  { href: "/cv-voorbeelden/studenten-en-starters/bijbaan-deeltijd-cv", label: "CV voorbeeld bijbaan", body: "Voor supermarkt, winkel of horeca, met beschikbaarheid bovenaan." },
  { href: "/stage-cv-maken", label: "CV voor een stage", body: "Wat een stagebegeleider in je cv zoekt, en hoe je je opleiding inzet." },
  { href: "/cv-tips/cv-zonder-werkervaring", label: "CV zonder werkervaring", body: "Meer manieren om zonder baan toch bewijs te laten zien." },
  { href: "/cv-tips/cv-opleiding-vermelden", label: "Opleiding op je cv", body: "Middelbare school, propedeuse, minor en certificaten: wat zet je erop?" },
  { href: "/cv-maken-16-jarige", label: "CV voor een 15- of 16-jarige", body: "Je eerste cv, als je nog op de middelbare school zit." },
];

const sample = studentCvSample;

export const STUDENT_CV_GUIDE_META = {
  path: PATH,
  title: "CV maken als student: voorbeeld voor bijbaan en stage | WerkCV",
  description:
    "Zo maak je als student een cv voor een bijbaan, stage of eerste baan: ingevuld voorbeeld, wat telt als ervaring, beschikbaarheid, leeftijd en cijfers.",
  h1: "CV maken als student: voorbeeld voor bijbaan, stage en eerste baan",
  keywords: ["cv student", "cv maken student", "hoe maak je een cv student", "student cv", "cv bijbaantje", "cv studentenjob", "cv voor studenten"],
};

export default function StudentCvGuide() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: STUDENT_CV_GUIDE_META.h1,
    description: STUDENT_CV_GUIDE_META.description,
    inLanguage: "nl-NL",
    dateModified: UPDATED.iso,
    author: { "@type": "Organization", name: "WerkCV", url: "https://werkcv.nl" },
    publisher: { "@type": "Organization", name: "WerkCV", url: "https://werkcv.nl" },
    mainEntityOfPage: `https://werkcv.nl${PATH}`,
    citation: Object.values(SOURCES).map((source) => source.href),
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
              { label: "CV maken als student", href: PATH },
            ]}
          />
          <p className="wk-eyebrow mt-4">Student-cv</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-[var(--wk-ink)] sm:text-4xl md:text-5xl">{STUDENT_CV_GUIDE_META.h1}</h1>
          <p className="mt-4 text-base leading-7 text-[var(--wk-ink-muted)] sm:text-lg sm:leading-8">
            Een student-cv is één A4 met bovenaan wat je zoekt en wanneer je kunt. Daaronder je opleiding, met de verwachte afstudeerdatum, en
            daarna je bijbanen, stages en activiteiten als bewijs dat je betrouwbaar bent en iets kunt. Wat je het meest benadrukt, hangt af van
            waarvoor je solliciteert: een bijbaan, een stage of je eerste baan na je studie.
          </p>
          <p className="mt-2 text-sm text-[var(--wk-ink-muted)]">
            Redactie WerkCV · <time dateTime={UPDATED.iso}>Bijgewerkt: {UPDATED.display}</time>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <UseExampleButton
              templateId="professional"
              colorThemeId="classic-blue"
              sampleCV={studentCvSample}
              label="Open het ingevulde student-cv"
              startSource="student_guide_example"
              pagePath={PATH}
              trackingLocation={`student_guide:${PATH}:hero`}
              trackingLabel="use_student_example"
            />
            <a href="#ervaring" className="wk-button wk-button-secondary">
              Geen werkervaring? Begin hier
            </a>
          </div>

          <div className="wk-card mt-8 p-5">
            <h2 className="font-semibold text-[var(--wk-ink)]">In het kort</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--wk-ink-muted)]">
              {SUMMARY.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Bijbaan, stage of eerste baan: wat zet je bovenaan?</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--wk-ink-muted)]">
            De opbouw is steeds hetzelfde. Wat verschilt, is wat de lezer als eerste wil weten. Een supermarkt zoekt iemand voor zaterdag, een
            stagebedrijf iemand die van februari tot juli kan, een werkgever na je studie iemand die het vak al een beetje kent.
          </p>
          <SimpleTable head={VARIANT_HEAD} rows={VARIANT_ROWS} />
          <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted)]">
            Lengte en cijfers volgen het studentenadvies van de <Source id="uva" />.
          </p>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Voorbeeld: cv van een student voor een bijbaan</h2>
          <p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">
            Een verzonnen tweedejaars hbo-student die een bijbaan in de horeca of winkel zoekt. Let op de beschikbaarheid in het profiel, de
            verwachte afstudeerdatum en de periode bij elke baan.
          </p>
          <article className="wk-card mt-6 p-5 sm:p-6" aria-label="Voorbeeld student-cv">
            <p className="text-lg font-semibold text-[var(--wk-ink)]">{sample.personal.name}</p>
            <p className="text-sm font-semibold text-[var(--wk-ink)]">{sample.personal.title}</p>
            <p className="mt-1 text-sm text-[var(--wk-ink-muted)]">
              {sample.personal.location} · {sample.personal.phone} · {sample.personal.email} · geboren {sample.personal.birthDate}
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[var(--wk-ink-muted)]">Profiel</p>
            <p className="mt-1 text-sm leading-6 text-[var(--wk-ink)]">{sample.personal.summary}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[var(--wk-ink-muted)]">Opleiding</p>
            {sample.education.map((item) => (
              <div key={item.degree} className="mt-2">
                <p className="text-sm font-semibold text-[var(--wk-ink)]">
                  {item.degree}, {item.location}
                </p>
                <p className="text-xs text-[var(--wk-ink-muted)]">
                  {item.start} – {item.end}
                </p>
                <p className="text-sm leading-6 text-[var(--wk-ink-muted)]">{item.description}</p>
              </div>
            ))}
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[var(--wk-ink-muted)]">Werkervaring en activiteiten</p>
            {sample.experience.map((job) => (
              <div key={job.role} className="mt-3 border-t border-[var(--wk-border)] pt-3">
                <p className="text-sm font-semibold text-[var(--wk-ink)]">
                  {job.role}, {job.company}
                </p>
                <p className="text-xs text-[var(--wk-ink-muted)]">
                  {job.start} – {job.end} · {job.description}
                </p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-[var(--wk-ink)]">
                  {job.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </article>
          <p className="mt-4 text-sm leading-6 text-[var(--wk-ink-muted)]">
            Open het voorbeeld in de editor en vervang de gegevens door je eigen. Zoek je een stage of je eerste baan? Bekijk dan het{" "}
            <Link href="/cv-voorbeelden/studenten-en-starters/student-cv" className="underline underline-offset-4">
              student-cv met stage en bestuurswerk
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="ervaring" className="wk-section scroll-mt-24 bg-[var(--wk-surface)]">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Weinig werkervaring? Dit telt wel</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--wk-ink-muted)]">
            Een werkgever wil weten of je afspraken nakomt, met mensen kunt omgaan en iets afmaakt. Dat bewijs je niet alleen met een baan. Het
            verschil zit in hoe je het opschrijft: met een periode, hoe vaak, en een getal.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {EXPERIENCE_ROWS.map(([activity, weak, strong]) => (
              <div key={activity} className="wk-card p-5">
                <p className="font-semibold text-[var(--wk-ink)]">{activity}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  <span className="font-semibold">Niet:</span> {weak}
                </p>
                <p className="mt-1 text-sm leading-6 text-[var(--wk-ink)]">
                  <span className="font-semibold">Wel:</span> {strong}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--wk-ink-muted)]">
            Had je veel korte bijbaantjes die niets met de functie te maken hebben? Zet ze dan op één regel, bijvoorbeeld &quot;2022 – 2024: diverse
            bijbanen in horeca en winkel&quot;. Dat advies geeft de UvA ook.
          </p>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Beschikbaarheid en leeftijd bij een bijbaan</h2>
          <p className="mt-4 leading-7 text-[var(--wk-ink-muted)]">
            Voor een stage of een baan na je studie hoort je leeftijd niet op je cv. Voor een bijbaan ligt dat anders. Tot je 21e hangt je
            minimumloon af van je leeftijd, en voor 16- en 17-jarigen gelden regels voor werktijden: je schooltijd telt mee als werktijd en je mag
            niet &apos;s nachts werken. Een werkgever die een rooster maakt, vraagt daarom toch naar je leeftijd. Zet je geboortedatum er gerust bij.
          </p>
          <p className="mt-4 leading-7 text-[var(--wk-ink-muted)]">
            Belangrijker nog is je beschikbaarheid. &quot;Flexibel inzetbaar&quot; zegt niets. Schrijf het zo concreet als een rooster:
          </p>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-[var(--wk-surface)] p-4 text-sm leading-6 text-[var(--wk-ink)]">
            {`Beschikbaar: 12 tot 16 uur per week
Dinsdag- en donderdagavond vanaf 17.00, zaterdag de hele dag
Fulltime in de zomervakantie (juli en augustus)`}
          </pre>
          <p className="mt-4 text-sm text-[var(--wk-ink-muted)]">
            Bronnen: <Source id="jeugdloon" />; <Source id="werktijden" />. Wil je weten wat je minimaal moet verdienen? Gebruik de{" "}
            <Link href="/tools/minimumloon-checker" className="underline underline-offset-4">
              minimumloon checker
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Je opleiding vermelden als student</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-[var(--wk-ink-muted)]">
            <li>
              Je huidige opleiding staat bovenaan. Zet bij de einddatum &quot;heden (verwacht afgerond: juli 2028)&quot;, zodat een werkgever weet
              tot wanneer je studeert.
            </li>
            <li>Noem je propedeuse als je die hebt, je minor, en een project dat past bij de functie. Een scriptietitel hoort erbij als je die al hebt.</li>
            <li>
              Je middelbare school blijft staan zolang het je hoogste diploma is. Daarna is één regel genoeg: niveau, profiel en jaar. Meer in{" "}
              <Link href="/cv-tips/cv-opleiding-vermelden" className="underline underline-offset-4">
                opleiding op je cv vermelden
              </Link>
              .
            </li>
            <li>Cijfers zijn optioneel. Een gemiddelde of scriptiecijfer van 7,5 of hoger mag je noemen, een cum laude altijd.</li>
          </ul>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Profieltekst voor een student: drie voorbeelden</h2>
          <p className="mt-4 leading-7 text-[var(--wk-ink-muted)]">
            Drie zinnen: wie je bent, wat je zoekt en waarom je past. Laat woorden als &quot;teamplayer&quot; en &quot;leergierig&quot; weg als je
            er geen voorbeeld bij geeft.
          </p>
          <div className="mt-6 space-y-4">
            <div className="wk-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--wk-ink-muted)]">Bijbaan</p>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-ink)]">{sample.personal.summary}</p>
            </div>
            <div className="wk-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--wk-ink-muted)]">Stage</p>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-ink)]">
                Derdejaars student Bedrijfskunde (hbo) die van februari tot en met juni 2027 een meewerkstage zoekt van vier dagen per week, in
                inkoop of logistiek. Heeft in een schoolproject de voorraad van een webwinkel geanalyseerd in Excel en werkt al twee jaar in een
                magazijn.
              </p>
            </div>
            <div className="wk-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--wk-ink-muted)]">Eerste baan</p>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-ink)]">
                Pas afgestudeerd als verpleegkundige (hbo, juni 2026) met stages op een interne afdeling en in de wijkzorg. Zoekt een eerste baan
                in een ziekenhuis in de regio Utrecht, 32 uur per week, per september 2026.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-[var(--wk-ink-muted)]">
            Wil je hulp bij de eerste versie? De{" "}
            <Link href="/tools/profieltekst-generator" className="underline underline-offset-4">
              profieltekst generator
            </Link>{" "}
            maakt een voorstel dat je daarna zelf aanpast.
          </p>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Checklist voor je verstuurt</h2>
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
            <UseExampleButton
              templateId="professional"
              colorThemeId="classic-blue"
              sampleCV={studentCvSample}
              label="Begin met het ingevulde voorbeeld"
              startSource="student_guide_example"
              pagePath={PATH}
              trackingLocation={`student_guide:${PATH}:checklist`}
              trackingLabel="use_student_example"
            />
            <Link href="/editor?template=professional&startSource=student_guide_blank" className="wk-button wk-button-secondary">
              Begin met een leeg cv
            </Link>
          </div>
          <p className="mt-3 text-sm text-[var(--wk-ink-muted)]">
            Gratis bouwen en bekijken. Pas bij het downloaden betaal je {cvDownloadPrice.display} eenmalig, geen abonnement.
          </p>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Veelgestelde vragen over een student-cv</h2>
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

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Verder lezen en voorbeelden</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {RELATED.map((item) => (
              <Link key={item.href} href={item.href} className="wk-card block p-5 transition hover:border-[var(--wk-ink)]">
                <span className="font-semibold text-[var(--wk-ink)]">{item.label}</span>
                <span className="mt-2 block text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-sm text-[var(--wk-ink-muted)]">
            <p className="font-semibold text-[var(--wk-ink)]">Bronnen</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {(Object.keys(SOURCES) as Array<keyof typeof SOURCES>).map((id) => (
                <li key={id}>
                  <Source id={id} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

function Source({ id }: { id: keyof typeof SOURCES }) {
  return (
    <a href={SOURCES[id].href} className="underline underline-offset-4" rel="noopener" target="_blank">
      {SOURCES[id].label}
    </a>
  );
}
