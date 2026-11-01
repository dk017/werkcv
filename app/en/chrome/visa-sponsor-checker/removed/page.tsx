import type { Metadata } from "next";
import Link from "next/link";
import { Card, ExtensionShell } from "../ExtensionShell";

// Opened by Chrome when the extension is removed. One optional question; the answer is a count in the server log,
// with nothing that identifies the person.
export const metadata: Metadata = {
  title: "Extension removed | WerkCV",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const REASONS = {
  wrong_matches: "Badges were wrong or missing",
  slow: "It slowed down LinkedIn or Indeed",
  not_needed: "I found my job or no longer need it",
  other_tool: "I use another tool",
  other: "Something else",
} as const;

type Reason = keyof typeof REASONS;

export default async function VisaSponsorCheckerRemovedPage({ searchParams }: { searchParams: Promise<{ reason?: string }> }) {
  const { reason } = await searchParams;
  const answered = reason && reason in REASONS ? (reason as Reason) : null;
  if (answered) console.info(JSON.stringify({ type: "sponsor_extension_event", event: "uninstall_reason", reason: answered }));

  return (
    <ExtensionShell>
      <Card>
        <h1 className="mb-4 text-3xl font-black text-black">The sponsor checker is removed</h1>
        {answered ? (
          <p className="text-lg font-medium text-gray-800">Thank you, that helps. If a badge was wrong, an email to contact@werkcv.nl with the employer name lets us fix it for everyone.</p>
        ) : (
          <>
            <p className="mb-5 text-lg font-medium text-gray-800">One optional question: what was the main reason?</p>
            <ul className="space-y-3">
              {(Object.keys(REASONS) as Reason[]).map((key) => (
                <li key={key}>
                  <Link href={`/en/chrome/visa-sponsor-checker/removed?reason=${key}`} className="block border-2 border-black bg-white px-4 py-3 font-bold hover:bg-yellow-100">
                    {REASONS[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
        <p className="mt-6 font-medium text-gray-700">
          You can still check employers on the{" "}
          <Link href="/en/netherlands-visa-sponsor-checker" className="font-bold underline">
            web sponsor checker
          </Link>
          .
        </p>
      </Card>
    </ExtensionShell>
  );
}
