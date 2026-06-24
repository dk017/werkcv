import Link from "next/link";

type SupportCard = {
  title: string;
  body: string;
};

type SupportSection = {
  title: string;
  body: string;
  bullets?: string[];
};

type SupportPageProps = {
  badge: string;
  title: string;
  intro: string;
  primaryCtaLabel?: string;
  cards: SupportCard[];
  sections: SupportSection[];
  checklist: string[];
  faq: SupportCard[];
};

const coreRoutes = [
  {
    href: "/en/dutch-cv-template",
    title: "Dutch-style CV template",
    body: "Start from the main English route when you want the builder, not only advice.",
  },
  {
    href: "/en/templates?startSource=en_support_related_templates",
    title: "English templates",
    body: "Compare layouts and create a CV that stays in the English funnel.",
  },
  {
    href: "/en/editor?template=professional&startSource=en_support_related_editor",
    title: "English editor",
    body: "Open the editor directly when you already know the structure you need.",
  },
];

export default function EnglishCvSupportPage({
  badge,
  title,
  intro,
  primaryCtaLabel = "Start with English templates",
  cards,
  sections,
  checklist,
  faq,
}: SupportPageProps) {
  return (
    <main className="min-h-screen bg-[#FFFEF9]">
      <section className="border-b-4 border-black bg-gradient-to-br from-sky-50 via-cyan-50 to-white">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-slate-700">
            {badge}
          </p>
          <h1 className="max-w-4xl text-4xl font-black text-gray-900 md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
            {intro}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/en/templates?startSource=en_support_hero_templates" className="border-4 border-black bg-black px-5 py-3 font-bold text-white">
              {primaryCtaLabel}
            </Link>
            <Link href="/en/dutch-cv-template" className="border-4 border-black bg-[#4ECDC4] px-5 py-3 font-bold text-black">
              Main English CV route
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-lg font-black text-gray-900">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{card.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="border-4 border-black bg-white p-6">
              <h2 className="text-2xl font-black text-gray-900">{section.title}</h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-gray-700">{section.body}</p>
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section className="mt-10 border-4 border-black bg-[#E9FFFC] p-6">
          <h2 className="text-2xl font-black text-gray-900">Before you download</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <li key={item} className="border-2 border-black bg-white p-3 text-sm font-semibold text-gray-800">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 border-4 border-black bg-[#FFF7E8] p-6">
          <h2 className="text-2xl font-black text-gray-900">
            English CV for Dutch-market applications
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-gray-700">
            Keep the same transparent WerkCV pricing route: build for free, choose an English
            template, and pay only when you want the final PDF. The value is not a generic resume
            builder; it is a Dutch-market structure with English wording.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/en/templates?startSource=en_support_bottom_templates" className="border-4 border-black bg-black px-5 py-3 font-bold text-white">
              Choose template
            </Link>
            <Link href="/prijzen" className="border-4 border-black bg-white px-5 py-3 font-bold text-black">
              View pricing model
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-black text-gray-900">Related English routes</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {coreRoutes.map((route) => (
              <Link key={route.href} href={route.href} className="block border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5">
                <h3 className="font-black text-gray-900">{route.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{route.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-black text-gray-900">FAQ</h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <details key={item.title} className="border-4 border-black bg-white">
                <summary className="cursor-pointer p-4 font-black text-gray-900">{item.title}</summary>
                <p className="px-4 pb-4 leading-relaxed text-gray-700">{item.body}</p>
              </details>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
