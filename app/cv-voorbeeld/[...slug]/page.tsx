import { permanentRedirect } from "next/navigation";
import { resolveLegacyCvVoorbeeldPath } from "@/lib/cv-voorbeelden/legacy-redirects";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function LegacyCvVoorbeeldRedirect({ params }: PageProps) {
  const { slug } = await params;
  permanentRedirect(resolveLegacyCvVoorbeeldPath(slug));
}
