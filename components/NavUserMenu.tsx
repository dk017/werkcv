"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { UiLanguage } from "@/lib/ui-language";
import WorkspaceSwitcher from "@/components/workspace/WorkspaceSwitcher";
import type { WorkspaceEntitlements } from "@/lib/workspace/types";
import { getRouteWorkspaceContext } from "@/lib/workspace/route-context";

export default function NavUserMenu({
  uiLanguage = "nl",
  tone = "default",
  showAccountLinks = true,
}: {
  uiLanguage?: UiLanguage;
  tone?: "default" | "brand";
  showAccountLinks?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const routeWorkspaceContext = getRouteWorkspaceContext(pathname);
  const isMatchPackPath = routeWorkspaceContext === "matchpack_app" || routeWorkspaceContext === "matchpack_marketing";
  const isApplication = routeWorkspaceContext === "personal_app" || routeWorkspaceContext === "matchpack_app" || routeWorkspaceContext === "document_derived";
  const isEnglish = uiLanguage === "en";
  const menuRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [workspaces, setWorkspaces] = useState<WorkspaceEntitlements | null>(null);
  const [workspaceSwitcherEnabled, setWorkspaceSwitcherEnabled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me", { headers: { Accept: "application/json" } })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (cancelled) return;
        if (data?.authenticated) {
          setEmail(data.user.email);
          if (data.workspaces) setWorkspaces(data.workspaces as WorkspaceEntitlements);
          setWorkspaceSwitcherEnabled(data.workspaceSwitcherEnabled === true);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  useEffect(() => setMenuOpen(false), [pathname]);

  const linkClass = tone === "brand"
    ? "wk-user-menu-link"
    : "font-bold text-sm text-black hover:text-yellow-600 transition-colors";
  const quietClass = tone === "brand"
    ? "wk-user-menu-quiet"
    : "text-xs font-bold text-gray-500 hover:text-black transition-colors disabled:opacity-50";

  if (!loaded) {
    return <span className="wk-nav-user-menu wk-nav-user-menu-loading" aria-hidden="true" />;
  }

  if (!email) {
    const loginNext = isMatchPackPath
      ? "/agency/account"
      : pathname.startsWith("/en") ? "/en/editor" : "/editor";
    return (
      <Link href={`/login?next=${encodeURIComponent(loginNext)}`} className={linkClass}>
        {isEnglish ? "Log in" : "Inloggen"}
      </Link>
    );
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    setLogoutError(false);
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) throw new Error("LOGOUT_FAILED");
      router.push(isEnglish ? "/en" : "/");
      router.refresh();
    } catch {
      setLogoutError(true);
      setLoggingOut(false);
    }
  };

  const canShowWorkspaceSwitcher = Boolean(workspaces && workspaceSwitcherEnabled && workspaces.switcherEligible && isApplication);
  const currentWorkspace = isMatchPackPath && workspaces?.matchpack ? "matchpack" : "personal";
  const profileHref = isEnglish ? "/en/profile-photo" : "/profielfoto-cv-maken";

  return (
    <div className="wk-nav-user-menu" ref={menuRef}>
      {canShowWorkspaceSwitcher && workspaces ? (
        <WorkspaceSwitcher
          workspaces={workspaces}
          locale={isEnglish ? "en" : "nl"}
          currentWorkspace={currentWorkspace}
          compact
        />
      ) : null}
      <button
        type="button"
        className={`${tone === "brand" ? "wk-account-menu-trigger" : "wk-account-menu-trigger wk-account-menu-trigger-default"}`}
        aria-expanded={menuOpen}
        aria-haspopup="true"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="wk-account-menu-trigger-label">{email}</span>
        <span className="wk-account-menu-trigger-mobile">{isEnglish ? "Account" : "Account"}</span>
        <span aria-hidden="true" className="wk-account-menu-chevron">⌄</span>
      </button>
      {menuOpen ? (
        <div className="wk-account-menu-panel" role="group" aria-label={isEnglish ? "Account options" : "Accountopties"}>
          <p className="wk-account-menu-email">{email}</p>
          <Link href="/mijn-cvs" className="wk-account-menu-link">
            {isEnglish ? "My CVs" : "Mijn CV's"}
          </Link>
          {workspaces?.matchpack ? (
            <Link href={workspaces.matchpack.href} className="wk-account-menu-link">
              MatchPack{workspaces.matchpack.companyName ? ` · ${workspaces.matchpack.companyName}` : ""}
            </Link>
          ) : (
            <Link href={isEnglish ? "/en/candidate-proposal-checker" : "/voor-bureaus"} className="wk-account-menu-link">
              {isEnglish ? "Discover MatchPack" : "Ontdek MatchPack"}
            </Link>
          )}
          {showAccountLinks ? (
            <Link href={profileHref} className="wk-account-menu-link">
              {isEnglish ? "Profile photos" : "Profielfoto's"}
            </Link>
          ) : null}
          <button type="button" onClick={handleLogout} disabled={loggingOut} className={`${quietClass} wk-account-menu-logout`}>
            {loggingOut ? "…" : isEnglish ? "Log out" : "Uitloggen"}
          </button>
          {logoutError ? <p className="wk-account-menu-error" role="alert">{isEnglish ? "Could not log out. Try again." : "Uitloggen is niet gelukt. Probeer opnieuw."}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
