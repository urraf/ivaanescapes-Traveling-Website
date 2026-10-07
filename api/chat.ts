// Serverless AI travel assistant (Vercel function). Proxies Groq so the API key stays server-side.
// Local dev: served by the middleware in vite.config.ts.
// Explicit .js extensions: Vercel runs these as native ESM, which can't resolve extensionless imports.
import { PACKAGES } from '../src/data/packages.js'
import { STAYS } from '../src/data/stays.js'
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

const stays = STAYS.map((s) => `- ${s.name}, ${s.location} (${s.type}, from ${inr(s.priceFrom)}/night)`).join('\n')

const SYSTEM = `You are "Ivaan", the friendly AI travel concierge for ${SITE.name} — a premium B2B travel company (tagline: "${SITE.tagline}") that serves travel agents and travellers across India.

PACKAGES (the only packages we sell):
${catalog}

CURATED STAYS (bookable via WhatsApp, page: /stays):
${stays}

CONTACT: WhatsApp / Call ${SITE.phoneDisplay}. Travel agents can join our partner network at /partners.

RULES:
- Be warm, concise and helpful. Keep replies under 110 words. Use short bullet points when listing options.
- Recommend only packages from the list above. Always link them in markdown, e.g. [Kashmir — Paradise on Earth](/packages/kashmir-paradise-on-earth).
- If someone asks about a destination we don't list, say our team can craft a custom trip and suggest WhatsApp.
- Prices are indicative per person (twin sharing, standard hotels). Final quotes depend on dates, hotels and group size.
- To book, tell them to open the package and tap "Book on WhatsApp", or message us on WhatsApp.
- Travel agents asking about rates, commissions or white-label: point them to /partners.
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
          messages: [{ role: 'system', content: SYSTEM }, ...messages],
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
