import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GENERAL_WA } from '../lib/utils'
import { Reveal, WhatsAppIcon } from './ui'

/* ---------------- Final CTA (boarding pass) ---------------- */
export default function BoardingPassCTA() {
  return (
    <section className="pb-24 sm:pb-32">
      <div className="container-x">
        <Reveal>
          <div className="relative mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-gold/30 bg-surface shadow-[var(--shadow)] md:grid-cols-[1fr_auto_300px]">
            <div className="p-6 sm:p-10">
              <p className="eyebrow">Boarding Pass · Ivaan Escapes Air</p>
              <div className="mt-6 flex items-center gap-4 sm:gap-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">From</p>
                  <p className="font-cinzel text-3xl font-bold min-[380px]:text-4xl sm:text-5xl">YOU</p>
                  <p className="text-xs text-muted">Your city</p>
                </div>
                <div className="relative flex-1">
                  <div className="h-px w-full border-t-2 border-dashed border-gold/40" />
                  <motion.div initial={{ left: '0%' }} whileInView={{ left: '85%' }} viewport={{ once: true }} transition={{ duration: 2.2, ease: 'easeInOut' }} className="absolute -top-3 text-gold">
                    <svg viewBox="-16 -10 36 20" className="h-6 w-8" fill="currentColor" aria-hidden>
                      <path d="M0 -9 L4 -2 L18 0 L4 2 L0 9 L-2 2 L-10 2 L-13 6 L-15 6 L-13 0 L-15 -6 L-13 -6 L-10 -2 L-2 -2 Z" />
                    </svg>
                  </motion.div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted">To</p>
                  <p className="text-gilded font-cinzel text-3xl font-bold min-[380px]:text-4xl sm:text-5xl">ESC</p>
                  <p className="text-xs text-muted">Extraordinary</p>
                </div>
              </div>
              <h2 className="mt-8 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Your next escape is <em className="text-gilded">one message away.</em>
              </h2>
            </div>
            <div className="relative hidden w-px border-l-2 border-dashed border-line md:block">
              <span className="absolute -top-4 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-bg" />
              <span className="absolute -bottom-4 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-bg" />
            </div>
            <div className="flex flex-col justify-center gap-3 border-t-2 border-dashed border-line bg-bg-2 p-8 md:border-t-0">
              <p className="text-sm text-muted">Talk to a travel expert now — we usually reply within minutes.</p>
              <a href={GENERAL_WA} target="_blank" rel="noopener" className="btn-wa">
                <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <Link to="/packages" className="btn-ghost">
                Browse packages
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
