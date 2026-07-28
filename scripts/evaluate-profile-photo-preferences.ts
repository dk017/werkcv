import { loadEnvConfig } from "@next/env";
import { access, mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import OpenAI from "openai";
import { toFile } from "openai/uploads";
import sharp from "sharp";
import {
  buildProfilePhotoPrompt,
  type ProfilePhotoClothingPreference,
  type ProfilePhotoExpressionPreference,
} from "../lib/profile-photo-prompt";

loadEnvConfig(process.cwd());

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not available.");
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const outputRoot = path.resolve(
  process.cwd(),
  "tmp",
  "profile-photo-preference-eval-2026-07-28"
);

const references = [
  {
    id: "consultant-man",
    file: path.resolve(
      process.cwd(),
      "public",
      "profile-photo-samples",
      "dutch-consultant-man.jpg"
    ),
  },
  {
    id: "starter-woman",
    file: path.resolve(
      process.cwd(),
      "public",
      "profile-photo-samples",
      "dutch-starter-woman.jpg"
    ),
  },
  {
    id: "international-student-woman",
    file: path.resolve(
      process.cwd(),
      "public",
      "profile-photo-samples",
      "international-student-netherlands-woman.jpg"
    ),
  },
];

const combinations: Array<{
  id: string;
  label: string;
  clothing: ProfilePhotoClothingPreference;
  expression: ProfilePhotoExpressionPreference;
}> = [
  {
    id: "keep-clothing_keep-expression",
    label: "Keep clothing · Keep expression",
    clothing: "keep",
    expression: "keep",
  },
  {
    id: "keep-clothing_approachable-expression",
    label: "Keep clothing · More approachable",
    clothing: "keep",
    expression: "approachable",
  },
  {
    id: "adapt-clothing_keep-expression",
    label: "Adapt clothing · Keep expression",
    clothing: "adapt",
    expression: "keep",
  },
  {
    id: "adapt-clothing_approachable-expression",
    label: "Adapt clothing · More approachable",
    clothing: "adapt",
    expression: "approachable",
  },
];

type EvaluationTask = {
  referenceId: string;
  referenceFile: string;
  combinationId: string;
  combinationLabel: string;
  clothing: ProfilePhotoClothingPreference;
  expression: ProfilePhotoExpressionPreference;
  outputFile: string;
  prompt: string;
};

const tasks: EvaluationTask[] = references.flatMap((reference) =>
  combinations.map((combination) => ({
    referenceId: reference.id,
    referenceFile: reference.file,
    combinationId: combination.id,
    combinationLabel: combination.label,
    clothing: combination.clothing,
    expression: combination.expression,
    outputFile: path.join(
      outputRoot,
      `${reference.id}__${combination.id}.jpg`
    ),
    prompt: buildProfilePhotoPrompt(
      "linkedin",
      combination.clothing,
      combination.expression
    ),
  }))
);

async function fileExists(file: string): Promise<boolean> {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function generateTask(task: EvaluationTask, position: number): Promise<void> {
  if (await fileExists(task.outputFile)) {
    console.log(`[${position}/${tasks.length}] reuse ${path.basename(task.outputFile)}`);
    return;
  }

  console.log(`[${position}/${tasks.length}] start ${path.basename(task.outputFile)}`);
  const source = await readFile(task.referenceFile);
  const image = await toFile(source, path.basename(task.referenceFile), {
    type: "image/jpeg",
  });
  const response = await client.images.edit({
    model: "gpt-image-2",
    image,
    prompt: task.prompt,
    n: 1,
    size: "1024x1024",
    quality: "medium",
    output_format: "jpeg",
    background: "opaque",
  });
  const base64 = response.data?.[0]?.b64_json;
  if (!base64) {
    throw new Error(`No image returned for ${path.basename(task.outputFile)}.`);
  }

  await writeFile(task.outputFile, Buffer.from(base64, "base64"));
  console.log(`[${position}/${tasks.length}] done ${path.basename(task.outputFile)}`);
}

function labelSvg(label: string): Buffer {
  const safeLabel = label
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  return Buffer.from(
    `<svg width="380" height="46" xmlns="http://www.w3.org/2000/svg">
      <rect width="380" height="46" fill="#ffffff"/>
      <text x="12" y="29" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#0f172a">${safeLabel}</text>
    </svg>`
  );
}

async function makeContactSheet(referenceId: string, referenceFile: string): Promise<string> {
  const cards = [
    { label: "Reference", file: referenceFile },
    ...combinations.map((combination) => ({
      label: combination.label,
      file: path.join(outputRoot, `${referenceId}__${combination.id}.jpg`),
    })),
  ];
  const cardWidth = 380;
  const imageHeight = 380;
  const labelHeight = 46;
  const gap = 20;
  const columns = 3;
  const rows = 2;
  const canvasWidth = columns * cardWidth + (columns + 1) * gap;
  const canvasHeight = rows * (imageHeight + labelHeight) + (rows + 1) * gap;
  const composites: sharp.OverlayOptions[] = [];

  for (let index = 0; index < cards.length; index += 1) {
    const card = cards[index];
    const left = gap + (index % columns) * (cardWidth + gap);
    const top = gap + Math.floor(index / columns) * (imageHeight + labelHeight + gap);
    const image = await sharp(card.file)
      .resize(cardWidth, imageHeight, { fit: "cover", position: "centre" })
      .jpeg({ quality: 90 })
      .toBuffer();
    composites.push({ input: image, left, top });
    composites.push({
      input: labelSvg(card.label),
      left,
      top: top + imageHeight,
    });
  }

  const outputFile = path.join(outputRoot, `${referenceId}__contact-sheet.jpg`);
  await sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 3,
      background: "#e2e8f0",
    },
  })
    .composite(composites)
    .jpeg({ quality: 92 })
    .toFile(outputFile);
  return outputFile;
}

async function run(): Promise<void> {
  await mkdir(outputRoot, { recursive: true });

  let cursor = 0;
  const workerCount = 3;
  async function worker(): Promise<void> {
    while (cursor < tasks.length) {
      const taskIndex = cursor;
      cursor += 1;
      await generateTask(tasks[taskIndex], taskIndex + 1);
    }
  }

  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  const contactSheets: string[] = [];
  for (const reference of references) {
    contactSheets.push(await makeContactSheet(reference.id, reference.file));
  }

  await writeFile(
    path.join(outputRoot, "manifest.json"),
    JSON.stringify(
      {
        createdAt: new Date().toISOString(),
        model: "gpt-image-2",
        quality: "medium",
        size: "1024x1024",
        style: "linkedin",
        tasks: tasks.map((task) => ({
          referenceId: task.referenceId,
          referenceFile: path.relative(process.cwd(), task.referenceFile),
          combinationId: task.combinationId,
          combinationLabel: task.combinationLabel,
          clothing: task.clothing,
          expression: task.expression,
          outputFile: path.relative(process.cwd(), task.outputFile),
          prompt: task.prompt,
        })),
        contactSheets: contactSheets.map((file) =>
          path.relative(process.cwd(), file)
        ),
      },
      null,
      2
    )
  );

  console.log(`Evaluation complete: ${outputRoot}`);
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : "Evaluation failed.");
  process.exitCode = 1;
});
