import Link from "next/link";
import CvCheckTool from "@/components/cv-check/CvCheckTool";
import CopyPromptButton from "@/components/seo/CopyPromptButton";
import LetterLeftoverCheck from "@/components/seo/LetterLeftoverCheck";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { CHATGPT_GUIDE_SOURCES, type ChatGptGuideContent } from "@/lib/chatgpt-guide/content";

function SourceLink({ source, locale }: { source: keyof typeof CHATGPT_GUIDE_SOURCES; locale: "nl" | "en" }) {
  const { href } = CHATGPT_GUIDE_SOURCES[source];
  return (
    <a href={href} className="underline underline-offset-4" rel="noopener" target="_blank">
      {CHATGPT_GUIDE_SOURCES[source][locale]}
    </a>
  );
}

export default function ChatGptCvGuide({ content }: { content: ChatGptGuideContent }) {
  const { locale } = content;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.h1,
    inLanguage: locale === "en" ? "en" : "nl-NL",
    datePublished: content.updated.iso,
    dateModified: content.updated.iso,
    author: { "@type": "Organization", name: "WerkCV", url: "https://werkcv.nl" },
    publisher: { "@type": "Organization", name: "WerkCV", url: "https://werkcv.nl" },
    mainEntityOfPage: `https://werkcv.nl${content.path}`,
    citation: [CHATGPT_GUIDE_SOURCES.tilburg.href, CHATGPT_GUIDE_SOURCES.openai.href],
  };

  return (
    <main>
      <JsonLd data={articleJsonLd} />
      <FAQJsonLd questions={content.faq} />

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <Breadcrumbs items={content.breadcrumbs} />
          <p className="wk-eyebrow mt-4">{content.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-[var(--wk-ink)] sm:text-4xl md:text-5xl">{content.h1}</h1>
          <p className="mt-4 text-base leading-7 text-[var(--wk-ink-muted)] sm:text-lg sm:leading-8">{content.intro}</p>
          <p className="mt-2 text-sm text-[var(--wk-ink-muted)]">
            {content.byline} ·{" "}
            <time dateTime={content.updated.iso}>
              {content.updatedLabel}: {content.updated.display}
            </time>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#prompts" className="wk-button wk-button-primary">
              {content.ctaPrompts}
            </a>
            <a href="#check" className="wk-button wk-button-secondary">
              {content.ctaCheck}
            </a>
          </div>

          <div className="wk-card mt-8 p-5">
            <h2 className="font-semibold text-[var(--wk-ink)]">{content.summaryTitle}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[var(--wk-ink-muted)]">
              {content.summary.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{content.employersTitle}</h2>
          {content.employers.map((paragraph) => (
            <p key={paragraph} className="mt-4 leading-7 text-[var(--wk-ink-muted)]">
              {paragraph}
            </p>
          ))}
          <p className="mt-4 leading-7 text-[var(--wk-ink-muted)]">{content.concernsIntro}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-7 text-[var(--wk-ink-muted)]">
            {content.concerns.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[var(--wk-ink-muted)]">
            {content.sourceLabel}: <SourceLink source="tilburg" locale={locale} />.
          </p>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{content.testTitle}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--wk-ink-muted)]">{content.testMethod}</p>
          <div className="wk-table-scroll-hint mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--wk-border)]">
                  {content.testColumns.map((column) => (
                    <th key={column} className="py-2 pr-4">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.testRows.map((row) => (
                  <tr key={row.finding} className="border-b border-[var(--wk-border)] align-top">
                    <td className="py-2 pr-4">{row.finding}</td>
                    {row.values.map((value, index) => (
                      <td key={index} className="py-2 pr-4 font-semibold">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 max-w-3xl space-y-3 leading-7 text-[var(--wk-ink-muted)]">
            {content.testNotes.map((note) => (
              <p key={note.lead}>
                <strong className="text-[var(--wk-ink)]">{note.lead}</strong> {note.text}
              </p>
            ))}
            <p className="text-sm">{content.testLimits}</p>
          </div>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{content.stepsTitle}</h2>
          <ol className="mt-6 space-y-5">
            {content.steps.map((step, index) => (
              <li key={step.title} className="wk-card p-5">
                <h3 className="font-semibold text-[var(--wk-ink)]">
                  {content.stepLabel} {index + 1}. {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{step.body}</p>
                {step.source && (
                  <p className="mt-2 text-xs text-[var(--wk-ink-muted)]">
                    {content.sourceLabel}: <SourceLink source={step.source} locale={locale} />
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="prompts" className="wk-section scroll-mt-24">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{content.promptsTitle}</h2>
          <p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">{content.promptsIntro}</p>
          <div className="mt-6 space-y-5">
            {content.prompts.map((prompt) => (
              <article key={prompt.id} className="wk-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-[var(--wk-ink)]">{prompt.title}</h3>
                    <p className="mt-1 text-sm text-[var(--wk-ink-muted)]">{prompt.when}</p>
                  </div>
                  <CopyPromptButton text={prompt.text} promptId={prompt.id} labels={content.copyLabels} />
                </div>
                <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-[var(--wk-surface)] p-4 text-sm leading-6 text-[var(--wk-ink)]">
                  {prompt.text}
                </pre>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="check" className="wk-section scroll-mt-24 bg-[var(--wk-surface)]">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{content.checkTitle}</h2>
          <p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">{content.checkIntro}</p>
          <div className="mt-6">
            {content.checkKind === "letter" ? (
              <LetterLeftoverCheck />
            ) : (
              <CvCheckTool
                locale={locale}
                initialInputMode="text"
                entry="chatgpt_guide"
                methodologyHref={content.methodologyHref}
                editorHref={content.editorHref}
              />
            )}
          </div>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{content.checklistTitle}</h2>
          <ul className="mt-4 space-y-2">
            {content.checklist.map((item) => (
              <li key={item} className="flex gap-3 leading-7 text-[var(--wk-ink-muted)]">
                <span aria-hidden="true" className="font-semibold text-[var(--wk-ink)]">
                  ☐
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedLandingLink
              href={content.editorHref}
              trackingLocation={`chatgpt_guide:${content.path}:checklist`}
              trackingLabel="open_editor"
              className="wk-button wk-button-primary"
            >
              {content.editorCta}
            </TrackedLandingLink>
            <Link href={content.templatesHref} className="wk-button wk-button-secondary">
              {content.templatesCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{content.faqTitle}</h2>
          <div className="mt-6 space-y-3">
            {content.faq.map((item) => (
              <details key={item.question} className="wk-card p-4">
                <summary className="cursor-pointer font-semibold text-[var(--wk-ink)]">{item.question}</summary>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{content.relatedTitle}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.related.map((item) => (
              <Link key={item.href} href={item.href} className="wk-card block p-5 transition hover:border-[var(--wk-ink)]">
                <span className="font-semibold text-[var(--wk-ink)]">{item.label}</span>
                <span className="mt-2 block text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
