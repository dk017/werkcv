"use client";

import Link from "next/link";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

type AgencyContentViewProps =
  | { kind: "hub"; path: string }
  | { kind: "index"; path: string }
  | { kind: "guide"; path: string; slug: string };

export function AgencyContentView(props: AgencyContentViewProps) {
  const kind = props.kind;
  const path = props.path;
  const slug = props.kind === "guide" ? props.slug : "";

  useEffect(() => {
    if (kind === "hub") {
      track("agency_hub_viewed", { path });
      return;
    }

    if (kind === "index") {
      track("agency_guide_index_viewed", { path });
      return;
    }

    track("agency_guide_viewed", { path, slug });
  }, [kind, path, slug]);

  return null;
}

type AgencyContentLinkProps = {
  href: string;
  path: string;
  location: string;
  intent: "learn" | "product" | "login" | "sample" | "knowledge";
  className?: string;
  children: React.ReactNode;
};

export function AgencyContentLink({
  href,
  path,
  location,
  intent,
  className,
  children,
}: AgencyContentLinkProps) {
  const handleClick = () => {
    track("agency_content_cta_clicked", {
      path,
      location,
      destination: href,
      intent,
    });
  };

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
