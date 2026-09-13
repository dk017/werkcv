import HandoffClient from "@/app/cv-handoff/HandoffClient";
export const metadata = { title: "Add selected text to your CV | WerkCV", robots: { index: false, follow: false } };
export default function Page() { return <HandoffClient locale="en" />; }
