import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Quote } from 'lucide-react'
import { REVIEWS } from '../data/reviews'
import { PACKAGES } from '../data/packages'
import { waLink } from '../lib/utils'
import BoardingPassCTA from '../components/BoardingPassCTA'
import { PageHero, Reveal, Stars, WhatsAppIcon } from '../components/ui'

export default function Reviews() {
  const avg = REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length
  const linkFor = (trip: string) => PACKAGES.find((p) => p.title === trip)

  useEffect(() => {
    document.title = 'Traveller Reviews — Ivaanescapes'
  }, [])

  return (
    <>
      <PageHero eyebrow="Reviews" title="Stories from" accent="our travellers" text="Honeymooners, families, pilgrims and travel partners — here's what they say about travelling with Ivaanescapes." image="photo-1614505241550-0777412c47ec">
        <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-ivory/15 bg-navy/40 px-5 py-3 backdrop-blur">
          <span className="text-gilded font-display text-5xl font-bold">{avg.toFixed(1)}</span>
          <span>
            <Stars n={Math.round(avg)} />
            <span className="block text-xs text-ivory/70">Average rating · {REVIEWS.length} reviews</span>
          </span>
        </div>
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="container-x columns-1 gap-5 sm:columns-2 lg:columns-3">
          {REVIEWS.map((r, k) => {
            const p = linkFor(r.trip)
            return (
              <Reveal key={r.name} delay={(k % 3) * 0.08} className="mb-5 break-inside-avoid">
                <figure className="relative rounded-3xl border border-line bg-surface p-7">
                  <Quote className="absolute right-6 top-6 h-8 w-8 text-gold/20" />
                  <Stars n={r.rating} />
                  <blockquote className="mt-4 leading-relaxed text-ink/90">“{r.text}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span className="bg-gilded grid h-11 w-11 shrink-0 place-items-center rounded-full font-cinzel font-bold text-navy">{r.name[0]}</span>
                    <span className="min-w-0">
                      <span className="block font-bold">{r.name}</span>
                      <span className="block text-xs text-muted">{r.city}</span>
                      {p ? (
                        <Link to={`/packages/${p.slug}`} className="block truncate text-xs font-semibold text-gold hover:underline">
                          {r.trip} →
                        </Link>
                      ) : (
                        <span className="block text-xs font-semibold text-gold">{r.trip}</span>
                      )}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            )
          })}
        </div>
        <div className="container-x mt-10 text-center">
          <p className="font-display text-3xl font-semibold">Travelled with us?</p>
          <p className="mt-2 text-muted">We'd love to hear your story.</p>
          <a href={waLink("Hello Ivaanescapes! I'd like to share a review of my trip:")} target="_blank" rel="noopener" className="btn-wa mt-6">
            <WhatsAppIcon className="h-4 w-4" /> Share your experience
          </a>
        </div>
      </section>
      <BoardingPassCTA />
    </>
  )
}
