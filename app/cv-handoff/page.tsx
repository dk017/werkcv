import HandoffClient from "./HandoffClient";
import { isAppV2Active } from "@/lib/app-v2";
import { appPaths } from "@/lib/app-v2-paths";
export const metadata = { title: "Add selected text to your CV | WerkCV", robots: { index: false, follow: false } };
export default async function Page() {
  return <HandoffClient locale="nl" cancelHref={await isAppV2Active() ? appPaths("nl").dashboard : undefined} />;
}
