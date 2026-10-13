"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/app/icons";
import type { AppLocale } from "@/lib/app-v2-paths";

export default function AccountLogoutButton({ locale }: { locale: AppLocale }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
        router.push(locale === "en" ? "/en" : "/");
      }}
      className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--wk-primary)] px-5 text-sm font-bold text-[var(--wk-primary-contrast)] hover:bg-[var(--wk-primary-hover)] disabled:opacity-60"
    >
      <Icon name="logout" size={18} aria-hidden="true" />
      {locale === "en" ? "Log out" : "Uitloggen"}
    </button>
  );
}
