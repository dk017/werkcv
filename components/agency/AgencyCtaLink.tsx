"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

type AgencyCtaLinkProps = {
  href: string;
  label: string;
  location: string;
  className: string;
};

export default function AgencyCtaLink({
  href,
  label,
  location,
  className,
}: AgencyCtaLinkProps) {
  const handleClick = () => {
    track("cta_clicked", { location, label });

    if (href.startsWith("/")) {
      track("landing_cta_click", { fromPath: "/agency", toPath: href, label });
    }
  };

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} onClick={handleClick}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {label}
    </a>
  );
}
