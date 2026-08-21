# Full CV Preview and Final Review Workspace

Status: Product and interaction specification  
Scope: Dutch and English CV editors  
Implementation status: Not started  
Primary owner: Editor experience  

## Mockup artifacts

- Interactive responsive mockup:
  `docs/mockups/full-cv-preview-review.html`
- Desktop default state:
  `docs/mockups/full-cv-preview-desktop-concept.png`
- Desktop Design-open state:
  `docs/mockups/full-cv-preview-design-open-concept.png`
- Mobile full-screen state:
  `docs/mockups/full-cv-preview-mobile-concept.png`

The HTML mockup demonstrates zoom, Fit, page navigation, the integrated desktop
design panel, mobile full-screen behavior, template selection, and color
selection. It is a product prototype only and is not connected to production CV
data, saving, checkout, or analytics.

## 1. Executive decision

Build a user-triggered final-review workspace that expands the existing live CV
preview into a focused, near-full-screen experience.

- Desktop and tablet: a near-full-screen modal workspace.
- Mobile: a true full-screen dialog, not a bottom sheet.
- The workspace must use the existing CV preview renderer and current form data.
- It must not open automatically when the CV becomes ready.
- Download remains the primary action.
- Design review is the secondary action.
- Editing remains immediately reversible through "Back to editor".

The purpose is not to add another editor. It is to let users answer one final
question confidently: "Is this the CV I want to send?"

## 2. Problem statement

WerkCV currently provides:

- a live preview in the right-hand desktop pane;
- a 72vh preview sheet on mobile;
- responsive A4 scaling;
- live page counting;
- template and color controls;
- ready-state and download controls.

The current preview is useful while editing, but it is not an intentional final
review step:

- desktop users see the document inside less than half the viewport;
- mobile users see it in a partial-height sheet;
- template review and document inspection are separate interactions;
- users cannot comfortably inspect typography, spacing, page breaks, or the
  first-page impression before payment;
- the existing renderer and the generated PDF are separate implementations, so
  preview-to-PDF parity must be explicitly tested.

Recent observed behavior supports this need: a completed English CV user
continued comparing templates and role examples but never expressed download
intent. This does not prove causation, but it is consistent with unresolved
output confidence.

## 3. Research and product references

### Resume.io

Resume.io lets users click the live preview to expand it into the template
selector, inspect a larger version, switch design, navigate pages, export, or
return to the editor. This is the closest proven interaction model to the
WerkCV need.

- https://help.resume.io/en/articles/3785216
- https://help.resume.io/en/articles/3784960

### FlowCV

FlowCV keeps content, design controls, a live document preview, and download
within one coherent builder workflow. Its useful lesson is proximity: document
appearance controls should remain adjacent to the rendered document, not hidden
in a distant workflow.

- https://flowcv.com/

### Kickresume

Kickresume emphasizes constrained design customization so users can change
appearance without accidentally breaking professional formatting. WerkCV
should preserve the same principle: offer template and approved color choices,
not low-level layout controls in the final review.

- https://www.kickresume.com/en/resumes/

### Check-before-submit pattern

The GOV.UK check-answers pattern states that a review step can increase
confidence and reduce errors when users can inspect what they entered and return
to change it before the final action.

- https://design-system.service.gov.uk/patterns/check-answers/

### Accessible modal behavior

The W3C modal dialog pattern requires contained keyboard focus, Escape to close,
a visible close action, correct dialog labelling, and focus restoration.

- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- https://www.w3.org/WAI/WCAG22/Techniques/html/H102

## 4. Product goals

### Primary goal

Increase paid CV downloads per ready CV by increasing confidence in the final
document before checkout.

### Supporting goals

1. Make every CV page inspectable on desktop and mobile.
2. Make template and color changes available without losing content.
3. Make page count and page boundaries unambiguous.
4. Keep the final price and no-subscription promise visible beside Download.
5. Preserve a fast path for users who are already ready to buy.
6. Capture enough analytics to distinguish inspection, design comparison,
   checkout intent, and payment abandonment.

### Non-goals

- Do not add content editing inside the preview.
- Do not add ATS scoring, vacancy matching, cover letters, or writing tools.
- Do not add font, margin, column-width, or arbitrary spacing controls.
- Do not render a new or approximate CV implementation.
- Do not show a checkout form inside the review workspace.
- Do not automatically interrupt users when readiness changes.
- Do not replace the existing editor or template selector in the first release.

## 5. Experience principles

1. **The document is the focal point.** Chrome supports the CV and does not
   compete with it.
2. **Review is optional but obvious.** Users can download immediately or inspect
   first.
3. **One primary action.** Download is the only solid green action.
4. **Design is reversible.** Template and color changes preserve all content.
5. **Price is never a surprise.** The one-time, tax-inclusive price and absence
   of a subscription appear next to Download.
6. **Two pages are normal.** Page counts of one or two are neutral. Only more
   than two pages receive a length warning.
7. **No hidden state.** Saving, saved, page count, zoom, and current template
   remain visible.
8. **No modal maze.** Design choices are integrated into the workspace on
   desktop and use one dedicated full-screen selector on mobile.

## 6. Entry points

### Desktop

1. Add an Expand icon button to the existing "Live preview" header.
2. Clicking the rendered A4 page may also open the workspace.
3. The page click target must expose `cursor: zoom-in`, keyboard activation, and
   an accessible name.
4. The existing live preview remains scrollable; scrolling must not trigger
   expansion.

### Mobile and tablet

1. The existing fixed "Live preview" button opens the full-screen workspace.
2. When the CV is ready, its label becomes:
   - NL: `CV bekijken`
   - EN: `Review CV`
3. Before readiness, retain:
   - NL: `Live preview`
   - EN: `Live preview`
4. Replace the current 72vh bottom sheet. There must be one preview experience,
   not a partial preview followed by another full preview.

### Automatic behavior

The workspace must never open automatically. When readiness changes, controls
may update their label and emphasis without moving focus or changing scroll
position.

## 7. Desktop information architecture

### 7.1 Dialog frame

- Viewport coverage: approximately 96-98% width and height.
- Maximum outer radius: 8px.
- Background scrim: neutral black at 45-55% opacity.
- Scrim click does not close the workspace.
- Background editor is inert and cannot scroll.
- The workspace is rendered above template, upload, and checkout layers using a
  documented z-index scale.

### 7.2 Fixed command bar

Left:

- WerkCV.nl brand at large desktop widths.
- Close icon.
- `Back to editor` / `Terug naar editor`.

Centre:

- `Review your CV` / `Controleer je CV`.
- Persistent save state:
  - `Saving...` / `Opslaan...`
  - `Saved` / `Opgeslagen`
  - `Not saved - retry` / `Niet opgeslagen - opnieuw proberen`

Right:

- `Design` / `Ontwerp` secondary blue outlined action.
- Zoom out icon.
- `Fit` / `Passend`.
- Zoom in icon.
- `1 of 2` / `1 van 2`.
- Primary green `Download CV` / `CV downloaden`.
- Trust line: `One-time €4.99 incl. VAT · No subscription` /
  `Eenmalig €4,99 incl. btw · Geen abonnement`.

The price must use the shared price configuration rather than a literal value.

### 7.3 Document canvas

- Cool pale gray-teal background, visually separate from the white PDF.
- A4 pages remain centred and retain the 210:297 aspect ratio.
- Default zoom is `Fit page` on desktop.
- Pages stack vertically with 20-28px visual separation.
- Each page has a restrained 1px border and low-elevation shadow.
- The next page should peek into view where viewport height permits.
- Scrolling updates the active page indicator through IntersectionObserver.
- The CV itself must not be placed inside a decorative card.

### 7.4 Page navigation

- Top page status always reflects the page nearest the viewport centre.
- Optional floating previous/next page arrows may appear on desktop.
- Page navigation scrolls smoothly unless reduced motion is enabled.
- One or two pages use neutral styling.
- More than two pages uses a restrained amber status:
  - NL: `3 pagina's - controleer de lengte`
  - EN: `3 pages - review the length`
- The warning links back to the editor's most likely length-heavy section; it
  does not block download.

### 7.5 Design panel

Selecting Design opens an integrated side panel inside the workspace.

- Desktop width: 320-360px.
- It may overlay or resize the canvas, but the active A4 page must remain
  visible.
- It reuses the existing template groups and real CV data.
- Current template is selected and named.
- Plain and ATS-safe templates remain first.
- Color options appear below the selected template.
- Choosing a template updates the preview immediately.
- Content, zoom mode, and active page are preserved.
- Closing the panel returns focus to Design.
- The panel must not contain a second Download button.

The implementation should extract reusable template-gallery content from
`TemplateSelector.tsx` instead of duplicating template lists.

## 8. Mobile information architecture

### 8.1 Full-screen frame

- Use the full visual viewport and safe-area insets.
- No background scrim and no rounded floating container.
- The editor beneath is inert.
- The browser Back action and Escape, when available, close preview first.

### 8.2 Top app bar

- Height: 56px plus safe-area inset.
- Close icon with at least a 44x44px target.
- Title:
  - NL: `CV controleren`
  - EN: `Review CV`
- Compact saved state.
- Blue `Design` / `Ontwerp` action with at least a 44px target.

### 8.3 Document controls

- Second fixed row or compact canvas toolbar.
- Active page: `Pagina 1 van 2` / `Page 1 of 2`.
- Zoom out, Fit, and zoom in controls.
- All targets are at least 44x44px.
- Default zoom is Fit width with 12-16px side gutters.
- Custom zoom permits horizontal pan only after zoom exceeds Fit.

### 8.4 Canvas and pages

- Vertical page scrolling.
- Clear separation between pages.
- No partial-height sheet.
- The fixed bars must not cover the top or bottom of either page.
- The preview canvas includes bottom padding equal to the action bar height.

### 8.5 Sticky action bar

- Fixed above the bottom safe area.
- One full-width green `Download CV` / `CV downloaden` action.
- Trust line remains visible:
  - EN: `One-time €4.99 incl. VAT · No subscription`
  - NL: `Eenmalig €4,99 incl. btw · Geen abonnement`
- Do not add another solid action.
- `Back to editing` may be a text action only when it does not make the action
  bar exceed a practical height.

### 8.6 Mobile design selection

- Design opens a dedicated full-screen template selector.
- Returning from selection restores the same page and zoom.
- The current template and colors are selected.
- Download remains in the review workspace, not in the selector.

## 9. Copy specification

| Purpose | Dutch | English |
| --- | --- | --- |
| Workspace title | Controleer je CV | Review your CV |
| Return | Terug naar editor | Back to editor |
| Design | Ontwerp | Design |
| Fit zoom | Passend | Fit |
| Saved | Opgeslagen | Saved |
| Saving | Opslaan... | Saving... |
| Download | CV downloaden | Download CV |
| Page count | Pagina 1 van 2 | Page 1 of 2 |
| Price reassurance | Eenmalig {price} incl. btw · Geen abonnement | One-time {price} incl. VAT · No subscription |
| Long CV warning | 3 pagina's - controleer de lengte | 3 pages - review the length |
| Save failure | Niet opgeslagen. Probeer opnieuw. | Not saved. Try again. |

Do not use:

- `Finish`
- `Continue`
- `Export`
- `Buy`
- `Unlock`
- `Premium`
- vague actions such as `Done` or `OK`

## 10. State and behavior requirements

### Draft CV

- Full preview is available before readiness.
- Download follows the existing readiness rule.
- If the user is not ready, the primary action says how many key steps remain
  and returns to the next incomplete editor section.
- No checkout can open for an unready CV.

### Ready CV

- Download is enabled and green.
- Price reassurance is visible.
- Design is blue and secondary.
- Readiness does not automatically open the workspace.

### Saving

- Preview renders current local form state immediately.
- Download must flush pending changes through the existing save path.
- Download is temporarily disabled while the final save is in progress.
- If save fails, checkout must not begin with stale server data.

### Template or color change

- Preview updates immediately.
- Change is persisted through existing template and theme actions.
- Page count is recalculated.
- Active page is clamped if the new page count is smaller.
- Zoom mode remains unchanged.

### Checkout

- Download uses the existing checkout/download function and passes
  `source: full_preview`.
- No new checkout modal is introduced by this feature.
- Paid users receive the PDF through the current download behavior.
- Unpaid users continue through the active checkout experiment.

### Closing

Supported close methods:

- visible X;
- Back to editor;
- Escape;
- browser Back on mobile;
- successful download may keep the workspace open unless current product
  behavior intentionally navigates away.

Closing restores:

- editor scroll position;
- form values;
- template and color;
- focus to the element that opened the workspace.

## 11. Zoom requirements

- Zoom modes: Fit page, Fit width, Custom.
- Desktop default: Fit page.
- Mobile default: Fit width.
- Custom range: 50% to 125%.
- Step: 10%.
- Disable controls at range boundaries.
- Zoom centres on the visible page rather than jumping to page one.
- ResizeObserver recalculates Fit values after viewport, orientation, or design
  panel changes.
- Respect `prefers-reduced-motion`.

## 12. Accessibility requirements

Use a native `<dialog>` with `showModal()` where practical, with a portal-based
fallback only if required by product constraints.

Required behavior:

- `aria-modal="true"`;
- visible title connected with `aria-labelledby`;
- initial focus on the dialog title or Back to editor;
- Tab and Shift+Tab stay within the dialog;
- Escape closes;
- focus returns to the invoking control;
- background editor is inert;
- every icon button has an accessible name and tooltip;
- save and page-count changes use restrained `aria-live="polite"` regions;
- visible focus styles meet contrast requirements;
- controls meet 44x44px mobile targets;
- document canvas remains usable at 200% browser zoom;
- color is never the only signal for save, readiness, or warnings.

## 13. Technical architecture

### New components

- `app/editor/FullCvPreviewDialog.tsx`
- `app/editor/FullPreviewToolbar.tsx`
- `app/editor/ScaledCvPreview.tsx`
- `app/editor/PreviewDesignPanel.tsx`
- `app/editor/usePreviewZoom.ts`

Names may change during implementation, but responsibilities must remain
separate.

### Required refactors

1. Extract the repeated A4 scaling/page-divider structure from `editor.tsx` into
   `ScaledCvPreview`.
2. Keep `Preview` as the only React CV renderer.
3. Extract reusable template-group content from `TemplateSelector.tsx`.
4. Ensure only one expensive preview instance is active for a viewport:
   - desktop pane when workspace is closed;
   - full preview when workspace is open;
   - mobile preview when requested.
5. Reuse existing:
   - `handleDownload`;
   - `handleTemplateChange`;
   - `handleColorThemeChange`;
   - `handlePageCountChange`;
   - `cvDownloadPrice`;
   - readiness and save state.

### Editor state

Minimum state:

- `isFullPreviewOpen`;
- `fullPreviewSource`;
- `zoomMode`;
- `customZoom`;
- `activePreviewPage`;
- `isDesignPanelOpen`;
- `fullPreviewOpenedAt`.

Do not duplicate CV data, template ID, theme ID, page count, readiness, save
state, or download state.

### Rendering and PDF parity

The live React preview and `lib/pdf.ts` are separate rendering implementations.
This feature must not claim pixel-perfect PDF parity without verification.

Before release:

- compare preview screenshots with generated PDFs for all production templates;
- use a one-page fixture and a two-page fixture;
- verify fonts, colors, margins, page breaks, bullets, links, photo behavior,
  optional sections, and overflow;
- treat material preview/PDF mismatch as a release blocker.

## 14. Analytics

### Events

`full_preview_opened`

- `cvId`
- `source`: `desktop_preview_header`, `desktop_document`, `mobile_floating`
- `uiLanguage`
- `templateId`
- `completionScore`
- `isReady`
- `pageCount`
- `deviceType`
- `contentOrigin`, when available

`full_preview_closed`

- all stable context above
- `closeMethod`: `x`, `back_to_editor`, `escape`, `browser_back`, `download`
- `durationMs`
- `maxPageViewed`
- `finalZoomMode`
- `designOpened`
- `templateChanged`
- `downloadClicked`

`full_preview_design_opened`

- stable context
- `activePage`
- `zoomMode`

`full_preview_template_selected`

- stable context
- `previousTemplateId`
- `templateId`

`full_preview_color_changed`

- stable context
- `previousThemeId`
- `themeId`

`full_preview_download_clicked`

- stable context
- `durationMs`
- `maxPageViewed`
- `designOpened`
- `templateChanged`

Existing download and checkout events must also receive:

- `source: full_preview`
- `templateId`
- `pageCount`

### Privacy

Never record:

- CV text;
- names;
- email addresses;
- phone numbers;
- filenames;
- screenshots;
- vacancy text.

### Dashboard funnel

Ready CV
→ Full preview opened
→ Design opened
→ Template changed
→ PDF clicked
→ Checkout started
→ Paid

Segment by locale, device, content origin, template, and landing source.

## 15. Success metrics

### Primary

- Paid CV downloads / unique ready CVs.

### Secondary

- PDF clicks / unique ready CVs.
- Checkout starts / full preview opens.
- Paid downloads / full preview opens.
- Paid downloads after a template change.
- Mobile ready-to-PDF conversion.
- Median time from ready state to PDF click.

### Guardrails

- No increase in editor save failures.
- No increase in checkout failures.
- No increase in page-load or interaction errors.
- Full-preview close-without-action rate is monitored, not treated alone as
  failure.
- No material decrease in direct Download conversion among users who do not
  open preview.

## 16. Rollout plan

1. Ship event support and dashboard fields.
2. Extract and regression-test the scaled preview component.
3. Ship desktop workspace behind a feature flag.
4. Ship mobile full-screen workspace and remove the old bottom sheet.
5. QA preview/PDF parity across templates.
6. Run an A/B test:
   - control: current preview;
   - treatment: expanded review workspace.
7. Evaluate only after enough ready CVs are observed.

The treatment must not automatically open. The experiment tests availability
and presentation, not an interruptive flow.

## 17. Performance requirements

- Dialog chrome appears within 150ms of activation.
- Existing CV content remains visible while scaling settles.
- No network request is required to open preview.
- Opening preview does not generate a PDF.
- Template switching remains responsive and does not remount unrelated editor
  sections.
- Avoid two simultaneously active ResizeObservers for duplicate CV previews.
- No cumulative layout shift in the editor when opening or closing.

## 18. QA matrix

### Viewports

- 390x844 mobile
- 430x932 large mobile
- 768x1024 tablet
- 1280x720 laptop
- 1440x900 desktop
- 1920x1080 large desktop

### Browsers

- Chrome desktop and Android
- Safari desktop and iOS
- Edge desktop
- Firefox desktop

### CV fixtures

- empty CV;
- 80% ready CV;
- one-page CV;
- two-page CV;
- three-page CV;
- CV with photo;
- CV without photo;
- long unbroken URL;
- long Dutch and English names;
- all optional sections;
- 20+ skills;
- experience with reordered bullets.

### Core scenarios

1. Open and close without changes.
2. Open from desktop header and document.
3. Open from mobile floating action.
4. Change template and color.
5. Move between one, two, and three pages.
6. Zoom and resize/orient device.
7. Return to editor with original scroll position.
8. Download while saved.
9. Download while save is pending.
10. Handle save failure.
11. Handle checkout failure.
12. Complete paid download.
13. Keyboard-only navigation.
14. Screen-reader dialog announcement.
15. Browser Back closes mobile preview before leaving editor.

## 19. Acceptance criteria

The feature is ready only when:

- both NL and EN copy are complete;
- no Dutch copy appears in the English flow;
- mobile uses a true full-screen review view;
- desktop shows an inspectable centred A4 page;
- Download is the only solid green action;
- the configured one-time tax-inclusive price and no-subscription promise are
  visible;
- template and color changes preserve content;
- one and two pages are neutral;
- more than two pages receives a non-blocking warning;
- all close methods preserve editor state and restore focus;
- existing readiness gating still prevents unready checkout;
- all analytics events persist;
- no CV content enters analytics;
- preview/PDF comparison passes every production template;
- no hydration, nested-button, focus, overflow, or mobile-safe-area regression
  remains.

## 20. Explicit design review

This proposal deliberately avoids:

- auto-opening a modal at 100%;
- placing a checkout form inside preview;
- adding scores or optimization widgets to final review;
- showing a large template gallery by default;
- giving equal emphasis to Design and Download;
- warning users merely because their CV has two pages;
- stretching the A4 page to fill available width;
- duplicating the CV renderer.

Those choices keep the review workspace persuasive by reducing uncertainty,
not by adding pressure.
