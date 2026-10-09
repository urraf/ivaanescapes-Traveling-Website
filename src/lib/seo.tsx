import { createContext, useContext, useEffect } from 'react'
import { SITE } from '../config/site'

/** Everything a page declares about itself for search engines and link previews. */
export type SeoMeta = {
  /** Page title without the brand suffix — " | Ivaan Escapes" is added automatically. */
  title: string
  /** Shown in Google results. Aim for 120–155 characters. */
  description: string
  /** Canonical path, e.g. "/packages/goa-beach-escape". */
  path: string
  /** Unsplash photo id or absolute URL for the share preview (1200×630). */
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  publishedTime?: string
  /** Page-specific schema.org nodes (merged with the site-wide organisation + website). */
  jsonLd?: Record<string, unknown>[]
}

/** During pre-rendering the build collects the page's meta here (effects don't run on the server). */
export const SeoContext = createContext<{ current: SeoMeta | null } | null>(null)

export const absUrl = (path: string) => `${SITE.url}${path === '/' ? '/' : path}`
export const ogImage = (image?: string) =>
  !image ? `${SITE.url}/og-image.jpg` : image.startsWith('http') ? image : `https://images.unsplash.com/${image}?auto=format&fit=crop&w=1200&h=630&q=75`

// Google shows roughly 60 characters of a title: add the brand only when it fits, so the keyword is never cut off.
export const fullTitle = (t: string) => (t.includes(SITE.name) || `${t} | ${SITE.name}`.length > 65 ? t : `${t} | ${SITE.name}`)

/* ---------------- schema.org building blocks ---------------- */

export const ORG_ID = `${SITE.url}/#organization`
const WEBSITE_ID = `${SITE.url}/#website`

export const organization = () => ({
  '@type': 'TravelAgency',
  '@id': ORG_ID,
  name: SITE.name,
  alternateName: ['Ivaan Escapes B2B', 'IvaanEscapes'],
  slogan: SITE.tagline,
  description: `${SITE.descriptor} — a trusted destination management company offering India holiday packages and exclusive B2B hotel deals for travel agents, corporates and travellers.`,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/icon-512.png`,
  image: `${SITE.url}/og-image.jpg`,
  email: SITE.email,
  telephone: SITE.phone,
  taxID: SITE.gst,
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
    addressLocality: SITE.address.city,
    addressRegion: 'Delhi',
    postalCode: SITE.address.pin,
    addressCountry: 'IN',
  },
  areaServed: { '@type': 'Country', name: 'India' },
  contactPoint: SITE.team.map((t) => ({
    '@type': 'ContactPoint',
    name: t.name,
    telephone: t.phone,
    contactType: 'sales',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  })),
  sameAs: Object.values(SITE.socials).filter(Boolean),
})

const website = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE.url}/`,
  name: SITE.name,
  inLanguage: 'en-IN',
  publisher: { '@id': ORG_ID },
})

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: absUrl(it.path),
  })),
})

export const faqPage = (faqs: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})

/* ---------------- head tags ---------------- */

type Tag = { tag: 'meta' | 'link' | 'script'; attrs: Record<string, string>; text?: string }

const clip = (s: string, n = 160) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…')

function headTags(m: SeoMeta): { title: string; tags: Tag[] } {
  const title = fullTitle(m.title)
  const description = clip(m.description)
  const url = absUrl(m.path)
  const image = ogImage(m.image)
  const tags: Tag[] = [
    { tag: 'meta', attrs: { name: 'description', content: description } },
    { tag: 'link', attrs: { rel: 'canonical', href: url } },
    {
      tag: 'meta',
      attrs: { name: 'robots', content: m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    },
    { tag: 'meta', attrs: { property: 'og:type', content: m.type ?? 'website' } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: SITE.name } },
    { tag: 'meta', attrs: { property: 'og:locale', content: 'en_IN' } },
    { tag: 'meta', attrs: { property: 'og:title', content: title } },
    { tag: 'meta', attrs: { property: 'og:description', content: description } },
    { tag: 'meta', attrs: { property: 'og:url', content: url } },
    { tag: 'meta', attrs: { property: 'og:image', content: image } },
    { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
    { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
    { tag: 'meta', attrs: { property: 'og:image:alt', content: m.title } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
  ]
  if (m.publishedTime) tags.push({ tag: 'meta', attrs: { property: 'article:published_time', content: m.publishedTime } })
  if (SITE.googleVerification) tags.push({ tag: 'meta', attrs: { name: 'google-site-verification', content: SITE.googleVerification } })
  const graph = { '@context': 'https://schema.org', '@graph': [organization(), website(), ...(m.jsonLd ?? [])] }
  // "<" escaped so the JSON can never close the script tag early.
  tags.push({ tag: 'script', attrs: { type: 'application/ld+json' }, text: JSON.stringify(graph).replace(/</g, '\\u003c') })
  return { title, tags }
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Server: the <head> markup for a page (used by the build-time pre-renderer). */
export function renderHead(m: SeoMeta): string {
  const { title, tags } = headTags(m)
  const out = [`<title>${esc(title)}</title>`]
  for (const t of tags) {
    const attrs = Object.entries(t.attrs)
      .map(([k, v]) => `${k}="${esc(v)}"`)
      .join(' ')
    out.push(t.tag === 'script' ? `<script data-seo ${attrs}>${t.text}</script>` : t.tag === 'link' ? `<link data-seo ${attrs} />` : `<meta data-seo ${attrs} />`)
  }
  return out.join('\n    ')
}

/** Browser: swap the head tags when the visitor navigates between pages. */
function applyHead(m: SeoMeta) {
  const { title, tags } = headTags(m)
  document.title = title
  document.head.querySelectorAll('[data-seo]').forEach((n) => n.remove())
  for (const t of tags) {
    const el = document.createElement(t.tag)
    el.setAttribute('data-seo', '')
    for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v)
    if (t.text) el.textContent = t.text
    document.head.appendChild(el)
  }
}

/** Declare a page's SEO. Renders nothing. */
export function Seo(meta: SeoMeta) {
  const collector = useContext(SeoContext)
  if (collector) collector.current = meta
  const key = JSON.stringify(meta)
  useEffect(() => {
    applyHead(meta)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return null
}
