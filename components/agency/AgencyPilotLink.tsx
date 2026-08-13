"use client";

import { track } from "@/lib/analytics";

export default function AgencyPilotLink({ location, className }: { location: string; className: string }) {
  return <a href="#pilot" className={className} onClick={() => track("agency_pilot_cta_clicked", { location })}>Test één kandidaatcase</a>;
}
