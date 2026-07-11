import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";

const roleExamples = [
  {
    href: "/en/english-cv-example-software-engineer-netherlands",
    label: "Software Engineer",
    body: "Backend, cloud, technical impact, and measurable delivery bullets.",
  },
  {
    href: "/en/english-cv-example-data-engineer-netherlands",
    label: "Data Engineer",
    body: "Pipelines, data quality, cloud platforms, and business impact.",
  },
  {
    href: "/en/english-cv-example-data-analyst-netherlands",
    label: "Data Analyst",
    body: "SQL, BI dashboards, data quality, stakeholder reporting, and decisions.",
  },
  {
    href: "/en/english-cv-example-project-manager-netherlands",
    label: "Project Manager",
    body: "Budgets, risks, teams, governance, delivery scope, and outcomes.",
  },
  {
    href: "/en/english-cv-example-business-analyst-netherlands",
    label: "Business Analyst",
    body: "Requirements, process models, Jira, UAT, and measurable change.",
  },
  {
    href: "/en/english-cv-example-product-manager-netherlands",
    label: "Product Manager",
    body: "Discovery, roadmap decisions, delivery, launch, and product metrics.",
  },
  {
    href: "/en/english-cv-example-customer-support-netherlands",
    label: "Customer Support",
    body: "CRM, tickets, service quality, escalations, and language levels.",
  },
  {
    href: "/en/english-cv-example-finance-accounting-netherlands",
    label: "Finance / Accounting",
    body: "Reporting, month-end close, ERP, reconciliations, and audit support.",
  },
  {
    href: "/en/english-cv-example-logistics-warehouse-netherlands",
    label: "Logistics / Warehouse",
    body: "WMS, order picking, safety, shift availability, and productivity.",
  },
  {
    href: "/en/english-cv-example-nurse-netherlands",
    label: "Nurse",
    body: "BIG registration, clinical skills, EHR, departments, and patient care.",
  },
];

type EnglishRoleExampleBandProps = {
  trackingLocation: string;
  title?: string;
  description?: string;
};

export default function EnglishRoleExampleBand({
  trackingLocation,
  title = "Start from the role closest to your target job",
  description = "A role example is faster than a blank template. Open the closest CV, review the structure, then use it in the editor with your own details.",
}: EnglishRoleExampleBandProps) {
  return (
    <section className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <div className="max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">
          Role examples
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-950 md:text-3xl">{title}</h2>
        <p className="mt-2 text-base leading-relaxed text-slate-700">{description}</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roleExamples.map((example) => (
          <TrackedLandingLink
            key={example.href}
            href={example.href}
            trackingLocation={trackingLocation}
            trackingLabel={`role_example_${example.label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`}
            className="block border-2 border-black bg-[#FFFEF9] p-4 transition-colors hover:bg-[#E9FFFC]"
          >
            <h3 className="text-lg font-black text-slate-950">{example.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{example.body}</p>
            <span className="mt-4 inline-block text-sm font-black text-teal-700 underline decoration-2 underline-offset-4">
              Open example
            </span>
          </TrackedLandingLink>
        ))}
      </div>
    </section>
  );
}
