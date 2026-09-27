"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

export default function CopyPromptButton({ text, promptId }: { text: string; promptId: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      track("cta_clicked", { location: "chatgpt_guide_prompt", label: promptId });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" onClick={copy} className="wk-button wk-button-secondary text-sm" aria-live="polite">
      {copied ? "Gekopieerd" : "Kopieer prompt"}
    </button>
  );
}
