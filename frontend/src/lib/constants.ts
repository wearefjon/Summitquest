export const APP_NAME = "SummitQuest";
export const APP_TAGLINE = "Maharashtra's Adventure Marketplace";

export const CATEGORIES = [
  { slug: "trekking", label: "Trekking", emoji: "🥾" },
  { slug: "rafting", label: "River Rafting", emoji: "🚣" },
  { slug: "camping", label: "Camping", emoji: "⛺" },
  { slug: "paragliding", label: "Paragliding", emoji: "🪂" },
  { slug: "water-sports", label: "Water Sports", emoji: "🏄" },
  { slug: "wildlife", label: "Wildlife Safari", emoji: "🐅" },
] as const;

export const FEATURED_DESTINATIONS = [
  { slug: "lonavala", name: "Lonavala", region: "Pune District" },
  { slug: "kolad", name: "Kolad", region: "Raigad District" },
  { slug: "bhandardara", name: "Bhandardara", region: "Ahmednagar" },
  { slug: "matheran", name: "Matheran", region: "Raigad District" },
  { slug: "kalsubai", name: "Kalsubai", region: "Nashik District" },
  { slug: "tarkarli", name: "Tarkarli", region: "Konkan Coast" },
] as const;

/** Placeholder adventures until API is wired */
export const PLACEHOLDER_ADVENTURES = [
  {
    id: "1",
    slug: "rajmachi-night-trek",
    title: "Rajmachi Fort Night Trek",
    destination: "Lonavala",
    category: "Trekking",
    price: 1299,
    rating: 4.8,
    reviewCount: 124,
    duration: "1 Day",
    difficulty: "Moderate",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: "2",
    slug: "kolad-river-rafting",
    title: "Kolad White Water Rafting",
    destination: "Kolad",
    category: "Rafting",
    price: 1499,
    rating: 4.9,
    reviewCount: 312,
    duration: "Half Day",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
  },
  {
    id: "3",
    slug: "kalsubai-summit-trek",
    title: "Kalsubai Peak Summit Trek",
    destination: "Bhandardara",
    category: "Trekking",
    price: 999,
    rating: 4.7,
    reviewCount: 89,
    duration: "1 Day",
    difficulty: "Challenging",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  },
  {
    id: "4",
    slug: "panchgani-paragliding",
    title: "Panchgani Paragliding Experience",
    destination: "Panchgani",
    category: "Paragliding",
    price: 2499,
    rating: 4.6,
    reviewCount: 56,
    duration: "2 Hours",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  },
] as const;
