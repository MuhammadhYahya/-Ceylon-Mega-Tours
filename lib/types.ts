export type LocalizedString = {
  en: string;
  ru: string;
};

export type LocalizedValue = LocalizedString;

export type LocalizedRichText = {
  en: string[];
  ru: string[];
};

export type LocalizedStringList = {
  en: string[];
  ru: string[];
};

export type LocalizedImage = {
  src: string;
  alt: LocalizedString;
};

export type ServiceCard = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  stats: LocalizedString;
  image: LocalizedImage;
};

export type ExperienceCard = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  duration: LocalizedString;
  image: LocalizedImage;
  highlights?: LocalizedString[];
  includes?: LocalizedString[];
  price?: LocalizedString;
};

export type TourPackageCard = {
  slug: string;
  title: LocalizedValue;
  summary: LocalizedValue;
  duration: LocalizedValue;
  image: LocalizedImage;
  category?: TourPackageCategory;
  difficulty?: TourPackageDifficulty;
  durationDays?: number;
  location?: LocalizedValue;
  bestTime?: LocalizedValue;
  languages?: LocalizedValue[];
  badge?: LocalizedValue;
  priceLabel?: LocalizedValue;
  featured?: boolean;
  sortOrder?: number;
};

export type TourPackageCategory =
  | "adventure"
  | "wildlife"
  | "cultural"
  | "coastal"
  | "hills"
  | "multiday";

export type TourPackageDifficulty = "easy" | "moderate" | "active";

export type TourPackagePlace = {
  place: LocalizedValue;
  image?: LocalizedImage;
  description?: LocalizedRichText;
};

export type TourPackageAccommodation = {
  hotel: LocalizedValue;
  image?: LocalizedImage;
  description?: LocalizedRichText;
};

export type TourPackagePanelItem = {
  title: LocalizedValue;
  image?: LocalizedImage;
  description?: LocalizedRichText;
};

export type TourPackageSection =
  | {
      _type: "placesSection";
      title?: LocalizedValue;
      items: TourPackagePlace[];
    }
  | {
      _type: "accommodationSection";
      title?: LocalizedValue;
      items: TourPackageAccommodation[];
    }
  | {
      _type: "richTextSection";
      title?: LocalizedValue;
      body: LocalizedRichText;
    }
  | {
      _type: "highlightsSection" | "includesSection" | "excludesSection" | "idealForSection";
      title?: LocalizedValue;
      items: TourPackagePanelItem[];
    };

export type TourPackageDetail = TourPackageCard & {
  sections: TourPackageSection[];
  seoTitle?: LocalizedValue;
  seoDescription?: LocalizedRichText;
  seoKeywords?: LocalizedStringList;
};

export type DestinationCard = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  meta: LocalizedString;
  image: LocalizedImage;
};

export type HybridCard = {
  id: string;
  kind: "destination" | "service";
  badge: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  meta: LocalizedString;
  image: LocalizedImage;
};

export type GalleryItem = {
  id: string;
  title: LocalizedString;
  layout: "wide" | "tall" | "large" | "square";
  image: LocalizedImage;
};

export type TestimonialItem = {
  id: string;
  quote: LocalizedString;
  name: string;
  location: LocalizedString;
  trip: LocalizedString;
  rating: number;
};

export type GoogleReviewsSummary = {
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
  label: LocalizedString;
  ctaLabel: LocalizedString;
  sourceNote?: LocalizedString;
};

export type TrustPoint = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
};

export type InquiryFormPayload = {
  name: string;
  contact: string;
  email?: string;
  arrivalDate: string;
  groupSize: string;
  serviceType: string;
  message: string;
  company?: string;
  turnstileToken?: string;
};

export type HomepageData = {
  header: {
    brand: string;
    navigation: Array<{ label: LocalizedString; href: string }>;
    ctaLabel: LocalizedString;
  };
  hero: {
    eyebrow: LocalizedString;
    title: LocalizedString;
    description: LocalizedString;
    primaryCta: LocalizedString;
    secondaryCta: LocalizedString;
    highlights: LocalizedString[];
    image: LocalizedImage;
  };
  about: {
    eyebrow: LocalizedString;
    heading: LocalizedString;
    intro: LocalizedString;
    description: LocalizedString;
    image: LocalizedImage;
    highlights: LocalizedString[];
    stats: Array<{
      value: LocalizedString;
      label: LocalizedString;
    }>;
  };
  trustPoints: TrustPoint[];
  services: {
    eyebrow: LocalizedString;
    heading: LocalizedString;
    intro: LocalizedString;
    items: ServiceCard[];
  };
  destinations: {
    navLabel: LocalizedString;
    previewEyebrow: LocalizedString;
    previewHeading: LocalizedString;
    previewIntro: LocalizedString;
    pageEyebrow: LocalizedString;
    pageHeading: LocalizedString;
    pageIntro: LocalizedString;
    viewAllLabel: LocalizedString;
    eyebrow: LocalizedString;
    heading: LocalizedString;
    intro: LocalizedString;
    cards: DestinationCard[];
  };
  hybridShowcase: {
    eyebrow: LocalizedString;
    heading: LocalizedString;
    intro: LocalizedString;
    primaryCta: LocalizedString;
    secondaryCta: LocalizedString;
    items: HybridCard[];
  };
  whyChooseUs: {
    eyebrow: LocalizedString;
    heading: LocalizedString;
    intro: LocalizedString;
    points: Array<{ id: string; title: LocalizedString; description: LocalizedString }>;
  };
  tourPackages: {
    navLabel: LocalizedString;
    previewEyebrow: LocalizedString;
    previewHeading: LocalizedString;
    previewIntro: LocalizedString;
    pageEyebrow: LocalizedString;
    pageHeading: LocalizedString;
    pageIntro: LocalizedString;
    viewAllLabel: LocalizedString;
    eyebrow: LocalizedString;
    heading: LocalizedString;
    intro: LocalizedString;
    items: ExperienceCard[];
  };
  gallery: {
    eyebrow: LocalizedString;
    heading: LocalizedString;
    intro: LocalizedString;
    items: GalleryItem[];
  };
  testimonials: {
    eyebrow: LocalizedString;
    heading: LocalizedString;
    intro: LocalizedString;
    googleReviews?: GoogleReviewsSummary;
    items: TestimonialItem[];
  };
  inquiry: {
    eyebrow: LocalizedString;
    heading: LocalizedString;
    intro: LocalizedString;
    whatsappLabel: LocalizedString;
    whatsappHref: string;
    contactNotes: LocalizedString[];
    serviceOptions: LocalizedString[];
    submitLabel: LocalizedString;
    successMessage: LocalizedString;
    errorMessage: LocalizedString;
    labels: {
      name: LocalizedString;
      contact: LocalizedString;
      email: LocalizedString;
      arrivalDate: LocalizedString;
      groupSize: LocalizedString;
      serviceType: LocalizedString;
      message: LocalizedString;
    };
  };
  footer: {
    description: LocalizedString;
    quickLinksHeading: LocalizedString;
    contactHeading: LocalizedString;
    contactLines: LocalizedString[];
    copyright: LocalizedString;
  };
};
