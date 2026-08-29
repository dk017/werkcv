import EnglishRoleExampleRoute from "../components/EnglishRoleExampleRoute";
import { buildEnglishMetadata } from "../metadata";
import { orderPickerFulfilmentExample } from "../components/english-logistics-cluster";

export const metadata = buildEnglishMetadata({
  title: "Order Picker and Fulfilment CV Example for Jobs in the Netherlands",
  description: `${orderPickerFulfilmentExample.articleDescription} Edit the fictional structure for free; the finished PDF has one one-time price and no subscription.`,
  path: orderPickerFulfilmentExample.pagePath,
  keywords: [
    "order picker cv example netherlands",
    "fulfilment cv example netherlands",
    "warehouse picker resume english",
    "order picker resume netherlands",
  ],
  type: "article",
});

export default function OrderPickerFulfilmentCvExamplePage() {
  return <EnglishRoleExampleRoute {...orderPickerFulfilmentExample} />;
}
