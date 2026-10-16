import Link from "next/link";
import Footer from "@/components/Footer";
import { cvDownloadPrice } from "@/lib/site-content";

export const MCP_SERVER_URL = "https://werkcv.nl/api/mcp";

const COPY = {
  nl: {
    eyebrow: "AI-assistent",
    title: "WerkCV in je AI-assistent",
    intro:
      "Gebruik je Claude of een andere AI-assistent die externe MCP-koppelingen ondersteunt? Voeg de WerkCV-koppeling toe en laat je cv daar controleren volgens Nederlandse normen, vergelijken met een vacature en openen in de WerkCV-editor.",
    addTitle: "Koppeling toevoegen",
    addIntro: "Een externe MCP-server (streamable HTTP). Je hebt geen account of sleutel nodig.",
    urlLabel: "Server-URL",
    addSteps: [
      "Claude: Instellingen > Connectors > Aangepaste connector toevoegen, en plak de URL.",
      "Andere assistenten en editors (zoals Cursor of VS Code): voeg een MCP-server toe met deze URL, type HTTP.",
      "Vraag daarna bijvoorbeeld: \"Check mijn cv volgens Nederlandse normen\" en plak je cv-tekst.",
    ],
    toolsTitle: "Wat de koppeling kan",
    tools: [
      ["check_cv", "Geeft je cv een cijfer van 1 tot 10 volgens Nederlandse sollicitatienormen en ATS-leesbaarheid, met de verbeterpunten die het eerst moeten. Gratis, zonder AI, er wordt niets opgeslagen."],
      ["match_vacancy", "Vergelijkt je cv met één vacature, eis voor eis, met citaten uit beide teksten, en zegt wat je eerst aanpast. Gebruikt AI en heeft daarom een limiet. Er wordt niets opgeslagen."],
      ["open_in_editor", "Geeft een link die je cv opent in de WerkCV-editor, zonder account. De tekst wordt maximaal 60 minuten bewaard en verwijderd zodra de link voor het eerst wordt geopend."],
    ],
    privacyTitle: "Privacy",
    privacy:
      "De check en de vacaturevergelijking bewaren je cv niet. Voor de vacaturevergelijking gaat de tekst naar OpenAI voor de analyse. Alleen voor de editorlink bewaren we de tekst tijdelijk (maximaal 60 minuten, en weg zodra de link is geopend). We registreren alleen aantallen, nooit de tekst. Meer in onze",
    privacyLink: "privacyverklaring",
    costTitle: "Kosten",
    cost: `De koppeling is gratis. In de editor bouw en bekijk je je cv ook gratis; de PDF downloaden kost ${cvDownloadPrice.display}, eenmalig en zonder abonnement.`,
    contact: "Vragen of een probleem met de koppeling? Mail",
    privacyHref: "/privacy",
  },
  en: {
    eyebrow: "AI assistant",
    title: "WerkCV in your AI assistant",
    intro:
      "Do you use Claude or another AI assistant that supports remote MCP connectors? Add the WerkCV connector to check your CV against Dutch hiring norms, compare it with a vacancy and open it in the WerkCV editor, right from the chat.",
    addTitle: "Add the connector",
    addIntro: "A remote MCP server (streamable HTTP). No account or key needed.",
    urlLabel: "Server URL",
    addSteps: [
      "Claude: Settings > Connectors > Add custom connector, then paste the URL.",
      "Other assistants and editors (such as Cursor or VS Code): add an MCP server with this URL, type HTTP.",
      "Then ask, for example: \"Check my CV against Dutch norms\" and paste your CV text.",
    ],
    toolsTitle: "What it does",
    tools: [
      ["check_cv", "Grades your CV from 1 to 10 against Dutch hiring conventions and ATS readability, with the fixes to make first. Free, no AI, nothing is stored."],
      ["match_vacancy", "Compares your CV with one vacancy, requirement by requirement, with quotes from both texts, and says what to fix first. Uses AI, so it is rate-limited. Nothing is stored."],
      ["open_in_editor", "Returns a link that opens your CV in the WerkCV editor, no account needed. The text is kept for at most 60 minutes and deleted the first time the link is opened."],
    ],
    privacyTitle: "Privacy",
    privacy:
      "The check and the vacancy comparison do not store your CV. For the vacancy comparison the text is sent to OpenAI for the analysis. Only the editor link keeps the text for a short time (at most 60 minutes, gone once the link is opened). We record only counts, never the text. More in our",
    privacyLink: "privacy policy",
    costTitle: "Cost",
    cost: `The connector is free. Building and previewing your CV in the editor is free too; downloading the PDF costs ${cvDownloadPrice.displayEn}, one-time, no subscription.`,
    contact: "Questions or a problem with the connector? Email",
    privacyHref: "/en/privacy",
  },
} as const;

/** Public page about the AI-assistant (MCP) connector; directories link here as its documentation. */
export default function AiAssistantPage({ locale }: { locale: "nl" | "en" }) {
  const c = COPY[locale];
  return (
    <main>
      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <p className="wk-eyebrow">{c.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">{c.title}</h1>
          <p className="mt-5 text-base leading-7 text-[var(--wk-ink-muted)] md:text-lg md:leading-8">{c.intro}</p>

          <div className="wk-card mt-10 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{c.addTitle}</h2>
            <p className="mt-2 text-[var(--wk-ink-muted)]">{c.addIntro}</p>
            <p className="mt-5 text-sm font-semibold text-[var(--wk-ink)]">{c.urlLabel}</p>
            <code className="mt-2 block select-all break-all rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] px-4 py-3 text-base">
              {MCP_SERVER_URL}
            </code>
            <ol className="mt-5 list-decimal space-y-2 pl-5 text-[var(--wk-ink)]">
              {c.addSteps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </div>

          <h2 className="mt-12 text-2xl font-semibold text-[var(--wk-ink)]">{c.toolsTitle}</h2>
          <dl className="mt-4 space-y-4">
            {c.tools.map(([name, text]) => (
              <div key={name} className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-5">
                <dt><code className="font-semibold text-[var(--wk-primary)]">{name}</code></dt>
                <dd className="mt-1.5 leading-7 text-[var(--wk-ink-muted)]">{text}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-12 text-2xl font-semibold text-[var(--wk-ink)]">{c.privacyTitle}</h2>
          <p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">
            {c.privacy}{" "}
            <Link href={c.privacyHref} className="font-semibold text-[var(--wk-primary)] underline underline-offset-4">{c.privacyLink}</Link>.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-[var(--wk-ink)]">{c.costTitle}</h2>
          <p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">{c.cost}</p>

          <p className="mt-12 text-[var(--wk-ink-muted)]">
            {c.contact}{" "}
            <a href="mailto:contact@werkcv.nl" className="font-semibold text-[var(--wk-primary)] underline underline-offset-4">contact@werkcv.nl</a>.
          </p>
        </div>
      </section>
      <Footer variant="brand" uiLanguage={locale} />
    </main>
  );
}
