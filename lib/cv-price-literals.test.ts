import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { test } from "node:test";

// The CV download price lives only in lib/site-content.ts (cvDownloadPrice). A hardcoded copy
// shows the wrong price on some page the next time the price changes, as happened with 40 files
// when €4,99 became €7,95.
const ROOTS = ["app", "components", "lib"];
const PRICE_LITERAL = /(?:€|EUR)\s?(?:4[,.]99|7[,.]95)\b|\b(?:4[,.]99|7[,.]95)\s?(?:euro|EUR)\b/i;
const ALLOWED = new Set(["lib/site-content.ts", "lib/pricing-copy-experiment.ts"]);

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : [];
  });
}

test("no hardcoded CV download price outside lib/site-content.ts", () => {
  const offenders = ROOTS.flatMap(sourceFiles)
    .map((path) => relative(process.cwd(), path).replace(/\\/g, "/"))
    .filter((path) => !ALLOWED.has(path))
    .flatMap((path) =>
      readFileSync(path, "utf8")
        .split("\n")
        .map((line, index) => ({ line, index }))
        .filter(({ line }) => PRICE_LITERAL.test(line))
        .map(({ index }) => `${path}:${index + 1}`),
    );
  assert.deepEqual(offenders, [], `Use cvDownloadPrice from @/lib/site-content instead:\n${offenders.join("\n")}`);
});
