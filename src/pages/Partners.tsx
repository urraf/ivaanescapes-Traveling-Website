import { useEffect, useState } from 'react'
import { BadgePercent, Clock4, FileText, Headset, Layers, ShieldCheck } from 'lucide-react'
import { DESTINATIONS } from '../data/destinations'
import { REVIEWS } from '../data/reviews'
import { img, waLink } from '../lib/utils'
import { PageHero, Reveal, SectionHeading, Stars, WhatsAppIcon } from '../components/ui'

const BENEFITS = [
  { icon: BadgePercent, title: 'Exclusive net rates', text: 'Contracted hotel and transport rates that leave you healthy margins on every booking.' },
  { icon: FileText, title: 'White-label itineraries', text: 'Beautiful, ready-to-send itineraries with your agency branding — no Ivaanescapes logo.' },
  { icon: Clock4, title: 'Quotes in under 2 hours', text: 'Send an enquiry on WhatsApp and get a detailed costing fast, even for groups.' },
  { icon: Headset, title: 'Dedicated ops manager', text: 'One point of contact and 24×7 on-ground support for your travellers.' },
  { icon: Layers, title: 'Group & MICE handling', text: 'Corporate offsites, school groups and weddings managed end to end.' },
  { icon: ShieldCheck, title: 'Reliable on-ground network', text: 'Vetted drivers, hotels and local partners in every destination we sell.' },
]

const STEPS = [
  { title: 'Register', text: 'Share your agency details using the form below.' },
  { title: 'Get onboarded', text: 'Receive our rate sheet, brochures and your ops contact.' },
  { title: 'Send enquiries', text: 'Request quotes on WhatsApp and confirm bookings quickly.' },
  { title: 'Earn & grow', text: 'Travellers come back happy — and so do your margins.' },
]

export default function Partners() {
  const [f, setF] = useState({ agency: '', name: '', city: '', phone: '', volume: '' })
  const partners = REVIEWS.filter((r) => r.kind === 'partner')

  useEffect(() => {
    document.title = 'Partner With Us (B2B) — Ivaanescapes'
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = [
      'Hello Ivaanescapes! 🤝 I would like to become a B2B travel partner.',
      '',
      `🏢 Agency: ${f.agency}`,
      `🙋 Contact person: ${f.name}`,
      `📍 City: ${f.city}`,
      `📞 Phone: ${f.phone}`,
      f.volume ? `📊 Monthly bookings (approx.): ${f.volume}` : '',
      '',
      'Please share your rate sheet and onboarding details.',
    ]
      .filter((l, i, a) => l !== '' || a[i - 1] !== '')
      .join('\n')
    window.open(waLink(msg), '_blank', 'noopener')
  }

  const input = 'w-full rounded-xl border border-line bg-bg px-4 py-3 text-[16px] text-ink outline-none placeholder:text-muted focus:border-gold sm:text-sm'

  return (
    <>
      <PageHero
        eyebrow="B2B Partnerships"
        title="Your trusted"
        accent="travel back-office"
        text="Ivaanescapes powers travel agents across India with net rates, ready itineraries and reliable on-ground operations for 12 of the most-loved destinations."
        image="photo-1603202662747-00e33e7d1468"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#register"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-gold"
          >
            Register as a Partner
          </a>
          <a href={waLink("Hello Ivaanescapes! I'm a travel agent and would like your B2B rate sheet.")} target="_blank" rel="noopener" className="btn-wa">
            <WhatsAppIcon className="h-4 w-4" /> Get Rate Sheet
          </a>
        </div>
      </PageHero>

      <section className="py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading center eyebrow="Partner Benefits" title="Everything you need to" accent="sell more" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, k) => (
              <Reveal key={b.title} delay={(k % 3) * 0.08} className="group relative overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-gold/50">
                <span className="absolute -right-4 -top-6 font-cinzel text-8xl font-bold text-gold/[0.07]">0{k + 1}</span>
                <b.icon className="h-8 w-8 text-gold" />
                <h3 className="mt-5 font-display text-2xl font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-2 py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Destinations we operate" title="Sell with" accent="confidence" text="Strong on-ground operations across India's favourite holiday destinations — plus the Maldives and Bali." />
          <div className="mt-10 flex flex-wrap gap-3">
            {DESTINATIONS.map((d) => (
              <span key={d.slug} className="flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-1.5 pr-4 text-sm font-semibold">
                <img src={img(d.image, 80, 60)} alt="" className="h-8 w-8 rounded-full object-cover" />
                {d.name}
              </span>
            ))}
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-4">
            {STEPS.map((s, k) => (
              <Reveal key={s.title} delay={k * 0.1} className="relative">
                <p className="text-gilded font-cinzel text-5xl font-bold">0{k + 1}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="register" className="scroll-mt-24 py-24 sm:py-28">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Join the network" title="Register as a" accent="travel partner" text="Fill in a few details — they'll be sent to our partnerships team on WhatsApp, and we'll get back to you with our rate sheet within a working day." />
            <div className="mt-10 space-y-4">
              {partners.map((r) => (
                <Reveal key={r.name} className="rounded-3xl border border-line bg-surface p-6">
                  <Stars n={r.rating} />
                  <p className="mt-3 text-sm leading-relaxed">“{r.text}”</p>
                  <p className="mt-4 text-sm font-bold">
                    {r.name} <span className="font-normal text-muted">· {r.city}</span>
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal>
            <form onSubmit={submit} className="space-y-4 rounded-[2rem] border border-gold/30 bg-surface p-6 shadow-[var(--shadow)] sm:p-8">
              <p className="eyebrow">Partner registration</p>
              <input required value={f.agency} onChange={(e) => setF({ ...f, agency: e.target.value })} placeholder="Agency / company name *" className={input} />
              <div className="grid gap-4 sm:grid-cols-2">
                <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Contact person *" className={input} />
                <input required value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} placeholder="City *" className={input} />
              </div>
              <input required type="tel" inputMode="tel" pattern="[0-9+\s\-]{8,15}" title="Enter a valid phone number" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} placeholder="Phone / WhatsApp number *" className={input} />
              <select value={f.volume} onChange={(e) => setF({ ...f, volume: e.target.value })} className={input} aria-label="Monthly bookings">
                <option value="">Approx. monthly bookings (optional)</option>
                <option>1 – 5</option>
                <option>6 – 20</option>
                <option>20 – 50</option>
                <option>50+</option>
              </select>
              <button type="submit" className="btn-wa w-full !py-4">
                <WhatsAppIcon className="h-5 w-5" /> Send on WhatsApp
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
