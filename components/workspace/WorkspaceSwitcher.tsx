"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { WorkspaceEntitlements, WorkspaceKind } from "@/lib/workspace/types";

export default function WorkspaceSwitcher({
  workspaces,
  currentWorkspace = "personal",
  locale = "nl",
  compact = false,
}: {
  workspaces: WorkspaceEntitlements;
  currentWorkspace?: WorkspaceKind;
  locale?: "nl" | "en";
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isEnglish = locale === "en";
  const currentLabel = currentWorkspace === "matchpack"
    ? workspaces.matchpack?.companyName
      ? `MatchPack · ${workspaces.matchpack.companyName}`
      : "MatchPack"
    : isEnglish ? "Personal CVs" : "Persoonlijke CV's";

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  if (!workspaces.switcherEligible) return null;

  return (
    <div ref={ref} className={`wk-workspace-switcher ${compact ? "wk-workspace-switcher--compact" : ""}`}>
      <button
        type="button"
        className="wk-workspace-switcher-trigger"
        aria-expanded={open}
        aria-controls="workspace-switcher-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="wk-workspace-switcher-label">{isEnglish ? "Workspace" : "Werkruimte"}</span>
        <span className="wk-workspace-switcher-current">{currentLabel}</span>
        <span aria-hidden="true" className="wk-workspace-switcher-chevron">⌄</span>
      </button>
      {open ? (
        <div id="workspace-switcher-panel" className="wk-workspace-switcher-panel" role="group" aria-label={isEnglish ? "Workspaces" : "Werkruimtes"}>
          <Link
            href={workspaces.personal.href}
            className="wk-workspace-switcher-option"
            aria-current={currentWorkspace === "personal" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            <span>{isEnglish ? "Personal CVs" : "Persoonlijke CV's"}</span>
            {currentWorkspace === "personal" ? <span aria-hidden="true">✓</span> : null}
          </Link>
          {workspaces.matchpack ? (
            <Link
              href={workspaces.matchpack.href}
              className="wk-workspace-switcher-option"
              aria-current={currentWorkspace === "matchpack" ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              <span>
                <span className="block">MatchPack</span>
                {workspaces.matchpack.companyName ? <span className="wk-workspace-switcher-meta">{workspaces.matchpack.companyName}</span> : null}
              </span>
              {currentWorkspace === "matchpack" ? <span aria-hidden="true">✓</span> : null}
            </Link>
          ) : (
            <Link href={isEnglish ? "/en/candidate-proposal-checker" : "/voor-bureaus"} className="wk-workspace-switcher-marketing" onClick={() => setOpen(false)}>
              {isEnglish ? "Discover MatchPack for agencies" : "Ontdek MatchPack voor bureaus"}
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
}
