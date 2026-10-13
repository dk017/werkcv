import CvCheckScreen from "@/app/mijn-cvs/cv-check/CvCheckScreen";
export const metadata = { title: "CV check | WerkCV", robots: { index: false, follow: false } };
export default function Page() { return <CvCheckScreen locale="en" mode="general" />; }
