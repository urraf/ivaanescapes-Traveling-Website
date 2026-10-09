// Build-time pre-renderer entry. `npm run build` renders every page to static HTML (with its own
// title, description, canonical URL, Open Graph tags and JSON-LD) so search engines and link
// previews see full content without running JavaScript. See scripts/prerender.mjs.
import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { routes } from './App'
import { UIProvider } from './context/ui'
import { SeoContext, renderHead, type SeoMeta } from './lib/seo'
import { SITE } from './config/site'
import { PACKAGES } from './data/packages'
import { DESTINATIONS } from './data/destinations'
import { HOTEL_REGIONS } from './data/hotels'
import { BLOGS } from './data/blogs'

export async function render(url: string) {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(`${SITE.url}${url}`))
  if (context instanceof Response) throw new Error(`${url} redirected — not pre-renderable`)
  const router = createStaticRouter(handler.dataRoutes, context)
  const seo: { current: SeoMeta | null } = { current: null }
  const html = renderToString(
    <SeoContext.Provider value={seo}>
      <UIProvider>
        <MotionConfig reducedMotion="user">
          <StaticRouterProvider router={router} context={context} hydrate={false} />
        </MotionConfig>
      </UIProvider>
    </SeoContext.Provider>,
  )
  if (!seo.current) throw new Error(`${url} has no <Seo> — every page must declare its SEO`)
  return { html, head: renderHead(seo.current), seo: seo.current }
}

/** Every indexable page, with the image(s) to list in the image sitemap and an optional last-modified date. */
export function pages(): { path: string; images?: string[]; lastmod?: string }[] {
  const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=75`
  return [
    { path: '/' },
    { path: '/packages' },
    ...PACKAGES.map((p) => ({ path: `/packages/${p.slug}`, images: [p.cover, ...p.gallery].map(u) })),
    { path: '/destinations' },
    ...DESTINATIONS.map((d) => ({ path: `/destinations/${d.slug}`, images: [u(d.image)] })),
    { path: '/hotels' },
    ...HOTEL_REGIONS.map((r) => ({ path: `/hotels/${r.id}`, images: [u(r.image)] })),
    { path: '/hotels/pan-india' },
    { path: '/partners' },
    { path: '/reviews' },
    { path: '/blog' },
    ...BLOGS.map((b) => ({ path: `/blog/${b.slug}`, images: [u(b.cover)], lastmod: b.date })),
    { path: '/contact' },
  ]
}

export { SITE }
