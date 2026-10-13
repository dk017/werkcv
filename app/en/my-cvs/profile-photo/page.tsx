import ProfilePhotoScreen from "@/app/mijn-cvs/profielfoto/ProfilePhotoScreen";
export const metadata = { title: "Profile photo | WerkCV", robots: { index: false, follow: false } };
export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <ProfilePhotoScreen locale="en" searchParams={searchParams} />;
}
