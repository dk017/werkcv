import EnglishRoleExampleRoute from "../components/EnglishRoleExampleRoute";
import { buildEnglishMetadata } from "../metadata";
import { englishRoleExamples } from "@/lib/english-role-examples";
const config = englishRoleExamples.dataAnalyst;
export const metadata = buildEnglishMetadata({ title: "Data Analyst CV Example Netherlands 2026", description: "Use a realistic English data analyst CV example for the Netherlands with SQL, Power BI, Python, stakeholder reporting, and measurable outcomes.", path: config.pagePath, keywords: ["data analyst cv example netherlands", "data analyst resume netherlands", "english data analyst cv netherlands"] });
export default function Page() { return <EnglishRoleExampleRoute {...config} />; }
