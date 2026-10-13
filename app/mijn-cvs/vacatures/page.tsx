import JobsScreen from "./JobsScreen";
export const metadata = { title: "Vacatures voor jou | WerkCV", robots: { index: false, follow: false } };
export default function Page() { return <JobsScreen locale="nl" view="jobs" />; }
