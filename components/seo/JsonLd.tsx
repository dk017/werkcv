import { CVCategory } from '@/lib/categories';

const ORGANIZATION_ID = 'https://werkcv.nl/#organization';
const WEBSITE_ID = 'https://werkcv.nl/#website';
const CONTACT_EMAIL = 'contact@werkcv.nl';
const X_PROFILE_URL = 'https://x.com/dk_r017';

interface ArticleJsonLdProps {
    category: CVCategory;
    url: string;
}

export function ArticleJsonLd({ category, url }: ArticleJsonLdProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: category.heroTitle || `CV Voorbeeld ${category.nameDutch}`,
        description: category.metaDesc,
        author: {
            '@type': 'Organization',
            name: 'WerkCV.nl',
            url: 'https://werkcv.nl',
        },
        publisher: {
            '@type': 'Organization',
            name: 'WerkCV.nl',
            logo: {
                '@type': 'ImageObject',
                url: 'https://werkcv.nl/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
        keywords: category.keywords.join(', '),
        inLanguage: 'nl-NL',
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

interface FAQJsonLdProps {
    questions: Array<{ question: string; answer: string }>;
}

export function FAQJsonLd({ questions }: FAQJsonLdProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions.map((q) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

interface HowToJsonLdProps {
    name: string;
    description: string;
    steps: Array<{ name: string; text: string }>;
}

export function HowToJsonLd({ name, description, steps }: HowToJsonLdProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name,
        description,
        step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.name,
            text: step.text,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

export function OrganizationJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: 'WerkCV',
        alternateName: 'WerkCV.nl',
        url: 'https://werkcv.nl',
        logo: 'https://werkcv.nl/logo.png',
        email: CONTACT_EMAIL,
        description: 'Professionele CV builder voor de Nederlandse arbeidsmarkt',
        sameAs: [X_PROFILE_URL],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: CONTACT_EMAIL,
            url: 'https://werkcv.nl/contact',
            availableLanguage: ['Dutch', 'English'],
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

export function WebsiteJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: 'WerkCV',
        alternateName: 'WerkCV.nl',
        url: 'https://werkcv.nl',
        description: 'Maak binnen 5 minuten een professioneel CV',
        inLanguage: 'nl-NL',
        publisher: {
            '@id': ORGANIZATION_ID,
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://werkcv.nl/cv-voorbeelden?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

export function SharedSiteJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': ORGANIZATION_ID,
                name: 'WerkCV',
                alternateName: 'WerkCV.nl',
                url: 'https://werkcv.nl',
                logo: 'https://werkcv.nl/logo.png',
                email: CONTACT_EMAIL,
                sameAs: [X_PROFILE_URL],
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'customer service',
                    email: CONTACT_EMAIL,
                    url: 'https://werkcv.nl/contact',
                    availableLanguage: ['Dutch', 'English'],
                },
            },
            {
                '@type': 'WebSite',
                '@id': WEBSITE_ID,
                url: 'https://werkcv.nl',
                name: 'WerkCV',
                alternateName: 'WerkCV.nl',
                inLanguage: 'nl-NL',
                publisher: {
                    '@id': ORGANIZATION_ID,
                },
                potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: 'https://werkcv.nl/cv-voorbeelden?q={search_term_string}',
                    },
                    'query-input': 'required name=search_term_string',
                },
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
