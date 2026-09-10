import Link from 'next/link';
import { buildEnglishMetadata } from '../metadata';
import { getEnglishWavePages } from '@/lib/seo-wave/data';
import TrackedLandingLink from '@/components/analytics/TrackedLandingLink';
import Footer from '@/components/Footer';

export const metadata = buildEnglishMetadata({
    title: 'Netherlands CV Guides for Expats',
    description:
        'Focused English guides for expats and international job seekers building Dutch-style CVs.',
    path: '/en/guides',
    keywords: [
        'netherlands cv guide',
        'expat cv netherlands',
        'dutch cv in english',
        'english resume netherlands',
    ],
});

export default function EnglishGuidesHubPage() {
    const pages = getEnglishWavePages();
    const startPaths = [
        {
            href: '/en/guides/cv-builders-netherlands-compared',
            title: 'Comparing CV builders?',
            description: 'Compare free routes, one-time downloads, subscriptions, imports, previews, and PDF output for jobs in the Netherlands.',
        },
        {
            href: '/en/expat-cv-netherlands',
            title: 'Expat and unsure where to start?',
            description: 'Use the main decision page for CV language, work route wording, Dutch level, and personal details.',
        },
        {
            href: '/en/expat-cv-netherlands',
            title: 'Need the big picture first?',
            description: 'Start with the expat overview if you want the Dutch recruiter logic behind English CVs.',
        },
        {
            href: '/en/guides/cv-for-international-students-netherlands',
            title: 'Student or graduate profile?',
            description: 'Use this route for internships, part-time work, projects, and first full-time applications.',
        },
        {
            href: '/en/guides/recent-graduate-cv-netherlands',
            title: 'Recently graduated?',
            description: 'Build a focused CV from projects, thesis work, internships and transferable evidence.',
        },
        {
            href: '/en/guides/startup-vs-corporate-cv-netherlands',
            title: 'Startup or corporate role?',
            description: 'Choose the evidence and language that fit the actual operating context.',
        },
        {
            href: '/en/guides/creative-cv-templates-netherlands',
            title: 'Considering a creative template?',
            description: 'Check portfolio, visual branding and ATS-safe fallbacks before exporting.',
        },
        {
            href: '/en/guides/one-page-cv-netherlands',
            title: 'Unsure about page length?',
            description: 'Use the one-page versus two-page decision guide for Dutch applications.',
        },
        {
            href: '/en/guides/netherlands-cv-keywords-ats',
            title: 'Low interview rate?',
            description: 'Go here if structure is okay but your wording, keywords, or ATS match is weak.',
        },
        {
            href: '/en/guides/netherlands-cover-letter-basics',
            title: 'Need the cover letter too?',
            description: 'Use this when your CV is mostly ready but your application package still feels incomplete.',
        },
    ];
    const expatTools = [
        {
            href: '/en/expat-cv-netherlands',
            title: 'Expat CV Netherlands',
            description: 'One practical decision page for English vs Dutch, visa wording, language levels, and personal details.',
        },
        {
            href: '/en/highly-skilled-migrant-cv-netherlands',
            title: 'Highly Skilled Migrant CV',
            description: 'CV guidance for sponsor-sensitive applications and IND salary-route preparation.',
        },
        {
            href: '/en/english-cv-example-software-engineer-netherlands',
            title: 'Software Engineer CV Example',
            description: 'Practical English CV example for developers targeting Dutch tech roles.',
        },
        {
            href: '/en/cv-netherlands-without-dutch-language',
            title: 'CV Without Dutch',
            description: 'Show language level honestly while targeting English-speaking roles.',
        },
        {
            href: '/en/english-speaking-companies-netherlands',
            title: 'English-Speaking Companies',
            description: 'Move from employer search to a CV and localization plan that fits the Dutch market.',
        },
        {
            href: '/tools/zoekjaar-checker',
            title: 'Zoekjaar Checker',
            description: 'Check whether the Dutch orientation year still fits your timeline.',
        },
        {
            href: '/tools/kennismigrant-salary-checker',
            title: 'Highly Skilled Migrant Salary Checker',
            description: 'Compare your offer against the current IND sponsor thresholds.',
        },
        {
            href: '/tools/eu-blue-card-checker',
            title: 'EU Blue Card Checker',
            description: 'See whether Blue Card or sponsor routes look more realistic for your move.',
        },
        {
            href: '/tools/job-title-translator',
            title: 'Job Title Translator',
            description: 'Localize job titles for Dutch vacancies, CV wording, and LinkedIn search.',
        },
    ];

    return (
        <main>
            <section className="wk-section">
                <div className="wk-container">
                    <span className="wk-badge wk-badge-accent mb-4">Expat guides</span>
                    <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
                        <span className="wk-hero-highlight">English CV Guides</span> for the Netherlands
                    </h1>
                    <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">
                        Use these pages to match Dutch hiring expectations while applying in English.
                        Built for expats, internationals, and global professionals.
                    </p>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container">
                    <div className="wk-card mb-10 p-6 md:p-8">
                        <div className="max-w-3xl">
                            <h2 className="mb-3 text-3xl font-semibold text-[var(--wk-ink)]">
                                Choose the guide that matches your real blocker
                            </h2>
                            <p className="text-base leading-7 text-[var(--wk-ink-muted)] md:text-lg md:leading-8">
                                These pages work best when you enter by problem, not by random topic order.
                                Pick the guide that matches what is actually slowing down your next application.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <TrackedLandingLink
                                    href="/en/editor?template=professional&startSource=en_guides_hub_hero"
                                    trackingLocation="en_guides_hub:hero_primary"
                                    trackingLabel="Build my English CV"
                                    className="wk-button wk-button-primary"
                                >
                                    Build my English CV
                                </TrackedLandingLink>
                                <Link
                                    href="/en/templates?startSource=en_guides_hub_templates"
                                    className="wk-button wk-button-secondary"
                                >
                                    Compare English templates
                                </Link>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                            {startPaths.map((path) => (
                                <Link
                                    key={path.href}
                                    href={path.href}
                                    className="group block rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-5 transition-colors hover:border-[var(--wk-primary)] hover:bg-[var(--wk-accent-soft)]"
                                >
                                    <h3 className="mb-2 text-lg font-semibold text-[var(--wk-ink)] transition-colors group-hover:text-[var(--wk-primary)]">
                                        {path.title}
                                    </h3>
                                    <p className="text-sm leading-6 text-[var(--wk-ink-muted)]">{path.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {pages.map((page) => (
                            <Link
                                key={page.slug}
                                href={`/en/guides/${page.slug}`}
                                className="group block rounded-[var(--wk-radius-lg)] border border-[var(--wk-border)] bg-[var(--wk-surface)] p-5 shadow-[var(--wk-shadow-sm)] transition-colors hover:border-[var(--wk-primary)]"
                            >
                                <h2 className="mb-2 text-xl font-semibold text-[var(--wk-ink)] transition-colors group-hover:text-[var(--wk-primary)]">
                                    {page.title}
                                </h2>
                                <p className="text-sm leading-6 text-[var(--wk-ink-muted)] line-clamp-3">{page.description}</p>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 border-t border-[var(--wk-border)] pt-10">
                        <div className="mb-6 max-w-3xl">
                            <h2 className="mb-3 text-3xl font-semibold text-[var(--wk-ink)]">
                                Practical visa and localization tools
                            </h2>
                            <p className="text-base leading-7 text-[var(--wk-ink-muted)] md:text-lg">
                                Many expat readers need more than CV advice. These routes help with salary
                                thresholds, visa-path comparison, and Dutch-market job-title wording.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
                            {expatTools.map((tool) => (
                                <Link
                                    key={tool.href}
                                    href={tool.href}
                                    className="group block rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-5 transition-colors hover:border-[var(--wk-primary)] hover:bg-[var(--wk-accent-soft)]"
                                >
                                    <h3 className="mb-2 text-lg font-semibold text-[var(--wk-ink)] transition-colors group-hover:text-[var(--wk-primary)]">
                                        {tool.title}
                                    </h3>
                                    <p className="text-sm leading-6 text-[var(--wk-ink-muted)]">{tool.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <Link href="/en/templates" className="wk-button wk-button-secondary">
                            Open English templates
                        </Link>
                        <TrackedLandingLink
                            href="/en/editor?template=professional&startSource=en_guides_hub_bottom"
                            trackingLocation="en_guides_hub:bottom_primary"
                            trackingLabel="Open English editor"
                            className="wk-button wk-button-primary"
                        >
                            Open English editor
                        </TrackedLandingLink>
                        <Link href="/en" className="wk-button wk-button-secondary">
                            Back to English hub
                        </Link>
                    </div>
                </div>
            </section>
            <Footer variant="brand" uiLanguage="en" />
        </main>
    );
}
