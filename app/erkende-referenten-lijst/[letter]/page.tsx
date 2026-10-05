import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SponsorListLetter, LIST_LETTERS } from "@/components/sponsor/SponsorPages";
import { LETTER_LABEL } from "@/components/sponsor/copy";
import { buildDutchMetadata } from "@/lib/page-metadata";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ letter: string }> };

const isLetter = (value: string) => (LIST_LETTERS as readonly string[]).includes(value.toLowerCase());

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { letter } = await params;
  if (!isLetter(letter)) return { title: "Pagina niet gevonden | WerkCV" };
  const label = LETTER_LABEL(letter.toLowerCase());
  return buildDutchMetadata({
    title: `Erkend referenten die beginnen met ${label}: lijst uit het IND-register`,
    description: `Alle organisaties in het IND-register van erkend referenten (arbeid en kennismigranten) die beginnen met ${label}, met juridische naam en KvK-nummer.`,
    path: `/erkende-referenten-lijst/${letter.toLowerCase()}`,
  });
}

export default async function ErkendeReferentenLetterPage({ params }: Props) {
  const { letter } = await params;
  if (!isLetter(letter)) notFound();
  return <SponsorListLetter locale="nl" letter={letter} />;
}
