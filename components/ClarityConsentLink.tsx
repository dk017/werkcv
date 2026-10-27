"use client";

import { CLARITY_CONSENT_REOPEN } from "@/lib/clarity-consent";

/** Footer link that reopens the session-recording choice, so withdrawing is as easy as allowing. */
export default function ClarityConsentLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CLARITY_CONSENT_REOPEN))}
      className="wk-footer-link text-left"
    >
      {label}
    </button>
  );
}
