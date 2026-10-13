import ProfilePhotoScreen from "./ProfilePhotoScreen";
export const metadata = { title: "Profielfoto | WerkCV", robots: { index: false, follow: false } };
export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <ProfilePhotoScreen locale="nl" searchParams={searchParams} />;
}
