import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { UIProvider } from './context/ui'
import { router } from './App'
import { session } from './lib/utils'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UIProvider>
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
    </UIProvider>
  </StrictMode>,
)

// A newer deploy replaced the code-split files this tab expects: reload once to pick up the new version.
window.addEventListener('vite:preloadError', (e) => {
  if (session.get('ie-reloaded')) return
  e.preventDefault()
  session.set('ie-reloaded', '1')
  window.location.reload()
})
// Clear the guard once the app has loaded successfully, so a future deploy can reload again.
window.addEventListener('load', () => setTimeout(() => session.set('ie-reloaded', null), 5000))

// Fade out the branded splash (defined in index.html) once fonts and the page have loaded.
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
const pageLoaded = new Promise((r) => (document.readyState === 'complete' ? r(null) : window.addEventListener('load', r, { once: true })))
Promise.all([wait(1200), Promise.race([Promise.all([document.fonts.ready, pageLoaded]), wait(3500)])]).then(() => {
  const s = document.getElementById('splash')
  if (!s) return
  s.classList.add('hide')
  setTimeout(() => s.remove(), 800)
})
