import ExamplesScreen from "./ExamplesScreen";
export const metadata = { title: "Voorbeelden | WerkCV", robots: { index: false, follow: false } };
export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <ExamplesScreen locale="nl" searchParams={searchParams} />;
}
