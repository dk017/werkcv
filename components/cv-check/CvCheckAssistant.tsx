import Link from "next/link";
import CopyUrlButton from "@/components/cv-check/CopyUrlButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import type { CvCheckLocale } from "@/lib/cv-check/types";
import { cvDownloadPrice } from "@/lib/site-content";

export const MCP_URL = "https://werkcv.nl/api/mcp";
export const ASSISTANT_PAGE_UPDATED = { nl: "5 oktober 2026", en: "5 October 2026" } as const;

// Public documentation for the connector (also what the directory submission points to). Facts here must match
// lib/mcp: tools, limits, what is stored. Prices come from lib/site-content.
function buildCopy(locale: CvCheckLocale) {
  const price = locale === "en" ? cvDownloadPrice.displayEn : cvDownloadPrice.display;
  if (locale === "en") {
    return {
      path: "/en/cv-check/ai-assistant",
      breadcrumbs: [
        { label: "Home", href: "/en" },
        { label: "CV check", href: "/en/cv-check" },
        { label: "In your AI assistant", href: "/en/cv-check/ai-assistant" },
      ],
      eyebrow: "Connector for AI assistants",
      h1: "Free CV check inside Claude",
      intro:
        "Connect WerkCV to Claude and have your CV checked against Dutch hiring conventions, or compared with a vacancy, right in the conversation. No WerkCV account needed.",
      updated: `Last updated: ${ASSISTANT_PAGE_UPDATED.en}`,
      toolsTitle: "What you can ask for",
      tools: [
        { name: "Check a CV", body: "A grade from 1 to 10 for readability by application systems, contact basics, content and Dutch conventions, with the fixes to make first. Free, uses no AI, nothing is stored." },
        { name: "Compare a CV with a vacancy", body: "Requirement by requirement, with quotes from the vacancy and from your CV, whether each requirement is essential or a nice-to-have, and the fixes to make first. Uses AI. Nothing is stored." },
        { name: "Open the CV in the editor", body: `A one-time link that opens your CV in the WerkCV editor. Editing is free and needs no account; downloading the PDF costs ${price} once, with no subscription.` },
      ],
      connectTitle: "How to connect Claude to WerkCV",
      connectSteps: [
        "In Claude, open Customize, then Connectors, choose Add and then Add custom connector.",
        "Enter a name (for example WerkCV CV check) and this server URL:",
        "Claude detects that no sign-in is needed. Continue, then choose Connect.",
        "In a new conversation, switch the connector on (the plus button, then Connectors). Claude asks permission before it uses a tool: choose Allow once, or Always allow.",
      ],
      connectNote:
        "Menus differ slightly per version, and Anthropic decides which Claude plans can add custom connectors. We tested the steps above in Claude on the web. Other assistants that support MCP servers can use the same URL, but we have not tested them.",
      copyLabel: "Copy URL",
      copiedLabel: "Copied",
      selectedLabel: "Selected: press Ctrl+C",
      promptsTitle: "Try it with",
      prompts: [
        "Can you check my CV? Here it is: [paste your CV text]",
        "Compare my CV with this vacancy: [paste the CV and the vacancy text]",
        "Can I edit this CV and download it as a PDF?",
      ],
      dataTitle: "What we receive and keep",
      dataIntro: "Only the text Claude sends when you use a tool. We never ask Claude for your chat history, memory or files.",
      dataRows: [
        { tool: "Check a CV", receives: "Your CV text", keeps: "Nothing" },
        { tool: "Compare with a vacancy", receives: "Your CV text and the vacancy text, sent to OpenAI for the analysis", keeps: "Nothing" },
        { tool: "Open in the editor", receives: "Your CV text (and the vacancy text, if any)", keeps: "At most 60 minutes, for one single-use link. Deleted the first time the link is opened." },
      ],
      dataColTool: "Tool",
      dataColReceives: "We receive",
      dataColKeeps: "We keep",
      dataAfter:
        "We record only counts (which tool, language and outcome), never the text itself. Your IP address is used briefly in working memory to limit abuse and is not stored for that purpose. Never send your BSN, ID number or bank details. See also our",
      privacyLink: { href: "/en/privacy", label: "privacy policy" },
      knowTitle: "Good to know",
      know: [
        "Checks are free. There are hourly limits per user to prevent abuse, and a daily limit on AI use for the whole service. If a limit is reached, try again later.",
        "Every tool call sends your whole CV, which counts toward your Claude usage. A long CV and several steps in one conversation use a noticeable share.",
        "The grade here comes from the pasted text only. File layout (columns, scanned pages) and the AI style checks of the website are not included, so it can differ slightly from the website check.",
        "The grade is not a prediction of an interview. See how it is calculated in the",
      ],
      methodologyLink: { href: "/en/cv-check/methodology", label: "methodology" },
      disclaimer: "WerkCV is not affiliated with Anthropic. Claude is a trademark of Anthropic.",
      faqTitle: "Questions",
      faq: [
        { question: "Do I need a WerkCV account?", answer: `No. The checks need no account. In the editor you also edit without an account; you sign in only to download the PDF, which costs ${price} once.` },
        { question: "Is my CV stored?", answer: "Checking a CV and comparing it with a vacancy store nothing. Opening your CV in the editor keeps the text for at most 60 minutes for one single-use link, and deletes it the first time the link is opened." },
        { question: "Does WerkCV see my other conversations?", answer: "No. WerkCV only receives the text Claude sends when you use one of the three tools. We do not read your chat history, memory or files." },
        { question: "Why does Claude ask for permission each time?", answer: "That is Claude's own safety setting for connectors. You can choose Allow once or Always allow per tool." },
        { question: "Who can I contact?", answer: "Email contact@werkcv.nl." },
      ],
      contactLine: "Questions or problems with the connector? Email contact@werkcv.nl.",
      back: { href: "/en/cv-check", label: "Back to the CV check" },
    };
  }
  return {
    path: "/cv-check/ai-assistent",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "CV-check", href: "/cv-check" },
      { label: "In je AI-assistent", href: "/cv-check/ai-assistent" },
    ],
    eyebrow: "Koppeling voor AI-assistenten",
    h1: "Gratis cv-check in Claude",
    intro:
      "Verbind WerkCV met Claude en laat je cv in een gesprek controleren op Nederlandse regels, of naast een vacature leggen. Je hebt geen WerkCV-account nodig.",
    updated: `Laatst bijgewerkt: ${ASSISTANT_PAGE_UPDATED.nl}`,
    toolsTitle: "Wat je kunt vragen",
    tools: [
      { name: "Een cv checken", body: "Een cijfer van 1 tot 10 voor leesbaarheid voor sollicitatiesystemen, basis en contact, inhoud en Nederlandse regels, met de verbeterpunten die je als eerste aanpakt. Gratis, zonder AI, er wordt niets opgeslagen." },
      { name: "Een cv met een vacature vergelijken", body: "Per eis, met citaten uit de vacature en uit je cv, of de eis essentieel is of een pre, en de verbeterpunten die je als eerste aanpakt. Gebruikt AI. Er wordt niets opgeslagen." },
      { name: "Het cv in de editor openen", body: `Een eenmalige link die je cv in de WerkCV-editor opent. Bewerken is gratis en zonder account; het pdf downloaden kost eenmalig ${price}, zonder abonnement.` },
    ],
    connectTitle: "Zo verbind je Claude met WerkCV",
    connectSteps: [
      "Open in Claude Customize, ga naar Connectors, kies Add en dan Add custom connector.",
      "Vul een naam in (bijvoorbeeld WerkCV CV-check) en deze server-URL:",
      "Claude ziet dat inloggen niet nodig is. Ga verder en kies Connect.",
      "Zet in een nieuw gesprek de connector aan (de plusknop, dan Connectors). Claude vraagt toestemming voordat een tool wordt gebruikt: kies Allow once of Always allow.",
    ],
    connectNote:
      "De menu's verschillen per versie, en Anthropic bepaalt welke Claude-abonnementen aangepaste connectors kunnen toevoegen. We hebben bovenstaande stappen getest in Claude op het web. Andere assistenten met MCP-ondersteuning kunnen dezelfde URL gebruiken, maar die hebben we niet getest.",
    copyLabel: "Kopieer URL",
    copiedLabel: "Gekopieerd",
    selectedLabel: "Geselecteerd: druk Ctrl+C",
    promptsTitle: "Probeer het met",
    prompts: [
      "Kun je mijn cv checken? Hier is het: [plak je cv-tekst]",
      "Leg mijn cv naast deze vacature: [plak het cv en de vacaturetekst]",
      "Kan ik dit cv aanpassen en als pdf downloaden?",
    ],
    dataTitle: "Wat we ontvangen en bewaren",
    dataIntro: "Alleen de tekst die Claude meestuurt als je een tool gebruikt. We vragen Claude nooit om je chatgeschiedenis, geheugen of bestanden.",
    dataRows: [
      { tool: "Een cv checken", receives: "Je cv-tekst", keeps: "Niets" },
      { tool: "Vergelijken met een vacature", receives: "Je cv-tekst en de vacaturetekst, voor de analyse naar OpenAI gestuurd", keeps: "Niets" },
      { tool: "Openen in de editor", receives: "Je cv-tekst (en eventueel de vacaturetekst)", keeps: "Maximaal 60 minuten, voor één eenmalige link. Verwijderd zodra de link voor het eerst wordt geopend." },
    ],
    dataColTool: "Tool",
    dataColReceives: "Wij ontvangen",
    dataColKeeps: "Wij bewaren",
    dataAfter:
      "We registreren alleen aantallen (welke tool, taal en uitkomst), nooit de tekst zelf. Je IP-adres gebruiken we alleen kortdurend in het werkgeheugen om misbruik te beperken en slaan we daarvoor niet op. Stuur nooit je BSN, identiteitsnummer of bankgegevens mee. Zie ook onze",
    privacyLink: { href: "/privacy", label: "privacyverklaring" },
    knowTitle: "Goed om te weten",
    know: [
      "De checks zijn gratis. Er gelden limieten per gebruiker per uur om misbruik te voorkomen, en een dagelijkse limiet op AI-gebruik voor de hele dienst. Is een limiet bereikt, probeer het dan later opnieuw.",
      "Elke aanroep stuurt je hele cv mee en telt mee in je Claude-gebruik. Een lang cv en meerdere stappen in één gesprek kosten merkbaar veel.",
      "Het cijfer hier komt alleen uit de geplakte tekst. Bestandsopmaak (kolommen, scans) en de AI-stijlchecks van de website zijn niet meegenomen, dus het kan iets afwijken van de check op de website.",
      "Het cijfer voorspelt geen uitnodiging. Lees hoe het wordt berekend in de",
    ],
    methodologyLink: { href: "/cv-check/methodologie", label: "methodologie" },
    disclaimer: "WerkCV is niet gelieerd aan Anthropic. Claude is een merk van Anthropic.",
    faqTitle: "Vragen",
    faq: [
      { question: "Heb ik een WerkCV-account nodig?", answer: `Nee. De checks vragen geen account. In de editor bewerk je ook zonder account; je meldt je pas aan om het pdf te downloaden, en dat kost eenmalig ${price}.` },
      { question: "Wordt mijn cv opgeslagen?", answer: "Bij het checken en het vergelijken met een vacature wordt niets opgeslagen. Open je het cv in de editor, dan bewaren we de tekst maximaal 60 minuten voor één eenmalige link, en verwijderen we hem zodra de link voor het eerst wordt geopend." },
      { question: "Ziet WerkCV mijn andere gesprekken?", answer: "Nee. WerkCV ontvangt alleen de tekst die Claude meestuurt als je een van de drie tools gebruikt. We lezen je chatgeschiedenis, geheugen of bestanden niet." },
      { question: "Waarom vraagt Claude telkens toestemming?", answer: "Dat is de eigen veiligheidsinstelling van Claude voor connectors. Per tool kies je Allow once of Always allow." },
      { question: "Met wie kan ik contact opnemen?", answer: "Mail naar contact@werkcv.nl." },
    ],
    contactLine: "Vragen of problemen met de koppeling? Mail naar contact@werkcv.nl.",
    back: { href: "/cv-check", label: "Terug naar de CV-check" },
  };
}

export default function CvCheckAssistant({ locale }: { locale: CvCheckLocale }) {
  const copy = buildCopy(locale);

  return (
    <main className="wk-section">
      <FAQJsonLd questions={copy.faq} />
      <div className="wk-container max-w-3xl space-y-10">
        <Breadcrumbs items={copy.breadcrumbs} />
        <header>
          <p className="wk-eyebrow">{copy.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-[var(--wk-ink)]">{copy.h1}</h1>
          <p className="mt-4 text-lg leading-8 text-[var(--wk-ink-muted)]">{copy.intro}</p>
          <p className="mt-2 text-sm text-[var(--wk-ink-muted)]">{copy.updated}</p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{copy.toolsTitle}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {copy.tools.map((tool) => (
              <div key={tool.name} className="wk-card p-4">
                <h3 className="font-semibold text-[var(--wk-ink)]">{tool.name}</h3>
                <p className="mt-2 text-sm text-[var(--wk-ink-muted)]">{tool.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{copy.connectTitle}</h2>
          <ol className="mt-3 list-decimal space-y-3 pl-5 text-[var(--wk-ink-muted)]">
            {copy.connectSteps.map((step, index) => (
              <li key={step}>
                {step}
                {index === 1 && (
                  <span className="mt-2 flex flex-wrap items-center gap-3">
                    <code id="mcp-server-url" className="rounded bg-[var(--wk-surface)] px-2 py-1 text-sm font-semibold text-[var(--wk-ink)]">{MCP_URL}</code>
                    <CopyUrlButton
                      url={MCP_URL}
                      label={copy.copyLabel}
                      doneLabel={copy.copiedLabel}
                      selectedLabel={copy.selectedLabel}
                      selectId="mcp-server-url"
                    />
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-[var(--wk-ink-muted)]">{copy.connectNote}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{copy.promptsTitle}</h2>
          <ul className="mt-3 space-y-2">
            {copy.prompts.map((prompt) => (
              <li key={prompt} className="wk-card p-3 text-sm text-[var(--wk-ink)]">
                {prompt}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{copy.dataTitle}</h2>
          <p className="mt-3 text-[var(--wk-ink-muted)]">{copy.dataIntro}</p>
          <div className="wk-table-scroll-hint mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--wk-border)]">
                  <th className="py-2 pr-4">{copy.dataColTool}</th>
                  <th className="py-2 pr-4">{copy.dataColReceives}</th>
                  <th className="py-2">{copy.dataColKeeps}</th>
                </tr>
              </thead>
              <tbody>
                {copy.dataRows.map((row) => (
                  <tr key={row.tool} className="border-b border-[var(--wk-border)] align-top">
                    <td className="py-2 pr-4 font-semibold">{row.tool}</td>
                    <td className="py-2 pr-4">{row.receives}</td>
                    <td className="py-2">{row.keeps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[var(--wk-ink-muted)]">
            {copy.dataAfter}{" "}
            <Link href={copy.privacyLink.href} className="font-semibold underline underline-offset-4">
              {copy.privacyLink.label}
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{copy.knowTitle}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--wk-ink-muted)]">
            {copy.know.map((line, index) => (
              <li key={line}>
                {line}
                {index === copy.know.length - 1 && (
                  <>
                    {" "}
                    <Link href={copy.methodologyLink.href} className="font-semibold underline underline-offset-4">
                      {copy.methodologyLink.label}
                    </Link>
                    .
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{copy.faqTitle}</h2>
          <dl className="mt-3 space-y-4">
            {copy.faq.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold text-[var(--wk-ink)]">{item.question}</dt>
                <dd className="mt-1 text-[var(--wk-ink-muted)]">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="text-sm text-[var(--wk-ink-muted)]">
          {copy.contactLine} {copy.disclaimer}
        </p>

        <p>
          <Link href={copy.back.href} className="wk-button wk-button-primary">
            {copy.back.label}
          </Link>
        </p>
      </div>
    </main>
  );
}
