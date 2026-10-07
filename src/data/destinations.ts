export type Region = 'india' | 'international'
export type Group = 'mountains' | 'coast' | 'islands'

export type Destination = {
  slug: string
  name: string
  location: string
  region: Region
  group: Group
  tagline: string
  coords: string
  bestTime: string
  image: string
}

export const GROUPS: Record<Group, { label: string; blurb: string }> = {
  mountains: { label: 'Himalayan Escapes', blurb: 'Snow, monasteries & high passes' },
  coast: { label: 'Coast, Culture & Green', blurb: 'Backwaters, beaches & palaces' },
  islands: { label: 'Islands & International', blurb: 'Turquoise lagoons & temples' },
}

export const DESTINATIONS: Destination[] = [
  {
    slug: 'kashmir',
    name: 'Kashmir',
    location: 'Jammu & Kashmir, India',
    region: 'india',
    group: 'mountains',
    tagline: 'Paradise on Earth',
    coords: '34.08° N, 74.79° E',
    bestTime: 'Mar – Oct · Dec – Feb for snow',
    image: 'photo-1614591276564-7b3e69347a48',
  },
  {
    slug: 'ladakh',
    name: 'Ladakh',
    location: 'Leh, Ladakh, India',
    region: 'india',
    group: 'mountains',
    tagline: 'Land of High Passes',
    coords: '34.15° N, 77.57° E',
    bestTime: 'May – Sep',
    image: 'photo-1635255506105-b74adbd94026',
  },
  {
    slug: 'manali',
    name: 'Manali',
    location: 'Himachal Pradesh, India',
    region: 'india',
    group: 'mountains',
    tagline: 'Valley of the Gods',
    coords: '32.24° N, 77.18° E',
    bestTime: 'Oct – Jun',
    image: 'photo-1647184544240-49cd48de3a58',
  },
  {
    slug: 'spiti',
    name: 'Spiti Valley',
    location: 'Himachal Pradesh, India',
    region: 'india',
    group: 'mountains',
    tagline: 'The Middle Land',
    coords: '32.22° N, 78.07° E',
    bestTime: 'Jun – Sep',
    image: 'photo-1652514284048-a297d43ab05d',
  },
  {
    slug: 'kedarnath',
    name: 'Kedarnath',
    location: 'Uttarakhand, India',
    region: 'india',
    group: 'mountains',
    tagline: 'Abode of Lord Shiva',
    coords: '30.73° N, 79.06° E',
    bestTime: 'May – Jun · Sep – Oct',
    image: 'photo-1623952146070-f13fc902f769',
  },
  {
    slug: 'kerala',
    name: 'Kerala',
    location: 'Kerala, India',
    region: 'india',
    group: 'coast',
    tagline: "God's Own Country",
    coords: '9.49° N, 76.33° E',
    bestTime: 'Sep – Mar',
    image: 'photo-1506461883276-594a12b11cf3',
  },
  {
    slug: 'goa',
    name: 'Goa',
    location: 'Goa, India',
    region: 'india',
    group: 'coast',
    tagline: 'Sun, Sand & Susegad',
    coords: '15.29° N, 74.12° E',
    bestTime: 'Nov – Feb',
    image: 'photo-1614082242765-7c98ca0f3df3',
  },
  {
    slug: 'meghalaya',
    name: 'Meghalaya',
    location: 'Meghalaya, India',
    region: 'india',
    group: 'coast',
    tagline: 'Abode of Clouds',
    coords: '25.57° N, 91.89° E',
    bestTime: 'Oct – May',
    image: 'photo-1625826415766-001bd75aaf52',
  },
  {
    slug: 'rajasthan',
    name: 'Rajasthan',
    location: 'Rajasthan, India',
    region: 'india',
    group: 'coast',
    tagline: 'Land of Kings',
    coords: '26.91° N, 75.78° E',
    bestTime: 'Oct – Mar',
    image: 'photo-1661924326425-c14a6426d989',
  },
  {
    slug: 'andaman',
    name: 'Andaman & Nicobar',
    location: 'Andaman Islands, India',
    region: 'india',
    group: 'islands',
    tagline: 'Emerald Islands of India',
    coords: '11.62° N, 92.72° E',
    bestTime: 'Oct – May',
    image: 'photo-1586359716568-3e1907e4cf9f',
  },
  {
    slug: 'maldives',
    name: 'Maldives',
    location: 'Malé, Maldives',
    region: 'international',
    group: 'islands',
    tagline: 'Sunny Side of Life',
    coords: '4.17° N, 73.50° E',
    bestTime: 'Nov – Apr',
    image: 'photo-1590523277543-a94d2e4eb00b',
  },
  {
    slug: 'bali',
    name: 'Bali',
    location: 'Bali, Indonesia',
    region: 'international',
    group: 'islands',
    tagline: 'Island of the Gods',
    coords: '8.50° S, 115.26° E',
    bestTime: 'Apr – Oct',
    image: 'photo-1544644181-1484b3fdfc62',
  },
]

export const getDestination = (slug: string) => DESTINATIONS.find((d) => d.slug === slug)
