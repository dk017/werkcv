import { redirect } from "next/navigation";
import AppShell from "@/components/app/AppShell";
import { getCurrentUser } from "@/lib/auth";
import { isAppV2Active } from "@/lib/app-v2";
import { appPaths, type AppLocale } from "@/lib/app-v2-paths";
import { listApplications, listCvChoices } from "@/lib/app-jobs/service";
import { consumerAiEnabled } from "@/lib/consumer-ai-availability";
import JobsWorkspace from "./JobsWorkspace";

export default async function JobsScreen({ locale, view }: { locale: AppLocale; view: "jobs" | "applications" }) {
  const paths = appPaths(locale);
  if (!(await isAppV2Active())) redirect(paths.dashboard);
  const user = await getCurrentUser();
  if (!user) redirect(`/login?locale=${locale}&next=${encodeURIComponent(view === "jobs" ? paths.jobs : paths.applications)}`);
  const [cvs, applications] = await Promise.all([listCvChoices(user.id), listApplications(user.id)]);
  return <AppShell active={view} locale={locale}><JobsWorkspace key={`${locale}:${view}`} locale={locale} view={view} cvs={cvs} initialApplications={applications} aiEnabled={consumerAiEnabled()} /></AppShell>;
}
