// Serverless AI travel assistant (Vercel function). Proxies Groq so the API key stays server-side.
// Local dev: served by the middleware in vite.config.ts.
// Explicit .js extensions: Vercel runs these as native ESM, which can't resolve extensionless imports.
import { PACKAGES } from '../src/data/packages.js'
import { CHAIN_PARTNERS, HOTEL_REGIONS, LEMON_TREE, TOTAL_HOTELS } from '../src/data/hotels.js'
import { SITE } from '../src/config/site.js'

type Msg = { role: 'user' | 'assistant'; content: string }

const MODELS = [process.env.GROQ_MODEL, 'llama-3.3-70b-versatile', 'openai/gpt-oss-120b', 'llama-3.1-8b-instant'].filter(
  (m, i, a): m is string => !!m && a.indexOf(m) === i,
)

const inr = (n: number) => '₹' + n.toLocaleString('en-IN')

const catalog = PACKAGES.map(
  (p) =>
    `- ${p.title} | ${p.nights}N/${p.days}D | ${p.route} | from ${inr(p.priceFrom)} per person | best time: ${p.bestTime} | good for: ${p.themes.join(', ')} | link: /packages/${p.slug}`,
).join('\n')

const hotelSummary = HOTEL_REGIONS.map((r) => `- ${r.name}: ${r.groups.map((g) => `${g.title} (${g.hotels.length})`).join(', ')}`).join('\n')

// Words too generic to identify a particular hotel or place.
const GENERIC = new Set(
  'hotel hotels resort resorts spa palace beach suites suite house grand residency villa villas lodge camp camps forest retreat inn the by and luxury star stay stays international airport domestic near other destinations collection city park lake view valley club royal golden heritage wildlife safari desert'.split(' '),
)
const words = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length >= 3 && !GENERIC.has(w))

/** Hotel lists relevant to what the visitor asked — only these go into the prompt, keeping every request small. */
function hotelContext(text: string): string {
  const asked = new Set(words(text))
  const has = (s: string) => words(s).some((w) => asked.has(w))
  // 1) A region or city was named → send those lists in full (e.g. "Goa", "Jaipur", "Lonavala").
  const placeHits = HOTEL_REGIONS.flatMap((r) => {
    const regionHit = asked.has(r.name.toLowerCase())
    const cityGroups = r.groups.filter((g) => has(g.title))
    return (cityGroups.length ? cityGroups : regionHit ? r.groups : []).map((g) => ({ r, g }))
  })
  // 2) A brand / hotel was named → only the matching hotels, narrowed to the named places if any.
  //    Place words ("jaipur", "mumbai") don't count here, or "hotels in Jaipur" would only return "Trident Jaipur".
  const placeWords = new Set(HOTEL_REGIONS.flatMap((r) => [...words(r.name), ...r.groups.flatMap((g) => words(g.title))]))
  const brandAsked = [...asked].filter((w) => !placeWords.has(w))
  const scope = placeHits.length ? placeHits : HOTEL_REGIONS.flatMap((r) => r.groups.map((g) => ({ r, g })))
  const hotelHits = scope
    .map(({ r, g }) => ({ r, g, hotels: g.hotels.filter((h) => words(h).some((w) => brandAsked.includes(w))) }))
    .filter((x) => x.hotels.length)
  const lines = hotelHits.length
    ? hotelHits.map(({ r, g, hotels }) => `${r.name} — ${g.title}: ${hotels.join('; ')}`)
    : placeHits.map(({ r, g }) => `${r.name} — ${g.title}: ${g.hotels.join('; ')}`)
  return lines.slice(0, 8).join('\n')
}

const team = SITE.team.map((t) => `${t.name} ${t.display}`).join(', ')

const BASE = `You are "Ivaan", the friendly AI travel concierge for ${SITE.name} — a trusted B2B destination management company ("${SITE.tagline}", "${SITE.promise}") serving travel agents, corporates and travellers across India. We specialise in family groups, MICE, corporate travel and marriage functions, and have 1500+ happy agent partners. We sell domestic India travel only.

HOLIDAY PACKAGES (the only packages we sell):
${catalog}

B2B HOTEL DEALS (page: /hotels) — ${TOTAL_HOTELS}+ hotels with pre-purchased & exclusive B2B rates, DMC support and instant confirmation:
${hotelSummary}
- Pan India chain partners: ${CHAIN_PARTNERS.join(', ')}
- ${LEMON_TREE.title}: ${LEMON_TREE.count} hotels across India; specialised in ${LEMON_TREE.specialised.join(', ')}.
Special exclusive deals in Goa & Uttarakhand; best deals in Kashmir, Rajasthan, Mumbai & Kerala. Services: hotels, transfers, sightseeing, activities and customised packages. Motto for agents: "Try our rates before booking anywhere — let the client enjoy the vacation, you enjoy the margin."

CONTACT: Call / WhatsApp ${team}. Email ${SITE.email}. Website ${SITE.website}. Office: ${SITE.address.full}. GST No: ${SITE.gst}. Available 24×7 on WhatsApp. Travel agents can join at /partners.

RULES:
- Be warm, concise and helpful. Keep replies under 110 words. Use short bullet points when listing options.
- Recommend only packages from the list above. Always link them in markdown, e.g. [Kashmir — Paradise on Earth](/packages/kashmir-paradise-on-earth). For hotels, link [B2B Hotel Deals](/hotels).
- We do not sell international trips. If asked, say we focus on India and suggest a similar Indian destination.
- If a hotel isn't listed, say we work with chain hotels across India and can check it on WhatsApp.
- Never quote hotel room prices — rates are shared on WhatsApp. Package prices are indicative per person (twin sharing, standard hotels).
- To book, tell them to open the package and tap "Book on WhatsApp", or message us on WhatsApp.
- Never invent visa rules, flight prices or facts you are unsure of. Reply in the user's language (English, Hindi or Hinglish).`

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

export async function POST(req: Request): Promise<Response> {
  const key = process.env.GROQ_API_KEY
  if (!key) return json({ error: 'AI assistant is not configured' }, 503)

  let messages: Msg[]
  try {
    const body = (await req.json()) as { messages?: Msg[] }
    messages = (body.messages ?? [])
      .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 1200) }))
  } catch {
    return json({ error: 'Invalid request' }, 400)
  }
  if (!messages.length || messages[messages.length - 1].role !== 'user') return json({ error: 'Invalid request' }, 400)

  const recent = messages.filter((m) => m.role === 'user').slice(-2).map((m) => m.content).join(' ')
  const hotels = hotelContext(recent)
  const system = hotels ? `${BASE}\n\nHOTELS RELEVANT TO THIS QUESTION:\n${hotels}` : BASE

  for (const model of MODELS) {
    let res: Response
    try {
      res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          model,
          temperature: 0.6,
          max_tokens: 500,
          messages: [{ role: 'system', content: system }, ...messages],
        }),
        signal: AbortSignal.timeout(20000),
      })
    } catch (e) {
      console.error('Groq request failed', e)
      return json({ error: 'AI service unavailable' }, 504)
    }
    if (res.ok) {
      const data = (await res.json()) as { choices?: { message?: { content?: string } }[] }
      const reply = (data.choices?.[0]?.message?.content ?? '').replace(/<think>[\s\S]*?<\/think>/g, '').trim()
      return json({ reply })
    }
    // Retired/unknown model or a per-model rate limit → try the next one. Anything else is a real failure.
    const text = await res.text()
    if (!(res.status === 404 || res.status === 429 || (res.status === 400 && /model/i.test(text)))) {
      console.error('Groq error', res.status, text.slice(0, 300))
      return json({ error: 'AI service unavailable' }, 502)
    }
  }
  return json({ error: 'No available model' }, 502)
}
