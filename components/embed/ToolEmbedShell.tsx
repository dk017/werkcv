import Link from "next/link";
import type { ReactNode } from "react";

type EmbedTheme = "light" | "dark";

type ToolEmbedShellProps = {
  badge: string;
  title: string;
  description: string;
  toolHref: string;
  supportHref?: string;
  showCta: boolean;
  showFooter: boolean;
  theme?: EmbedTheme;
  children: ReactNode;
};

export function resolveEmbedOption(
  value: string | string[] | undefined,
  fallback: "on" | "off",
): boolean {
  const raw = Array.isArray(value) ? value[0] : value;

  if (!raw) {
    return fallback === "on";
  }

  return raw === "on" || raw === "1" || raw === "true" || raw === "yes";
}

export function resolveEmbedTheme(value: string | string[] | undefined): EmbedTheme {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "dark" ? "dark" : "light";
}

export default function ToolEmbedShell({
  badge,
  title,
  description,
  toolHref,
  supportHref = "/wordpress/salaris-tools-plugin",
  showCta,
  showFooter,
  theme = "light",
  children,
}: ToolEmbedShellProps) {
  const isDark = theme === "dark";

  return (
    <main
      className={
        isDark
          ? "min-h-screen bg-slate-950 px-4 py-5 text-slate-50 sm:px-6"
          : "min-h-screen bg-[#FFFEF0] px-4 py-5 text-slate-900 sm:px-6"
      }
    >
      <div className="mx-auto max-w-4xl">
        <section
          className={
            isDark
              ? "mb-5 border-4 border-slate-100 bg-slate-900 p-5 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.95)]"
              : "mb-5 border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          }
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <p
                className={
                  isDark
                    ? "mb-3 inline-block border border-teal-300 bg-teal-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-teal-200"
                    : "mb-3 inline-block border-2 border-black bg-yellow-300 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-black"
                }
              >
                {badge}
              </p>
              <h1 className="text-2xl font-black leading-tight sm:text-3xl">{title}</h1>
              <p
                className={
                  isDark
                    ? "mt-3 text-sm font-medium leading-relaxed text-slate-300 sm:text-base"
                    : "mt-3 text-sm font-medium leading-relaxed text-slate-600 sm:text-base"
                }
              >
                {description}
              </p>
            </div>

            {showCta ? (
              <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                <a
                  href={toolHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    isDark
                      ? "inline-block border-2 border-teal-300 bg-teal-400 px-4 py-2 text-sm font-black text-slate-950 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.95)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.95)]"
                      : "inline-block border-4 border-black bg-[#4ECDC4] px-4 py-2 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  }
                >
                  Open volledige tool
                </a>
                <p
                  className={
                    isDark
                      ? "max-w-[15rem] text-xs font-medium text-slate-400"
                      : "max-w-[15rem] text-xs font-medium text-slate-500"
                  }
                >
                  Handig als je de volledige uitleg, bronnen en gerelateerde WerkCV-tools wilt zien.
                </p>
              </div>
            ) : null}
          </div>
        </section>

        <section
          className={
            isDark
              ? "border-4 border-slate-100 bg-slate-900 p-4 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.95)] sm:p-5"
              : "border-4 border-black bg-white p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:p-5"
          }
        >
          {children}
        </section>

        {showFooter ? (
          <div
            className={
              isDark
                ? "mt-4 flex flex-col gap-2 text-xs font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between"
                : "mt-4 flex flex-col gap-2 text-xs font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between"
            }
          >
            <p>
              Powered by{" "}
              <Link href="/" className="font-black underline decoration-2 underline-offset-2">
                WerkCV.nl
              </Link>
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tools" className="underline decoration-2 underline-offset-2">
                Meer NL tools
              </Link>
              <Link href={supportHref} className="underline decoration-2 underline-offset-2">
                WordPress plugin info
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
