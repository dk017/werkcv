import {
  getDutchWavePages,
  getPilotGuideFamilies,
  getPilotRoleGuidePages,
  getPilotRoleTaxonomy,
} from "../lib/seo-wave/data";
import { SeoGuidePage, SeoSection } from "../lib/seo-wave/types";

type Severity = "error" | "warning";

type Finding = {
  severity: Severity;
  scope: string;
  message: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function collectDuplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
      continue;
    }

    seen.add(value);
  }

  return [...duplicates].sort((a, b) => a.localeCompare(b));
}

function validateSection(
  page: SeoGuidePage,
  section: SeoSection,
  sectionIndex: number
): Finding[] {
  const findings: Finding[] = [];
  const scope = `${page.slug}#section-${sectionIndex + 1}`;

  if (!isNonEmptyString(section.id)) {
    findings.push({ severity: "error", scope, message: "missing section id" });
  }

  if (!isNonEmptyString(section.title)) {
    findings.push({ severity: "error", scope, message: "missing section title" });
  }

  if (!Array.isArray(section.paragraphs) || section.paragraphs.length === 0) {
    findings.push({ severity: "error", scope, message: "section has no paragraphs" });
  } else if (section.paragraphs.some((paragraph) => !isNonEmptyString(paragraph))) {
    findings.push({
      severity: "error",
      scope,
      message: "section contains an empty paragraph",
    });
  }

  if (section.bullets && section.bullets.some((bullet) => !isNonEmptyString(bullet))) {
    findings.push({
      severity: "error",
      scope,
      message: "section contains an empty bullet",
    });
  }

  if (section.exampleTitle && (!section.exampleItems || section.exampleItems.length === 0)) {
    findings.push({
      severity: "error",
      scope,
      message: "example title exists without example items",
    });
  }

  if (
    section.exampleItems &&
    section.exampleItems.some((exampleItem) => !isNonEmptyString(exampleItem))
  ) {
    findings.push({
      severity: "error",
      scope,
      message: "section contains an empty example item",
    });
  }

  return findings;
}

function validatePage(page: SeoGuidePage): Finding[] {
  const findings: Finding[] = [];
  const requiredFields: Array<[keyof SeoGuidePage, unknown]> = [
    ["slug", page.slug],
    ["title", page.title],
    ["description", page.description],
    ["metaTitle", page.metaTitle],
    ["metaDesc", page.metaDesc],
    ["intro", page.intro],
    ["ctaTitle", page.ctaTitle],
    ["ctaText", page.ctaText],
    ["ctaHref", page.ctaHref],
  ];

  for (const [field, value] of requiredFields) {
    if (!isNonEmptyString(value)) {
      findings.push({
        severity: "error",
        scope: page.slug,
        message: `missing ${field}`,
      });
    }
  }

  if (page.locale !== "nl") {
    findings.push({
      severity: "error",
      scope: page.slug,
      message: `expected locale \"nl\", received \"${page.locale}\"`,
    });
  }

  if (!Array.isArray(page.keywords) || page.keywords.length < 3) {
    findings.push({
      severity: "error",
      scope: page.slug,
      message: "keywords must contain at least 3 items",
    });
  } else if (page.keywords.some((keyword) => !isNonEmptyString(keyword))) {
    findings.push({
      severity: "error",
      scope: page.slug,
      message: "keywords contain an empty value",
    });
  }

  if (!Array.isArray(page.sections) || page.sections.length === 0) {
    findings.push({
      severity: "error",
      scope: page.slug,
      message: "page has no sections",
    });
  } else {
    page.sections.forEach((section, index) => {
      findings.push(...validateSection(page, section, index));
    });
  }

  if (!Array.isArray(page.checklist) || page.checklist.length < 3) {
    findings.push({
      severity: "error",
      scope: page.slug,
      message: "checklist must contain at least 3 items",
    });
  } else if (page.checklist.some((item) => !isNonEmptyString(item))) {
    findings.push({
      severity: "error",
      scope: page.slug,
      message: "checklist contains an empty value",
    });
  }

  if (!Array.isArray(page.faq) || page.faq.length < 2) {
    findings.push({
      severity: "error",
      scope: page.slug,
      message: "faq must contain at least 2 entries",
    });
  } else {
    page.faq.forEach((entry, index) => {
      if (!isNonEmptyString(entry.question)) {
        findings.push({
          severity: "error",
          scope: `${page.slug}#faq-${index + 1}`,
          message: "missing faq question",
        });
      }

      if (!isNonEmptyString(entry.answer)) {
        findings.push({
          severity: "error",
          scope: `${page.slug}#faq-${index + 1}`,
          message: "missing faq answer",
        });
      }
    });
  }

  if (!Array.isArray(page.relatedLinks) || page.relatedLinks.length === 0) {
    findings.push({
      severity: "error",
      scope: page.slug,
      message: "page has no related links",
    });
  } else {
    page.relatedLinks.forEach((link, index) => {
      if (!isNonEmptyString(link.href)) {
        findings.push({
          severity: "error",
          scope: `${page.slug}#related-${index + 1}`,
          message: "missing related link href",
        });
      }

      if (!isNonEmptyString(link.title)) {
        findings.push({
          severity: "error",
          scope: `${page.slug}#related-${index + 1}`,
          message: "missing related link title",
        });
      }

      if (!isNonEmptyString(link.description)) {
        findings.push({
          severity: "error",
          scope: `${page.slug}#related-${index + 1}`,
          message: "missing related link description",
        });
      }
    });
  }

  if (page.metaTitle.length > 65) {
    findings.push({
      severity: "warning",
      scope: page.slug,
      message: `metaTitle is ${page.metaTitle.length} chars`,
    });
  }

  if (page.metaDesc.length > 160) {
    findings.push({
      severity: "warning",
      scope: page.slug,
      message: `metaDesc is ${page.metaDesc.length} chars`,
    });
  }

  return findings;
}

function main() {
  const roles = getPilotRoleTaxonomy();
  const families = getPilotGuideFamilies();
  const pilotPages = getPilotRoleGuidePages();
  const mergedDutchPages = getDutchWavePages();
  const mergedDutchMap = new Map(mergedDutchPages.map((page) => [page.slug, page]));

  const findings: Finding[] = [];
  const expectedPageCount = roles.length * families.length;
  const slugDuplicates = collectDuplicates(pilotPages.map((page) => page.slug));
  const titleDuplicates = collectDuplicates(pilotPages.map((page) => page.title));

  slugDuplicates.forEach((slug) => {
    findings.push({
      severity: "error",
      scope: "pilot-pages",
      message: `duplicate slug: ${slug}`,
    });
  });

  titleDuplicates.forEach((title) => {
    findings.push({
      severity: "warning",
      scope: "pilot-pages",
      message: `duplicate title: ${title}`,
    });
  });

  if (pilotPages.length !== expectedPageCount) {
    findings.push({
      severity: "error",
      scope: "pilot-pages",
      message: `expected ${expectedPageCount} pages, received ${pilotPages.length}`,
    });
  }

  pilotPages.forEach((page) => {
    findings.push(...validatePage(page));

    const mergedPage = mergedDutchMap.get(page.slug);
    if (!mergedPage) {
      findings.push({
        severity: "error",
        scope: page.slug,
        message: "pilot page missing from merged Dutch registry",
      });
      return;
    }

    if (mergedPage.title !== page.title) {
      findings.push({
        severity: "error",
        scope: page.slug,
        message: "merged registry title differs from generated pilot page",
      });
    }

    if (mergedPage.metaTitle !== page.metaTitle) {
      findings.push({
        severity: "error",
        scope: page.slug,
        message: "merged registry metaTitle differs from generated pilot page",
      });
    }

    if (mergedPage.metaDesc !== page.metaDesc) {
      findings.push({
        severity: "error",
        scope: page.slug,
        message: "merged registry metaDesc differs from generated pilot page",
      });
    }
  });

  const errors = findings.filter((finding) => finding.severity === "error");
  const warnings = findings.filter((finding) => finding.severity === "warning");

  console.log("SEO wave pilot QA report");
  console.log("");
  console.table([
    {
      pilot_roles: roles.length,
      families: families.length,
      expected_pages: expectedPageCount,
      actual_pages: pilotPages.length,
      merged_dutch_pages: mergedDutchPages.length,
      errors: errors.length,
      warnings: warnings.length,
    },
  ]);

  console.table(
    families.map((family) => ({
      family: family.id,
      pages: pilotPages.filter((page) => page.slug.startsWith(`${family.id}-cv-`)).length,
    }))
  );

  console.table(
    roles.map((role) => ({
      role: role.roleName,
      slug: role.slug,
      pages: pilotPages.filter((page) => page.slug.endsWith(role.slug)).length,
    }))
  );

  console.log("Pilot page inventory");
  console.table(
    pilotPages.map((page) => ({
      slug: page.slug,
      title: page.title,
      metaTitle: page.metaTitle,
      ctaHref: page.ctaHref,
    }))
  );

  if (warnings.length > 0) {
    console.log("Warnings");
    warnings.forEach((finding) => {
      console.log(`- [${finding.scope}] ${finding.message}`);
    });
  }

  if (errors.length > 0) {
    console.log("Errors");
    errors.forEach((finding) => {
      console.log(`- [${finding.scope}] ${finding.message}`);
    });
    process.exitCode = 1;
    return;
  }

  console.log("No structural errors found.");
}

main();
