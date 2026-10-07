import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, MapPin } from 'lucide-react'
import type { Package } from '../data/packages'
import { getDestination } from '../data/destinations'
import { inr } from '../lib/utils'
import { Img } from './ui'

export default function PackageCard({ p, index = 0 }: { p: Package; index?: number }) {
  const d = getDestination(p.destination)
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-[var(--shadow)] transition-transform duration-500 hover:-translate-y-1.5"
    >
      <Link to={`/packages/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden" aria-label={p.title}>
        <Img id={p.cover} alt={p.title} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" w={800} className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/20" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="glass flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-bold text-ivory !bg-navy/50">
            <Clock className="h-3 w-3 text-gold-soft" /> {p.nights}N / {p.days}D
          </span>
          {p.popular && <span className="bg-gilded rounded-full px-3 py-1 text-[0.7rem] font-bold text-navy">Bestseller</span>}
        </div>
        {d && (
          <p className="absolute bottom-3 left-4 right-4 flex items-center gap-1.5 font-cinzel text-[0.65rem] tracking-[0.2em] text-ivory/85">
            <MapPin className="h-3 w-3 text-gold-soft" /> {d.coords}
          </p>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-gold">{p.themes.slice(0, 2).join(' · ')}</p>
        <h3 className="mt-2 font-display text-[1.65rem] font-semibold leading-tight text-ink">
          <Link to={`/packages/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {p.title}
          </Link>
        </h3>
        <p className="mb-5 mt-2 line-clamp-1 text-sm text-muted">{p.route}</p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-dashed border-line pt-4">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-muted">Starting from</p>
            <p className="font-display text-3xl font-bold leading-none text-ink">
              {inr(p.priceFrom)}
              <span className="ml-1 font-sans text-xs font-medium text-muted">/person</span>
            </p>
          </div>
          <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:rotate-45 group-hover:bg-gold group-hover:text-navy">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}
