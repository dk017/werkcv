import EnglishRoleExampleRoute from "../components/EnglishRoleExampleRoute";
import { buildEnglishMetadata } from "../metadata";
import { englishRoleExamples } from "@/lib/english-role-examples";
const config = englishRoleExamples.projectManager;
export const metadata = buildEnglishMetadata({ title: "Project Manager CV Example Netherlands 2026", description: "Use a realistic English project manager CV example for the Netherlands with budgets, risks, stakeholders, delivery scope, and outcomes.", path: config.pagePath, keywords: ["project manager cv example netherlands", "project manager resume netherlands", "english project manager cv netherlands"] });
export default function Page() { return <EnglishRoleExampleRoute {...config} />; }
