"use client";

import { useState } from "react";

type CopyUrlButtonProps = {
  url: string;
  label: string;
  doneLabel: string;
  /** Shown when the browser blocks clipboard access: the URL is selected instead, ready for Ctrl+C. */
  selectedLabel: string;
  /** id of the element that shows the URL, so it can be selected as the fallback. */
  selectId: string;
};

/** Copies a URL to the clipboard; the label confirms it, or says the URL is selected when copying is blocked. */
export default function CopyUrlButton({ url, label, doneLabel, selectedLabel, selectId }: CopyUrlButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "selected">("idle");

  function flash(next: "copied" | "selected") {
    setState(next);
    window.setTimeout(() => setState("idle"), 3000);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      flash("copied");
    } catch {
      // Clipboard blocked (permissions, older browser): select the visible URL so Ctrl+C or the context menu works.
      const element = document.getElementById(selectId);
      const selection = window.getSelection();
      if (element && selection) {
        const range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
        flash("selected");
      }
    }
  }

  return (
    <button type="button" onClick={copy} className="wk-button wk-button-secondary wk-button-small" aria-live="polite">
      {state === "copied" ? doneLabel : state === "selected" ? selectedLabel : label}
    </button>
  );
}
