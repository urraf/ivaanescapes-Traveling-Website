import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { UIProvider } from './context/ui'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UIProvider>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </UIProvider>
    </BrowserRouter>
  </StrictMode>,
)
