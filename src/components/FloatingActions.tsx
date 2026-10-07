import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone, Plus, Sparkles } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useUI } from '../context/ui'
import { cn, GENERAL_WA, telLink } from '../lib/utils'
import { WhatsAppIcon } from './ui'

/** Floating contact toggle: WhatsApp · Call · AI assistant. */
export default function FloatingActions() {
  const [open, setOpen] = useState(false)
  const [hint, setHint] = useState(false)
  const { openChat, chatOpen } = useUI()
  const { pathname } = useLocation()
  // Package pages have their own sticky booking bar on mobile, so lift the button above it.
  const lifted = pathname.startsWith('/packages/')

  useEffect(() => {
    const t = window.setTimeout(() => setHint(true), 4000)
    const t2 = window.setTimeout(() => setHint(false), 12000)
    return () => {
      window.clearTimeout(t)
      window.clearTimeout(t2)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const actions = [
    { label: 'Chat on WhatsApp', href: GENERAL_WA, icon: WhatsAppIcon, cls: 'bg-[#1fae55] text-white', external: true },
    { label: 'Call us now', href: telLink, icon: Phone, cls: 'bg-ivory text-navy' },
    { label: 'Ask AI Travel Assistant', onClick: () => openChat(), icon: Sparkles, cls: 'bg-gilded text-navy' },
  ]

  if (chatOpen) return null

  return (
    <div className={cn('fixed right-4 z-40 flex flex-col items-end gap-3 transition-[bottom] duration-300 sm:right-6', lifted ? 'bottom-24 lg:bottom-6' : 'bottom-5 sm:bottom-6')}>
      <AnimatePresence>
        {open &&
          actions.map((a, i) => {
            const Inner = (
              <>
                <span className="glass rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink shadow-lg">{a.label}</span>
                <span className={cn('grid h-12 w-12 place-items-center rounded-full shadow-xl', a.cls)}>
                  <a.icon className="h-5 w-5" />
                </span>
              </>
            )
            return (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: (actions.length - 1 - i) * 0.05 } }}
                exit={{ opacity: 0, y: 16, scale: 0.6, transition: { delay: i * 0.03 } }}
              >
                {a.href ? (
                  <a href={a.href} target={a.external ? '_blank' : undefined} rel="noopener" className="flex items-center gap-3">
                    {Inner}
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      setOpen(false)
                      a.onClick?.()
                    }}
                    className="flex items-center gap-3"
                  >
                    {Inner}
                  </button>
                )}
              </motion.div>
            )
          })}
      </AnimatePresence>

      <AnimatePresence>
        {hint && !open && !lifted && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => {
              setHint(false)
              openChat()
            }}
            className="glass absolute bottom-[4.25rem] right-0 hidden sm:block whitespace-nowrap rounded-2xl rounded-br-sm border border-line px-4 py-2.5 text-left text-xs font-medium text-ink shadow-xl"
          >
            ✨ Planning a trip? <span className="font-bold text-gold">Ask our AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          setOpen((v) => !v)
          setHint(false)
        }}
        aria-label={open ? 'Close contact options' : 'Open contact options'}
        aria-expanded={open}
        className="ping-soft bg-gilded relative isolate grid h-14 w-14 place-items-center rounded-full text-navy shadow-[0_12px_30px_-8px_rgba(212,175,55,0.8)]"
      >
        <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
          <Plus className="h-6 w-6" strokeWidth={2.5} />
        </motion.span>
      </button>
    </div>
  )
}
