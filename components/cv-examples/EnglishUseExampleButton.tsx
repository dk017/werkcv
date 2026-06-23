"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CVData } from "@/lib/cv";
import { getStoredAttribution, track } from "@/lib/analytics";
import { PENDING_EXAMPLE_CV_STORAGE_KEY, type PendingExampleCV } from "@/lib/pending-example-cv";

type EnglishUseExampleButtonProps = {
  templateId: string;
  colorThemeId: string;
  sampleCV: CVData;
  roleSlug?: string;
  className?: string;
};

export function EnglishUseExampleButton({
  templateId,
  colorThemeId,
  sampleCV,
  roleSlug,
  className,
}: EnglishUseExampleButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    try {
      track("start_cv", { entryPoint: "english_example_page", templateId, roleSlug });
      const attribution = getStoredAttribution();
      const res = await fetch("/api/create-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId,
          colorThemeId,
          initialData: sampleCV,
          attribution,
          startSource: "english_example_page",
        }),
      });

      if (res.status === 401) {
        const pendingExample: PendingExampleCV = {
          templateId,
          colorThemeId,
          sampleCV,
          startSource: "english_example_page",
        };
        window.sessionStorage.setItem(PENDING_EXAMPLE_CV_STORAGE_KEY, JSON.stringify(pendingExample));
        const nextPath = `/en/editor?template=${encodeURIComponent(templateId)}&startSource=english_example_page`;
        router.push(`/login?next=${encodeURIComponent(nextPath)}`);
        return;
      }

      if (!res.ok) {
        throw new Error("CREATE_CV_FAILED");
      }

      const { cvId } = await res.json();
      router.push(`/en/editor?id=${cvId}`);
    } catch {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={
        className ||
        "inline-flex items-center justify-center rounded-md border border-emerald-700 bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      }
    >
      {isLoading ? "Opening..." : "Use this example"}
    </button>
  );
}
