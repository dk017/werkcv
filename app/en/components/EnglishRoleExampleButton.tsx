"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { CVData } from "@/lib/cv";
import { getStoredAttribution, track } from "@/lib/analytics";
import { PENDING_EXAMPLE_CV_STORAGE_KEY, type PendingExampleCV } from "@/lib/pending-example-cv";
import {
  buildEnglishRoleExampleStartSource,
  normalizeEnglishRoleExampleSlug,
} from "@/lib/english-role-examples";

type EnglishRoleExampleButtonProps = {
  templateId: string;
  colorThemeId: string;
  sampleCV: CVData;
  roleSlug?: string;
  className?: string;
  children?: ReactNode;
};

/** Starts a role-example CV without putting the sample content in the URL. */
export function EnglishRoleExampleButton({
  templateId,
  colorThemeId,
  sampleCV,
  roleSlug,
  className,
  children,
}: EnglishRoleExampleButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canonicalRoleSlug = normalizeEnglishRoleExampleSlug(roleSlug);
  const startSource = buildEnglishRoleExampleStartSource(canonicalRoleSlug) || "english_example_page";

  async function handleClick() {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      track("landing_cta_click", {
        fromPath: window.location.pathname,
        toPath: "/en/editor",
        label: "use_example",
        entryMethod: "example",
        ...(canonicalRoleSlug ? { roleSlug: canonicalRoleSlug } : {}),
      });
      track("start_cv", {
        entryPoint: startSource,
        templateId,
        pagePath: window.location.pathname,
        uiLanguage: "en",
        entryMethod: "example",
        ...(canonicalRoleSlug ? { roleSlug: canonicalRoleSlug } : {}),
      });

      const res = await fetch("/api/create-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId,
          colorThemeId,
          initialData: sampleCV,
          attribution: getStoredAttribution(),
          startSource,
          uiLanguage: "en",
          ...(canonicalRoleSlug ? { roleSlug: canonicalRoleSlug, entryMethod: "example" } : {}),
        }),
      });

      if (res.status === 401) {
        const pendingExample: PendingExampleCV = {
          templateId,
          colorThemeId,
          sampleCV,
          startSource,
        };
        window.sessionStorage.setItem(PENDING_EXAMPLE_CV_STORAGE_KEY, JSON.stringify(pendingExample));
        const nextPath = `/en/editor?template=${encodeURIComponent(templateId)}&startSource=${encodeURIComponent(startSource)}`;
        router.push(`/login?next=${encodeURIComponent(nextPath)}`);
        return;
      }

      if (!res.ok) throw new Error("CREATE_CV_FAILED");

      const result = (await res.json()) as { cvId?: string };
      if (!result.cvId) throw new Error("CREATE_CV_INVALID_RESPONSE");
      router.push(`/en/editor?id=${encodeURIComponent(result.cvId)}&startSource=${encodeURIComponent(startSource)}`);
    } catch {
      setIsLoading(false);
      setError("We couldn't open this example. Please try again, or start with your own CV.");
    }
  }

  return (
    <span className="inline-flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        aria-busy={isLoading}
        className={
          className ||
          "inline-flex items-center justify-center rounded-md border border-emerald-700 bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        }
      >
        {isLoading ? "Opening example…" : children || "Use this example — free to edit"}
      </button>
      {error ? (
        <span role="alert" className="max-w-xs text-sm font-medium text-red-700">
          {error}
        </span>
      ) : null}
    </span>
  );
}

// Compatibility export for older English role pages while they migrate to
// the role-specific component path.
export const EnglishUseExampleButton = EnglishRoleExampleButton;
