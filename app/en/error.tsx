"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function EnglishError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("English route error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <section className="w-full max-w-lg border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-rose-100 text-2xl font-bold text-rose-700">
          !
        </div>
        <h1 className="mt-5 text-center text-2xl font-semibold text-slate-950">Something went wrong</h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          Your saved CV remains available. Try loading this page again or return to the English templates.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-slate-900 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Try again
          </button>
          <Link
            href="/en/templates"
            className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-center text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            View templates
          </Link>
        </div>
      </section>
    </main>
  );
}
