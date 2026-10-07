export type Blog = {
  slug: string
  title: string
  excerpt: string
  category: string
  readMins: number
  date: string
  cover: string
  related?: string // package slug
  sections: { heading?: string; body: string[] }[]
}

export const BLOGS: Blog[] = [
  {
    slug: 'best-time-to-visit-ladakh',
    title: 'The Best Time to Visit Ladakh (and What to Expect Each Month)',
    excerpt: 'From frozen lakes to open passes — a month-by-month guide to planning the perfect Ladakh trip.',
    category: 'Travel Guide',
    readMins: 5,
    date: '2026-09-12',
    cover: 'photo-1635255506105-b74adbd94026',
    related: 'ladakh-land-of-high-passes',
    sections: [
      { body: ['Ladakh is a high-altitude desert, and the season you choose changes everything — which roads are open, how cold the nights get and even the colour of Pangong Tso. Here is how to pick your window.'] },
      { heading: 'May to June: The Opening Season', body: ['The Manali–Leh and Srinagar–Leh highways usually open by late May. Snow walls line the passes, skies are crisp and the crowds are still building. Nights are cold, so pack layers.'] },
      { heading: 'July to August: Peak Summer', body: ['Everything is open — Khardung La, Chang La, Nubra and Pangong. Days are warm (20–25°C) and this is the best time for road trips and biking. Book early, as hotels and camps fill up quickly.'] },
      { heading: 'September: The Golden Month', body: ['Our favourite. Poplar trees turn gold, skies are at their clearest and crowds thin out. Perfect for photography and monastery festivals.'] },
      { heading: 'October to April: Winter Ladakh', body: ['Most highways close and temperatures drop well below zero. Flights still operate to Leh, and winter brings the famous Chadar trek and frozen Pangong — only for the well-prepared.'] },
      { heading: 'Our Tip', body: ['Always keep the first day completely free to acclimatise. Every Ivaanescapes Ladakh itinerary is built around this rule.'] },
    ],
  },
  {
    slug: 'kerala-houseboat-guide',
    title: 'Kerala Houseboat Guide: Alleppey vs Kumarakom',
    excerpt: 'Everything you need to know before booking your first night on the backwaters.',
    category: 'Experiences',
    readMins: 4,
    date: '2026-08-28',
    cover: 'photo-1624554305378-0f440dd3a8c1',
    related: 'kerala-backwaters-and-hills',
    sections: [
      { body: ["A night on a kettuvallam — Kerala's traditional rice barge turned floating villa — is one of India's most peaceful travel experiences. Here is how to choose the right one."] },
      { heading: 'Alleppey: The Classic Choice', body: ['Alleppey has the largest network of canals and the widest choice of houseboats, from cosy one-bedroom boats to premium glass-fronted ones. Ideal for first-timers and families.'] },
      { heading: 'Kumarakom: Quieter & Upscale', body: ['On the banks of Vembanad Lake, Kumarakom is calmer, with luxury resorts and a bird sanctuary. Great for honeymooners who want a slower pace.'] },
      { heading: 'What is Included?', body: ['Most overnight cruises include lunch, evening tea, dinner and breakfast cooked fresh on board — think karimeen fry, appam and coconut curries. Boats anchor at night as per local rules.'] },
      { heading: 'Best Time to Go', body: ['September to March offers pleasant weather. The monsoon (June–August) is dramatic and lush, and comes with lovely off-season rates.'] },
    ],
  },
  {
    slug: 'maldives-honeymoon-tips',
    title: '7 Tips for a Dreamy Maldives Honeymoon',
    excerpt: 'Water villa or beach villa? Seaplane or speedboat? Here is how to plan it right.',
    category: 'Honeymoon',
    readMins: 4,
    date: '2026-08-10',
    cover: 'photo-1590523277543-a94d2e4eb00b',
    related: 'maldives-overwater-bliss',
    sections: [
      { body: ['The Maldives is made for couples — but with over a hundred resort islands, a little planning goes a long way.'] },
      { heading: '1. Split Your Stay', body: ['Combine two nights in a beach villa with two in a water villa. You get the best of both — and better value.'] },
      { heading: '2. Check the Transfer Type', body: ['Speedboat resorts near Malé save money and time. Seaplane resorts are farther and pricier, but the flight itself is unforgettable.'] },
      { heading: '3. Choose a Good House Reef', body: ['A resort with a healthy house reef lets you snorkel with turtles and reef sharks straight from the beach.'] },
      { heading: '4. Pick the Right Meal Plan', body: ['Food on a private island is expensive. Half board or full board usually works out cheaper than paying à la carte.'] },
      { heading: '5–7. The Little Things', body: ['Tell us it is your honeymoon — most resorts add cake, flowers and bed décor. Carry reef-safe sunscreen. And travel between November and April for the calmest seas.'] },
    ],
  },
  {
    slug: 'spiti-valley-road-trip',
    title: 'Spiti Valley Road Trip: Shimla or Manali Route?',
    excerpt: 'How to plan the Spiti circuit, which side to start from, and how to stay safe at altitude.',
    category: 'Road Trips',
    readMins: 5,
    date: '2026-07-22',
    cover: 'photo-1652514284048-a297d43ab05d',
    related: 'spiti-valley-circuit',
    sections: [
      { body: ['Spiti is raw, remote and breathtaking. The full circuit takes 7–9 days and the direction you choose matters.'] },
      { heading: 'Start from Shimla', body: ['The Kinnaur side climbs gradually, which helps your body acclimatise. The road is open most of the year up to Kaza.'] },
      { heading: 'Exit via Manali', body: ['Kunzum Pass and the Batal stretch open only from about June to October. Ending here lets you finish with Chandratal and the Atal Tunnel.'] },
      { heading: 'Must-See Stops', body: ['Key Monastery, Kibber, Chicham Bridge, Langza, Hikkim post office, Komic, Dhankar and Tabo. Chandratal is the crown jewel.'] },
      { heading: 'Stay Safe', body: ['Drink lots of water, avoid alcohol for the first days and carry basic medicines. Network is patchy — BSNL and Jio work best. Our drivers carry oxygen and first-aid kits.'] },
    ],
  },
  {
    slug: 'kedarnath-yatra-guide',
    title: 'Kedarnath Yatra Guide: Registration, Trek & Helicopter',
    excerpt: 'A practical guide to planning a comfortable and blessed Kedarnath darshan.',
    category: 'Spiritual',
    readMins: 4,
    date: '2026-06-30',
    cover: 'photo-1623952146070-f13fc902f769',
    related: 'kedarnath-yatra',
    sections: [
      { body: ['Kedarnath, one of the twelve Jyotirlingas, sits at 11,755 ft in the Garhwal Himalaya. The temple usually opens around Akshaya Tritiya (April–May) and closes after Bhai Dooj (October–November).'] },
      { heading: 'Registration Is Mandatory', body: ['Every pilgrim must register with Uttarakhand Tourism before the yatra. We handle this for all our travellers.'] },
      { heading: 'The Trek', body: ['The 16 km trek from Gaurikund takes 6–8 hours. Ponies, palkis and pithus are available. Start early in the morning to avoid afternoon rain.'] },
      { heading: 'Helicopter Option', body: ['Helicopters fly from Phata, Sersi and Guptkashi in about 8–10 minutes. Seats sell out fast, so book as soon as the official portal opens.'] },
      { heading: 'What to Pack', body: ['Rain jacket, warm layers, good trekking shoes, a torch and basic medicines. Temperatures can drop near zero even in summer nights.'] },
    ],
  },
  {
    slug: 'bali-first-timers',
    title: "Bali for First-Timers: Where to Stay & What to Do",
    excerpt: 'Ubud, Seminyak or Uluwatu? A simple guide to planning your first Bali holiday.',
    category: 'International',
    readMins: 4,
    date: '2026-06-14',
    cover: 'photo-1544644181-1484b3fdfc62',
    related: 'bali-island-of-gods',
    sections: [
      { body: ['Bali packs temples, jungles, beaches and nightlife into one island. Splitting your stay between two areas is the smartest way to see it.'] },
      { heading: 'Ubud: Culture & Jungle', body: ['Rice terraces, waterfalls, yoga and the Monkey Forest. Stay 2–3 nights for a slower, greener Bali.'] },
      { heading: 'Seminyak & Kuta: Beaches & Cafés', body: ['Sunset beach clubs, shopping and great food. Convenient for the airport too.'] },
      { heading: 'Uluwatu: Cliffs & Sunsets', body: ['Dramatic cliffs, surf beaches and the Kecak fire dance at Uluwatu Temple.'] },
      { heading: 'Good to Know', body: ['Indians get a visa on arrival. Carry some cash in IDR, dress modestly for temples and keep a day for Nusa Penida.'] },
    ],
  },
]

export const getBlog = (slug: string) => BLOGS.find((b) => b.slug === slug)
