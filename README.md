# Pathhaven Home Solutions

A complete buildless HTML, CSS and vanilla JavaScript website. The exact original logo PNGs are preserved in assets/img. Optimized WebP versions are served on pages. No account, package install or build is required to run the site.

## Before publishing

1. Edit the CONFIG object at the top of assets/js/main.js. Fill phone, smsNumber, email, legalEntityName, formEndpoint, siteUrl, officeHours, stateDisclosure, effectiveDate and each area's counties. Confirm the offerTimeframe is a promise your team can actually meet. Do not enter secrets in browser JavaScript.
2. From the extracted site folder, run `node scripts/configure.mjs` once. This optional maintenance command copies CONFIG into static HTML, legal pages, metadata, robots and sitemap so information works for crawlers and without JavaScript. It is not a deployment build step. Re-run after changing CONFIG. It keeps original placeholder templates in scripts/page-templates.json, so later updates can be repeated safely.
3. Connect and test the form endpoint. Until connected, the form states plainly that the request was not sent. Unconfigured call/text links lead to the offer form rather than a fabricated phone number.
4. Have an attorney review the Privacy Policy, Terms, consent text and state-specific wholesaling disclosures for EVERY operating state. Confirm your actual role and licensing status before publishing. These pages are editable starting text, not a legal opinion. Wholesaling rules differ by state. Have counsel review consumer rights, cancellation rights, foreclosure, probate, bankruptcy, tenant and assignment requirements. Review the privacy description against the vendors and retention practices you actually use.
5. Verify the no-fee, as-is, cash and timing policies match your signed agreements. Confirm which closing costs are covered. No reviews are shipped. Add only real, permissioned entries to CONFIG.reviews.

## Every placeholder

1. [PHONE], the public U.S. business phone.
2. [SMS NUMBER], a text-enabled U.S. number (may be the same).
3. [EMAIL], the public contact email.
4. [LEGAL ENTITY NAME], the actual registered entity.
5. [FORM ENDPOINT], your HTTPS JSON POST endpoint.
6. [YOUR-DOMAIN], configured through CONFIG.siteUrl, including https:// in CONFIG.
7. [OFFICE HOURS], with time zone.
8. [STATE-SPECIFIC DISCLOSURE], attorney-reviewed disclosures for your operating states.
9. [EFFECTIVE DATE], for the privacy and terms pages.
10. [CALIFORNIA COUNTIES].
11. [GEORGIA COUNTIES].
12. [FLORIDA COUNTIES].
13. [TEXAS COUNTIES].
14. [ARKANSAS COUNTIES].

## Form connection

The handler POSTs JSON with Accept: application/json. A Formspree endpoint configured to accept JSON submissions is the simplest target. For a custom service, allow requests from your production domain and accept this payload:

address, situation, condition, timeline, firstName, phone (+1 format), email, consent (boolean), website (honeypot), utm (object), referrer, consentText (null unless opted in), consentVersion, submittedAt, elapsedMs.

Only a successful HTTP response without a `success:false`, `ok:false` or error field is shown as received. The success text confirms receipt, not a guaranteed offer. Timeout is 15 seconds; an uncertain result stays an error so the visitor can retry or call. A retry may duplicate an inquiry if a timeout happened after receipt; deduplicate by phone/property at your endpoint. An endpoint may return a JSON object such as `{"ok":true}` after durable acceptance. A 2xx response is your endpoint's contract that it accepted the inquiry.

Do not use a Web3Forms URL without adapting its access_key and payload requirements. No provider key is invented. Client honeypot and minimum-time checks are UX-level defenses only: enforce spam controls, payload validation, consent logging, access controls, retention and rate limiting at the endpoint. Store consent records securely. Do not automatically enroll unchecked submissions in automated calls/texts. Consent is optional and unchecked by default. The phone step intentionally requires a 10-digit U.S. number for the five U.S. markets.

Answers live in page memory only, never localStorage or cookies. Refreshing clears them. Analytics hooks contain step numbers only, never the submitted name, phone or property. UTM parameters and the referrer are sent only with the form. They can contain user-provided content, so treat them as untrusted at your endpoint.

Google Places-ready address markup is present, but no API is enabled. API keys for future features must be domain restricted. Analytics and pixels are not installed.

## GitHub and Vercel, browser steps

1. Unzip pathhaven-site.zip. Confirm index.html is directly in the extracted root.
2. Complete the configuration and legal review above.
3. On GitHub, select New repository. Name it pathhaven-site and create it.
4. Select Add file > Upload files. Upload the CONTENTS of the extracted folder, including assets, scripts and vercel.json. Commit the files. Do not upload only the ZIP or nest everything in another folder.
5. In Vercel, select Add New > Project. Import that GitHub repository.
6. Framework preset: Other. Root directory: the repository root. Build command: leave empty (override the detected value if necessary). Output directory: `.` (the root). No install command or environment variables are needed for this static site.
7. Deploy. Open the returned domain, test all six form steps, submit a test inquiry to your real endpoint, and verify actual delivery before advertising.
8. Open Project Settings > Domains > Add Domain. Enter your domain and apply the exact DNS records Vercel displays at your DNS provider. Wait for validation and HTTPS issuance.
9. Set CONFIG.siteUrl to the final canonical https domain, run `node scripts/configure.mjs` and commit the changed files. Vercel redeploys GitHub commits. Recheck canonical, sitemap and social preview URLs on your production domain.

## Git command alternative

From the extracted folder, after creating your empty GitHub repository:

```sh
git init
git add .
git commit -m "Create Pathhaven website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/pathhaven-site.git
git push -u origin main
```

Then follow Vercel steps 5–9 above. Replace YOUR-USERNAME with your GitHub username. No repository has been created or deployment performed by this deliverable.

## Local preview

Serve the extracted root with any static HTTP server. For example `python3 -m http.server 8000`, then open http://localhost:8000. ES modules need HTTP, so double-clicking index.html via file:// is not supported. Local basic servers may require /privacy.html and /terms.html instead of the clean URLs. Vercel's cleanUrls handles production links.

## Design and accessibility

Fraunces and Manrope load with display=swap from Google Fonts. GSAP and ScrollTrigger are pinned to 3.12.5 on cdnjs. Their failure does not block content or the form. The winding path and decorative motion respect reduced motion; native scroll is retained. Semantic details remain available without JavaScript. The form needs JavaScript, which is stated in the fallback. Gold display text is darkened on cream for contrast. Assets are intentionally small; original logo PNGs are included for editing but never requested by the page.

The FAQ follows the requested grid-template-rows animation, which is the explicit exception to the brief's transform/opacity-only rule. SVG stroke offset is also animated for the requested path. No size or blur animation is used elsewhere. State areas use typographic tiles rather than geographically inaccurate invented outlines. No fake testimonials, sales counts, transaction amounts or photo representations are included.

The hero routes the address into the shared final six-question flow, without duplicate answers or another contact page. Situation links preselect their category. Progress updates, keyboard buttons and focus management are included.

## Checks and limits

See AUDIT.md for checks performed and limits. Lighthouse scores, LCP, CLS, INP and 60fps are deployment/device measurements; no 95+ score or timing is claimed without measurement. Run mobile Lighthouse after filling real domains and enabling the endpoint. External resource speed, font swaps and any future tracking may affect those results. The initial page is intentionally compact and uses no photos or video payload.

For long-lived /assets cache, change the asset filename and its references whenever updating an asset in production, or shorten the cache header while actively editing.

## Five optional upgrades

1. Google Places autocomplete, with an accessible manual address fallback.
2. CRM webhook with server-side validation, deduplication and consent records.
3. Call tracking with a consent-aware attribution setup.
4. A/B test the hero headline and initial address prompt.
5. Meta and Google pixels, after updating the privacy policy and any required consent controls.

## Reference checks for legal copy review

- California Department of Real Estate consumer alerts: https://www.dre.ca.gov/Consumers/ConsumerAlerts.html
- California Attorney General homeowner resources: https://oag.ca.gov/consumers/homeowner-issues
- FCC unwanted calls and texts: https://www.fcc.gov/robocalls

These resources informed cautious language, not a conclusion that this website or your business is legally compliant.
