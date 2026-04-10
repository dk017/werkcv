import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { ToolFaqAccordion, type ToolFaqItem } from "@/components/tools/ToolFaqAccordion";

type ToolBadge = "Geld" | "NL wetgeving" | "Expat";

type StatPill = {
  label: string;
  value: string;
  note: string;
};

type ToolPageShellProps = {
  badge: ToolBadge;
  title: string;
  description: string;
  toolLabel: string;
  toolHref: string;
  faqTitle: string;
  faqItems: ToolFaqItem[];
  statPills: StatPill[];
  asideTitle: string;
  asideParagraphs: string[];
  children: ReactNode;
};

function getBadgeClassName(badge: ToolBadge) {
  if (badge === "Geld") {
    return "bg-blue-100 text-blue-800 border-blue-300";
  }

  if (badge === "Expat") {
    return "bg-violet-100 text-violet-800 border-violet-300";
  }

  return "bg-emerald-100 text-emerald-800 border-emerald-300";
}

export function ToolPageShell({
  badge,
  title,
  description,
  toolLabel,
  toolHref,
  faqTitle,
  faqItems,
  statPills,
  asideTitle,
  asideParagraphs,
  children,
}: ToolPageShellProps) {
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
            </span>
          </Link>
          <Link
            href="/tools"
            className="text-sm font-bold text-slate-600 transition-colors hover:text-slate-900"
          >
            ← Alle tools
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: toolLabel, href: toolHref },
            ]}
          />
        </div>

        <section className="mb-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wide ${getBadgeClassName(
                  badge,
                )}`}
              >
                {badge}
              </span>
              <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-700">
                Bijgewerkt april 2026
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-black leading-tight text-slate-900 sm:text-5xl">
              {title}
            </h1>
            <p className="max-w-3xl text-lg font-medium text-slate-600">{description}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {statPills.map((pill) => (
                <div
                  key={pill.label}
                  className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-slate-500">
                    {pill.label}
                  </p>
                  <p className="text-lg font-black text-slate-900">{pill.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{pill.note}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-500">
              {asideTitle}
            </p>
            <div className="space-y-3 text-sm text-slate-600">
              {asideParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </aside>
        </section>

        <section className="mb-12">{children}</section>

        <section className="mb-12 mt-12">
          <div className="mb-5">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">FAQ</p>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">{faqTitle}</h2>
          </div>
          <ToolFaqAccordion items={faqItems} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
