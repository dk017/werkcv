import EnglishRoleExampleRoute from "../components/EnglishRoleExampleRoute";
import { buildEnglishMetadata } from "../metadata";
import { englishRoleExamples } from "@/lib/english-role-examples";
const config = englishRoleExamples.businessAnalyst;
export const metadata = buildEnglishMetadata({ title: "Business Analyst CV Example Netherlands 2026", description: "Use a realistic English business analyst CV example for the Netherlands with requirements, BPMN, Jira, UAT, and process improvement.", path: config.pagePath, keywords: ["business analyst cv example netherlands", "business analyst resume netherlands", "english business analyst cv netherlands"] });
export default function Page() { return <EnglishRoleExampleRoute {...config} />; }
