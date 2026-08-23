"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const settingsRoutes = [
  { href: "/agency/account/settings/organisation", label: "Organisatie" },
  { href: "/agency/account/settings/templates", label: "Templates" },
  { href: "/agency/account/settings/team", label: "Team" },
  { href: "/agency/account/settings/privacy", label: "Privacy en retentie" },
  { href: "/agency/account/settings/data", label: "Data" },
] as const;

export default function AgencySettingsNav() {
  const pathname = usePathname();

  return (
    <nav className="wk-agency-settings-nav" aria-label="Instellingenonderdelen">
      {settingsRoutes.map((route) => {
        const current = pathname === route.href;
        return (
          <Link
            key={route.href}
            href={route.href}
            aria-current={current ? "page" : undefined}
            className={current ? "wk-agency-settings-nav-link is-current" : "wk-agency-settings-nav-link"}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}
