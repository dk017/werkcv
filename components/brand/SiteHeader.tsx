import type { ReactNode } from "react";
import Link from "next/link";
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
  rightContent?: ReactNode;
};

const defaultNavItems: BrandNavItem[] = [
  { href: "/templates", label: "Templates" },
  { href: "/cv-voorbeelden", label: "CV-voorbeelden" },
  { href: "/cv-tips", label: "CV-tips" },
  { href: "/tools", label: "Tools" },
  { href: "/prijzen", label: "Prijzen" },
];

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
  rightContent,
}: SiteHeaderProps) {
  const hasNavigation = navItems.length > 0;

  return (
    <header className="wk-site-header">
      <div className="wk-container wk-site-header-inner">
        <div className="wk-site-header-brand">
          <BrandLogo href={logoHref} context={context} />
        </div>

        {hasNavigation ? (
          <nav className="wk-site-nav" aria-label={navAriaLabel}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="wk-site-nav-link">
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
          <details className="wk-mobile-nav">
            <summary aria-label={`${navAriaLabel} openen`}>
              <span className="wk-mobile-nav-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="sr-only">Menu</span>
            </summary>
            <nav aria-label="Mobiele navigatie" className="wk-mobile-nav-panel">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="wk-mobile-nav-link">
                  {item.label}
                </Link>
              ))}
              {primaryHref && primaryLabel ? (
                <Link href={primaryHref} onClick={primaryOnClick} className="wk-button wk-button-primary">
                  {primaryLabel}
                </Link>
              ) : null}
            </nav>
          </details>
        ) : null}
      </div>
    </header>
  );
}
