import { buildEnglishMetadata } from "../metadata";
import EnglishCvSupportPage from "../components/EnglishCvSupportPage";

export const metadata = buildEnglishMetadata({
  title: "English CV Example for the Netherlands",
  description:
    "See how an English CV for jobs in the Netherlands should read: profile summary, proof bullets, language levels, and Dutch-market structure.",
  path: "/en/english-cv-example-netherlands",
  nlPath: "/engels-cv-voorbeeld",
  keywords: [
    "english cv example netherlands",
    "english cv netherlands example",
    "cv example in english netherlands",
    "dutch market english cv example",
    "english resume example netherlands",
  ],
});

export default function EnglishCvExampleNetherlandsPage() {
  return (
    <EnglishCvSupportPage
      badge="CV example"
      title="English CV Example for the Netherlands"
      intro="Use this page when you do not just want rules. You want to see the tone: direct, specific, and written for Dutch-market applications without sounding like a generic resume template."
      primaryCtaLabel="Use an English template"
      cards={[
        {
          title: "Profile tone",
          body: "Short, role-specific, and grounded in evidence. Avoid long personal statements and generic ambition lines.",
        },
        {
          title: "Proof bullets",
          body: "Each bullet should show what you did, where, with which tool or context, and what improved.",
        },
        {
          title: "Local signals",
          body: "Language level, location, availability, and role title should be easy to understand in the first scan.",
        },
      ]}
      sections={[
        {
          title: "Example profile summary",
          body: "Customer support specialist with 4 years of SaaS experience across onboarding, ticket triage, and retention support. Strong in HubSpot, Zendesk, process documentation, and English customer communication. Based in Utrecht and applying for English-speaking customer success roles in the Netherlands.",
          bullets: [
            "The role is clear immediately.",
            "Tools and work context are specific.",
            "Location and English-speaking target are visible without overexplaining.",
          ],
        },
        {
          title: "Example work experience bullets",
          body: "Strong bullets are not longer because they sound more professional. They are stronger because they reduce doubt.",
          bullets: [
            "Handled 45-60 customer tickets per week in Zendesk while keeping first-response SLA above 95%.",
            "Created onboarding email templates that reduced repeated setup questions for new customers.",
            "Worked with sales and product teams to document recurring churn reasons and improve handover notes.",
          ],
        },
      ]}
      checklist={[
        "The example uses a clear target role, not a broad list of possible jobs.",
        "Bullets include volume, tools, result, or collaboration context.",
        "Language level and Netherlands fit are visible.",
        "The next step goes to /en/templates, not a Dutch-only route.",
      ]}
      faq={[
        {
          title: "Can I copy this English CV example exactly?",
          body: "Use the structure and tone, but replace the details with your real role, tools, outcomes, and target vacancy.",
        },
        {
          title: "Is this different from a UK or US resume example?",
          body: "Yes. The page keeps English wording, but the structure is closer to a Dutch-market CV: direct summary, scan-friendly experience, and clear language/location signals.",
        },
      ]}
    />
  );
}
