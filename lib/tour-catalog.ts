import type {
  LocalizedImage,
  LocalizedRichText,
  LocalizedString,
  TourPackageCategory,
  TourPackageDetail,
  TourPackageDifficulty,
  TourPackagePanelItem,
  TourPackageSection
} from "@/lib/types";

type TourSeedInput = {
  slug: string;
  title: string;
  summary: string;
  longDescription: string;
  duration: string;
  durationDays: number;
  location: string;
  category: TourPackageCategory;
  difficulty: TourPackageDifficulty;
  bestTime: string;
  badge?: string;
  featured?: boolean;
  priceLabel?: string;
  image: LocalizedImage;
  seoKeywords: string[];
  languages: string[];
  highlights: string[];
  includes: string[];
  excludes: string[];
  idealFor: string[];
};

export const TOUR_CATEGORY_META: Record<
  TourPackageCategory,
  {
    label: LocalizedString;
    color: string;
    softColor: string;
    heroLabel: LocalizedString;
  }
> = {
  adventure: {
    label: { en: "Adventure & Ocean", ru: "Adventure & Ocean" },
    color: "#1d6fa5",
    softColor: "#d7ecfb",
    heroLabel: { en: "Ocean Escapes", ru: "Ocean Escapes" }
  },
  wildlife: {
    label: { en: "Wildlife & Safari", ru: "Wildlife & Safari" },
    color: "#0f6e56",
    softColor: "#ddf3ec",
    heroLabel: { en: "Wild Encounters", ru: "Wild Encounters" }
  },
  cultural: {
    label: { en: "Cultural & Heritage", ru: "Cultural & Heritage" },
    color: "#8a5c1a",
    softColor: "#f9ecd8",
    heroLabel: { en: "Island Heritage", ru: "Island Heritage" }
  },
  coastal: {
    label: { en: "Coastal & River", ru: "Coastal & River" },
    color: "#9c3a1e",
    softColor: "#f8e5de",
    heroLabel: { en: "Coastal Rhythm", ru: "Coastal Rhythm" }
  },
  hills: {
    label: { en: "Hill Country & Ella", ru: "Hill Country & Ella" },
    color: "#5340a8",
    softColor: "#ece9fe",
    heroLabel: { en: "Highland Drama", ru: "Highland Drama" }
  },
  multiday: {
    label: { en: "Multi-Day Packages", ru: "Multi-Day Packages" },
    color: "#8f2448",
    softColor: "#f8e4eb",
    heroLabel: { en: "Longer Journeys", ru: "Longer Journeys" }
  }
};

export const DEFAULT_TOUR_CATEGORY_META = {
  label: { en: "Private Tour", ru: "Индивидуальный тур" },
  color: "#17363b",
  softColor: "#e4ebec",
  heroLabel: { en: "Tailored Journey", ru: "Индивидуальный маршрут" }
};

const localize = (value: string): LocalizedString => ({
  en: value,
  ru: value
});

const paragraphs = (...value: string[]): LocalizedRichText => ({
  en: value,
  ru: value
});

const image = (src: string, alt: string): LocalizedImage => ({
  src,
  alt: localize(alt)
});

const listItems = (items: string[]): TourPackagePanelItem[] =>
  items.map((item) => ({
    title: localize(item)
  }));

function buildSections(input: TourSeedInput): TourPackageSection[] {
  const sections: TourPackageSection[] = [
    {
      _type: "richTextSection",
      title: localize("Overview"),
      body: paragraphs(input.longDescription)
    },
    {
      _type: "highlightsSection",
      title: localize("What You'll Experience"),
      items: listItems(input.highlights)
    },
    {
      _type: "includesSection",
      title: localize("What's Included"),
      items: listItems(input.includes)
    },
    {
      _type: "excludesSection",
      title: localize("Not Included"),
      items: listItems(input.excludes)
    },
    {
      _type: "idealForSection",
      title: localize("Ideal For"),
      items: listItems(input.idealFor)
    }
  ];

  return sections;
}

function createTour(input: TourSeedInput, sortOrder: number): TourPackageDetail {
  return {
    slug: input.slug,
    title: localize(input.title),
    summary: localize(input.summary),
    duration: localize(input.duration),
    durationDays: input.durationDays,
    location: localize(input.location),
    category: input.category,
    difficulty: input.difficulty,
    bestTime: localize(input.bestTime),
    languages: input.languages.map(localize),
    badge: input.badge ? localize(input.badge) : undefined,
    image: input.image,
    priceLabel: input.priceLabel ? localize(input.priceLabel) : undefined,
    featured: input.featured ?? sortOrder < 3,
    sortOrder,
    sections: buildSections(input),
    seoTitle: localize(`${input.title} | Ceylon Mega Tours`),
    seoDescription: paragraphs(input.summary, input.longDescription),
    seoKeywords: {
      en: input.seoKeywords,
      ru: input.seoKeywords
    }
  };
}

export const TOUR_CATALOG_FALLBACK: TourPackageDetail[] = [
  createTour(
    {
      slug: "deep-sea-fishing-indian-ocean",
      title: "Deep Sea Fishing in the Indian Ocean",
      summary:
        "Venture into the open Indian Ocean for a thrilling deep-sea fishing adventure suitable for first-timers and seasoned anglers alike.",
      longDescription:
        "Depart from the Sri Lankan coast into some of Asia's richest open-ocean fishing grounds. Your fully equipped boat and experienced crew position you for big catches, while the pacing stays comfortable for beginners and exciting for serious anglers.",
      duration: "Half or Full Day",
      durationDays: 1,
      location: "Indian Ocean, Sri Lanka",
      category: "adventure",
      difficulty: "easy",
      bestTime: "November-April",
      badge: "Thrill-Seeker Pick",
      featured: true,
      image: image("/hero.png", "Sunrise over the Indian Ocean with a fishing boat"),
      seoKeywords: ["deep sea fishing Sri Lanka", "Indian Ocean fishing tour", "tuna fishing Sri Lanka"],
      languages: ["English", "Russian"],
      highlights: [
        "Fish in the open Indian Ocean aboard a fully equipped boat",
        "Possible catch includes tuna, grouper, barracuda, swordfish, marlin, and shark",
        "Suitable for complete beginners with crew guidance throughout",
        "Round-trip hotel transfer can be arranged"
      ],
      includes: ["Fishing equipment", "Experienced crew", "English or Russian guidance"],
      excludes: ["Meals", "Personal travel insurance", "Gratuities"],
      idealFor: ["Families", "Couples", "Adventure seekers", "Fishing enthusiasts"]
    },
    0
  ),
  createTour(
    {
      slug: "whale-watching-mirissa",
      title: "Whale Watching & Dolphin Safari - Mirissa",
      summary:
        "Set sail from Mirissa to encounter blue whales, spinner dolphins, sea turtles, and seabirds off Sri Lanka's golden southern coast.",
      longDescription:
        "Mirissa is one of the island's most celebrated wildlife departures. Morning light, calmer water, and an insured vessel help this trip feel premium and comfortable while still delivering a genuine wildlife encounter.",
      duration: "Half Day (Morning)",
      durationDays: 1,
      location: "Coconut Beach, Mirissa",
      category: "adventure",
      difficulty: "easy",
      bestTime: "November-April",
      badge: "Most Inclusive",
      featured: true,
      image: image("/hero.png", "Whale watching boat at sunrise near Mirissa"),
      seoKeywords: ["whale watching Mirissa", "blue whale Sri Lanka", "dolphin watching Sri Lanka"],
      languages: ["English", "Russian"],
      highlights: [
        "Blue whale and sperm whale sightings in their natural habitat",
        "Spinner dolphin pods and sea turtle encounters",
        "Traditional stilt fishing stop on the coast",
        "Seabird watching from the vessel",
        "Safety buoy and lifeguard service on board"
      ],
      includes: [
        "Round-trip transport",
        "Entrance fees",
        "Breakfast",
        "Tea and coffee",
        "Bottled water",
        "Fresh fruit",
        "Cool towels"
      ],
      excludes: ["Personal travel insurance", "Gratuities"],
      idealFor: ["Families", "Nature lovers", "Wildlife photographers", "Couples"]
    },
    1
  ),
  createTour(
    {
      slug: "yala-national-park-safari",
      title: "Yala National Park Jeep Safari",
      summary:
        "Sri Lanka's best-known wildlife reserve on an open jeep, famous for leopards, elephants, crocodiles, sloth bears, and dramatic golden-hour sightings.",
      longDescription:
        "Yala Block 1 consistently delivers some of the island's strongest safari moments. The route is built around prime animal activity times, with a guide who understands where patience, timing, and positioning matter most.",
      duration: "Full Day",
      durationDays: 1,
      location: "Yala National Park, Southern Province",
      category: "wildlife",
      difficulty: "easy",
      bestTime: "February-July",
      badge: "Best for Wildlife",
      featured: true,
      priceLabel: "Price on request",
      image: image("/safari.jpg", "Leopard safari in Yala National Park"),
      seoKeywords: ["Yala National Park safari", "leopard safari Sri Lanka", "wildlife tour Sri Lanka"],
      languages: ["English", "Russian"],
      highlights: [
        "Open jeep safari through Yala Block 1",
        "Look for elephants, leopards, sloth bears, crocodiles, deer, buffalo, and flamingos",
        "Golden-hour wildlife photography opportunities",
        "Naturalist-led route planning for better sightings"
      ],
      includes: ["Round-trip transport", "Safari jeep", "Park entrance fees", "English or Russian guide"],
      excludes: ["Meals", "Personal travel insurance", "Binoculars"],
      idealFor: ["Wildlife enthusiasts", "Photographers", "Families with older children"]
    },
    2
  ),
  createTour(
    {
      slug: "ella-yala-combo-tour",
      title: "Ella Hills & Yala Safari Combo",
      summary:
        "A full day that combines misty hill-country rail views, Nine Arches Bridge, Ravana Falls, and a late safari in Yala.",
      longDescription:
        "This route compresses two of Sri Lanka's strongest moods into one day: the cool drama of Ella and the raw wildlife atmosphere of Yala. It is ambitious, varied, and especially strong for travelers who want maximum contrast.",
      duration: "Full Day",
      durationDays: 1,
      location: "Ella Hills + Yala National Park",
      category: "wildlife",
      difficulty: "moderate",
      bestTime: "December-April",
      badge: "Top Combo",
      image: image("/ella.jpg", "Nine Arches Bridge and Yala safari combination tour"),
      seoKeywords: ["Ella Yala combo tour", "Nine Arches Bridge", "Ravana Falls tour"],
      languages: ["English", "Russian"],
      highlights: [
        "Scenic train experience through Ella hill country",
        "Visit Nine Arches Bridge and mountain viewpoints",
        "Stop at Ravana Falls and a tea plantation",
        "Late safari inside Yala National Park"
      ],
      includes: ["Round-trip transport", "Safari jeep", "All entrance fees", "English or Russian guide"],
      excludes: ["Meals", "Train ticket unless arranged", "Personal travel insurance"],
      idealFor: ["Active travelers", "Couples", "Photography enthusiasts"]
    },
    3
  ),
  createTour(
    {
      slug: "sigiriya-dambulla-day-tour",
      title: "Sigiriya Rock Fortress & Dambulla Cave Temple",
      summary:
        "Climb Sri Lanka's iconic Sigiriya Rock Fortress and continue to Dambulla's celebrated cave temple for a UNESCO-rich day in the Cultural Triangle.",
      longDescription:
        "This journey combines one of Asia's great ancient engineering feats with one of Sri Lanka's most atmospheric sacred sites. It works especially well for first-time visitors who want the island's most recognisable heritage in one confident day.",
      duration: "Full Day",
      durationDays: 1,
      location: "Cultural Triangle, North-Central Province",
      category: "cultural",
      difficulty: "moderate",
      bestTime: "Year-round",
      badge: "UNESCO",
      image: image("/sigiriya.jpg", "Sigiriya Rock Fortress above the jungle"),
      seoKeywords: ["Sigiriya day tour", "Dambulla cave temple", "UNESCO Sri Lanka tour"],
      languages: ["English", "Russian"],
      highlights: [
        "Climb Sigiriya Rock Fortress",
        "Explore Dambulla Golden Cave Temple",
        "Visit a spice garden and Ayurvedic stop",
        "Optional elephant observation and local craft stops"
      ],
      includes: ["Round-trip transport", "All entrance tickets", "English or Russian guide"],
      excludes: ["Meals", "Personal travel insurance"],
      idealFor: ["History lovers", "Couples", "First-time visitors"]
    },
    4
  ),
  createTour(
    {
      slug: "kandy-cultural-heritage-tour",
      title: "Kandy & the Last Kingdom Tour",
      summary:
        "Discover Sri Lanka's last royal capital through the Temple of the Tooth, Peradeniya gardens, gemstone heritage, tea country, and sacred city atmosphere.",
      longDescription:
        "Kandy blends devotional life, royal history, botanical beauty, and hill-country culture into one elegant day. The route is especially strong for guests who want culture without a punishing pace.",
      duration: "Full Day",
      durationDays: 1,
      location: "Kandy, Hill Country",
      category: "cultural",
      difficulty: "easy",
      bestTime: "Year-round",
      image: image("/kandy.jpg", "Temple of the Tooth and Kandy Lake"),
      seoKeywords: ["Kandy day tour", "Temple of the Tooth Sri Lanka", "Kandy cultural tour"],
      languages: ["English", "Russian"],
      highlights: [
        "Temple of the Sacred Tooth Relic",
        "Royal Botanic Gardens, Peradeniya",
        "Tea factory and plantation stop",
        "Gemstone workshop and Ayurvedic center"
      ],
      includes: ["Round-trip transport", "All entrance tickets", "English or Russian guide"],
      excludes: ["Meals", "Personal travel insurance"],
      idealFor: ["Culture enthusiasts", "Couples", "Spiritual travelers"]
    },
    5
  ),
  createTour(
    {
      slug: "gemstone-market-beruwala",
      title: "Sri Lanka Gemstone Market - Beruwala",
      summary:
        "Step inside a live gemstone trading floor, watch craftsmen at work, and explore Sri Lanka's sapphire legacy with expert guidance.",
      longDescription:
        "Beruwala offers something rare: not a showroom simulation, but a working commercial gem environment. This makes it a strong specialty trip for buyers and curious travelers alike.",
      duration: "Half Day",
      durationDays: 1,
      location: "BITMA Gem Market, Beruwala",
      category: "cultural",
      difficulty: "easy",
      bestTime: "Year-round",
      badge: "Unique Experience",
      image: image("/hero.png", "Gemstone market experience in Beruwala"),
      seoKeywords: ["Sri Lanka gem market", "buy sapphires Sri Lanka", "Ceylon gems authentic"],
      languages: ["English", "Russian"],
      highlights: [
        "Live gem trading floor access",
        "Watch gem cutting and polishing",
        "Understand certification and safe buying practices",
        "Meet traders and see the commercial side of Ceylon gems"
      ],
      includes: ["Expert gem guide", "Transport on request"],
      excludes: ["Gemstone purchases", "Meals"],
      idealFor: ["Gem buyers", "Jewelry enthusiasts", "Curious travelers"]
    },
    6
  ),
  createTour(
    {
      slug: "galle-fort-coastal-tour",
      title: "Galle Fort & Southern Coastal Day Tour",
      summary:
        "A layered southern-coast route with Galle Fort, a river safari, turtle conservation, beach time, cinnamon, moonstone, and seafood.",
      longDescription:
        "This is southern Sri Lanka at its most varied: fort walls, estuary wildlife, conservation stops, ocean air, and coastal food culture. It works well for travelers who want heritage and leisure in the same day.",
      duration: "Full Day",
      durationDays: 1,
      location: "Galle, Kosgoda & South Coast",
      category: "coastal",
      difficulty: "easy",
      bestTime: "November-April",
      badge: "UNESCO · Lunch Included",
      image: image("/galle.jpg", "Galle Fort lighthouse and southern coastline"),
      seoKeywords: ["Galle Fort tour", "Sri Lanka river safari", "southern coast tour Sri Lanka"],
      languages: ["English", "Russian"],
      highlights: [
        "Explore UNESCO-listed Galle Fort",
        "Take a guided river safari through mangroves",
        "Visit a sea turtle conservation farm",
        "Enjoy a seafood lunch and coastal village stops"
      ],
      includes: ["Round-trip transport", "All entrance fees", "Lunch", "English or Russian guide"],
      excludes: ["Personal travel insurance", "Additional meals"],
      idealFor: ["History lovers", "Couples", "Beach enthusiasts", "Families"]
    },
    7
  ),
  createTour(
    {
      slug: "pearl-coastal-village-tour",
      title: "Pearl Tour - River, Turtles & Coastal Villages",
      summary:
        "A gentler coastal route through mangroves, turtle conservation, cinnamon gardens, local markets, and village life.",
      longDescription:
        "This day is less about one headline stop and more about a warm, steady progression through the textures of the south-west coast. It is particularly comfortable for families and slower-paced travelers.",
      duration: "Full Day",
      durationDays: 1,
      location: "West & South Coast",
      category: "coastal",
      difficulty: "easy",
      bestTime: "Year-round",
      image: image("/galle.jpg", "Mangrove river and coastal village tour in Sri Lanka"),
      seoKeywords: ["Sri Lanka coastal tour", "river safari Sri Lanka", "turtle farm Sri Lanka"],
      languages: ["English", "Russian"],
      highlights: [
        "Guided river safari through mangrove waterways",
        "Sea turtle conservation farm visit",
        "Cinnamon plantation and local market stops",
        "Temple and village encounters along the route"
      ],
      includes: ["Round-trip transport", "All entrance fees", "English or Russian guide"],
      excludes: ["Meals", "Personal travel insurance"],
      idealFor: ["Families with young children", "Seniors", "Culture lovers"]
    },
    8
  ),
  createTour(
    {
      slug: "sri-lanka-dream-day-tour",
      title: "Sri Lanka Dream Day - Culture, Nature & Wildlife",
      summary:
        "A varied all-in-one day with temple, river safari, turtle stop, elephant encounter, cinnamon, gem mining, and seafood.",
      longDescription:
        "Built for guests who want broad variety in a single day, this route layers sea, jungle, spice, animal encounters, and local craft without turning the experience into a rushed checklist.",
      duration: "Full Day",
      durationDays: 1,
      location: "West Coast & Interior",
      category: "coastal",
      difficulty: "easy",
      bestTime: "Year-round",
      badge: "Best for First Timers",
      image: image("/hero.png", "Sri Lanka day tour with culture, wildlife, and coast"),
      seoKeywords: ["best day tour Sri Lanka", "Sri Lanka one day itinerary", "all-inclusive Sri Lanka tour"],
      languages: ["English", "Russian"],
      highlights: [
        "Temple visit and guided river safari",
        "Sea turtle farm and beach swim opportunity",
        "Elephant feeding encounter",
        "Cinnamon garden, gem site, and seafood lunch"
      ],
      includes: ["Round-trip transport", "All entrance fees", "Lunch", "English or Russian guide"],
      excludes: ["Personal travel insurance", "Additional snacks and drinks"],
      idealFor: ["First-time visitors", "Groups", "Families wanting variety"]
    },
    9
  ),
  createTour(
    {
      slug: "ella-hill-country-adventure",
      title: "Ella Hill Country - Train, Hike & Waterfalls",
      summary:
        "Ride one of Sri Lanka's most scenic rail routes, cross Nine Arches Bridge, hike Little Adam's Peak, and finish with waterfalls and tea country.",
      longDescription:
        "Ella delivers the island's most photogenic hill-country atmosphere. This route is active but balanced, combining movement, cool air, and iconic viewpoints with enough flexibility to keep it enjoyable.",
      duration: "Full Day",
      durationDays: 1,
      location: "Ella, Uva Province",
      category: "hills",
      difficulty: "active",
      bestTime: "December-April",
      badge: "Most Scenic",
      image: image("/ella.jpg", "Nine Arches Bridge and hill country in Ella"),
      seoKeywords: ["Ella day tour", "Nine Arches Bridge Sri Lanka", "Little Adams Peak hike"],
      languages: ["English", "Russian"],
      highlights: [
        "Scenic train through the hill country",
        "Nine Arches Bridge and tea estate views",
        "Little Adam's Peak hike",
        "Ravana Falls and tea factory stop"
      ],
      includes: ["Round-trip transport", "All entrance fees", "English or Russian guide"],
      excludes: ["Train ticket unless arranged", "Meals", "Personal travel insurance"],
      idealFor: ["Active couples", "Photography lovers", "Nature enthusiasts"]
    },
    10
  ),
  createTour(
    {
      slug: "majestic-island-2-day-tour",
      title: "Majestic Island - Ella & Cultural Triangle",
      summary:
        "Two days that pair hill-country atmosphere with the Cultural Triangle's ancient icons, including Sigiriya, Dambulla, Nine Arches Bridge, and tea country.",
      longDescription:
        "This is a high-value multi-day route for guests who want Sri Lanka's scenic and historical signatures in one controlled itinerary. The overnight stop lets the experience stay polished rather than rushed.",
      duration: "2 Days / 1 Night",
      durationDays: 2,
      location: "Ella + Sigiriya + Cultural Triangle",
      category: "multiday",
      difficulty: "moderate",
      bestTime: "December-April",
      badge: "Hotel Included",
      featured: true,
      image: image("/sigiriya.jpg", "Sigiriya and hill-country multi-day tour"),
      seoKeywords: ["2 day Sri Lanka tour", "Ella Sigiriya 2 days", "Sri Lanka overnight tour"],
      languages: ["English", "Russian"],
      highlights: [
        "Nine Arches Bridge, train views, and Little Adam's Peak",
        "Tea country and Ambuluwawa stop",
        "Sigiriya Rock Fortress and Dambulla Cave Temple",
        "Overnight stay with dinner and breakfast"
      ],
      includes: [
        "Round-trip transport",
        "All entrance fees",
        "English or Russian guide",
        "3-star hotel accommodation",
        "Dinner and breakfast"
      ],
      excludes: ["Lunches", "Personal travel insurance", "Gratuities"],
      idealFor: ["Couples", "First-time visitors", "Photography travelers"]
    },
    11
  ),
  createTour(
    {
      slug: "pearl-of-sri-lanka-2-day",
      title: "Pearl of Sri Lanka - Kandy, Hill Country & Ella",
      summary:
        "An overnight route through Kandy, tea country, Ella, gardens, elephants, mountain views, and classic hill-country experiences.",
      longDescription:
        "This itinerary keeps the focus on Sri Lanka's interior moods: gardens, forest edges, tea slopes, railway moments, and cooler mountain air. It suits travelers who want a gentler overnight journey with lots of scenery.",
      duration: "2 Days / 1 Night",
      durationDays: 2,
      location: "Kandy + Hill Country + Ella",
      category: "multiday",
      difficulty: "moderate",
      bestTime: "Year-round",
      badge: "Hotel Included",
      image: image("/elephant.jpg", "Elephant and hill-country experience in Sri Lanka"),
      seoKeywords: ["Kandy Ella 2 day tour", "elephant ride Sri Lanka", "hill country tour"],
      languages: ["English", "Russian"],
      highlights: [
        "Elephant encounter and Royal Botanical Gardens",
        "Ambuluwawa Tower and tea country views",
        "Nine Arches Bridge and Little Adam's Peak",
        "Ravana Falls and overnight accommodation"
      ],
      includes: ["Round-trip transport", "All entrance fees", "3-star hotel", "Dinner and breakfast"],
      excludes: ["Lunches", "Personal travel insurance"],
      idealFor: ["Families", "Nature lovers", "Wildlife enthusiasts"]
    },
    12
  ),
  createTour(
    {
      slug: "sri-lankan-culture-experience-2-day",
      title: "Sri Lankan Culture Experience - 2 Days",
      summary:
        "A concentrated two-day cultural route spanning Sigiriya, Dambulla, Kandy, tea country, botanical gardens, and sacred sites.",
      longDescription:
        "Designed for travelers who do not want to choose between Sri Lanka's biggest cultural icons, this itinerary combines sacred cities, UNESCO landmarks, botanical beauty, and overnight comfort in a clear production-ready structure.",
      duration: "2 Days / 1 Night",
      durationDays: 2,
      location: "Colombo Region + Kandy + Cultural Triangle",
      category: "multiday",
      difficulty: "moderate",
      bestTime: "Year-round",
      badge: "Best Seller",
      featured: true,
      image: image("/kandy.jpg", "Kandy and Cultural Triangle two-day tour"),
      seoKeywords: ["Sri Lanka culture tour 2 days", "Sigiriya Kandy tour", "best Sri Lanka tour package"],
      languages: ["English", "Russian"],
      highlights: [
        "Sigiriya Rock Fortress and Dambulla Cave Temple",
        "Temple of the Sacred Tooth Relic",
        "Royal Botanical Gardens and tea factory",
        "Gem museum, spice garden, and elephant encounter"
      ],
      includes: [
        "Round-trip transport",
        "All entrance fees",
        "English or Russian guide",
        "3-star hotel",
        "Dinner and breakfast"
      ],
      excludes: ["Lunches", "Personal travel insurance", "Gratuities"],
      idealFor: ["First-time visitors", "Groups", "Culture enthusiasts"]
    },
    13
  )
];
