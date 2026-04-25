# Ceylon Mega Tours

A bilingual Next.js tourism website for a Sri Lanka private tour brand, prepared for production deployment and GitHub publishing. The current release is content-driven from local TypeScript data and optimized for simple deployment on Vercel or any Node-compatible host.

## Current Product Scope

- Russian-first localized routing with English toggle
- Home, destinations, tour packages, and package detail pages
- WhatsApp-first conversion flow
- Curated Google Business Profile review summary + testimonial cards
- Inquiry API route with validation and production-safe logging
- Route-level loading skeletons, metadata, robots, and sitemap generation

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- CSS modules/global CSS
- Hybrid content layer with local fallback data plus Sanity-backed tour packages

## Local Development

```bash
npm install
npm run dev
```

Primary local routes:

- `http://localhost:3000/ru`
- `http://localhost:3000/en`

Verification commands:

```bash
npm run lint
npm run build
```

## Environment Variables

Create a `.env.local` file from `.env.example`.

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-07-01
ENABLE_STUDIO=true
```

Production should set `NEXT_PUBLIC_SITE_URL` to the final public domain so canonical URLs, sitemap, and robots metadata resolve correctly. On Vercel, keep `ENABLE_STUDIO=true` for preview / staging and set `ENABLE_STUDIO=false` for production so `/studio` is hidden on the public site.

## Project Structure

```text
app/                 App Router pages, layouts, metadata routes, API route
components/          Layout, sections, motion helpers, skeletons
lib/                 Content, locale helpers, site config, logger, types
public/              Static brand and tour imagery
scripts/             Small development/build utilities
```

## Content Management

The current site uses a hybrid content setup:

- `lib/fallback-content.ts` still holds most destinations, reviews, and general text copy
- Tour packages are read from Sanity first through `lib/tour-packages.ts`
- `lib/contact.ts` stores shared contact values
- `lib/site.ts` stores site URL and metadata helpers
- Sanity Studio is available at `/studio` only when `ENABLE_STUDIO=true`

During rollout, tour packages safely fall back to local data if Sanity is empty or unavailable.

To prepare seed content for import, run:

```bash
node scripts/seed-tour-packages.mjs
```

## Deployment

### Vercel

1. Import the repository.
2. Framework preset: `Next.js`
3. Build command: `npm run build`
4. Install command: `npm install`
5. Preview / staging env vars:
   `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `ENABLE_STUDIO=true`
6. Production env vars:
   same as preview, plus `NEXT_PUBLIC_SITE_URL=https://your-domain.com` and `ENABLE_STUDIO=false`
7. Validate the hosted deployment before attaching the live custom domain.

### Generic Node Deployment

```bash
npm install
npm run build
npm start
```

## GitHub Publishing

Recommended first push:

```bash
git add .
git commit -m "Prepare Ceylon Mega Tours for production launch"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Notes

- The inquiry endpoint is `app/api/inquiry/route.ts`.
- Route metadata and crawl directives live in `app/layout.tsx`, `app/robots.ts`, and `app/sitemap.ts`.
- The site is static-friendly except for the inquiry API route.
- Production builds on Vercel require `NEXT_PUBLIC_SITE_URL`; preview deployments can fall back to the deployment URL.



## 🔐 Future Improvement: Bot Protection (Cloudflare Turnstile)

Currently, the inquiry form uses:

* Honeypot field (basic bot filtering)
* IP-based rate limiting

To improve security at scale, we plan to integrate Cloudflare Turnstile for advanced bot protection.

### Why it’s not enabled now

* Prioritizing conversion rate during early-stage launch
* Avoiding unnecessary friction for users
* Current traffic volume is low and manageable

### Planned Implementation

* Add Turnstile widget to inquiry form (invisible mode)
* Send token with form submission
* Verify token in API route before processing inquiry

### Benefits (when enabled)

* Prevent automated spam submissions
* Protect API from abuse
* Improve data quality for inquiries

### Environment Variables (for future use)

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

### Notes

* Integration code structure is already prepared
* Can be enabled anytime without major refactor





also found a issu when i select previes date on form the ui retun plese fill requrd field