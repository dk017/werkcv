import JobsScreen from "@/app/mijn-cvs/vacatures/JobsScreen";
export const metadata = { title: "Jobs for you | WerkCV", robots: { index: false, follow: false } };
export default function Page() { return <JobsScreen locale="en" view="jobs" />; }
