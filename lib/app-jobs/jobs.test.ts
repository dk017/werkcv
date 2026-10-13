import test from "node:test";
import assert from "node:assert/strict";
import { cvSchema } from "../cv";
import { jobSchema, manualJobSchema, matchJob, safeJobUrl, searchSchema } from "./model";
import { fetchJSearch, normalizeJobs, searchKey, JobServiceError } from "./provider";

const input = { role: "Developer", location: "Utrecht", remote: false, locale: "nl" as const };
const row = { job_id: "one", job_title: "Developer", employer_name: "Example", job_country: "NL", job_city: "Utrecht", job_apply_link: "https://example.com/jobs/one", job_description: "<p>Build using C++ and SQL.</p><script>steal()</script>", required_technologies: ["C++", "SQL", "Python"] };
const payload = (jobs: unknown[]) => ({ status: "OK", data: { jobs, cursor: "unused" } });
const errorCode = (code: string) => (error: unknown) => error instanceof JobServiceError && error.code === code;

test("normalizes direct-provider shape, strips markup and duplicates, excludes expired/foreign/unsafe listings", () => {
  const jobs = normalizeJobs(payload([row, row, { ...row, job_id: "two" }, { ...row, job_id: "foreign", job_country: "US" }, { ...row, job_id: "old", job_offer_expiration_datetime_utc: "2020-01-01" }, { ...row, job_apply_link: "javascript:alert(1)" }]));
  assert.equal(jobs.length, 1);
  assert.equal(jobs[0].description, "Build using C++ and SQL.");
  assert.equal(jobs[0].postedAt, null);
  assert.equal(jobSchema.safeParse(jobs[0]).success, true);
  assert.deepEqual(normalizeJobs(payload([])), []);
  assert.throws(() => normalizeJobs({ data: [] }), errorCode("UNAVAILABLE"));
});
test("rejects unsafe application links and oversized/extra search and manual fields", () => {
  for (const url of ["javascript:alert(1)", "https://localhost/test", "http://127.1/test", "https://user:pass@example.com", "http://192.168.1.2", "file:///test"]) assert.equal(safeJobUrl(url), null);
  assert.equal(searchSchema.safeParse({ ...input, email: "private@example.com" }).success, false);
  assert.equal(searchSchema.safeParse({ ...input, role: "a".repeat(121) }).success, false);
  assert.equal(manualJobSchema.safeParse({ title: "Test", company: "", location: "", url: "", description: "too short" }).success, false);
});
test("skill evidence respects word boundaries and regex punctuation without inventing fit scores", () => {
  const cv = cvSchema.parse({ personal: {}, skills: [{ name: "C++" }, { name: "SQL" }, { name: "Java" }, { name: "Go" }] });
  const job = normalizeJobs(payload([{ ...row, job_description: "C++ SQL JavaScript Google" }]))[0];
  assert.deepEqual(matchJob(job, cv), { matched: ["C++", "SQL"], notInCv: ["Python"] });
  assert.deepEqual(matchJob(job), { matched: [], notInCv: [] });
});
test("cache key is independent of CV/account but separates language and remote preference", () => {
  assert.equal(searchKey(input), searchKey({ ...input, role: "developer", cvId: "secret-cv" }));
  assert.notEqual(searchKey(input), searchKey({ ...input, locale: "en" }));
  assert.notEqual(searchKey(input), searchKey({ ...input, remote: true }));
});
test("provider sends only search preferences and uses fixed host and server credential", async () => {
  let calls = 0;
  await fetchJSearch({ ...input, cvId: "private-cv-id", remote: true }, { apiKey: "test-key", fetcher: async (url, options) => {
    calls++;
    const target = new URL(String(url));
    assert.equal(target.origin, "https://api.openwebninja.com");
    assert.equal(target.pathname, "/jsearch/search-v2");
    assert.equal(target.searchParams.get("country"), "nl");
    assert.equal(target.searchParams.get("query"), "remote Developer in Utrecht, Netherlands");
    assert.equal(target.searchParams.has("language"), false);
    assert.equal(target.searchParams.has("work_from_home"), false);
    assert.equal(String(url).includes("private-cv"), false);
    assert.deepEqual(options?.headers, { "x-api-key": "test-key" });
    assert.equal(options?.redirect, "error");
    assert.equal(options?.cache, "no-store");
    return Response.json(payload([row]));
  } });
  assert.equal(calls, 1);
});
test("provider errors are bounded and never disclose raw responses or secrets", async () => {
  for (const status of [401, 403, 429, 500]) await assert.rejects(fetchJSearch(input, { apiKey: "test", fetcher: async () => new Response("secret provider response", { status }) }), errorCode(status === 429 ? "QUOTA" : "UNAVAILABLE"));
  await assert.rejects(fetchJSearch(input, { apiKey: "", fetcher: async () => { throw Error("should not fetch"); } }), errorCode("NOT_CONFIGURED"));
  await assert.rejects(fetchJSearch(input, { apiKey: "test", fetcher: async () => { throw Error("timeout with secret"); } }), errorCode("UNAVAILABLE"));
  await assert.rejects(fetchJSearch(input, { apiKey: "test", fetcher: async () => Response.json({ bad: true }) }), errorCode("UNAVAILABLE"));
});
test("remote-only searches exclude listings that are neither flagged nor described as remote", async () => {
  const jobs = await fetchJSearch({ ...input, remote: true }, { apiKey: "test", fetcher: async () => Response.json(payload([
    row,
    { ...row, job_id: "remote", job_title: "Remote engineer", job_apply_link: "https://example.com/remote", job_is_remote: true },
    { ...row, job_id: "hybrid", job_title: "Backend developer", job_description: "Hybride functie, 2 dagen thuiswerken.", job_apply_link: "https://example.com/hybrid" },
  ])) });
  assert.deepEqual(jobs.map(job => job.url), ["https://example.com/remote", "https://example.com/hybrid"]);
});
test("query does not repeat the country when the location already names it", async () => {
  await fetchJSearch({ ...input, location: "Nederland" }, { apiKey: "test", fetcher: async url => {
    assert.equal(new URL(String(url)).searchParams.get("query"), "Developer in Nederland");
    return Response.json(payload([row]));
  } });
});
