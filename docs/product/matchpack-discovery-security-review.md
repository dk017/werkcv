# MatchPack discovery dependency security review

Historical checkpoint: the 22-finding audit below has been superseded by [the container certification report](security-container-certification-2026-09-08.md). The application audit is now zero, but the exact container still fails its security threshold. Do not use this older review as current release approval.

Reviewed 2026-09-08. This is dependency triage, not a penetration test or a production-image certification.

## Outcome

The audit decreased from 41 findings (2 critical, 31 high, 7 moderate, 1 low) to 22 findings (1 critical, 16 high, 5 moderate). These are affected-package counts, not 22 independently exploitable application vulnerabilities. Remaining findings are not dismissed as false positives.

Next.js and eslint-config-next were updated from 16.1.1 to 16.3.4. Compatible transitive updates were applied through the lockfile. No force upgrade, Prisma downgrade, database change or feature activation occurred. Production build/type checking and 68 focused regression tests pass after these updates; PDF/DOCX renderer smoke passes.

The audit snapshot is `.codex-tmp/agency-discovery/dependency-audit.json`, observed 2026-09-07T19:34:19.745Z. Reproduce with `npm run audit:agency:dependencies`. That command is diagnostic: successful report generation is not a zero-vulnerability gate.

## Remaining exposure and action

| Dependency group | Affected package count | Observed use and limits | Required follow-up |
| --- | --- | --- | --- |
| Prisma CLI/dev dependency chain | 14 | Includes Prisma, config/dev packages, parser packages, Hono, Effect, Lodash and mysql2. Application uses PostgreSQL; this is not evidence that every transitive path is unreachable. Prisma CLI also exists in the runtime image. | Review patched compatible Prisma releases and full dependency chain. Do not accept the audit's proposed major downgrade to Prisma 6.19.3 without schema/client/migration qualification. Test generation, migration rehearsal and authenticated database workflows. |
| Puppeteer/browser installer chain | 4 | Puppeteer/core, browsers and extract-zip. Docker skips package install scripts and uses system Chromium rather than downloading a browser during PDF requests. Installer-chain exposure is different from public CV parsing, but does not erase advisories. | Qualify the patched major version separately with Chromium/PDF visual and concurrency checks. Keep browser binaries and archive sources trusted. |
| PDF.js and optional canvas installer chain | 3 | pdfjs-dist, @mapbox/node-pre-gyp and tar. tar 6.2.1 carries the remaining critical finding and is reached through the optional canvas installation chain. Both production PDF.js document-loading paths explicitly set isEvalSupported:false. | Migrate PDF.js and its import/worker configuration to a patched major, then test hostile/large documents and PDF text/image extraction. Confirm the optional vulnerable installer chain disappears. |
| Nodemailer | 1 | Agency transactional email passes controlled from/to/subject/text fields. Other senders include authentication, contact, lead and operations messages; this review does not prove all advisory paths unreachable. | Qualify the patched major with login mail, contact forms, Agency invitation/outbox, SMTP configuration and delivery tests. No real recipient mail was sent during this review. |

Package membership for reproducibility:

- Prisma group: @chevrotain/cst-dts-gen, @chevrotain/gast, @hono/node-server, @mrleebo/prisma-ast, @prisma/config, @prisma/dev, chevrotain, deepmerge-ts, effect, hono, lodash, mysql2, prisma, valibot.
- Puppeteer group: @puppeteer/browsers, extract-zip, puppeteer, puppeteer-core.
- PDF group: pdfjs-dist, @mapbox/node-pre-gyp, tar.

The PDF.js mitigation is the vendor-documented workaround, not a claim that an old package is patched. See [Mozilla's advisory](https://github.com/mozilla/pdf.js/security/advisories/GHSA-wgrm-67xf-hhpq). See also the [Next.js August security release](https://nextjs.org/blog/august-2026-security-release) and [node-tar hardlink traversal advisory](https://github.com/advisories/GHSA-34x7-hfp2-rc4v). The saved audit contains the complete advisory list, including multiple tar findings.

## Packaging findings

The upgraded build exposed overly broad filesystem tracing around runtime profile-photo storage. Runtime-path tracing hints and explicit exclusions now prevent local QA/output/tmp and mounted photo folders from entering that route's standalone trace. The final route trace contains 181 files and zero files matching those excluded local-data paths. A fictional runtime save/read roundtrip passes.

Docker build context also excludes local review artifacts, browser profiles, SQL scratch data and runtime upload directories. No existing customer files were removed.

Existing Dockerfile installs a global Prisma CLI and a separate Nodemailer dependency outside the repository's fully locked application install. Therefore this npm lockfile audit cannot certify every package in the eventual production image. Pin/reconcile those installs and scan the built image before claiming reproducible security coverage. This review did not silently change migration tooling or perform a Docker deployment.

## Release judgment

The requested dependency review is completed, but the whole application is NOT certified vulnerability-free or unconditionally production-ready. The scoped content/consent implementation passes local checks. Before a blanket security sign-off, finish the above major-version qualifications, reconcile runtime installs, rebuild and scan the actual image, and retest authenticated workflows. No independent security assessment or explicit risk acceptance has been obtained.
