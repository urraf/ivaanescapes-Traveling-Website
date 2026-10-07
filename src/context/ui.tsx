import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light'

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
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  )
  const [chatOpen, setChatOpen] = useState(false)
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#070b24' : '#fbf7ee')
    try {
      localStorage.setItem('ie-theme', theme)
    } catch {
      /* storage unavailable */
    }
  }, [theme])

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
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
