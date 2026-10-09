import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

// The theme lives on <html data-theme> (set before first paint by index.html). Reading it through
// useSyncExternalStore lets pre-rendered pages hydrate as "dark" and then switch without a mismatch.
const themeListeners = new Set<() => void>()
const readTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
const subscribeTheme = (fn: () => void) => {
  themeListeners.add(fn)
  return () => themeListeners.delete(fn)
}
function applyTheme(t: Theme) {
  document.documentElement.dataset.theme = t
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'dark' ? '#070b24' : '#fbf7ee')
  try {
    localStorage.setItem('ie-theme', t)
  } catch {
    /* storage unavailable */
  }
  themeListeners.forEach((fn) => fn())
}

type UI = {
  theme: Theme
  toggleTheme: () => void
  chatOpen: boolean
  setChatOpen: (v: boolean) => void
  /** Open the AI assistant, optionally sending a prompt straight away. */
  openChat: (prompt?: string) => void
  pendingPrompt: string | null
  clearPendingPrompt: () => void
}

const Ctx = createContext<UI | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => 'dark' as Theme)
  const [chatOpen, setChatOpen] = useState(false)
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null)

  // Keep the browser chrome colour in sync with a saved light theme on first load.
  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', readTheme() === 'dark' ? '#070b24' : '#fbf7ee')
  }, [])

  const toggleTheme = useCallback(() => applyTheme(readTheme() === 'dark' ? 'light' : 'dark'), [])
  const openChat = useCallback((prompt?: string) => {
    if (prompt) setPendingPrompt(prompt)
    setChatOpen(true)
  }, [])
  const clearPendingPrompt = useCallback(() => setPendingPrompt(null), [])

  return (
    <Ctx.Provider value={{ theme, toggleTheme, chatOpen, setChatOpen, openChat, pendingPrompt, clearPendingPrompt }}>
      {children}
    </Ctx.Provider>
  )
}

export function useUI() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useUI must be used inside UIProvider')
  return v
}
