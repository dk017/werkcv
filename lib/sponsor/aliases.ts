// Brands that the IND register lists under a legal name the matcher cannot derive from the brand, keyed by KvK number
// so a renamed register entry still matches. Each KvK was checked against the register of 5 October 2026; the
// golden-set test fails when one disappears from a newer register, so the list is reviewed rather than going stale.
//
// Only add a brand here when the legal name really is a different word (PwC, KLM, Ayvens) or when one entity is the
// employer for the whole brand (KPMG Staffing & Facility Services, NN Personeel). Spelling differences ("Suitsupply"
// against "Suit Supply B.V.") and extra words ("Tommy Hilfiger Europe B.V.") are matched without an alias.

import { coreName } from "./register";
import type { AliasKeys } from "./employer-match";

export type SponsorAlias = {
  brand: string;
  /** Names as job sites show them; matched on the distinctive part of the name. */
  names: string[];
  /** LinkedIn company page slugs (linkedin.com/company/<slug>). */
  slugs?: string[];
  /** KvK numbers of the recognised entities, with the legal name as the register lists it. */
  entities: Record<string, string>;
};

export const SPONSOR_ALIASES: SponsorAlias[] = [
  {
    brand: "ING",
    names: ["ING", "ING Nederland", "ING Netherlands"],
    slugs: ["ing"],
    entities: { "33031431": "ING Bank N.V.", "27193847": "ING Bank Personeel B.V.", "33231073": "ING Groep N.V." },
  },
  { brand: "Rabobank", names: ["Rabobank", "Rabobank Nederland"], slugs: ["rabobank"], entities: { "30046259": "Coöperatieve Rabobank U.A." } },
  {
    brand: "PwC",
    names: ["PwC", "PwC Nederland", "PwC Netherlands", "PricewaterhouseCoopers"],
    slugs: ["pwc", "pwc-nederland"],
    entities: {
      "34180289": "PricewaterhouseCoopers B.V.",
      "34180285": "PricewaterhouseCoopers Accountants N.V.",
      "34180287": "PricewaterhouseCoopers Advisory N.V.",
      "34180284": "PricewaterhouseCoopers Belastingadviseurs N.V.",
    },
  },
  { brand: "KPMG", names: ["KPMG", "KPMG Nederland", "KPMG Netherlands"], slugs: ["kpmg", "kpmg-nederland"], entities: { "34153861": "KPMG Staffing & Facility Services B.V." } },
  {
    brand: "Deloitte",
    names: ["Deloitte", "Deloitte Nederland", "Deloitte Netherlands"],
    slugs: ["deloitte", "deloitte-nederland"],
    entities: {
      "24362837": "Deloitte Group Support Center B.V.",
      "24362853": "Deloitte Accountants",
      "57666954": "Deloitte Accountancy & Advies B.V.",
      "33259541": "Deloitte Consultative Services B.V.",
      "24362840": "Deloitte Tax & Legal B.V.",
    },
  },
  { brand: "AWS", names: ["AWS", "Amazon Web Services", "Amazon Web Services (AWS)"], slugs: ["amazon-web-services"], entities: { "68579780": "Amazon Web Services EMEA SARL, Dutch Branch" } },
  { brand: "Meta", names: ["Meta", "Facebook"], slugs: ["meta", "facebook"], entities: { "51401282": "Facebook Netherlands B.V." } },
  { brand: "Action", names: ["Action"], slugs: ["action-nederland", "action"], entities: { "50969838": "Action Service & Distributie" } },
  {
    brand: "KLM",
    names: ["KLM", "KLM Royal Dutch Airlines", "Air France-KLM", "Air France KLM"],
    slugs: ["klm", "klm-royal-dutch-airlines"],
    entities: { "33014286": "Koninklijke Luchtvaart Maatschappij N.V." },
  },
  { brand: "NN", names: ["NN Group", "NN", "Nationale-Nederlanden"], slugs: ["nn-group", "nationale-nederlanden"], entities: { "27193814": "NN Personeel B.V.", "52403424": "NN Insurance Eurasia N.V." } },
  { brand: "Salesforce", names: ["Salesforce"], slugs: ["salesforce"], entities: { "30211409": "SFDC Netherlands B.V." } },
  { brand: "Elastic", names: ["Elastic"], slugs: ["elastic-co"], entities: { "54656230": "elasticsearch B.V." } },
  { brand: "Miro", names: ["Miro"], slugs: ["mirohq"], entities: { "71057153": "RealtimeBoard" } },
  { brand: "Bird (MessageBird)", names: ["MessageBird"], slugs: ["messagebird", "bird-messagebird"], entities: { "51874474": "Messagebird B.V." } },
  {
    brand: "dsm-firmenich",
    names: ["dsm-firmenich", "DSM", "Royal DSM"],
    slugs: ["dsm-firmenich", "royaldsm"],
    entities: { "14022069": "Koninklijke DSM N.V.", "14028072": "DSM NL Services B.V." },
  },
  { brand: "Ayvens", names: ["Ayvens", "LeasePlan"], slugs: ["ayvens", "leaseplan"], entities: { "39043990": "LeasePlan Global B.V.", "69780625": "LeasePlan Digital B.V." } },
  {
    brand: "Just Eat Takeaway.com",
    names: ["Just Eat Takeaway.com", "Just Eat Takeaway", "Takeaway.com", "Thuisbezorgd.nl", "Thuisbezorgd"],
    slugs: ["just-eat-takeaway-com", "thuisbezorgd-nl"],
    entities: {
      "64441725": "Takeaway.com Group B.V.",
      "64473716": "Takeaway.com Central Core B.V.",
      "69769753": "Takeaway.com European Operations B.V.",
      "90056744": "Takeaway.com Express Dutch Operations B.V.",
      "78349567": "Takeaway.com Express Holding B.V.",
      "67982778": "Takeaway.com Payments B.V.",
    },
  },
  { brand: "Tesla", names: ["Tesla"], slugs: ["tesla-motors"], entities: { "52601196": "Tesla Motors Netherlands B.V.", "64962482": "Tesla International B.V.", "61192066": "Tesla Financial Services Holdings B.V." } },
  { brand: "Eneco", names: ["Eneco"], slugs: ["eneco"], entities: { "24296168": "Eneco Zakelijk", "90411285": "Eneco Diamond Hydrogen B.V." } },
  { brand: "Boskalis", names: ["Boskalis", "Royal Boskalis"], slugs: ["boskalis"], entities: { "23011424": "Baggermaatschappij Boskalis B.V.", "24387623": "Boskalis Subsea Cables B.V." } },
  { brand: "Van Oord", names: ["Van Oord"], slugs: ["van-oord"], entities: { "11052639": "Van Oord Personeels B.V." } },
  { brand: "HCLTech", names: ["HCLTech", "HCL Tech", "HCL"], slugs: ["hcltech"], entities: { "58805206": "HCL Technologies B.V." } },
  { brand: "Kruidvat", names: ["Kruidvat", "A.S. Watson", "Trekpleister", "ICI PARIS XL"], slugs: ["kruidvat", "a-s-watson-group"], entities: { "31035585": "A.S. Watson (Health & Beauty Continental Europe) B.V." } },
  { brand: "LexisNexis", names: ["LexisNexis", "RELX"], slugs: ["lexisnexis", "relx"], entities: { "09002289": "LexisNexis Business Information Solutions B.V." } },
  { brand: "Jumbo", names: ["Jumbo", "Jumbo Supermarkten"], slugs: ["jumbo-supermarkten"], entities: { "16044409": "Jumbo Supermarkt" } },
  { brand: "H&M", names: ["H&M", "H&M Group", "H & M"], slugs: ["h&m", "hm"], entities: { "33208311": "H & M Hennes & Mauritz Netherlands B.V.", "73243299": "H&M Hennes & Mauritz Services B.V." } },
  { brand: "Rituals", names: ["Rituals", "Rituals Cosmetics"], slugs: ["rituals-cosmetics"], entities: { "34136394": "Rituals Cosmetics Enterprise B.V.", "59751061": "Rituals Cosmetics E-commerce B.V." } },
  {
    brand: "TomTom",
    names: ["TomTom"],
    slugs: ["tomtom"],
    entities: {
      "34076599": "TomTom International B.V.",
      "16079560": "TomTom Global Content B.V.",
      "63035669": "TomTom Navigation B.V.",
      "34236439": "TomTom Sales B.V.",
      "63030764": "TomTom Traffic B.V.",
    },
  },
  { brand: "Ahold Delhaize", names: ["Ahold Delhaize", "Ahold"], slugs: ["ahold-delhaize"], entities: { "61640220": "Ahold Delhaize European Business Services B.V.", "61639699": "Ahold Delhaize GSO B.V." } },
  { brand: "Nutricia (Danone)", names: ["Danone", "Nutricia", "Danone Nutricia"], slugs: ["danone", "nutricia"], entities: { "27090766": "Danone Nutricia Nederland B.V.", "27090548": "N.V. Nutricia", "09096817": "Danone Global Research & Innovation Center B.V." } },
  { brand: "J.P. Morgan", names: ["JPMorgan Chase", "JPMorganChase", "J.P. Morgan", "JPMorgan"], slugs: ["jpmorganchase", "jpmorgan"], entities: { "72610220": "J.P. Morgan SE Amsterdam Branch" } },
  { brand: "Citi", names: ["Citi", "Citibank", "Citigroup"], slugs: ["citi"], entities: { "64729206": "Citibank Europe Public Limited Company Netherlands Branch" } },
  { brand: "bol", names: ["bol", "bol.com"], slugs: ["bol-com"], entities: { "32147382": "Bol.com B.V." } },
  {
    brand: "ECT (Hutchison Ports)",
    names: ["ECT", "ECT Rotterdam", "Europe Container Terminals", "Hutchison Ports ECT Rotterdam"],
    slugs: ["ect"],
    entities: { "24328090": "ECT Delta Terminal B.V." },
  },
  { brand: "Huisman", names: ["Huisman", "Huisman Equipment"], slugs: ["huisman"], entities: { "55783368": "Huisman Personnel Services B.V.", "84355212": "Huisman Fabrication Personnel B.V.", "10031181": "Huisman Etech Experts B.V." } },
];

/** The alias keys the matcher looks up: "slug:<slug>" and "name:<core name>", each to KvK numbers. */
export function compileAliases(aliases: SponsorAlias[] = SPONSOR_ALIASES): AliasKeys {
  const keys: AliasKeys = {};
  const add = (key: string, kvks: string[]) => {
    keys[key] = Array.from(new Set([...(keys[key] ?? []), ...kvks]));
  };
  for (const alias of aliases) {
    const kvks = Object.keys(alias.entities);
    for (const name of alias.names) add(`name:${coreName(name)}`, kvks);
    for (const slug of alias.slugs ?? []) add(`slug:${slug.toLowerCase()}`, kvks);
  }
  return keys;
}
