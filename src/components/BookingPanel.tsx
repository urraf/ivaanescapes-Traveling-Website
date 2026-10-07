import { useMemo, useState } from 'react'
import { Minus, Plus, Sparkles } from 'lucide-react'
import { TIERS, type Package, type TierId } from '../data/packages'
import { getDestination } from '../data/destinations'
import { useUI } from '../context/ui'
import { cn, inr, waLink } from '../lib/utils'
import { WhatsAppIcon } from './ui'

function Counter({ label, sub, value, min, max, onChange }: { label: string; sub: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-semibold text-ink">{label}</p>
        <p className="text-xs text-muted">{sub}</p>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Fewer ${label}`} className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink transition-colors hover:border-gold disabled:opacity-30">
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-5 text-center font-bold tabular-nums">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`More ${label}`} className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink transition-colors hover:border-gold disabled:opacity-30">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

export default function BookingPanel({ p }: { p: Package }) {
  const d = getDestination(p.destination)
  const { openChat } = useUI()
  const [date, setDate] = useState('')
  const [adults, setAdults] = useState(2)
  const [kids, setKids] = useState(0)
  const [tier, setTier] = useState<TierId>('deluxe')
  const [name, setName] = useState('')

  const t = TIERS.find((x) => x.id === tier)!
  const perAdult = Math.round((p.priceFrom * t.mult) / 100) * 100
  const total = perAdult * adults + perAdult * 0.5 * kids
  const today = useMemo(() => new Date().toISOString().slice(0, 10), [])

  const message = () => {
    const when = date ? new Date(date + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Flexible'
    const people = `${adults} Adult${adults > 1 ? 's' : ''}${kids ? `, ${kids} Child${kids > 1 ? 'ren' : ''}` : ''}`
    return [
      "Hello Ivaanescapes! ✈️ I'd like to book this package:",
      '',
      `*${p.title}* (${p.nights}N/${p.days}D)`,
      `📍 Route: ${p.route}`,
      `📅 Travel date: ${when}`,
      `👥 Travellers: ${people}`,
      `🏨 Hotel category: ${t.label} (${t.stars}★)`,
      `💰 Estimated price: ${inr(total)} (indicative)`,
      name.trim() ? `🙋 Name: ${name.trim()}` : '',
      '',
      `🔗 ${window.location.origin}/packages/${p.slug}`,
      'Please confirm availability and share the final quote. Thank you!',
    ]
      .filter((l, i, a) => l !== '' || a[i - 1] !== '')
      .join('\n')
  }

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-gold/30 bg-surface shadow-[var(--shadow)]">
      {/* Ticket head */}
      <div className="grain relative bg-navy px-6 pb-6 pt-5 text-ivory">
        <div className="flex items-center justify-between">
          <p className="font-cinzel text-[0.62rem] tracking-[0.3em] text-gold-soft">BOARDING PASS</p>
          <img src="/logo-mark.webp" alt="" className="h-5 w-auto" />
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.6rem] font-bold uppercase tracking-widest text-ivory/50">From</p>
            <p className="truncate font-cinzel text-lg font-bold">{p.startCity.split(/[ (/]/)[0]}</p>
          </div>
          <svg viewBox="-16 -10 36 20" className="mb-1.5 h-5 w-7 shrink-0 text-gold-soft" fill="currentColor" aria-hidden>
            <path d="M0 -9 L4 -2 L18 0 L4 2 L0 9 L-2 2 L-10 2 L-13 6 L-15 6 L-13 0 L-15 -6 L-13 -6 L-10 -2 L-2 -2 Z" />
          </svg>
          <div className="min-w-0 text-right">
            <p className="text-[0.6rem] font-bold uppercase tracking-widest text-ivory/50">To</p>
            <p className="text-gilded truncate font-cinzel text-lg font-bold">{d?.name.split(' ')[0]}</p>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between border-t border-ivory/15 pt-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-wider text-ivory/60">Per adult · {t.label}</p>
            <p className="font-display text-4xl font-bold leading-none">{inr(perAdult)}</p>
          </div>
          <p className="rounded-full border border-gold/40 px-3 py-1 text-xs font-bold text-gold-soft">
            {p.nights}N / {p.days}D
          </p>
        </div>
      </div>

      {/* Perforation */}
      <div className="relative h-0 border-t-2 border-dashed border-line">
        <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-bg" />
        <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-bg" />
      </div>

      <form
        className="space-y-4 p-6"
        onSubmit={(e) => {
          e.preventDefault()
          window.open(waLink(message()), '_blank', 'noopener')
        }}
      >
        <div>
          <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-muted">Hotel category</p>
          <div className="grid grid-cols-3 gap-2">
            {TIERS.map((x) => (
              <button
                type="button"
                key={x.id}
                onClick={() => setTier(x.id)}
                aria-pressed={tier === x.id}
                className={cn('rounded-xl border px-2 py-2.5 text-center transition-all', tier === x.id ? 'border-gold bg-gold/10 text-ink' : 'border-line text-muted hover:border-gold/40')}
              >
                <span className="block text-sm font-bold">{x.label}</span>
                <span className="block text-[0.65rem] text-gold">{'★'.repeat(x.stars)}</span>
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.15em] text-muted">Travel date</span>
          <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-[16px] font-semibold text-ink outline-none focus:border-gold sm:text-sm" />
        </label>

        <div className="divide-y divide-line rounded-xl border border-line px-4">
          <Counter label="Adults" sub="12+ years" value={adults} min={1} max={30} onChange={setAdults} />
          <Counter label="Children" sub="5 – 11 years · 50% price" value={kids} min={0} max={10} onChange={setKids} />
        </div>

        <label className="block">
          <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.15em] text-muted">Your name (optional)</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rahul Sharma" maxLength={60} className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-[16px] text-ink outline-none placeholder:text-muted focus:border-gold sm:text-sm" />
        </label>

        <div className="flex items-end justify-between rounded-xl bg-bg-2 px-4 py-3">
          <span className="text-sm text-muted">Estimated total</span>
          <span className="font-display text-3xl font-bold text-ink">{inr(total)}</span>
        </div>

        <button type="submit" className="btn-wa w-full !py-4 text-base">
          <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
        </button>
        <button type="button" onClick={() => openChat(`Tell me more about the ${p.title} package. Is it right for me?`)} className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-gold hover:underline">
          <Sparkles className="h-4 w-4" /> Have a question? Ask our AI
        </button>
        <p className="text-center text-[0.68rem] leading-relaxed text-muted">No payment now. Our expert confirms availability & the final quote on WhatsApp.</p>
      </form>
    </div>
  )
}
