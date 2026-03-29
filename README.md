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
- Local content layer in `lib/fallback-content.ts`

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
```

Production should set `NEXT_PUBLIC_SITE_URL` to the final public domain so canonical URLs, sitemap, and robots metadata resolve correctly.

## Project Structure

```text
app/                 App Router pages, layouts, metadata routes, API route
components/          Layout, sections, motion helpers, skeletons
lib/                 Content, locale helpers, site config, logger, types
public/              Static brand and tour imagery
scripts/             Small development/build utilities
```

## Content Management

The current site is intentionally local-content-first:

- `lib/fallback-content.ts` is the main source of tours, destinations, reviews, and text copy
- `lib/contact.ts` stores shared contact values
- `lib/site.ts` stores site URL and metadata helpers

This keeps the first production release simple and deployment-safe while remaining easy to migrate to a CMS later.

## Deployment

### Vercel

1. Import the repository.
2. Framework preset: `Next.js`
3. Build command: `npm run build`
4. Install command: `npm install`
5. Add `NEXT_PUBLIC_SITE_URL` in project environment variables.

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
