import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, SearchX, Sparkles } from 'lucide-react'
import { DESTINATIONS, getDestination } from '../data/destinations'
import { PACKAGES, type Theme } from '../data/packages'
import { useUI } from '../context/ui'
import { cn } from '../lib/utils'
import PackageCard from '../components/PackageCard'
import { PageHero } from '../components/ui'
import BoardingPassCTA from '../components/BoardingPassCTA'

const THEMES: Theme[] = ['Honeymoon', 'Family', 'Adventure', 'Beach', 'Spiritual', 'Culture', 'Nature']
const DURATIONS = [
  { id: 'short', label: 'Up to 4 days', test: (d: number) => d <= 4 },
  { id: 'mid', label: '5 – 6 days', test: (d: number) => d >= 5 && d <= 6 },
  { id: 'long', label: '7+ days', test: (d: number) => d >= 7 },
]
const SORTS = [
  { id: 'popular', label: 'Most popular' },
  { id: 'price', label: 'Price: low to high' },
  { id: 'days', label: 'Duration' },
]

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all',
        active ? 'bg-gilded border-transparent text-navy shadow-md' : 'border-line text-muted hover:border-gold/50 hover:text-ink',
      )}
    >
      {children}
    </button>
  )
}

export default function Packages() {
  const [sp, setSp] = useSearchParams()
  const { openChat } = useUI()
  const region = sp.get('region') ?? ''
  const dest = sp.get('dest') ?? ''
  const theme = sp.get('theme') ?? ''
  const dur = sp.get('dur') ?? ''
  const sort = sp.get('sort') ?? 'popular'

  useEffect(() => {
    document.title = 'Holiday Packages — Ivaanescapes'
  }, [])

  const set = (k: string, v: string) => {
    const n = new URLSearchParams(sp)
    if (!v || n.get(k) === v) n.delete(k)
    else n.set(k, v)
    if (k === 'region') n.delete('dest')
    setSp(n, { replace: true, preventScrollReset: true })
  }

  const list = useMemo(() => {
    const d = DURATIONS.find((x) => x.id === dur)
    const r = PACKAGES.filter(
      (p) =>
        (!region || p.region === region) &&
        (!dest || p.destination === dest) &&
        (!theme || p.themes.includes(theme as Theme)) &&
        (!d || d.test(p.days)),
    )
    if (sort === 'price') return [...r].sort((a, b) => a.priceFrom - b.priceFrom)
    if (sort === 'days') return [...r].sort((a, b) => a.days - b.days)
    return [...r].sort((a, b) => Number(!!b.popular) - Number(!!a.popular))
  }, [region, dest, theme, dur, sort])

  const active = region || dest || theme || dur
  const destName = dest && getDestination(dest)?.name

  return (
    <>
      <PageHero
        eyebrow="Holiday Packages"
        title="Journeys worth"
        accent="remembering"
        text="One signature package for every destination — transparent pricing, handpicked hotels and booking on WhatsApp in one tap."
        image="photo-1536295243470-d7cba4efab7b"
      />

      <section className="py-14 sm:py-20">
        <div className="container-x">
          {/* Filters */}
          <div className="z-30 rounded-3xl border border-line bg-bg/90 px-4 py-4 backdrop-blur-xl sm:px-5 lg:sticky lg:top-[72px]">
            <div className="flex flex-col gap-3">
              <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
                <Chip active={!region} onClick={() => set('region', '')}>
                  All
                </Chip>
                <Chip active={region === 'india'} onClick={() => set('region', 'india')}>
                  🇮🇳 India
                </Chip>
                <Chip active={region === 'international'} onClick={() => set('region', 'international')}>
                  ✈️ International
                </Chip>
                <span className="mx-2 h-6 w-px shrink-0 bg-line" />
                {THEMES.map((t) => (
                  <Chip key={t} active={theme === t} onClick={() => set('theme', t)}>
                    {t}
                  </Chip>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select value={dest} onChange={(e) => set('dest', e.target.value)} aria-label="Destination" className="min-w-0 max-w-full rounded-full border border-line bg-surface px-4 py-2 text-[16px] font-semibold text-ink outline-none focus:border-gold sm:text-sm">
                  <option value="">All destinations</option>
                  {DESTINATIONS.filter((d) => !region || d.region === region).map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <select value={dur} onChange={(e) => set('dur', e.target.value)} aria-label="Duration" className="min-w-0 max-w-full rounded-full border border-line bg-surface px-4 py-2 text-[16px] font-semibold text-ink outline-none focus:border-gold sm:text-sm">
                  <option value="">Any duration</option>
                  {DURATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.label}
                    </option>
                  ))}
                </select>
                <select value={sort} onChange={(e) => set('sort', e.target.value === 'popular' ? '' : e.target.value)} aria-label="Sort" className="min-w-0 max-w-full rounded-full border border-line bg-surface px-4 py-2 text-[16px] font-semibold text-ink outline-none focus:border-gold sm:text-sm">
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
                {active && (
                  <button onClick={() => setSp({}, { replace: true, preventScrollReset: true })} className="flex items-center gap-1.5 px-2 text-sm font-semibold text-gold hover:underline">
                    <RotateCcw className="h-3.5 w-3.5" /> Reset
                  </button>
                )}
                <span className="w-full text-sm text-muted sm:ml-auto sm:w-auto">
                  <b className="text-ink">{list.length}</b> {list.length === 1 ? 'journey' : 'journeys'}
                  {destName ? ` in ${destName}` : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Results */}
          <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p, k) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35 }} className="h-full">
                  <PackageCard p={p} index={k} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {!list.length && (
            <div className="mx-auto mt-6 max-w-md rounded-3xl border border-dashed border-line p-10 text-center">
              <SearchX className="mx-auto h-10 w-10 text-gold" />
              <p className="mt-4 font-display text-2xl font-semibold">No exact match — but we can craft it!</p>
              <p className="mt-2 text-sm text-muted">Try fewer filters, or tell our AI concierge what you're looking for.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <button onClick={() => setSp({}, { replace: true, preventScrollReset: true })} className="btn-ghost">
                  Clear filters
                </button>
                <button onClick={() => openChat()} className="btn-gold">
                  <Sparkles className="h-4 w-4" /> Ask AI
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <BoardingPassCTA />
    </>
  )
}
