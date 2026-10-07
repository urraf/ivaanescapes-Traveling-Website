import { useEffect, useMemo, useState } from 'react'
import { Clock, Globe, Mail, MapPin, Navigation, Phone, ReceiptText, Sparkles } from 'lucide-react'
import { SITE, waNumber } from '../config/site'
import { DESTINATIONS } from '../data/destinations'
import { useUI } from '../context/ui'
import { waLink } from '../lib/utils'
import { PageHero, Reveal, WhatsAppIcon } from '../components/ui'

const NEEDS = ['Holiday package', 'Hotel booking', 'Family group trip', 'MICE / Corporate', 'Marriage function', 'B2B partnership']

export default function Contact() {
  const { openChat } = useUI()
  const [f, setF] = useState({ name: '', phone: '', need: NEEDS[0], dest: '', month: '', people: '2', msg: '' })

  useEffect(() => {
    document.title = 'Contact Us — Ivaan Escapes'
  }, [])

  // Next 12 months as a simple list (works in every browser, unlike <input type="month">).
  const months = useMemo(() => {
    const d = new Date()
    return Array.from({ length: 12 }, (_, i) => new Date(d.getFullYear(), d.getMonth() + i, 1).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }))
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = [
      'Hello Ivaan Escapes! ✈️ I have an enquiry:',
      '',
      `🙋 Name: ${f.name}`,
      `📞 Phone: ${f.phone}`,
      `🧭 Looking for: ${f.need}`,
      `📍 Destination: ${f.dest || 'Need suggestions'}`,
      `📅 Travel month: ${f.month || 'Flexible'}`,
      `👥 Travellers: ${f.people}`,
      f.msg ? `💬 ${f.msg}` : '',
    ]
      .filter(Boolean)
      .join('\n')
    window.open(waLink(msg), '_blank', 'noopener')
  }

  const input = 'w-full rounded-xl border border-line bg-bg px-4 py-3 text-[16px] text-ink outline-none placeholder:text-muted focus:border-gold sm:text-sm'
  const label = 'text-xs font-bold uppercase tracking-[0.15em] text-muted'
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's plan your" accent="next escape" text="Call or WhatsApp our team — we're available 24 × 7 for travellers, travel agents and corporates." image="photo-1623851293886-e9b3618ae902" />

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div className="space-y-4">
            {/* Team */}
            <Reveal className="rounded-3xl border border-line bg-surface p-6">
              <p className={label}>Call / WhatsApp</p>
              <ul className="mt-4 divide-y divide-line">
                {SITE.team.map((t) => (
                  <li key={t.name} className="flex flex-wrap items-center gap-x-3 gap-y-2 py-3">
                    <span className="bg-gilded grid h-10 w-10 shrink-0 place-items-center rounded-full font-cinzel text-sm font-bold text-navy">{t.name[0]}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{t.name}</span>
                      <span className="block text-sm text-muted">{t.display}</span>
                    </span>
                    <span className="flex gap-2">
                      <a href={`tel:${t.phone}`} aria-label={`Call ${t.name}`} className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold">
                        <Phone className="h-4 w-4" />
                      </a>
                      <a href={`https://api.whatsapp.com/send?phone=${waNumber(t.phone)}&text=${encodeURIComponent(`Hello ${t.name}! I have an enquiry for Ivaan Escapes.`)}`} target="_blank" rel="noopener" aria-label={`WhatsApp ${t.name}`} className="grid h-10 w-10 place-items-center rounded-full bg-[#1fae55] text-white transition-transform hover:-translate-y-0.5">
                        <WhatsAppIcon className="h-4 w-4" />
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Mail, title: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
                { icon: Globe, title: 'Website', value: SITE.website, href: SITE.url },
                { icon: Clock, title: 'Support', value: SITE.hours },
                { icon: ReceiptText, title: 'GST No', value: SITE.gst },
              ].map((c, k) => {
                const body = (
                  <>
                    <c.icon className="h-5 w-5 text-gold" />
                    <p className={`mt-3 ${label}`}>{c.title}</p>
                    <p className="mt-1 break-words font-semibold">{c.value}</p>
                  </>
                )
                return (
                  <Reveal key={c.title} delay={k * 0.05}>
                    {c.href ? (
                      <a href={c.href} className="block h-full rounded-3xl border border-line bg-surface p-5 transition-colors hover:border-gold/50">
                        {body}
                      </a>
                    ) : (
                      <div className="h-full rounded-3xl border border-line bg-surface p-5">{body}</div>
                    )}
                  </Reveal>
                )
              })}
            </div>

            {/* Office + map */}
            <Reveal className="overflow-hidden rounded-3xl border border-line bg-surface">
              <div className="flex items-start gap-3 p-5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div className="min-w-0 flex-1">
                  <p className={label}>Office</p>
                  <p className="mt-1 font-semibold">
                    {SITE.address.line1}, {SITE.address.line2},
                    <br />
                    {SITE.address.city} – {SITE.address.pin}
                  </p>
                </div>
                <a href={mapsLink} target="_blank" rel="noopener" className="btn-ghost shrink-0 !px-4 !py-2 !text-xs">
                  <Navigation className="h-3.5 w-3.5" /> Directions
                </a>
              </div>
              <iframe
                title="Ivaan Escapes office location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-64 w-full border-0 grayscale-[30%]"
              />
            </Reveal>

            <Reveal className="grain relative overflow-hidden rounded-3xl bg-navy p-6 text-ivory">
              <p className="font-display text-2xl font-semibold">Not sure where to go?</p>
              <p className="mt-1 text-sm text-ivory/70">Our AI concierge can suggest the perfect package or hotel in seconds.</p>
              <button onClick={() => openChat()} className="btn-gold mt-5 !py-2.5">
                <Sparkles className="h-4 w-4" /> Ask Ivaan AI
              </button>
            </Reveal>
          </div>

          <Reveal>
            <form onSubmit={submit} className="space-y-4 rounded-[2rem] border border-gold/30 bg-surface p-6 shadow-[var(--shadow)] sm:p-10 lg:sticky lg:top-24">
              <p className="eyebrow">Quick enquiry</p>
              <h2 className="font-display text-4xl font-semibold">Send us your trip details</h2>
              <p className="text-sm text-muted">Your enquiry opens in WhatsApp — just press send.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Your name *" className={input} />
                <input required type="tel" inputMode="tel" pattern="[0-9+\s\-]{8,15}" title="Enter a valid phone number" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} placeholder="Phone number *" className={input} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <select value={f.need} onChange={(e) => setF({ ...f, need: e.target.value })} className={input} aria-label="Looking for">
                  {NEEDS.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
                <select value={f.dest} onChange={(e) => setF({ ...f, dest: e.target.value })} className={input} aria-label="Destination">
                  <option value="">Destination</option>
                  {DESTINATIONS.map((d) => (
                    <option key={d.slug}>{d.name}</option>
                  ))}
                  <option>Other / Custom trip</option>
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <select value={f.month} onChange={(e) => setF({ ...f, month: e.target.value })} className={input} aria-label="Travel month">
                  <option value="">Travel month (flexible)</option>
                  {months.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
                <select value={f.people} onChange={(e) => setF({ ...f, people: e.target.value })} className={input} aria-label="Travellers">
                  {['1', '2', '3', '4', '5', '6', '7 – 10', '10 – 25', '25+ (group)'].map((n) => (
                    <option key={n} value={n}>
                      {n} traveller{n === '1' ? '' : 's'}
                    </option>
                  ))}
                </select>
              </div>
              <textarea value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} rows={4} placeholder="Anything else? (budget, hotel preference, special occasion…)" className={input} />
              <button type="submit" className="btn-wa w-full !py-4">
                <WhatsAppIcon className="h-5 w-5" /> Send Enquiry on WhatsApp
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
