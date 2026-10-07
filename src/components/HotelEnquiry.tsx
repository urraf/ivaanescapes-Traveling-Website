import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, X } from 'lucide-react'
import { cn, fmtDay, todayLocal, waLink } from '../lib/utils'
import { useScrollLock } from '../lib/hooks'
import { WhatsAppIcon } from './ui'

export type HotelEnquiryTarget = {
  hotel: string
  /** e.g. "Goa · 5 Star Hotels & Resorts". Empty for a chain brand — the visitor then types a city. */
  place: string
}

/** Rate request for one hotel → opens WhatsApp with the details filled in. */
export default function HotelEnquiry({ target, onClose }: { target: HotelEnquiryTarget; onClose: () => void }) {
  const [checkIn, setCheckIn] = useState('')
  const [nights, setNights] = useState(2)
  const [rooms, setRooms] = useState(1)
  const [guests, setGuests] = useState(2)
  const [city, setCity] = useState('')
  const [who, setWho] = useState<'Travel agent' | 'Traveller'>('Travel agent')
  const isChain = !target.place

  useScrollLock(true)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    const where = isChain ? city.trim() : target.place
    const msg = [
      'Hello Ivaan Escapes! 🏨 Please share your best rate for:',
      '',
      `*${target.hotel}*${where ? ` — ${where}` : ''}`,
      `📅 Check-in: ${checkIn ? fmtDay(checkIn) : 'Flexible'} · ${nights} night${nights > 1 ? 's' : ''}`,
      `🛏️ Rooms: ${rooms} · 👥 Guests: ${guests}`,
      `🙋 I am a: ${who}`,
      '',
      'Thank you!',
    ].join('\n')
    window.open(waLink(msg), '_blank', 'noopener')
  }

  const field = 'w-full rounded-xl border border-line bg-bg px-3 py-3 text-[16px] font-semibold text-ink outline-none focus:border-gold sm:text-sm'
  const label = 'mb-1.5 block text-[0.68rem] font-bold uppercase tracking-[0.15em] text-muted'
  const num = (text: string, v: number, set: (n: number) => void, max: number) => (
    <label className="block">
      <span className={label}>{text}</span>
      <select value={v} onChange={(e) => set(Number(e.target.value))} className={field}>
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
          <option key={n}>{n}</option>
        ))}
      </select>
    </label>
  )

  return (
    <motion.div className="fixed inset-0 z-[75] grid place-items-end sm:place-items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-navy/75 backdrop-blur-sm" onClick={onClose} />
      <motion.form
        onSubmit={send}
        role="dialog"
        aria-label={`Get rate for ${target.hotel}`}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative max-h-[100svh] w-full overflow-y-auto rounded-t-[2rem] bg-surface sm:max-h-[calc(100svh-2rem)] sm:max-w-md sm:rounded-[2rem]"
      >
        <div className="grain relative bg-navy px-6 pb-6 pt-6 text-ivory">
          <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-ivory/10">
            <X className="h-4 w-4" />
          </button>
          <p className="eyebrow !text-[0.6rem] !text-gold-soft">B2B rate request</p>
          <p className="mt-3 flex items-start gap-3 pr-10 font-display text-2xl font-semibold leading-tight">
            <Building2 className="mt-1 h-5 w-5 shrink-0 text-gold-soft" />
            {target.hotel}
          </p>
          {target.place && <p className="mt-1 pl-8 text-sm text-ivory/70">{target.place}</p>}
        </div>

        <div className="space-y-4 p-6">
          {isChain && (
            <label className="block">
              <span className={label}>City / destination *</span>
              <input required value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Jaipur, Goa, Mussoorie" maxLength={60} className={cn(field, 'font-medium placeholder:text-muted')} />
            </label>
          )}
          <label className="block">
            <span className={label}>Check-in date</span>
            <input type="date" min={todayLocal()} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={field} />
          </label>
          <div className="grid grid-cols-3 gap-3">
            {num('Nights', nights, setNights, 14)}
            {num('Rooms', rooms, setRooms, 20)}
            {num('Guests', guests, setGuests, 40)}
          </div>
          <div>
            <span className={label}>I am a</span>
            <div className="grid grid-cols-2 gap-2">
              {(['Travel agent', 'Traveller'] as const).map((w) => (
                <button
                  type="button"
                  key={w}
                  onClick={() => setWho(w)}
                  aria-pressed={who === w}
                  className={cn('rounded-xl border px-3 py-2.5 text-sm font-bold transition-colors', who === w ? 'border-gold bg-gold/10 text-ink' : 'border-line text-muted hover:border-gold/40')}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="btn-wa w-full !py-4">
            <WhatsAppIcon className="h-5 w-5" /> Get Best Rate on WhatsApp
          </button>
          <p className="text-center text-[0.68rem] text-muted">Pre-purchased & exclusive B2B rates · Instant confirmation</p>
        </div>
      </motion.form>
    </motion.div>
  )
}
