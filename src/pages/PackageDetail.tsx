import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { CalendarDays, Check, ChevronDown, ChevronRight, Clock, MapPin, Navigation, X } from 'lucide-react'
import { getPackage, PACKAGES } from '../data/packages'
import { getDestination } from '../data/destinations'
import { cn, img, inr } from '../lib/utils'
import { useScrollLock } from '../lib/hooks'
import BookingPanel from '../components/BookingPanel'
import PackageCard from '../components/PackageCard'
import { Img, Reveal, WhatsAppIcon } from '../components/ui'

// Keyed by slug so every package starts fresh (booking form, sheet, lightbox, open day).
export default function PackageDetailPage() {
  const { slug = '' } = useParams()
  return <PackageDetail key={slug} slug={slug} />
}

function PackageDetail({ slug }: { slug: string }) {
  const p = getPackage(slug)
  const [openDay, setOpenDay] = useState<number | 'all'>(0)
  const [sheet, setSheet] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, 150])

  useEffect(() => {
    if (p) document.title = `${p.title} · ${p.nights}N/${p.days}D — Ivaan Escapes`
  }, [p])

  useScrollLock(sheet || !!lightbox)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  if (!p) return <Navigate to="/packages" replace />
  const d = getDestination(p.destination)
  const similar = PACKAGES.filter((x) => x.slug !== p.slug && x.themes.some((t) => p.themes.includes(t))).slice(0, 3)
  const photos = [p.cover, ...p.gallery]

  return (
    <>
      {/* Hero */}
      <section className="grain relative isolate flex min-h-[78svh] items-end overflow-hidden bg-navy pb-14 pt-32 text-ivory">
        <motion.div style={{ y: heroY }} className="absolute inset-0 -z-10">
          <Img id={p.cover} alt={p.title} priority sizes="100vw" w={1800} className="kenburns h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/40 to-navy/40" />
        <div className="container-x">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <nav className="flex flex-wrap items-center gap-1.5 text-xs text-ivory/70" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-gold-soft">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/packages" className="hover:text-gold-soft">Packages</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-ivory">{d?.name}</span>
            </nav>
            <p className="mt-6 font-script text-3xl text-gold-soft sm:text-4xl">{d?.tagline}</p>
            <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.95] sm:text-7xl">{p.title}</h1>
            <p className="mt-4 max-w-2xl text-base text-ivory/80 sm:text-lg">{p.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { icon: Clock, t: `${p.nights} Nights / ${p.days} Days` },
                { icon: Navigation, t: p.route },
                { icon: CalendarDays, t: `Best: ${p.bestTime}` },
              ].map((c) => (
                <span key={c.t} className="glass flex items-center gap-2 rounded-full border border-ivory/15 px-4 py-2 text-xs font-semibold !bg-navy/40 sm:text-sm">
                  <c.icon className="h-4 w-4 text-gold-soft" /> {c.t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_400px]">
          <div className="min-w-0 space-y-16">
            {/* Highlights */}
            <Reveal>
              <p className="eyebrow">Trip Highlights</p>
              <h2 className="mt-3 font-display text-4xl font-semibold">Why you'll love it</h2>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4">
                    <span className="bg-gilded mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-navy">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-medium leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Itinerary */}
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">Day by Day</p>
                  <h2 className="mt-3 font-display text-4xl font-semibold">Your itinerary</h2>
                </div>
                <button onClick={() => setOpenDay(openDay === 'all' ? 0 : 'all')} className="text-sm font-semibold text-gold hover:underline">
                  {openDay === 'all' ? 'Collapse' : 'Expand all'}
                </button>
              </div>
              <ol className="relative mt-8 space-y-3 before:absolute before:bottom-6 before:left-[1.35rem] before:top-6 before:w-px before:border-l-2 before:border-dashed before:border-gold/30">
                {p.itinerary.map((day, k) => {
                  const open = openDay === 'all' || openDay === k
                  return (
                    <li key={k} className="relative pl-14">
                      <span className={cn('absolute left-0 top-3 grid h-11 w-11 place-items-center rounded-full border font-cinzel text-xs font-bold transition-colors', open ? 'bg-gilded border-transparent text-navy' : 'border-gold/40 bg-surface text-gold')}>
                        D{k + 1}
                      </span>
                      <div className={cn('rounded-2xl border bg-surface transition-colors', open ? 'border-gold/40' : 'border-line')}>
                        <button onClick={() => setOpenDay(open && openDay !== 'all' ? -1 : k)} aria-expanded={open} className="flex w-full items-center justify-between gap-3 p-4 text-left sm:p-5">
                          <span>
                            <span className="block text-[0.68rem] font-bold uppercase tracking-[0.15em] text-gold">Day {k + 1}</span>
                            <span className="mt-0.5 block font-display text-xl font-semibold leading-snug sm:text-2xl">{day.title}</span>
                          </span>
                          <ChevronDown className={cn('h-5 w-5 shrink-0 text-muted transition-transform duration-300', open && 'rotate-180 text-gold')} />
                        </button>
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                              <p className="px-4 pb-5 text-sm leading-relaxed text-muted sm:px-5">{day.desc}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </Reveal>

            {/* Inclusions */}
            <Reveal className="grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl border border-line bg-surface p-6">
                <h3 className="font-display text-2xl font-semibold">What's included</h3>
                <ul className="mt-4 space-y-3">
                  {p.inclusions.map((x) => (
                    <li key={x} className="flex gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-line bg-surface p-6">
                <h3 className="font-display text-2xl font-semibold">Not included</h3>
                <ul className="mt-4 space-y-3">
                  {p.exclusions.map((x) => (
                    <li key={x} className="flex gap-3 text-sm text-muted">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Gallery */}
            <Reveal>
              <p className="eyebrow">Gallery</p>
              <h2 className="mt-3 font-display text-4xl font-semibold">A glimpse of {d?.name}</h2>
              <div className="mt-8 grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:grid-cols-4">
                {photos.map((ph, k) => (
                  <button key={ph} onClick={() => setLightbox(ph)} className={cn('group overflow-hidden rounded-2xl', k === 0 && 'col-span-2 row-span-2')} aria-label="Open photo">
                    <Img id={ph} alt={`${d?.name} photo ${k + 1}`} w={k === 0 ? 1000 : 600} sizes="(max-width:640px) 50vw, 25vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal className="rounded-3xl border border-dashed border-gold/40 bg-gold/5 p-6 text-sm leading-relaxed text-muted">
              <p className="font-semibold text-ink">Good to know</p>
              <p className="mt-2">
                Prices are per person on twin-sharing basis, starting from {inr(p.priceFrom)} with standard hotels. Rates vary with travel dates, hotel availability and group size. Starting point: {p.startCity}. Every itinerary can be customised — just tell us on WhatsApp.
              </p>
            </Reveal>
          </div>

          {/* Booking (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <BookingPanel p={p} />
            </div>
          </aside>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="bg-bg-2 py-20 sm:py-24">
          <div className="container-x">
            <p className="eyebrow">You may also like</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">Similar escapes</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s, k) => (
                <PackageCard key={s.slug} p={s} index={k} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile sticky bar */}
      <div className="glass fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-line px-4 py-3 lg:hidden">
        <div>
          <p className="text-[0.65rem] uppercase tracking-wider text-muted">From / person</p>
          <p className="font-display text-2xl font-bold leading-none text-ink">{inr(p.priceFrom)}</p>
        </div>
        <button onClick={() => setSheet(true)} className="btn-wa !px-5">
          <WhatsAppIcon className="h-4 w-4" /> Book Now
        </button>
      </div>
      <div className="h-20 lg:hidden" />

      {/* Mobile booking sheet */}
      <AnimatePresence>
        {sheet && (
          <motion.div className="fixed inset-0 z-[65] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-navy/70 backdrop-blur-sm" onClick={() => setSheet(false)} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="absolute inset-x-0 bottom-0 max-h-[92svh] overflow-y-auto rounded-t-[2rem] bg-bg p-3 pb-6"
            >
              <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-line" />
              <button onClick={() => setSheet(false)} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-surface text-ink shadow">
                <X className="h-4 w-4" />
              </button>
              <BookingPanel p={p} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-navy/95 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}>
            <motion.img initial={{ scale: 0.92 }} animate={{ scale: 1 }} src={img(lightbox, 1800, 80)} alt="" className="max-h-[85vh] max-w-full rounded-2xl object-contain" />
            <button aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-ivory/10 text-ivory">
              <X className="h-5 w-5" />
            </button>
            <p className="absolute bottom-6 flex items-center gap-2 text-xs text-ivory/60">
              <MapPin className="h-3 w-3" /> {d?.location}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
