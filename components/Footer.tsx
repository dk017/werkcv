import Link from "next/link";
import type { UiLanguage } from "@/lib/ui-language";

type FooterLink = { href: string; label: string };
type FooterGroup = { label: string; links: FooterLink[] };

const personalGroupsNl: FooterGroup[] = [
  { label: "Product", links: [
    { href: "/editor", label: "CV maken" },
    { href: "/templates", label: "Templates" },
    { href: "/prijzen", label: "Prijzen" },
  ] },
  { label: "Inspiratie", links: [
    { href: "/cv-voorbeelden", label: "CV-voorbeelden" },
    { href: "/cv-tips", label: "CV-tips" },
    { href: "/tools", label: "Gratis tools" },
  ] },
  { label: "Hulp", links: [
    { href: "/faq", label: "Veelgestelde vragen" },
    { href: "/contact", label: "Contact" },
    { href: "/over-ons", label: "Over WerkCV" },
  ] },
  { label: "Juridisch", links: [
    { href: "/privacy", label: "Privacy" },
    { href: "/voorwaarden", label: "Voorwaarden" },
  ] },
  { label: "Taal", links: [{ href: "/en", label: "English" }] },
];

const personalGroupsEn: FooterGroup[] = [
  { label: "Product", links: [
    { href: "/en/editor", label: "Build your CV" },
    { href: "/en/templates", label: "Templates" },
    { href: "/en/pricing", label: "Pricing" },
  ] },
  { label: "Resources", links: [
    { href: "/en/dutch-cv-examples", label: "CV examples" },
    { href: "/en/guides", label: "Guides" },
    { href: "/en/dutch-cv-checker", label: "CV checker" },
  ] },
  { label: "Help", links: [
    { href: "/en/pricing", label: "Payment questions" },
    { href: "mailto:contact@werkcv.nl", label: "Email support" },
    { href: "/en/guides", label: "CV help" },
  ] },
  { label: "Legal", links: [
    { href: "/en/privacy", label: "Privacy" },
    { href: "/en/terms", label: "Terms" },
  ] },
  { label: "Language", links: [{ href: "/", label: "Nederlands" }] },
];

const matchpackGroupsNl: FooterGroup[] = [
  { label: "MatchPack", links: [
    { href: "/agency", label: "Overzicht" },
    { href: "/agency#hoe-het-werkt", label: "Hoe het werkt" },
    { href: "/agency#plan", label: "Prijs" },
  ] },
  { label: "Bewijs en kwaliteit", links: [
    { href: "/voor-bureaus/methodologie/claim-evidence-benchmark", label: "Methodologie" },
    { href: "/tools/kandidaatvoorstel-checker", label: "Kandidaatvoorstel-checker" },
    { href: "/voor-bureaus/kennisbank/matchpack-handleiding", label: "Handleiding" },
  ] },
  { label: "Voor bureaus", links: [
    { href: "/voor-bureaus/kennisbank", label: "Kennisbank" },
    { href: "/voor-bureaus/kennisbank/matchpack-handleiding#kandidaatbevestiging", label: "Kandidaatbevestiging" },
    { href: "/agency/account", label: "Agency-account" },
  ] },
  { label: "Vertrouwen", links: [
    { href: "/agency/privacy", label: "Privacy, retentie en DPA" },
    { href: "/agency/privacy#subverwerkers", label: "Subverwerkers" },
    { href: "/contact", label: "Contact" },
  ] },
  { label: "Producten", links: [
    { href: "/", label: "Persoonlijke CV's" },
    { href: "/en/candidate-proposal-checker", label: "English" },
  ] },
];

const matchpackGroupsEn: FooterGroup[] = [
  { label: "MatchPack", links: [
    { href: "/en/agency", label: "Overview" },
    { href: "/en/candidate-proposal-checker", label: "Proposal checker" },
    { href: "/agency/account", label: "Open MatchPack" },
    { href: "/en/agency#pricing", label: "Pricing" },
  ] },
  { label: "Evidence", links: [{ href: "/en/agency/methodology/claim-evidence-benchmark", label: "Methodology" }] },
  { label: "Trust", links: [
    { href: "/agency/privacy", label: "Privacy and data processing" },
    { href: "mailto:contact@werkcv.nl", label: "Contact" },
  ] },
  { label: "Products", links: [{ href: "/en", label: "Personal CVs" }] },
];

export default function Footer({
  uiLanguage = "nl",
  variant = "brand",
  product = "personal",
}: {
  uiLanguage?: UiLanguage;
  variant?: "default" | "brand";
  product?: "personal" | "matchpack";
}) {
  const isEnglish = uiLanguage === "en";
  const groups = product === "matchpack"
    ? isEnglish ? matchpackGroupsEn : matchpackGroupsNl
    : isEnglish ? personalGroupsEn : personalGroupsNl;

  return (
    <footer className="wk-footer" data-footer-product={product} data-footer-variant={variant}>
      <div className="wk-container wk-footer-inner">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.1fr_repeat(5,minmax(0,1fr))]">
          <div>
            <Link href={isEnglish ? "/en" : "/"} className="wk-footer-logo">
              Werk<span className="wk-footer-logo-mark">CV</span>.nl
            </Link>
            <p className="wk-footer-description">
              {product === "matchpack"
                ? isEnglish
                  ? "Evidence-linked candidate proposals for recruitment teams."
                  : "Onderbouwde kandidaatvoorstellen voor recruitmentteams."
                : isEnglish
                  ? "English CV guidance and practical tools for working in the Netherlands."
                  : "CV maken en praktische sollicitatietools voor werken in Nederland."}
            </p>
          </div>
          {groups.map((group) => (
            <div key={group.label}>
              <p className="wk-footer-heading">{group.label}</p>
              <nav aria-label={group.label} className="wk-footer-links">
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href} className="wk-footer-link">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
        <div className="wk-footer-bottom">
          <p className="wk-footer-copyright">
            &copy; {new Date().getFullYear()} WerkCV.nl | {product === "matchpack"
              ? isEnglish ? "Evidence-linked candidate proposals" : "Onderbouwde kandidaatvoorstellen"
              : isEnglish ? "Build a professional CV for jobs in the Netherlands" : "Maak een professioneel CV voor Nederlandse vacatures"}
          </p>
        </div>
      </div>
    </footer>
  );
}
