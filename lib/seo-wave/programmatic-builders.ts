import { pilotGuideFamilies } from './page-families';
import { getPilotRoleTaxonomy } from './role-taxonomy';
import { RoleGuideFamilyId, RoleGuideFamilySchema, RoleTaxonomy } from './programmatic-types';
import { SeoGuidePage } from './types';

export function buildRoleGuidePage(
    role: RoleTaxonomy,
    family: RoleGuideFamilySchema
): SeoGuidePage {
    return {
        slug: family.slug(role),
        locale: 'nl',
        title: family.title(role),
        description: family.description(role),
        metaTitle: family.metaTitle(role),
        metaDesc: family.metaDesc(role),
        keywords: family.keywords(role),
        intro: family.intro(role),
        sections: family.sections(role),
        checklist: family.checklist(role),
        faq: family.faq(role),
        relatedLinks: family.relatedLinks(role),
        ctaTitle: family.ctaTitle(role),
        ctaText: family.ctaText(role),
        ctaHref: family.ctaHref,
    };
}

const pilotRoleGuidePages = getPilotRoleTaxonomy().flatMap((role) =>
    pilotGuideFamilies.map((family) => buildRoleGuidePage(role, family))
);

const pilotRoleGuideMap = new Map(pilotRoleGuidePages.map((page) => [page.slug, page]));

export function getPilotRoleGuidePages(): SeoGuidePage[] {
    return pilotRoleGuidePages;
}

export function getPilotRoleGuidePage(slug: string): SeoGuidePage | undefined {
    return pilotRoleGuideMap.get(slug);
}

export function getPilotGuideFamilies(): RoleGuideFamilySchema[] {
    return pilotGuideFamilies;
}

export function getPilotGuideFamily(id: RoleGuideFamilyId): RoleGuideFamilySchema | undefined {
    return pilotGuideFamilies.find((family) => family.id === id);
}

export { getPilotRoleTaxonomy };
