# CryptoSynth — Catatan Crypto Personal

Blog personal berbahasa Indonesia tentang crypto. Domain: **cryptosynth.id**

## Tech Stack

- **Framework:** Astro v6.3+ (SSG)
- **Content:** Markdown + MDX via `@astrojs/mdx`
- **Deploy:** Vercel (`@astrojs/vercel` adapter)
- **Image:** Sharp v0.34+ (post-build optimization via `scripts/optimize-images.mjs`)
- **Syntax Highlight:** Shiki (Dracula theme)
- **SEO:** sitemap, RSS, structured data (Article schema, breadcrumbs)

## Commands

```bash
npm run dev       # local dev server
npm run build     # production build + postbuild image optimization
npm run preview   # preview production build
```

## Project Structure

```
src/
  content/blog/         # Markdown/MDX articles (16+ published)
  data/airdrops.json    # Airdrop tracker data
  components/           # Astro components (SeoHead, FaqSection, OptimizedImage, etc.)
  layouts/              # BaseLayout.astro
  pages/
    index.astro         # Terminal-themed homepage
    blog/[id].astro     # Single article template
    articles.astro      # Article archive
    airdrop-tracker.astro  # Airdrop tracker tool
    scam-check.astro    # Scam/phishing checker tool
    tools.astro         # Tools landing page
    api/                # Serverless functions
      threat-check.ts   # Scam checker API (9+ threat intel sources)
      goplus.ts         # GoPlus security API
      wallet.ts         # Wallet API
      admin/            # Admin panel APIs
    admin/              # Admin panel pages
    category/           # Category pages (airdrop, node, tutorial)
  styles/global.css     # Global stylesheet
  utils/                # Utility functions (relativeTime, etc.)
scripts/                # Build & content scripts (Python, Shell, JS)
```

## Conventions

- **Language:** Semua konten dan UI dalam Bahasa Indonesia
- **Commit format:** `fix:`, `feat:`, `publish:`, `seo:`, `chore:`, `ui-fix:` (optional scope seperti `(tools)`, `(threat-api)`)
- **Branching:** Solo dev, langsung push ke `main`, tidak ada PR/feature branch
- **Design:** Terminal-themed, dark mode (Dracula-inspired), mobile-first
- **Domain:** `cryptosynth.id` canonical, `www.cryptosynth.id` redirect (301)

## Key Features

1. **Blog/Articles** — Markdown articles dengan SEO head, FAQ sections, optimized images
2. **Airdrop Tracker** — Database airdrop dengan risk score, cost, deadline
3. **Scam Checker** — Cek domain/address via 9+ threat intel + Cyrillic homograph detection
4. **Admin Panel** — CRUD articles, airdrops, pages
5. **Search** — Client-side search dengan JSON index
6. **RSS/Sitemap** — Auto-generated

## Notes

- Dependencies minimal: hanya 6 runtime deps (astro core + mdx, rss, sitemap, vercel, sharp)
- Python scripts untuk generate AI/OG images (butuh `python3` + deps)
- Shell script `fetch-scam-alerts.sh` untuk scam data scraping
- Post-build `optimize-images.mjs` jalan otomatis via `postbuild` script
