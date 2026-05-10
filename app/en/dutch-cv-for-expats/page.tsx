import { buildEnglishMetadata } from "../metadata";
import EnglishCvSupportPage from "../components/EnglishCvSupportPage";

export const metadata = buildEnglishMetadata({
  title: "Dutch CV for Expats",
  description:
    "Build a Dutch-style CV in English as an expat applying in the Netherlands. Localize structure, language levels, job titles, and recruiter signals.",
  path: "/en/dutch-cv-for-expats",
  nlPath: "/cv-tips/cv-schrijven-buitenlander-nederland",
  keywords: [
    "dutch cv for expats",
    "expat cv netherlands",
    "cv for expats netherlands",
    "dutch style cv for internationals",
    "english cv netherlands expats",
  ],
});

export default function DutchCvForExpatsPage() {
  return (
    <EnglishCvSupportPage
      badge="Expat CV"
      title="Dutch CV for Expats"
      intro="A good expat CV for the Netherlands does not need to pretend you are Dutch. It needs to make your background easy for Dutch recruiters to understand quickly."
      primaryCtaLabel="Build an expat CV"
      cards={[
        {
          title: "Translate fit, not identity",
          body: "Keep your international experience, but explain role titles, scope, tools, and results in terms Dutch recruiters can scan.",
        },
        {
          title: "Show language reality",
          body: "Mention Dutch and English levels clearly. Do not hide limited Dutch; position it honestly with the roles you target.",
        },
        {
          title: "Reduce recruiter risk",
          body: "Make location, availability, visa/work route, and Dutch-market relevance easy to find when those details matter.",
        },
      ]}
      sections={[
        {
          title: "What Dutch recruiters need from an expat CV",
          body: "The recruiter is usually trying to answer whether your experience maps to the local role, whether communication will work, and whether there are practical hiring risks.",
          bullets: [
            "Use a recognizable target role instead of a broad international title.",
            "Add tools, systems, industries, and measurable outcomes.",
            "Mention Dutch language level separately from English.",
            "Clarify Netherlands availability or relocation status where relevant.",
          ],
        },
        {
          title: "How to write the profile summary",
          body: "The profile should not be a long personal story. Use it as a compact bridge between your international background and the Dutch vacancy.",
          bullets: [
            "Start with role and years of experience.",
            "Add sector, tools, or strongest business result.",
            "End with Netherlands fit: language, target role, or availability.",
          ],
        },
      ]}
      checklist={[
        "The CV explains international titles in local recruiter language.",
        "Dutch and English levels are visible without exaggeration.",
        "Work authorization or relocation status is clear if relevant.",
        "The CTA keeps the user in /en/templates and /en/editor.",
      ]}
      faq={[
        {
          title: "Should an expat CV be in English or Dutch?",
          body: "Use the language of the vacancy. English is normal for many international roles, but Dutch-speaking roles usually expect Dutch.",
        },
        {
          title: "Should I mention visa status?",
          body: "If it affects hiring, mention it briefly and clearly. Do not make the whole CV about visa details.",
        },
      ]}
    />
  );
}
