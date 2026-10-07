import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  BadgeIndianRupee,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Compass,
  Handshake,
  Headset,
  Hotel,
  MapPin,
  MessageCircleHeart,
  Search,
  Settings2,
  Sparkles,
  Users,
  Presentation,
  Briefcase,
  PartyPopper,
} from 'lucide-react'
import { DESTINATIONS, GROUPS, getDestination, type Group } from '../data/destinations'
import { PACKAGES, destInfo, packagesFor, type Theme } from '../data/packages'
import { CHAIN_PARTNERS, LEMON_TREE } from '../data/hotels'
import { REVIEWS } from '../data/reviews'
import { BLOGS } from '../data/blogs'
import { useUI } from '../context/ui'
import { cn, img, inr, srcSet, waLink } from '../lib/utils'
import PackageCard from '../components/PackageCard'
import BoardingPassCTA from '../components/BoardingPassCTA'
import { Img, Reveal, SectionHeading, Stars, WhatsAppIcon } from '../components/ui'

const HERO_SLIDES = ['ladakh', 'kashmir', 'kerala', 'goa', 'rajasthan'].map((s) => getDestination(s)!)

/* ---------------- Hero ---------------- */
function Hero() {
  const [i, setI] = useState(0)
  const { openChat } = useUI()
  const slide = HERO_SLIDES[i]
  const pkg = packagesFor(slide.slug)[0]
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const t = window.setTimeout(() => setI((v) => (v + 1) % HERO_SLIDES.length), 6500)
    // warm the cache for the next slide
    const next = new Image()
    next.src = img(HERO_SLIDES[(i + 1) % HERO_SLIDES.length].image, 1800)
    return () => window.clearTimeout(t)
  }, [i])

  const word = 'Escape'

  return (
    <section ref={ref} className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy text-ivory">
      <motion.div style={{ y }} className="absolute inset-0 -z-20">
        <AnimatePresence initial={false}>
          <motion.div key={slide.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.6, ease: 'easeInOut' }} className="absolute inset-0">
            <img
              src={img(slide.image, 1800)}
              srcSet={srcSet(slide.image, [800, 1200, 1800, 2400])}
              sizes="100vw"
              alt={`${slide.name} — ${slide.tagline}`}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              className="kenburns h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/85 via-navy/45 to-navy/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-transparent to-navy/50" />

      {/* Animated flight path */}
      <svg viewBox="0 0 1440 800" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70" aria-hidden>
        <path id="flight" d="M-40 640 C 300 520, 420 300, 760 330 S 1200 160, 1500 90" fill="none" stroke="url(#fg)" strokeWidth="1.6" strokeDasharray="2 10" strokeLinecap="round" />
        <defs>
          <linearGradient id="fg" x1="0" x2="1">
            <stop offset="0" stopColor="#d4af37" stopOpacity="0" />
            <stop offset=".4" stopColor="#f1d27a" stopOpacity=".9" />
            <stop offset="1" stopColor="#d4af37" stopOpacity=".2" />
          </linearGradient>
        </defs>
        <g>
          <path d="M0 -9 L4 -2 L18 0 L4 2 L0 9 L-2 2 L-10 2 L-13 6 L-15 6 L-13 0 L-15 -6 L-13 -6 L-10 -2 L-2 -2 Z" fill="#f1d27a" />
          <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
            <mpath href="#flight" />
          </animateMotion>
        </g>
      </svg>

      <motion.div style={{ opacity: fade }} className="container-x relative flex flex-1 flex-col justify-center pb-40 pt-32 sm:pb-44">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="eyebrow flex items-center gap-3 !text-gold-soft">
          <span className="h-px w-10 bg-gold-soft/70" /> Premium Holidays · B2B Travel Experts
        </motion.p>

        <h1 className="mt-6 font-display font-semibold leading-[0.85]">
          <span className="sr-only">Escape the Ordinary</span>
          <span aria-hidden className="flex overflow-hidden text-[clamp(4.5rem,15vw,11rem)]">
            {word.split('').map((c, k) => (
              <motion.span key={k} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.35 + k * 0.06, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="inline-block">
                {c}
              </motion.span>
            ))}
          </span>
          <motion.span
            aria-hidden
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ delay: 1, duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
            className="text-gilded -mt-2 block pl-2 font-script text-[clamp(3rem,9vw,6.5rem)] font-normal leading-[1.1] sm:-mt-4 sm:pl-24"
          >
            the Ordinary
          </motion.span>
        </h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }} className="mt-6 max-w-lg text-base leading-relaxed text-ivory/80 sm:text-lg">
          Handcrafted India holidays — Kashmir, Ladakh, Himachal, Uttarakhand, Goa, Rajasthan, Mumbai and Kerala — with exclusive hotel deals, planned by experts and confirmed in one WhatsApp message.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }} className="mt-8 flex flex-wrap gap-3">
          <Link to="/packages" className="btn-gold">
            Explore Packages <ArrowRight className="h-4 w-4" />
          </Link>
          <button onClick={() => openChat()} className="btn-ghost !border-ivory/30 !text-ivory hover:!border-gold hover:!text-gold-soft">
            <Sparkles className="h-4 w-4" /> Ask AI Concierge
          </button>
        </motion.div>
      </motion.div>

      {/* Now showing card */}
      <div className="container-x pointer-events-none absolute inset-x-0 bottom-32 hidden justify-end lg:flex">
        <AnimatePresence mode="wait">
          <motion.div key={slide.slug} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.6 }} className="pointer-events-auto w-80">
            <Link to={pkg ? `/packages/${pkg.slug}` : '/packages'} className="glass group block rounded-3xl border border-ivory/15 p-5 !bg-navy/40">
              <p className="font-cinzel text-[0.65rem] tracking-[0.3em] text-gold-soft">NOW SHOWING · {slide.coords}</p>
              <p className="mt-2 font-display text-3xl font-semibold leading-none">{slide.name}</p>
              <p className="mt-1 text-sm text-ivory/70">{slide.tagline}</p>
              {pkg && (
                <p className="mt-4 flex items-center justify-between text-sm">
                  <span>
                    {pkg.nights}N/{pkg.days}D · from <b className="text-gold-soft">{inr(pkg.priceFrom)}</b>
                  </span>
                  <ArrowRight className="h-4 w-4 text-gold-soft transition-transform group-hover:translate-x-1" />
                </p>
              )}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide progress */}
      <div className="container-x absolute inset-x-0 bottom-32 flex items-center gap-2">
        {HERO_SLIDES.map((s, k) => (
          <button key={s.slug} onClick={() => setI(k)} aria-label={`Show ${s.name}`} className="relative h-1 w-10 overflow-hidden rounded-full bg-ivory/25 sm:w-14">
            {k === i && (
              <motion.span key={i} className="absolute inset-0 origin-left bg-gold-soft" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 6.5, ease: 'linear' }} />
            )}
          </button>
        ))}
        <span className="ml-3 hidden whitespace-nowrap font-cinzel text-[0.65rem] tracking-[0.3em] text-ivory/70 min-[380px]:inline lg:hidden">{slide.name.toUpperCase()}</span>
      </div>
    </section>
  )
}

/* ---------------- Journey finder ---------------- */
function JourneyFinder() {
  const nav = useNavigate()
  const [dest, setDest] = useState('')
  const [dur, setDur] = useState('')
  const [theme, setTheme] = useState('')
  const themes: Theme[] = ['Honeymoon', 'Family', 'Adventure', 'Beach', 'Spiritual', 'Culture', 'Nature']

  const go = () => {
    const sp = new URLSearchParams()
    if (dest) sp.set('dest', dest)
    if (dur) sp.set('dur', dur)
    if (theme) sp.set('theme', theme)
    const q = sp.toString()
    nav(q ? `/packages?${q}` : '/packages')
  }

  const field = 'w-full appearance-none bg-transparent pr-6 text-base font-semibold text-ink outline-none cursor-pointer'

  return (
    <div className="container-x relative z-10 -mt-24 sm:-mt-28">
      <Reveal>
        <div className="relative rounded-[2rem] border border-line bg-surface p-3 shadow-[var(--shadow)]">
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:gap-0">
            {[
              {
                icon: MapPin,
                label: 'Where to?',
                el: (
                  <select value={dest} onChange={(e) => setDest(e.target.value)} className={field} aria-label="Destination">
                    <option value="">Any destination</option>
                    {(Object.keys(GROUPS) as Group[]).map((g) => (
                      <optgroup key={g} label={GROUPS[g].label}>
                        {DESTINATIONS.filter((d) => d.group === g).map((d) => (
                          <option key={d.slug} value={d.slug}>
                            {d.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                ),
              },
              {
                icon: CalendarDays,
                label: 'How long?',
                el: (
                  <select value={dur} onChange={(e) => setDur(e.target.value)} className={field} aria-label="Duration">
                    <option value="">Any duration</option>
                    <option value="short">Short break · up to 4 days</option>
                    <option value="mid">5 – 6 days</option>
                    <option value="long">7 days or more</option>
                  </select>
                ),
              },
              {
                icon: Users,
                label: 'Travel style',
                el: (
                  <select value={theme} onChange={(e) => setTheme(e.target.value)} className={field} aria-label="Travel style">
                    <option value="">Any style</option>
                    {themes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                ),
              },
            ].map((f, k) => (
              <label key={f.label} className={cn('relative flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-surface-2', k > 0 && 'lg:rounded-none lg:border-l lg:border-line')}>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                  <f.icon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.68rem] font-bold uppercase tracking-[0.15em] text-muted">{f.label}</span>
                  {f.el}
                </span>
                <ChevronRight className="pointer-events-none absolute right-4 h-4 w-4 rotate-90 text-muted" />
              </label>
            ))}
            <button onClick={go} className="btn-gold whitespace-nowrap !rounded-[1.4rem] !px-8 !py-4 sm:col-span-3 lg:col-span-1 lg:ml-2">
              <Search className="h-4 w-4" /> Find My Escape
            </button>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

/* ---------------- Marquee ---------------- */
function Marquee() {
  const names = DESTINATIONS.map((d) => d.name)
  return (
    <div className="overflow-hidden border-y border-line py-5" aria-hidden>
      <div className="marquee flex w-max gap-10">
        {[...names, ...names].map((n, k) => (
          <span key={k} className="flex items-center gap-10 font-cinzel text-xl font-semibold tracking-[0.2em] text-ink/80 sm:text-2xl">
            {n.toUpperCase()} <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Destinations carousel ---------------- */
function Destinations() {
  const [tab, setTab] = useState<Group | 'all'>('all')
  const rail = useRef<HTMLDivElement>(null)
  const list = useMemo(() => (tab === 'all' ? DESTINATIONS : DESTINATIONS.filter((d) => d.group === tab)), [tab])
  const scroll = (dir: number) => rail.current?.scrollBy({ left: dir * (rail.current.clientWidth * 0.8), behavior: 'smooth' })

  return (
    <section className="py-24 sm:py-32">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow="Destinations" title="Where will your" accent="story begin?" text="Eight of India's most-loved regions, each with perfectly planned journeys. No clutter — just pick the place that calls you." />
        <div className="flex items-center gap-2">
          <button onClick={() => scroll(-1)} aria-label="Scroll left" className="grid h-12 w-12 place-items-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => scroll(1)} aria-label="Scroll right" className="grid h-12 w-12 place-items-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="container-x mt-10">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
          {(['all', ...Object.keys(GROUPS)] as (Group | 'all')[]).map((g) => (
            <button
              key={g}
              onClick={() => {
                setTab(g)
                rail.current?.scrollTo({ left: 0, behavior: 'smooth' })
              }}
              className={cn('relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors', tab === g ? 'text-navy' : 'text-muted hover:text-ink')}
            >
              {tab === g && <motion.span layoutId="destTab" className="bg-gilded absolute inset-0 -z-0 rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <span className="relative">{g === 'all' ? 'All Destinations' : GROUPS[g].label}</span>
            </button>
          ))}
        </div>
      </div>

      <div ref={rail} className="no-scrollbar mt-8 flex snap-x snap-mandatory scroll-px-[max(1rem,calc((100vw-1280px)/2+2rem))] gap-5 overflow-x-auto scroll-smooth px-[max(1rem,calc((100vw-1280px)/2+2rem))] pb-4">
        <AnimatePresence mode="popLayout">
          {list.map((d, k) => {
            const info = destInfo(d.slug)
            return (
              <motion.div
                layout
                key={d.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: k * 0.04 } }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-[78vw] shrink-0 snap-start sm:w-[320px]"
              >
                <Link to={info.link} className="group relative block aspect-[3/4] overflow-hidden rounded-[1.75rem] text-ivory">
                  <Img id={d.image} alt={`${d.name} — ${d.tagline}`} w={700} sizes="(max-width: 640px) 78vw, 320px" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent opacity-90" />
                  <div className="absolute inset-3 rounded-[1.35rem] border border-ivory/20 transition-colors duration-500 group-hover:border-gold-soft/60" />
                  <span className="absolute right-6 top-6 font-cinzel text-[0.6rem] tracking-[0.25em] text-ivory/80 [writing-mode:vertical-rl]">{d.coords}</span>
                  <div className="absolute inset-x-6 bottom-6">
                    <p className="font-script text-2xl text-gold-soft">{d.tagline}</p>
                    <p className="font-display text-4xl font-semibold leading-none">{d.name}</p>
                    {info.count > 0 && (
                      <div className="mt-4 flex items-center justify-between border-t border-ivory/20 pt-3 text-sm">
                        <span className="text-ivory/80">
                          {info.label} · from <b className="text-ivory">{inr(info.from)}</b>
                        </span>
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-ivory/15 transition-all duration-500 group-hover:bg-gold group-hover:text-navy">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ---------------- Featured packages ---------------- */
function Featured() {
  const featured = PACKAGES.filter((p) => p.popular).slice(0, 6)
  return (
    <section className="relative bg-bg-2 py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Signature Journeys" title="Most-loved" accent="holiday packages" text="Fixed prices, hand-checked hotels and day-by-day plans. Open any package to see the full itinerary and book on WhatsApp in seconds." />
          <Link to="/packages" className="btn-ghost shrink-0">
            View all {PACKAGES.length} packages <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, k) => (
            <PackageCard key={p.slug} p={p} index={k} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- B2B hotel deals (from the "6 Destinations · 1 Solution" flyer) ---------------- */
const DEAL_DESTINATIONS = [
  { name: 'Goa', image: 'photo-1614082242765-7c98ca0f3df3', tag: 'Special exclusive deal', to: '/hotels' },
  { name: 'Uttarakhand', image: 'photo-1719581827279-e9a8d8fce924', tag: 'Special exclusive deal', to: '/packages?dest=uttarakhand' },
  { name: 'Kashmir', image: 'photo-1564327287902-0ccf559d839e', tag: 'Best deal', to: '/packages/kashmir-paradise-on-earth' },
  { name: 'Rajasthan', image: 'photo-1599661046827-dacff0c0f09a', tag: 'Best deal', to: '/hotels?region=rajasthan' },
  { name: 'Mumbai', image: 'photo-1598434192043-71111c1b3f41', tag: 'Best deal', to: '/hotels?region=maharashtra' },
  { name: 'Kerala', image: 'photo-1506461883276-594a12b11cf3', tag: 'Best deal', to: '/packages/kerala-backwaters-and-hills' },
]

function HotelDeals() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading center eyebrow="B2B Hotel Deals" title="6 destinations," accent="1 solution" text="Special exclusive deals in Goa & Uttarakhand, best deals in Kashmir, Rajasthan, Mumbai & Kerala — and chain hotels across the rest of India." />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {DEAL_DESTINATIONS.map((d, k) => (
            <Reveal key={d.name} delay={k * 0.06}>
              <Link to={d.to} className="group relative block aspect-[3/4] overflow-hidden rounded-3xl text-ivory">
                <Img id={d.image} alt={d.name} w={500} sizes="(max-width:768px) 50vw, 16vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />
                <span className={cn('absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wide', k < 2 ? 'bg-gilded text-navy' : 'bg-navy/75 text-ivory backdrop-blur')}>{d.tag}</span>
                <p className="absolute inset-x-4 bottom-4 font-display text-2xl font-semibold leading-none sm:text-3xl">{d.name}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-muted">Rest of India — we have chain hotels</p>
          <div className="mt-5 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div className="marquee flex w-max items-center gap-10">
              {[...CHAIN_PARTNERS, ...CHAIN_PARTNERS].map((c, k) => (
                <span key={k} className={cn('whitespace-nowrap text-xl text-ink/70', k % 3 === 0 ? 'font-cinzel tracking-widest' : k % 3 === 1 ? 'font-display italic text-2xl' : 'font-sans font-extrabold tracking-tight')}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <p className="eyebrow">Specialising in</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Users, t: 'Family Groups' },
                { icon: Presentation, t: 'MICE' },
                { icon: Briefcase, t: 'Corporate' },
                { icon: PartyPopper, t: 'Marriage Functions' },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl bg-bg-2 p-4 text-center">
                  <x.icon className="mx-auto h-7 w-7 text-gold" />
                  <p className="mt-2 text-sm font-semibold">{x.t}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="grain relative flex flex-col justify-center overflow-hidden rounded-3xl bg-navy p-6 text-ivory sm:p-8">
            <p className="font-display text-3xl font-semibold leading-tight">
              Try our rates <em className="text-gilded">before booking anywhere</em>
            </p>
            <p className="mt-2 text-sm text-ivory/70">Pre-purchased & exclusive B2B hotel rates · instant confirmation · 24 × 7.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/hotels" className="btn-gold !py-2.5">
                View hotel deals <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={waLink("Hello Ivaan Escapes! Please share your best hotel rates.")} target="_blank" rel="noopener" className="btn-wa !py-2.5">
                <WhatsAppIcon className="h-4 w-4" /> Get rates
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- How it works ---------------- */
function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const steps = [
    { icon: Compass, title: 'Pick your package', text: `Browse ${PACKAGES.length} signature India journeys or ask our AI concierge for a recommendation.` },
    { icon: Settings2, title: 'Personalise it', text: 'Choose your dates, travellers and hotel category — see your estimate instantly.' },
    { icon: WhatsAppIcon, title: 'Confirm on WhatsApp', text: 'One tap sends your trip details to our experts. We confirm and you pack your bags.' },
  ]
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading center eyebrow="Booking in 3 steps" title="From daydream to" accent="departure gate" />
        <div ref={ref} className="relative mt-16">
          <svg className="absolute left-0 top-10 hidden h-20 w-full md:block" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden>
            <path d="M120 40 C 350 -20, 450 100, 600 40 S 850 -20, 1080 40" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="6 8" />
            <motion.path d="M120 40 C 350 -20, 450 100, 600 40 S 850 -20, 1080 40" fill="none" stroke="var(--gold)" strokeWidth="2" style={{ pathLength: scrollYProgress }} />
          </svg>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, k) => (
              <Reveal key={s.title} delay={k * 0.15} className="relative text-center">
                <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold/40 bg-surface shadow-[var(--shadow)]">
                  <s.icon className="h-8 w-8 text-gold" />
                  <span className="bg-gilded absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full font-cinzel text-xs font-bold text-navy">{k + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-3xl font-semibold">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Parallax quote ---------------- */
function QuoteBanner() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  return (
    <section ref={ref} className="grain relative isolate overflow-hidden py-32 text-ivory sm:py-44">
      <motion.div style={{ y }} className="absolute -inset-y-[20%] inset-x-0 -z-10">
        <Img id="photo-1683700914015-92be0e442390" alt="" sizes="100vw" w={1800} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-navy/60" />
      <div className="container-x text-center">
        <Reveal>
          <p className="font-script text-4xl text-gold-soft sm:text-5xl">“</p>
          <blockquote className="mx-auto max-w-4xl font-display text-3xl font-medium italic leading-tight sm:text-5xl lg:text-6xl">
            The world is a book, and those who do not travel read only one page.
          </blockquote>
          <p className="eyebrow mt-6 !text-gold-soft">— Saint Augustine</p>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Why us ---------------- */
function WhyUs() {
  const items = [
    { icon: Hotel, title: 'Handpicked hotels', text: 'Every stay is personally vetted for comfort, cleanliness and location.' },
    { icon: BadgeIndianRupee, title: 'Honest pricing', text: 'Clear inclusions, no hidden costs and the best B2B rates passed on to you.' },
    { icon: Headset, title: '24×7 on-trip support', text: 'A real person on WhatsApp from the moment you land until you return home.' },
    { icon: MessageCircleHeart, title: 'Instant WhatsApp booking', text: 'No long forms. Your package details reach our experts in one tap.' },
  ]
  return (
    <section className="relative overflow-hidden bg-bg-2 py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <Reveal className="mt-12 overflow-hidden rounded-[2rem]">
              <Img id="photo-1633702738734-443da2c18f3c" alt="Lake Palace, Udaipur" w={700} sizes="(max-width:1024px) 50vw, 25vw" className="aspect-[3/4] w-full object-cover" />
            </Reveal>
            <Reveal delay={0.15} className="overflow-hidden rounded-[2rem]">
              <Img id="photo-1624554305378-0f440dd3a8c1" alt="Houseboat at sunset, Kerala" w={700} sizes="(max-width:1024px) 50vw, 25vw" className="aspect-[3/4] w-full object-cover" />
            </Reveal>
          </div>
          {/* Rotating badge */}
          <div className="absolute left-1/2 top-1/2 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-navy shadow-2xl sm:h-40 sm:w-40">
            <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <path id="circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text className="fill-[#f1d27a] font-cinzel text-[15px] tracking-[0.28em]">
                <textPath href="#circle">ESCAPE THE ORDINARY ✦ IVAAN ESCAPES ✦</textPath>
              </text>
            </svg>
            <img src="/logo-mark.webp" alt="" className="h-12 w-auto" />
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Why Ivaan Escapes" title="Travel that feels" accent="effortless" text="We are a B2B travel company at heart — trusted by agents for our on-ground network. That same expertise now plans your holiday, end to end." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {items.map((it, k) => (
              <Reveal key={it.title} delay={k * 0.08} className="group rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-gold/50">
                <it.icon className="h-7 w-7 text-gold transition-transform duration-500 group-hover:-translate-y-1" />
                <h3 className="mt-4 font-display text-2xl font-semibold">{it.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{it.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- B2B band ---------------- */
function PartnerBand() {
  return (
    <section className="py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <div className="grain relative isolate overflow-hidden rounded-[2.5rem] bg-navy p-8 text-ivory sm:p-14">
            <Img id="photo-1603202662747-00e33e7d1468" alt="" w={1400} sizes="100vw" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />
            <div className="absolute inset-4 -z-10 rounded-[2rem] border border-gold/25" />
            <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <p className="eyebrow flex items-center gap-3 !text-gold-soft">
                  <Handshake className="h-4 w-4" /> For Travel Agents
                </p>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                  Grow your business with <em className="text-gilded">India's trusted B2B</em> travel partner
                </h2>
                <p className="mt-4 max-w-xl text-ivory/75">Exclusive net rates, white-label itineraries, quick quotations and a dedicated operations team. Let the client enjoy the vacation — you enjoy the margin.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/partners" className="btn-gold">
                    Become a Partner <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a href={waLink("Hello Ivaan Escapes! I'm a travel agent and would like to know about your B2B partner rates.")} target="_blank" rel="noopener" className="btn-wa">
                    <WhatsAppIcon className="h-4 w-4" /> Get Agent Rates
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['1500+', 'Happy travel agents'],
                  [LEMON_TREE.count, 'Lemon Tree & Aurika hotels'],
                  ['24 × 7', 'Best deals, always available'],
                  ['Instant', 'Confirmation & DMC support'],
                ].map(([n, t]) => (
                  <div key={t} className="rounded-2xl border border-ivory/15 bg-ivory/5 p-5">
                    <p className="font-cinzel text-2xl font-bold text-gold-soft">{n}</p>
                    <p className="mt-2 text-sm font-semibold">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  const travellers = REVIEWS.filter((r) => r.kind === 'traveller')
  const rows = [travellers.slice(0, 4), travellers.slice(4)]
  return (
    <section className="overflow-hidden bg-bg-2 py-24 sm:py-32">
      <div className="container-x flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow="Traveller Stories" title="Memories our guests" accent="carry home" />
        <Link to="/reviews" className="btn-ghost shrink-0">
          Read all reviews <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-12 space-y-5">
        {rows.map((row, r) => (
          <div key={r} className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div className={cn('marquee-slow flex w-max gap-5', r === 1 && '[animation-direction:reverse]')}>
              {[...row, ...row].map((rv, k) => (
                <figure key={k} className="w-[320px] shrink-0 rounded-3xl border border-line bg-surface p-6 sm:w-[400px]">
                  <Stars n={rv.rating} />
                  <blockquote className="mt-3 text-[0.95rem] leading-relaxed text-ink/90">“{rv.text}”</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                    <span className="bg-gilded grid h-10 w-10 place-items-center rounded-full font-cinzel text-sm font-bold text-navy">{rv.name[0]}</span>
                    <span>
                      <span className="block text-sm font-bold">{rv.name}</span>
                      <span className="block text-xs text-muted">
                        {rv.city} · {rv.trip}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Blog teaser ---------------- */
function BlogTeaser() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Travel Journal" title="Stories &" accent="smart guides" />
          <Link to="/blog" className="btn-ghost shrink-0">
            Visit the blog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {BLOGS.slice(0, 3).map((b, k) => (
            <Reveal key={b.slug} delay={k * 0.1}>
              <Link to={`/blog/${b.slug}`} className="group block">
                <div className="overflow-hidden rounded-[1.75rem]">
                  <Img id={b.cover} alt={b.title} w={800} sizes="(max-width:768px) 100vw, 33vw" className="aspect-[16/11] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-gold">
                  {b.category} · {b.readMins} min read
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-snug transition-colors group-hover:text-gold">{b.title}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useEffect(() => {
    document.title = 'Ivaan Escapes — Escape the Ordinary | India Holiday Packages & B2B Hotel Deals'
  }, [])
  return (
    <>
      <Hero />
      <JourneyFinder />
      <div className="mt-16">
        <Marquee />
      </div>
      <Destinations />
      <Featured />
      <HotelDeals />
      <HowItWorks />
      <QuoteBanner />
      <WhyUs />
      <PartnerBand />
      <Testimonials />
      <BlogTeaser />
      <BoardingPassCTA />
    </>
  )
}
