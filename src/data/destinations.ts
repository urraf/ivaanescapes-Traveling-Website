export type Group = 'mountains' | 'coast'

export type Destination = {
  slug: string
  name: string
  location: string
  group: Group
  tagline: string
  coords: string
  bestTime: string
  image: string
}

export const GROUPS: Record<Group, { label: string; blurb: string }> = {
  mountains: { label: 'Himalayan Escapes', blurb: 'Snow, valleys, monasteries & shrines' },
  coast: { label: 'Coast, Culture & Heritage', blurb: 'Beaches, backwaters, palaces & the city' },
}

export const DESTINATIONS: Destination[] = [
  {
    slug: 'kashmir',
    name: 'Kashmir',
    location: 'Jammu & Kashmir',
    group: 'mountains',
    tagline: 'Paradise on Earth',
    coords: '34.08° N, 74.79° E',
    bestTime: 'Mar – Oct · Dec – Feb for snow',
    image: 'photo-1614591276564-7b3e69347a48',
  },
  {
    slug: 'ladakh',
    name: 'Leh Ladakh',
    location: 'Ladakh',
    group: 'mountains',
    tagline: 'Land of High Passes',
    coords: '34.15° N, 77.57° E',
    bestTime: 'May – Sep',
    image: 'photo-1635255506105-b74adbd94026',
  },
  {
    slug: 'himachal',
    name: 'Himachal',
    location: 'Himachal Pradesh',
    group: 'mountains',
    tagline: 'Valley of the Gods',
    coords: '32.24° N, 77.18° E',
    bestTime: 'Oct – Jun · Spiti Jun – Sep',
    image: 'photo-1647184544240-49cd48de3a58',
  },
  {
    slug: 'uttarakhand',
    name: 'Uttarakhand',
    location: 'Uttarakhand',
    group: 'mountains',
    tagline: 'Devbhoomi — Land of the Gods',
    coords: '30.08° N, 78.26° E',
    bestTime: 'Mar – Jun · Sep – Nov',
    image: 'photo-1719581827279-e9a8d8fce924',
  },
  {
    slug: 'goa',
    name: 'Goa',
    location: 'Goa',
    group: 'coast',
    tagline: 'Sun, Sand & Susegad',
    coords: '15.29° N, 74.12° E',
    bestTime: 'Nov – Feb',
    image: 'photo-1614082242765-7c98ca0f3df3',
  },
  {
    slug: 'kerala',
    name: 'Kerala',
    location: 'Kerala',
    group: 'coast',
    tagline: "God's Own Country",
    coords: '9.49° N, 76.33° E',
    bestTime: 'Sep – Mar',
    image: 'photo-1506461883276-594a12b11cf3',
  },
  {
    slug: 'rajasthan',
    name: 'Rajasthan',
    location: 'Rajasthan',
    group: 'coast',
    tagline: 'Land of Kings',
    coords: '26.91° N, 75.78° E',
    bestTime: 'Oct – Mar',
    image: 'photo-1661924326425-c14a6426d989',
  },
  {
    slug: 'maharashtra',
    name: 'Maharashtra',
    location: 'Maharashtra',
    group: 'coast',
    tagline: 'City of Dreams & Sahyadri Hills',
    coords: '18.92° N, 72.83° E',
    bestTime: 'Oct – Mar · Jun – Sep for monsoon hills',
    image: 'photo-1598434192043-71111c1b3f41',
  },
]

export const getDestination = (slug: string) => DESTINATIONS.find((d) => d.slug === slug)
