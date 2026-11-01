import { SPONSOR_EXTENSION_STORE_URL } from "@/lib/sponsor/links";

// Frame and parts for the Netherlands Visa Sponsor Checker pages (support, privacy, welcome, removed), in the site's style.

export function ExtensionShell({ children }: { children: React.ReactNode }) {
  // The site's own header and footer come from the root layout.
  return (
    <div className="bg-[#FFFEF0]">
      <main className="mx-auto max-w-3xl px-6 py-12">{children}</main>
    </div>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return <section className="mb-8 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:p-8">{children}</section>;
}

export function AddToChromeButton({ content }: { content: string }) {
  if (!SPONSOR_EXTENSION_STORE_URL) return null;
  return (
    <a
      href={`${SPONSOR_EXTENSION_STORE_URL}?utm_source=werkcv&utm_campaign=sponsor_checker&utm_content=${content}`}
      className="inline-block border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
    >
      Add to Chrome, free
    </a>
  );
}

/** The three badges as they look on a job site. */
export function BadgeSamples() {
  const badges = [
    { label: "IND sponsor", className: "border-[#a9dcc7] bg-[#e2f4ec] text-[#0b5d4b]", meaning: "The employer's name matches a recognised sponsor on the IND register." },
    { label: "Possible sponsor", className: "border-[#efd19a] bg-[#fdf1d8] text-[#7a4b00]", meaning: "A related company or a similar legal name is on the register. Check which entity would employ you." },
    { label: "Not on IND list", className: "border-[#d4d8dd] bg-white text-[#5e6670]", meaning: "Not found under this name. Brand and legal names can differ, so search the register before ruling the employer out." },
  ];
  return (
    <ul className="space-y-3">
      {badges.map((badge) => (
        <li key={badge.label} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
          <span className={`inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {badge.label}
          </span>
          <span className="font-medium text-gray-800">{badge.meaning}</span>
        </li>
      ))}
    </ul>
  );
}
