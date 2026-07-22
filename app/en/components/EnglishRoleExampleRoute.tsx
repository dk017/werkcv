import { EnglishRoleCvExamplePage, type EnglishRoleCvExamplePageProps } from "./EnglishRoleCvExamplePage";

type Props = EnglishRoleCvExamplePageProps & {
  articleDescription: string;
};

export default function EnglishRoleExampleRoute(props: Props) {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: props.h1,
    description: props.articleDescription,
    inLanguage: "en-NL",
    mainEntityOfPage: `https://werkcv.nl${props.pagePath}`,
    datePublished: "2026-07-11",
    dateModified: "2026-07-11",
    author: { "@id": "https://werkcv.nl/#organization" },
    publisher: { "@id": "https://werkcv.nl/#organization" },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-NL",
    mainEntity: props.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <EnglishRoleCvExamplePage {...props} />
    </>
  );
}
