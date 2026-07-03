"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getStoredAttribution, track } from "@/lib/analytics";
import type { EditorFeedbackContext } from "@/lib/contact";
import type { UiLanguage } from "@/lib/ui-language";

interface EditorFeedbackWidgetProps {
  accountEmail: string;
  userName: string;
  uiLanguage: UiLanguage;
  context: EditorFeedbackContext;
}

type SubmitStatus = "idle" | "submitting" | "success";

export default function EditorFeedbackWidget({
  accountEmail,
  userName,
  uiLanguage,
  context,
}: EditorFeedbackWidgetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState(accountEmail);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const isEnglish = uiLanguage === "en";

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!dialog.open) dialog.showModal();
    requestAnimationFrame(() => messageRef.current?.focus());
  }, [isOpen]);

  const openDialog = () => {
    setStatus("idle");
    setErrorMessage("");
    setIsOpen(true);
    track("editor_feedback_opened", context);
  };

  const closeDialog = () => {
    if (status === "submitting") return;
    dialogRef.current?.close();
    setIsOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage(
        isEnglish ? "Enter a valid email address." : "Vul een geldig e-mailadres in.",
      );
      emailRef.current?.focus();
      return;
    }

    if (trimmedMessage.length < 20) {
      setErrorMessage(
        isEnglish
          ? "Please add a little more detail so we can understand the issue."
          : "Geef iets meer uitleg, zodat we het probleem goed begrijpen.",
      );
      messageRef.current?.focus();
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const contactName = userName.trim();
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName.length >= 2
            ? contactName
            : isEnglish ? "Editor user" : "Editor gebruiker",
          email: trimmedEmail,
          subject: "feedback",
          message: trimmedMessage,
          website: "",
          pagePath: window.location.pathname,
          attribution: getStoredAttribution(),
          editorContext: context,
        }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(result.error || `Request failed: ${response.status}`);
      }

      setStatus("success");
      setMessage("");
      track("editor_feedback_submitted", context);
    } catch (error) {
      const reason = error instanceof Error ? error.message : "unknown";
      setStatus("idle");
      setErrorMessage(
        isEnglish
          ? "Your message could not be sent. Please try again."
          : "Je bericht kon niet worden verzonden. Probeer het opnieuw.",
      );
      track("editor_feedback_failed", {
        cvId: context.cvId,
        uiLanguage,
        reason,
      });
    }
  };

  if (!hasMounted) return null;

  return createPortal(
    <>
      <button
        type="button"
        onClick={openDialog}
        className="fixed bottom-4 left-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-lg font-bold text-slate-700 shadow-md transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        title={isEnglish ? "Help or feedback" : "Hulp of feedback"}
        aria-label={isEnglish ? "Open help or feedback" : "Open hulp of feedback"}
        aria-haspopup="dialog"
      >
        ?
      </button>

      {isOpen ? (
        <dialog
          ref={dialogRef}
          onClose={() => setIsOpen(false)}
          onCancel={(event) => {
            if (status === "submitting") {
              event.preventDefault();
              return;
            }
            setIsOpen(false);
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
          className="m-auto w-[calc(100%-24px)] max-w-[420px] rounded-lg border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/40 backdrop:backdrop-blur-[1px]"
          aria-labelledby="editor-feedback-title"
          aria-describedby="editor-feedback-description"
        >
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
            <div>
              <h2 id="editor-feedback-title" className="text-lg font-bold text-slate-950">
                {isEnglish ? "Help or feedback" : "Hulp of feedback"}
              </h2>
              <p id="editor-feedback-description" className="mt-1 text-sm leading-5 text-slate-600">
                {isEnglish
                  ? "Tell us what is unclear, broken, or could be better."
                  : "Laat weten wat onduidelijk is, niet werkt of beter kan."}
              </p>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              disabled={status === "submitting"}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-xl leading-none text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              title={isEnglish ? "Close" : "Sluiten"}
              aria-label={isEnglish ? "Close feedback form" : "Feedbackformulier sluiten"}
            >
              ×
            </button>
          </div>

          {status === "success" ? (
            <div className="px-5 py-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-700">
                ✓
              </div>
              <p className="mt-4 font-bold text-slate-950">
                {isEnglish ? "Thanks. We received your message." : "Bedankt. We hebben je bericht ontvangen."}
              </p>
              <p className="mt-1 text-sm leading-5 text-slate-600">
                {isEnglish
                  ? "We normally reply within one to two working days."
                  : "We reageren normaal gesproken binnen één tot twee werkdagen."}
              </p>
              <button
                type="button"
                onClick={closeDialog}
                className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-4 text-sm font-bold text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                {isEnglish ? "Done" : "Klaar"}
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                  {isEnglish ? "Email" : "E-mail"}
                </span>
                <input
                  ref={emailRef}
                  type="email"
                  required
                  maxLength={160}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  autoComplete="email"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                  {isEnglish ? "What can we improve?" : "Wat kunnen we verbeteren?"}
                </span>
                <textarea
                  ref={messageRef}
                  required
                  minLength={20}
                  maxLength={4000}
                  rows={5}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder={
                    isEnglish
                      ? "Describe what happened or what you expected..."
                      : "Beschrijf wat er gebeurde of wat je verwachtte..."
                  }
                  className="w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm leading-5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              {errorMessage ? (
                <p role="alert" className="text-sm font-semibold text-red-700">
                  {errorMessage}
                </p>
              ) : null}

              <p className="text-xs leading-5 text-slate-500">
                {isEnglish
                  ? "Your CV content is not included. We only use your email to reply."
                  : "Je CV-inhoud wordt niet meegestuurd. We gebruiken je e-mail alleen om te reageren."}
              </p>

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={closeDialog}
                  disabled={status === "submitting"}
                  className="h-10 rounded-md px-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isEnglish ? "Cancel" : "Annuleren"}
                </button>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex h-10 min-w-28 items-center justify-center rounded-md bg-emerald-600 px-4 text-sm font-bold text-white hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "submitting"
                    ? isEnglish ? "Sending..." : "Versturen..."
                    : isEnglish ? "Send message" : "Bericht versturen"}
                </button>
              </div>
            </form>
          )}
        </dialog>
      ) : null}
    </>,
    document.body,
  );
}
