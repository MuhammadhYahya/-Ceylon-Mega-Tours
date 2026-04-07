const makePlacesSection = (items) => ({
  _type: "placesSection",
  title: {
    en: "Places you'll visit",
    ru: "Mesta, kotorye vy posetite"
  },
  items: items.map((item) => ({
    place: item
  }))
});

const makeAccommodationSection = (items) => ({
  _type: "accommodationSection",
  title: {
    en: "Where you'll stay",
    ru: "Gde vy ostanovites"
  },
  items: items.map((item) => ({
    hotel: item.hotel,
    description: item.description
  }))
});

const docs = [
  {
    _id: "tourPackage.ella-one-day-tour",
    _type: "tourPackage",
    title: { en: "Ella Train and Highlands Tour", ru: "Tur v Ellu i gornyy region" },
    slug: { _type: "slug", current: "ella-one-day-tour" },
    summary: {
      en: "A one-day Ella route with the train ride, Nine Arches Bridge, Little Adam's Peak, Ravana Ella waterfall, tea plantations, spice garden, and fruit market. From $100.",
      ru: "Odnodnevnyy marshrut v Ellu: poezdka na poezde, most Devyati arok, Little Adam's Peak, vodopad Ravana Ella, chaynye plantatsii, sad spetsiy i fruktovyy rynok. Ot $100."
    },
    duration: { en: "1 day", ru: "1 den" },
    priceLabel: { en: "From $100", ru: "Ot $100" },
    coverImage: {
      fallbackSrc: "/ella.jpg",
      alt: {
        en: "Ella day tour through the hill country",
        ru: "Odnodnevnyy tur v Ellu po kholmam chaynogo regiona"
      }
    },
    featured: true,
    sortOrder: 0,
    sections: [
      makePlacesSection([
        { en: "Scenic train ride", ru: "Zhivopisnaya poezdka na poezde" },
        { en: "Nine Arches Bridge in Ella", ru: "Most Devyati arok v Elle" },
        { en: "Little Adam's Peak hike", ru: "Podyem na Little Adam's Peak" },
        { en: "Ravana Ella waterfall", ru: "Vodopad Ravana Ella" },
        { en: "Feed the monkeys", ru: "Kormlenie obezyan" },
        { en: "Tea plantations", ru: "Chaynye plantatsii" },
        { en: "Spice garden", ru: "Sad spetsiy" },
        { en: "Fruit market", ru: "Fruktovyy rynok" }
      ])
    ]
  },
  {
    _id: "tourPackage.kandy-one-day-tour",
    _type: "tourPackage",
    title: { en: "Kandy One-Day Tour", ru: "Odnodnevnyy tur v Kandi" },
    slug: { _type: "slug", current: "kandy-one-day-tour" },
    summary: {
      en: "A one-day Kandy route with an elephant feeding stop, Temple of the Tooth, Royal Botanic Garden, gem factory, Ayurvedic center, cinnamon, and tea plantation visits.",
      ru: "Odnodnevnyy marshrut v Kandi s ostanovkoy u slonov i kormleniem, Khramom Zuba Buddy, Korolevskim botanicheskim sadom, fabrikoy dragotsennykh kamney, ayurvedicheskim tsentrom, koritsey i chaynoy plantatsiey."
    },
    duration: { en: "1 day", ru: "1 den" },
    coverImage: {
      fallbackSrc: "/kandy.jpg",
      alt: {
        en: "Kandy one-day tour through central Sri Lanka",
        ru: "Odnodnevnyy tur v Kandi po tsentralnoy Shri-Lanke"
      }
    },
    featured: true,
    sortOrder: 1,
    sections: [
      makePlacesSection([
        { en: "Elephant visit and feeding", ru: "Poseshchenie slonov i kormlenie" },
        { en: "Temple of the Tooth", ru: "Khram Zuba Buddy" },
        { en: "Feed the monkeys", ru: "Kormlenie obezyan" },
        { en: "Royal Botanic Garden", ru: "Korolevskiy botanicheskiy sad" },
        { en: "Gem factory", ru: "Fabrika dragotsennykh kamney" },
        { en: "Ayurvedic center", ru: "Ayurvedicheskiy tsentr" },
        { en: "Cinnamon stop", ru: "Ostanovka s koritsey" },
        { en: "Tea plantation and factory", ru: "Chaynaya plantatsiya i fabrika" }
      ])
    ]
  },
  {
    _id: "tourPackage.jungle-safari-yala",
    _type: "tourPackage",
    title: { en: "Jungle Safari", ru: "Jungle Safari" },
    slug: { _type: "slug", current: "jungle-safari-yala" },
    summary: {
      en: "One-day Yala safari in an open national park jeep with elephants, leopards, deer, buffalo, crocodiles, monkeys, peacocks, bears, flamingos, mongooses, and more. From $100.",
      ru: "Odnodnevnoe safari v Yale na otkrytom dzhipe po natsionalnomu parku: slony, leopardy, oleni, buyvoly, krokodily, obezyany, pavliny, medvedi, flamingo, mangusty i drugie zhivotnye. Ot $100."
    },
    duration: { en: "1 day", ru: "1 den" },
    priceLabel: { en: "From $100", ru: "Ot $100" },
    coverImage: {
      fallbackSrc: "/safari.jpg",
      alt: {
        en: "Yala safari through Sri Lanka wildlife",
        ru: "Safari v Yale sredi dikoy prirody Shri-Lanki"
      }
    },
    featured: true,
    sortOrder: 2,
    sections: [
      makePlacesSection([
        { en: "Safari in Yala National Park", ru: "Safari v natsionalnom parke Yala" },
        { en: "Open jeep experience", ru: "Poezdka na otkrytom dzhipe" },
        { en: "Elephants and leopards", ru: "Slony i leopardy" },
        { en: "Deer and buffalo", ru: "Oleni i buyvoly" },
        { en: "Crocodiles and monkeys", ru: "Krokodily i obezyany" },
        { en: "Peacocks and flamingos", ru: "Pavliny i flamingo" },
        { en: "Bears, mongooses, and other animals", ru: "Medvedi, mangusty i drugie zhivotnye" }
      ])
    ]
  },
  {
    _id: "tourPackage.pearl-of-sri-lanka",
    _type: "tourPackage",
    title: { en: "The Pearl of Sri Lanka", ru: "The Pearl of Sri Lanka" },
    slug: { _type: "slug", current: "pearl-of-sri-lanka" },
    summary: {
      en: "A 1-night, 2-day route with elephant riding and feeding, Peradeniya Royal Botanic Garden, monkey feeding, the 9-arch bridge train ride, Ambuluwawa, tea country, waterfalls, Little Adam's Peak, and Nuwara Eliya. From $100.",
      ru: "Marshrut na 1 noch i 2 dnya: katanie i kormlenie slonov, Korolevskiy botanicheskiy sad Peradeniya, kormlenie obezyan, poezdka k mostu 9 arok na poezde, Ambuluwawa, chaynyy region, vodopady, Little Adam's Peak i Nuvara-Eliya. Ot $100."
    },
    duration: { en: "1 night / 2 days", ru: "1 noch / 2 dnya" },
    priceLabel: { en: "From $100", ru: "Ot $100" },
    coverImage: {
      fallbackSrc: "/elephant.jpg",
      alt: {
        en: "Scenic hill country route across Sri Lanka",
        ru: "Zhivopisnyy marshrut po gornomu regionu Shri-Lanki"
      }
    },
    featured: false,
    sortOrder: 3,
    sections: [
      makePlacesSection([
        { en: "Elephant riding and feeding", ru: "Katanie na slonakh i kormlenie" },
        { en: "Ayurvedic center and spice garden", ru: "Ayurvedicheskiy tsentr i sad spetsiy" },
        { en: "Royal Botanic Garden, Peradeniya", ru: "Korolevskiy botanicheskiy sad, Peradeniya" },
        { en: "Feed the monkeys", ru: "Kormlenie obezyan" },
        { en: "9-arch bridge and train ride", ru: "Most 9 arok i poezdka na poezde" },
        { en: "Ambuluwawa Tower and four religious temples", ru: "Bashnya Ambuluwawa i chetyre religioznykh khrama" },
        { en: "Tea factory and plantation", ru: "Chaynaya fabrika i plantatsiya" },
        { en: "Ravana waterfalls", ru: "Vodopady Ravana" },
        { en: "Little Adam's Peak hike", ru: "Podyem na Little Adam's Peak" },
        { en: "Nuwara Eliya and Old English Post Office", ru: "Nuvara-Eliya i staroe angliyskoe pochtovoe otdelenie" }
      ]),
      makeAccommodationSection([
        {
          hotel: {
            en: "3-star hill country hotel",
            ru: "3-zvezdochnyy otel v gornom regione"
          },
          description: {
            en: "A comfortable overnight stay near the hill-country route with dinner and breakfast included.",
            ru: "Komfortnaya nochleg v gornom regione po marshrutu s vklyuchennymi uzhinom i zavtrakom."
          }
        }
      ])
    ]
  }
];

process.stdout.write(`${JSON.stringify(docs, null, 2)}\n`);
