import { Link } from 'react-router-dom'
import { Globe, Mail, MapPin, Phone, ReceiptText } from 'lucide-react'
import { SITE, waNumber } from '../config/site'
import { DESTINATIONS } from '../data/destinations'
import { destInfo } from '../data/packages'
import { GENERAL_WA } from '../lib/utils'
import { FacebookIcon, InstagramIcon, Logo, WhatsAppIcon, YoutubeIcon } from './ui'

export default function Footer() {
  const socials = [
    { href: SITE.socials.instagram, icon: InstagramIcon, label: 'Instagram' },
    { href: SITE.socials.facebook, icon: FacebookIcon, label: 'Facebook' },
    { href: SITE.socials.youtube, icon: YoutubeIcon, label: 'YouTube' },
    { href: GENERAL_WA, icon: WhatsAppIcon, label: 'WhatsApp' },
  ].filter((s) => s.href)

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg-2">
      {/* Giant watermark */}
      <p aria-hidden className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-cinzel text-[15vw] font-bold leading-none text-gold/[0.05]">
        IVAAN ESCAPES
      </p>

      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.9fr_1.4fr]">
        <div>
          <Logo />
          <p className="mt-3 font-script text-3xl text-gold">{SITE.tagline}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {SITE.descriptor} — a trusted destination management company for holiday packages and exclusive hotel deals across India.
          </p>
          <p className="mt-3 text-xs font-semibold tracking-wide text-gold">{SITE.promise}</p>
          <div className="mt-6 flex gap-2">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-gold hover:text-gold">
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Destinations</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-muted lg:grid-cols-1">
            {DESTINATIONS.map((d) => (
              <li key={d.slug}>
                <Link to={destInfo(d.slug).link} className="transition-colors hover:text-gold">
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-2.5 text-sm text-muted">
            {[
              ['/packages', 'Holiday Packages'],
              ['/hotels', 'B2B Hotel Deals'],
              ['/partners', 'Partner With Us (B2B)'],
              ['/reviews', 'Reviews'],
              ['/blog', 'Travel Blog'],
              ['/contact', 'Contact Us'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Call / WhatsApp</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {SITE.team.map((t) => (
              <li key={t.name} className="flex items-center gap-3">
                <span className="w-24 shrink-0 font-semibold">{t.name}</span>
                <a href={`tel:${t.phone}`} className="flex items-center gap-1.5 text-muted transition-colors hover:text-gold">
                  <Phone className="h-3.5 w-3.5 text-gold" /> {t.display}
                </a>
                <a href={`https://api.whatsapp.com/send?phone=${waNumber(t.phone)}`} target="_blank" rel="noopener" aria-label={`WhatsApp ${t.name}`} className="ml-auto text-[#1fae55] transition-opacity hover:opacity-70">
                  <WhatsAppIcon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-start gap-3 transition-colors hover:text-gold">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.url} className="flex items-start gap-3 transition-colors hover:text-gold">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {SITE.website}
              </a>
            </li>
            <li>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`} target="_blank" rel="noopener" className="flex items-start gap-3 text-muted transition-colors hover:text-gold">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {SITE.address.full}
              </a>
            </li>
            <li className="flex items-start gap-3 text-muted">
              <ReceiptText className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> GST No: {SITE.gst}
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x relative flex flex-col items-center justify-between gap-3 border-t border-line py-6 text-center text-xs text-muted sm:flex-row sm:text-left">
        <p>
          © {new Date().getFullYear()} {SITE.legalName} · GST {SITE.gst}
        </p>
        <p>Prices are indicative and subject to availability</p>
      </div>
    </footer>
  )
}
