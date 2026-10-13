import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { sanitizeInternalReturnPath } from "@/lib/auth/safe-return-path";
import { getCurrentUser } from "@/lib/auth";
import { isAppV2Active } from "@/lib/app-v2";
import { appEntryLocale, appPostLoginPath } from "@/lib/app-v2-entry";

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

  // App on: someone who is already signed in goes straight on instead of seeing the form again.
  if (await isAppV2Active() && await getCurrentUser()) {
    redirect(appPostLoginPath(initialNext, appEntryLocale({ next: initialNext, locale })));
  }

  return <LoginForm initialNext={initialNext} initialLocale={initialLocale} />;
}
