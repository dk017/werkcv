"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

type Props = {
  href: string;
  path: string;
  location: string;
  event: "agency_docx_cta_clicked" | "agency_redaction_cta_clicked";
  children: React.ReactNode;
};

export default function AgencyGuideSpecialLink({ href, path, location, event, children }: Props) {
  return (
    <Link
      href={href}
      onClick={() => track(event, { path, location })}
      className="border-2 border-white px-5 py-3 text-center text-sm font-black text-white"
    >
      {children}
    </Link>
  );
}
