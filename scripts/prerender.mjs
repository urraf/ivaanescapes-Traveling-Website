// Runs after `vite build` + the SSR build (see package.json "build").
// Writes one static HTML file per page, plus sitemap.xml, robots.txt and 404.html.
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')
const { render, pages, SITE } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--seo:start-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html is missing the <!--seo:start--> block or the empty #root element')
}

const fileFor = (url) => (url === '/' ? 'index.html' : url === '/404' ? '404.html' : `${url.slice(1)}.html`)

// Framer Motion writes each animation's *starting* state inline (opacity:0, shifted, clipped).
// The browser re-renders the page from scratch when JS loads, so the static HTML can show the
// final state instead — crawlers and link previews then see every section fully visible.
const showFinalState = (html) =>
  html.replace(/ style="([^"]*)"/g, (_, css) => {
    const kept = css
      .split(';')
      .filter((d) => d && !/^\s*(opacity:\s*0|transform:|clip-path:)/.test(d))
      .join(';')
    return kept ? ` style="${kept}"` : ''
  })

async function writePage(url) {
  const rendered = await render(url)
  const head = rendered.head
  const html = showFinalState(rendered.html)
  const out = template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, () => head)
    // The hero photo preload only helps the home page; elsewhere it would waste bandwidth.
    .replace(/\s*<!--home-preload:start-->([\s\S]*?)<!--home-preload:end-->/, url === '/' ? '\n    $1' : '')
    .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`)
  const file = path.join(dist, fileFor(url))
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, out)
  return out
}

const list = pages()
const titles = new Map()
for (const p of list) {
  const out = await writePage(p.path)
  const title = out.match(/<title>([^<]*)<\/title>/)?.[1]
  if (titles.has(title)) throw new Error(`Duplicate <title> on ${p.path} and ${titles.get(title)}: ${title}`)
  titles.set(title, p.path)
}
await writePage('/404')

// sitemap.xml (with image extension)
const today = new Date().toISOString().slice(0, 10)
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const loc = (p) => `${SITE.url}${p === '/' ? '/' : p}`
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${list
  .map(
    (p) => `  <url>
    <loc>${esc(loc(p.path))}</loc>
    <lastmod>${p.lastmod ?? today}</lastmod>${(p.images ?? [])
      .map((i) => `\n    <image:image><image:loc>${esc(i)}</image:loc></image:image>`)
      .join('')}
  </url>`,
  )
  .join('\n')}
</urlset>
`
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap)

await fs.writeFile(
  path.join(dist, 'robots.txt'),
  `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE.url}/sitemap.xml
`,
)

await fs.rm(ssrDir, { recursive: true, force: true })
console.log(`✓ pre-rendered ${list.length} pages + 404, sitemap.xml (${list.length} URLs) and robots.txt`)
