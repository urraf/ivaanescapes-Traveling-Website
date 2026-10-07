import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'
import ChatAssistant from './components/ChatAssistant'
import Home from './pages/Home'

const Packages = lazy(() => import('./pages/Packages'))
const PackageDetail = lazy(() => import('./pages/PackageDetail'))
const Stays = lazy(() => import('./pages/Stays'))
const Partners = lazy(() => import('./pages/Partners'))
const Reviews = lazy(() => import('./pages/Reviews'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [pathname])
  return null
}

function Loader() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <img src="/logo-mark.webp" alt="" className="h-14 w-auto animate-pulse" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:slug" element={<PackageDetail />} />
            <Route path="/stays" element={<Stays />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
      <ChatAssistant />
    </>
  )
}
