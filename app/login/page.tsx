import LoginForm from "./LoginForm";
import { sanitizeInternalReturnPath } from "@/lib/auth/safe-return-path";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; locale?: string }>;
}) {
  const { next, locale } = await searchParams;
  const initialNext = sanitizeInternalReturnPath(
    next,
    "/editor?template=professional",
  );
  const initialLocale = locale === "en" ? "en" : undefined;

  return <LoginForm initialNext={initialNext} initialLocale={initialLocale} />;
}
