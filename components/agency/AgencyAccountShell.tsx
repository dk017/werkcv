import type { ReactNode } from "react";
import { BrandShell } from "@/components/brand/BrandShell";
import { SiteHeader } from "@/components/brand/SiteHeader";
import NavUserMenu from "@/components/NavUserMenu";

const agencyNavigation = [
  { href: "/agency/account", label: "Overzicht" },
  { href: "/agency/account/matchpack", label: "MatchPacks" },
  { href: "/agency/account/insights", label: "Inzichten" },
  { href: "/agency/account/settings", label: "Instellingen" },
];

export default function AgencyAccountShell({
  children,
  currentPath,
  email,
  role,
}: {
  children: ReactNode;
  currentPath: string;
  email: string;
  role?: string;
}) {
  return (
    <BrandShell className="wk-agency-app">
      <SiteHeader
        logoHref="/agency/account"
        context="MatchPack"
        navItems={agencyNavigation}
        navAriaLabel="MatchPack-workspace"
        currentPath={currentPath}
        rightContent={(
          <div className="wk-agency-header-account-actions flex items-center gap-3">
            <span className="wk-agency-account-context" title={email}>
              {role ? <span className="wk-agency-role">{role}</span> : null}
            </span>
            <NavUserMenu uiLanguage="nl" tone="brand" showAccountLinks={false} />
          </div>
        )}
      />
      {children}
    </BrandShell>
  );
}
