# Local security and container certification 2026-09-08

## Decision

HOLD unconditional deployment sign-off. Runtime tests and the covered Word/PDF parity review pass, but the exact image fails the high-severity security threshold. Nothing was deployed, pushed or committed. No production data was accessed.

## Tested artifact

- Image: `werkcv:security-qa-parity-final-20260908`.
- Image ID: `sha256:80690f2053a99822c6495f3191dda0787d297d0be57ec7f8c2b744fc2128eaa4`.
- Digest-pinned Node 24.20.0 Debian 13 trixie base; npm 12.0.2; Chromium 152.0.7977.82.
- Verified non-root UID 1001. Repository starting HEAD was `60bbbdceac4f6f778bc5a15452895bb45f9bafeb`; the image includes uncommitted changes, so HEAD alone does not identify it.
- Disposable PostgreSQL database, fictional accounts and a local non-relaying SMTP catcher only. Dedicated bridge and localhost published ports; not an air-gapped network.

## Changes qualified

Prisma/client/adapter 7.10.0, Nodemailer 10.0.1, PDF.js 6.3.289 and Puppeteer 25.10.0 are pinned. Next.js and its ESLint configuration are 16.3.4. Scoped overrides use deepmerge-ts 8.0.2 under Prisma config and mysql2 3.24.3 under Prisma. Generation and migration/restore checks pass with these overrides.

Application dependency audit: zero advisories at `2026-09-08T02:45:08.198Z`. This is NOT an OS or global npm audit. `npm run audit:agency:dependencies` is diagnostic; report-generation success is not a clean-security gate.

Runtime Prisma and Nodemailer now come from the same locked, pruned application installation; startup invokes the local Prisma CLI directly. PDF parsing uses the patched ESM build and matching worker; rendering was adapted to current PDF.js/Puppeteer APIs. Local artifacts and upload directories are excluded from the build context. Debian repositories are not snapshot pinned: future rebuilds require another scan.

Production authentication now fails closed if SMTP is missing rather than logging a login code. The regression check verifies rejection and no code logging. Development-only behaviour remains unchanged.

The schema now declares `@@index([meaningfulContentAt])`, already created by migration `20260826000000`. No new migration or historical migration edit was needed. Migration fixtures had an incorrect parameter reference, now fixed. Browser tests use named stages instead of obsolete numeric steps.

## Checks passed

- Final container production build: 555 pages, TypeScript passed.
- Agency unit suite: 32 tests.
- Isolated Agency integration and entitlement tests.
- Migration rehearsal: empty chain, legacy forward migration, replay, dump/restore and no schema drift.
- Focused discovery/security tests: 72 at qualification checkpoint; final four security contracts rerun successfully.
- Final-image Dutch/English consumer flow: local login email, single-use codes, personal CV creation, image previews, PDF download and unauthenticated rejection.
- Final-image Agency browser flow: desktop/mobile, editing, approval, four exports, reopening, outcome recording and deletion.
- Final-image public checks: six exact download bytes/MIME, default-denied consent, grant/withdrawal, server rejection, no third-party analytics, responsive layout and no-JavaScript links.
- Final-image discovery audit: nine pages, zero errors.
- Focused lint and whitespace checks passed; Windows line-ending notices remain.

Evidence: `.codex-tmp/container-security/consumer-flow.json`, `agency-flow.json`, `.codex-tmp/agency-discovery/local.json` and `release-check/results.json`. These are ignored local QA artifacts, not publicly served content.

## Failed security gate

Grype 0.116.1, pinned image digest `sha256:1e71065c0a4cff3e6bd3b8add525ffac4343eb4971694eb90a31cf6d4d3e85db`, scanned a read-only Docker archive without the Docker socket or production credentials. The final report is `.codex-tmp/container-security/grype-parity-final.json`. Exit 1 at `--fail-on high`.

| Final high/critical matches | Count |
| --- | ---: |
| Debian critical, wont-fix | 10 |
| Debian high, not-fixed | 4 |
| Debian high, wont-fix | 68 |
| Global npm high | 0 |
| Total | 82 |

There are 43 unique advisory IDs among those matches. The first Bookworm candidate had 118 high/critical matches and 69 unique IDs; the previous trixie image had 86. Removing npm, npx and Yarn from the final runtime eliminated the four global npm matches. Counts are scanner matches, not a demonstrated number of remotely exploitable defects. No advisories were suppressed or accepted as harmless.

The final runtime has no npm, npx or Yarn executable; the application starts Node directly and the four npm matches are gone. Next security action: assess OS advisory reachability and supported alternative packages/images. A vendor wont-fix status is not automatic risk acceptance. Do not silently weaken the scanner threshold.

## Word export finding

All six pages of the two PDF variants and all four pages of the two Word variants were rendered and inspected. Text is readable without clipping. Direct candidate name/email/phone details are removed from contact-reduced output; employers and schools remain as documented.

The DOCX generator now renders internships, interests, education descriptions, locations, awards, side activities, custom sections and references where present. A section-complete fixture assertion passes against the approved snapshot. Fresh Word and PDF exports were rendered with the isolated document renderer and inspected; headings stay with their first content and there is no clipping or overlap. The synthetic browser fixture combines generic sample CV data with a separate evidence exercise; it is not an AI accuracy benchmark.

The document skills required actual rendering and inspection. The parity gap is closed for the covered CV sections; future CV schema additions must extend the parity fixture before release.

## Scope limits

- Payment disabled locally: no real checkout/webhook certification.
- Local login-mail test does not certify external deliverability, contact mail or candidate invitation delivery.
- Claim verifier and candidate acknowledgement flags stayed off; no live AI benchmark or feature activation.
- No penetration test, independent accessibility audit, legal compliance certification, production backup or search-indexing confirmation.
- Deployment needs separate authorization, production backup and post-deployment checks. Preserve rollback images and unrelated Docker resources.

## References

Compatibility review used [Node EOL guidance](https://nodejs.org/en/about/eol), [Nodemailer changelog](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md), [PDF.js Node example](https://github.com/mozilla/pdf.js/blob/master/examples/node/getinfo.mjs), [deepmerge-ts 8 notes](https://github.com/RebeccaStevens/deepmerge-ts/releases/tag/v8.0.0) and [mysql2 changelog](https://github.com/sidorares/node-mysql2/blob/master/Changelog.md). Scan procedure follows [Grype documentation](https://oss.anchore.com/docs/installation/grype/) and [Docker image export](https://docs.docker.com/reference/cli/docker/image/save/).
