import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BadgeCheck, BadgePercent, Building2, ChevronDown, Headset, Megaphone, Search, Sparkles, Users, X } from 'lucide-react'
import { CHAIN_PARTNERS, HOTEL_REGIONS, LEMON_TREE, TOTAL_HOTELS, hotelCount, type HotelGroup } from '../data/hotels'
import { cn, waLink } from '../lib/utils'
import HotelEnquiry, { type HotelEnquiryTarget } from '../components/HotelEnquiry'
import { Img, PageHero, Reveal, SectionHeading, WhatsAppIcon } from '../components/ui'

type Tab = (typeof HOTEL_REGIONS)[number]['id'] | 'chains'

const PERKS = [
  { icon: BadgePercent, title: 'Pre-purchased & exclusive B2B rates' },
  { icon: Users, title: 'Special rates for travel agents' },
  { icon: Headset, title: 'DMC support · instant confirmation' },
  { icon: BadgeCheck, title: 'Best rates guaranteed' },
]

// Give the brand wall some typographic variety, like a wall of logos (text only — no trademarks reproduced).
const BRAND_FONTS = ['font-cinzel tracking-[0.12em]', 'font-display italic', 'font-sans font-extrabold tracking-tight', 'font-display tracking-[0.2em] uppercase', 'font-sans font-semibold tracking-[0.25em] uppercase text-[0.8rem]']

function HotelRow({ name, onAsk }: { name: string; onAsk: () => void }) {
  return (
    <li>
      <button onClick={onAsk} className="group flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-surface-2">
        <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
        <span className="min-w-0 flex-1 text-sm font-medium leading-snug">{name}</span>
        <span className="flex shrink-0 items-center gap-1 rounded-full border border-[#1fae55]/40 px-2.5 py-1 text-[0.68rem] font-bold text-[#1fae55] transition-colors group-hover:bg-[#1fae55] group-hover:text-white">
          <WhatsAppIcon className="h-3 w-3" /> Rate
        </span>
      </button>
    </li>
  )
}

function GroupCard({ group, region, onAsk }: { group: HotelGroup; region: string; onAsk: (t: HotelEnquiryTarget) => void }) {
  const [all, setAll] = useState(false)
  const LIMIT = 10
  const shown = all ? group.hotels : group.hotels.slice(0, LIMIT)
  const place = `${region} · ${group.title}`
  return (
    <Reveal className="mb-5 break-inside-avoid">
      <article className="overflow-hidden rounded-3xl border border-line bg-surface">
        {group.image ? (
          <div className="relative h-32 overflow-hidden">
            <Img id={group.image} alt={group.title} w={700} sizes="(max-width:768px) 100vw, 33vw" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
            <div className="absolute inset-x-5 bottom-3 flex items-end justify-between gap-3 text-ivory">
              <h3 className="font-display text-2xl font-semibold leading-none">{group.title}</h3>
              <span className="shrink-0 rounded-full bg-ivory/15 px-2.5 py-1 text-[0.68rem] font-bold backdrop-blur">{group.hotels.length} hotels</span>
            </div>
          </div>
        ) : (
          <div className="flex items-end justify-between gap-3 border-b border-line px-5 pb-3 pt-5">
            <h3 className="font-display text-2xl font-semibold leading-none">{group.title}</h3>
            <span className="shrink-0 rounded-full bg-gold/10 px-2.5 py-1 text-[0.68rem] font-bold text-gold">{group.hotels.length} hotels</span>
          </div>
        )}
        {group.note && <p className="px-5 pt-3 text-xs font-semibold text-gold">{group.note}</p>}
        <ul className="p-3">
          {shown.map((h) => (
            <HotelRow key={h} name={h} onAsk={() => onAsk({ hotel: h, place })} />
          ))}
        </ul>
        {group.hotels.length > LIMIT && (
          <button onClick={() => setAll((v) => !v)} className="flex w-full items-center justify-center gap-1.5 border-t border-line py-3 text-sm font-semibold text-gold hover:bg-surface-2">
            {all ? 'Show less' : `Show all ${group.hotels.length} hotels`}
            <ChevronDown className={cn('h-4 w-4 transition-transform', all && 'rotate-180')} />
          </button>
        )}
      </article>
    </Reveal>
  )
}

export default function Hotels() {
  const [sp, setSp] = useSearchParams()
  const tabParam = sp.get('region')
  const tab: Tab = tabParam === 'chains' || HOTEL_REGIONS.some((r) => r.id === tabParam) ? (tabParam as Tab) : 'goa'
  const [q, setQ] = useState('')
  const [ask, setAsk] = useState<HotelEnquiryTarget | null>(null)
  const region = HOTEL_REGIONS.find((r) => r.id === tab)

  useEffect(() => {
    document.title = 'B2B Hotel Deals — Goa, Rajasthan, Maharashtra & Pan India | Ivaan Escapes'
  }, [])

  const setTab = (t: Tab) => {
    setQ('')
    setSp(t === 'goa' ? {} : { region: t }, { replace: true, preventScrollReset: true })
  }

  // Search every hotel, city and brand at once.
  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (term.length < 2) return null
    const out: { hotel: string; place: string }[] = []
    for (const r of HOTEL_REGIONS)
      for (const g of r.groups) {
        const groupHit = g.title.toLowerCase().includes(term) || r.name.toLowerCase().includes(term)
        for (const h of g.hotels) if (groupHit || h.toLowerCase().includes(term)) out.push({ hotel: h, place: `${r.name} · ${g.title}` })
      }
    for (const c of CHAIN_PARTNERS) if (c.toLowerCase().includes(term)) out.push({ hotel: `${c} (chain)`, place: '' })
    return out
  }, [q])

  const tabs: { id: Tab; label: string; count: number }[] = [
    ...HOTEL_REGIONS.map((r) => ({ id: r.id as Tab, label: r.name, count: hotelCount(r) })),
    { id: 'chains', label: 'Pan India Chains', count: CHAIN_PARTNERS.length },
  ]

  return (
    <>
      <PageHero
        eyebrow="B2B Hotel Deals"
        title="Exclusive hotel rates,"
        accent="pan India"
        text="Pre-purchased & exclusive B2B rates on the hotels your clients love — for travel agents, corporates and travellers. Before booking anywhere, try our rates."
        image="photo-1724947052687-e580b3010aad"
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {[`${TOTAL_HOTELS}+ hotels listed`, `${LEMON_TREE.count} Lemon Tree & Aurika hotels`, '1500+ happy agents', '24 × 7 availability'].map((t) => (
            <span key={t} className="rounded-full border border-ivory/20 bg-navy/40 px-4 py-2 text-xs font-bold backdrop-blur sm:text-sm">
              {t}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Perks */}
      <div className="border-b border-line bg-bg-2">
        <div className="container-x grid grid-cols-2 gap-x-4 gap-y-5 py-6 lg:grid-cols-4">
          {PERKS.map((p) => (
            <div key={p.title} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                <p.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold leading-snug">{p.title}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="py-14 sm:py-20">
        <div className="container-x">
          {/* Search + tabs */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn('relative flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors', tab === t.id && !results ? 'text-navy' : 'border border-line text-muted hover:text-ink')}
                >
                  {tab === t.id && !results && <motion.span layoutId="hotelTab" className="bg-gilded absolute inset-0 rounded-full" />}
                  <span className="relative">{t.label}</span>
                  <span className={cn('relative rounded-full px-1.5 text-[0.65rem] font-bold', tab === t.id && !results ? 'bg-navy/15' : 'bg-gold/10 text-gold')}>{t.count}</span>
                </button>
              ))}
            </div>
            <label className="relative block lg:w-80">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search hotel, brand or city…"
                aria-label="Search hotels"
                className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-10 text-[16px] text-ink outline-none placeholder:text-muted focus:border-gold sm:text-sm"
              />
              {q && (
                <button onClick={() => setQ('')} aria-label="Clear search" className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-ink">
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
          </div>

          {/* Search results */}
          {results ? (
            <div className="mt-10">
              <p className="text-sm text-muted">
                <b className="text-ink">{results.length}</b> {results.length === 1 ? 'match' : 'matches'} for “{q.trim()}”
              </p>
              {results.length ? (
                <ul className="mt-4 grid gap-x-6 rounded-3xl border border-line bg-surface p-3 md:grid-cols-2">
                  {results.map((r) => (
                    <li key={r.hotel + r.place}>
                      <button onClick={() => setAsk(r.place ? r : { hotel: r.hotel.replace(' (chain)', ''), place: '' })} className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-surface-2">
                        <Building2 className="h-4 w-4 shrink-0 text-gold" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold">{r.hotel}</span>
                          <span className="block text-xs text-muted">{r.place || 'Pan India chain partner'}</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-1 rounded-full border border-[#1fae55]/40 px-2.5 py-1 text-[0.68rem] font-bold text-[#1fae55] group-hover:bg-[#1fae55] group-hover:text-white">
                          <WhatsAppIcon className="h-3 w-3" /> Rate
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4 rounded-3xl border border-dashed border-line p-8 text-center">
                  <p className="font-display text-2xl font-semibold">Not on the list? We can still get it.</p>
                  <p className="mt-2 text-sm text-muted">We work with chain hotels across India. Send us the hotel name and dates.</p>
                  <button onClick={() => setAsk({ hotel: q.trim(), place: '' })} className="btn-wa mt-5">
                    <WhatsAppIcon className="h-4 w-4" /> Ask for “{q.trim()}”
                  </button>
                </div>
              )}
            </div>
          ) : region ? (
            <AnimatePresence mode="wait">
              <motion.div key={region.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="mt-10">
                {/* Region banner */}
                <div className="grain relative isolate mb-8 overflow-hidden rounded-[2rem] bg-navy p-7 text-ivory sm:p-10">
                  <Img id={region.image} alt={region.name} w={1600} sizes="100vw" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-navy/20" />
                  <p className="eyebrow !text-gold-soft">Our exclusive deal</p>
                  <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold leading-tight sm:text-5xl">{region.headline}</h2>
                  <p className="mt-3 max-w-xl text-sm text-ivory/80 sm:text-base">{region.blurb}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span className="text-gilded font-display text-4xl font-bold">{hotelCount(region)}</span>
                    <span className="text-sm text-ivory/70">hotels & resorts listed · many more on request</span>
                  </div>
                  <a href={waLink(`Hello Ivaan Escapes! 🏨 Please share your best B2B hotel deals for ${region.name}.`)} target="_blank" rel="noopener" className="btn-wa mt-6">
                    <WhatsAppIcon className="h-4 w-4" /> Get {region.name} rate sheet
                  </a>
                </div>
                <p className="mb-5 text-sm text-muted">Tap any hotel to get its best rate on WhatsApp.</p>
                <div className="gap-5 md:columns-2 xl:columns-3">
                  {region.groups.map((g) => (
                    <GroupCard key={g.title} group={g} region={region.name} onAsk={setAsk} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div key="chains" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
              <SectionHeading eyebrow="Our hotel partners" title="Rest of India —" accent="we have chain hotels" text="Top hotel brands across India. Tap a brand, tell us the city and dates, and we'll send you our best rate." />
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
                {CHAIN_PARTNERS.map((c, k) => (
                  <button
                    key={c}
                    onClick={() => setAsk({ hotel: `${c} Hotels`, place: '' })}
                    className="group grid min-h-24 place-items-center rounded-2xl border border-line bg-surface px-3 py-5 text-center transition-all hover:-translate-y-1 hover:border-gold/50"
                  >
                    <span className={cn('text-lg leading-tight text-ink transition-colors group-hover:text-gold', BRAND_FONTS[k % BRAND_FONTS.length])}>{c}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lemon Tree & Aurika consolidator */}
      <section className="bg-bg-2 py-20 sm:py-24">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Pan India consolidator</p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {LEMON_TREE.title}
            </h2>
            <p className="mt-4 text-muted">Exclusive and unbeatable pan-India rates on Lemon Tree Hotels & Resorts and Aurika Hotels.</p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold">Specialised in</span>
              {LEMON_TREE.specialised.map((s) => (
                <span key={s} className="rounded-full bg-gold/10 px-3 py-1 text-sm font-bold text-gold">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => setAsk({ hotel: 'Lemon Tree / Aurika Hotels', place: '' })} className="btn-wa">
                <WhatsAppIcon className="h-4 w-4" /> Get Lemon Tree rates
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grain relative overflow-hidden rounded-[2rem] bg-navy p-8 text-ivory">
              <div className="flex items-center gap-5">
                <span className="text-gilded font-display text-7xl font-bold leading-none">{LEMON_TREE.count}</span>
                <span className="text-lg font-semibold leading-tight">
                  hotels
                  <br />
                  across India
                </span>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {LEMON_TREE.cities.map((c) => (
                  <span key={c} className="rounded-xl border border-ivory/15 bg-ivory/5 px-3 py-2.5 text-center text-sm font-semibold">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/30 bg-surface p-8 text-center shadow-[var(--shadow)] sm:p-14">
              <Megaphone className="mx-auto h-10 w-10 text-gold" />
              <p className="eyebrow mt-5">Before booking anywhere</p>
              <h2 className="mt-3 font-display text-4xl font-semibold sm:text-6xl">
                Try <em className="text-gilded">our rates</em>
              </h2>
              <p className="mx-auto mt-4 max-w-lg font-script text-3xl text-gold sm:text-4xl">Let the client enjoy the vacation — you enjoy the margin.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={waLink("Hello Ivaan Escapes! I'm a travel agent — please share your latest B2B hotel rates.")} target="_blank" rel="noopener" className="btn-wa">
                  <WhatsAppIcon className="h-4 w-4" /> Get rates on WhatsApp
                </a>
                <Link to="/partners" className="btn-ghost">
                  <Sparkles className="h-4 w-4" /> Become a partner
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>{ask && <HotelEnquiry target={ask} onClose={() => setAsk(null)} />}</AnimatePresence>
    </>
  )
}
