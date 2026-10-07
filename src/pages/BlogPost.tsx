import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { BLOGS, getBlog } from '../data/blogs'
import { getPackage } from '../data/packages'
import { inr } from '../lib/utils'
import { Img, PageHero } from '../components/ui'
import { fmtDate } from './Blog'

export default function BlogPost() {
  const { slug = '' } = useParams()
  const b = getBlog(slug)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    if (b) document.title = `${b.title} — Ivaanescapes`
  }, [b])

  if (!b) return <Navigate to="/blog" replace />
  const pkg = b.related ? getPackage(b.related) : undefined
  const more = BLOGS.filter((x) => x.slug !== b.slug).slice(0, 2)

  return (
    <>
      <motion.div style={{ scaleX: scrollYProgress }} className="bg-gilded fixed inset-x-0 top-0 z-[55] h-1 origin-left" />
      <PageHero eyebrow={b.category} title={b.title} image={b.cover}>
        <p className="mt-6 flex items-center gap-3 text-sm text-ivory/70">
          <Clock className="h-4 w-4 text-gold-soft" /> {b.readMins} min read · {fmtDate(b.date)}
        </p>
      </PageHero>

      <article className="py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="max-w-2xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline">
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
            <div className="mt-8 space-y-8">
              {b.sections.map((s, k) => (
                <section key={k}>
                  {s.heading && <h2 className="font-display text-3xl font-semibold">{s.heading}</h2>}
                  {s.body.map((para, j) => (
                    <p key={j} className={k === 0 && j === 0 ? 'text-lg leading-relaxed text-ink first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-gold' : 'mt-3 leading-relaxed text-muted'}>
                      {para}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {pkg && (
              <Link to={`/packages/${pkg.slug}`} className="group block overflow-hidden rounded-[1.75rem] border border-gold/30 bg-surface">
                <Img id={pkg.cover} alt={pkg.title} w={700} sizes="320px" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="p-5">
                  <p className="eyebrow !text-[0.6rem]">Plan this trip</p>
                  <p className="mt-2 font-display text-2xl font-semibold leading-tight">{pkg.title}</p>
                  <p className="mt-1 text-sm text-muted">
                    {pkg.nights}N/{pkg.days}D · from {inr(pkg.priceFrom)}
                  </p>
                  <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-gold">
                    View package <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            )}
            <div className="rounded-[1.75rem] border border-line bg-surface p-5">
              <p className="eyebrow !text-[0.6rem]">Keep reading</p>
              <ul className="mt-4 space-y-4">
                {more.map((m) => (
                  <li key={m.slug}>
                    <Link to={`/blog/${m.slug}`} className="group flex gap-3">
                      <Img id={m.cover} alt="" w={200} sizes="80px" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                      <span className="text-sm font-semibold leading-snug transition-colors group-hover:text-gold">{m.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </article>
    </>
  )
}
