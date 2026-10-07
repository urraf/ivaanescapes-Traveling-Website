import { useEffect, useState } from 'react'
import { Clock, Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import { SITE } from '../config/site'
import { DESTINATIONS } from '../data/destinations'
import { useUI } from '../context/ui'
import { GENERAL_WA, telLink, waLink } from '../lib/utils'
import { PageHero, Reveal, WhatsAppIcon } from '../components/ui'

export default function Contact() {
  const { openChat } = useUI()
  const [f, setF] = useState({ name: '', phone: '', dest: '', month: '', people: '2', msg: '' })

  useEffect(() => {
    document.title = 'Contact Us — Ivaanescapes'
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = [
      'Hello Ivaanescapes! ✈️ I have a travel enquiry:',
      '',
      `🙋 Name: ${f.name}`,
      `📞 Phone: ${f.phone}`,
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
  const cards = [
    { icon: WhatsAppIcon, title: 'WhatsApp', value: 'Chat with an expert', href: GENERAL_WA, external: true },
    { icon: Phone, title: 'Call us', value: SITE.phoneDisplay, href: telLink },
    { icon: Mail, title: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Clock, title: 'Working hours', value: SITE.hours },
  ]

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's plan your" accent="next escape" text="Tell us where you want to go — our travel experts usually reply on WhatsApp within minutes." image="photo-1558005530-a7958896ec60" />

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {cards.map((c, k) => {
                const body = (
                  <>
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/10 text-gold">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-muted">{c.title}</p>
                    <p className="mt-1 break-words font-semibold">{c.value}</p>
                  </>
                )
                return (
                  <Reveal key={c.title} delay={k * 0.06}>
                    {c.href ? (
                      <a href={c.href} target={c.external ? '_blank' : undefined} rel="noopener" className="block h-full rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-gold/50">
                        {body}
                      </a>
                    ) : (
                      <div className="h-full rounded-3xl border border-line bg-surface p-6">{body}</div>
                    )}
                  </Reveal>
                )
              })}
            </div>
            <Reveal className="mt-4 flex items-start gap-3 rounded-3xl border border-line bg-surface p-6">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">Office</p>
                <p className="mt-1 font-semibold">{SITE.address}</p>
              </div>
            </Reveal>
            <Reveal className="grain relative mt-4 overflow-hidden rounded-3xl bg-navy p-6 text-ivory">
              <p className="font-display text-2xl font-semibold">Not sure where to go?</p>
              <p className="mt-1 text-sm text-ivory/70">Our AI concierge can suggest the perfect package in seconds.</p>
              <button onClick={() => openChat()} className="btn-gold mt-5 !py-2.5">
                <Sparkles className="h-4 w-4" /> Ask Ivaan AI
              </button>
            </Reveal>
          </div>

          <Reveal>
            <form onSubmit={submit} className="space-y-4 rounded-[2rem] border border-gold/30 bg-surface p-6 shadow-[var(--shadow)] sm:p-10">
              <p className="eyebrow">Quick enquiry</p>
              <h2 className="font-display text-4xl font-semibold">Send us your trip details</h2>
              <p className="text-sm text-muted">Your enquiry opens in WhatsApp — just press send.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Your name *" className={input} />
                <input required type="tel" inputMode="tel" pattern="[0-9+\s-]{8,15}" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} placeholder="Phone number *" className={input} />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <select value={f.dest} onChange={(e) => setF({ ...f, dest: e.target.value })} className={input} aria-label="Destination">
                  <option value="">Destination</option>
                  {DESTINATIONS.map((d) => (
                    <option key={d.slug}>{d.name}</option>
                  ))}
                  <option>Other / Custom trip</option>
                </select>
                <input type="month" value={f.month} onChange={(e) => setF({ ...f, month: e.target.value })} className={input} aria-label="Travel month" />
                <select value={f.people} onChange={(e) => setF({ ...f, people: e.target.value })} className={input} aria-label="Travellers">
                  {['1', '2', '3', '4', '5', '6', '7 – 10', '10+'].map((n) => (
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
