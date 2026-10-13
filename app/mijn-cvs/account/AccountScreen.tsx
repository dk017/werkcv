import Link from "next/link";
import { redirect } from "next/navigation";
import AppShell from "@/components/app/AppShell";
import { getCurrentUser } from "@/lib/auth";
import { isAppV2Active } from "@/lib/app-v2";
import { appPaths, type AppLocale } from "@/lib/app-v2-paths";
import { prisma } from "@/lib/prisma";
import { cvDownloadPrice } from "@/lib/site-content";
import AccountLogoutButton from "./AccountLogoutButton";

const COPY = {
  nl: {
    title: "Account",
    intro: "Je inloggegevens, betalingen en taal.",
    loginTitle: "Inloggen",
    loginText: "Je logt in met een eenmalige code die we naar dit e-mailadres sturen. Er is geen wachtwoord.",
    paymentsTitle: "Betalingen",
    paymentsEmpty: `Nog geen betalingen. Je betaalt pas als je een PDF downloadt: ${cvDownloadPrice.display} eenmalig, geen abonnement.`,
    product: { "cv-download": "CV-download (PDF)", "profile-photo": "AI-profielfoto", agency: "MatchPack" } as Record<string, string>,
    otherProduct: "Aankoop",
    openCv: "Open CV",
    deletedCv: "CV verwijderd",
    languageTitle: "Taal van de app",
    languageText: "Kies de taal van menu's en knoppen. De taal van je CV stel je per CV in.",
    deleteTitle: "Account verwijderen",
    deleteText: "Wil je je account en je gegevens laten verwijderen? Stuur ons een e-mail vanaf dit e-mailadres, dan regelen we het.",
    deleteLink: "Mail contact@werkcv.nl",
    deleteSubject: "Account verwijderen",
    logoutTitle: "Uitloggen",
    logoutText: "Log uit op dit apparaat.",
  },
  en: {
    title: "Account",
    intro: "Your sign-in details, payments and language.",
    loginTitle: "Sign-in",
    loginText: "You sign in with a one-time code we send to this email address. There is no password.",
    paymentsTitle: "Payments",
    paymentsEmpty: `No payments yet. You only pay when you download a PDF: ${cvDownloadPrice.displayEn} one-time, no subscription.`,
    product: { "cv-download": "CV download (PDF)", "profile-photo": "AI profile photo", agency: "MatchPack" } as Record<string, string>,
    otherProduct: "Purchase",
    openCv: "Open CV",
    deletedCv: "CV deleted",
    languageTitle: "App language",
    languageText: "Choose the language of menus and buttons. You set the language of each CV separately.",
    deleteTitle: "Delete account",
    deleteText: "Want your account and data deleted? Email us from this address and we will take care of it.",
    deleteLink: "Email contact@werkcv.nl",
    deleteSubject: "Delete my account",
    logoutTitle: "Log out",
    logoutText: "Log out on this device.",
  },
} as const;

const card = "rounded-2xl border border-[var(--wk-border)] bg-[var(--wk-surface)] p-5 sm:p-6";
const cardTitle = "text-[17px] font-extrabold text-[var(--wk-ink)]";
const muted = "text-sm leading-relaxed text-[var(--wk-ink-muted)]";

export default async function AccountScreen({ locale }: { locale: AppLocale }) {
  const en = locale === "en";
  const paths = appPaths(locale);
  const t = COPY[locale];
  if (!(await isAppV2Active())) redirect(paths.dashboard);
  const user = await getCurrentUser();
  if (!user) redirect(`/login?locale=${locale}&next=${encodeURIComponent(paths.account)}`);

  // Orders are keyed by email and CV, not by user id.
  const cvs = await prisma.cVDocument.findMany({ where: { userId: user.id }, select: { id: true, title: true } });
  const cvTitles = new Map(cvs.map((cv) => [cv.id, cv.title]));
  const orders = await prisma.order.findMany({
    where: { paidAt: { not: null }, OR: [{ email: user.email }, { cvId: { in: cvs.map((cv) => cv.id) } }] },
    orderBy: { paidAt: "desc" },
    take: 50,
    select: { id: true, product: true, amountCents: true, currency: true, paidAt: true, cvId: true },
  });
  const dateFormat = new Intl.DateTimeFormat(en ? "en-GB" : "nl-NL", { day: "numeric", month: "long", year: "numeric" });
  const money = (cents: number, currency: string | null) =>
    new Intl.NumberFormat(en ? "en-IE" : "nl-NL", { style: "currency", currency: (currency || "EUR").toUpperCase() }).format(cents / 100);

  return (
    <AppShell active="account" locale={locale}>
      <main className="mx-auto flex max-w-[760px] flex-col gap-5 px-4 py-8 sm:px-8 sm:py-10">
        <header>
          <h1 className="text-[28px] font-extrabold tracking-tight text-[var(--wk-ink)]">{t.title}</h1>
          <p className={`mt-1 ${muted}`}>{t.intro}</p>
        </header>

        <section className={card} aria-labelledby="account-login">
          <h2 id="account-login" className={cardTitle}>{t.loginTitle}</h2>
          <p className="mt-3 break-all text-[15px] font-bold text-[var(--wk-ink)]">{user.email}</p>
          <p className={`mt-1 ${muted}`}>{t.loginText}</p>
        </section>

        <section className={card} aria-labelledby="account-payments">
          <h2 id="account-payments" className={cardTitle}>{t.paymentsTitle}</h2>
          {orders.length === 0 ? (
            <p className={`mt-3 ${muted}`}>{t.paymentsEmpty}</p>
          ) : (
            <ul className="mt-3 divide-y divide-[var(--wk-border)]">
              {orders.map((order) => {
                const cvTitle = order.cvId ? cvTitles.get(order.cvId) : undefined;
                return (
                  <li key={order.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3">
                    <div className="min-w-0">
                      <p className="text-[15px] font-bold text-[var(--wk-ink)]">{t.product[order.product] ?? t.otherProduct}</p>
                      <p className="text-[13px] text-[var(--wk-ink-muted)]">
                        {order.paidAt ? dateFormat.format(order.paidAt) : null}
                        {order.cvId ? <> · {cvTitle ? (
                          <Link href={`${paths.editorBase}?id=${encodeURIComponent(order.cvId)}`} className="font-semibold text-[var(--wk-primary)] underline underline-offset-2">{cvTitle}</Link>
                        ) : t.deletedCv}</> : null}
                      </p>
                    </div>
                    {order.amountCents != null ? <p className="text-[15px] font-bold tabular-nums text-[var(--wk-ink)]">{money(order.amountCents, order.currency)}</p> : null}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className={card} aria-labelledby="account-language">
          <h2 id="account-language" className={cardTitle}>{t.languageTitle}</h2>
          <p className={`mt-1 ${muted}`}>{t.languageText}</p>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-labelledby="account-language">
            {(["nl", "en"] as const).map((option) => (
              <Link
                key={option}
                href={appPaths(option).account}
                aria-current={option === locale ? "true" : undefined}
                lang={option}
                className={`inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-bold transition-colors ${option === locale
                  ? "border-[var(--wk-primary)] bg-[var(--wk-primary)] text-[var(--wk-primary-contrast)]"
                  : "border-[var(--wk-border-strong)] bg-white text-[var(--wk-ink)] hover:border-[var(--wk-primary)]"}`}
              >
                {option === "nl" ? "Nederlands" : "English"}
              </Link>
            ))}
          </div>
        </section>

        <section className={card} aria-labelledby="account-logout">
          <h2 id="account-logout" className={cardTitle}>{t.logoutTitle}</h2>
          <p className={`mt-1 ${muted}`}>{t.logoutText}</p>
          <AccountLogoutButton locale={locale} />
        </section>

        <section className={card} aria-labelledby="account-delete">
          <h2 id="account-delete" className={cardTitle}>{t.deleteTitle}</h2>
          <p className={`mt-1 ${muted}`}>{t.deleteText}</p>
          <a
            href={`mailto:contact@werkcv.nl?subject=${encodeURIComponent(t.deleteSubject)}`}
            className="mt-4 inline-flex min-h-11 items-center rounded-full border border-[var(--wk-border-strong)] bg-white px-5 text-sm font-bold text-[var(--wk-danger)] hover:bg-[var(--wk-danger-soft)]"
          >
            {t.deleteLink}
          </a>
        </section>
      </main>
    </AppShell>
  );
}
