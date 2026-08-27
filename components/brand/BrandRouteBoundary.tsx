"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NavUserMenu from "@/components/NavUserMenu";
import PublicSiteShell from "@/components/brand/PublicSiteShell";
import { getRouteWorkspaceContext, isEnglishWorkspacePath, normaliseWorkspacePathname } from "@/lib/workspace/route-context";
import type { BrandNavItem } from "@/components/brand/SiteHeader";

function isCandidateProposalChecker(pathname: string): boolean {
  return pathname === "/tools/kandidaatvoorstel-checker" || pathname === "/en/candidate-proposal-checker";
}

function getPublicConfig(pathname: string): {
  locale: "nl" | "en";
  product: "personal" | "matchpack";
  logoHref: string;
  context?: string;
  navItems: BrandNavItem[];
  navAriaLabel: string;
  primaryHref: string;
  primaryLabel: string;
  rightContent: ReactNode;
} {
  const isEnglish = isEnglishWorkspacePath(pathname);
  const isMatchPack = getRouteWorkspaceContext(pathname) === "matchpack_marketing";

  if (isMatchPack && isEnglish) {
    return {
      locale: "en",
      product: "matchpack",
      logoHref: "/en",
      context: "MatchPack",
      navItems: [
        { href: "/en/candidate-proposal-checker", label: "Checker" },
        { href: "/en/agency/methodology/claim-evidence-benchmark", label: "Methodology" },
        { href: "/en/pricing", label: "Pricing" },
        { href: "mailto:contact@werkcv.nl", label: "Contact" },
      ],
      navAriaLabel: "MatchPack navigation",
      primaryHref: "/agency/account",
      primaryLabel: "Open MatchPack",
      rightContent: (
        <>
          <LanguageSwitcher tone="brand" />
          <NavUserMenu uiLanguage="en" tone="brand" />
        </>
      ),
    };
  }

  if (isMatchPack) {
    const isAgencyOverview = pathname === "/agency";
    return {
      locale: "nl",
      product: "matchpack",
      logoHref: pathname.startsWith("/voor-bureaus") ? "/voor-bureaus" : "/agency",
      context: "MatchPack",
      navItems: [
        { href: "/agency", label: "Overzicht" },
        { href: "/agency#hoe-het-werkt", label: "Hoe het werkt" },
        { href: "/voor-bureaus/methodologie/claim-evidence-benchmark", label: "Methodologie" },
        { href: "/voor-bureaus/kennisbank", label: "Kennisbank" },
        { href: "/agency#plan", label: "Prijs" },
      ],
      navAriaLabel: "Navigatie voor MatchPack",
      primaryHref: isCandidateProposalChecker(pathname) ? "/agency/account/matchpack" : "/agency/account/matchpack",
      primaryLabel: isAgencyOverview ? "Start MatchPack" : "Bekijk MatchPack",
      rightContent: (
        <>
          <LanguageSwitcher tone="brand" />
          <NavUserMenu uiLanguage="nl" tone="brand" />
        </>
      ),
    };
  }

  if (isEnglish) {
    return {
      locale: "en",
      product: "personal",
      logoHref: "/en",
      navItems: [
        { href: "/en/templates", label: "Templates" },
        { href: "/en/dutch-cv-examples", label: "Examples" },
        { href: "/en/guides", label: "Guides" },
        { href: "/en/dutch-cv-checker", label: "CV checker" },
        { href: "/en/pricing", label: "Pricing" },
      ],
      navAriaLabel: "Main navigation",
      primaryHref: "/en/editor?template=professional&startSource=public_header",
      primaryLabel: "Start free",
      rightContent: (
        <>
          <LanguageSwitcher tone="brand" />
          <NavUserMenu uiLanguage="en" tone="brand" />
        </>
      ),
    };
  }

  return {
    locale: "nl",
    product: "personal",
    logoHref: "/",
    navItems: [
      { href: "/templates", label: "Templates" },
      { href: "/cv-voorbeelden", label: "CV-voorbeelden" },
      { href: "/cv-tips", label: "CV-tips" },
      { href: "/tools", label: "Tools" },
      { href: "/prijzen", label: "Prijzen" },
    ],
    navAriaLabel: "Hoofdnavigatie",
    primaryHref: "/editor?template=professional&startSource=public_header",
    primaryLabel: "Start gratis",
    rightContent: (
      <>
        <LanguageSwitcher tone="brand" />
        <NavUserMenu uiLanguage="nl" tone="brand" />
      </>
    ),
  };
}

export default function BrandRouteBoundary({ children }: { children: ReactNode }) {
  const pathname = normaliseWorkspacePathname(usePathname() || "/");
  const context = getRouteWorkspaceContext(pathname);

  if (context !== "personal_public" && context !== "matchpack_marketing") {
    return <>{children}</>;
  }

  const config = getPublicConfig(pathname);
  return (
    <PublicSiteShell
      currentPath={pathname}
      locale={config.locale}
      product={config.product}
      logoHref={config.logoHref}
      context={config.context}
      navItems={config.navItems}
      navAriaLabel={config.navAriaLabel}
      primaryHref={config.primaryHref}
      primaryLabel={config.primaryLabel}
      rightContent={config.rightContent}
    >
      {children}
    </PublicSiteShell>
  );
}
