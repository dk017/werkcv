import type { SeoGuidePage } from "./types";

const datePublished = "2026-08-16";
const dateModified = "2026-08-16";

export const englishQuestionGuides: SeoGuidePage[] = [
  {
    slug: "one-page-cv-netherlands",
    locale: "en",
    title: "Do Dutch Employers Prefer a One-Page or Two-Page CV?",
    description:
      "A practical decision guide for choosing one or two CV pages in the Netherlands, with examples for students, graduates, technical specialists, managers and researchers.",
    metaTitle: "One-Page or Two-Page CV in the Netherlands?",
    metaDesc:
      "Dutch employers do not use a universal one-page rule. Use one page for focused early-career profiles and two when the second page adds relevant evidence.",
    keywords: [
      "one-page cv netherlands",
      "two-page cv netherlands",
      "how long should a cv be netherlands",
      "dutch cv length",
    ],
    intro:
      "Dutch employers do not use a universal one-page rule. One page is normally enough for students, graduates and candidates with a short or focused career. Two pages are accepted when page two adds relevant experience, projects, certifications or technical evidence. Relevance matters more than forcing useful evidence into a smaller font or cramped layout.",
    sections: [
      {
        id: "decision-table",
        title: "Choose the length that protects your strongest evidence",
        paragraphs: [
          "Treat page count as a consequence of relevance, not as a target to hit at any cost. Start with the vacancy, identify the evidence a reader needs, and then remove repetition before you reduce type size or margins.",
        ],
        comparisonTable: {
          columns: ["Profile", "Start with", "A second page adds value when"],
          rows: [
            { label: "Student", primary: "One page with education, relevant projects, skills and availability.", secondary: "A substantial research project or several relevant placements need room." },
            { label: "Recent graduate", primary: "One page focused on degree, internship, thesis and project evidence.", secondary: "Several directly related projects or a first professional role add distinct proof." },
            { label: "Early-career applicant", primary: "One page if the role history is short and focused.", secondary: "Two or more relevant roles contain different achievements that would otherwise be lost." },
            { label: "Experienced professional", primary: "One or two pages, depending on the role and recent evidence.", secondary: "Recent scope, outcomes, certifications or specialist tools cannot be summarised honestly." },
            { label: "Senior manager", primary: "Usually two pages when scope, leadership and governance are material.", secondary: "The second page explains scale, teams, transformation or board-level responsibilities." },
            { label: "Technical consultant", primary: "One page for a narrow stack; two for multiple relevant projects or certifications.", secondary: "Client context, architecture, delivery evidence and certifications are all required for fit." },
            { label: "Academic or research applicant", primary: "Use the employer or institution instructions first.", secondary: "Publications, grants, teaching or methods are explicitly relevant and need a separate page." },
          ],
        },
      },
      {
        id: "shorten",
        title: "What to remove first when shortening a CV",
        paragraphs: [
          "Shortening should reduce low-signal detail, not erase the proof that makes you credible. Make a copy before editing so you can restore context for a different vacancy.",
        ],
        bullets: [
          "Repeated responsibilities that say the same thing as a stronger achievement bullet.",
          "Older roles that no longer support the target role; summarise them in one line when needed.",
          "Generic profile adjectives such as motivated, hard-working or results-driven without evidence.",
          "Long lists of tools, modules or soft skills that are not used in the vacancy.",
          "Personal details, hobbies or references that the employer did not request.",
        ],
        exampleTitle: "Before and after",
        exampleItems: [
          "Before: Responsible for weekly reporting, stakeholder meetings and many process improvements across the team.",
          "After: Built weekly Power BI reporting used by three team leads to prioritise backlog and remove duplicate manual checks.",
        ],
      },
      {
        id: "second-page",
        title: "When a second page adds value",
        paragraphs: [
          "Page two is useful when it adds a new type of evidence rather than repeating page one. A senior technical role may need project scope and systems; a research role may need publications; a manager may need team scale and transformation context.",
          "Keep the strongest role fit on page one. The second page should answer likely follow-up questions, not postpone the main case for your candidacy.",
        ],
        bullets: [
          "A second page contains relevant achievements, not a complete career archive.",
          "Each section has a clear heading and continues the same date and bullet style.",
          "The last third of the second page is not filled with unrelated keywords or tiny text.",
          "The vacancy or application instructions do not prescribe a shorter format.",
        ],
      },
      {
        id: "outlines",
        title: "One-page and two-page outline examples",
        paragraphs: [
          "These are starting structures, not mandatory templates. Change the order when the vacancy makes another piece of evidence more important.",
        ],
        exampleTitle: "One-page outline",
        exampleItems: [
          "Header and target title → three-line profile → two or three recent roles with two or three bullets each → education or thesis → selected skills and languages → availability or work-authorisation note when relevant.",
          "Two-page outline: page one uses the same structure; page two adds selected projects, certifications, publications or earlier relevant experience with enough context to understand the result.",
        ],
      },
      {
        id: "exceptions",
        title: "Exceptions and practical checks",
        paragraphs: [
          "An employer's application instructions take priority. Some academic, public-sector or highly regulated applications request a CV, resume or portfolio with a specific length or additional evidence. Follow that instruction even when your usual format is different.",
          "If the document becomes two pages because of large gaps, excessive spacing or a decorative sidebar, fix the layout before deciding that you need more content. Export the PDF, select all text and paste it into a plain-text editor to check that the reading order remains understandable.",
        ],
      },
    ],
    checklist: [
      "The first half page makes the target role and strongest evidence clear.",
      "Every second-page section supports the vacancy rather than filling space.",
      "Older or unrelated work is summarised or removed.",
      "The employer's stated length and file instructions are followed.",
      "The exported PDF remains readable and text-selectable.",
    ],
    faq: [
      {
        question: "Do Dutch employers prefer a one-page or two-page CV?",
        answer:
          "There is no universal Dutch one-page rule. One page is usually enough for a focused student, graduate or early-career profile. Two pages are reasonable when the second page adds relevant experience, projects, certifications, publications or technical evidence.",
      },
      {
        question: "What should I cut first to fit one page?",
        answer:
          "Remove repeated responsibilities, generic adjectives, low-relevance older detail and long skill lists before removing strong achievements or role-specific evidence.",
      },
      {
        question: "Is a two-page CV too long for a Dutch job application?",
        answer:
          "Not when both pages contain relevant, readable evidence. It is unnecessarily long when the second page repeats page one, uses tiny type or includes detail unrelated to the vacancy.",
      },
      {
        question: "Should an academic CV follow the same one-page rule?",
        answer:
          "No. Academic and research applications often request publications, grants, teaching or methods. Follow the institution's instructions and keep the selection relevant to the role.",
      },
    ],
    relatedLinks: [
      { href: "/en/guides/cv-format-netherlands-english", title: "Netherlands CV format", description: "Set the section order before deciding how much evidence belongs on each page." },
      { href: "/en/guides/cv-for-international-students-netherlands", title: "International student CV", description: "Use a focused structure for study projects, internships and part-time work." },
      { href: "/en/expat-cv-netherlands", title: "Expat CV guide", description: "Connect page length with language, authorisation and Dutch-market positioning." },
      { href: "/en/templates", title: "English CV templates", description: "Compare readable layouts and check the exported page count." },
    ],
    sources: [
      { label: "Europass: Create your CV", href: "https://europass.europa.eu/en/create-europass-cv", note: "Supports tailoring a CV to the vacancy, focusing on relevant facts and keeping the document readable." },
      { label: "European Environment Agency: Europass CV instructions", href: "https://www.eea.europa.eu/about-us/jobs/application-documents/instructions_for_europass_cv.pdf", note: "Provides an official European example of keeping a CV concise, using two A4 pages as a usual upper guide and moving education earlier when experience is limited." },
    ],
    datePublished,
    dateModified,
    ctaTitle: "Build a focused Netherlands CV",
    ctaText: "Use a clean starting layout, then keep only the evidence that helps a Dutch employer understand your fit.",
    ctaHref: "/en/templates",
    ctaButtonLabel: "Compare English templates",
  },
  {
    slug: "startup-vs-corporate-cv-netherlands",
    locale: "en",
    title: "How Should You Tailor Your CV for Dutch Startup and Corporate Jobs?",
    description:
      "Learn how to adjust emphasis for Dutch startup and corporate applications without treating either category as a single hiring culture.",
    metaTitle: "How to Tailor Your CV for Dutch Startups vs Corporate Jobs",
    metaDesc:
      "Tailor a Dutch CV by role and organisation: show ownership and shipped work for startup contexts, or scale, governance and exact alignment for corporate roles.",
    keywords: [
      "startup cv netherlands",
      "corporate cv netherlands",
      "tailor cv dutch startup",
      "startup versus corporate cv",
    ],
    intro:
      "Dutch startups and corporate employers are not identical categories, so tailor the emphasis to the role, decision-makers and organisation. Startups often need evidence of ownership, speed, versatility and shipped work; corporates often need scope, governance, stakeholder management and domain depth. Keep facts unchanged, but choose the examples and keywords that make the relevant operating context clear.",
    sections: [
      {
        id: "comparison",
        title: "Adjust emphasis, not the truth",
        paragraphs: [
          "The same experience can be relevant to both audiences. The difference is which question you answer first: can this person take ownership in an uncertain environment, or can this person deliver reliably at scale within a defined system? Read the vacancy and company information before choosing a style.",
        ],
        comparisonTable: {
          columns: ["CV area", "Startup emphasis", "Corporate emphasis"],
          rows: [
            { label: "Profile summary", primary: "Ownership, learning speed, versatility and a concrete problem you have shipped.", secondary: "Exact role alignment, years or depth in the relevant domain and operating context." },
            { label: "Achievement language", primary: "Built, tested, launched, learned, iterated and removed a bottleneck.", secondary: "Improved, governed, standardised, scaled, reduced risk or delivered against a framework." },
            { label: "Breadth versus specialisation", primary: "Show a useful range while naming the problem you can own end to end.", secondary: "Lead with the specialist depth that matches the job family and level." },
            { label: "Skills", primary: "Prioritise tools you used to ship, measure or learn quickly.", secondary: "Prioritise recognised systems, methods, standards and role-specific capabilities." },
            { label: "Side projects", primary: "Include a shipped experiment, customer discovery or working prototype.", secondary: "Include only when it demonstrates a capability relevant to the role or team." },
            { label: "Leadership", primary: "Show influence without a formal title, ownership of decisions and team enablement.", secondary: "Show team size, governance, stakeholder alignment and accountability for outcomes." },
            { label: "Tools", primary: "Name the tools that show speed, collaboration and practical delivery.", secondary: "Name the tools or frameworks requested by the vacancy and used at meaningful scale." },
            { label: "Design", primary: "A little personality is fine when readability and evidence remain first.", secondary: "Use restrained, consistent formatting that fits a formal application route." },
            { label: "CV length", primary: "One focused page can work when the scope is recent and concentrated.", secondary: "Two pages can be useful when scale, governance or specialist depth needs evidence." },
            { label: "Keywords", primary: "Mirror the problem, customer, product or delivery language in the vacancy.", secondary: "Mirror the exact function, system, framework and domain terms used by the employer." },
            { label: "Work authorisation", primary: "State the route and start constraints briefly so a small team can assess them.", secondary: "Use a concise, factual line that helps HR apply the employer's process." },
            { label: "Portfolio or GitHub", primary: "Link to shipped work and explain your contribution in one line.", secondary: "Link only when it supports the role; keep the CV understandable without a click." },
          ],
        },
      },
      {
        id: "summaries",
        title: "Two profile-summary examples",
        paragraphs: [
          "Keep the facts consistent and change the emphasis. These examples use fictional experience so the distinction is clear without implying a universal startup or corporate formula.",
        ],
        exampleTitle: "Startup-focused summary",
        exampleItems: [
          "Product analyst who turns ambiguous customer problems into tested workflows. Built and shipped a self-serve onboarding experiment, combined SQL analysis with user interviews, and worked directly with product and engineering to move from idea to measurable release.",
          "Corporate-focused summary: Product analyst with five years in regulated financial services, specialising in customer analytics, governance and cross-functional delivery. Experienced in translating portfolio data into controlled experiments, executive reporting and repeatable operating processes.",
        ],
      },
      {
        id: "bullets",
        title: "Achievement bullets for each audience",
        paragraphs: [
          "A useful bullet names the context, action and outcome. Do not invent numbers because a startup or corporate reader may prefer them; use a clear scope or observable change when a metric is unavailable.",
        ],
        exampleTitle: "Startup-focused bullets",
        exampleItems: [
          "Interviewed 18 new users, redesigned onboarding questions and shipped a two-week experiment that reduced avoidable support requests.",
          "Owned the first reporting workflow from messy source data to a weekly dashboard used by product and customer success.",
          "Tested three pricing messages with a small launch cohort and documented the decision that informed the next release.",
          "Corporate-focused bullets: Standardised monthly risk reporting across four business units, reducing manual reconciliation and giving senior stakeholders one agreed view.",
          "Coordinated a migration with compliance, operations and technology teams, maintaining audit evidence while moving 12,000 records to the approved platform.",
          "Managed a cross-functional improvement programme with defined controls, milestones and stakeholder updates through to operational handover.",
        ],
      },
      {
        id: "same-experience",
        title: "Tailor the same experience without rewriting history",
        paragraphs: [
          "Suppose you improved a customer-support workflow. A startup version can lead with ownership, rapid testing and a shipped change. A corporate version can lead with process control, stakeholder alignment and repeatability. Both remain accurate when they describe the same work from a different decision-maker's perspective.",
        ],
        exampleTitle: "One experience, two openings",
        exampleItems: [
          "Startup opening: Took ownership of a fragmented support intake, tested a simpler triage flow with agents and shipped the first version in one sprint.",
          "Corporate opening: Redesigned support intake with operations and compliance stakeholders, documented controls and standardised triage across two service teams.",
        ],
      },
      {
        id: "classify",
        title: "Questions to classify the employer",
        paragraphs: [
          "Do not rely on a job title or a bright office photo. Use the vacancy, company site and interview information to answer these practical questions:",
        ],
        bullets: [
          "Is the role expected to define the problem, or mainly execute a defined process?",
          "Does the team describe product discovery and experimentation, or controls and operating standards?",
          "Will you work close to founders or a small leadership team, or through several formal stakeholder layers?",
          "Are the requested tools evidence of hands-on delivery, governance, scale or compliance?",
          "Does the vacancy ask for a portfolio, case study, certification, framework or regulated-domain experience?",
        ],
      },
      {
        id: "exceptions",
        title: "When the distinction does not apply",
        paragraphs: [
          "A scale-up may operate like a large corporate function, and a small family-owned company may have more formal processes than a funded startup. Some roles, such as finance, legal, security, healthcare or government work, have strict evidence requirements regardless of company size. Let the role and application instructions override the label.",
        ],
      },
    ],
    checklist: [
      "The first paragraph reflects the work the vacancy actually asks you to do.",
      "Bullets show ownership, scale, governance or delivery in the relevant balance.",
      "Tools and keywords match the vacancy without keyword stuffing.",
      "A portfolio or GitHub link explains your contribution and is not required to understand the CV.",
      "Work-authorisation wording is factual and concise.",
    ],
    faq: [
      {
        question: "Should my CV look different for a Dutch startup and a corporate employer?",
        answer:
          "The content should remain truthful, but the emphasis can change. Startups may need ownership, experimentation and shipped work; corporate teams may need scale, governance, domain depth and exact role alignment.",
      },
      {
        question: "Are startup employers always more interested in broad experience?",
        answer:
          "No. A startup can need deep expertise in a critical function, while a corporate team can value versatility. Read the vacancy and describe the evidence that matches the actual role.",
      },
      {
        question: "Should I use a creative design for a startup CV?",
        answer:
          "Use restrained branding only when it keeps the document readable and compatible with the application route. A startup does not automatically mean decorative formatting is useful.",
      },
      {
        question: "Do I need a portfolio or GitHub link?",
        answer:
          "Include one when it demonstrates work relevant to the role and explain your contribution. The CV should still make the main case without requiring the reader to click away.",
      },
    ],
    relatedLinks: [
      { href: "/en/english-speaking-companies-netherlands", title: "English-speaking companies", description: "Use employer context to decide how to localise your application." },
      { href: "/en/guides/cv-format-netherlands-english", title: "Netherlands CV format", description: "Keep the local structure stable while changing the evidence you emphasise." },
      { href: "/en/english-cv-example-software-engineer-netherlands", title: "Software engineer CV example", description: "See how technical delivery and tools can be shown without unsupported claims." },
      { href: "/en/english-cv-example-product-manager-netherlands", title: "Product manager CV example", description: "Compare product outcomes, stakeholder work and portfolio context." },
      { href: "/en/expat-cv-netherlands", title: "Expat CV guide", description: "Check language, authorisation and Dutch-market expectations." },
    ],
    sources: [
      { label: "Europass: Create your CV", href: "https://europass.europa.eu/en/create-europass-cv", note: "Supports tailoring the CV to the vacancy, focusing on relevant facts and using clear language." },
      { label: "EURES and Europass", href: "https://eures.europa.eu/jobseekers/europass_en", note: "Explains how Europass records skills, qualifications, work experience and achievements for applications across Europe." },
    ],
    datePublished,
    dateModified,
    ctaTitle: "Tailor the evidence, then build the CV",
    ctaText: "Keep one reliable source of experience and adjust the emphasis for the vacancy you are actually applying to.",
    ctaHref: "/en/editor?template=professional&startSource=en_guide_startup_vs_corporate",
    ctaButtonLabel: "Open the English editor",
  },
  {
    slug: "creative-cv-templates-netherlands",
    locale: "en",
    title: "Are Creative CV Templates Accepted by Dutch Employers?",
    description:
      "Learn when a creative CV is useful in the Netherlands, what ATS parsers may miss, and how to keep a visual application readable and testable.",
    metaTitle: "Are Creative CV Templates Accepted in the Netherlands?",
    metaDesc:
      "Creative CV templates can work for design and portfolio-led roles. For ATS-heavy applications, keep text selectable, headings clear and a conservative alternative ready.",
    keywords: [
      "creative cv template netherlands",
      "creative cv accepted dutch employers",
      "ats friendly creative cv",
      "portfolio cv netherlands",
    ],
    intro:
      "Creative CV templates can be accepted in the Netherlands, especially for design, branding, media and portfolio-led roles. For corporate, technical, operational and ATS-heavy applications, a clean text-based CV is safer. Restrained colour and typography can still show personality, but essential contact details, headings and achievements should remain selectable, readable and understandable without the graphics.",
    sections: [
      {
        id: "sector-table",
        title: "Choose the visual level by sector and route",
        paragraphs: [
          "There is no single creative-CV rule for every Dutch employer. Use the application route and the work itself as the decision point. A portfolio can carry visual expression more safely than a CV that hides its core information inside design elements.",
        ],
        comparisonTable: {
          columns: ["Sector or role", "Starting recommendation", "What to check"],
          rows: [
            { label: "Graphic design", primary: "Portfolio-led CV with restrained visual branding.", secondary: "Show process and outcomes in the portfolio; keep role, dates and contact text selectable." },
            { label: "UX/UI", primary: "Lightly branded CV plus a strong case-study portfolio.", secondary: "Make research, decisions and outcomes readable without relying on screenshots." },
            { label: "Marketing", primary: "Light branding is usually safer than a poster-like layout.", secondary: "Match the employer's tone and use results or campaign scope as proof." },
            { label: "Communications", primary: "Use typography and spacing to show judgement, not decoration.", secondary: "Check that copy remains easy to scan and that links are visible as text." },
            { label: "Software engineering", primary: "Clean text-first template for unknown portals; portfolio links optional.", secondary: "Test section order, skills and links in plain text; do not put code evidence only in images." },
            { label: "Finance", primary: "Conservative, text-based layout.", secondary: "Prioritise controls, analysis, systems and qualifications over visual novelty." },
            { label: "Legal", primary: "Conservative, highly readable layout.", secondary: "Follow the employer's document instructions and make dates and qualifications explicit." },
            { label: "Healthcare", primary: "Clean text-based CV with clear qualifications and registration where relevant.", secondary: "Do not let icons or colour obscure regulated credentials or work history." },
            { label: "Logistics", primary: "Simple, practical layout with prominent availability and licences.", secondary: "Keep shift, safety and location information easy to locate." },
            { label: "Government", primary: "Follow the stated format and use restrained branding at most.", secondary: "Check required fields, accessibility and any application-form instructions." },
            { label: "Startup roles", primary: "Light visual identity can work when the route is direct.", secondary: "The company's size does not remove the need for readable, evidence-led content." },
            { label: "Academic roles", primary: "Follow the institution's CV or application instructions.", secondary: "Use clear sections for research, publications, teaching and grants; do not optimise for decoration." },
          ],
        },
      },
      {
        id: "creative-vs-decorative",
        title: "Creative is not the same as decorative",
        paragraphs: [
          "Creative formatting communicates hierarchy, taste or a point of view while leaving the information easy to find. Decorative formatting adds visual elements without making the evidence clearer. A small colour accent, consistent type scale or well-placed portfolio link can be creative; a chart-shaped skill rating or a page of image-only text can be decorative and difficult to interpret.",
        ],
        bullets: [
          "Use one or two typefaces with sufficient contrast and comfortable line spacing.",
          "Keep headings as real text and use conventional labels such as Experience, Education and Skills.",
          "Use icons as supporting cues, never as the only way to identify contact details or skills.",
          "Keep colour meaningful and check the document in grayscale and at small zoom.",
        ],
      },
      {
        id: "ats-parsing",
        title: "What an ATS may struggle to parse",
        paragraphs: [
          "ATS products do not all behave identically. Greenhouse's support documentation lists examples of formatting that can cause an unsuccessful parse, including graphics, image-based files, complex tables, headers and footers, text boxes and columned layouts. Treat that as a vendor-specific warning, not a universal test for every system.",
          "For an unknown portal, a single-column, text-first template is the cautious choice. When the employer accepts a direct PDF or portfolio link, a lightly branded version may be reasonable if the exported text still reads in order.",
        ],
        exampleTitle: "Two-file strategy",
        exampleItems: [
          "ATS-safe version: single column, standard headings, selectable text, restrained typography and no information hidden in icons.",
          "Portfolio-led version: the same factual content with a modest visual identity, used only when the route and role make it appropriate.",
        ],
      },
      {
        id: "portfolio",
        title: "Use a portfolio for visual proof when it is the better container",
        paragraphs: [
          "A CV should explain your role, scope and outcomes. A portfolio can then show screens, campaigns, process maps, code or case studies. This separation lets a reviewer see creative work without making the CV itself dependent on graphics or a visual rating system.",
        ],
        bullets: [
          "Give each link a descriptive label such as Product redesign case study, not only an icon.",
          "State your contribution, tools and outcome in the CV even when the portfolio contains the detail.",
          "Check that the portfolio is accessible to the intended employer and does not expose confidential client work.",
        ],
      },
      {
        id: "test",
        title: "How to test a creative CV before sending it",
        paragraphs: [
          "Do not rely on how the PDF looks in one viewer. Run a small, repeatable check:",
        ],
        bullets: [
          "Select all text and paste it into a plain-text editor; check that the order is logical.",
          "Search for your name, email, phone, role title and the most important vacancy terms.",
          "Open the PDF on a phone and at low zoom; check contrast, line breaks and link visibility.",
          "Ask whether a reader can understand the CV if every icon, image and colour cue disappears.",
          "Keep a conservative alternative for application portals that reject, distort or cannot extract the designed PDF.",
        ],
      },
    ],
    checklist: [
      "The target role and contact details are real selectable text.",
      "The CV remains understandable without icons, colour or images.",
      "The portfolio link explains the work and your contribution.",
      "The PDF has been tested by copying text and checking the reading order.",
      "A text-first alternative is ready for an unknown ATS or formal application route.",
    ],
    faq: [
      {
        question: "Are creative CV templates accepted by Dutch employers?",
        answer:
          "They can be, particularly for design, branding, media and portfolio-led roles. For corporate, technical, operational and ATS-heavy applications, a clean text-based CV is usually the safer starting point.",
      },
      {
        question: "Do all ATS systems reject creative CVs?",
        answer:
          "No. ATS products and configurations vary. Some may parse a designed PDF correctly, while others can struggle with images, tables, columns, text boxes or headers. Test the exported text and follow the employer's instructions.",
      },
      {
        question: "Should contact information be inside icons or graphics?",
        answer:
          "No. Keep email, phone, location and links as selectable text so both people and software can find them.",
      },
      {
        question: "When should I send a conservative CV instead?",
        answer:
          "Use a text-first version when the portal is unknown, the role is regulated or technical, the employer requests a specific format, or your visual PDF does not survive the plain-text test.",
      },
    ],
    relatedLinks: [
      { href: "/en/templates", title: "ATS-safe English templates", description: "Compare readable layouts and switch templates before exporting." },
      { href: "/en/dutch-cv-template", title: "Dutch CV template in English", description: "Use local structure with a restrained visual treatment." },
      { href: "/en/english-cv-example-software-engineer-netherlands", title: "Software engineer example", description: "See a text-first approach for a technical role." },
      { href: "/en/expat-cv-netherlands", title: "Expat CV guide", description: "Connect design choices with Dutch-market application context." },
    ],
    sources: [
      { label: "Greenhouse Support: Unsuccessful resume parse", href: "https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse", note: "Official Greenhouse documentation describing examples of graphics, image files, complex tables, headers, footers, text boxes and columns that can cause parsing problems in its system." },
      { label: "Workable Help: Uploading candidate resumes", href: "https://help.workable.com/hc/en-us/articles/115012661408-Uploading-candidate-resumes-CVs-Individual-and-bulk-options", note: "Official Workable documentation showing that resume details are extracted from uploaded files; it supports keeping identity and contact information as actual text." },
      { label: "Europass: Create your CV", href: "https://europass.europa.eu/en/create-europass-cv", note: "Supports clear language, relevant facts and readable presentation as a baseline even when a role allows more visual identity." },
    ],
    datePublished,
    dateModified,
    ctaTitle: "Compare a text-first and lightly branded starting point",
    ctaText: "Build the same factual CV in a readable template, then test the exported PDF before choosing the version for a specific application route.",
    ctaHref: "/en/templates?startSource=en_guide_creative_cv_templates",
    ctaButtonLabel: "Compare English templates",
  },
  {
    slug: "recent-graduate-cv-netherlands",
    locale: "en",
    title: "How Can Recent Graduates Create a Strong CV Without Much Experience?",
    description:
      "A practical Netherlands CV guide for recent graduates using projects, internships, thesis work, volunteering, part-time jobs and honest work-authorisation wording.",
    metaTitle: "Recent Graduate CV Netherlands: Strong CV Without Experience",
    metaDesc:
      "Build a strong recent-graduate CV for the Netherlands with projects, internships, thesis evidence, part-time work, language levels and clear availability.",
    keywords: [
      "recent graduate cv netherlands",
      "graduate cv without experience netherlands",
      "starter cv netherlands",
      "graduate cv example english netherlands",
    ],
    intro:
      "Recent graduates can build a strong Netherlands CV without a long employment history by replacing “years of experience” with evidence from internships, projects, thesis work, volunteering, part-time jobs and certifications. Put the strongest proof near the top, explain tools and outcomes, and tailor each example to the vacancy rather than apologising for being new.",
    sections: [
      {
        id: "evidence-table",
        title: "What replaces professional experience",
        paragraphs: [
          "Your first CV is not empty: it contains evidence from study, work and responsibility. Choose examples that show what you did, how you worked and what changed because of it.",
        ],
        comparisonTable: {
          columns: ["Evidence source", "Use it when", "How to make it credible"],
          rows: [
            { label: "Internship", primary: "It involved the target function, team or tools.", secondary: "Name the task, scope, tools and outcome; separate learning from responsibility." },
            { label: "University project", primary: "It demonstrates a method, tool or problem in the vacancy.", secondary: "State the question, your contribution, deliverable and result or assessment." },
            { label: "Thesis or research", primary: "The role values analysis, evidence or subject knowledge.", secondary: "Translate the method and practical implication into employer language." },
            { label: "Volunteering", primary: "You held responsibility, organised people or delivered a service.", secondary: "Show the activity, audience, responsibility and observable outcome." },
            { label: "Student association", primary: "You led an event, budget, team or communication project.", secondary: "Name the scope and result instead of calling yourself a board member only." },
            { label: "Part-time work", primary: "It shows reliability, customer contact, pace or teamwork.", secondary: "Select transferable evidence and avoid pretending it was professional experience in another field." },
            { label: "Certification", primary: "It is recognised or directly relevant to the vacancy.", secondary: "Include provider, completion date and what you can now demonstrate." },
            { label: "Portfolio or GitHub", primary: "The work can be viewed safely and supports the target role.", secondary: "Explain your contribution, tools and outcome in one CV bullet first." },
          ],
        },
      },
      {
        id: "order",
        title: "Should education appear before experience?",
        paragraphs: [
          "Put education before experience when your degree, thesis or projects are the strongest evidence for the vacancy and your professional history is short. Put a relevant internship or graduate role first when it already proves the target work. A hybrid order can work: profile, selected evidence, education, then other experience.",
          "Do not let the order hide useful part-time work. Reliability, customer service, teamwork and working under pressure can support a starter application when written as evidence rather than filler.",
        ],
      },
      {
        id: "mini-examples",
        title: "Three complete mini-examples",
        paragraphs: [
          "These fictional examples show how the same one-page structure can adapt to different evidence profiles.",
        ],
        exampleTitle: "1. Graduate with internship experience",
        exampleItems: [
          "Profile: Business analytics graduate with a six-month reporting internship, strong Excel and Power BI practice, and availability for a junior analyst role.",
          "Evidence: Built a weekly Power BI dashboard from CRM exports, documented the data checks and reduced the coordinator's manual reporting steps from four files to one reviewable view.",
          "Education: BSc Business Analytics, thesis on customer retention; Internship: Reporting Intern, fictional logistics company; Skills: Power BI, Excel, SQL; Languages: English C1, Dutch A2.",
          "2. Graduate with university projects but no internship: Computer science graduate who built a team scheduling API in Python, wrote tests, reviewed pull requests and presented the trade-offs to a four-person project team. Link to the repository only if it is safe to share.",
          "3. Graduate with unrelated part-time work: Economics graduate and weekend retail associate who trained three new colleagues, balanced peak-hour queues and reconciled daily tills. Add a separate university pricing project to show analytical ability for an entry-level analyst vacancy.",
        ],
      },
      {
        id: "before-after",
        title: "Turn ordinary experience into evidence",
        paragraphs: [
          "The goal is not to inflate a project or part-time job. It is to describe the responsibility and outcome that are already there, then connect them honestly to the vacancy.",
        ],
        exampleTitle: "Before and after examples",
        exampleItems: [
          "Coursework before: Studied data analysis and marketing.",
          "Coursework after: Analysed a customer dataset in Python, compared three segmentation approaches and presented the recommendation with limitations to a project team.",
          "University project before: Made a group app.",
          "University project after: Built the API endpoint for a four-person scheduling app, added validation tests and documented the handover for the next team.",
          "Retail before: Worked in a shop and helped customers.",
          "Retail after: Served customers during weekend peaks, trained three new colleagues on closing procedures and reconciled daily tills with no unexplained variance in the sample period.",
          "Volunteering before: Volunteer at a student association.",
          "Volunteering after: Coordinated monthly events for 80 students, confirmed speakers and managed the volunteer rota across six sessions.",
        ],
      },
      {
        id: "practical-fields",
        title: "Graduation date, languages, availability and work authorisation",
        paragraphs: [
          "Put your expected or completed graduation date near the education entry. State language levels with a recognised scale where possible and keep availability factual. If your right to work depends on a permit, give a short status line and check the current official conditions rather than guessing from a template.",
          "For example: “Graduated July 2026 · Available from September 2026 · English C1 · Dutch A2 · Orientation-year residence permit, valid until June 2027.” Only use the final line when it is accurate for your situation; the IND explains the conditions and validity of the orientation-year permit.",
        ],
        bullets: [
          "Use a one-page structure unless the vacancy or evidence genuinely requires more.",
          "Keep GPA or grade information when it is strong, relevant or explicitly requested; omit it when a project result is more useful.",
          "Use a portfolio or GitHub link when it is safe, accessible and explained by a contribution bullet.",
          "Do not list a work-authorisation route as a guarantee of employment or sponsorship.",
        ],
      },
      {
        id: "tailor-projects",
        title: "Tailor projects to the vacancy",
        paragraphs: [
          "Copy the vacancy's core nouns into a project bullet only when the work genuinely used them. If a vacancy asks for stakeholder communication, explain who received your analysis or presentation. If it asks for SQL, name the query, dataset or reporting task you actually completed. Tailoring is selection and explanation, not keyword insertion without evidence.",
        ],
      },
      {
        id: "student-guide-difference",
        title: "How this guide differs from the international-student guide",
        paragraphs: [
          "The international-student guide is broader: it covers people still studying, internships, part-time work and the transition into the Dutch market. This page is narrower and is for recent graduates who need to replace a short employment history with a deliberate evidence portfolio. Use both when the distinction applies.",
        ],
        intentLinks: [
          { href: "/en/guides/cv-for-international-students-netherlands", label: "International student CV guide", description: "Use the broader study-and-work route when you are still studying or applying for internships." },
          { href: "/en/guides/one-page-cv-netherlands", label: "One-page CV guide", description: "Use the length decision guide to keep a starter CV focused." },
        ],
      },
    ],
    checklist: [
      "The target role and graduation date are clear near the top.",
      "Projects, thesis and internships name tools, contribution and outcome.",
      "Part-time work and volunteering show real responsibility without inflated titles.",
      "Language levels and availability are current and honest.",
      "Work-authorisation wording is concise and checked against an official source where relevant.",
      "The one-page CV is tailored to one vacancy rather than trying to include everything.",
    ],
    faq: [
      {
        question: "How can a recent graduate make a strong CV without much experience?",
        answer:
          "Use internships, university projects, thesis or research work, volunteering, student leadership, part-time jobs and relevant certifications as evidence. Explain your contribution, tools and outcome, then select the examples that match the vacancy.",
      },
      {
        question: "Should education go before experience on a graduate CV?",
        answer:
          "Put education first when the degree, thesis or projects are your strongest role evidence. Put a relevant internship or graduate job first when it already proves the target work.",
      },
      {
        question: "Should I include my GPA or grades?",
        answer:
          "Include grades when they are strong, relevant or requested. Otherwise, a concrete project, thesis or internship result may give the employer more useful evidence.",
      },
      {
        question: "How should I mention a Dutch orientation year on my CV?",
        answer:
          "Use a short factual line only when it applies to your current status, for example the permit type and validity. Check the latest IND conditions; do not present a residence route as a promise of sponsorship or employment.",
      },
    ],
    relatedLinks: [
      { href: "/en/guides/cv-for-international-students-netherlands", title: "International student CV", description: "A broader route for current students, internships and part-time work." },
      { href: "/en/guides/one-page-cv-netherlands", title: "One-page CV guide", description: "Decide how much evidence belongs in a focused starter document." },
      { href: "/en/expat-cv-netherlands", title: "Expat CV guide", description: "Check Dutch-market structure, language and authorisation context." },
      { href: "/en", title: "English CV homepage", description: "Start the English CV route when you are ready to build." },
      { href: "/cv-voorbeelden/studenten-en-starters/afgestudeerde-cv", title: "Graduate CV example", description: "See a Dutch-language starter example for structure ideas." },
    ],
    sources: [
      { label: "Europass: What information should I include?", href: "https://europass.europa.eu/en/what-type-information-should-i-include-my-europass-profile", note: "Supports including skills, qualifications, work, study, volunteering and projects while avoiding irrelevant sensitive personal information." },
      { label: "Europass CV instructions", href: "https://www.eea.europa.eu/about-us/jobs/application-documents/instructions_for_europass_cv.pdf", note: "Provides official guidance to keep a CV concise and to foreground education, volunteering and placements when work experience is limited." },
      { label: "IND: Residence permit for orientation year", href: "https://ind.nl/en/residence-permits/work/residence-permit-for-orientation-year", note: "Supports the factual explanation of the orientation-year route, requirements and one-year validity; it is not a substitute for checking your own status." },
    ],
    datePublished,
    dateModified,
    ctaTitle: "Turn your projects into a focused graduate CV",
    ctaText: "Start with one target vacancy and make the evidence you already have easy to verify.",
    ctaHref: "/en/editor?template=professional&startSource=en_guide_recent_graduate",
    ctaButtonLabel: "Build my English CV",
  },
];
