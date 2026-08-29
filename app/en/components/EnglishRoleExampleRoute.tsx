import { EnglishRoleCvExamplePage, type EnglishRoleCvExamplePageProps } from "./EnglishRoleCvExamplePage";
import {
  ENGLISH_ROLE_EXAMPLE_CLUSTER_SLUGS,
  normalizeEnglishRoleExampleSlug,
} from "@/lib/english-role-examples";

type Props = EnglishRoleCvExamplePageProps & {
  articleDescription: string;
};

export default function EnglishRoleExampleRoute(props: Props) {
  const canonicalRoleSlug = normalizeEnglishRoleExampleSlug(props.roleSlug);
  if (canonicalRoleSlug && ENGLISH_ROLE_EXAMPLE_CLUSTER_SLUGS.some((roleSlug) => roleSlug === canonicalRoleSlug)) {
    const hasRequiredContent =
      props.scanChecks.length > 0 &&
      (props.evidenceExamples?.length || 0) > 0 &&
      props.mistakes.length > 0 &&
      props.faqs.length >= 4 &&
      props.sources.length > 0 &&
      props.sources.every((source) => Boolean(source.reviewedOn)) &&
      Boolean(props.audience) &&
      Boolean(props.previewAlt) &&
      Boolean(props.lastReviewed) &&
      (props.relatedLinks?.length || 0) >= 2;
    if (!hasRequiredContent) {
      throw new Error(`Incomplete English role-example content contract: ${canonicalRoleSlug}`);
    }
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: props.h1,
    description: props.articleDescription,
    inLanguage: "en-NL",
    mainEntityOfPage: `https://werkcv.nl${props.pagePath}`,
    datePublished: props.datePublished || "2026-08-29",
    dateModified: props.lastReviewed || "2026-08-29",
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
