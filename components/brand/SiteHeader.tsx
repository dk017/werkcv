"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand/BrandLogo";

export type BrandNavItem = {
  href: string;
  label: string;
};

type SiteHeaderProps = {
  navItems?: BrandNavItem[];
  navAriaLabel?: string;
  logoHref?: string;
  primaryHref?: string;
  primaryLabel?: string;
  primaryOnClick?: () => void;
  backHref?: string;
  backLabel?: string;
  context?: string;
  currentPath?: string;
  rightContent?: ReactNode;
};

const defaultNavItems: BrandNavItem[] = [
  { href: "/templates", label: "Templates" },
  { href: "/cv-voorbeelden", label: "CV-voorbeelden" },
  { href: "/cv-tips", label: "CV-tips" },
  { href: "/tools", label: "Tools" },
  { href: "/prijzen", label: "Prijzen" },
];

function normalise(pathname: string): string {
  const path = pathname.split(/[?#]/, 1)[0].replace(/\/+$/, "");
  return path || "/";
}

function isActiveNavItem(href: string, pathname: string): boolean {
  if (href.includes("#")) return false;
  const target = normalise(href);
  const current = normalise(pathname);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

export function SiteHeader({
  navItems = defaultNavItems,
  navAriaLabel = "Hoofdnavigatie",
  logoHref = "/",
  primaryHref,
  primaryLabel,
  primaryOnClick,
  backHref,
  backLabel,
  context,
  currentPath,
  rightContent,
}: SiteHeaderProps) {
  const routePathname = usePathname() || currentPath || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelId = useId();
  const hasNavigation = navItems.length > 0;


  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);
  const resolvedPath = currentPath || routePathname;

  return (
    <header className="wk-site-header">
      <div className="wk-container wk-site-header-inner">
        <div className="wk-site-header-brand">
          <BrandLogo href={logoHref} context={context} />
        </div>

        {hasNavigation ? (
          <nav className="wk-site-nav" aria-label={navAriaLabel}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="wk-site-nav-link"
                aria-current={isActiveNavItem(item.href, resolvedPath) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}

        <div className="wk-site-header-actions">
          {backHref && backLabel ? (
            <Link href={backHref} className="wk-back-link">
              <span aria-hidden="true">←</span> {backLabel}
            </Link>
          ) : null}
          {rightContent}
          {primaryHref && primaryLabel ? (
            <Link
              href={primaryHref}
              onClick={primaryOnClick}
              className="wk-button wk-button-primary wk-button-small"
            >
              {primaryLabel}
            </Link>
          ) : null}
        </div>

        {hasNavigation ? (
          <div className="wk-mobile-nav">
            <button
              type="button"
              className="wk-mobile-nav-trigger"
              aria-expanded={mobileOpen}
              aria-controls={panelId}
              aria-label={mobileOpen ? `${navAriaLabel} sluiten` : `${navAriaLabel} openen`}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span className="wk-mobile-nav-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="sr-only">Menu</span>
            </button>
            {mobileOpen ? (
              <div id={panelId} className="wk-mobile-nav-panel">
                <nav aria-label={`${navAriaLabel} mobiel`}>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="wk-mobile-nav-link"
                      aria-current={isActiveNavItem(item.href, resolvedPath) ? "page" : undefined}
                      onClick={closeMobile}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {primaryHref && primaryLabel ? (
                    <Link
                      href={primaryHref}
                      onClick={() => {
                        primaryOnClick?.();
                        closeMobile();
                      }}
                      className="wk-button wk-button-primary"
                    >
                      {primaryLabel}
                    </Link>
                  ) : null}
                </nav>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
