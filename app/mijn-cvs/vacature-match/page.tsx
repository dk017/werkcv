import CvCheckScreen from "@/app/mijn-cvs/cv-check/CvCheckScreen";
export const metadata = { title: "Vacature-match | WerkCV", robots: { index: false, follow: false } };
export default function Page() { return <CvCheckScreen locale="nl" mode="vacancy" />; }
