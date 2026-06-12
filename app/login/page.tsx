import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const initialNext =
    typeof next === "string" && next.startsWith("/")
      ? next
      : "/editor?template=professional";

  return <LoginForm initialNext={initialNext} />;
}
