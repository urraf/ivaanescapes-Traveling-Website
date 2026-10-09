// Central business details (from the Ivaan Escapes business card & flyers). Update here and the whole site follows.
export const SITE = {
  name: 'Ivaan Escapes',
  legalName: 'IVAAN ESCAPES',
  tagline: 'Escape the Ordinary',
  descriptor: 'B2B Travel & Hotel Solutions',
  promise: 'Trusted | Affordable | Hassle-Free Travel',
  // Primary line used by every "WhatsApp" / "Call" button
  phone: '+918586892228',
  phoneDisplay: '+91 85868 92228',
  whatsapp: '918586892228',
  team: [
    { name: 'Sahil', phone: '+918586892228', display: '+91 85868 92228' },
    { name: 'Riya', phone: '+918384053818', display: '+91 83840 53818' },
    { name: 'Chitranshi', phone: '+918800586668', display: '+91 88005 86668' },
    { name: 'Sejal', phone: '+918860996633', display: '+91 88609 96633' },
  ],
  email: 'sales@ivaanescapes.com',
  website: 'www.ivaanescapes.com',
  // Canonical origin used for SEO (canonical URLs, sitemap, structured data). No trailing slash.
  // Must match the primary domain set in Vercel (Settings → Domains), which redirects the other one here.
  url: 'https://www.ivaanescapes.com',
  // Paste the content value from Google Search Console's "HTML tag" verification (optional — DNS verification also works).
  googleVerification: '',
  gst: '07ATLPV2446B2ZL',
  address: {
    line1: 'N-60, Nirmal Puri',
    line2: 'Lajpat Nagar IV',
    city: 'New Delhi',
    pin: '110024',
    full: 'N-60, Nirmal Puri, Lajpat Nagar IV, New Delhi – 110024',
  },
  mapsQuery: 'N-60 Nirmal Puri Lajpat Nagar IV New Delhi 110024',
  hours: 'Available 24 × 7 on WhatsApp',
  // Leave empty to hide the icon in the footer
  socials: {
    instagram: '',
    facebook: '',
    youtube: '',
  },
} as const

export const waNumber = (phone: string) => phone.replace(/\D/g, '')
