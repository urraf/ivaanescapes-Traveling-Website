// Long-form content for the /destinations/:slug landing pages — written for both travellers and search engines.
// Prices in FAQs are filled in from the package data, so they never go out of date.

export type DestinationContent = {
  /** Main H1 / search keyword, e.g. "Kashmir Tour Packages". */
  heading: string
  /** Shorter version for the <title> tag (Google shows ~60 characters). */
  title: string
  metaDescription: string
  intro: string[]
  places: { name: string; text: string }[]
  howToReach: string
  faqs: { q: string; a: string }[]
  /** Links this destination to a B2B hotel page, when we hold hotel deals there. */
  hotelRegion?: 'goa' | 'rajasthan' | 'maharashtra'
  blogs?: string[]
}

export const DESTINATION_CONTENT: Record<string, DestinationContent> = {
  kashmir: {
    heading: 'Kashmir Tour Packages',
    title: 'Kashmir Tour Packages',
    metaDescription:
      'Kashmir tour packages covering Srinagar, Gulmarg, Pahalgam & Sonamarg with a Dal Lake houseboat stay, private cab and handpicked hotels. Honeymoon & family trips. Book on WhatsApp.',
    intro: [
      'Kashmir is India’s most romantic escape — shikaras gliding across Dal Lake, the meadows of Gulmarg and Pahalgam, and snow peaks that glow at sunset. Our Kashmir tour packages cover Srinagar, Gulmarg, Pahalgam and Sonamarg with a night on a traditional houseboat, a private cab throughout and handpicked hotels.',
      'Whether it’s a honeymoon, a family holiday or a group tour for your agency’s clients, our team plans every detail and confirms everything on WhatsApp. Travel agents get exclusive B2B rates on Kashmir hotels, including Lemon Tree properties.',
    ],
    places: [
      { name: 'Srinagar & Dal Lake', text: 'Shikara rides, floating gardens, houseboat stays and the Mughal Gardens of Nishat and Shalimar Bagh.' },
      { name: 'Gulmarg', text: 'The Meadow of Flowers — ride the Gulmarg Gondola, one of the highest cable cars in the world, and ski in winter.' },
      { name: 'Pahalgam', text: 'The Valley of Shepherds, with Betaab Valley, Aru Valley and Chandanwari along the Lidder river.' },
      { name: 'Sonamarg', text: 'The Meadow of Gold, with views of Thajiwas Glacier and pony rides through alpine scenery.' },
    ],
    howToReach:
      'Fly into Srinagar International Airport (SXR), which has direct flights from Delhi, Mumbai and other major cities. By rail, travel to Jammu or Katra and continue to Srinagar by road or train. Our package includes airport pick-up and drop.',
    faqs: [
      {
        q: 'What is the best time to visit Kashmir?',
        a: 'March to October brings pleasant weather, green meadows and the tulip season in spring. December to February is best for snow and skiing in Gulmarg.',
      },
      { q: 'How many days are enough for a Kashmir trip?', a: 'Five nights and six days covers Srinagar, Gulmarg, Pahalgam and Sonamarg comfortably. Add a day or two for a slower honeymoon pace.' },
      { q: 'Does the Kashmir package include a houseboat stay?', a: 'Yes. Our Kashmir package includes one night on a deluxe Dal Lake houseboat along with a one-hour shikara ride.' },
      { q: 'What is the starting price of a Kashmir tour package?', a: 'Our Kashmir package starts from {price} per person on twin sharing with standard hotels. The final quote depends on travel dates, hotel category and group size.' },
    ],
    blogs: [],
  },

  ladakh: {
    heading: 'Leh Ladakh Tour Packages',
    title: 'Leh Ladakh Tour Packages',
    metaDescription:
      'Leh Ladakh tour package with Nubra Valley, Pangong Tso & Khardung La — acclimatisation day, private SUV, Inner Line Permits and oxygen on board. Plan your Ladakh trip on WhatsApp.',
    intro: [
      'Ladakh is a high-altitude desert of turquoise lakes, ancient monasteries and some of the highest motorable roads in the world. Our Leh Ladakh tour package covers Leh, Nubra Valley and Pangong Tso with a full acclimatisation day built in.',
      'You travel in a private SUV with an experienced mountain driver, with Inner Line Permits, environment fees and an oxygen cylinder included — so you can simply enjoy the views.',
    ],
    places: [
      { name: 'Leh', text: 'Shanti Stupa sunsets, Leh Palace, the Hall of Fame and lively Leh Market.' },
      { name: 'Nubra Valley', text: 'Cross Khardung La to Diskit Monastery and the Hunder sand dunes with double-hump Bactrian camels.' },
      { name: 'Pangong Tso', text: 'The famous lake that changes colour through the day — stay overnight in lakeside camps.' },
      { name: 'Monasteries', text: 'Thiksey, Hemis and Shey — centuries-old gompas set against dramatic mountains.' },
    ],
    howToReach:
      'Fly into Leh’s Kushok Bakula Rimpochee Airport (IXL), with direct flights from Delhi and other cities. By road, the Manali–Leh and Srinagar–Leh highways are usually open from around May–June to October.',
    faqs: [
      { q: 'What is the best time to visit Ladakh?', a: 'May to September. July and August are peak season with every pass open; September brings golden autumn colours and fewer crowds.' },
      { q: 'How do I avoid altitude sickness in Ladakh?', a: 'Rest completely on the first day in Leh, drink plenty of water and avoid alcohol early in the trip. Every Ivaan Escapes Ladakh itinerary includes an acclimatisation day.' },
      { q: 'Do I need permits for Nubra and Pangong?', a: 'Yes, Inner Line Permits are required for Nubra Valley and Pangong Tso. We arrange them for you as part of the package.' },
      { q: 'What is the starting price of the Ladakh package?', a: 'Our Leh Ladakh package starts from {price} per person on twin sharing. The final quote depends on dates, hotel and camp category, and group size.' },
    ],
    blogs: ['best-time-to-visit-ladakh'],
  },

  himachal: {
    heading: 'Himachal Tour Packages — Manali & Spiti',
    title: 'Himachal Tour Packages — Manali & Spiti',
    metaDescription:
      'Himachal tour packages: Manali with Solang Valley & Atal Tunnel, or the Spiti Valley circuit via Kaza and Chandratal. Hotels, private cab and permits included. Book on WhatsApp.',
    intro: [
      'Himachal Pradesh brings together the snow-capped Kullu valley and the stark cold desert of Spiti. Choose a cosy Manali holiday with Solang Valley and the Atal Tunnel, or the epic Spiti Valley circuit through Kinnaur, Kaza and Chandratal.',
      'Both journeys include handpicked stays, a private cab with an experienced mountain driver and all permits — perfect for honeymooners, families and adventure seekers.',
    ],
    places: [
      { name: 'Manali & Old Manali', text: 'Hadimba Devi temple in a cedar forest, Vashisht hot springs, Mall Road and riverside cafés.' },
      { name: 'Solang Valley & Atal Tunnel', text: 'Paragliding and snow activities, then through the Atal Tunnel to Sissu in Lahaul.' },
      { name: 'Kasol & Manikaran', text: 'The Parvati valley, Manikaran Sahib hot springs and laid-back Kasol.' },
      { name: 'Spiti Valley', text: 'Key Monastery, Kibber, Langza, Hikkim’s high post office and the crescent-shaped Chandratal lake.' },
    ],
    howToReach:
      'Manali is about 12–14 hours from Delhi by overnight Volvo bus, or fly to Bhuntar (Kullu) airport about 50 km away. Spiti is reached via Shimla and Kinnaur, or via Manali and Kunzum Pass from roughly June to October.',
    faqs: [
      { q: 'What is the best time to visit Manali?', a: 'October to June. December to February brings snow, while March to June is ideal for sightseeing and the Atal Tunnel.' },
      { q: 'When is the best time for a Spiti Valley trip?', a: 'June to September, when Kunzum Pass and the Chandratal road are open and the full circuit can be completed.' },
      { q: 'Manali or Spiti — which is better for a first trip?', a: 'Manali is easier and great for families and honeymooners. Spiti is a raw, high-altitude road trip for travellers who want adventure and remote landscapes.' },
      { q: 'What is the starting price of a Himachal package?', a: 'Our Himachal packages start from {price} per person on twin sharing. Final quotes depend on dates, hotels and group size.' },
    ],
    blogs: ['spiti-valley-road-trip'],
  },

  uttarakhand: {
    heading: 'Uttarakhand Tour Packages — Kedarnath, Rishikesh & Mussoorie',
    title: 'Uttarakhand Tour Packages — Kedarnath & Rishikesh',
    metaDescription:
      'Uttarakhand tour packages: Kedarnath Yatra with Rishikesh, or Rishikesh & Mussoorie hill holidays. Exclusive Lemon Tree & Aurika hotel deals. Plan your trip on WhatsApp.',
    intro: [
      'Uttarakhand — Devbhoomi, the Land of the Gods — blends spiritual journeys with Himalayan hill stations. Join the Kedarnath Yatra for darshan at one of the twelve Jyotirlingas, or unwind in Rishikesh and Mussoorie with the Ganga Aarti, river rafting and pine-forest walks.',
      'Uttarakhand is one of our special exclusive-deal destinations: as a B2B consolidator for Lemon Tree Hotels and Aurika, we offer strong rates in Dehradun, Rishikesh and Mussoorie for travel agents and travellers alike.',
    ],
    places: [
      { name: 'Kedarnath', text: 'The 16 km trek (or helicopter) to the Kedarnath Jyotirlinga, set at 11,755 ft in the Garhwal Himalaya.' },
      { name: 'Rishikesh', text: 'Evening Ganga Aarti, white-water rafting from Shivpuri, Ram Jhula, Laxman Jhula and the Beatles Ashram.' },
      { name: 'Mussoorie & Landour', text: 'The Queen of the Hills — Mall Road, Kempty Falls, Lal Tibba and the quiet lanes of Landour.' },
      { name: 'Haridwar & Dhanaulti', text: 'A holy dip at Har Ki Pauri, and the pine forests and eco park of Dhanaulti.' },
    ],
    howToReach:
      'Dehradun’s Jolly Grant Airport (DED) is the nearest airport for Rishikesh, Mussoorie and Haridwar. Haridwar and Dehradun are also well connected by train and road from Delhi.',
    faqs: [
      { q: 'When does the Kedarnath temple open?', a: 'The temple usually opens around Akshaya Tritiya (April–May) and closes after Bhai Dooj (October–November). Exact dates are announced each year.' },
      { q: 'Is registration required for the Kedarnath Yatra?', a: 'Yes, every pilgrim must register with Uttarakhand Tourism before the yatra. We handle registration for all our travellers.' },
      { q: 'Can I take a helicopter to Kedarnath?', a: 'Yes — helicopters fly from Phata, Sersi and Guptkashi. Seats sell out quickly, so book as early as possible. Helicopter charges are extra.' },
      { q: 'What is the starting price of an Uttarakhand package?', a: 'Our Uttarakhand packages start from {price} per person on twin sharing. The final quote depends on dates, hotels and group size.' },
    ],
    blogs: ['kedarnath-yatra-guide'],
  },

  goa: {
    heading: 'Goa Tour Packages & Hotel Deals',
    title: 'Goa Tour Packages & Hotel Deals',
    metaDescription:
      'Goa tour packages with North & South Goa sightseeing and exclusive B2B rates on 60+ Goa hotels — 3-star to Taj, Marriott, Hyatt & Hilton. Try our rates before booking anywhere.',
    intro: [
      'Goa is India’s favourite beach escape — golden beaches, Portuguese heritage, seafood shacks and sunsets at Chapora Fort. Our Goa package pairs North and South Goa sightseeing and a Mandovi river cruise with a stay at one of our partner hotels.',
      'Goa is a special exclusive-deal destination for us. We hold B2B rates on more than 60 hotels — from great-value 3-star resorts to Taj, ITC, Marriott, Hyatt and Hilton — so travel agents and travellers get the best price before booking anywhere.',
    ],
    places: [
      { name: 'Calangute, Baga & Candolim', text: 'North Goa’s lively beaches, shacks, water sports and nightlife.' },
      { name: 'Anjuna, Vagator & Chapora Fort', text: 'Clifftop sunsets, flea markets and the famous “Dil Chahta Hai” fort.' },
      { name: 'Old Goa & Panjim', text: 'The UNESCO-listed Basilica of Bom Jesus and Se Cathedral, and the Latin Quarter of Fontainhas.' },
      { name: 'South Goa beaches', text: 'Quieter Colva, Benaulim, Cavelossim and Palolem — home to many of Goa’s finest resorts.' },
    ],
    howToReach:
      'Goa has two airports — Dabolim (GOI) and Manohar International Airport, Mopa (GOX) in North Goa. Madgaon and Thivim are the main railway stations. Our package includes airport pick-up and drop.',
    faqs: [
      { q: 'What is the best time to visit Goa?', a: 'November to February offers the best beach weather. June to September is the green monsoon season with lower hotel rates.' },
      { q: 'Should I stay in North Goa or South Goa?', a: 'North Goa suits travellers who want beaches, shacks and nightlife; South Goa is calmer with luxury resorts. Many guests split their stay between both.' },
      { q: 'Do you have B2B rates on 5-star hotels in Goa?', a: 'Yes. We hold exclusive rates on more than 35 five-star hotels in Goa, including Taj, ITC Grand Goa, W Goa, JW Marriott, Grand Hyatt and Hilton, plus many 4-star and 3-star hotels.' },
      { q: 'What is the starting price of a Goa package?', a: 'Our Goa package starts from {price} per person on twin sharing. You can upgrade to 4-star or 5-star partner hotels at B2B rates.' },
    ],
    hotelRegion: 'goa',
    blogs: ['goa-north-vs-south'],
  },

  kerala: {
    heading: 'Kerala Tour Packages',
    title: 'Kerala Tour Packages',
    metaDescription:
      'Kerala tour package with Kochi, Munnar tea hills, Thekkady and an overnight private houseboat in Alleppey. Honeymoon & family holidays with handpicked hotels. Book on WhatsApp.',
    intro: [
      'Kerala, God’s Own Country, is a world of backwaters and houseboats, misty tea hills, spice plantations and ayurveda. Our Kerala tour package covers Kochi, Munnar and Thekkady, ending with an overnight private houseboat cruise through the Alleppey backwaters.',
      'It’s one of our most-loved journeys for honeymooners and families, with a private AC cab throughout and all meals on board the houseboat.',
    ],
    places: [
      { name: 'Alleppey backwaters', text: 'An overnight cruise on a traditional kettuvallam through palm-lined canals.' },
      { name: 'Munnar', text: 'Rolling tea estates, Eravikulam National Park, Mattupetty Dam and the Tea Museum.' },
      { name: 'Thekkady', text: 'Spice plantation walks and boating on Periyar Lake.' },
      { name: 'Fort Kochi', text: 'Chinese fishing nets, St. Francis Church and the antique shops of Jew Town.' },
    ],
    howToReach:
      'Fly into Cochin International Airport (COK); Ernakulam is the main railhead. Munnar is about four hours from Kochi by road, and our package includes all transfers.',
    faqs: [
      { q: 'What is the best time to visit Kerala?', a: 'September to March offers pleasant weather. The monsoon (June to August) is lush and ideal for ayurveda, with off-season rates.' },
      { q: 'Is the houseboat stay included in the Kerala package?', a: 'Yes — one night on a private houseboat in Alleppey with lunch, evening tea, dinner and breakfast on board.' },
      { q: 'How many days do I need for Kerala?', a: 'Five nights and six days covers Kochi, Munnar, Thekkady and Alleppey at a relaxed pace.' },
      { q: 'What is the starting price of the Kerala package?', a: 'Our Kerala package starts from {price} per person on twin sharing. The final quote depends on dates, hotel category and group size.' },
    ],
    blogs: ['kerala-houseboat-guide'],
  },

  rajasthan: {
    heading: 'Rajasthan Tour Packages & Hotel Deals',
    title: 'Rajasthan Tour Packages & Hotel Deals',
    metaDescription:
      'Royal Rajasthan tour package — Jaipur, Jodhpur & Jaisalmer with a desert camp — plus pre-purchased B2B rates on 150+ Rajasthan hotels, palaces and safari lodges. Book on WhatsApp.',
    intro: [
      'Rajasthan is the land of kings — forts and palaces, golden dunes and colourful bazaars. Our Royal Rajasthan tour covers Jaipur, Jodhpur and Jaisalmer, including a camel safari and a night under the stars in a desert camp.',
      'For travel agents, we hold pre-purchased and exclusive B2B rates on more than 150 Rajasthan hotels — heritage havelis, Taj and Oberoi palaces, Ranthambore and Jawai safari lodges and Jaisalmer desert camps — with DMC support and instant confirmation.',
    ],
    places: [
      { name: 'Jaipur', text: 'Amer Fort, Hawa Mahal, City Palace, Jantar Mantar and sunset from Nahargarh.' },
      { name: 'Jodhpur', text: 'The mighty Mehrangarh Fort above the Blue City, and Jaswant Thada.' },
      { name: 'Jaisalmer', text: 'The living Golden Fort, Patwon Ki Haveli and camel safaris on the Sam sand dunes.' },
      { name: 'Udaipur, Ranthambore & Jawai', text: 'Lake palaces in Udaipur, tiger safaris in Ranthambore and leopard country in Jawai.' },
    ],
    howToReach:
      'Jaipur International Airport (JAI) is the main gateway, with airports in Udaipur, Jodhpur and Jaisalmer too. Jaipur is well connected to Delhi by road and train.',
    faqs: [
      { q: 'What is the best time to visit Rajasthan?', a: 'October to March, when days are pleasant and desert nights are cool. Summers (April to June) are very hot.' },
      { q: 'Does the Rajasthan package include a desert camp?', a: 'Yes — one night in a desert camp near the Sam sand dunes with a camel safari, folk music and dinner.' },
      { q: 'Do you have hotel deals in Ranthambore, Udaipur and Jawai?', a: 'Yes. Our Rajasthan list covers Jaipur, Udaipur, Ranthambore, Jodhpur, Jaisalmer, Jawai, Sariska, Ajmer, Kumbhalgarh and more, with pre-purchased B2B rates.' },
      { q: 'What is the starting price of the Rajasthan package?', a: 'Our Royal Rajasthan package starts from {price} per person on twin sharing. The final quote depends on dates, hotels and group size.' },
    ],
    hotelRegion: 'rajasthan',
    blogs: [],
  },

  maharashtra: {
    heading: 'Maharashtra Tour Packages',
    title: 'Maharashtra Tour Packages & Hotel Deals',
    metaDescription:
      'Mumbai, Lonavala & Mahabaleshwar tour package plus B2B rates on 70+ Maharashtra hotels — Mumbai airport hotels, Lonavala, Igatpuri, Nashik & more. Book on WhatsApp.',
    intro: [
      'From the Gateway of India and Marine Drive to the monsoon-green hills of Lonavala and Mahabaleshwar, Maharashtra is perfect for city breaks and weekend escapes. Our package combines Mumbai sightseeing with Lonavala, Panchgani and Mahabaleshwar.',
      'We also hold B2B rates on more than 70 Maharashtra hotels — Mumbai city and airport hotels, Lonavala, Mahabaleshwar, Igatpuri, Nashik, Alibaug and more — ideal for corporate stays, transit nights and weekend groups.',
    ],
    places: [
      { name: 'Mumbai', text: 'Gateway of India, Colaba, Marine Drive, the Bandra–Worli Sea Link, Siddhivinayak and Haji Ali.' },
      { name: 'Lonavala & Khandala', text: 'Tiger’s Leap, Lion’s Point, Bhushi Dam and waterfalls in the monsoon.' },
      { name: 'Mahabaleshwar & Panchgani', text: 'Venna Lake, Arthur’s Seat, strawberry farms, Table Land and Sydney Point.' },
      { name: 'Igatpuri, Nashik & Alibaug', text: 'Wellness resorts in the hills, vineyard stays and a beach break on the Konkan coast.' },
    ],
    howToReach:
      'Fly into Chhatrapati Shivaji Maharaj International Airport (BOM), Mumbai. Lonavala is about two hours and Mahabaleshwar about five hours from Mumbai by road; Pune is another convenient gateway.',
    faqs: [
      { q: 'What is the best time to visit Lonavala and Mahabaleshwar?', a: 'June to September for the green monsoon and waterfalls, and October to March for pleasant sightseeing weather.' },
      { q: 'Do you offer hotels near Mumbai airport?', a: 'Yes — including Fairmont, The Leela, Aurika SkyCity, Radisson Blu, Sahara Star, The Orchid and Novotel near the international and domestic airports.' },
      { q: 'What are the best weekend getaways from Mumbai?', a: 'Lonavala, Mahabaleshwar, Igatpuri, Alibaug and Nashik are all within a few hours. We have hotel deals in each of them.' },
      { q: 'What is the starting price of the Maharashtra package?', a: 'Our Mumbai, Lonavala & Mahabaleshwar package starts from {price} per person on twin sharing. The final quote depends on dates, hotels and group size.' },
    ],
    hotelRegion: 'maharashtra',
    blogs: ['weekend-getaways-from-mumbai'],
  },
}
