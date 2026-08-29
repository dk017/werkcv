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
    href: "/en/english-cv-example-forklift-reach-truck-netherlands",
    label: "Forklift / Reach Truck",
    body: "Equipment, certificates, safe loading, WMS, and shift evidence.",
  },
  {
    href: "/en/english-cv-example-order-picker-fulfilment-netherlands",
    label: "Order Picker / Fulfilment",
    body: "Picking, packing, returns, scanners, quality checks, and shifts.",
  },
  {
    href: "/en/english-cv-example-logistics-coordinator-netherlands",
    label: "Logistics Coordinator",
    body: "Transport planning, carriers, shipment records, and exceptions.",
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
    <section className="rounded-[var(--wk-radius-lg,22px)] border border-[var(--wk-border,#d7ded9)] bg-[var(--wk-surface,#ffffff)] p-6 shadow-[var(--wk-shadow-md,0_14px_34px_rgb(24_33_31/0.08))]">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-ink-muted,#606a67)]">
          Role examples
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[var(--wk-ink,#18211f)] md:text-3xl">{title}</h2>
        <p className="mt-2 text-base leading-7 text-[var(--wk-ink-muted,#606a67)]">{description}</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roleExamples.map((example) => (
          <TrackedLandingLink
            key={example.href}
            href={example.href}
            trackingLocation={trackingLocation}
            trackingLabel={`role_example_${example.label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`}
            className="block rounded-[var(--wk-radius-md,14px)] border border-[var(--wk-border,#d7ded9)] bg-[var(--wk-surface-subtle,#f0f3ef)] p-4 transition-colors hover:bg-[var(--wk-accent-soft,#dff7f3)] hover:border-[var(--wk-primary,#173f38)]"
          >
            <h3 className="text-lg font-semibold text-[var(--wk-ink,#18211f)]">{example.label}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted,#606a67)]">{example.body}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-[var(--wk-primary,#173f38)] underline underline-offset-4">
              Open example
            </span>
          </TrackedLandingLink>
        ))}
      </div>
    </section>
  );
}
