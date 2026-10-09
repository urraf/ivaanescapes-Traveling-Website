# Ivaan Escapes — Escape the Ordinary

Travel website for Ivaan Escapes (B2B travel company). React + Vite + Tailwind + Framer Motion, with a Groq-powered AI travel assistant.

## Run locally

```bash
npm install
cp .env.example .env    # add your GROQ_API_KEY
npm run dev             # http://localhost:5173
npm run build           # production build in dist/ (pre-rendered pages + sitemap)
npm run preview         # serve dist/ like Vercel does, at http://localhost:4173
```

## Deploy (Vercel)

1. Push this folder to GitHub and import it in Vercel (framework: Vite).
2. In **Settings → Environment Variables**, add `GROQ_API_KEY` (and optionally `GROQ_MODEL`).
3. Deploy. `api/chat.ts` becomes a serverless function, so the Groq key never reaches the browser.

If the key is missing or Groq is down, the chat still answers with package suggestions from local data and points visitors to WhatsApp.

## Where to edit content

| What | File |
|---|---|
| Phone numbers (team), email, address, GST, socials | `src/config/site.ts` |
| Packages, prices, itineraries | `src/data/packages.ts` |
| Destinations | `src/data/destinations.ts` |
| Destination landing pages (intro, places, how to reach, FAQs) | `src/data/destinationContent.ts` |
| B2B hotel deals (Goa, Rajasthan, Maharashtra, chains, Lemon Tree) | `src/data/hotels.ts` |
| Reviews (**sample — replace with real ones**) | `src/data/reviews.ts` |
| Blog posts | `src/data/blogs.ts` |
| AI assistant personality & rules | `api/chat.ts` |

Images are Unsplash photo IDs (for example `photo-1614591276564-7b3e69347a48`). Swap in any Unsplash ID, or point `img()` in `src/lib/utils.ts` at your own CDN.

## How booking works

Package page → choose hotel tier, date and travellers → **Book on WhatsApp** opens a chat with **+91 85868 92228**, pre-filled with the package name, route, date, travellers, hotel category, estimated price and a link back to the package.

## SEO

Every page is **pre-rendered to static HTML at build time** (`src/entry-server.tsx` + `scripts/prerender.mjs`), so Google, Bing and WhatsApp/Facebook link previews see the full content, title, description and structured data without running JavaScript. In the browser, React hydrates that HTML.

- **Per-page SEO** — each page declares it with `<Seo title description path image jsonLd />` (`src/lib/seo.tsx`): unique title, meta description, canonical URL (`https://www.ivaanescapes.com/...`), Open Graph + Twitter cards, robots.
- **Structured data (JSON-LD)** — TravelAgency (address, phones, GST), WebSite, BreadcrumbList on every inner page, TouristTrip + Offer (price, day-wise itinerary) on packages, TouristDestination + FAQPage on destination pages, Hotel ItemLists on hotel pages, BlogPosting on articles. Validated with 0 errors on validator.schema.org.
- **Landing pages** — `/destinations/<name>` (e.g. "Kashmir Tour Packages") and `/hotels/<region>` target the main search terms. Edit their copy and FAQs in `src/data/destinationContent.ts`.
- **sitemap.xml & robots.txt** — generated on every build from the packages, destinations, hotel regions and blog posts (with an image sitemap). Adding a package or blog post adds it automatically.
- **Technical** — real 404 status for unknown URLs, clean URLs, self-hosted fonts with size-matched fallbacks (no layout shift), keyword-rich H1s, alt text on every image. The build fails if two pages share a title or a page forgets its `<Seo>`.

### After the site is live

1. **Google Search Console** → add the domain `ivaanescapes.com` (DNS verification), or paste the HTML-tag code into `googleVerification` in `src/config/site.ts` and redeploy.
2. Submit `https://www.ivaanescapes.com/sitemap.xml` under *Sitemaps*, then use *URL Inspection → Request indexing* on the home page and the destination pages.
3. Do the same in **Bing Webmaster Tools** (it can import from Search Console).
4. Create / claim the **Google Business Profile** for the Lajpat Nagar IV office with the same name, address and phone as the website — this is what ranks you for "travel agency near me" and on Google Maps.
5. Add your Instagram / Facebook / YouTube links in `src/config/site.ts` — they appear in the footer and in the structured data (`sameAs`).
6. Keep publishing guides in `src/data/blogs.ts` (one or two a month) and ask happy clients for Google reviews.

## Before going live

- Replace the sample reviews in `src/data/reviews.ts` with real ones.
- Add social media links in `src/config/site.ts` (icons stay hidden until filled in).
- In Vercel → Settings → Domains, `www.ivaanescapes.com` is the primary domain and `ivaanescapes.com` redirects to it. If you ever switch the primary domain there, change `url` in `src/config/site.ts` to match — never add a domain redirect in `vercel.json` as well, or the two will loop.
