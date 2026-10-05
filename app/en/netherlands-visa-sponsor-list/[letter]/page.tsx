import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SponsorListLetter, LIST_LETTERS } from "@/components/sponsor/SponsorPages";
import { LETTER_LABEL } from "@/components/sponsor/copy";
import { buildEnglishMetadata } from "@/app/en/metadata";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ letter: string }> };

const isLetter = (value: string) => (LIST_LETTERS as readonly string[]).includes(value.toLowerCase());

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { letter } = await params;
  if (!isLetter(letter)) return { title: "Page not found | WerkCV" };
  const label = LETTER_LABEL(letter.toLowerCase());
  const key = letter.toLowerCase();
  return buildEnglishMetadata({
    title: `Recognised Sponsors Starting with ${label}: Netherlands Visa Sponsor List`,
    description: `All organisations on the IND register of recognised sponsors (work and highly skilled migrants) that start with ${label}, with legal name and KvK number.`,
    path: `/en/netherlands-visa-sponsor-list/${key}`,
    nlPath: `/erkende-referenten-lijst/${key}`,
    keywords: [`recognised sponsors starting with ${label.toLowerCase()}`, "netherlands visa sponsor list", "IND recognised sponsors"],
  });
}

export default async function NetherlandsVisaSponsorListLetterPage({ params }: Props) {
  const { letter } = await params;
  if (!isLetter(letter)) notFound();
  return <SponsorListLetter locale="en" letter={letter} />;
}
