import { SeoFaq, SeoGuidePage, SeoRelatedLink, SeoSection } from './types';

export type RoleGuideFamilyId = 'profieltekst' | 'werkervaring' | 'vaardigheden';

export interface RoleTaxonomy {
    slug: string;
    roleName: string;
    sector: string;
    painPoint: string;
    recruiterSignals: string[];
    topSkills: string[];
    atsKeywords: string[];
    hardSkills: string[];
    softSkills: string[];
    profileExamples: string[];
    bulletExamples: string[];
    primaryLanding: SeoRelatedLink;
}

export interface RoleGuideFamilySchema {
    id: RoleGuideFamilyId;
    slug: (role: RoleTaxonomy) => string;
    title: (role: RoleTaxonomy) => string;
    description: (role: RoleTaxonomy) => string;
    metaTitle: (role: RoleTaxonomy) => string;
    metaDesc: (role: RoleTaxonomy) => string;
    keywords: (role: RoleTaxonomy) => string[];
    intro: (role: RoleTaxonomy) => string;
    sections: (role: RoleTaxonomy) => SeoSection[];
    checklist: (role: RoleTaxonomy) => string[];
    faq: (role: RoleTaxonomy) => SeoFaq[];
    relatedLinks: (role: RoleTaxonomy) => SeoRelatedLink[];
    ctaTitle: (role: RoleTaxonomy) => string;
    ctaText: (role: RoleTaxonomy) => string;
    ctaHref: string;
}

export type ProgrammaticSeoGuidePage = SeoGuidePage;
