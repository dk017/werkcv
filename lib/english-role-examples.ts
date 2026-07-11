import type { EnglishRoleCvExamplePageProps } from "@/app/en/components/EnglishRoleCvExamplePage";
import type { CVData } from "@/lib/cv";

type RoleConfig = EnglishRoleCvExamplePageProps & { articleDescription: string };

type CvInput = {
  name: string; title: string; summary: string; location: string;
  current: { role: string; company: string; location: string; start: string; highlights: string[] };
  previous: { role: string; company: string; location: string; start: string; end: string; highlights: string[] };
  degree: string; school: string; skills: string[]; properties: string[];
};

function makeCV(input: CvInput): CVData {
  return {
    personal: {
      name: input.name, title: input.title, resumeLanguage: "en",
      email: `${input.name.toLowerCase().replace(/[^a-z]+/g, ".").replace(/\.$/, "")}@example.com`,
      phone: "+31 6 2345 6789", location: input.location, address: "", postalCode: "",
      summary: input.summary, birthDate: "", birthPlace: "", nationality: "", driversLicense: "",
      gender: "", maritalStatus: "", linkedIn: "linkedin.com/in/example-profile", github: "", website: "", photo: "",
    },
    experience: [
      { ...input.current, end: "Present", description: "" },
      { ...input.previous, description: "" },
    ],
    education: [{ degree: input.degree, school: input.school, location: input.location.split(",")[0], start: "2015", end: "2019", description: "" }],
    skills: input.skills.map((name, index) => ({ name, level: index < 4 ? 5 : 4 })),
    languages: [{ name: "English", level: "Fluent" }, { name: "Dutch", level: "Basic" }],
    internships: [], interests: [], properties: input.properties, courses: [], awards: [], references: [], sideActivities: [], customSections: [],
  };
}

const commonSources = [
  { label: "Work in NL - CV guidance", href: "https://www.workinnl.nl/en/employment/cv-en/default.aspx", note: "Official guidance on clear, concise CVs for work in the Netherlands." },
  { label: "Europass - Create your CV", href: "https://europa.eu/europass/en/create-europass-cv", note: "European guidance on tailoring CV content and presenting recent experience first." },
  { label: "WerkCV English templates", href: "https://werkcv.nl/en/templates", note: "English templates connected to the Netherlands-focused editor flow." },
];

export const englishRoleExamples: Record<"dataAnalyst" | "projectManager" | "businessAnalyst" | "productManager", RoleConfig> = {
  dataAnalyst: {
    roleSlug: "data-analyst", pagePath: "/en/english-cv-example-data-analyst-netherlands",
    eyebrow: "English CV example for analytics roles", h1: "Data analyst CV example for jobs in the Netherlands",
    intro: "Start from a realistic English data analyst CV showing SQL, Power BI, data quality, stakeholder reporting, and decisions improved by analysis.",
    articleDescription: "A practical English data analyst CV example for jobs in the Netherlands.",
    themeColor: "teal", templateId: "robust", colorThemeId: "modern-teal",
    sampleCV: makeCV({ name: "Aisha Rahman", title: "Data Analyst", location: "Amsterdam, Netherlands",
      summary: "Data analyst with 4 years of experience turning operational and customer data into decisions. Strong in SQL, Python, Power BI, Tableau, Excel, data quality, and stakeholder reporting, with a track record of reducing manual reporting and making performance risks visible earlier.",
      current: { role: "Data Analyst", company: "NorthSea Mobility B.V.", location: "Amsterdam", start: "Mar 2022", highlights: ["Built Power BI dashboards used by operations leaders across 5 markets, replacing 18 hours of manual weekly reporting.", "Analysed customer churn in SQL and Python, identifying onboarding gaps that informed a retention experiment with an 8% uplift.", "Created data-quality checks for commercial reporting, reducing recurring reconciliation issues by 35%.", "Presented monthly insights to product, finance, and customer-success stakeholders with clear actions and owners."] },
      previous: { role: "Junior Data Analyst", company: "Delta Retail Group", location: "Utrecht", start: "Sep 2019", end: "Feb 2022", highlights: ["Automated Excel and SQL sales reports for 40 stores.", "Built Tableau views for promotion and inventory performance.", "Documented metric definitions with finance and category teams."] },
      degree: "MSc Business Analytics", school: "University of Amsterdam", skills: ["SQL", "Power BI", "Python", "Excel", "Tableau", "Data quality", "Statistics", "Stakeholder reporting"], properties: ["Analytical", "Curious", "Clear communicator"] }),
    scanTitle: "What analytics hiring teams scan first", scanBody: "Show the tools you use, the business question you answered, and what changed because of your analysis.",
    scanChecks: ["Core tools: SQL, Python or R, Power BI or Tableau, and advanced Excel.", "Business impact: decisions, time saved, revenue protected, or process quality improved.", "Data scope: sources, volume, models, dashboards, experiments, or reporting cadence.", "Communication: stakeholders, recommendations, and adoption of your work.", "Language and location fit for the Netherlands role."],
    summaryLabel: "Target: data analyst, Netherlands", experienceTitle: "Data analyst bullets that connect tools to decisions", mistakesTitle: "Mistakes that weaken a data analyst CV",
    mistakes: ["Listing tools without showing a business outcome.", "Describing dashboards without users, decisions, or adoption.", "Leaving projects out when you have limited experience.", "Using unsupported percentages or invented metrics.", "Hiding language and location context."],
    bottomTitle: "Build from this data analyst example", bottomBody: "Open the example in the editor and replace the fictional details with your own analyses, tools, stakeholders, and outcomes.",
    sources: commonSources, faqs: [
      { question: "What should a data analyst CV show first?", answer: "Lead with SQL or analytics tools, business domain, strongest measurable outcome, and the type of stakeholders who used your work." },
      { question: "Should junior analysts include projects?", answer: "Yes. Show the question, dataset, method, tools, result, and a portfolio link when the work can be shared." },
      { question: "Can the CV be in English?", answer: "Yes for English-language vacancies and international teams. State your Dutch level honestly." },
    ], relatedLinks: [{ href: "/en/english-cv-example-data-engineer-netherlands", label: "Data engineer CV example" }, { href: "/en/dutch-cv-examples", label: "More English CV examples" }],
  },
  projectManager: {
    roleSlug: "project-manager", pagePath: "/en/english-cv-example-project-manager-netherlands",
    eyebrow: "English CV example for project roles", h1: "Project manager CV example for jobs in the Netherlands",
    intro: "Use a realistic English project manager CV with delivery scope, budgets, risks, stakeholders, and measurable outcomes.", articleDescription: "A practical English project manager CV example for jobs in the Netherlands.",
    themeColor: "blue", templateId: "professional", colorThemeId: "ocean-blue",
    sampleCV: makeCV({ name: "Daniel Mensah", title: "Project Manager", location: "Utrecht, Netherlands",
      summary: "Project manager with 7 years of experience delivering digital and operational change across international teams. Experienced in budget ownership, planning, RAID management, vendor coordination, Agile delivery, and executive reporting, with a record of bringing complex implementations back on schedule.",
      current: { role: "Project Manager", company: "Oranje Systems B.V.", location: "Utrecht", start: "Jan 2021", highlights: ["Delivered a €1.2M ERP rollout across 4 locations within the approved budget and revised nine-month timeline.", "Coordinated a 16-person team across operations, finance, IT, and two implementation partners.", "Introduced weekly RAID reviews that reduced unresolved critical dependencies from 14 to 3 before go-live.", "Built steering-committee reporting around milestones, budget variance, adoption, and operational readiness."] },
      previous: { role: "Project Coordinator", company: "Harbour Services Group", location: "Rotterdam", start: "Jun 2017", end: "Dec 2020", highlights: ["Maintained plans, budgets, actions, and vendor documentation for six concurrent projects.", "Coordinated user testing and training for 220 employees.", "Improved project handovers with a standard closure checklist."] },
      degree: "BSc Business Administration", school: "HU University of Applied Sciences Utrecht", skills: ["Project planning", "Budget management", "Risk management", "Stakeholder management", "Agile", "PRINCE2", "Vendor management", "Change management"], properties: ["Structured", "Decisive", "Collaborative"] }),
    scanTitle: "What project hiring teams scan first", scanBody: "Make project size, ownership, delivery method, risks, stakeholders, and outcomes visible without forcing the recruiter to infer them.",
    scanChecks: ["Project scope, budget, duration, team size, and locations.", "Your ownership versus the wider programme or sponsor role.", "Delivery methods such as Agile, waterfall, PRINCE2, or hybrid.", "Risk, dependency, vendor, governance, and change-management evidence.", "Outcomes: delivery, adoption, savings, quality, or operational readiness."],
    summaryLabel: "Target: project manager, Netherlands", experienceTitle: "Project bullets that prove delivery ownership", mistakesTitle: "Mistakes that weaken a project manager CV",
    mistakes: ["Listing meetings and plans without delivery outcomes.", "Leaving budget, team, timeline, and scope unclear.", "Claiming programme results you did not own.", "Overloading the CV with methodology terms.", "Using one generic CV across unrelated project sectors."],
    bottomTitle: "Build from this project manager example", bottomBody: "Replace the fictional projects with your own scope, governance, risks, stakeholders, and measurable delivery outcomes.", sources: commonSources,
    faqs: [{ question: "Which project metrics belong on a CV?", answer: "Use credible scope such as budget, team size, locations, timeline, adoption, savings, risk reduction, or delivery variance." }, { question: "Should I list PRINCE2 or Agile certifications?", answer: "Yes when current and relevant, but practical delivery evidence should remain more prominent." }, { question: "Is two pages acceptable?", answer: "Yes for experienced project managers when both pages remain relevant and easy to scan." }],
    relatedLinks: [{ href: "/en/english-cv-example-business-analyst-netherlands", label: "Business analyst CV example" }, { href: "/en/dutch-cv-examples", label: "More English CV examples" }],
  },
  businessAnalyst: {
    roleSlug: "business-analyst", pagePath: "/en/english-cv-example-business-analyst-netherlands",
    eyebrow: "English CV example for analysis roles", h1: "Business analyst CV example for jobs in the Netherlands",
    intro: "Start from an English business analyst CV that proves requirements work, process modelling, UAT, stakeholder alignment, and measurable improvement.", articleDescription: "A practical English business analyst CV example for jobs in the Netherlands.",
    themeColor: "emerald", templateId: "simple", colorThemeId: "modern-teal",
    sampleCV: makeCV({ name: "Sofia Costa", title: "Business Analyst", location: "Eindhoven, Netherlands",
      summary: "Business analyst with 5 years of experience translating operational needs into clear requirements, process models, user stories, and test scenarios. Strong in stakeholder workshops, BPMN, Jira, UAT, data analysis, and process improvement across technology and service environments.",
      current: { role: "Business Analyst", company: "Brabant Technology B.V.", location: "Eindhoven", start: "Aug 2021", highlights: ["Mapped order-to-service processes across 6 teams and designed a future-state workflow that reduced manual handoffs by 28%.", "Facilitated requirements workshops and converted findings into epics, user stories, acceptance criteria, and traceability records in Jira.", "Coordinated UAT with 35 business users, triaging defects and confirming readiness before release.", "Built process and KPI baselines used to prioritise the next automation backlog."] },
      previous: { role: "Junior Business Analyst", company: "Canal Insurance Services", location: "Amsterdam", start: "Jul 2019", end: "Jul 2021", highlights: ["Documented claims processes and business rules with operations and compliance teams.", "Supported gap analysis and regression testing for policy-system changes.", "Created weekly issue reporting for product owners and delivery leads."] },
      degree: "MSc Information Management", school: "Tilburg University", skills: ["Requirements gathering", "BPMN", "Jira", "UAT", "Process improvement", "SQL", "Stakeholder analysis", "User stories"], properties: ["Structured", "Diplomatic", "Detail-oriented"] }),
    scanTitle: "What business-analysis hiring teams scan first", scanBody: "Show how you moved from ambiguity to agreed requirements, validated change, and improved a process or decision.",
    scanChecks: ["Requirements techniques, workshops, interviews, and documentation.", "Process modelling, business rules, data analysis, and gap analysis.", "Delivery artefacts: epics, stories, acceptance criteria, and traceability.", "Testing: UAT planning, defect triage, and business readiness.", "Outcome evidence from the process or product change."],
    summaryLabel: "Target: business analyst, Netherlands", experienceTitle: "Business analyst bullets that show change impact", mistakesTitle: "Mistakes that weaken a business analyst CV",
    mistakes: ["Listing documents without explaining the change they enabled.", "Using BA jargon without business context.", "Leaving stakeholder complexity and decision ownership unclear.", "Confusing business analysis with generic data reporting.", "Omitting testing, adoption, or implementation outcomes."],
    bottomTitle: "Build from this business analyst example", bottomBody: "Adapt the example with your own processes, requirements methods, delivery artefacts, stakeholders, and outcomes.", sources: commonSources,
    faqs: [{ question: "What keywords matter for a business analyst CV?", answer: "Use truthful vacancy terms such as requirements gathering, BPMN, user stories, UAT, process improvement, stakeholder analysis, Jira, and SQL." }, { question: "Should I include diagrams or documentation samples?", answer: "Link to a sanitized portfolio only when confidentiality allows it; keep the CV itself easy to parse." }, { question: "How is this different from a data analyst CV?", answer: "Business analyst CVs emphasize requirements and process change; data analyst CVs emphasize datasets, methods, tools, and insight." }],
    relatedLinks: [{ href: "/en/english-cv-example-project-manager-netherlands", label: "Project manager CV example" }, { href: "/en/english-cv-example-data-analyst-netherlands", label: "Data analyst CV example" }],
  },
  productManager: {
    roleSlug: "product-manager", pagePath: "/en/english-cv-example-product-manager-netherlands",
    eyebrow: "English CV example for product roles", h1: "Product manager CV example for jobs in the Netherlands",
    intro: "Use an English product manager CV that connects discovery, prioritisation, delivery, go-to-market work, and product metrics.", articleDescription: "A practical English product manager CV example for jobs in the Netherlands.",
    themeColor: "amber", templateId: "professional", colorThemeId: "warm-earth",
    sampleCV: makeCV({ name: "Lucas Pereira", title: "Product Manager", location: "Amsterdam, Netherlands",
      summary: "Product manager with 6 years of experience building B2B SaaS products from discovery through launch and iteration. Strong in customer research, roadmap prioritisation, product analytics, cross-functional delivery, and go-to-market alignment, with measurable improvements in activation and retention.",
      current: { role: "Product Manager", company: "Canal SaaS B.V.", location: "Amsterdam", start: "Feb 2021", highlights: ["Led discovery and delivery for a self-service onboarding flow that increased 30-day activation from 54% to 68%.", "Prioritised a quarterly roadmap with product, engineering, design, sales, and customer success using outcome-based goals.", "Combined interviews, funnel analysis, and support data to identify the highest-impact adoption barriers.", "Launched packaging changes with go-to-market teams, improving expansion revenue from existing accounts by 11%."] },
      previous: { role: "Associate Product Manager", company: "Delta Commerce", location: "Rotterdam", start: "Sep 2018", end: "Jan 2021", highlights: ["Owned backlog and acceptance criteria for checkout and account features.", "Ran customer interviews and usability tests with design.", "Built release reporting around adoption, conversion, and support volume."] },
      degree: "MSc Business Information Management", school: "Erasmus University Rotterdam", skills: ["Product discovery", "Roadmapping", "Product analytics", "Stakeholder management", "Agile delivery", "A/B testing", "Go-to-market", "Customer research"], properties: ["Customer-focused", "Commercial", "Outcome-driven"] }),
    scanTitle: "What product hiring teams scan first", scanBody: "A product CV should show which problem you owned, how you made decisions, and what changed in customer or business metrics.",
    scanChecks: ["Product scope, customer segment, business model, and lifecycle stage.", "Discovery methods and evidence used for decisions.", "Cross-functional ownership with engineering, design, data, and go-to-market teams.", "Metrics such as activation, retention, conversion, adoption, or revenue.", "Clear distinction between team outcomes and your contribution."],
    summaryLabel: "Target: product manager, Netherlands", experienceTitle: "Product bullets that connect decisions to outcomes", mistakesTitle: "Mistakes that weaken a product manager CV",
    mistakes: ["Writing a feature list instead of showing product outcomes.", "Claiming revenue or growth without explaining contribution.", "Leaving customer research and prioritisation invisible.", "Listing every framework while hiding decision quality.", "Using a generic summary across unrelated product domains."],
    bottomTitle: "Build from this product manager example", bottomBody: "Replace the fictional details with your own product scope, decisions, cross-functional work, and defensible metrics.", sources: commonSources,
    faqs: [{ question: "Which metrics should product managers include?", answer: "Choose metrics you genuinely influenced, such as activation, retention, adoption, conversion, revenue, support volume, or delivery time." }, { question: "Should a product CV include a portfolio?", answer: "It can help when it explains decisions and outcomes without exposing confidential information." }, { question: "How long should a product manager CV be?", answer: "One page can work early in your career; two focused pages are acceptable for several relevant product roles." }],
    relatedLinks: [{ href: "/en/english-cv-example-business-analyst-netherlands", label: "Business analyst CV example" }, { href: "/en/english-cv-example-software-engineer-netherlands", label: "Software engineer CV example" }],
  },
};
