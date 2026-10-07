import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { BLOGS } from '../data/blogs'
import { Img, PageHero, Reveal } from '../components/ui'

export const fmtDate = (d: string) => new Date(d + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export default function Blog() {
  const [lead, ...rest] = BLOGS

  useEffect(() => {
    document.title = 'Travel Journal — Ivaanescapes'
  }, [])

  return (
    <>
      <PageHero eyebrow="Travel Journal" title="Guides, tips &" accent="wanderlust" text="Practical advice from our travel experts to help you plan smarter and travel better." image="photo-1652514284048-a297d43ab05d" />

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <Link to={`/blog/${lead.slug}`} className="group grid overflow-hidden rounded-[2rem] border border-line bg-surface md:grid-cols-2">
              <div className="overflow-hidden">
                <Img id={lead.cover} alt={lead.title} w={1200} sizes="(max-width:768px) 100vw, 50vw" className="aspect-[16/11] h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                  Featured · {lead.category}
                </p>
                <h2 className="mt-3 font-display text-4xl font-semibold leading-tight transition-colors group-hover:text-gold">{lead.title}</h2>
                <p className="mt-4 text-muted">{lead.excerpt}</p>
                <p className="mt-6 flex items-center gap-2 text-sm font-semibold">
                  Read the guide <ArrowUpRight className="h-4 w-4 text-gold transition-transform group-hover:rotate-45" />
                </p>
              </div>
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((b, k) => (
              <Reveal key={b.slug} delay={(k % 3) * 0.08}>
                <Link to={`/blog/${b.slug}`} className="group block">
                  <div className="overflow-hidden rounded-[1.75rem]">
                    <Img id={b.cover} alt={b.title} w={800} sizes="(max-width:640px) 100vw, 33vw" className="aspect-[16/11] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-gold">
                    {b.category} · {b.readMins} min read
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-snug transition-colors group-hover:text-gold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted">{b.excerpt}</p>
                  <p className="mt-3 text-xs text-muted">{fmtDate(b.date)}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
