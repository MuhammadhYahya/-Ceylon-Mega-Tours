import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/contact";
import type { HomepageData, LocalizedImage, LocalizedString } from "@/lib/types";

const t = (en: string, ru: string): LocalizedString => ({ en, ru });

const image = (src: string, en: string, ru: string): LocalizedImage => ({
  src,
  alt: t(en, ru)
});

export const fallbackHomepage: HomepageData = {
  header: {
    brand: "Ceylon Mega Tours",
    navigation: [
      { label: t("About Me", "Обо мне"), href: "#about" },
      { label: t("Services", "Услуги"), href: "#services" },
      { label: t("Packages", "Пакеты"), href: "#packages" },
      { label: t("Destinations", "Направления"), href: "#destinations" },
      { label: t("Reviews", "Отзывы"), href: "#reviews" },
      { label: t("Enquiry", "Запрос"), href: "#inquiry" }
    ],
    ctaLabel: t("WhatsApp", "WhatsApp")
  },
  hero: {
    eyebrow: t(
      "Private Sri Lanka journeys for Russian-speaking guests",
      "Частные путешествия по Шри-Ланке для русскоязычных гостей"
    ),
    title: t(
      "Calm, reliable island travel with every detail planned around your comfort.",
      "Спокойные и надежные путешествия по острову, где каждая деталь продумана для вашего комфорта."
    ),
    description: t(
      "Ceylon Mega Tours creates private routes, airport pickups, and comfortable day plans for guests who want Sri Lanka to feel easy, safe, and beautifully organized.",
      "Ceylon Mega Tours организует частные маршруты, встречи в аэропорту и комфортные поездки для гостей, которые хотят увидеть Шри-Ланку легко, безопасно и без лишней суеты."
    ),
    primaryCta: t("Chat on WhatsApp", "Написать в WhatsApp"),
    secondaryCta: t("View Packages", "Смотреть пакеты"),
    highlights: [
      t("Russian-friendly communication", "Поддержка для русскоязычных гостей"),
      t("Private air-conditioned transport", "Частный транспорт с кондиционером"),
      t("Flexible routes across Sri Lanka", "Гибкие маршруты по всей Шри-Ланке")
    ],
    image: image(
      "/hero.png",
      "Sri Lanka coast at sunset",
      "Побережье Шри-Ланки на закате"
    )
  },
  about: {
    eyebrow: t("About Me", "Обо мне"),
    heading: t(
      "A personal guide service built on trust, clarity, and local knowledge.",
      "Персональный гид с акцентом на доверие, понятное общение и глубокое знание острова."
    ),
    intro: t(
      "I help couples, families, and small groups enjoy Sri Lanka without stress, rushed schedules, or confusing logistics.",
      "Я помогаю парам, семьям и небольшим группам путешествовать по Шри-Ланке без стресса, спешки и сложной логистики."
    ),
    description: t(
      "From your first message to your final transfer, the journey is arranged with a calm pace, reliable timing, and warm hospitality. Guests receive clear communication in English and support suitable for Russian travelers who value comfort and confidence.",
      "От первого сообщения до финального трансфера поездка выстраивается в спокойном ритме, с надежной организацией и внимательным сервисом. Гости получают понятную коммуникацию на английском и сопровождение, удобное для русскоязычных путешественников, которые ценят комфорт и уверенность."
    ),
    image: image(
      "/myPhoto.png",
      "Private tour guide in Sri Lanka",
      "Частный гид по Шри-Ланке"
    ),
    highlights: [
      t("Warm personal hosting", "Внимательный персональный подход"),
      t("Flexible day-by-day planning", "Гибкое планирование по дням"),
      t("Comfort-first travel style", "Комфортный стиль путешествия")
    ],
    stats: [
      {
        value: t("15+ years", "15+ лет"),
        label: t("Tourism and private guiding experience", "Опыт в туризме и частном сопровождении")
      },
      {
        value: t("EN / RU", "EN / RU"),
        label: t("Easy communication before arrival", "Понятная коммуникация еще до прилета")
      },
      {
        value: t("Islandwide", "По всему острову"),
        label: t("Tours, transfers, and tailored routes", "Туры, трансферы и индивидуальные маршруты")
      }
    ]
  },
  trustPoints: [
    {
      id: "clarity",
      title: t("Clear planning", "Понятное планирование"),
      description: t(
        "Guests know the route, timing, and pickup details in advance.",
        "Гости заранее понимают маршрут, время и детали встречи."
      )
    },
    {
      id: "comfort",
      title: t("Comfort first", "Комфорт на первом месте"),
      description: t(
        "Clean vehicles, realistic pacing, and smooth logistics throughout the trip.",
        "Чистый транспорт, комфортный ритм и продуманная логистика на всем маршруте."
      )
    },
    {
      id: "care",
      title: t("Personal care", "Личное внимание"),
      description: t(
        "Every route is adapted around your interests, group size, and arrival plan.",
        "Каждый маршрут подбирается под ваши интересы, размер группы и план прилета."
      )
    }
  ],
  services: {
    eyebrow: t("Highlighted Services", "Основные услуги"),
    heading: t(
      "Three core services designed to keep your trip simple and beautifully organized.",
      "Три ключевые услуги, которые делают поездку простой, спокойной и хорошо организованной."
    ),
    intro: t(
      "Each service is private, flexible, and shaped around comfort rather than rushed group travel.",
      "Каждая услуга организуется в частном формате, гибко и с акцентом на комфорт, а не на спешку групповых туров."
    ),
    items: [
      {
        id: "private-guided-tours",
        title: t("Private Guided Tours", "Частные экскурсии"),
        description: t(
          "Custom day tours and multi-day routes with scenic pacing, local insight, and personal attention.",
          "Индивидуальные однодневные и многодневные маршруты с красивым ритмом поездки, местным опытом и личным вниманием."
        ),
        stats: t("Custom routes", "Индивидуальные маршруты"),
        image: image(
          "/personalcare.jpg",
          "Sigiriya and cultural landscapes",
          "Сигирия и культурные пейзажи"
        )
      },
      {
        id: "airport-transfers",
        title: t("Airport Transfers", "Трансферы из аэропорта"),
        description: t(
          "Reliable pickup and drop-off service for a smooth first impression and a stress-free departure.",
          "Надежная встреча и трансфер для приятного начала поездки и спокойного завершения отдыха."
        ),
        stats: t("Arrival-ready", "Готово к прилету"),
        image: image(
          "/airport.png",
          "Palm road in Sri Lanka",
          "Пальмовая дорога на Шри-Ланке"
        )
      },
      {
        id: "premium-transport",
        title: t("Comfort Transport", "Комфортный транспорт"),
        description: t(
          "Private air-conditioned vehicle service for families, couples, and guests who want a calm travel pace.",
          "Частный транспорт с кондиционером для семей, пар и гостей, которым важен спокойный темп путешествия."
        ),
        stats: t("Private vehicle", "Частный автомобиль"),
        image: image(
          "/transport.jpg",
          "Scenic road trip in Sri Lanka",
          "Живописная поездка по дорогам Шри-Ланки"
        )
      }
    ]
  },
  destinations: {
    navLabel: t("Destinations", "Направления"),
    previewEyebrow: t("Popular Destinations", "Популярные направления"),
    previewHeading: t(
      "A refined shortlist of destinations guests ask for most.",
      "Подборка направлений, которые гости выбирают чаще всего."
    ),
    previewIntro: t(
      "Start with these island favorites, then open the full destinations page for more ideas.",
      "Начните с этих любимых мест, а затем откройте полную страницу направлений для новых идей."
    ),
    pageEyebrow: t("Destinations", "Направления"),
    pageHeading: t(
      "Explore the places that make Sri Lanka feel rich, calm, and memorable.",
      "Откройте для себя места, которые делают путешествие по Шри-Ланке насыщенным, спокойным и запоминающимся."
    ),
    pageIntro: t(
      "From cultural icons to tea country and the southern coast, each destination can be added to a route that matches your pace.",
      "От культурных символов до чайного региона и южного побережья: каждое направление можно включить в маршрут, который подходит именно вашему ритму."
    ),
    viewAllLabel: t("View More Destinations", "Смотреть все направления"),
    eyebrow: t("Destinations", "Направления"),
    heading: t(
      "Places chosen for beauty, variety, and a premium travel rhythm.",
      "Места, выбранные за красоту, разнообразие и комфортный ритм путешествия."
    ),
    intro: t(
      "These routes mix heritage, mountain scenery, wildlife, and elegant coastal time.",
      "Эти маршруты объединяют наследие, горные пейзажи, дикую природу и красивый отдых у моря."
    ),
    cards: [
      {
        id: "sigiriya",
        title: t("Sigiriya", "Сигирия"),
        description: t(
          "A striking cultural landmark with dramatic views and access to Sri Lanka's heritage heartland.",
          "Яркий культурный символ с впечатляющими видами и доступом к сердцу исторической Шри-Ланки."
        ),
        meta: t("Culture", "Культура"),
        image: image(
          "/sigiriya.jpg",
          "Sigiriya rock fortress",
          "Скальная крепость Сигирия"
        )
      },
      {
        id: "ella",
        title: t("Ella", "Элла"),
        description: t(
          "Tea country air, mountain views, and one of the island's most relaxing scenic regions.",
          "Свежий воздух чайного региона, горные виды и один из самых спокойных живописных уголков острова."
        ),
        meta: t("Tea Country", "Чайный регион"),
        image: image(
          "/ella destination.jpg",
          "Misty hills in Ella",
          "Туманные холмы Эллы"
        )
      },
      {
        id: "galle",
        title: t("Galle", "Галле"),
        description: t(
          "Historic fort walls, boutique charm, and graceful access to the southern coastline.",
          "Исторический форт, уютная атмосфера и элегантный выход к южному побережью."
        ),
        meta: t("Southern Coast", "Южное побережье"),
        image: image(
          "/galle.jpg",
          "Fort by the sea in Galle",
          "Форт у моря в Галле"
        )
      },
    ]
  },
  hybridShowcase: {
    eyebrow: t("Travel Style", "Стиль путешествия"),
    heading: t(
      "Elegant planning, local insight, and practical support in one service.",
      "Элегантное планирование, местный опыт и практичная поддержка в одном сервисе."
    ),
    intro: t(
      "A clear and compact approach for guests who want confidence before they arrive.",
      "Понятный и удобный подход для гостей, которым важна уверенность еще до прилета."
    ),
    primaryCta: t("Explore Packages", "Смотреть пакеты"),
    secondaryCta: t("Send Enquiry", "Отправить запрос"),
    items: [
      {
        id: "hybrid-sigiriya",
        kind: "destination",
        badge: t("Destination", "Направление"),
        title: t("Sigiriya", "Сигирия"),
        description: t(
          "A perfect stop for culture, architecture, and iconic island scenery.",
          "Идеальная остановка для тех, кто любит культуру, архитектуру и знаковые виды острова."
        ),
        meta: t("Culture + Views", "Культура + виды"),
        image: image(
          "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1200&q=80",
          "Sigiriya landscape",
          "Пейзаж Сигирии"
        )
      },
      {
        id: "hybrid-transfer",
        kind: "service",
        badge: t("Service", "Услуга"),
        title: t("Airport Pickup", "Встреча в аэропорту"),
        description: t(
          "Professional arrival support with clear timing and calm first-day logistics.",
          "Профессиональная встреча с понятным временем и спокойной организацией первого дня."
        ),
        meta: t("Smooth arrival", "Спокойный прилет"),
        image: image(
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
          "Road transfer in Sri Lanka",
          "Трансфер по дорогам Шри-Ланки"
        )
      }
    ]
  },
  whyChooseUs: {
    eyebrow: t("Why Guests Choose Us", "Почему выбирают нас"),
    heading: t(
      "A travel style that feels clear, respectful, and well-paced from day one.",
      "Формат путешествия, который с первого дня ощущается понятным, деликатным и хорошо продуманным."
    ),
    intro: t(
      "The goal is not to rush through Sri Lanka, but to enjoy it comfortably and confidently.",
      "Задача не в том, чтобы спешить по острову, а в том, чтобы увидеть его комфортно и уверенно."
    ),
    points: [
      {
        id: "point-1",
        title: t("Clear communication", "Понятное общение"),
        description: t(
          "Guests receive straightforward answers and a route that makes sense.",
          "Гости получают простые и понятные ответы, а также маршрут без путаницы."
        )
      },
      {
        id: "point-2",
        title: t("Premium simplicity", "Премиальная простота"),
        description: t(
          "Comfort and elegance without unnecessary complexity.",
          "Комфорт и элегантность без лишней сложности."
        )
      },
      {
        id: "point-3",
        title: t("Flexible planning", "Гибкое планирование"),
        description: t(
          "Routes can be adjusted around arrival time, weather, and travel preferences.",
          "Маршруты можно адаптировать под время прилета, погоду и личные пожелания."
        )
      }
    ]
  },
  tourPackages: {
    navLabel: t("Packages", "Пакеты"),
    previewEyebrow: t("Popular Packages", "Популярные пакеты"),
    previewHeading: t(
      "Private tour packages created as elegant starting points for your trip.",
      "Частные турпакеты, созданные как элегантная основа для вашего путешествия."
    ),
    previewIntro: t(
      "Browse three popular options on the homepage, then open the full collection for more routes.",
      "На главной странице представлены три популярных варианта, а полная подборка доступна на отдельной странице."
    ),
    pageEyebrow: t("Tour Packages", "Турпакеты"),
    pageHeading: t(
      "Flexible Sri Lanka packages for couples, families, and private small groups.",
      "Гибкие турпакеты по Шри-Ланке для пар, семей и небольших частных групп."
    ),
    pageIntro: t(
      "Each package is a polished base itinerary that can be adjusted around dates, pace, and preferred destinations.",
      "Каждый пакет — это продуманный базовый маршрут, который можно адаптировать под даты, ритм и выбранные места."
    ),
    viewAllLabel: t("View More Packages", "Смотреть все пакеты"),
    eyebrow: t("Tour Packages", "Турпакеты"),
    heading: t(
      "Thoughtful itineraries with enough structure to feel premium and enough flexibility to feel personal.",
      "Продуманные маршруты, в которых достаточно структуры для премиального впечатления и достаточно гибкости для личного комфорта."
    ),
    intro: t(
      "Use these itineraries as refined suggestions, then personalize them around your plans.",
      "Используйте эти маршруты как продуманные предложения и адаптируйте их под свои планы."
    ),
    items: [
      {
        id: "ella-one-day-tour",
        title: t("Ella Train and Highlands Tour", "Тур в Эллу и горный регион"),
        description: t(
          "A one-day Ella route with the train ride, Nine Arches Bridge, Little Adam's Peak, Ravana Ella waterfall, tea plantations, spice garden, and fruit market. From $100.",
          "Однодневный маршрут в Эллу: поездка на поезде, мост Девяти арок, Little Adam's Peak, водопад Ravana Ella, чайные плантации, сад специй и фруктовый рынок. От $100."
        ),
        duration: t("1 day", "1 день"),
        price: t("From $100", "От $100"),
        highlights: [
          t("Scenic train ride", "Живописная поездка на поезде"),
          t("Nine Arches Bridge in Ella", "Мост Девяти арок в Элле"),
          t("Little Adam's Peak hike", "Подъем на Little Adam's Peak"),
          t("Ravana Ella waterfall", "Водопад Ravana Ella"),
          t("Feed the monkeys", "Кормление обезьян"),
          t("Tea plantations", "Чайные плантации"),
          t("Spice garden", "Сад специй"),
          t("Fruit market", "Фруктовый рынок")
        ],
        includes: [
          t("Private transfer", "Частный трансфер"),
          t("Entrance tickets", "Входные билеты"),
          t("Russian-speaking guide", "Русскоговорящий гид")
        ],
        image: image(
          "/ella.jpg",
          "Ella day tour through the hill country",
          "Однодневный тур в Эллу по холмам чайного региона"
        )
      },
      {
        id: "kandy-one-day-tour",
        title: t("Kandy One-Day Tour", "Однодневный тур в Канди"),
        description: t(
          "A one-day Kandy route with an elephant feeding stop, Temple of the Tooth, Royal Botanic Garden, gem factory, Ayurvedic center, cinnamon, and tea plantation visits.",
          "Однодневный маршрут в Канди с остановкой у слонов и кормлением, Храмом Зуба Будды, Королевским ботаническим садом, фабрикой драгоценных камней, аюрведическим центром, корицей и чайной плантацией."
        ),
        duration: t("1 day", "1 день"),
        highlights: [
          t("Elephant visit and feeding", "Посещение слонов и кормление"),
          t("Temple of the Tooth", "Храм Зуба Будды"),
          t("Feed the monkeys", "Кормление обезьян"),
          t("Royal Botanic Garden", "Королевский ботанический сад"),
          t("Gem factory", "Фабрика драгоценных камней"),
          t("Ayurvedic center", "Аюрведический центр"),
          t("Cinnamon stop", "Остановка с корицей"),
          t("Tea plantation and factory", "Чайная плантация и фабрика")
        ],
        includes: [
          t("Private transfer", "Частный трансфер"),
          t("Entrance tickets", "Входные билеты"),
          t("Russian-speaking guide", "Русскоговорящий гид")
        ],
        image: image(
          "/kandy.jpg",
          "Kandy one-day tour through central Sri Lanka",
          "Однодневный тур в Канди по центральной Шри-Ланке"
        )
      },
      {
        id: "jungle-safari-yala",
        title: t("Jungle Safari", "Jungle Safari"),
        description: t(
          "One-day Yala safari in an open national park jeep with elephants, leopards, deer, buffalo, crocodiles, monkeys, peacocks, bears, flamingos, mongooses, and more. From $100.",
          "Однодневное сафари в Яле на открытом джипе по национальному парку: слоны, леопарды, олени, буйволы, крокодилы, обезьяны, павлины, медведи, фламинго, мангусты и другие животные. От $100."
        ),
        duration: t("1 day", "1 день"),
        price: t("From $100", "От $100"),
        highlights: [
          t("Safari in Yala National Park", "Сафари в национальном парке Яла"),
          t("Open jeep experience", "Поездка на открытом джипе"),
          t("Elephants and leopards", "Слоны и леопарды"),
          t("Deer and buffalo", "Олени и буйволы"),
          t("Crocodiles and monkeys", "Крокодилы и обезьяны"),
          t("Peacocks and flamingos", "Павлины и фламинго"),
          t("Bears, mongooses, and other animals", "Медведи, мангусты и другие животные")
        ],
        includes: [
          t("Safari jeep", "Сафари-джип"),
          t("Private transfer", "Частный трансфер"),
          t("All entrance fees", "Все входные билеты"),
          t("Russian-speaking guide", "Русскоговорящий гид")
        ],
        image: image(
          "/safari.jpg",
          "Yala safari through Sri Lanka wildlife",
          "Сафари в Яле среди дикой природы Шри-Ланки"
        )
      },
      {
        id: "pearl-of-sri-lanka",
        title: t("The Pearl of Sri Lanka", "The Pearl of Sri Lanka"),
        description: t(
          "A 1-night, 2-day route with elephant riding and feeding, Peradeniya Royal Botanic Garden, monkey feeding, the 9-arch bridge train ride, Ambuluwawa, tea country, waterfalls, Little Adam's Peak, and Nuwara Eliya. From $100.",
          "Маршрут на 1 ночь и 2 дня: катание и кормление слонов, Королевский ботанический сад Перадения, кормление обезьян, поездка к мосту 9 арок на поезде, Ambuluwawa, чайный регион, водопады, Little Adam's Peak и Нувара-Элия. От $100."
        ),
        duration: t("1 night / 2 days", "1 ночь / 2 дня"),
        price: t("From $100", "От $100"),
        highlights: [
          t("Elephant riding and feeding", "Катание на слонах и кормление"),
          t("Ayurvedic center and spice garden", "Аюрведический центр и сад специй"),
          t("Royal Botanic Garden, Peradeniya", "Королевский ботанический сад, Перадения"),
          t("Feed the monkeys", "Кормление обезьян"),
          t("9-arch bridge and train ride", "Мост 9 арок и поездка на поезде"),
          t("Ambuluwawa Tower and four religious temples", "Башня Ambuluwawa и четыре религиозных храма"),
          t("Tea factory and plantation", "Чайная фабрика и плантация"),
          t("Ravana waterfalls", "Водопады Ravana"),
          t("Little Adam's Peak hike", "Подъем на Little Adam's Peak"),
          t("Nuwara Eliya and Old English Post Office", "Нувара-Элия и старое английское почтовое отделение")
        ],
        includes: [
          t("Private transfer", "Частный трансфер"),
          t("Entrance tickets", "Входные билеты"),
          t("Accommodation in a 3-star hotel", "Проживание в 3-звездочном отеле"),
          t("Dinner and breakfast", "Ужин и завтрак")
        ],
        image: image(
          "/elephant.jpg",
          "Scenic hill country route across Sri Lanka",
          "Живописный маршрут по горному региону Шри-Ланки"
        )
      }
    ]
  },
  gallery: {
    eyebrow: t("Gallery", "Галерея"),
    heading: t("A few visual moments from the island.", "Несколько визуальных моментов с острова."),
    intro: t(
      "Used as lightweight fallback content when needed.",
      "Используется как дополнительный контент при необходимости."
    ),
    items: [
      {
        id: "gallery-1",
        title: t("Coast", "Побережье"),
        layout: "large",
        image: image(
          "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
          "Sri Lanka coast",
          "Побережье Шри-Ланки"
        )
      }
    ]
  },
  testimonials: {
    eyebrow: t("Customer Experience", "Опыт гостей"),
    heading: t(
      "Guests remember the trip for how easy, calm, and well cared for it felt.",
      "Гости запоминают поездку за то, насколько она была легкой, спокойной и продуманной."
    ),
    intro: t(
      "Short experiences that reflect trust, punctuality, and a premium but personal service style.",
      "Короткие истории, которые отражают доверие, пунктуальность и премиальный, но очень личный стиль сервиса."
    ),
    googleReviews: {
      rating: 5,
      reviewCount: 12,
      reviewsUrl: "https://share.google/dW50oraR7uWbp5IUQ",
      label: t("Google Business Profile", "Google Business Profile"),
      ctaLabel: t("Read reviews on Google", "Читать отзывы в Google"),
      sourceNote: t(
        "Based on Google Business Profile reviews.",
        "Основано на отзывах из Google Business Profile."
      )
    },
    items: [
      {
        id: "review-anna",
        quote: t(
          "Everything felt clear from the first WhatsApp message. The airport pickup was smooth, the car was comfortable, and the whole route felt safe and beautifully paced.",
          "С первого сообщения в WhatsApp все было очень понятно. Встреча в аэропорту прошла идеально, машина была комфортной, а весь маршрут ощущался безопасным и очень хорошо продуманным."
        ),
        name: "Anna & Mikhail",
        location: t("Moscow, Russia", "Москва, Россия"),
        trip: t("Private south coast trip", "Частная поездка по южному побережью"),
        rating: 5
      },
      {
        id: "review-irina",
        quote: t(
          "Perfect for our family. The schedule was flexible, the long drives never felt tiring, and we always knew what would happen next.",
          "Идеально для нашей семьи. График был гибким, длинные переезды не утомляли, и мы всегда понимали, что будет дальше."
        ),
        name: "Irina Petrova",
        location: t("Saint Petersburg, Russia", "Санкт-Петербург, Россия"),
        trip: t("Family highlights route", "Семейный маршрут по главным местам"),
        rating: 5
      },
      {
        id: "review-james",
        quote: t(
          "A rare balance of warmth and professionalism. We had the feeling of private care without any pressure or unnecessary complexity.",
          "Редкий баланс душевности и профессионализма. Мы чувствовали личную заботу без давления и без лишней сложности."
        ),
        name: "James & Elena",
        location: t("London, United Kingdom", "Лондон, Великобритания"),
        trip: t("Tea hills and coast package", "Пакет с чайным регионом и побережьем"),
        rating: 5
      }
    ]
  },
  inquiry: {
    eyebrow: t("Enquiry", "Запрос"),
    heading: t(
      "Tell us your dates and style of travel, and we will shape the route around you.",
      "Сообщите ваши даты и предпочтения, и мы подберем маршрут именно под вас."
    ),
    intro: t(
      "WhatsApp is the fastest way to start. You can also send the form if you want a more detailed proposal.",
      "Самый быстрый способ начать общение — WhatsApp. Также можно отправить форму, если вам нужен более подробный вариант маршрута."
    ),
    whatsappLabel: t("Start on WhatsApp", "Начать в WhatsApp"),
    whatsappHref: WHATSAPP_URL,
    contactNotes: [
      t(
        "Ideal for airport transfer requests, custom routes, and multi-day planning.",
        "Подходит для запросов на трансфер из аэропорта, индивидуальные маршруты и многодневные поездки."
      ),
      t(
        "Replies can be provided in English with support suited to Russian guests.",
        "Ответ можно получить на английском языке, при этом сервис адаптирован под русскоязычных гостей."
      )
    ],
    serviceOptions: [
      t("Private Tour", "Частный тур"),
      t("Airport Transfer", "Трансфер из аэропорта"),
      t("Tour Package", "Турпакет"),
      t("Transport Only", "Только транспорт")
    ],
    submitLabel: t("Send Enquiry", "Отправить запрос"),
    successMessage: t(
      "Thank you. Your request has been received.",
      "Спасибо. Ваш запрос успешно отправлен."
    ),
    errorMessage: t(
      "Something went wrong. Please try again or message us on WhatsApp.",
      "Что-то пошло не так. Попробуйте еще раз или напишите нам в WhatsApp."
    ),
    labels: {
      name: t("Name", "Имя"),
      contact: t("WhatsApp or phone", "WhatsApp или телефон"),
      email: t("Email", "Email"),
      arrivalDate: t("Arrival date", "Дата прибытия"),
      groupSize: t("Group size", "Количество гостей"),
      serviceType: t("Service type", "Тип услуги"),
      message: t("Tell us about your trip", "Расскажите о поездке")
    }
  },
  footer: {
    description: t(
      "Private Sri Lanka tours, airport pickups, and elegant transport for guests who value comfort, trust, and a calm travel rhythm.",
      "Частные туры по Шри-Ланке, встречи в аэропорту и комфортный транспорт для гостей, которые ценят доверие, спокойствие и высокий уровень сервиса."
    ),
    quickLinksHeading: t("Explore", "Навигация"),
    contactHeading: t("Contact", "Контакты"),
    contactLines: [
      t(`WhatsApp: ${WHATSAPP_DISPLAY}`, `WhatsApp: ${WHATSAPP_DISPLAY}`),
      t(`Email: ${CONTACT_EMAIL}`, `Email: ${CONTACT_EMAIL}`),
      t("Based in Sri Lanka", "Работаем по всей Шри-Ланке")
    ],
    copyright: t(
      "Ceylon Mega Tours. Private travel shaped with care.",
      "Ceylon Mega Tours. Частные путешествия, созданные с заботой."
    )
  }
};
