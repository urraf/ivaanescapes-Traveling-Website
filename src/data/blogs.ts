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
      { heading: 'Our Tip', body: ['Always keep the first day completely free to acclimatise. Every Ivaan Escapes Ladakh itinerary is built around this rule.'] },
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
    slug: 'goa-north-vs-south',
    title: 'Goa: North vs South — Where Should You Stay?',
    excerpt: 'Parties and shacks or quiet coves and luxury resorts? How to pick the right side of Goa for your trip.',
    category: 'Travel Guide',
    readMins: 4,
    date: '2026-08-10',
    cover: 'photo-1652820330085-82a0c2b88d78',
    related: 'goa-beach-escape',
    sections: [
      { body: ['Goa may be India’s smallest state, but North and South Goa feel like two different holidays. Choosing the right base makes all the difference.'] },
      { heading: 'North Goa: Buzz & Beach Life', body: ['Calangute, Baga, Candolim, Anjuna and Vagator are lively, packed with shacks, night markets and clubs. Great for friends and first-timers who want to be close to the action — and to forts like Aguada and Chapora.'] },
      { heading: 'South Goa: Calm & Luxurious', body: ['Colva, Benaulim, Cavelossim and Palolem are quieter, with wide clean beaches and many of Goa’s finest 5-star resorts. Perfect for honeymooners and families who want to unwind.'] },
      { heading: 'Panjim & Old Goa: Heritage', body: ['The Latin Quarter of Fontainhas, the UNESCO churches of Old Goa and the Mandovi river cruises are best explored from a central base.'] },
      { heading: 'Our Tip', body: ['Split your stay: two nights in the North for the energy, two in the South for the calm. We have exclusive B2B rates on 60+ Goa hotels — from 3-star to Taj, Marriott and Hyatt — so just tell us your budget on WhatsApp.'] },
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
    slug: 'weekend-getaways-from-mumbai',
    title: 'Best Weekend Getaways from Mumbai',
    excerpt: 'Lonavala, Mahabaleshwar, Igatpuri, Alibaug and more — easy escapes from the city, with where to stay.',
    category: 'Weekend Escapes',
    readMins: 4,
    date: '2026-06-14',
    cover: 'photo-1589286875480-743411b84f53',
    related: 'mumbai-lonavala-mahabaleshwar',
    sections: [
      { body: ['When the city gets too much, the Sahyadri hills and the Konkan coast are only a short drive away. Here are our favourite quick escapes from Mumbai.'] },
      { heading: 'Lonavala & Khandala (≈ 2 hrs)', body: ['Misty viewpoints, waterfalls in the monsoon and plenty of resorts — from Della and Fariyas to Radisson and The Fern.'] },
      { heading: 'Mahabaleshwar & Panchgani (≈ 5 hrs)', body: ['Strawberry farms, Venna Lake and sweeping valley views. Le Méridien, Courtyard by Marriott and Taj Fountain are popular picks.'] },
      { heading: 'Igatpuri (≈ 3 hrs)', body: ['Quiet green hills, waterfalls and wellness resorts such as Tropical Retreat and Regenta — ideal for a slow weekend.'] },
      { heading: 'Alibaug & Nashik', body: ['Alibaug offers a beach break (Taj Alibaug), while Nashik is perfect for vineyard stays and wine tours.'] },
      { heading: 'Plan It With Us', body: ['We hold B2B deals on 70+ hotels across Mumbai and Maharashtra, including airport hotels for transit stays. Message us on WhatsApp for the best rate before you book anywhere.'] },
    ],
  },
]

export const getBlog = (slug: string) => BLOGS.find((b) => b.slug === slug)
