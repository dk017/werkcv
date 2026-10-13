import HandoffClient from "@/app/cv-handoff/HandoffClient";
import { isAppV2Active } from "@/lib/app-v2";
import { appPaths } from "@/lib/app-v2-paths";
export const metadata = { title: "Add selected text to your CV | WerkCV", robots: { index: false, follow: false } };
export default async function Page() {
  return <HandoffClient locale="en" cancelHref={await isAppV2Active() ? appPaths("en").dashboard : undefined} />;
}
