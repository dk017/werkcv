import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About WerkCV | Dutch CV builder without subscription",
  description:
    "Learn what WerkCV does: a Dutch CV builder with ATS-friendly templates, free start and one-time PDF download payment for individual job seekers.",
  alternates: {
    canonical: "https://werkcv.nl/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f3e8] text-black">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="mb-4 inline-flex border-2 border-black bg-yellow-300 px-3 py-1 text-xs font-black uppercase tracking-[0.2em]">
          About WerkCV
        </p>
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">
          Dutch CV builder for job seekers in the Netherlands
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-slate-700">
          WerkCV helps people create a clear, ATS-friendly CV for the Dutch job market.
          Users can start for free, choose a template, improve their CV content and pay
          once when downloading the final PDF.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["No subscription", "Individual job seekers do not need a monthly plan or trial subscription."],
            ["Dutch market focus", "Templates, examples and guides are written for applications in the Netherlands."],
            ["Useful tools", "WerkCV includes CV checks, ATS guidance, LinkedIn-to-CV conversion and writing helpers."],
          ].map(([title, text]) => (
            <div key={title} className="border-2 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-lg font-black">{title}</h2>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border-2 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black">Important pages</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-black">
            {[
              ["/cv-maken", "Create a CV"],
              ["/prijzen", "Pricing"],
              ["/tools", "Free tools"],
              ["/cv-voorbeelden", "CV examples"],
              ["/en", "English guides"],
              ["/over-ons", "Dutch about page"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="border-2 border-black bg-yellow-300 px-4 py-2 transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
