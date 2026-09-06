import Link from "next/link";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import type { CvMatchLocale } from "@/lib/tools/cv-vacature-match";

type CandidateProposalEvidenceGuideProps = {
  locale: CvMatchLocale;
};

const dutchFaqs = [
  {
    question: "Wat controleert de Candidate Proposal Evidence Checker?",
    answer: "De checker haalt een eerste set concrete functie-eisen uit de vacature, zoekt mogelijke bronregels in het CV en toont per eis een voorlopige status. De bronregel moet altijd door een recruiter tegen het originele CV worden gecontroleerd.",
  },
  {
    question: "Is een sterke bronmatch hetzelfde als bewijs dat de kandidaat geschikt is?",
    answer: "Nee. Een bronmatch laat alleen zien dat de tekst in het CV aansluit op de woorden of betekenis van een eis. De recruiter moet niveau, scope, actualiteit, context en waarheid nog controleren. De checker maakt geen aanname- of afwijzingsbeslissing.",
  },
  {
    question: "Waarom blijft beschikbaarheid leeg als die niet in het CV staat?",
    answer: "Beschikbaarheid, uren, opzegtermijn, tarief en actuele voorkeuren veranderen en horen uit een bevestigde intake te komen. Een oud CV is hiervoor geen betrouwbare bron. Ontbrekende informatie blijft daarom een open punt.",
  },
  {
    question: "Kan ik een echt kandidaat-CV uploaden?",
    answer: "Alleen wanneer je bureau bevoegd is om het CV voor deze verwerking te gebruiken. Gebruik voor een eerste test de fictieve HR-case. Informeer kandidaten, leg je grondslag en verwerkersafspraken vast en controleer je eigen retentiebeleid.",
  },
  {
    question: "Wat is het verschil met een ATS of een CV-opmaaktool?",
    answer: "Een ATS beheert kandidaten en vacatures. Een CV-opmaaktool maakt een document. Deze checker is een eerste bewijscontrole voor één kandidaat en één vacature. MatchPack voegt daar de gecontroleerde klantintroductie, review, versiegeschiedenis en export aan toe.",
  },
  {
    question: "Kan ik de uitslag direct naar een klant sturen?",
    answer: "Nee. De uitslag is een interne eerste controle. Controleer de originele bron, corrigeer de analyse en bevestig actuele kandidaatdata voordat je een klantvoorstel maakt. Gebruik daarvoor de recruiter-review in MatchPack.",
  },
];

const englishFaqs = [
  {
    question: "What does the Candidate Proposal Evidence Checker check?",
    answer: "It extracts a first set of concrete requirements from the vacancy, locates possible source lines in the CV and shows a provisional status for each requirement. A recruiter must verify every source line against the original CV.",
  },
  {
    question: "Is a strong source match proof that the candidate is suitable?",
    answer: "No. A source match only shows that CV text overlaps with a requirement. The recruiter still needs to check level, scope, date, context and truth. The checker does not make a hiring or rejection decision.",
  },
  {
    question: "Why does availability stay blank when it is not in the CV?",
    answer: "Availability, hours, notice period, rate and current preferences should come from confirmed intake information. An old CV is not a reliable source for current facts, so missing information remains an open point.",
  },
  {
    question: "Can I upload a real candidate CV?",
    answer: "Only when your agency is authorised to use it for this processing. Use the fictional HR case for a first test. Inform candidates, document your legal basis and processor arrangements, and follow your own retention policy.",
  },
  {
    question: "How is this different from an ATS or a CV formatting tool?",
    answer: "An ATS manages candidates and vacancies. A formatting tool creates a document. This checker is a first evidence review for one candidate and one vacancy. MatchPack adds the controlled client introduction, reviewer status, version history and export workflow.",
  },
  {
    question: "Can I send the result directly to a client?",
    answer: "No. The result is an internal first check. Verify the original source, correct the analysis and confirm current candidate information before preparing a client submission. Use the recruiter review in MatchPack for that workflow.",
  },
];

export default function CandidateProposalEvidenceGuide({ locale }: CandidateProposalEvidenceGuideProps) {
  const isEnglish = locale === "en";
  const faqs = isEnglish ? englishFaqs : dutchFaqs;

  return (
    <>
      <section className="wk-container py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
          <div>
            <p className="wk-eyebrow">{isEnglish ? "How to read the result" : "Zo lees je de uitslag"}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{isEnglish ? "A source line is a starting point, not a guarantee." : "Een bronregel is een startpunt, geen garantie."}</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{isEnglish ? "The tool is intentionally conservative. It separates what the vacancy asks for, what the CV appears to say and what a recruiter still needs to verify. That makes the output useful for review without pretending that a text model can certify a candidate." : "De tool is bewust terughoudend. Hij scheidt wat de vacature vraagt, wat het CV lijkt te zeggen en wat een recruiter nog moet controleren. Zo is de uitslag bruikbaar voor review zonder te doen alsof een tekstmodel een kandidaat kan certificeren."}</p>
          </div>
          <div className="overflow-x-auto rounded-[var(--wk-radius-lg)] border border-[var(--wk-border)] bg-white shadow-[var(--wk-shadow-sm)]">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead className="bg-[var(--wk-surface-subtle)]"><tr><th className="p-4">{isEnglish ? "Status" : "Status"}</th><th className="p-4">{isEnglish ? "What the tool found" : "Wat de tool vond"}</th><th className="p-4">{isEnglish ? "Recruiter action" : "Actie voor recruiter"}</th></tr></thead>
              <tbody>
                {(isEnglish ? [
                  ["Strong · review", "A requirement and a likely CV source line align closely.", "Verify level, scope and date; then mark it reviewed."],
                  ["Partial · review", "Some language overlaps, but the source may not cover the full requirement.", "Open the source and ask the missing question."],
                  ["Not demonstrated", "No reliable CV source line was located.", "Leave it open or ask the candidate. Do not invent the claim."],
                ] : [
                  ["Sterk · review", "Een eis en een mogelijke CV-bronregel sluiten nauw aan.", "Controleer niveau, scope en periode en markeer daarna als beoordeeld."],
                  ["Gedeeltelijk · review", "Een deel van de taal sluit aan, maar de bron kan de volledige eis niet dekken.", "Open de bron en stel de ontbrekende vraag."],
                  ["Niet aangetoond", "Er is geen betrouwbare CV-bronregel gevonden.", "Laat het open of vraag het na. Verzin de claim niet."],
                ]).map(([status, found, action]) => <tr key={status} className="border-t border-slate-200 align-top"><th className="p-4 font-black">{status}</th><td className="p-4 leading-relaxed text-slate-600">{found}</td><td className="p-4 leading-relaxed text-slate-600">{action}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--wk-border)] bg-[var(--wk-highlight-soft)]">
        <div className="wk-container py-12 sm:py-16">
          <p className="wk-eyebrow">{isEnglish ? "Method" : "Methode"}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{isEnglish ? "Four checks, with the limits shown." : "Vier controles, met de grenzen erbij."}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {(isEnglish ? [
              ["01", "Extract", "Identify explicit requirements from the vacancy text. The tool does not decide which requirements are legally or commercially decisive."],
              ["02", "Locate", "Find the closest vacancy and CV source lines. The displayed snippet always comes from the supplied text, not from a generated quote."],
              ["03", "Classify", "Separate strong-looking, partial and missing evidence. A partial match remains a question, not a positive claim."],
              ["04", "Review", "The recruiter checks the original CV, current candidate information and the purpose of sharing before any client output."],
            ] : [
              ["01", "Uithalen", "Haal expliciete eisen uit de vacaturetekst. De tool bepaalt niet welke eisen juridisch of commercieel doorslaggevend zijn."],
              ["02", "Lokaliseren", "Zoek de dichtstbijzijnde vacature- en CV-bronregels. Het getoonde fragment komt altijd uit de ingevoerde tekst, niet uit een gegenereerde quote."],
              ["03", "Indelen", "Scheid voorlopig sterk, gedeeltelijk en ontbrekend bewijs. Een gedeeltelijke match blijft een vraag, geen positieve claim."],
              ["04", "Reviewen", "De recruiter controleert het originele CV, actuele kandidaatdata en het doel van delen vóór er klantoutput wordt gemaakt."],
            ]).map(([number, title, body]) => <article key={number} className="wk-card"><span className="font-mono text-sm font-semibold text-[var(--wk-accent-strong)]">{number}</span><h3 className="mt-3 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="wk-container py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="wk-card wk-card-danger"><p className="wk-eyebrow text-[var(--wk-danger)]">{isEnglish ? "Do not use it for" : "Niet gebruiken voor"}</p><h2 className="mt-4 text-2xl font-semibold">{isEnglish ? "Automated hiring decisions" : "Automatische aannamebeslissingen"}</h2><ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-rose-950">{(isEnglish ? ["Ranking or rejecting candidates without human review", "Inferring protected characteristics or personal traits", "Turning a keyword into a claim of competence", "Replacing candidate consent, intake or reference checks"] : ["Kandidaten rangschikken of afwijzen zonder menselijke review", "Beschermde kenmerken of persoonlijke eigenschappen afleiden", "Een zoekwoord omzetten in een competentieclaim", "Toestemming, intake of referentiecontrole vervangen"]).map((item) => <li key={item} className="flex gap-3"><span className="font-semibold">—</span><span>{item}</span></li>)}</ul></article>
          <article className="wk-card wk-card-success"><p className="wk-eyebrow text-[var(--wk-success)]">{isEnglish ? "Use it for" : "Wel gebruiken voor"}</p><h2 className="mt-4 text-2xl font-semibold">{isEnglish ? "A consistent pre-send review" : "Een consistente controle vóór verzending"}</h2><ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-emerald-950">{(isEnglish ? ["Finding which requirements still need a candidate question", "Giving a reviewer a source line to verify", "Keeping evidence and open points separate", "Deciding whether a full MatchPack review is worthwhile"] : ["Zien welke eisen nog een vraag aan de kandidaat nodig hebben", "Een reviewer een bronregel geven om te controleren", "Bewijs en open punten uit elkaar houden", "Bepalen of een volledige MatchPack-review zinvol is"]).map((item) => <li key={item} className="flex gap-3"><span className="font-semibold">✓</span><span>{item}</span></li>)}</ul></article>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-primary)] text-white">
        <div className="wk-container">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">{isEnglish ? "Trust and data" : "Vertrouwen en data"}</p><h2 className="mt-3 text-3xl font-black tracking-tight">{isEnglish ? "A useful result must also be safe to use." : "Een bruikbare uitslag moet ook verantwoord te gebruiken zijn."}</h2><p className="mt-4 text-sm leading-relaxed text-slate-300">{isEnglish ? "Use fictional or authorised candidate data. Explain how an AI-assisted tool is used, keep a human in the loop and document the limits of the output. For real MatchPack processing, ask for the current DPA and subprocessor information before deployment." : "Gebruik fictieve of correct geautoriseerde kandidaatdata. Leg uit hoe een AI-ondersteunde tool wordt gebruikt, houd een mens in de controle en documenteer de grenzen van de uitslag. Vraag vóór gebruik met echte MatchPack-data de actuele DPA- en subverwerkersinformatie op."}</p><Link href={isEnglish ? "/en/agency/privacy#subprocessors" : "/agency/privacy#subprocessors"} className="mt-5 inline-block text-sm font-black text-yellow-300 underline decoration-2 underline-offset-4">{isEnglish ? "Read WerkCV privacy and processor information →" : "Lees WerkCV privacy- en verwerkersinformatie →"}</Link></div>
            <div className="rounded-[var(--wk-radius-md)] border border-white/20 bg-white/10 p-5"><p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--wk-accent)]">{isEnglish ? "External guidance" : "Externe bronnen"}</p><div className="mt-4 space-y-4 text-sm leading-relaxed text-white/75"><a href="https://www.gov.uk/government/publications/responsible-ai-in-recruitment-guide/responsible-ai-in-recruitment" target="_blank" rel="noreferrer" className="block underline decoration-white/40 underline-offset-4 hover:text-white">{isEnglish ? "UK Government: Responsible AI in Recruitment" : "UK Government: Responsible AI in Recruitment (Engels)"}</a><a href="https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2024/11/thinking-of-using-ai-to-assist-recruitment-our-key-data-protection-considerations" target="_blank" rel="noreferrer" className="block underline decoration-white/40 underline-offset-4 hover:text-white">{isEnglish ? "ICO: data protection considerations for AI-assisted recruitment" : "ICO: aandachtspunten voor AI bij recruitment"}</a><a href="https://www.nvp-hrnetwerk.nl/l/library/download/urn%3Auuid%3Ac902b6f9-dcac-4c26-9a13-8b90f4d2fe5f/mos25068%2Bbrochure%2Bsollicitatiecode%2Bonline.pdf" target="_blank" rel="noreferrer" className="block underline decoration-white/40 underline-offset-4 hover:text-white">{isEnglish ? "NVP Application Code 2025" : "NVP Sollicitatiecode 2025"}</a></div><Link href={isEnglish ? "/en/agency" : "/agency"} className="mt-6 inline-block text-sm font-extrabold text-[var(--wk-highlight)] underline underline-offset-4">{isEnglish ? "See the controlled MatchPack workflow →" : "Bekijk de gecontroleerde MatchPack-workflow →"}</Link></div>
          </div>
        </div>
      </section>

      <section className="wk-container py-12 sm:py-16"><p className="wk-eyebrow">FAQ</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">{isEnglish ? "Questions agencies should answer before sharing a candidate." : "Vragen die bureaus vóór het delen van een kandidaat moeten beantwoorden."}</h2><div className="mt-6 space-y-3">{faqs.map((faq) => <details key={faq.question} className="wk-card p-5"><summary className="cursor-pointer font-semibold">{faq.question}</summary><p className="mt-3 max-w-4xl text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{faq.answer}</p></details>)}</div></section>
      <FAQJsonLd questions={faqs} />
    </>
  );
}
