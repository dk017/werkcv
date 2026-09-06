import "dotenv/config";
import { defaultCV } from "../lib/cv";
import { extractVoiceCvCandidate, getVoiceCvQualityIssues } from "../lib/voice-cv-ai";
import { getVoiceFollowUpQuestions, VoiceAnswer } from "../lib/voice-cv";

const answers: VoiceAnswer[] = [
  {
    promptId: "contact-1",
    section: "contact",
    transcript: "My name is Arun Rao. I live in Bengaluru and I am targeting senior software developer roles.",
  },
  {
    promptId: "experience-1",
    section: "experience",
    transcript: "From 2014 to 2018 I was an automation developer at Northstar. I built automation projects including Simple Loan and supported backend execution for existing customers of a US bank.",
  },
  {
    promptId: "experience-2",
    section: "experience",
    transcript: "From 2018 I worked at Techbridge for retail client MarketSquare. I developed backend microservices with Java and Spring Boot, parsed required fields from form submissions and routed them to authorised teams. I also built an Angular interface for approving or rejecting forms. I do not remember the exact job title or end date.",
  },
  {
    promptId: "experience-3",
    section: "experience",
    transcript: "At CloudLedger from 2022 to 2024, I worked on data archival for a subscription revenue recognition platform. I moved data older than three years to Amazon S3, improving performance and reducing report generation time from minutes to seconds. I do not remember the exact job title.",
  },
  {
    promptId: "skills-1",
    section: "skills",
    transcript: "My skills include Java, Spring Boot, writing microservices, working on distributed systems, Kafka, Angular and Amazon S3. I did not state skill levels.",
  },
];

const currentCv = structuredClone(defaultCV);
currentCv.personal.resumeLanguage = "en";

async function main() {
  const candidate = await extractVoiceCvCandidate(answers, "en", currentCv);
  const qualityIssues = getVoiceCvQualityIssues(candidate, answers, currentCv);

  console.log(JSON.stringify({
    summary: candidate.personal.summary,
    experience: candidate.experience,
    skills: candidate.skills,
    warnings: candidate.warnings,
    followUpQuestions: getVoiceFollowUpQuestions(candidate, "en"),
    qualityIssues,
  }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Voice CV quality smoke test failed");
  process.exitCode = 1;
});
