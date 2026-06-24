"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getCounterpart, getRoutePair } from "@/lib/i18n/route-pairs";
import { track } from "@/lib/analytics";

type LanguageSwitcherProps = {
  className?: string;
  tone?: "light" | "solid";
};

function withSearch(path: string, search: string): string {
  if (!search) return path;
  return `${path}?${search}`;
}

function LanguageSwitcherInner({
  className = "",
  tone = "light",
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPath = pathname || "/";
  const pair = getRoutePair(currentPath);
  const counterpart = getCounterpart(currentPath, "switcher");

  if (!pair || !counterpart) return null;

  const isEnglish = currentPath === pair.en;
  const targetLocale = isEnglish ? "nl" : "en";
  const targetHref = pair.preserveSearch
    ? withSearch(counterpart, searchParams.toString())
    : counterpart;

  const baseClass =
    tone === "solid"
      ? "border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-black transition-colors hover:bg-yellow-100"
      : "rounded-full border border-slate-300 bg-white/90 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-slate-800 shadow-sm transition-colors hover:bg-slate-50";

  return (
    <Link
      href={targetHref}
      hrefLang={targetLocale}
      className={`${baseClass} ${className}`.trim()}
      onClick={() => {
        track("cta_clicked", {
          location: "language_switcher",
          label: `${isEnglish ? "en_to_nl" : "nl_to_en"}:${pair.id}`,
        });
        track("landing_cta_click", {
          fromPath: currentPath,
          toPath: counterpart,
          label: `language_switcher:${pair.id}:${targetLocale}`,
        });
      }}
    >
      {targetLocale.toUpperCase()}
    </Link>
  );
}

export default function LanguageSwitcher(props: LanguageSwitcherProps) {
  return (
    <Suspense fallback={null}>
      <LanguageSwitcherInner {...props} />
    </Suspense>
  );
}
