# Ceylon Mega Tours

A premium bilingual Sri Lanka tourism website built with Next.js App Router for a private tour and transport brand. The project is optimized for Vercel free deployment and supports a Sanity free-tier content workflow with local fallback content.

## Highlights

- English and Russian localized routes
- Russian default landing route: `/ -> /ru`
- Premium homepage with About Me, hybrid destination/service showcase, featured Tour Packages, gallery, testimonials, and inquiry flow
- Dedicated Tour Packages list page and localized package detail pages
- Lightweight motion system with reveal and image drift effects
- Route-level skeleton loading
- Vercel-friendly inquiry API route

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Sanity-ready content layer
- CSS-based styling and motion

## Routes

- `/`
- `/en`
- `/ru`
- `/en/tour-packages`
- `/ru/tour-packages`
- `/en/tour-packages/[packageId]`
- `/ru/tour-packages/[packageId]`

## Local Development

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000/ru`
- `http://localhost:3000/en`

## Environment Variables

Sanity is optional. If environment variables are missing, the app uses the built-in fallback content from `lib/fallback-content.ts`.

Copy `.env.example` to `.env.local` and fill in your values if you want CMS-backed content:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
```

## Main Project Structure

```text
app/                 Routes, localized pages, API routes
components/          Layout, sections, skeletons, motion helpers
lib/                 Types, fallback content, locale helpers, data loading
sanity/              Sanity schema definitions
scripts/             Small utility scripts
```

## Deployment

### Vercel

1. Import the repository into Vercel.
2. Framework preset: `Next.js`
3. Build command: `npm run build`
4. Output setting: default Next.js output
5. Add Sanity environment variables only if you want live CMS content

### GitHub

This repository is ready to push. Recommended first commands:

```bash
git add .
git commit -m "Initial Ceylon Mega Tours site"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Notes

- The homepage skeleton loader lives in `app/[locale]/loading.tsx`.
- Inquiry submissions are handled by `app/api/inquiry/route.ts`.
- The site currently works fully without Sanity because of the local fallback content layer.
