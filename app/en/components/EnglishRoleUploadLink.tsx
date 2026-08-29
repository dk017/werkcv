"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics";
import {
  buildEnglishRoleExampleStartSource,
  normalizeEnglishRoleExampleSlug,
} from "@/lib/english-role-examples";

type EnglishRoleUploadLinkProps = {
  href: string;
  roleSlug: string;
  templateId: string;
  className?: string;
  children?: ReactNode;
};

export function EnglishRoleUploadLink({
  href,
  roleSlug,
  templateId,
  className,
  children,
}: EnglishRoleUploadLinkProps) {
  function handleClick() {
    const canonicalRoleSlug = normalizeEnglishRoleExampleSlug(roleSlug);
    const startSource = buildEnglishRoleExampleStartSource(canonicalRoleSlug, "upload") || "english_example_page";
    track("landing_cta_click", {
      fromPath: window.location.pathname,
      toPath: "/en/editor",
      label: "start_with_own_cv",
      entryMethod: "upload",
      ...(canonicalRoleSlug ? { roleSlug: canonicalRoleSlug } : {}),
    });
    track("start_cv", {
      entryPoint: startSource,
      templateId,
      pagePath: window.location.pathname,
      uiLanguage: "en",
      entryMethod: "upload",
      ...(canonicalRoleSlug ? { roleSlug: canonicalRoleSlug } : {}),
    });
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children || "Start with my own CV"}
    </Link>
  );
}
