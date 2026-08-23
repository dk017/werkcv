import type { ReactNode } from "react";
import { BrandShell } from "@/components/brand/BrandShell";
import { SiteHeader, type BrandNavItem } from "@/components/brand/SiteHeader";
import PublicFooter from "@/components/brand/PublicFooter";
import type { UiLanguage } from "@/lib/ui-language";

export default function PublicSiteShell({
  children,
  locale,
  product,
  currentPath,
  logoHref,
  context,
  navItems,
  navAriaLabel,
  primaryHref,
  primaryLabel,
  rightContent,
}: {
  children: ReactNode;
  locale: UiLanguage;
  product: "personal" | "matchpack";
  currentPath: string;
  logoHref: string;
  context?: string;
  navItems: BrandNavItem[];
  navAriaLabel: string;
  primaryHref?: string;
  primaryLabel?: string;
  rightContent?: ReactNode;
}) {
  return (
    <BrandShell className={`wk-route-brand wk-route-brand--${product}`}>
      <SiteHeader
        currentPath={currentPath}
        logoHref={logoHref}
        context={context}
        navItems={navItems}
        navAriaLabel={navAriaLabel}
        primaryHref={primaryHref}
        primaryLabel={primaryLabel}
        rightContent={rightContent}
      />
      <div className="wk-public-content">{children}</div>
      <div className="wk-public-shell-footer">
        <PublicFooter locale={locale} product={product} />
      </div>
    </BrandShell>
  );
}
