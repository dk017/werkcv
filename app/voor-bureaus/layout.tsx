import Link from "next/link";
import Footer from "@/components/Footer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

const navLinks = [
  { href: "/voor-bureaus", label: "Overzicht" },
  { href: "/voor-bureaus/kennisbank", label: "Kennisbank" },
  { href: "/agency#voorbeeld", label: "Voorbeeld" },
  { href: "/agency#plan", label: "Prijs" },
];

export default function AgencyContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FFFEF5] text-slate-950">
      <header className="border-b-2 border-slate-950 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/voor-bureaus" className="text-xl font-black tracking-tight">
            Werk<span className="bg-[#4ECDC4] px-1">CV</span>
            <span className="ml-2 text-sm font-bold text-slate-500">voor bureaus</span>
          </Link>
          <nav aria-label="Navigatie voor bureaus" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-emerald-700">
                {link.label}
              </Link>
            ))}
            <Link
              href="/login?next=%2Fagency%2Faccount"
              className="border-2 border-slate-950 bg-yellow-300 px-3 py-2 text-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
            >
              Inloggen
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <OrganizationJsonLd />
      <Footer />
    </div>
  );
}
