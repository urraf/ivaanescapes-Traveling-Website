import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUI } from '../context/ui'
import { DESTINATIONS } from '../data/destinations'
import { PACKAGES } from '../data/packages'
import { GENERAL_WA, inr } from '../lib/utils'
import { useScrollLock } from '../lib/hooks'
import { WhatsAppIcon } from './ui'

type Msg = { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  'Best honeymoon package?',
  'Mountain trip under ₹25,000',
  'Do you have 5-star hotels in Goa?',
  'I am a travel agent — how do I partner?',
]

const WELCOME: Msg = {
  role: 'assistant',
  content:
    "Namaste! I'm **Ivaan**, your AI travel concierge ✨\n\nTell me where you dream of going, your budget or travel dates — I'll suggest the perfect escape.",
}

/** Local answer used when the AI service is unreachable, so visitors are never left hanging. */
function offlineReply(q: string): string {
  const t = q.toLowerCase()
  const matches = DESTINATIONS.filter((d) => t.includes(d.slug) || t.includes(d.name.toLowerCase().split(' ')[0]))
  let picks = PACKAGES.filter((p) => matches.some((m) => m.slug === p.destination))
  if (!picks.length && /honeymoon|couple/.test(t)) picks = PACKAGES.filter((p) => p.themes.includes('Honeymoon')).slice(0, 4)
  if (!picks.length && /agent|partner|b2b|commission/.test(t))
    return 'We would love to work with you! See our partner benefits at [Partner With Us](/partners), or message us on WhatsApp for net rates.'
  if (!picks.length && /hotel|resort|stay|room|taj|marriott|hilton|hyatt|lemon tree|itc|oberoi/.test(t))
    return 'We have exclusive B2B rates on 290+ hotels in Goa, Rajasthan and Maharashtra, plus chain hotels across India. Browse them at [B2B Hotel Deals](/hotels) and tap any hotel to get its best rate on WhatsApp.'
  if (!picks.length) picks = PACKAGES.filter((p) => p.popular).slice(0, 4)
  const list = picks.map((p) => `- [${p.title}](/packages/${p.slug}) — ${p.nights}N/${p.days}D from ${inr(p.priceFrom)}`).join('\n')
  return `Here are some journeys you might love:\n${list}\n\nFor a personalised quote, tap **WhatsApp** above and our experts will reply right away.`
}

/** Minimal, safe markdown: **bold**, *italic*, [links](/path), headings, bullets and numbered lists. */
function renderInline(text: string, onNav: () => void): ReactNode[] {
  const out: ReactNode[] = []
  const re = /\*\*(.+?)\*\*|\*(?!\s)([^*]+?)\*|\[([^\]]+)\]\(([^)\s]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const [label, href] = [m[3], m[4]]
    if (m[1]) out.push(<strong key={m.index}>{m[1]}</strong>)
    else if (m[2]) out.push(<em key={m.index}>{m[2]}</em>)
    else if (href.startsWith('/'))
      out.push(
        <Link key={m.index} to={href} onClick={onNav} className="font-semibold text-gold underline decoration-gold/40 underline-offset-2">
          {label}
        </Link>,
      )
    else if (/^https?:\/\//.test(href))
      out.push(
        <a key={m.index} href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold underline">
          {label}
        </a>,
      )
    else out.push(label)
    last = re.lastIndex
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function Markdown({ text, onNav }: { text: string; onNav: () => void }) {
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, i) => {
        const bullet = /^\s*[-*•]\s+/.test(line)
        const num = line.match(/^\s*(\d+)[.)]\s+/)?.[1]
        const heading = line.match(/^\s*#{1,6}\s+(.*)/)?.[1]
        if (!line.trim()) return <div key={i} className="h-2" />
        if (heading) return <p key={i} className="mt-1 font-bold text-ink">{renderInline(heading, onNav)}</p>
        if (bullet || num)
          return (
            <div key={i} className="flex gap-2 py-0.5">
              <span className="shrink-0 font-semibold text-gold">{num ? `${num}.` : '◆'}</span>
              <span className="min-w-0">{renderInline(line.replace(/^\s*([-*•]|\d+[.)])\s+/, ''), onNav)}</span>
            </div>
          )
        return <Fragment key={i}>{<p>{renderInline(line, onNav)}</p>}</Fragment>
      })}
    </>
  )
}

export default function ChatAssistant() {
  const { chatOpen, setChatOpen, pendingPrompt, clearPendingPrompt } = useUI()
  const [messages, setMessages] = useState<Msg[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [narrow, setNarrow] = useState(() => window.matchMedia('(max-width: 639px)').matches)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const onChange = () => setNarrow(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // On phones the assistant is full-screen, so stop the page behind it from scrolling.
  useScrollLock(chatOpen && narrow)

  // Keep the newest message in view — including when the chat is reopened.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading, chatOpen])

  useEffect(() => {
    if (chatOpen && !narrow) inputRef.current?.focus()
  }, [chatOpen, narrow])

  // Send a prompt handed over from elsewhere (e.g. "Ask our AI" on a package) once any reply in flight is done.
  useEffect(() => {
    if (chatOpen && pendingPrompt && !loading) {
      send(pendingPrompt)
      clearPendingPrompt()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatOpen, pendingPrompt, loading])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setChatOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setChatOpen])

  async function send(text: string) {
    const q = text.trim()
    if (!q || loading) return
    const next = [...messages, { role: 'user' as const, content: q }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((m) => m !== WELCOME) }),
        signal: typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(25000) : undefined,
      })
      const data = (await res.json().catch(() => ({}))) as { reply?: string }
      if (!res.ok || !data.reply) throw new Error('no reply')
      setMessages((m) => [...m, { role: 'assistant', content: data.reply! }])
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: offlineReply(q) }])
    } finally {
      setLoading(false)
    }
  }

  const closeOnMobile = () => narrow && setChatOpen(false)

  return (
    <AnimatePresence>
      {chatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          role="dialog"
          aria-label="AI travel assistant"
          className="fixed inset-0 z-[70] flex flex-col overflow-hidden bg-bg sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(640px,calc(100dvh-3rem))] sm:w-[400px] sm:rounded-[1.75rem] sm:border sm:border-line sm:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
        >
          {/* Header */}
          <div className="grain relative flex items-center gap-3 bg-navy px-4 py-4 text-ivory">
            <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-[#0c1236]">
              <img src="/logo-mark.webp" alt="" className="h-6 w-auto" />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-navy bg-emerald-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl font-semibold leading-none">Ivaan</p>
              <p className="mt-1 flex items-center gap-1 text-[0.7rem] text-ivory/70">
                <Sparkles className="h-3 w-3 text-gold-soft" /> AI Travel Concierge · replies instantly
              </p>
            </div>
            <a href={GENERAL_WA} target="_blank" rel="noopener" aria-label="Continue on WhatsApp" className="grid h-9 w-9 place-items-center rounded-full bg-[#1fae55] text-white">
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <button onClick={() => setChatOpen(false)} aria-label="Close assistant" className="grid h-9 w-9 place-items-center rounded-full border border-ivory/20 hover:border-gold">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-5" aria-live="polite">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
              >
                <div
                  className={
                    m.role === 'user'
                      ? 'bg-gilded max-w-[85%] break-words rounded-2xl rounded-br-md px-4 py-2.5 text-sm font-medium text-navy [overflow-wrap:anywhere]'
                      : 'max-w-[90%] break-words rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-ink [overflow-wrap:anywhere]'
                  }
                >
                  {m.role === 'user' ? m.content : <Markdown text={m.content} onNav={closeOnMobile} />}
                </div>
              </motion.div>
            ))}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border border-gold/40 px-3 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold hover:text-navy">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex gap-1.5 rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3.5 w-fit">
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} className="h-2 w-2 rounded-full bg-gold" animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="border-t border-line bg-bg-2 p-3"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-line bg-surface p-1.5 pl-4 focus-within:border-gold">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send(input)
                  }
                }}
                rows={1}
                maxLength={600}
                placeholder="Ask about destinations, budget, dates…"
                className="max-h-28 min-h-[2.5rem] flex-1 resize-none bg-transparent py-2 text-[16px] text-ink outline-none placeholder:text-muted sm:text-sm"
              />
              <button type="submit" disabled={!input.trim() || loading} aria-label="Send" className="bg-gilded grid h-10 w-10 shrink-0 place-items-center rounded-xl text-navy transition-opacity disabled:opacity-40">
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-center text-[0.65rem] text-muted">AI can make mistakes · Final quotes are confirmed on WhatsApp</p>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
