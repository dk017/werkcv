// The data file the Chrome extension ships and refreshes daily: the register as [name, KvK] pairs, the brand aliases,
// the salary thresholds and the CSS selectors per job site. Data only, never code, so a refresh stays within the
// Manifest V3 rule against remotely hosted code.

import { compileAliases } from "./aliases";
import type { AliasKeys } from "./employer-match";
import type { SponsorRegister } from "./register";
import { SALARY_THRESHOLDS, type SalaryThresholds } from "./thresholds";
import { SITE_SELECTORS, type SiteSelectors } from "./extension-selectors";

export const EXTENSION_DATA_VERSION = 1;

export type ExtensionData = {
  version: number;
  registerDate: string | null;
  generatedAt: string;
  entries: [string, string][];
  aliases: AliasKeys;
  thresholds: Record<string, SalaryThresholds>;
  selectors: Record<string, SiteSelectors>;
};

export function buildExtensionData(register: SponsorRegister, now = new Date()): ExtensionData {
  return {
    version: EXTENSION_DATA_VERSION,
    registerDate: register.registerDate,
    generatedAt: now.toISOString(),
    entries: register.entries.map((entry) => [entry.name, entry.kvk]),
    aliases: compileAliases(),
    thresholds: SALARY_THRESHOLDS,
    selectors: SITE_SELECTORS,
  };
}
