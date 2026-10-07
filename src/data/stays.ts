export type StayType = 'Resort' | 'Houseboat' | 'Heritage' | 'Villa' | 'Camp & Homestay'

export type Stay = {
  id: string
  name: string
  location: string
  type: StayType
  stars: number
  priceFrom: number // per room per night (INR)
  image: string
  perks: string[]
}

export const STAY_TYPES: StayType[] = ['Resort', 'Houseboat', 'Heritage', 'Villa', 'Camp & Homestay']

export const STAYS: Stay[] = [
  { id: 'maldives-water-villa', name: 'Overwater Villa Resort', location: 'North Malé Atoll, Maldives', type: 'Villa', stars: 5, priceFrom: 38000, image: 'photo-1688949078626-a358f500e063', perks: ['Private deck & ladder to lagoon', 'House reef snorkelling', 'Speedboat transfers'] },
  { id: 'alleppey-houseboat', name: 'Premium Private Houseboat', location: 'Alleppey, Kerala', type: 'Houseboat', stars: 4, priceFrom: 9500, image: 'photo-1624554305378-0f440dd3a8c1', perks: ['All meals by onboard chef', 'AC bedroom with sundeck', 'Overnight cruise'] },
  { id: 'udaipur-palace', name: 'Lakeside Heritage Palace', location: 'Udaipur, Rajasthan', type: 'Heritage', stars: 5, priceFrom: 14500, image: 'photo-1724947053227-2335bf21d0ae', perks: ['Royal courtyard pool', 'Heritage suites', 'Lake-view dining'] },
  { id: 'goa-beach-resort', name: 'Palm Grove Beach Resort', location: 'Candolim, Goa', type: 'Resort', stars: 4, priceFrom: 6800, image: 'photo-1701421016474-09b19faa9f77', perks: ['Lagoon pool', 'Walk to the beach', 'Breakfast included'] },
  { id: 'dal-houseboat', name: 'Deluxe Dal Lake Houseboat', location: 'Srinagar, Kashmir', type: 'Houseboat', stars: 4, priceFrom: 5500, image: 'photo-1564327287902-0ccf559d839e', perks: ['Hand-carved walnut interiors', 'Kashmiri wazwan dinner', 'Free shikara transfer'] },
  { id: 'kerala-ayurveda', name: 'Rainforest Ayurveda Retreat', location: 'Kumarakom, Kerala', type: 'Resort', stars: 5, priceFrom: 11200, image: 'photo-1695124565997-6f6552b1edb2', perks: ['Ayurveda spa', 'Garden pool villas', 'Backwater views'] },
  { id: 'andaman-seaview', name: 'Infinity Sea-View Resort', location: 'Havelock, Andaman', type: 'Resort', stars: 4, priceFrom: 8900, image: 'photo-1719391083606-da1dd6454a68', perks: ['Infinity pool', 'Near Radhanagar Beach', 'Scuba desk on site'] },
  { id: 'bali-pool-villa', name: 'Jungle Private Pool Villa', location: 'Ubud, Bali', type: 'Villa', stars: 5, priceFrom: 13500, image: 'photo-1576475706812-822620fc23ba', perks: ['Private plunge pool', 'Floating breakfast', 'Rice-terrace views'] },
  { id: 'jaisalmer-haveli', name: 'Golden Sandstone Haveli', location: 'Jaisalmer, Rajasthan', type: 'Heritage', stars: 4, priceFrom: 6200, image: 'photo-1667125095636-dce94dcbdd96', perks: ['Fort-view rooftop', 'Hand-woven Rajasthani décor', 'Desert safari desk'] },
  { id: 'manali-boutique', name: 'Cedar Boutique Mountain Stay', location: 'Old Manali, Himachal', type: 'Resort', stars: 4, priceFrom: 5400, image: 'photo-1790419683322-b08a7050c424', perks: ['Snow-peak balconies', 'Fireplace lounge', 'Café & bonfire'] },
  { id: 'spiti-homestay', name: 'Traditional Spitian Homestay', location: 'Langza, Spiti', type: 'Camp & Homestay', stars: 3, priceFrom: 2800, image: 'photo-1653844573020-71f77a0ccb8c', perks: ['Home-cooked meals', 'Stargazing terrace', 'Local family host'] },
  { id: 'pangong-camp', name: 'Lakeside Luxury Camp', location: 'Pangong Tso, Ladakh', type: 'Camp & Homestay', stars: 4, priceFrom: 7500, image: 'photo-1606857090627-27ca46667290', perks: ['Heated Swiss tents', 'Lake-facing sit-outs', 'Dinner & breakfast'] },
]
