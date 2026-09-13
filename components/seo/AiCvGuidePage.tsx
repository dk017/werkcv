import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = { locale: "nl" | "en"; kind: "builder" | "chatgpt" };

export default function AiCvGuidePage({ locale, kind }: Props) {
  const en = locale === "en";
  const aiEnabled = process.env.CONSUMER_AI_REVIEW_ENABLED === "true";
  const builder = kind === "builder";
  const editor = en ? "/en/editor?startSource=ai-guide" : "/editor?startSource=ai-guide";
  const profileTool = en ? "/en/profile-summary-generator" : "/tools/profieltekst-generator";
  const title = builder
    ? en ? "AI CV builder with human review" : "CV maken met AI, met controle over elke wijziging"
    : en ? "Create a CV with ChatGPT without inventing facts" : "Een CV maken met ChatGPT zonder feiten te verzinnen";
  const intro = builder
    ? en ? "Use AI to improve a profile or work-experience section, compare the original with the suggestion, and accept only the changes you trust."
      : "Gebruik AI om je profiel of werkervaring te verbeteren, vergelijk origineel en suggestie en accepteer alleen wijzigingen die jij vertrouwt."
    : en ? "ChatGPT can help with wording, but it does not know which claims are true. Start from your own evidence, verify every number and keep the final decision yourself."
      : "ChatGPT kan helpen met formuleren, maar weet niet welke claims waar zijn. Begin met je eigen bewijs, controleer elk getal en houd zelf de eindbeslissing.";
  const steps = en ? [
    ["Start with facts", "Write down the role, responsibilities, tools and results you can substantiate."],
    ["Request one bounded change", "Improve or shorten one section instead of asking AI to rewrite your entire history."],
    ["Compare before and after", "Check dates, numbers, employers, skills, language levels and responsibility."],
    ["Accept selectively", "Keep the original when a suggestion changes meaning or adds unsupported detail."],
    ["Inspect the final document", "Review the preview and downloaded PDF before sending it."],
  ] : [
    ["Begin met feiten", "Noteer de functie, taken, hulpmiddelen en resultaten die je kunt onderbouwen."],
    ["Vraag één beperkte wijziging", "Verbeter of verkort één onderdeel in plaats van je hele loopbaan te laten herschrijven."],
    ["Vergelijk voor en na", "Controleer datums, getallen, werkgevers, vaardigheden, taalniveaus en verantwoordelijkheid."],
    ["Accepteer per wijziging", "Behoud het origineel wanneer een suggestie de betekenis verandert of details toevoegt."],
    ["Controleer het einddocument", "Bekijk de preview en gedownloade PDF voordat je hem verstuurt."],
  ];
  const path = builder ? (en ? "/en/ai-cv-builder" : "/cv-maken-met-ai") : (en ? "/en/guides/create-cv-with-chatgpt" : "/cv-gids/cv-maken-met-chatgpt");
  const canonical = `https://werkcv.nl${path}`;
  const jsonLd = builder && aiEnabled
    ? { "@context": "https://schema.org", "@type": "SoftwareApplication", name: title, description: intro, url: canonical, inLanguage: en ? "en-NL" : "nl-NL", applicationCategory: "ProductivityApplication", operatingSystem: "Web", featureList: ["Before-and-after AI suggestions", "Individual accept or reject", "Factual safeguards", "Dutch and English CV documents"] }
    : builder
      ? { "@context": "https://schema.org", "@type": "WebPage", name: title, description: intro, url: canonical, inLanguage: en ? "en-NL" : "nl-NL" }
      : { "@context": "https://schema.org", "@type": "HowTo", name: title, description: intro, url: canonical, inLanguage: en ? "en-NL" : "nl-NL", step: steps.map(([name, text], index) => ({ "@type": "HowToStep", position: index + 1, name, text })) };
  // Public routes are wrapped by BrandRouteBoundary, which owns the single
  // header/footer shell. Keeping this component content-only prevents a
  // second header/footer from being mounted on the AI guide pages.
  return <>
    <JsonLd data={jsonLd} />
    <main className="wk-page-shell py-12 sm:py-16">
      <section className="rounded-[2rem] border border-[var(--wk-line)] bg-[var(--wk-paper)] p-6 shadow-[var(--wk-shadow-soft)] sm:p-10">
        <p className="wk-eyebrow">{en ? "Evidence-first AI CV help" : "AI-hulp met feitencontrole"}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">{intro}</p>
        {!aiEnabled && <p className="mt-5 max-w-3xl rounded-xl border border-amber-300 bg-amber-50 p-4 font-medium text-amber-950">{en ? "The reviewed AI writing controls are being certified and are not yet enabled for customers. The regular editor and free tools remain available." : "De gecontroleerde AI-schrijfhulp wordt nog gecertificeerd en is nog niet beschikbaar voor klanten. De gewone editor en gratis tools blijven beschikbaar."}</p>}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={editor} className="wk-button wk-button-primary">{aiEnabled ? (en ? "Open the AI CV editor" : "Open de AI CV-editor") : (en ? "Open the regular CV editor" : "Open de gewone CV-editor")}</Link>
          <Link href={profileTool} className="wk-button wk-button-secondary">{en ? "Try the free profile tool" : "Probeer de gratis profieltool"}</Link>
        </div>
      </section>

      <section className="py-14">
        <h2 className="text-3xl font-semibold">{en ? "A safe five-step workflow" : "Een veilige aanpak in vijf stappen"}</h2>
        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          {steps.map(([heading, body], index) => <article key={heading} className="wk-card min-w-0">
            <p className="wk-eyebrow">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-3 text-xl font-semibold">{heading}</h3><p className="mt-2 leading-7 text-[var(--wk-ink-muted)]">{body}</p>
          </article>)}
        </div>
      </section>

      <section className="grid gap-5 rounded-[2rem] bg-[#e9f7f3] p-6 sm:p-9 lg:grid-cols-2">
        <div><p className="wk-eyebrow">{en ? "Worked example" : "Uitgewerkt voorbeeld"}</p><h2 className="mt-3 text-2xl font-semibold">{en ? "Improve wording without inflating the claim" : "Sterkere formulering zonder de claim groter te maken"}</h2></div>
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-4"><strong>{en ? "Source fact" : "Bronfeit"}</strong><p className="mt-2">{en ? "Handled customer questions by email and kept the team overview up to date." : "Beantwoordde klantvragen per e-mail en hield het teamoverzicht actueel."}</p></div>
          <div className="rounded-xl bg-white p-4"><strong>{en ? "Acceptable suggestion" : "Aanvaardbare suggestie"}</strong><p className="mt-2">{en ? "Answered customer questions by email and maintained the team’s current overview." : "Beantwoordde klantvragen per e-mail en hield het actuele teamoverzicht bij."}</p></div>
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4"><strong>{en ? "Reject" : "Afwijzen"}</strong><p className="mt-2">{en ? "Resolved 50 customer cases daily and improved satisfaction by 25%. The source contains neither number." : "Handelde dagelijks 50 klantcases af en verhoogde de tevredenheid met 25%. Geen van beide getallen staat in de bron."}</p></div>
        </div>
      </section>

      {!builder && <section className="mt-14 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <article className="wk-card"><p className="wk-eyebrow">{en ? "A prompt you can reuse" : "Een prompt die je kunt hergebruiken"}</p><h2 className="mt-3 text-2xl font-semibold">{en ? "Ask for wording, not invented experience" : "Vraag om formulering, niet om verzonnen ervaring"}</h2><p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">{en ? "Give ChatGPT one section and only facts you are willing to publish. Ask it to mark unknowns instead of filling gaps. Do not paste contact details, identity numbers or confidential employer information." : "Geef ChatGPT één onderdeel en alleen feiten die je wilt publiceren. Vraag het om onbekenden te markeren in plaats van gaten op te vullen. Plak geen contactgegevens, identificatienummers of vertrouwelijke werkgeversinformatie."}</p><pre className="mt-5 overflow-x-auto rounded-xl bg-[var(--wk-ink)] p-4 text-sm leading-6 text-white">{en ? "Rewrite this CV section for [target role]. Use only the facts below. Preserve dates, numbers, employers, tools and qualifiers exactly. If evidence is missing, write [CHECK] instead of guessing. Return the revised section and a short list of changes." : "Herschrijf dit CV-onderdeel voor [doelrol]. Gebruik alleen onderstaande feiten. Behoud datums, getallen, werkgevers, tools en nuanceringen exact. Schrijf [CONTROLEREN] als bewijs ontbreekt; vul niets in. Geef de tekst en een korte lijst wijzigingen."}</pre></article>
        <article className="wk-card"><p className="wk-eyebrow">{en ? "Before you paste" : "Voor je plakt"}</p><h2 className="mt-3 text-2xl font-semibold">{en ? "A five-point ChatGPT check" : "Een vijfpuntscontrole voor ChatGPT"}</h2><ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-[var(--wk-ink-muted)]"><li>{en ? "Remove direct contact details and confidential data." : "Verwijder directe contactgegevens en vertrouwelijke data."}</li><li>{en ? "Supply the source text, not a wish list of skills." : "Geef de brontekst, geen verlanglijst met vaardigheden."}</li><li>{en ? "Compare every number, date, employer and tool." : "Vergelijk elk getal, elke datum, werkgever en tool."}</li><li>{en ? "Keep a qualifier such as ‘under supervision’ when it matters." : "Behoud een nuance zoals ‘onder begeleiding’ als die ertoe doet."}</li><li>{en ? "Preview the final CV and PDF before sending it." : "Bekijk het volledige CV en de PDF voordat je hem verstuurt."}</li></ol></article>
      </section>}

      <section className="py-14">
        <h2 className="text-3xl font-semibold">{en ? "What WerkCV checks—and what it cannot prove" : "Wat WerkCV controleert—en niet kan bewijzen"}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <article className="wk-card"><h3 className="text-xl font-semibold">{en ? "Built-in controls" : "Ingebouwde controle"}</h3><ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--wk-ink-muted)]"><li>{en ? "Original and suggestion remain visible" : "Origineel en suggestie blijven zichtbaar"}</li><li>{en ? "Accept or reject each change" : "Accepteer of weiger per wijziging"}</li><li>{en ? "Checks for unsupported numbers, terms and responsibility" : "Controle op niet-onderbouwde getallen, termen en verantwoordelijkheid"}</li><li>{en ? "Undo during the editing session" : "Ongedaan maken tijdens de editorsessie"}</li></ul></article>
          <article className="wk-card"><h3 className="text-xl font-semibold">{en ? "Important limitation" : "Belangrijke beperking"}</h3><p className="mt-4 leading-7 text-[var(--wk-ink-muted)]">{en ? "AI can still misunderstand context. WerkCV does not verify identity, employers or objective truth. You remain responsible for checking every claim against your own records." : "AI kan context nog steeds verkeerd begrijpen. WerkCV verifieert geen identiteit, werkgevers of objectieve waarheid. Jij blijft verantwoordelijk voor controle aan de hand van je eigen gegevens."}</p></article>
        </div>
      </section>
      <section className="rounded-[2rem] bg-[var(--wk-ink)] p-7 text-white sm:p-10"><h2 className="text-3xl font-semibold">{en ? "Ready to improve one section?" : "Klaar om één onderdeel te verbeteren?"}</h2><p className="mt-3 max-w-2xl text-white/75">{en ? "Create and edit for free. You see the one-time PDF price before checkout." : "Maken en bewerken is gratis. Je ziet de eenmalige PDF-prijs vóór het afrekenen."}</p><Link href={editor} className="wk-button mt-6 bg-white text-[var(--wk-ink)]">{en ? "Start my CV" : "Start mijn CV"}</Link></section>
    </main>
  </>;
}
