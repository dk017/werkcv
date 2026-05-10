import { buildEnglishMetadata } from "../metadata";
import EnglishCvSupportPage from "../components/EnglishCvSupportPage";

export const metadata = buildEnglishMetadata({
  title: "CV Format Netherlands in English",
  description:
    "Use the right CV format for English applications in the Netherlands: section order, profile summary, work history, language levels, and ATS-safe layout.",
  path: "/en/cv-format-netherlands-english",
  nlPath: "/cv-maken-in-engels",
  keywords: [
    "cv format netherlands english",
    "netherlands cv format english",
    "dutch cv format in english",
    "english cv format netherlands",
    "cv layout netherlands english",
  ],
});

export default function CvFormatNetherlandsEnglishPage() {
  return (
    <EnglishCvSupportPage
      badge="CV format"
      title="CV Format Netherlands in English"
      intro="Use this page when you are applying in English, but still need your CV to match how recruiters in the Netherlands scan structure, role fit, language level, and evidence."
      cards={[
        {
          title: "Local order",
          body: "Start with a direct title and short profile, then show recent work experience before older education or extra details.",
        },
        {
          title: "A4 and ATS-safe",
          body: "Use a clean PDF layout with readable headings, normal text, and simple section labels that parsing systems can understand.",
        },
        {
          title: "English content, Dutch logic",
          body: "Keep the writing in English, but make availability, language level, location, and role match clear for Dutch employers.",
        },
      ]}
      sections={[
        {
          title: "Recommended section order",
          body: "For most English CVs in the Netherlands, the safest order is header, target role, short profile, work experience, education, skills, languages, and optional certificates.",
          bullets: [
            "Header: name, city, phone, email, LinkedIn.",
            "Target role: one clear role title, not three unrelated options.",
            "Profile: 3-4 lines with role fit, sector, tools, and location context.",
            "Experience: latest role first, with proof bullets instead of task lists.",
            "Languages: separate Dutch and English levels clearly.",
          ],
        },
        {
          title: "What to avoid",
          body: "The biggest mistake is using a US-style or UK-style resume without adapting it to Dutch-market expectations. That often creates too much summary text, vague achievements, or unclear language fit.",
          bullets: [
            "Do not hide your location or work authorization context if it matters.",
            "Do not use a decorative layout that makes the PDF hard to parse.",
            "Do not translate Dutch job titles literally if the vacancy uses a different English title.",
          ],
        },
      ]}
      checklist={[
        "The first half page shows role, location, language level, and strongest evidence.",
        "Every bullet explains task plus context, tool, result, or volume.",
        "Dutch and English language levels are explicit.",
        "The template routes to /en/templates and then /en/editor.",
      ]}
      faq={[
        {
          title: "Can I use a resume format in the Netherlands?",
          body: "You can, but it should still read like a Dutch-market CV: clear structure, practical role evidence, and a clean A4 PDF.",
        },
        {
          title: "Should my CV be one page?",
          body: "One page is fine for starters. Experienced candidates can use two pages if the content is relevant and easy to scan.",
        },
      ]}
    />
  );
}
