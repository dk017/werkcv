import JobsScreen from "../vacatures/JobsScreen";
export const metadata = { title: "Mijn sollicitaties | WerkCV", robots: { index: false, follow: false } };
export default function Page() { return <JobsScreen locale="nl" view="applications" />; }
