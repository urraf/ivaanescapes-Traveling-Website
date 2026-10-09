import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, Building2, CalendarDays, ChevronDown, ChevronRight, Compass, MapPin, Plane } from 'lucide-react'
import { getDestination } from '../data/destinations'
import { DESTINATION_CONTENT } from '../data/destinationContent'
import { destInfo, packagesFor } from '../data/packages'
import { HOTEL_REGIONS, hotelCount } from '../data/hotels'
import { BLOGS } from '../data/blogs'
import { inr, waLink } from '../lib/utils'
import { Seo, absUrl, breadcrumbs, faqPage, fullTitle } from '../lib/seo'
import PackageCard from '../components/PackageCard'
import BoardingPassCTA from '../components/BoardingPassCTA'
import { Img, PageHero, Reveal, SectionHeading, WhatsAppIcon } from '../components/ui'

export default function Destination() {
  const { slug = '' } = useParams()
  const d = getDestination(slug)
  const c = DESTINATION_CONTENT[slug]
  if (!d || !c) return <Navigate to="/destinations" replace />

  const pkgs = packagesFor(slug)
  const info = destInfo(slug)
  const price = inr(info.from)
  const faqs = c.faqs.map((f) => ({ q: f.q, a: f.a.replace('{price}', price) }))
  const region = c.hotelRegion ? HOTEL_REGIONS.find((r) => r.id === c.hotelRegion) : undefined
  const blogs = BLOGS.filter((b) => c.blogs?.includes(b.slug) || pkgs.some((p) => p.slug === b.related)).slice(0, 3)
  const path = `/destinations/${slug}`

  return (
    <>
      <Seo
        title={[`${c.title} from ${price}`, c.title].find((t) => fullTitle(t).includes('Ivaan Escapes')) ?? c.title}
        description={c.metaDescription}
        path={path}
        image={d.image}
        jsonLd={[
          breadcrumbs([
            { name: 'Destinations', path: '/destinations' },
            { name: d.name, path },
          ]),
          {
            '@type': 'TouristDestination',
            name: d.name,
            description: c.intro[0],
            url: absUrl(path),
            image: `https://images.unsplash.com/${d.image}?auto=format&fit=crop&w=1200&q=75`,
            containedInPlace: { '@type': 'Country', name: 'India' },
            includesAttraction: c.places.map((p) => ({ '@type': 'TouristAttraction', name: p.name, description: p.text })),
          },
          {
            '@type': 'ItemList',
            name: `${d.name} tour packages`,
            itemListElement: pkgs.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: absUrl(`/packages/${p.slug}`), name: p.title })),
          },
          faqPage(faqs),
        ]}
      />

      <PageHero eyebrow={`${d.location} · ${d.tagline}`} title={c.heading} text={c.intro[0]} image={d.image}>
        <nav className="mt-6 flex flex-wrap items-center gap-1.5 text-xs text-ivory/70" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-gold-soft">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/destinations" className="hover:text-gold-soft">
            Destinations
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ivory">{d.name}</span>
        </nav>
      </PageHero>

      {/* Quick facts */}
      <div className="border-b border-line bg-bg-2">
        <div className="container-x grid grid-cols-2 gap-x-4 gap-y-5 py-6 lg:grid-cols-4">
          {[
            { icon: Compass, label: 'Packages', value: `${pkgs.length} ${pkgs.length === 1 ? 'journey' : 'journeys'}` },
            { icon: MapPin, label: 'Starting from', value: `${price} / person` },
            { icon: CalendarDays, label: 'Best time', value: d.bestTime },
            region ? { icon: Building2, label: 'Hotel deals', value: `${hotelCount(region)} hotels` } : { icon: Plane, label: 'Region', value: d.location },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                <f.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[0.68rem] font-bold uppercase tracking-[0.15em] text-muted">{f.label}</span>
                <span className="block text-sm font-semibold leading-snug">{f.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Intro + packages */}
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
            {c.intro.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-12">
            <SectionHeading eyebrow={`${d.name} packages`} title={`${d.name} holiday`} accent={pkgs.length === 1 ? 'package' : 'packages'} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pkgs.map((p, k) => (
                <PackageCard key={p.slug} p={p} index={k} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Places to visit */}
      <section className="bg-bg-2 py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Places to visit" title={`Top places in ${d.name}`} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.places.map((p, k) => (
              <Reveal key={p.name} delay={k * 0.06} className="rounded-3xl border border-line bg-surface p-6">
                <p className="font-cinzel text-2xl font-bold text-gold">0{k + 1}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-tight">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-line bg-surface p-6">
              <h3 className="flex items-center gap-2 font-display text-2xl font-semibold">
                <CalendarDays className="h-5 w-5 text-gold" /> Best time to visit {d.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d.bestTime}. {faqs[0]?.a}</p>
            </div>
            <div className="rounded-3xl border border-line bg-surface p-6">
              <h3 className="flex items-center gap-2 font-display text-2xl font-semibold">
                <Plane className="h-5 w-5 text-gold" /> How to reach {d.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.howToReach}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel deals for this region */}
      {region && (
        <section className="py-16 sm:py-24">
          <div className="container-x">
            <div className="grain relative isolate overflow-hidden rounded-[2rem] bg-navy p-7 text-ivory sm:p-10">
              <Img id={region.image} alt={`${region.name} hotels`} w={1600} sizes="100vw" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
              <p className="eyebrow !text-gold-soft">B2B hotel deals</p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight">
                {hotelCount(region)} {region.name} hotels at exclusive rates
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ivory/80">
                {region.groups
                  .flatMap((g) => g.hotels)
                  .slice(0, 10)
                  .join(' · ')}{' '}
                and more.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={`/hotels/${region.id}`} className="btn-gold">
                  See all {region.name} hotels <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={waLink(`Hello Ivaan Escapes! Please share your best ${region.name} hotel rates.`)} target="_blank" rel="noopener" className="btn-wa">
                  <WhatsAppIcon className="h-4 w-4" /> Get rates
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className={region ? 'pb-16 sm:pb-24' : 'py-16 sm:py-24'}>
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQs" title={`${d.name} trip`} accent="questions" text="Can't find your answer? Message our travel experts on WhatsApp — we reply within minutes." />
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0} className="group rounded-2xl border border-line bg-surface open:border-gold/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base">{f.q}</h3>
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180 group-open:text-gold" />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related guides */}
      {blogs.length > 0 && (
        <section className="bg-bg-2 py-16 sm:py-20">
          <div className="container-x">
            <SectionHeading eyebrow="Travel guides" title={`Plan your ${d.name}`} accent="trip" />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {blogs.map((b) => (
                <Link key={b.slug} to={`/blog/${b.slug}`} className="group block">
                  <div className="overflow-hidden rounded-[1.75rem]">
                    <Img id={b.cover} alt={b.title} w={800} sizes="(max-width:768px) 100vw, 33vw" className="aspect-[16/11] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold leading-snug transition-colors group-hover:text-gold">{b.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="pt-16 sm:pt-24">
        <BoardingPassCTA />
      </div>
    </>
  )
}
