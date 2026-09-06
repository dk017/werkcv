"use client";

import Link from "next/link";
import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { classifyTrafficSource, parseUserAgent } from "@/lib/analytics-source";
import { getStoredAttribution } from "@/lib/analytics";

type AgencyContentViewProps =
  | { kind: "hub"; path: string }
  | { kind: "index"; path: string }
  | { kind: "guide"; path: string; slug: string }
  | { kind: "public-sector-guide"; path: string }
  | { kind: "example"; path: string; slug: string }
  | { kind: "tool"; path: string };

export function AgencyContentView(props: AgencyContentViewProps) {
  const kind = props.kind;
  const path = props.path;
  const slug = "slug" in props ? props.slug : "";

  useEffect(() => {
    if (kind === "hub") {
      track("agency_hub_viewed", { path });
      return;
    }

    if (kind === "index") {
      track("agency_guide_index_viewed", { path });
      return;
    }

    if (kind === "example") {
      track("agency_example_viewed", { path, slug });
      return;
    }

    if (kind === "public-sector-guide") {
      const attribution = getStoredAttribution();
      const source = classifyTrafficSource(document.referrer, attribution);
      const sourceCategory = source.host === "werkcv.nl" ? "internal" : source.type;
      const parsedDevice = parseUserAgent(navigator.userAgent).deviceType;
      const deviceCategory = parsedDevice === "bot" ? "unknown" : parsedDevice;
      track("agency_public_sector_guide_viewed", {
        route_id: "nl_public_sector_submission",
        locale: "nl",
        device_category: deviceCategory,
        source_category: sourceCategory,
      });
      return;
    }

    if (kind === "tool") {
      track("agency_evidence_checker_viewed", { locale: path.startsWith("/en/") ? "en" : "nl" });
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

export function AgencyContentDownloadLink({
  href,
  format,
  className,
  children,
}: {
  href: string;
  path: string;
  format: "docx" | "csv";
  className?: string;
  children: React.ReactNode;
}) {
  const handleClick = () => {
    const attribution = getStoredAttribution();
    const source = classifyTrafficSource(document.referrer, attribution);
    const sourceCategory = source.host === "werkcv.nl" ? "internal" : source.type;
    track("agency_evidence_matrix_downloaded", {
      format,
      route_id: "nl_public_sector_submission",
      source_category: sourceCategory,
    });
  };

  return <a href={href} download className={className} onClick={handleClick}>{children}</a>;
}
