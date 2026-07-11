import EnglishRoleExampleRoute from "../components/EnglishRoleExampleRoute";
import { buildEnglishMetadata } from "../metadata";
import { englishRoleExamples } from "@/lib/english-role-examples";
const config = englishRoleExamples.productManager;
export const metadata = buildEnglishMetadata({ title: "Product Manager CV Example Netherlands 2026", description: "Use a realistic English product manager CV example for the Netherlands with discovery, roadmap, delivery, go-to-market, and product metrics.", path: config.pagePath, keywords: ["product manager cv example netherlands", "product manager resume netherlands", "english product manager cv netherlands"] });
export default function Page() { return <EnglishRoleExampleRoute {...config} />; }
