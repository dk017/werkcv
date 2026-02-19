// Central Registry for Blog / CV Tips Articles
// Imports all articles, provides lookup functions

import { BlogArticle, ArticleCategory } from './types';

// ============================================================================
// ARTICLE IMPORTS
// ============================================================================
import { cvSchrijvenTips } from './articles/cv-schrijven-tips';
import { profieltekstSchrijven } from './articles/profieltekst-schrijven';
import { cvWerkervaringBeschrijven } from './articles/cv-werkervaring-beschrijven';
import { cvVaardighedenKiezen } from './articles/cv-vaardigheden-kiezen';
import { cvZonderWerkervaring } from './articles/cv-zonder-werkervaring';
import { sollicitatiebriefTips } from './articles/sollicitatiebrief-tips';
import { sollicitatiegesprekVoorbereiden } from './articles/sollicitatiegesprek-voorbereiden';
import { linkedinProfielOptimaliseren } from './articles/linkedin-profiel-optimaliseren';
import { cvFouten } from './articles/cv-fouten';
import { atsVriendelijkCv } from './articles/ats-vriendelijk-cv';
import { cvOpleidingVermelden } from './articles/cv-opleiding-vermelden';
import { carriereswitchCv } from './articles/carriereswitch-cv';
import { cvHobbysBelangen } from './articles/cv-hobbys-belangen';
import { cvTemplateKiezen } from './articles/cv-template-kiezen';
import { salarisverwachtingBepalen } from './articles/salarisverwachting-bepalen';
import { freelanceCvMaken } from './articles/freelance-cv-maken';
import { fotoOpJeCv } from './articles/foto-op-je-cv';
import { linkedinNaarCv } from './articles/linkedin-naar-cv';
import { salarisverwachtingCv } from './articles/salarisverwachting-cv';
import { remoteWerkCv } from './articles/remote-werk-cv';
import { sollicitatieBedankbrief } from './articles/sollicitatie-bedankbrief';
import { cvNaLoopbaanonderbreking } from './articles/cv-na-loopbaanonderbreking';
import { cvVoorTechsector } from './articles/cv-voor-techsector';
import { videoCvMaken } from './articles/video-cv-maken';

// ============================================================================
// DATA COLLECTION
// ============================================================================

const allArticles: BlogArticle[] = [
    cvSchrijvenTips,
    profieltekstSchrijven,
    cvWerkervaringBeschrijven,
    cvVaardighedenKiezen,
    cvZonderWerkervaring,
    sollicitatiebriefTips,
    sollicitatiegesprekVoorbereiden,
    linkedinProfielOptimaliseren,
    cvFouten,
    atsVriendelijkCv,
    cvOpleidingVermelden,
    carriereswitchCv,
    cvHobbysBelangen,
    cvTemplateKiezen,
    salarisverwachtingBepalen,
    freelanceCvMaken,
    fotoOpJeCv,
    linkedinNaarCv,
    salarisverwachtingCv,
    remoteWerkCv,
    sollicitatieBedankbrief,
    cvNaLoopbaanonderbreking,
    cvVoorTechsector,
    videoCvMaken,
].sort((a, b) => a.order - b.order);

// ============================================================================
// LOOKUP MAPS (built once at module init)
// ============================================================================

const articleMap = new Map<string, BlogArticle>(
    allArticles.map(a => [a.slug, a])
);

// ============================================================================
// PUBLIC API
// ============================================================================

/** Get all articles sorted by display order */
export function getAllArticles(): BlogArticle[] {
    return allArticles;
}

/** Get featured articles for the hub hero */
export function getFeaturedArticles(): BlogArticle[] {
    return allArticles.filter(a => a.featured);
}

/** Get articles by category */
export function getArticlesByCategory(category: ArticleCategory): BlogArticle[] {
    return allArticles.filter(a => a.category === category);
}

/** Get an article by its slug */
export function getArticleBySlug(slug: string): BlogArticle | undefined {
    return articleMap.get(slug);
}

/** Get all article slugs for generateStaticParams */
export function getAllArticleSlugs(): { slug: string }[] {
    return allArticles.map(a => ({ slug: a.slug }));
}

/** Get related articles for internal linking */
export function getRelatedArticles(article: BlogArticle, limit = 3): BlogArticle[] {
    // Try explicit relatedArticleSlugs first
    if (article.relatedArticleSlugs && article.relatedArticleSlugs.length > 0) {
        const related: BlogArticle[] = [];
        for (const slug of article.relatedArticleSlugs.slice(0, limit)) {
            const resolved = articleMap.get(slug);
            if (resolved) related.push(resolved);
        }
        if (related.length > 0) return related;
    }

    // Fallback: other articles in the same category
    return allArticles
        .filter(a => a.category === article.category && a.slug !== article.slug)
        .slice(0, limit);
}
