import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { SITE } from '../config/site'
import { DESTINATIONS } from '../data/destinations'
import { packagesFor } from '../data/packages'
import { GENERAL_WA, telLink } from '../lib/utils'
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
      <p aria-hidden className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-cinzel text-[18vw] font-bold leading-none text-gold/[0.05]">
        IVAANESCAPES
      </p>

      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-3 font-script text-3xl text-gold">{SITE.tagline}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            A premium B2B travel company crafting signature journeys across India, the Maldives and Bali — for travel partners and the travellers they serve.
          </p>
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
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-muted">
            {DESTINATIONS.map((d) => {
              const p = packagesFor(d.slug)[0]
              return (
                <li key={d.slug}>
                  <Link to={p ? `/packages/${p.slug}` : '/packages'} className="transition-colors hover:text-gold">
                    {d.name.replace(' & Nicobar', '')}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-2.5 text-sm text-muted">
            {[
              ['/packages', 'Holiday Packages'],
              ['/stays', 'Hotels & Stays'],
              ['/partners', 'Partner With Us (B2B)'],
              ['/reviews', 'Traveller Reviews'],
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
          <p className="eyebrow">Get in touch</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={telLink} className="flex items-start gap-3 transition-colors hover:text-gold">
                <Phone className="mt-0.5 h-4 w-4 text-gold" /> {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={GENERAL_WA} target="_blank" rel="noopener" className="flex items-start gap-3 transition-colors hover:text-gold">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 text-gold" /> Chat on WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-start gap-3 transition-colors hover:text-gold">
                <Mail className="mt-0.5 h-4 w-4 text-gold" /> {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-muted">
              <MapPin className="mt-0.5 h-4 w-4 text-gold" /> {SITE.address}
            </li>
            <li className="flex items-start gap-3 text-muted">
              <Clock className="mt-0.5 h-4 w-4 text-gold" /> {SITE.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x relative flex flex-col items-center justify-between gap-3 border-t border-line py-6 text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <p>Prices are indicative and subject to availability · Photos: Unsplash</p>
      </div>
    </footer>
  )
}
