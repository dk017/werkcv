import EnglishRoleExampleRoute from "../components/EnglishRoleExampleRoute";
import { buildEnglishMetadata } from "../metadata";
import { logisticsCoordinatorExample } from "../components/english-logistics-cluster";

export const metadata = buildEnglishMetadata({
  title: "Logistics Coordinator CV Example for Jobs in the Netherlands",
  description: `${logisticsCoordinatorExample.articleDescription} Edit the fictional structure for free; the finished PDF has one one-time price and no subscription.`,
  path: logisticsCoordinatorExample.pagePath,
  keywords: [
    "logistics coordinator cv example netherlands",
    "logistics planner resume netherlands",
    "transport coordinator cv english",
    "logistics administration cv example",
  ],
  type: "article",
});

export default function LogisticsCoordinatorCvExamplePage() {
  return <EnglishRoleExampleRoute {...logisticsCoordinatorExample} />;
}
