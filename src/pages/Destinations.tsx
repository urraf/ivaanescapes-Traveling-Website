import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { DESTINATIONS, GROUPS, type Group } from '../data/destinations'
import { DESTINATION_CONTENT } from '../data/destinationContent'
import { destInfo } from '../data/packages'
import { absUrl, breadcrumbs, Seo } from '../lib/seo'
import { inr } from '../lib/utils'
import BoardingPassCTA from '../components/BoardingPassCTA'
import { Img, PageHero, Reveal, SectionHeading } from '../components/ui'

export default function Destinations() {
  return (
    <>
      <Seo
        title="India Tour Destinations — Kashmir to Kerala"
        description="Explore India tour packages by destination: Kashmir, Leh Ladakh, Himachal, Uttarakhand, Goa, Kerala, Rajasthan and Maharashtra — with prices, best time to visit and hotel deals."
        path="/destinations"
        image="photo-1635255506105-b74adbd94026"
        jsonLd={[
          breadcrumbs([{ name: 'Destinations', path: '/destinations' }]),
          {
            '@type': 'ItemList',
            name: 'India tour destinations',
            itemListElement: DESTINATIONS.map((d, i) => ({ '@type': 'ListItem', position: i + 1, url: absUrl(`/destinations/${d.slug}`), name: d.name })),
          },
        ]}
      />
      <PageHero
        eyebrow="Destinations"
        title="India tour packages"
        accent="by destination"
        text="From the Himalayas to the backwaters — pick a place and see its packages, best time to visit, top sights and hotel deals."
        image="photo-1635255506105-b74adbd94026"
      />

      {(Object.keys(GROUPS) as Group[]).map((g, gi) => (
        <section key={g} className={gi % 2 ? 'bg-bg-2 py-16 sm:py-24' : 'py-16 sm:py-24'}>
          <div className="container-x">
            <SectionHeading eyebrow={GROUPS[g].blurb} title={GROUPS[g].label} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {DESTINATIONS.filter((d) => d.group === g).map((d, k) => {
                const info = destInfo(d.slug)
                return (
                  <Reveal key={d.slug} delay={k * 0.06}>
                    <Link to={`/destinations/${d.slug}`} className="group block overflow-hidden rounded-[1.75rem] border border-line bg-surface">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Img id={d.image} alt={`${d.name} — ${d.tagline}`} w={700} sizes="(max-width:640px) 100vw, 25vw" className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                        <p className="absolute bottom-3 left-4 font-script text-2xl text-gold-soft">{d.tagline}</p>
                      </div>
                      <div className="p-5">
                        <h2 className="font-display text-2xl font-semibold">{DESTINATION_CONTENT[d.slug]?.heading ?? d.name}</h2>
                        <p className="mt-1 text-sm text-muted">
                          {info.label} · from {inr(info.from)} · Best {d.bestTime.split(' · ')[0]}
                        </p>
                        <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-gold">
                          Explore {d.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      ))}
      <div className="pt-16">
        <BoardingPassCTA />
      </div>
    </>
  )
}
