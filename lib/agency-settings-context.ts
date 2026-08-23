import { cache } from "react";
import { getAgencyAccessForUser } from "@/lib/agency-access";
import { getCurrentUser } from "@/lib/auth";

export const getAgencySettingsContext = cache(async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  const access = await getAgencyAccessForUser(user.id);
  return { user, access };
});
