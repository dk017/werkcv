"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BrandShell } from "@/components/brand/BrandShell";
import { SiteHeader, type BrandNavItem } from "@/components/brand/SiteHeader";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NavUserMenu from "@/components/NavUserMenu";

const rolloutRoutes = new Set([
  "/templates",
  "/cv-maken",
  "/gratis-cv-maken",
  "/online-cv-maken",
  "/cv-voorbeelden",
  "/cv-tips",
  "/tools",
  "/tools/ats-cv-checker",
  "/tools/cv-score",
  "/tools/cv-vacature-match",
  "/prijzen",
  "/agency",
  "/voor-bureaus",
  "/voor-bureaus/kennisbank",
  "/voor-bureaus/kennisbank/matchpack-handleiding",
  "/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever",
  "/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau",
  "/voor-bureaus/kennisbank/cv-anonimiseren-recruitment",
  "/agency/privacy",
  "/en/pricing",
  "/en/guides",
  "/en/expat-cv-netherlands",
  "/en/cv-job-match-checker",
  "/en/dutch-cv-checker",
  "/cv-maken-in-word",
  "/cv-maken-in-engels",
  "/cv-maken-pdf",
  "/cv-maken-op-mobiel",
  "/cv-maken-student",
  "/stage-cv-maken",
  "/cv-maken-template",
  "/cv-opstellen",
  "/cv-opmaken",
  "/cv-optimaliseren",
  "/en",
  "/en/templates",
]);

function normalizePathname(pathname: string | null): string {
  if (!pathname) return "/";
  const normalized = pathname.replace(/\/+$/, "");
  return normalized || "/";
}

function getHeaderConfig(pathname: string): {
  isEnglish: boolean;
  logoHref: string;
  navItems: BrandNavItem[];
  navAriaLabel: string;
  primaryHref: string;
  primaryLabel: string;
  context?: string;
  rightContent: ReactNode;
} {
  const isAgency = pathname === "/agency" || pathname.startsWith("/voor-bureaus");
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  if (isAgency) {
    const isPublicAgencyLanding = pathname === "/agency";
    return {
      isEnglish: false,
      logoHref: pathname.startsWith("/voor-bureaus") ? "/voor-bureaus" : "/agency",
      navItems: pathname.startsWith("/voor-bureaus")
        ? [
            { href: "/voor-bureaus", label: "Overzicht" },
            { href: "/voor-bureaus/kennisbank", label: "Kennisbank" },
            { href: "/agency#voorbeeld", label: "Voorbeeld" },
            { href: "/agency#plan", label: "Prijs" },
          ]
        : [
            { href: "/voor-bureaus", label: "Voor bureaus" },
            { href: "/agency#hoe-het-werkt", label: "Werking" },
            { href: "/agency#plan", label: "Prijs" },
          ],
      navAriaLabel: "Navigatie voor bureaus",
      primaryHref: isPublicAgencyLanding ? "/login?next=%2Fagency%2Faccount" : "/agency",
      primaryLabel: isPublicAgencyLanding ? "Inloggen" : "Bekijk MatchPack",
      context: pathname.startsWith("/voor-bureaus") ? "voor bureaus" : undefined,
      rightContent: <NavUserMenu uiLanguage="nl" tone="brand" />,
    };
  }

  if (isEnglish) {
    return {
      isEnglish: true,
      logoHref: "/en",
      navItems: [
        { href: "/en/templates", label: "Templates" },
        { href: "/en/guides", label: "Guides" },
        { href: "/en/dutch-cv-examples", label: "Examples" },
        { href: "/tools", label: "Tools" },
        { href: "/en/pricing", label: "Pricing" },
      ],
      navAriaLabel: "Main navigation",
      primaryHref: "/en/editor",
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
    isEnglish: false,
    logoHref: "/",
    navItems: [
      { href: "/templates", label: "Templates" },
      { href: "/cv-voorbeelden", label: "CV-voorbeelden" },
      { href: "/cv-tips", label: "CV-tips" },
      { href: "/tools", label: "Tools" },
      { href: "/prijzen", label: "Prijzen" },
    ],
    navAriaLabel: "Hoofdnavigatie",
    primaryHref: "/editor",
    primaryLabel: "Maak je CV",
    rightContent: (
      <>
        <LanguageSwitcher tone="brand" />
        <NavUserMenu uiLanguage="nl" tone="brand" />
      </>
    ),
  };
}

export default function BrandRouteBoundary({ children }: { children: ReactNode }) {
  const pathname = normalizePathname(usePathname());

  if (!rolloutRoutes.has(pathname)) {
    return <>{children}</>;
  }

  const config = getHeaderConfig(pathname);

  return (
    <BrandShell className="wk-route-brand">
      <SiteHeader
        logoHref={config.logoHref}
        context={config.context}
        navItems={config.navItems}
        navAriaLabel={config.navAriaLabel}
        primaryHref={config.primaryHref}
        primaryLabel={config.primaryLabel}
        rightContent={config.rightContent}
      />
      {children}
    </BrandShell>
  );
}
