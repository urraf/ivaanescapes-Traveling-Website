import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode, SVGProps } from 'react'
import { Link } from 'react-router-dom'
import { cn, img, srcSet } from '../lib/utils'

/* ---------- Brand icons (not in lucide) ---------- */
export const WhatsAppIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.94.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5c0-5.18 4.22-9.4 9.42-9.4a9.34 9.34 0 0 1 6.65 2.76 9.34 9.34 0 0 1 2.75 6.65c0 5.19-4.22 9.4-9.4 9.4m8-17.42A11.24 11.24 0 0 0 12.05.75C5.82.75.75 5.82.75 12.05c0 1.99.52 3.93 1.51 5.65L.65 23.25l5.68-1.49a11.3 11.3 0 0 0 5.4 1.38h.01c6.23 0 11.3-5.07 11.3-11.3 0-3.02-1.18-5.86-3.31-8" />
  </svg>
)
export const InstagramIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)
export const FacebookIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.46A21 21 0 0 0 14.27 4.3c-2.3 0-3.87 1.4-3.87 3.98v2.22H7.8v3h2.6V21z" />
  </svg>
)
export const YoutubeIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8M9.6 15V9l5.8 3z" />
  </svg>
)

/* ---------- Logo ---------- */
export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('group flex items-center gap-2.5', className)} aria-label="Ivaanescapes home">
      <img src="/logo-mark.webp" alt="" width={240} height={151} className="h-9 w-auto transition-transform duration-500 group-hover:rotate-[-8deg] sm:h-10" />
      <span className="flex flex-col leading-none">
        <span className="text-gilded font-cinzel text-[1.05rem] font-bold tracking-[0.08em] sm:text-lg">
          IVAANESCAPES
        </span>
        <span className="mt-1 flex items-center gap-1.5 font-cinzel text-[0.55rem] tracking-[0.45em] text-gold">
          <span className="h-px w-3 bg-gold/60" />
          B2B
          <span className="h-px w-3 bg-gold/60" />
        </span>
      </span>
    </Link>
  )
}

/* ---------- Responsive Unsplash image ---------- */
export function Img({
  id,
  alt,
  className,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority,
  w = 1200,
}: {
  id: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
  w?: number
}) {
  return (
    <img
      src={img(id, w)}
      srcSet={srcSet(id)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
    />
  )
}

/* ---------- Scroll reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Section heading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  text,
  center,
  className,
}: {
  eyebrow: string
  title: string
  accent?: string
  text?: string
  center?: boolean
  className?: string
}) {
  return (
    <Reveal className={cn('max-w-2xl', center && 'mx-auto text-center', className)}>
      <p className={cn('eyebrow flex items-center gap-3', center && 'justify-center')}>
        <span className="h-px w-8 bg-gold/60" />
        {eyebrow}
        {center && <span className="h-px w-8 bg-gold/60" />}
      </p>
      <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
        {title} {accent && <em className="text-gilded font-medium">{accent}</em>}
      </h2>
      {text && <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">{text}</p>}
    </Reveal>
  )
}

/* ---------- Inner page hero ---------- */
export function PageHero({
  eyebrow,
  title,
  accent,
  text,
  image,
  children,
}: {
  eyebrow: string
  title: string
  accent?: string
  text?: string
  image: string
  children?: ReactNode
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-navy pb-16 pt-36 text-ivory sm:pb-20 sm:pt-44">
      <Img id={image} alt="" priority sizes="100vw" w={1800} className="kenburns absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/70 via-navy/50 to-navy" />
      <div className="container-x">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
          <p className="eyebrow flex items-center gap-3 !text-gold-soft">
            <span className="h-px w-8 bg-gold-soft/70" />
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[0.98] sm:text-7xl">
            {title} {accent && <em className="text-gilded font-medium">{accent}</em>}
          </h1>
          {text && <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg">{text}</p>}
          {children}
        </motion.div>
      </div>
    </section>
  )
}

export function Stars({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cn('inline-flex gap-0.5 text-gold', className)} aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={cn('h-3.5 w-3.5', i >= n && 'opacity-25')} fill="currentColor" aria-hidden>
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8z" />
        </svg>
      ))}
    </span>
  )
}
