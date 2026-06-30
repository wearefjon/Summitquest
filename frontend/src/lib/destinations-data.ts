export interface Attraction {
  name: string;
  description: string;
  type: string;
}

export interface DestinationDetail {
  slug: string;
  name: string;
  region: string;
  description: string;
  heroImage: string;
  bestTimeToVisit: string;
  attractions: Attraction[];
}

export const DESTINATION_DETAILS: Record<string, DestinationDetail> = {
  lonavala: {
    slug: "lonavala",
    name: "Lonavala",
    region: "Pune District",
    description: "Nestled in the Sahyadri ranges, Lonavala is a spectacular hill station known for its lush green valleys, historic caves, and cascading waterfalls. It serves as the perfect weekend getaway for nature lovers and history enthusiasts alike.",
    heroImage: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=1200&auto=format&fit=crop",
    bestTimeToVisit: "June to September (Monsoon) and October to March (Winter)",
    attractions: [
      { name: "Rajmachi Fort", description: "A historic fort offering panoramic views of the Sahyadri mountains and the Shirota Dam.", type: "Trekking & History" },
      { name: "Karla Caves", description: "Ancient Buddhist rock-cut caves dating back to the 2nd century BC, featuring intricate carvings.", type: "Heritage" },
      { name: "Tiger's Leap", description: "A popular viewpoint that gives the illusion of a tiger leaping across the valley, offering breathtaking sunset views.", type: "Viewpoint" },
      { name: "Bhushi Dam", description: "A masonry dam on the Indrayani River, especially popular during the monsoons when water overflows its steps.", type: "Leisure" },
    ]
  },
  kolad: {
    slug: "kolad",
    name: "Kolad",
    region: "Raigad District",
    description: "Often called the Rishikesh of Maharashtra, Kolad is an adventure hub famous for its year-round white water rafting on the Kundalika River, surrounded by dense forests and hidden waterfalls.",
    heroImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
    bestTimeToVisit: "June to October for rafting, November to February for camping",
    attractions: [
      { name: "Kundalika River Rafting", description: "Grade II and III rapids created by water released from the Bhira Dam, offering thrilling rafting experiences.", type: "Adventure" },
      { name: "Devkund Waterfall", description: "A plunge waterfall located deep inside the forests of Bhira, perfect for a day trek.", type: "Trekking & Nature" },
      { name: "Tamhini Ghat", description: "A mountain pass noted for its scenic waterfalls, lakes, and dense woods during the monsoon.", type: "Scenic Drive" },
      { name: "Plus Valley Trek", description: "A trek through a plus-shaped valley known for its challenging terrain and crystal clear pools.", type: "Trekking" },
    ]
  },
  bhandardara: {
    slug: "bhandardara",
    name: "Bhandardara",
    region: "Ahmednagar District",
    description: "A tranquil holiday resort village in the western ghats, Bhandardara is a blend of natural beauty, waterfalls, mountains, tranquility, greenery, invigorating air and pristine ambiance.",
    heroImage: "https://images.unsplash.com/photo-1595844730298-b960fad973ac?q=80&w=1200&auto=format&fit=crop",
    bestTimeToVisit: "June to September (Monsoon) and late May (Fireflies Festival)",
    attractions: [
      { name: "Arthur Lake", description: "A serene lake formed by the waters of the Pravara River, offering peaceful boating and lakeside camping.", type: "Nature & Camping" },
      { name: "Wilson Dam", description: "Built in 1910, it is one of the oldest dams in the country, featuring a beautiful circular garden at its base.", type: "Engineering & Nature" },
      { name: "Randha Falls", description: "A roaring waterfall where the Pravara river descends from a height of 170 feet into a gorge.", type: "Nature" },
      { name: "Ratangad Fort", description: "A 400-year-old fort featuring a natural rock cavity known as the 'Eye of the Needle'.", type: "Trekking" },
    ]
  },
  matheran: {
    slug: "matheran",
    name: "Matheran",
    region: "Raigad District",
    description: "Asia's only automobile-free hill station, Matheran retains its colonial charm with red dirt roads, dense forest canopies, and over 38 breathtaking viewpoints overlooking the western ghats.",
    heroImage: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=1200&auto=format&fit=crop",
    bestTimeToVisit: "October to May",
    attractions: [
      { name: "Charlotte Lake", description: "The primary source of drinking water for Matheran, surrounded by dense forest and an ancient temple.", type: "Nature" },
      { name: "Louisa Point", description: "Offers spectacular views of the ruined forts of Prabal and Vishalgarh.", type: "Viewpoint" },
      { name: "Neral-Matheran Toy Train", description: "A heritage narrow-gauge railway that chugs slowly through the scenic mountains up to the hill station.", type: "Heritage Ride" },
      { name: "Panorama Point", description: "A secluded spot offering a sweeping 360-degree view of the surrounding hills and plains.", type: "Viewpoint" },
    ]
  },
  kalsubai: {
    slug: "kalsubai",
    name: "Kalsubai",
    region: "Nashik District",
    description: "Standing at 1,646 meters, Kalsubai is the highest peak in Maharashtra. Known as the 'Everest of Maharashtra', it is a premier trekking destination offering unparalleled views of the surrounding ranges and dams.",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
    bestTimeToVisit: "June to September for monsoon trek, October to December for night treks",
    attractions: [
      { name: "Kalsubai Peak", description: "The summit itself, featuring iron ladders for the steep sections and a small temple at the top.", type: "Trekking" },
      { name: "Kalsubai Temple", description: "A small temple dedicated to the local deity Kalsubai, visited by thousands of devotees during Navratri.", type: "Pilgrimage" },
      { name: "Bari Village", description: "The rustic base village that serves as the starting point for the trek, offering local Maharashtrian hospitality.", type: "Culture" },
      { name: "Bhandardara Backwaters View", description: "The summit offers a mesmerizing aerial view of the vast Arthur Lake and Bhandardara backwaters.", type: "Viewpoint" },
    ]
  },
  tarkarli: {
    slug: "tarkarli",
    name: "Tarkarli",
    region: "Sindhudurg District (Konkan Coast)",
    description: "A pristine coastal village known for its white sand beaches, clear waters, and vibrant marine life. Tarkarli is Maharashtra's premier destination for scuba diving and water sports.",
    heroImage: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1200&auto=format&fit=crop",
    bestTimeToVisit: "October to March (Clear waters for diving)",
    attractions: [
      { name: "Scuba Diving & Snorkeling", description: "Explore the vibrant coral reefs and marine life in the crystal clear waters off the coast.", type: "Water Sports" },
      { name: "Sindhudurg Fort", description: "A magnificent 17th-century sea fort built by Chhatrapati Shivaji Maharaj on a rocky island.", type: "History & Architecture" },
      { name: "Tarkarli Beach", description: "A long, pristine stretch of white sand beach bordered by suru (casuarina) trees.", type: "Beach & Leisure" },
      { name: "Karli Backwaters", description: "Enjoy peaceful houseboat cruises or kayaking along the backwaters where the Karli river meets the Arabian sea.", type: "Nature & Boating" },
    ]
  }
};
