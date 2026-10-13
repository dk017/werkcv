import ExamplesScreen from "@/app/mijn-cvs/voorbeelden/ExamplesScreen";
export const metadata = { title: "Examples | WerkCV", robots: { index: false, follow: false } };
export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <ExamplesScreen locale="en" searchParams={searchParams} />;
}
