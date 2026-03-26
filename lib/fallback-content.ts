import type { HomepageData } from "@/lib/types";

export const fallbackHomepage: HomepageData = {
  header: {
    brand: "Ceylon Mega Tours",
    navigation: [
      { label: { en: "About", ru: "Обо мне" }, href: "#about" },
      { label: { en: "Explore", ru: "Открыть" }, href: "#explore" },
      { label: { en: "Reviews", ru: "Отзывы" }, href: "#reviews" },
      { label: { en: "Inquiry", ru: "Запрос" }, href: "#inquiry" }
    ],
    ctaLabel: { en: "WhatsApp Us", ru: "Написать в WhatsApp" }
  },
  hero: {
    eyebrow: {
      en: "Private Sri Lanka Travel",
      ru: "Частные путешествия по Шри-Ланке"
    },
    title: {
      en: "Premium island travel shaped around comfort, trust, and beautiful pacing.",
      ru: "Премиальные путешествия по острову, построенные вокруг комфорта, доверия и красивого ритма."
    },
    description: {
      en: "Private tours, airport pickup, and elegant transport for travelers who want Sri Lanka to feel seamless from arrival to departure.",
      ru: "Частные туры, трансферы из аэропорта и элегантный транспорт для тех, кто хочет, чтобы Шри-Ланка ощущалась безупречно с момента прилета до вылета."
    },
    primaryCta: { en: "Plan Your Journey", ru: "Спланировать поездку" },
    secondaryCta: { en: "Airport Pickup", ru: "Трансфер из аэропорта" },
    highlights: [
      { en: "Private tours only", ru: "Только частные туры" },
      { en: "English and Russian support", ru: "Поддержка на английском и русском" },
      { en: "Comfortable air-conditioned vehicles", ru: "Комфортный транспорт с кондиционером" }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1400&q=80",
      alt: {
        en: "Sri Lanka coastline at golden hour",
        ru: "Побережье Шри-Ланки в золотой час"
      }
    }
  },
  about: {
    eyebrow: { en: "About Me", ru: "Обо мне" },
    heading: {
      en: "A personal Sri Lanka travel service led with calm care and local knowledge.",
      ru: "Персональный сервис по Шри-Ланке с внимательным подходом и глубоким знанием острова."
    },
    intro: {
      en: "I help couples, families, and small groups travel Sri Lanka privately, comfortably, and without confusion.",
      ru: "Я помогаю парам, семьям и небольшим группам путешествовать по Шри-Ланке частно, комфортно и без лишних сложностей."
    },
    description: {
      en: "From airport arrival to scenic routes across the island, every detail is arranged with a friendly, reliable, tourism-focused service style. English and Russian communication stays clear from the first message onward.",
      ru: "От встречи в аэропорту до живописных маршрутов по острову каждая деталь организована в дружелюбном, надежном и туристически продуманном стиле. Общение на английском и русском остается понятным с первого сообщения."
    },
    image: {
      src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=80",
      alt: {
        en: "Friendly private guide on a scenic Sri Lanka route",
        ru: "Приветливый частный гид на живописном маршруте по Шри-Ланке"
      }
    },
    highlights: [
      { en: "Friendly private hosting", ru: "Дружелюбный частный сервис" },
      { en: "Flexible route planning", ru: "Гибкое планирование маршрута" },
      { en: "Comfort-first travel style", ru: "Комфортный стиль путешествия" }
    ],
    stats: [
      {
        value: { en: "Private only", ru: "Только частно" },
        label: { en: "No crowded shared touring", ru: "Без групповых туров" }
      },
      {
        value: { en: "EN / RU", ru: "EN / RU" },
        label: { en: "Bilingual support", ru: "Двухъязычная поддержка" }
      },
      {
        value: { en: "Islandwide", ru: "По всему острову" },
        label: { en: "Tours and transfers", ru: "Туры и трансферы" }
      }
    ]
  },
  trustPoints: [
    {
      id: "support",
      title: { en: "Bilingual guidance", ru: "Двухъязычное сопровождение" },
      description: {
        en: "Smooth communication from your first inquiry to your final drop-off.",
        ru: "Понятное общение от первого запроса до финального трансфера."
      }
    },
    {
      id: "punctuality",
      title: { en: "Reliable airport meetups", ru: "Надежная встреча в аэропорту" },
      description: {
        en: "Professional pickups timed carefully around your arrival.",
        ru: "Профессиональная встреча, аккуратно рассчитанная под ваш прилет."
      }
    },
    {
      id: "comfort",
      title: { en: "Premium transport", ru: "Премиальный транспорт" },
      description: {
        en: "Clean, air-conditioned vehicles for calm island travel.",
        ru: "Чистые автомобили с кондиционером для спокойных поездок по острову."
      }
    }
  ],
  services: {
    eyebrow: { en: "Core Services", ru: "Основные услуги" },
    heading: {
      en: "Everything arranged for a smooth Sri Lanka journey.",
      ru: "Все организовано для спокойного путешествия по Шри-Ланке."
    },
    intro: {
      en: "Private touring, airport support, and premium transport planned around your pace.",
      ru: "Частные туры, помощь с аэропортом и премиальный транспорт, организованные под ваш ритм."
    },
    items: [
      {
        id: "day-tours",
        title: { en: "Day Tours", ru: "Однодневные туры" },
        description: {
          en: "Private day routes covering coastlines, culture, wildlife, and tea country.",
          ru: "Частные однодневные маршруты по побережью, культурным местам, дикой природе и чайным регионам."
        },
        stats: { en: "Flexible timing", ru: "Гибкое время" },
        image: {
          src: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=900&q=80",
          alt: { en: "Sigiriya from above", ru: "Сигирия с высоты" }
        }
      },
      {
        id: "two-day-tours",
        title: { en: "2-Day / 1-Night Tours", ru: "2 дня / 1 ночь" },
        description: {
          en: "Compact premium routes with scenic pacing and overnight flexibility.",
          ru: "Компактные премиальные маршруты с красивым ритмом и удобной ночевкой."
        },
        stats: { en: "Short escapes", ru: "Короткие поездки" },
        image: {
          src: "https://images.unsplash.com/photo-1544739313-3b4e5a2b8e6d?auto=format&fit=crop&w=900&q=80",
          alt: { en: "Misty Sri Lanka hills", ru: "Туманные холмы Шри-Ланки" }
        }
      },
      {
        id: "airport-transfers",
        title: { en: "Airport Pickup / Drop", ru: "Встреча / трансфер в аэропорт" },
        description: {
          en: "Reliable private transfers for a smooth start or finish to your stay.",
          ru: "Надежные частные трансферы для легкого начала или завершения поездки."
        },
        stats: { en: "Arrival-ready", ru: "Готовность к прилету" },
        image: {
          src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
          alt: { en: "Palm-lined road in Sri Lanka", ru: "Дорога с пальмами на Шри-Ланке" }
        }
      }
    ]
  },
  destinations: {
    eyebrow: { en: "Island Highlights", ru: "Яркие места острова" },
    heading: {
      en: "Destinations that make every route feel rich and memorable.",
      ru: "Направления, которые делают каждый маршрут насыщенным и запоминающимся."
    },
    intro: {
      en: "Blend scenic beauty, heritage, and coastal ease across Sri Lanka.",
      ru: "Сочетайте живописную природу, наследие и отдых у моря по всей Шри-Ланке."
    },
    cards: [
      {
        id: "sigiriya",
        name: { en: "Sigiriya", ru: "Сигирия" },
        description: {
          en: "Ancient rock fortress views and cultural triangle depth.",
          ru: "Виды на древнюю скальную крепость и глубина культурного треугольника."
        }
      },
      {
        id: "ella",
        name: { en: "Ella", ru: "Элла" },
        description: {
          en: "Cool mountain air, tea country scenery, and relaxed pacing.",
          ru: "Прохладный горный воздух, чайные пейзажи и спокойный ритм."
        }
      },
      {
        id: "galle",
        name: { en: "Galle", ru: "Галле" },
        description: {
          en: "Historic fort charm with elegant southern coast atmosphere.",
          ru: "Атмосфера исторического форта и элегантное настроение южного побережья."
        }
      }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1200&q=80",
      alt: {
        en: "Tea plantations in Sri Lanka",
        ru: "Чайные плантации Шри-Ланки"
      }
    }
  },
  hybridShowcase: {
    eyebrow: { en: "Explore Sri Lanka", ru: "Откройте Шри-Ланку" },
    heading: {
      en: "Destinations worth seeing, with service options built for easy planning.",
      ru: "Направления, которые стоит увидеть, и сервис, который делает планирование легким."
    },
    intro: {
      en: "A premium mix of destination-led inspiration and practical touring support, designed to help travelers choose confidently.",
      ru: "Премиальное сочетание вдохновляющих направлений и практичных туристических услуг, чтобы путешественникам было легче выбирать."
    },
    primaryCta: { en: "Explore All Tours", ru: "Смотреть все туры" },
    secondaryCta: { en: "Start an Inquiry", ru: "Отправить запрос" },
    items: [
      {
        id: "sigiriya-showcase",
        kind: "destination",
        badge: { en: "Destination", ru: "Направление" },
        title: { en: "Sigiriya", ru: "Сигирия" },
        description: {
          en: "A striking cultural stop for travelers who want heritage, landscapes, and iconic views in one route.",
          ru: "Яркая культурная остановка для тех, кто хочет объединить наследие, пейзажи и знаковые виды в одном маршруте."
        },
        meta: { en: "Culture + Views", ru: "Культура + виды" },
        image: {
          src: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1000&q=80",
          alt: { en: "Sigiriya rock fortress", ru: "Скальная крепость Сигирия" }
        }
      },
      {
        id: "ella-showcase",
        kind: "destination",
        badge: { en: "Destination", ru: "Направление" },
        title: { en: "Ella", ru: "Элла" },
        description: {
          en: "Tea hills, scenic roads, and a cooler island mood perfect for a softer premium escape.",
          ru: "Чайные холмы, живописные дороги и более прохладное настроение острова для мягкого премиального отдыха."
        },
        meta: { en: "Tea Country", ru: "Чайный регион" },
        image: {
          src: "https://images.unsplash.com/photo-1544739313-3b4e5a2b8e6d?auto=format&fit=crop&w=1000&q=80",
          alt: { en: "Hills near Ella", ru: "Холмы рядом с Эллой" }
        }
      },
      {
        id: "galle-showcase",
        kind: "destination",
        badge: { en: "Destination", ru: "Направление" },
        title: { en: "Galle", ru: "Галле" },
        description: {
          en: "Fort walks, southern coast atmosphere, and a polished blend of history and seaside ease.",
          ru: "Прогулки по форту, атмосфера южного побережья и утонченное сочетание истории и отдыха у моря."
        },
        meta: { en: "South Coast", ru: "Южное побережье" },
        image: {
          src: "https://images.unsplash.com/photo-1526481280695-3c4691f1f23b?auto=format&fit=crop&w=1000&q=80",
          alt: { en: "Galle fort by the sea", ru: "Форт Галле у моря" }
        }
      },
      {
        id: "day-tours-showcase",
        kind: "service",
        badge: { en: "Service", ru: "Услуга" },
        title: { en: "Day Tours", ru: "Однодневные туры" },
        description: {
          en: "Ideal for travelers who want private discovery without committing to a longer route.",
          ru: "Идеально для тех, кто хочет частное знакомство с островом без длинного маршрута."
        },
        meta: { en: "Private + Flexible", ru: "Частно + гибко" },
        image: {
          src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=80",
          alt: { en: "Scenic road for day tours", ru: "Живописная дорога для однодневных туров" }
        }
      },
      {
        id: "overnight-showcase",
        kind: "service",
        badge: { en: "Service", ru: "Услуга" },
        title: { en: "2-Day / 1-Night Tours", ru: "2 дня / 1 ночь" },
        description: {
          en: "A smooth short-escape format combining scenery, comfort, and better pacing than a rushed day trip.",
          ru: "Комфортный формат короткой поездки, который сочетает красивые места, удобство и более спокойный ритм, чем спешный тур на день."
        },
        meta: { en: "Short Premium Escape", ru: "Короткий премиальный отдых" },
        image: {
          src: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1000&q=80",
          alt: { en: "Sri Lanka hills and tea estates", ru: "Холмы и чайные плантации Шри-Ланки" }
        }
      },
      {
        id: "airport-showcase",
        kind: "service",
        badge: { en: "Service", ru: "Услуга" },
        title: { en: "Airport Pickup / Drop", ru: "Встреча / трансфер в аэропорт" },
        description: {
          en: "For a calm start or finish, with reliable timing and private comfort built in.",
          ru: "Для спокойного начала или завершения поездки с надежным таймингом и приватным комфортом."
        },
        meta: { en: "Arrival Support", ru: "Поддержка по прилету" },
        image: {
          src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
          alt: { en: "Airport transfer route", ru: "Маршрут трансфера из аэропорта" }
        }
      }
    ]
  },
  whyChooseUs: {
    eyebrow: { en: "Why CMT", ru: "Почему CMT" },
    heading: {
      en: "A premium travel service built around people, not generic packages.",
      ru: "Премиальный туристический сервис, построенный вокруг людей, а не шаблонных пакетов."
    },
    intro: {
      en: "Every route can be adapted to your timing, interests, and comfort level while keeping service smooth and professional.",
      ru: "Каждый маршрут можно адаптировать под ваше время, интересы и уровень комфорта, сохраняя плавный и профессиональный сервис."
    },
    points: [
      {
        id: "tailored",
        title: { en: "Tailored planning", ru: "Индивидуальное планирование" },
        description: {
          en: "Routes are shaped around your travel rhythm instead of forcing rigid templates.",
          ru: "Маршруты строятся вокруг вашего ритма путешествия, а не жестких шаблонов."
        }
      },
      {
        id: "transparent",
        title: { en: "Clear communication", ru: "Понятная коммуникация" },
        description: {
          en: "Travelers know what to expect before arriving in Sri Lanka.",
          ru: "Путешественники заранее понимают, чего ожидать еще до прибытия на Шри-Ланку."
        }
      },
      {
        id: "calm",
        title: { en: "Calm execution", ru: "Спокойная организация" },
        description: {
          en: "From pickup to daily touring, the experience feels looked after and relaxed.",
          ru: "От встречи до ежедневных поездок все ощущается надежно, спокойно и продуманно."
        }
      }
    ]
  },
  tourPackages: {
    navLabel: { en: "Tour Packages", ru: "Турпакеты" },
    previewEyebrow: { en: "Featured Packages", ru: "Популярные пакеты" },
    previewHeading: {
      en: "Explore a few of our most requested Sri Lanka tour packages.",
      ru: "Ознакомьтесь с нашими самыми востребованными турпакетами по Шри-Ланке."
    },
    previewIntro: {
      en: "Start with a curated preview, then open the full collection for more routes and details.",
      ru: "Начните с короткой подборки, а затем откройте полную коллекцию маршрутов и деталей."
    },
    pageEyebrow: { en: "Tour Packages", ru: "Турпакеты" },
    pageHeading: {
      en: "Private Sri Lanka tour packages designed around comfort and flexibility.",
      ru: "Частные турпакеты по Шри-Ланке, созданные для комфорта и гибкости."
    },
    pageIntro: {
      en: "Browse the current collection and open each route directly from the menu. Every package can still be refined around your dates, pace, and group size.",
      ru: "Изучите текущую подборку и открывайте каждый маршрут прямо из меню. При этом любой пакет можно адаптировать под ваши даты, ритм и размер группы."
    },
    viewAllLabel: { en: "View All Tour Packages", ru: "Смотреть все турпакеты" },
    eyebrow: { en: "Tour Packages", ru: "Турпакеты" },
    heading: {
      en: "Curated island tour packages for couples, families, and small groups.",
      ru: "Продуманные турпакеты по острову для пар, семей и небольших групп."
    },
    intro: {
      en: "Use these as starting points for your private trip, then refine them around your dates and preferences.",
      ru: "Используйте эти маршруты как основу для частного путешествия, а затем адаптируйте их под ваши даты и предпочтения."
    },
    items: [
      {
        id: "coast-culture",
        title: { en: "Coast and Culture Escape", ru: "Побережье и культура" },
        description: {
          en: "A balanced route combining Colombo arrival, Galle charm, and southern beach time.",
          ru: "Сбалансированный маршрут с прилетом в Коломбо, атмосферой Галле и отдыхом на южных пляжах."
        },
        duration: { en: "4-5 days", ru: "4-5 дней" },
        image: {
          src: "https://images.unsplash.com/photo-1526481280695-3c4691f1f23b?auto=format&fit=crop&w=900&q=80",
          alt: { en: "Fort by the sea", ru: "Форт у моря" }
        }
      },
      {
        id: "tea-wildlife",
        title: { en: "Tea Hills and Wildlife", ru: "Чайные холмы и сафари" },
        description: {
          en: "Morning mists, mountain roads, and a private safari extension into the wild.",
          ru: "Утренние туманы, горные дороги и частное сафари в дикой природе."
        },
        duration: { en: "5-6 days", ru: "5-6 дней" },
        image: {
          src: "https://images.unsplash.com/photo-1544739313-3b4e5a2b8e6d?auto=format&fit=crop&w=900&q=80",
          alt: { en: "Misty mountain road", ru: "Туманная горная дорога" }
        }
      },
      {
        id: "family-highlights",
        title: { en: "Family Highlights Journey", ru: "Семейный маршрут" },
        description: {
          en: "Comfort-led travel with scenic stops, wildlife moments, and flexible timing for children.",
          ru: "Комфортное путешествие с красивыми остановками, встречами с природой и гибким графиком для семей с детьми."
        },
        duration: { en: "6-7 days", ru: "6-7 дней" },
        image: {
          src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
          alt: { en: "Scenic tropical road", ru: "Живописная тропическая дорога" }
        }
      }
    ]
  },
  gallery: {
    eyebrow: { en: "Travel Gallery", ru: "Галерея путешествий" },
    heading: {
      en: "A visual taste of island roads, coastal light, and curated Sri Lanka moments.",
      ru: "Визуальный вкус островных дорог, прибрежного света и продуманных моментов на Шри-Ланке."
    },
    intro: {
      en: "A premium collage of destinations, transport comfort, and tropical atmosphere across the island.",
      ru: "Премиальная фотоколлекция направлений, комфортных поездок и тропической атмосферы по всему острову."
    },
    items: [
      {
        id: "gallery-coast",
        title: { en: "Coastal Light", ru: "Прибрежный свет" },
        layout: "large",
        image: {
          src: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
          alt: { en: "Sri Lanka coast", ru: "Побережье Шри-Ланки" }
        }
      },
      {
        id: "gallery-road",
        title: { en: "Island Roads", ru: "Дороги острова" },
        layout: "tall",
        image: {
          src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80",
          alt: { en: "Road travel in Sri Lanka", ru: "Дорожное путешествие по Шри-Ланке" }
        }
      },
      {
        id: "gallery-tea",
        title: { en: "Tea Country", ru: "Чайный регион" },
        layout: "square",
        image: {
          src: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=900&q=80",
          alt: { en: "Tea plantations", ru: "Чайные плантации" }
        }
      },
      {
        id: "gallery-fort",
        title: { en: "Historic Forts", ru: "Исторические форты" },
        layout: "wide",
        image: {
          src: "https://images.unsplash.com/photo-1526481280695-3c4691f1f23b?auto=format&fit=crop&w=1200&q=80",
          alt: { en: "Fort near the sea", ru: "Форт у моря" }
        }
      },
      {
        id: "gallery-hills",
        title: { en: "Mountain Mists", ru: "Горные туманы" },
        layout: "square",
        image: {
          src: "https://images.unsplash.com/photo-1544739313-3b4e5a2b8e6d?auto=format&fit=crop&w=900&q=80",
          alt: { en: "Misty hills", ru: "Туманные холмы" }
        }
      },
      {
        id: "gallery-culture",
        title: { en: "Cultural Layers", ru: "Культурные места" },
        layout: "tall",
        image: {
          src: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=900&q=80",
          alt: { en: "Sri Lanka heritage site", ru: "Культурный объект Шри-Ланки" }
        }
      },
      {
        id: "gallery-tropics",
        title: { en: "Tropical Ease", ru: "Тропическое спокойствие" },
        layout: "wide",
        image: {
          src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
          alt: { en: "Palm roads", ru: "Пальмовые дороги" }
        }
      }
    ]
  },
  testimonials: {
    eyebrow: { en: "Guest Impressions", ru: "Отзывы гостей" },
    heading: {
      en: "Travelers remember how easy and well-paced the journey felt.",
      ru: "Путешественники запоминают, насколько легкой и хорошо продуманной ощущалась поездка."
    },
    intro: {
      en: "Designed for trust, punctuality, and thoughtful service from airport arrival onward.",
      ru: "Сервис построен на доверии, пунктуальности и внимательном сопровождении с момента прилета."
    },
    items: [
      {
        id: "anna",
        quote: {
          en: "From the airport pickup to our coastal tour, everything felt calm, polished, and personal.",
          ru: "От встречи в аэропорту до нашего тура по побережью все было спокойно, продуманно и очень персонально."
        },
        name: "Anna & Mikhail",
        location: { en: "Moscow", ru: "Москва" }
      },
      {
        id: "julia",
        quote: {
          en: "Perfect for our family. The car was comfortable, timings were smooth, and communication was excellent.",
          ru: "Идеально для нашей семьи. Машина была очень комфортной, все по времени, а коммуникация отличная."
        },
        name: "Julia Carter",
        location: { en: "London", ru: "Лондон" }
      },
      {
        id: "oliver",
        quote: {
          en: "A rare mix of luxury feeling and practical reliability. Exactly what we wanted in Sri Lanka.",
          ru: "Редкое сочетание ощущения люкса и практичной надежности. Именно то, что мы искали на Шри-Ланке."
        },
        name: "Oliver & Mae",
        location: { en: "Melbourne", ru: "Мельбурн" }
      }
    ]
  },
  inquiry: {
    eyebrow: { en: "Start Planning", ru: "Начните планировать" },
    heading: {
      en: "Tell us your dates and we will shape the journey around you.",
      ru: "Сообщите ваши даты, и мы подберем маршрут именно под вас."
    },
    intro: {
      en: "Share your arrival plan, travel style, and the experiences you want most. We will reply with a personalized suggestion.",
      ru: "Расскажите о дате прилета, стиле отдыха и желаемых впечатлениях. Мы ответим персональным предложением."
    },
    whatsappLabel: { en: "Chat on WhatsApp", ru: "Написать в WhatsApp" },
    whatsappHref: "https://wa.me/94770000000",
    contactNotes: [
      {
        en: "Ideal for airport transfers, custom day tours, and private multi-day routes.",
        ru: "Подходит для трансферов из аэропорта, индивидуальных туров и частных многодневных маршрутов."
      },
      {
        en: "Replies can be handled in English or Russian.",
        ru: "Ответ возможен на английском или русском языке."
      }
    ],
    serviceOptions: [
      { en: "Private Tour", ru: "Частный тур" },
      { en: "Airport Pickup", ru: "Трансфер из аэропорта" },
      { en: "Premium Transport", ru: "Премиальный транспорт" },
      { en: "Tour Package", ru: "Турпакет" }
    ],
    submitLabel: { en: "Send Inquiry", ru: "Отправить запрос" },
    successMessage: {
      en: "Thank you. Your request has been sent.",
      ru: "Спасибо. Ваш запрос отправлен."
    },
    errorMessage: {
      en: "Something went wrong. Please try again or message us on WhatsApp.",
      ru: "Что-то пошло не так. Попробуйте еще раз или напишите нам в WhatsApp."
    },
    labels: {
      name: { en: "Name", ru: "Имя" },
      contact: { en: "WhatsApp or phone", ru: "WhatsApp или телефон" },
      email: { en: "Email", ru: "Email" },
      arrivalDate: { en: "Arrival date", ru: "Дата прибытия" },
      groupSize: { en: "Group size", ru: "Количество гостей" },
      serviceType: { en: "Service type", ru: "Тип услуги" },
      message: { en: "Tell us about your trip", ru: "Расскажите о поездке" }
    }
  },
  footer: {
    description: {
      en: "Private Sri Lanka tours, airport pickup, and premium transport planned with tropical calm and professional care.",
      ru: "Частные туры по Шри-Ланке, встреча в аэропорту и премиальный транспорт с тропическим спокойствием и профессиональной заботой."
    },
    quickLinksHeading: { en: "Quick Links", ru: "Быстрые ссылки" },
    contactHeading: { en: "Contact", ru: "Контакты" },
    contactLines: [
      { en: "WhatsApp: +94 77 000 0000", ru: "WhatsApp: +94 77 000 0000" },
      { en: "Email: hello@ceylonmegatours.com", ru: "Email: hello@ceylonmegatours.com" },
      { en: "Based in Sri Lanka", ru: "Работаем по всей Шри-Ланке" }
    ],
    copyright: {
      en: "Ceylon Mega Tours. Crafted for premium island travel.",
      ru: "Ceylon Mega Tours. Создано для премиальных путешествий по острову."
    }
  }
};
