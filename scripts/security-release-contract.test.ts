import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("container uses pinned supported base and locked application dependencies", () => {
  const docker = readFileSync("Dockerfile", "utf8");
  assert.match(docker, /FROM node:24\.20\.0-trixie-slim@sha256:[a-f0-9]{64} AS base/);
  assert.doesNotMatch(docker, /npm install -g prisma|RUN npm install nodemailer/);
  assert.match(docker, /npm ci --ignore-scripts/);
  assert.match(docker, /COPY --from=production-deps.*node_modules/);
  assert.match(docker, /rm -rf \/usr\/local\/lib\/node_modules\/npm \/usr\/local\/bin\/npm \/usr\/local\/bin\/npx \/opt\/yarn-v1\.22\.22/);
  assert.match(docker, /USER nextjs/);
  assert.match(readFileSync("entrypoint.sh", "utf8"), /node node_modules\/prisma\/build\/index.js migrate deploy --config prisma.config.ts/);
});

test("security updates and scoped overrides remain pinned", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
  for (const name of ["prisma", "@prisma/client", "@prisma/adapter-pg", "nodemailer", "pdfjs-dist", "puppeteer"]) {
    assert.match(pkg.dependencies[name], /^\d+\.\d+\.\d+$/);
    assert.equal(lock.packages[`node_modules/${name}`].version, pkg.dependencies[name]);
  }
  assert.equal(pkg.overrides["@prisma/config"]["deepmerge-ts"], "8.0.2");
  assert.equal(pkg.overrides.prisma.mysql2, "3.24.3");
});

test("schema preserves the existing meaningful-content index", () => {
  assert.match(readFileSync("prisma/schema.prisma", "utf8"), /@@index\(\[meaningfulContentAt\]\)/);
});

test("PDF parser uses patched ESM build without a disabled/mismatched worker", () => {
  const parser = readFileSync("lib/cv-parser.ts", "utf8");
  assert.match(parser, /pdfjs-dist\/legacy\/build\/pdf.mjs/);
  assert.doesNotMatch(parser, /workerSrc\s*=/);
});
