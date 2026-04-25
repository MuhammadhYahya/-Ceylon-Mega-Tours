import process from "node:process";
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-07-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

const t = (value) => ({ en: value, ru: value });
const text = (value) => ({ en: value, ru: value });
const image = (fallbackSrc, alt) => ({ fallbackSrc, alt: t(alt) });
const list = (items) => items.map((item) => ({ title: t(item) }));

function sectionsFrom(seed) {
  return [
    {
      _type: "richTextSection",
      title: t("Overview"),
      body: text(seed.longDescription)
    },
    {
      _type: "highlightsSection",
      title: t("What You'll Experience"),
      items: list(seed.highlights)
    },
    {
      _type: "includesSection",
      title: t("What's Included"),
      items: list(seed.includes)
    },
    {
      _type: "excludesSection",
      title: t("Not Included"),
      items: list(seed.excludes)
    },
    {
      _type: "idealForSection",
      title: t("Ideal For"),
      items: list(seed.idealFor)
    }
  ];
}

const seeds = [
  {
    slug: "deep-sea-fishing-indian-ocean",
    title: "Deep Sea Fishing in the Indian Ocean",
    summary:
      "Venture into the open Indian Ocean for a thrilling deep-sea fishing adventure suitable for first-timers and seasoned anglers alike.",
    longDescription:
      "Depart from the Sri Lankan coast into some of Asia's richest open-ocean fishing grounds with a fully equipped boat and experienced crew.",
    duration: "Half or Full Day",
    durationDays: 1,
    category: "adventure",
    difficulty: "easy",
    location: "Indian Ocean, Sri Lanka",
    bestTime: "November-April",
    badge: "Thrill-Seeker Pick",
    featured: true,
    image: image("/hero.png", "Sunrise over the Indian Ocean with a fishing boat"),
    languages: [t("English"), t("Russian")],
    highlights: [
      "Open-ocean fishing with a fully equipped boat",
      "Catch possibilities from tuna to marlin",
      "Beginner-friendly crew support"
    ],
    includes: ["Fishing equipment", "Experienced crew", "Guide support"],
    excludes: ["Meals", "Insurance", "Gratuities"],
    idealFor: ["Families", "Couples", "Adventure seekers"]
  },
  {
    slug: "whale-watching-mirissa",
    title: "Whale Watching & Dolphin Safari - Mirissa",
    summary:
      "Set sail from Mirissa to encounter blue whales, spinner dolphins, and sea turtles off Sri Lanka's southern coast.",
    longDescription:
      "Morning departures maximize calmer seas and stronger wildlife sightings while keeping the journey comfortable and premium.",
    duration: "Half Day (Morning)",
    durationDays: 1,
    category: "adventure",
    difficulty: "easy",
    location: "Coconut Beach, Mirissa",
    bestTime: "November-April",
    badge: "Most Inclusive",
    featured: true,
    image: image("/hero.png", "Whale watching boat leaving Mirissa"),
    languages: [t("English"), t("Russian")],
    highlights: [
      "Blue whale and dolphin sightings",
      "Sea turtle and seabird encounters",
      "On-board refreshments and support"
    ],
    includes: ["Transport", "Breakfast", "Water", "Fresh fruit"],
    excludes: ["Insurance", "Gratuities"],
    idealFor: ["Families", "Nature lovers", "Couples"]
  },
  {
    slug: "yala-national-park-safari",
    title: "Yala National Park Jeep Safari",
    summary:
      "Sri Lanka's best-known wildlife reserve on an open jeep, famous for leopards, elephants, crocodiles, and dramatic golden-hour sightings.",
    longDescription:
      "Yala Block 1 is built around strong wildlife timing, experienced positioning, and the atmosphere of Sri Lanka's premier safari zone.",
    duration: "Full Day",
    durationDays: 1,
    category: "wildlife",
    difficulty: "easy",
    location: "Yala National Park, Southern Province",
    bestTime: "February-July",
    badge: "Best for Wildlife",
    featured: true,
    image: image("/safari.jpg", "Leopard safari in Yala National Park"),
    languages: [t("English"), t("Russian")],
    highlights: [
      "Open jeep safari through Yala Block 1",
      "Leopards, elephants, crocodiles, deer, and more",
      "Golden-hour photography potential"
    ],
    includes: ["Transport", "Safari jeep", "Entrance fees", "Guide"],
    excludes: ["Meals", "Insurance", "Binoculars"],
    idealFor: ["Wildlife enthusiasts", "Photographers", "Families"]
  },
  {
    slug: "ella-yala-combo-tour",
    title: "Ella Hills & Yala Safari Combo",
    summary:
      "A full day that combines misty hill-country rail views, Nine Arches Bridge, Ravana Falls, and a late safari in Yala.",
    longDescription:
      "This route compresses two of Sri Lanka's strongest moods into one day: cool Ella viewpoints and the wild safari atmosphere of Yala.",
    duration: "Full Day",
    durationDays: 1,
    category: "wildlife",
    difficulty: "moderate",
    location: "Ella Hills + Yala National Park",
    bestTime: "December-April",
    badge: "Top Combo",
    image: image("/ella.jpg", "Nine Arches Bridge and safari combination tour"),
    languages: [t("English"), t("Russian")],
    highlights: [
      "Scenic hill-country stops in Ella",
      "Nine Arches Bridge and Ravana Falls",
      "Late safari inside Yala National Park"
    ],
    includes: ["Transport", "Safari jeep", "Entrance fees", "Guide"],
    excludes: ["Meals", "Train ticket", "Insurance"],
    idealFor: ["Active travelers", "Couples", "Photographers"]
  },
  {
    slug: "sigiriya-dambulla-day-tour",
    title: "Sigiriya Rock Fortress & Dambulla Cave Temple",
    summary:
      "Climb Sri Lanka's iconic Sigiriya Rock Fortress and continue to Dambulla's cave temple for a UNESCO-rich day in the Cultural Triangle.",
    longDescription:
      "This route combines Sri Lanka's most famous rock citadel with one of its most atmospheric sacred sites, ideal for first-time visitors.",
    duration: "Full Day",
    durationDays: 1,
    category: "cultural",
    difficulty: "moderate",
    location: "Cultural Triangle, North-Central Province",
    bestTime: "Year-round",
    badge: "UNESCO",
    image: image("/sigiriya.jpg", "Sigiriya Rock Fortress above the jungle"),
    languages: [t("English"), t("Russian")],
    highlights: [
      "Sigiriya Rock Fortress climb",
      "Dambulla Golden Cave Temple",
      "Spice garden and Ayurvedic stop"
    ],
    includes: ["Transport", "Entrance tickets", "Guide"],
    excludes: ["Meals", "Insurance"],
    idealFor: ["History lovers", "Couples", "First-time visitors"]
  },
  {
    slug: "kandy-cultural-heritage-tour",
    title: "Kandy & the Last Kingdom Tour",
    summary:
      "Discover Sri Lanka's last royal capital through the Temple of the Tooth, Peradeniya gardens, gemstone heritage, and tea country.",
    longDescription:
      "Kandy blends devotional life, royal history, and botanical beauty into one elegant day with a comfortable hill-country rhythm.",
    duration: "Full Day",
    durationDays: 1,
    category: "cultural",
    difficulty: "easy",
    location: "Kandy, Hill Country",
    bestTime: "Year-round",
    image: image("/kandy.jpg", "Temple of the Tooth and Kandy Lake"),
    languages: [t("English"), t("Russian")],
    highlights: [
      "Temple of the Sacred Tooth Relic",
      "Royal Botanic Gardens, Peradeniya",
      "Tea factory and gemstone workshop"
    ],
    includes: ["Transport", "Entrance tickets", "Guide"],
    excludes: ["Meals", "Insurance"],
    idealFor: ["Culture enthusiasts", "Couples", "Spiritual travelers"]
  },
  {
    slug: "gemstone-market-beruwala",
    title: "Sri Lanka Gemstone Market - Beruwala",
    summary:
      "Step inside a live gemstone trading floor, watch craftsmen at work, and explore Sri Lanka's sapphire legacy with expert guidance.",
    longDescription:
      "Beruwala offers a real trading-floor experience rather than a showroom simulation, making it especially compelling for curious buyers.",
    duration: "Half Day",
    durationDays: 1,
    category: "cultural",
    difficulty: "easy",
    location: "BITMA Gem Market, Beruwala",
    bestTime: "Year-round",
    badge: "Unique Experience",
    image: image("/hero.png", "Gemstone market experience in Beruwala"),
    languages: [t("English"), t("Russian")],
    highlights: [
      "Live gem trading floor access",
      "Watch gem cutting and polishing",
      "Learn certification and buying basics"
    ],
    includes: ["Expert gem guide", "Transport on request"],
    excludes: ["Gem purchases", "Meals"],
    idealFor: ["Gem buyers", "Jewelry enthusiasts", "Curious travelers"]
  },
  {
    slug: "galle-fort-coastal-tour",
    title: "Galle Fort & Southern Coastal Day Tour",
    summary:
      "A layered southern-coast route with Galle Fort, a river safari, turtle conservation, beach time, cinnamon, and seafood.",
    longDescription:
      "This is southern Sri Lanka at its most varied: fort walls, estuary wildlife, ocean air, and coastal food culture.",
    duration: "Full Day",
    durationDays: 1,
    category: "coastal",
    difficulty: "easy",
    location: "Galle, Kosgoda & South Coast",
    bestTime: "November-April",
    badge: "UNESCO · Lunch Included",
    image: image("/galle.jpg", "Galle Fort lighthouse and southern coastline"),
    languages: [t("English"), t("Russian")],
    highlights: [
      "Explore UNESCO-listed Galle Fort",
      "Guided river safari through mangroves",
      "Sea turtle conservation visit"
    ],
    includes: ["Transport", "Entrance fees", "Lunch", "Guide"],
    excludes: ["Insurance", "Additional meals"],
    idealFor: ["History lovers", "Beach enthusiasts", "Families"]
  },
  {
    slug: "pearl-coastal-village-tour",
    title: "Pearl Tour - River, Turtles & Coastal Villages",
    summary:
      "A gentle coastal route through mangroves, turtle conservation, cinnamon gardens, local markets, and village life.",
    longDescription:
      "This is a softer-paced south-west coast day focused on mood, texture, and comfortable variety rather than a single headline stop.",
    duration: "Full Day",
    durationDays: 1,
    category: "coastal",
    difficulty: "easy",
    location: "West & South Coast",
    bestTime: "Year-round",
    image: image("/galle.jpg", "Mangrove river and coastal village tour in Sri Lanka"),
    languages: [t("English"), t("Russian")],
    highlights: [
      "River safari through mangrove waterways",
      "Sea turtle conservation stop",
      "Cinnamon plantation and village markets"
    ],
    includes: ["Transport", "Entrance fees", "Guide"],
    excludes: ["Meals", "Insurance"],
    idealFor: ["Families", "Seniors", "Culture lovers"]
  },
  {
    slug: "sri-lanka-dream-day-tour",
    title: "Sri Lanka Dream Day - Culture, Nature & Wildlife",
    summary:
      "A varied all-in-one day with temple, river safari, turtle stop, elephant encounter, cinnamon, gem mining, and seafood.",
    longDescription:
      "Built for guests who want broad variety in a single day, this route layers sea, jungle, spice, animal encounters, and local craft.",
    duration: "Full Day",
    durationDays: 1,
    category: "coastal",
    difficulty: "easy",
    location: "West Coast & Interior",
    bestTime: "Year-round",
    badge: "Best for First Timers",
    image: image("/hero.png", "Sri Lanka day tour with culture, wildlife, and coast"),
    languages: [t("English"), t("Russian")],
    highlights: [
      "Temple visit and river safari",
      "Sea turtle farm and beach time",
      "Elephant encounter and cinnamon stop"
    ],
    includes: ["Transport", "Entrance fees", "Lunch", "Guide"],
    excludes: ["Insurance", "Extra snacks and drinks"],
    idealFor: ["First-time visitors", "Groups", "Families"]
  },
  {
    slug: "ella-hill-country-adventure",
    title: "Ella Hill Country - Train, Hike & Waterfalls",
    summary:
      "Ride one of Sri Lanka's most scenic rail routes, cross Nine Arches Bridge, hike Little Adam's Peak, and finish with waterfalls and tea country.",
    longDescription:
      "Ella delivers the island's most photogenic hill-country atmosphere with movement, cool air, and iconic viewpoints.",
    duration: "Full Day",
    durationDays: 1,
    category: "hills",
    difficulty: "active",
    location: "Ella, Uva Province",
    bestTime: "December-April",
    badge: "Most Scenic",
    image: image("/ella.jpg", "Nine Arches Bridge and hill country in Ella"),
    languages: [t("English"), t("Russian")],
    highlights: [
      "Scenic train through the hill country",
      "Nine Arches Bridge and tea estate views",
      "Little Adam's Peak and Ravana Falls"
    ],
    includes: ["Transport", "Entrance fees", "Guide"],
    excludes: ["Train ticket", "Meals", "Insurance"],
    idealFor: ["Active couples", "Photography lovers", "Nature enthusiasts"]
  },
  {
    slug: "majestic-island-2-day-tour",
    title: "Majestic Island - Ella & Cultural Triangle",
    summary:
      "Two days that pair hill-country atmosphere with the Cultural Triangle's ancient icons, including Sigiriya, Dambulla, Nine Arches Bridge, and tea country.",
    longDescription:
      "A high-value multi-day route for guests who want scenic and historical signatures in one controlled itinerary.",
    duration: "2 Days / 1 Night",
    durationDays: 2,
    category: "multiday",
    difficulty: "moderate",
    location: "Ella + Sigiriya + Cultural Triangle",
    bestTime: "December-April",
    badge: "Hotel Included",
    featured: true,
    image: image("/sigiriya.jpg", "Sigiriya and hill-country multi-day tour"),
    languages: [t("English"), t("Russian")],
    highlights: [
      "Nine Arches Bridge and tea country",
      "Ambuluwawa and hill-country views",
      "Sigiriya and Dambulla on day two"
    ],
    includes: ["Transport", "Entrance fees", "Guide", "3-star hotel", "Dinner and breakfast"],
    excludes: ["Lunches", "Insurance", "Gratuities"],
    idealFor: ["Couples", "First-time visitors", "Photography travelers"]
  },
  {
    slug: "pearl-of-sri-lanka-2-day",
    title: "Pearl of Sri Lanka - Kandy, Hill Country & Ella",
    summary:
      "An overnight route through Kandy, tea country, Ella, gardens, elephants, mountain views, and classic hill-country experiences.",
    longDescription:
      "This itinerary stays focused on Sri Lanka's interior moods: gardens, forest edges, tea slopes, railway moments, and cooler mountain air.",
    duration: "2 Days / 1 Night",
    durationDays: 2,
    category: "multiday",
    difficulty: "moderate",
    location: "Kandy + Hill Country + Ella",
    bestTime: "Year-round",
    badge: "Hotel Included",
    image: image("/elephant.jpg", "Elephant and hill-country experience in Sri Lanka"),
    languages: [t("English"), t("Russian")],
    highlights: [
      "Elephant encounter and botanical gardens",
      "Tea country, tower views, and train moments",
      "Nine Arches Bridge and overnight stay"
    ],
    includes: ["Transport", "Entrance fees", "3-star hotel", "Dinner and breakfast"],
    excludes: ["Lunches", "Insurance"],
    idealFor: ["Families", "Nature lovers", "Wildlife enthusiasts"]
  },
  {
    slug: "sri-lankan-culture-experience-2-day",
    title: "Sri Lankan Culture Experience - 2 Days",
    summary:
      "A concentrated two-day cultural route spanning Sigiriya, Dambulla, Kandy, tea country, botanical gardens, and sacred sites.",
    longDescription:
      "Designed for travelers who do not want to choose between Sri Lanka's biggest cultural icons, this itinerary combines sacred cities and overnight comfort.",
    duration: "2 Days / 1 Night",
    durationDays: 2,
    category: "multiday",
    difficulty: "moderate",
    location: "Colombo Region + Kandy + Cultural Triangle",
    bestTime: "Year-round",
    badge: "Best Seller",
    featured: true,
    image: image("/kandy.jpg", "Kandy and Cultural Triangle two-day tour"),
    languages: [t("English"), t("Russian")],
    highlights: [
      "Sigiriya Rock Fortress and Dambulla",
      "Temple of the Tooth and botanical gardens",
      "Tea factory, gem museum, and elephant encounter"
    ],
    includes: ["Transport", "Entrance fees", "Guide", "3-star hotel", "Dinner and breakfast"],
    excludes: ["Lunches", "Insurance", "Gratuities"],
    idealFor: ["First-time visitors", "Groups", "Culture enthusiasts"]
  }
];

const docs = seeds.map((seed, index) => ({
  _id: `tourPackage.${seed.slug}`,
  _type: "tourPackage",
  title: t(seed.title),
  slug: { _type: "slug", current: seed.slug },
  summary: text(seed.summary),
  duration: t(seed.duration),
  durationDays: seed.durationDays,
  category: seed.category,
  difficulty: seed.difficulty,
  location: t(seed.location),
  bestTime: t(seed.bestTime),
  languages: seed.languages,
  badge: seed.badge ? t(seed.badge) : undefined,
  priceLabel: t("Price on request"),
  coverImage: seed.image,
  featured: seed.featured ?? index < 3,
  sortOrder: index,
  sections: sectionsFrom(seed),
  seoTitle: t(`${seed.title} | Ceylon Mega Tours`),
  seoDescription: text(`${seed.summary}\n\n${seed.longDescription}`),
  seoKeywords: {
    en: [seed.title, seed.location, "Sri Lanka tours"],
    ru: [seed.title, seed.location, "Sri Lanka tours"]
  }
}));

async function main() {
  const shouldWrite = process.argv.includes("--write");

  if (!shouldWrite) {
    process.stdout.write(`${JSON.stringify(docs, null, 2)}\n`);
    return;
  }

  if (!projectId || !dataset || !token) {
    throw new Error(
      "Missing Sanity env. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_WRITE_TOKEN."
    );
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false
  });

  for (const doc of docs) {
    await client.createOrReplace(doc);
    process.stdout.write(`Seeded ${doc._id}\n`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
