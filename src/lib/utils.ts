import { SITE } from '../config/site'

export const img = (id: string, w = 1200, q = 70) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`

export const srcSet = (id: string, widths = [480, 800, 1200, 1800]) =>
  widths.map((w) => `${img(id, w)} ${w}w`).join(', ')

export const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')

export const waLink = (text: string) =>
  `https://api.whatsapp.com/send?phone=${SITE.whatsapp}&text=${encodeURIComponent(text)}`

export const telLink = `tel:${SITE.phone}`

/** sessionStorage that never throws (it can be blocked in private browsing). */
export const session = {
  get: (k: string) => {
    try {
      return sessionStorage.getItem(k)
    } catch {
      return null
    }
  },
  set: (k: string, v: string | null) => {
    try {
      if (v === null) sessionStorage.removeItem(k)
      else sessionStorage.setItem(k, v)
    } catch {
      /* storage unavailable */
    }
  },
}

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')

export const GENERAL_WA = waLink(
  "Hello Ivaanescapes! ✈️ I'm planning a trip and would love some help choosing a package.",
)

/** Today's date as YYYY-MM-DD in the visitor's own timezone (toISOString() would give the UTC date). */
export const todayLocal = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export const fmtDay = (iso: string) =>
  new Date(iso + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
