import EnglishRoleExampleRoute from "../components/EnglishRoleExampleRoute";
import { buildEnglishMetadata } from "../metadata";
import { forkliftReachTruckExample } from "../components/english-logistics-cluster";

export const metadata = buildEnglishMetadata({
  title: "Forklift and Reach Truck CV Example for Jobs in the Netherlands",
  description: `${forkliftReachTruckExample.articleDescription} Edit the fictional structure for free; the finished PDF has one one-time price and no subscription.`,
  path: forkliftReachTruckExample.pagePath,
  keywords: [
    "forklift cv example netherlands",
    "reach truck operator cv netherlands",
    "forklift resume english netherlands",
    "warehouse operator cv example",
  ],
  type: "article",
});

export default function ForkliftReachTruckCvExamplePage() {
  return <EnglishRoleExampleRoute {...forkliftReachTruckExample} />;
}
