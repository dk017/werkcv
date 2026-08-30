import { permanentRedirect } from "next/navigation";

export default function LegacyOneTimePaymentPage() {
  permanentRedirect("/prijzen");
}
