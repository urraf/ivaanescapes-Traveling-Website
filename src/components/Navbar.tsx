import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Building2, ChevronDown, Menu, Moon, Phone, Sparkles, Sun, X, Compass } from 'lucide-react'
import { DESTINATIONS, GROUPS, type Group } from '../data/destinations'
import { destInfo, PACKAGES } from '../data/packages'
import { HOTEL_REGIONS, LEMON_TREE, TOTAL_HOTELS, hotelCount } from '../data/hotels'
import { SITE } from '../config/site'
import { useUI } from '../context/ui'
import { cn, GENERAL_WA, img, inr, telLink } from '../lib/utils'
import { useMinWidth, useScrollLock } from '../lib/hooks'
import { Logo, WhatsAppIcon } from './ui'

const LINKS = [
  { to: '/partners', label: 'Partners' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

const HOTEL_LINKS = [
  ...HOTEL_REGIONS.map((r) => ({ to: r.id === 'goa' ? '/hotels' : `/hotels?region=${r.id}`, label: `${r.name} Hotels`, sub: `${hotelCount(r)} hotels & resorts`, image: r.image })),
  { to: '/hotels?region=chains', label: 'Pan India Chains', sub: `Taj, ITC, Marriott & more · ${LEMON_TREE.count} Lemon Tree`, image: 'photo-1785845506893-70768a28ba44' },
]

function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useUI()
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={cn('relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full border border-current/20 min-[380px]:h-10 min-[380px]:w-10 transition-colors hover:border-gold hover:text-gold', className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={theme} initial={{ y: 18, opacity: 0, rotate: -90 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: -18, opacity: 0, rotate: 90 }} transition={{ duration: 0.3 }}>
          {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const { openChat } = useUI()
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-full w-[min(1100px,calc(100vw-2rem))] -translate-x-1/2 pt-4"
    >
      <div className="overflow-hidden rounded-3xl border border-line bg-surface text-ink shadow-[var(--shadow)]">
        <div className="grid grid-cols-[260px_1fr]">
          {/* Feature tiles */}
          <div className="flex flex-col gap-3 bg-bg-2 p-4">
            {[
              { to: '/packages', title: 'Holiday Packages', sub: `${PACKAGES.length} handpicked India journeys`, icon: Compass, image: 'photo-1536295243470-d7cba4efab7b' },
              { to: '/hotels', title: 'B2B Hotel Deals', sub: `${TOTAL_HOTELS}+ hotels · exclusive rates`, icon: Building2, image: 'photo-1724947053227-2335bf21d0ae' },
            ].map((t) => (
              <Link key={t.to} to={t.to} onClick={onNavigate} className="group relative flex h-36 flex-col justify-end overflow-hidden rounded-2xl p-4 text-ivory">
                <img src={img(t.image, 500)} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                <t.icon className="relative mb-auto h-5 w-5 text-gold-soft" />
                <p className="relative font-display text-2xl font-semibold leading-none">{t.title}</p>
                <p className="relative mt-1 flex items-center gap-1 text-xs text-ivory/75">
                  {t.sub} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </p>
              </Link>
            ))}
          </div>

          {/* Destinations by group */}
          <div className="grid grid-cols-3 gap-6 p-6">
            {(Object.keys(GROUPS) as Group[]).map((g) => (
              <div key={g}>
                <p className="eyebrow !text-[0.62rem]">{GROUPS[g].label}</p>
                <p className="mt-1 text-xs text-muted">{GROUPS[g].blurb}</p>
                <ul className="mt-4 space-y-1">
                  {DESTINATIONS.filter((d) => d.group === g).map((d) => {
                    const info = destInfo(d.slug)
                    return (
                      <li key={d.slug}>
                        <Link to={info.link} onClick={onNavigate} className="group flex items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-surface-2">
                          <img src={img(d.image, 120, 60)} alt="" className="h-11 w-11 rounded-lg object-cover" />
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold transition-colors group-hover:text-gold">{d.name}</span>
                            {info.count > 0 && (
                              <span className="block text-[0.7rem] text-muted">
                                {info.label} · from {inr(info.from)}
                              </span>
                            )}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 -translate-x-2 text-gold opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
            <div>
              <p className="eyebrow !text-[0.62rem]">B2B Hotel Deals</p>
              <p className="mt-1 text-xs text-muted">Pre-purchased & exclusive rates</p>
              <ul className="mt-4 space-y-1">
                {HOTEL_LINKS.map((h) => (
                  <li key={h.to}>
                    <Link to={h.to} onClick={onNavigate} className="group flex items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-surface-2">
                      <img src={img(h.image, 120, 60)} alt="" className="h-11 w-11 rounded-lg object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold transition-colors group-hover:text-gold">{h.label}</span>
                        <span className="block text-[0.7rem] text-muted">{h.sub}</span>
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 -translate-x-2 text-gold opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-line bg-bg-2 px-6 py-3 text-sm">
          <span className="text-muted">Not sure where to go?</span>
          <button
            onClick={() => {
              onNavigate()
              openChat()
            }}
            className="flex items-center gap-2 font-semibold text-gold hover:underline"
          >
            <Sparkles className="h-4 w-4" /> Ask our AI travel concierge
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [travelsOpen, setTravelsOpen] = useState(true)
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] lg:hidden">
      <div className="absolute inset-0 bg-navy/70 backdrop-blur-sm" onClick={onClose} />
      <motion.nav
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 260 }}
        className="absolute right-0 top-0 flex h-full w-[min(420px,100%)] flex-col overflow-y-auto bg-bg text-ink"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-4">
          <Logo />
          <button onClick={onClose} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full border border-line">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 px-4 py-4">
          <Link to="/" onClick={onClose} className="block border-b border-line py-4 font-display text-2xl font-semibold">
            Home
          </Link>
          <button onClick={() => setTravelsOpen((v) => !v)} className="flex w-full items-center justify-between border-b border-line py-4 font-display text-2xl font-semibold" aria-expanded={travelsOpen}>
            Travels <ChevronDown className={cn('h-5 w-5 text-gold transition-transform', travelsOpen && 'rotate-180')} />
          </button>
          <AnimatePresence initial={false}>
            {travelsOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="grid grid-cols-2 gap-2 py-4">
                  <Link to="/packages" onClick={onClose} className="flex items-center gap-2 rounded-2xl bg-gold/10 p-3 text-sm font-semibold text-gold">
                    <Compass className="h-4 w-4" /> All Packages
                  </Link>
                  <Link to="/hotels" onClick={onClose} className="flex items-center gap-2 rounded-2xl bg-gold/10 p-3 text-sm font-semibold text-gold">
                    <Building2 className="h-4 w-4" /> B2B Hotel Deals
                  </Link>
                </div>
                <div className="grid grid-cols-4 gap-2 pb-4">
                  {DESTINATIONS.map((d) => (
                    <Link key={d.slug} to={destInfo(d.slug).link} onClick={onClose} className="group relative aspect-square overflow-hidden rounded-xl">
                      <img src={img(d.image, 200, 60)} alt="" className="absolute inset-0 h-full w-full object-cover" />
                      <span className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" />
                      <span className="absolute inset-x-0 bottom-1 px-1 text-center text-[0.65rem] font-semibold leading-tight text-ivory">{d.name.split(' & ')[0]}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} onClick={onClose} className="block border-b border-line py-4 font-display text-2xl font-semibold">
              {l.label}
              {l.to === '/partners' && <span className="ml-2 align-middle font-sans text-[0.65rem] font-bold tracking-wider text-gold">B2B</span>}
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 border-t border-line p-4">
          <a href={telLink} className="btn-ghost !px-3">
            <Phone className="h-4 w-4" /> Call us
          </a>
          <a href={GENERAL_WA} target="_blank" rel="noopener" className="btn-wa !px-3">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </motion.nav>
    </motion.div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState(false)
  const [mobile, setMobile] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const travelsRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMega(false)
    setMobile(false)
  }, [pathname])

  useScrollLock(mobile)
  // The drawer is mobile-only: close it if the screen grows to desktop size (e.g. tablet rotation).
  useMinWidth(1024, useCallback(() => setMobile(false), []))

  // Close the mega menu on outside tap or Escape (hover-out alone doesn't exist on touch screens).
  useEffect(() => {
    if (!mega) return
    const onDown = (e: globalThis.PointerEvent) => !travelsRef.current?.contains(e.target as Node) && setMega(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMega(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [mega])

  // Hover only for real mice; touch devices use the tap toggle instead.
  const openMega = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    window.clearTimeout(timer.current)
    setMega(true)
  }
  const closeMega = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    timer.current = window.setTimeout(() => setMega(false), 160)
  }

  const solid = scrolled || mega
  const travelsActive = pathname.startsWith('/packages') || pathname.startsWith('/hotels')
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    cn('relative px-1 py-2 text-[0.9rem] font-semibold transition-colors hover:text-gold', isActive && 'text-gold')

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          solid ? 'border-b border-line bg-bg/90 py-2.5 text-ink backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]' : 'py-4 text-ivory sm:py-5',
        )}
      >
        <div className="container-x flex items-center justify-between gap-3">
          <Logo />

          <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Main">
            <NavLink to="/" end className={linkCls}>
              Home
            </NavLink>
            <div ref={travelsRef} onPointerEnter={openMega} onPointerLeave={closeMega}>
              <button
                onClick={() => setMega((v) => !v)}
                aria-expanded={mega}
                className={cn('flex items-center gap-1 py-2 text-[0.9rem] font-semibold transition-colors hover:text-gold', (mega || travelsActive) && 'text-gold')}
              >
                Travels <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', mega && 'rotate-180')} />
              </button>
              <AnimatePresence>{mega && <MegaMenu onNavigate={() => setMega(false)} />}</AnimatePresence>
            </div>
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkCls}>
                {l.label}
                {l.to === '/partners' && <sup className="ml-0.5 text-[0.55rem] font-bold text-gold">B2B</sup>}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 min-[380px]:gap-2">
            <ThemeToggle />
            <a href={telLink} className="hidden items-center gap-2 rounded-full border border-current/20 px-4 py-2 text-sm font-semibold transition-colors hover:border-gold hover:text-gold xl:flex">
              <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
            </a>
            <a href={GENERAL_WA} target="_blank" rel="noopener" className="btn-gold hidden whitespace-nowrap !py-2.5 sm:inline-flex lg:hidden xl:inline-flex">
              <WhatsAppIcon className="h-4 w-4" /> Plan My Trip
            </a>
            <button onClick={() => setMobile(true)} aria-label="Open menu" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-current/20 min-[380px]:h-10 min-[380px]:w-10 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>{mobile && <MobileMenu onClose={() => setMobile(false)} />}</AnimatePresence>
    </>
  )
}
