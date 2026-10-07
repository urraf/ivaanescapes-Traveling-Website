import { SITE } from '../config/site'

export const img = (id: string, w = 1200, q = 70) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`

export const srcSet = (id: string, widths = [480, 800, 1200, 1800]) =>
  widths.map((w) => `${img(id, w)} ${w}w`).join(', ')

export const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')

export const waLink = (text: string) =>
  `https://api.whatsapp.com/send?phone=${SITE.whatsapp}&text=${encodeURIComponent(text)}`

export const telLink = `tel:${SITE.phone}`

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')

export const GENERAL_WA = waLink(
  "Hello Ivaanescapes! ✈️ I'm planning a trip and would love some help choosing a package.",
)
