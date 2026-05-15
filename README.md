# Trump-Hollow Builders

Marketing and portfolio site for Trump-Hollow Builders LLC, a custom remodel contractor serving the Greater Portland Metro Area.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

## Prerequisites

- Node.js 20 or newer
- npm 10+

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Type-check without emitting files |

## Environment variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used by `sitemap.ts`, `robots.ts`, JSON-LD, and Open Graph tags | `https://trumphollowbuilders.com` |

Set this in the deploy target (e.g. Vercel project settings) so the production sitemap and structured data emit the correct hostname.

## Project layout

```
src/
  app/
    layout.tsx         Root layout: metadata, JSON-LD, header/footer
    page.tsx           Homepage
    sitemap.ts         Generated /sitemap.xml
    robots.ts          Generated /robots.txt
    gallery/           Portfolio gallery routes
  components/          Header, Footer, gallery UI, animation primitives
  lib/
    site.ts            SITE_URL helper
    structured-data.ts LocalBusiness + FAQ JSON-LD definitions
    utils.ts           cn() helper
public/
  dropbox/             Source photography (see Image pipeline)
  images/              Per-section image folders
```

## Updating contact info

Phone and email currently live in:

- `src/app/page.tsx` (contact section, FloatingCTA)
- `src/components/layout/Footer.tsx`
- `src/lib/structured-data.ts` (LocalBusiness JSON-LD)

Update all three when a number or email changes.

## Image pipeline

Source images in `public/dropbox/` are large camera-resolution JPGs. Before deploying you can resize them with the bundled script:

```bash
bash scripts/optimize-images.sh
```

The script targets `public/` relative to its own location and resizes to max 1920 px wide at quality 80. It uses macOS `sips`; on Linux/Windows install ImageMagick and adapt the script, or run a one-off Sharp/Squoosh pass.

## Deploying

The project is built for Vercel. Push to `main` and Vercel handles the build. The CI workflow at `.github/workflows/ci.yml` runs `lint`, `tsc --noEmit`, and `build` on every push and PR.

## Adding a new gallery image

1. Drop the optimized image (≤ 1920 px wide, ≤ 300 KB, WebP preferred) into the appropriate `public/images/galleryN/` directory.
2. Add an entry to the `galleryImages` array in the matching gallery page under `src/app/gallery/*/page.tsx`.
3. Use kebab-case filenames without spaces.

## Brand

Brand colors are defined in `src/app/globals.css` (`--color-*` CSS variables). Hex values are also referenced inline in components; updating brand colors requires editing both.
