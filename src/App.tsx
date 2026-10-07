import type { ComponentType } from 'react'
import { createBrowserRouter, Link, Outlet, ScrollRestoration, useNavigation, useRouteError, type LazyRouteFunction, type RouteObject } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'
import ChatAssistant from './components/ChatAssistant'
import Home from './pages/Home'
import { session } from './lib/utils'

/** Thin gold bar shown while the next page's code is loading. */
function RouteProgress() {
  const loading = useNavigation().state !== 'idle'
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="bg-gilded fixed inset-x-0 top-0 z-[90] h-[3px] origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0.85, transition: { duration: 2.5, ease: 'easeOut' } }}
          exit={{ scaleX: 1, opacity: 0, transition: { duration: 0.35 } }}
        />
      )}
    </AnimatePresence>
  )
}

function Loader() {
  return (
    <div className="grid min-h-[100svh] place-items-center bg-bg" role="status" aria-label="Loading">
      <div className="relative grid h-24 w-24 place-items-center">
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-gold/15 border-t-gold-soft" />
        <img src="/logo-mark.webp" alt="" className="floaty h-10 w-auto" />
      </div>
    </div>
  )
}

const isChunkError = (e: unknown) =>
  e instanceof Error && /dynamically imported module|Importing a module script failed|error loading dynamically imported module|Failed to fetch/i.test(e.message)

/** Shown instead of a blank screen if a page fails. After a new deploy, old page files are gone — reload once to get the new ones. */
function RouteError() {
  const err = useRouteError()
  if (isChunkError(err) && !session.get('ie-reloaded')) {
    session.set('ie-reloaded', '1')
    window.location.reload()
    return <Loader />
  }
  return (
    <div className="grid min-h-[100svh] place-items-center bg-navy px-6 text-center text-ivory">
      <div>
        <img src="/logo-mark.webp" alt="" className="mx-auto h-14 w-auto" />
        <p className="mt-6 font-display text-4xl font-semibold">Something went off-route</p>
        <p className="mx-auto mt-3 max-w-sm text-ivory/70">Please refresh the page. If it keeps happening, message us on WhatsApp and we'll help you right away.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => window.location.reload()} className="btn-gold">
            Refresh
          </button>
          <Link to="/" reloadDocument className="btn-ghost !border-ivory/30 !text-ivory">
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}

function Layout() {
  return (
    <>
      {/* Scrolls to top on new pages and restores the exact position on back / forward. */}
      <ScrollRestoration />
      <RouteProgress />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
      <ChatAssistant />
    </>
  )
}

// Pages are code-split, but the router loads them *before* switching, so there is never a blank screen.
const page =
  (load: () => Promise<{ default: ComponentType }>): LazyRouteFunction<RouteObject> =>
  async () => ({ Component: (await load()).default })

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    HydrateFallback: Loader,
    ErrorBoundary: RouteError,
    children: [
      { index: true, Component: Home },
      { path: 'packages', lazy: page(() => import('./pages/Packages')) },
      { path: 'packages/:slug', lazy: page(() => import('./pages/PackageDetail')) },
      { path: 'stays', lazy: page(() => import('./pages/Stays')) },
      { path: 'partners', lazy: page(() => import('./pages/Partners')) },
      { path: 'reviews', lazy: page(() => import('./pages/Reviews')) },
      { path: 'blog', lazy: page(() => import('./pages/Blog')) },
      { path: 'blog/:slug', lazy: page(() => import('./pages/BlogPost')) },
      { path: 'contact', lazy: page(() => import('./pages/Contact')) },
      { path: '*', lazy: page(() => import('./pages/NotFound')) },
    ],
  },
])
