import type { Metadata } from "next";
import CandidateAcknowledgementReview from "@/components/agency/CandidateAcknowledgementReview";

export const metadata: Metadata = {
  title: "Private candidate review | WerkCV",
  robots: { index: false, follow: false, noarchive: true },
};

export default function CandidateAcknowledgementPage() {
  return <CandidateAcknowledgementReview />;
}
