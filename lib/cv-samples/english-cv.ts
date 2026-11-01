import type { CVData } from "@/lib/cv";

// Fictional Dutch candidate applying in English to an international employer in the Netherlands.
export const englishCvSample: CVData = {
  personal: {
    name: "Lotte Jansen",
    title: "Customer Success Manager",
    email: "lotte.jansen@email.nl",
    phone: "+31 6 12345678",
    location: "Utrecht, Netherlands",
    address: "",
    postalCode: "",
    summary:
      "Customer Success Manager with five years of experience in B2B software. Manages 60 mid-market accounts in the Benelux and Germany and leads onboarding for new customers. Looking for a customer-facing role in an international team in the Netherlands. EU citizen, no visa sponsorship required.",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    driversLicense: "",
    gender: "",
    maritalStatus: "",
    linkedIn: "linkedin.com/in/lottejansen",
    github: "",
    website: "",
    photo: "",
  },
  experience: [
    {
      role: "Customer Success Manager",
      company: "Logistics planning software company",
      location: "Utrecht",
      start: "Mar 2023",
      end: "Present",
      description: "Responsible for retention and growth of 60 mid-market accounts in the Benelux and Germany.",
      highlights: [
        "Kept gross revenue retention at 94% across the portfolio in 2025",
        "Cut onboarding time for new customers from 9 to 5 weeks with a fixed kick-off plan",
        "Ran quarterly business reviews in English, Dutch and German",
      ],
    },
    {
      role: "Customer Support Specialist",
      company: "Online retailer, home and garden",
      location: "Amsterdam",
      start: "Sep 2020",
      end: "Feb 2023",
      description: "First-line support by email, chat and phone for customers in the Netherlands and Belgium.",
      highlights: [
        "Handled 40+ tickets a day in Dutch and English with a 92% satisfaction score",
        "Wrote 35 help-centre articles that reduced repeat questions about deliveries",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Business Administration, International Business (HBO, EQF level 6)",
      school: "University of Applied Sciences",
      location: "Groningen",
      start: "Sep 2016",
      end: "Jul 2020",
      description: "Graduation project on predicting customer churn for a regional energy supplier.",
    },
  ],
  skills: [
    { name: "Customer onboarding", level: 5 },
    { name: "Account management", level: 5 },
    { name: "HubSpot", level: 4 },
    { name: "Salesforce", level: 4 },
    { name: "Data analysis in Excel", level: 4 },
    { name: "Stakeholder management", level: 4 },
  ],
  languages: [
    { name: "Dutch", level: "Native" },
    { name: "English (C1)", level: "Fluent" },
    { name: "German (B1)", level: "Good" },
  ],
  interests: ["Running", "Volunteer coach at a youth hockey club"],
  courses: [{ name: "IELTS Academic, overall band 7.5", institution: "British Council", year: "2019" }],
  internships: [],
  awards: [],
};
