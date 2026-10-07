import { useEffect } from 'react'

// Several overlays (mobile menu, chat, booking sheet, modals) can lock page scroll at once.
// Count the active locks so one closing doesn't unlock the page while another is still open.
let locks = 0

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    locks++
    document.body.style.overflow = 'hidden'
    return () => {
      locks--
      if (locks === 0) document.body.style.overflow = ''
    }
  }, [active])
}

/** Run `fn` once the viewport is at least `minWidth` px wide (e.g. to close a mobile-only overlay). */
export function useMinWidth(minWidth: number, fn: () => void) {
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`)
    const onChange = () => mq.matches && fn()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [minWidth, fn])
}
