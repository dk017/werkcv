import JobsScreen from "@/app/mijn-cvs/vacatures/JobsScreen";
export const metadata = { title: "My applications | WerkCV", robots: { index: false, follow: false } };
export default function Page() { return <JobsScreen locale="en" view="applications" />; }
