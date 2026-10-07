# Ivaanescapes — Escape the Ordinary

Travel website for Ivaanescapes (B2B travel company). React + Vite + Tailwind + Framer Motion, with a Groq-powered AI travel assistant.

## Run locally

```bash
npm install
cp .env.example .env    # add your GROQ_API_KEY
npm run dev             # http://localhost:5173
```

`npm run build` makes a production build in `dist/`.

## Deploy (Vercel)

1. Push this folder to GitHub and import it in Vercel (framework: Vite).
2. In **Settings → Environment Variables**, add `GROQ_API_KEY` (and optionally `GROQ_MODEL`).
3. Deploy. `api/chat.ts` becomes a serverless function, so the Groq key never reaches the browser.

If the key is missing or Groq is down, the chat still answers with package suggestions from local data and points visitors to WhatsApp.

## Where to edit content

| What | File |
|---|---|
| Phone, WhatsApp, email, address, socials | `src/config/site.ts` |
| Packages, prices, itineraries | `src/data/packages.ts` |
| Destinations | `src/data/destinations.ts` |
| Hotels & stays | `src/data/stays.ts` |
| Reviews (**sample — replace with real ones**) | `src/data/reviews.ts` |
| Blog posts | `src/data/blogs.ts` |
| AI assistant personality & rules | `api/chat.ts` |

Images are Unsplash photo IDs (for example `photo-1614591276564-7b3e69347a48`). Swap in any Unsplash ID, or point `img()` in `src/lib/utils.ts` at your own CDN.

## How booking works

Package page → choose hotel tier, date and travellers → **Book on WhatsApp** opens a chat with **+91 85868 92228**, pre-filled with the package name, route, date, travellers, hotel category, estimated price and a link back to the package.
