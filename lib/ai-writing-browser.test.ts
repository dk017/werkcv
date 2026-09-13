import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { build } from "esbuild";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import puppeteer, { type Page } from "puppeteer";

test("writing dialog: individual review, regenerate, undo, stale input, focus and responsive widths", { timeout: 180000 }, async () => {
  const bundle = await build({
    stdin: { loader: "tsx", resolveDir: process.cwd(), contents: `
      import React, { useState, useRef } from "react";
      import { createRoot } from "react-dom/client";
      import Assistant from "./app/editor/AiWritingAssistant";
      import { defaultCV } from "./lib/cv";
      let generation = 0;
      window.fetch = async (_url, options) => {
        const request = JSON.parse(options.body);
        await new Promise(resolve => setTimeout(resolve, 150));
        const data = structuredClone(request.data); generation++;
        if (request.target.kind !== "experience") data.personal.summary = "Suggested profile " + generation;
        if (request.target.kind !== "profile") {
          data.experience[0].description = "Suggested description " + generation;
          data.experience[0].highlights = ["Suggested bullet " + generation];
        }
        return new Response(JSON.stringify({ schemaVersion: 1, requestId: request.requestId, data }), {status: 200});
      };
      function App() {
        const initial = structuredClone(defaultCV);
        initial.personal.summary = "Original profile";
        initial.experience = [{ entryId: "job", role: "Assistant", company: "Example", location: "", start: "", end: "", description: "Original description", highlights: ["Original bullet"] }];
        const [data, setData] = useState(initial);
        const current = useRef(data);
        const [history, setHistory] = useState([]);
        const [open, setOpen] = useState(false);
        const [locale, setLocale] = useState("en");
        window.setLocale = setLocale;
        const update = next => { current.current = next; setData(next); };
        window.manualEdit = (text = "Later manual edit") => update({...current.current, personal: {...current.current.personal, summary: text}});
        return <><button id="open" onClick={() => setOpen(true)}>Open</button>
          <pre id="state" hidden>{JSON.stringify(data)}</pre>
          {open && <Assistant selection={{target: {kind: "all"}, action: "tailor"}} locale={locale} cvId="test"
            vacancy="" role="" getData={() => current.current} prepare={async () => true}
            getVersion={() => "v1"} apply={update} history={history} onHistory={setHistory} onClose={() => setOpen(false)} blocked={false} />}
        </>;
      }
      createRoot(document.getElementById("root")).render(<App />);
    ` },
    bundle: true, write: false, platform: "browser", jsx: "automatic",
    define: { "process.env.NODE_ENV": '"production"' },
  });
  const css = await postcss([tailwind()]).process('@import "tailwindcss" source(none); @source "./app/editor/AiWritingAssistant.tsx";', { from: path.join(process.cwd(), "writing-test.css") });
  const executablePath = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
  const browser = await puppeteer.launch({ headless: true, pipe: true, timeout: 60000, ...(executablePath ? { executablePath } : {}) });
  let stage = "page setup";
  try {
    const page = await browser.newPage();
    page.on("pageerror", error => console.error("Fictional fixture error:", String(error)));
    await page.setRequestInterception(true);
    page.on("request", request => void request.respond({ status: 200, contentType: "text/html", body: '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div id="root"></div></body></html>' }));
    await page.goto("http://localhost/writing-test");
    await page.addStyleTag({ content: css.css });
    await page.addScriptTag({ content: bundle.outputFiles[0].text });
    await page.waitForSelector("#open");
    stage = "open dialog";
    await page.click("#open");
    await page.waitForSelector("dialog[open]");
    const click = async (label: string, heading = "") => {
      await page.evaluate((label, heading) => {
        const scope = heading ? [...document.querySelectorAll("dialog section")].find(s => s.querySelector("h3")?.textContent?.startsWith(heading)) : document.querySelector("dialog");
        const button = [...(scope?.querySelectorAll("button") || [])].find(b => b.textContent === label) as HTMLButtonElement | undefined;
        if (!button || button.disabled) throw new Error("BUTTON_UNAVAILABLE: " + label);
        button.click();
      }, label, heading);
    };
    const state = async (page: Page) => JSON.parse(await page.$eval("#state", el => el.textContent || "{}"));
    stage = "generate";
    await click("Generate suggestion");
    await page.waitForFunction(() => document.querySelectorAll("dialog section h3").length === 3);
    assert.equal((await state(page)).personal.summary, "Original profile");
    stage = "individual acceptance and rejection";
    await click("Use this text", "Profile");
    assert.equal((await state(page)).personal.summary, "Suggested profile 1");
    assert.equal((await state(page)).experience[0].description, "Original description");
    await click("Keep original", "Job description");
    await click("Use this text", "Bullet points");
    assert.deepEqual((await state(page)).experience[0].highlights, ["Suggested bullet 1"]);
    await page.evaluate(() => (window as unknown as { manualEdit: () => void }).manualEdit());
    stage = "guarded undo";
    await page.evaluate(() => {
      const detail = [...document.querySelectorAll("details")].find(d => d.querySelector("summary")?.textContent?.startsWith("Profile"))!;
      detail.open = true; detail.querySelector("button")!.click();
    });
    await page.waitForFunction(() => document.querySelector('[role="alert"]')?.textContent?.includes("edited later"));
    assert.equal((await state(page)).personal.summary, "Later manual edit");
    stage = "regeneration";
    await click("Generate suggestion");
    await page.waitForFunction(() => document.querySelector("dialog")?.textContent?.includes("Suggested profile 2"));
    await click("Try another suggestion", "Profile");
    await page.waitForFunction(() => document.querySelector("dialog")?.textContent?.includes("Suggested profile 3"));
    assert.ok(await page.evaluate(() => document.querySelector("dialog")?.textContent?.includes("Suggested description 2")));
    await click("Generate suggestion");
    await page.evaluate(() => (window as unknown as { manualEdit: (text: string) => void }).manualEdit("Changed while generating"));
    await page.waitForFunction(() => document.querySelector('[role="alert"]')?.textContent?.includes("context changed"));
    assert.equal((await state(page)).personal.summary, "Changed while generating");
    stage = "responsive layout";
    for (const width of [320, 375, 768, 1440]) {
      await page.setViewport({ width, height: 900 });
      assert.ok(await page.$eval("dialog", el => el.scrollWidth <= el.clientWidth + 1), "horizontal overflow at " + width);
    }
    stage = "keyboard and Dutch";
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => !document.querySelector("dialog"));
    assert.equal(await page.evaluate(() => document.activeElement?.id), "open");
    await page.evaluate(() => (window as unknown as { setLocale: (locale: string) => void }).setLocale("nl"));
    await page.click("#open"); await page.waitForSelector("dialog[open]");
    assert.ok(await page.evaluate(() => document.querySelector("dialog")?.textContent?.includes("Nieuwe suggestie")));
    assert.ok(await page.evaluate(() => document.querySelector("dialog")?.textContent?.includes("Ongedaan maken")));
  } catch (error) { console.error("Browser test stage:", stage); throw error; }
  finally { await browser.close(); }
});
