import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, MapPin, X } from 'lucide-react'
import { STAYS, STAY_TYPES, type Stay, type StayType } from '../data/stays'
import { cn, inr, waLink } from '../lib/utils'
import BoardingPassCTA from '../components/BoardingPassCTA'
import { Img, PageHero, Stars, WhatsAppIcon } from '../components/ui'

function EnquiryModal({ stay, onClose }: { stay: Stay; onClose: () => void }) {
  const today = new Date().toISOString().slice(0, 10)
  const [checkIn, setCheckIn] = useState('')
  const [nights, setNights] = useState(2)
  const [rooms, setRooms] = useState(1)
  const [guests, setGuests] = useState(2)

  const send = () => {
    const when = checkIn ? new Date(checkIn + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Flexible'
    const msg = [
      'Hello Ivaanescapes! 🏨 I would like to check availability for:',
      '',
      `*${stay.name}* — ${stay.location}`,
      `📅 Check-in: ${when} · ${nights} night${nights > 1 ? 's' : ''}`,
      `🛏️ Rooms: ${rooms} · 👥 Guests: ${guests}`,
      '',
      'Please share availability and the best rate. Thank you!',
    ].join('\n')
    window.open(waLink(msg), '_blank', 'noopener')
  }

  const num = (label: string, v: number, set: (n: number) => void, min: number, max: number) => (
    <label className="block">
      <span className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.15em] text-muted">{label}</span>
      <select value={v} onChange={(e) => set(Number(e.target.value))} className="w-full rounded-xl border border-line bg-bg px-3 py-3 text-[16px] font-semibold text-ink outline-none focus:border-gold sm:text-sm">
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((n) => (
          <option key={n}>{n}</option>
        ))}
      </select>
    </label>
  )

  return (
    <motion.div className="fixed inset-0 z-[75] grid place-items-end p-0 sm:place-items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-navy/75 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-label={`Enquire about ${stay.name}`}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative w-full overflow-hidden rounded-t-[2rem] bg-surface sm:max-w-md sm:rounded-[2rem]"
      >
        <div className="relative h-40">
          <Img id={stay.image} alt={stay.name} w={800} sizes="448px" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" />
          <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-navy/60 text-ivory">
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-5 right-5 text-ivory">
            <p className="font-display text-2xl font-semibold leading-tight">{stay.name}</p>
            <p className="text-xs text-ivory/75">{stay.location}</p>
          </div>
        </div>
        <div className="space-y-4 p-5">
          <label className="block">
            <span className="mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.15em] text-muted">Check-in date</span>
            <input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-[16px] font-semibold text-ink outline-none focus:border-gold sm:text-sm" />
          </label>
          <div className="grid grid-cols-3 gap-3">
            {num('Nights', nights, setNights, 1, 14)}
            {num('Rooms', rooms, setRooms, 1, 10)}
            {num('Guests', guests, setGuests, 1, 30)}
          </div>
          <button onClick={send} className="btn-wa w-full !py-4">
            <WhatsAppIcon className="h-5 w-5" /> Check Availability on WhatsApp
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Stays() {
  const [type, setType] = useState<StayType | ''>('')
  const [active, setActive] = useState<Stay | null>(null)
  const list = type ? STAYS.filter((s) => s.type === type) : STAYS

  useEffect(() => {
    document.title = 'Hotels & Stays — Ivaanescapes'
  }, [])

  return (
    <>
      <PageHero
        eyebrow="Hotels & Stays"
        title="Stay somewhere"
        accent="unforgettable"
        text="Houseboats, heritage palaces, overwater villas and mountain homestays — each one personally vetted by our team."
        image="photo-1724947052687-e580b3010aad"
      />

      <section className="py-14 sm:py-20">
        <div className="container-x">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {(['', ...STAY_TYPES] as (StayType | '')[]).map((t) => (
              <button
                key={t || 'all'}
                onClick={() => setType(t)}
                className={cn('relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors', type === t ? 'text-navy' : 'border border-line text-muted hover:text-ink')}
              >
                {type === t && <motion.span layoutId="stayTab" className="bg-gilded absolute inset-0 rounded-full" />}
                <span className="relative">{t || 'All Stays'}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((s, k) => (
                <motion.article
                  layout
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: (k % 3) * 0.06 } }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-[var(--shadow)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Img id={s.image} alt={s.name} w={800} sizes="(max-width:640px) 100vw, 33vw" className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                    <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-[0.7rem] font-bold text-ivory !bg-navy/50">{s.type}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <Stars n={s.stars} />
                    <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">{s.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                      <MapPin className="h-3.5 w-3.5 text-gold" /> {s.location}
                    </p>
                    <ul className="mb-6 mt-4 space-y-1.5">
                      {s.perks.map((pk) => (
                        <li key={pk} className="flex items-center gap-2 text-sm">
                          <Check className="h-3.5 w-3.5 text-gold" /> {pk}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-line pt-4">
                      <p>
                        <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-muted">From / night</span>
                        <span className="font-display text-2xl font-bold">{inr(s.priceFrom)}</span>
                      </p>
                      <button onClick={() => setActive(s)} className="btn-gold !px-4 !py-2.5 !text-sm">
                        Check Availability
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
          <p className="mt-8 text-center text-xs text-muted">Indicative rates per room per night. Final rates depend on dates & availability.</p>
        </div>
      </section>

      <BoardingPassCTA />
      <AnimatePresence>{active && <EnquiryModal stay={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </>
  )
}
