// SAMPLE CONTENT — replace with real, verified customer reviews before going live.
export type Review = {
  name: string
  city: string
  trip: string
  rating: number
  text: string
  kind: 'traveller' | 'partner'
}

export const REVIEWS: Review[] = [
  { name: 'Ananya & Rohit', city: 'Bengaluru', trip: 'Goa — Beach & Fiesta Escape', rating: 5, kind: 'traveller', text: 'Our honeymoon in Goa was pure magic. A beautiful 5-star resort at a price we did not expect, the river cruise, the sunsets at Chapora — every detail was taken care of.' },
  { name: 'Vikram Malhotra', city: 'Delhi', trip: 'Leh Ladakh — Land of High Passes', rating: 5, kind: 'traveller', text: 'Driver was a pro on the mountain roads and the itinerary had enough acclimatisation built in. Pangong camp at night was the highlight of my life so far.' },
  { name: 'The Iyer Family', city: 'Chennai', trip: "Kerala — God's Own Country", rating: 5, kind: 'traveller', text: 'Travelled with kids and grandparents. Hotels were clean, the houseboat was beautiful and the team checked in with us every day on WhatsApp.' },
  { name: 'Sneha Kapoor', city: 'Mumbai', trip: 'Kashmir — Paradise on Earth', rating: 5, kind: 'traveller', text: 'The shikara ride at sunset and the houseboat night felt straight out of a movie. Super quick replies on WhatsApp whenever we needed anything.' },
  { name: 'Arjun Mehta', city: 'Pune', trip: 'Spiti Valley — The Great Circuit', rating: 4, kind: 'traveller', text: 'Raw, wild and beautiful. Homestays were authentic and the team managed permits smoothly. Chandratal under the stars is unreal.' },
  { name: 'Priya & Karan', city: 'Hyderabad', trip: 'Royal Rajasthan', rating: 5, kind: 'traveller', text: 'Loved the forts, the palace hotels and the night at the desert camp. Our driver in Rajasthan was so friendly — it felt like travelling with a local friend.' },
  { name: 'Meera Joshi', city: 'Ahmedabad', trip: 'Kedarnath Yatra with Rishikesh', rating: 5, kind: 'traveller', text: 'Took my parents for the yatra. Everything from registration to the helicopter booking was arranged perfectly. Truly a blessed trip.' },
  { name: 'Rohan Arora', city: 'Chandigarh', trip: 'Uttarakhand — Rishikesh & Mussoorie', rating: 5, kind: 'traveller', text: 'The Ganga Aarti, rafting in Rishikesh and the cosy hotel in Mussoorie were perfect for a family break. Great value for money.' },
  { name: 'Wanderlust Holidays', city: 'Jaipur · Travel Agency', trip: 'B2B Partner', rating: 5, kind: 'partner', text: 'Their net rates for Goa, Kashmir and Kerala are very competitive, and the ops team handles our clients like their own. Our repeat bookings have grown steadily.' },
  { name: 'Skyline Tours', city: 'Lucknow · Travel Agency', trip: 'B2B Partner', rating: 5, kind: 'partner', text: 'Quick quotations, white-label itineraries and 24×7 on-ground support. Ivaan Escapes has become our go-to for Rajasthan and Goa hotels.' },
]
