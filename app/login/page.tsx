import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; locale?: string }>;
}) {
  const { next, locale } = await searchParams;
  const initialNext =
    typeof next === "string" && next.startsWith("/")
      ? next
      : "/editor?template=professional";
  const initialLocale = locale === "en" ? "en" : undefined;

  return <LoginForm initialNext={initialNext} initialLocale={initialLocale} />;
}
