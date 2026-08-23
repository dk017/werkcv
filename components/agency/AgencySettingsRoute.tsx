import { redirect } from "next/navigation";
import AgencySettingsPanel, { type AgencySettingsSection } from "@/components/agency/AgencySettingsPanel";
import { canCreateAgencyWork } from "@/lib/agency-access";
import { getAgencySettingsContext } from "@/lib/agency-settings-context";

export default async function AgencySettingsRoute({ section }: { section: Exclude<AgencySettingsSection, "all"> }) {
  const context = await getAgencySettingsContext();
  if (!context) {
    const next = `/agency/account/settings/${section}`;
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }
  if (context.access.state !== "active") return null;

  return (
    <AgencySettingsPanel
      section={section}
      owner={context.access.isOwner}
      canImport={canCreateAgencyWork(context.access) && context.access.remaining > 0}
      role={context.access.role}
    />
  );
}
