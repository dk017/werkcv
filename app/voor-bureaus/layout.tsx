import Footer from "@/components/Footer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

export default function AgencyContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wk-agency-marketing">
      {children}
      <OrganizationJsonLd />
      <Footer variant="brand" />
    </div>
  );
}
