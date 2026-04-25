import { defineArrayMember, defineField, defineType } from "sanity";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const junkContentPattern = /\b(test(?:ing)?|yahya|pecheg|russion)\b/i;

type LocalizedValue = {
  en?: string;
  ru?: string;
};

function trimValue(value?: string) {
  return value?.trim() || "";
}

function hasDistinctTranslations(value?: LocalizedValue) {
  const en = trimValue(value?.en);
  const ru = trimValue(value?.ru);
  return Boolean(en && ru && en !== ru);
}

function hasBothTranslations(value?: LocalizedValue) {
  return Boolean(trimValue(value?.en) && trimValue(value?.ru));
}

function hasJunkContent(values: Array<string | undefined>) {
  return values.some((value) => junkContentPattern.test(trimValue(value)));
}

function hasMeaningfulAlt(value?: LocalizedValue) {
  return trimValue(value?.en).length >= 5 && trimValue(value?.ru).length >= 5;
}

const localizedString = defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "ru",
      title: "Russian",
      type: "string",
      validation: (rule) => rule.required()
    })
  ]
});

const localizedText = defineType({
  name: "localizedText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 4
    }),
    defineField({
      name: "ru",
      title: "Russian",
      type: "text",
      rows: 4
    })
  ]
});

const localizedStringList = defineType({
  name: "localizedStringList",
  title: "Localized String List",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "ru",
      title: "Russian",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    })
  ]
});

const coverImage = defineType({
  name: "coverImage",
  title: "Cover Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: "fallbackSrc",
      title: "Fallback image path",
      type: "string"
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "localizedString",
      validation: (rule) =>
        rule.required().custom((value) =>
          hasMeaningfulAlt(value as LocalizedValue)
            ? true
            : "Add meaningful alt text in English and Russian."
        )
    })
  ],
  preview: {
    select: {
      title: "alt.en",
      media: "image"
    }
  }
});

const itineraryStop = defineType({
  name: "itineraryStop",
  title: "Place / Stop",
  type: "object",
  fields: [
    defineField({
      name: "place",
      title: "Place / Stop Name",
      type: "localizedString",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText"
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "coverImage"
    })
  ],
  preview: {
    select: {
      title: "place.en",
      subtitle: "place.ru",
      media: "image.image"
    }
  }
});

const packagePanelItem = defineType({
  name: "packagePanelItem",
  title: "Panel Item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Item Title",
      type: "localizedString",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText"
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "coverImage"
    })
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "title.ru",
      media: "image.image"
    }
  }
});

const placesSection = defineType({
  name: "placesSection",
  title: "Places / Stops",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "localizedString"
    }),
    defineField({
      name: "items",
      title: "Places / Stops",
      type: "array",
      of: [defineArrayMember({ type: "itineraryStop" })],
      validation: (rule) => rule.min(1).required()
    })
  ]
});

const accommodationItem = defineType({
  name: "accommodationItem",
  title: "Accommodation Item",
  type: "object",
  fields: [
    defineField({
      name: "hotel",
      title: "Hotel Name",
      type: "localizedString",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText"
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "coverImage"
    })
  ],
  preview: {
    select: {
      title: "hotel.en",
      subtitle: "hotel.ru",
      media: "image.image"
    }
  }
});

const accommodationSection = defineType({
  name: "accommodationSection",
  title: "Accommodation",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "localizedString"
    }),
    defineField({
      name: "items",
      title: "Accommodation",
      type: "array",
      of: [defineArrayMember({ type: "accommodationItem" })],
      validation: (rule) => rule.min(1).required()
    })
  ]
});

const richTextSection = defineType({
  name: "richTextSection",
  title: "Rich Text",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "localizedString"
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "localizedText",
      validation: (rule) => rule.required()
    })
  ]
});

function createPanelSection(
  name: "highlightsSection" | "includesSection" | "excludesSection" | "idealForSection",
  title: string
) {
  return defineType({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "title",
        title: "Section Title",
        type: "localizedString"
      }),
      defineField({
        name: "items",
        title: "Items",
        type: "array",
        of: [defineArrayMember({ type: "packagePanelItem" })],
        validation: (rule) => rule.min(1).required()
      })
    ]
  });
}

const highlightsSection = createPanelSection("highlightsSection", "Highlights");
const includesSection = createPanelSection("includesSection", "Includes");
const excludesSection = createPanelSection("excludesSection", "Excludes");
const idealForSection = createPanelSection("idealForSection", "Ideal For");

const tourPackage = defineType({
  name: "tourPackage",
  title: "Tour Package",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96
      },
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            slugPattern.test(value?.current || "") && !junkContentPattern.test(value?.current || "")
              ? true
              : "Use a clean lowercase slug with hyphens only and no test content."
          )
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "localizedText",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "duration",
      title: "Duration Label",
      type: "localizedString",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "durationDays",
      title: "Duration in Days",
      type: "number",
      validation: (rule) => rule.required().min(1)
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Adventure", value: "adventure" },
          { title: "Wildlife", value: "wildlife" },
          { title: "Cultural", value: "cultural" },
          { title: "Coastal", value: "coastal" },
          { title: "Hills", value: "hills" },
          { title: "Multi-Day", value: "multiday" }
        ]
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: {
        list: [
          { title: "Easy", value: "easy" },
          { title: "Moderate", value: "moderate" },
          { title: "Active", value: "active" }
        ]
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "localizedString",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "bestTime",
      title: "Best Time",
      type: "localizedString",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "languages",
      title: "Guide Languages",
      type: "array",
      of: [defineArrayMember({ type: "localizedString" })],
      validation: (rule) =>
        rule.min(1).required().custom((value) =>
          Array.isArray(value) &&
          value.every((item) => hasBothTranslations(item as LocalizedValue))
            ? true
            : "Each guide language must be localized for both English and Russian."
        )
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "localizedString"
    }),
    defineField({
      name: "priceLabel",
      title: "Price Label",
      type: "localizedString"
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "coverImage",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "publishReady",
      title: "Publish Ready",
      type: "boolean",
      initialValue: false,
      validation: (rule) =>
        rule.required().custom((value, context) => {
          if (!value) {
            return true;
          }

          const document = context.document as
            | {
                title?: LocalizedValue;
                summary?: LocalizedValue;
                duration?: LocalizedValue;
                location?: LocalizedValue;
                coverImage?: { alt?: LocalizedValue };
                category?: string;
                durationDays?: number;
                slug?: { current?: string };
              }
            | undefined;

          const hasLocalizedCoreCopy =
            hasDistinctTranslations(document?.title) &&
            hasDistinctTranslations(document?.summary) &&
            hasDistinctTranslations(document?.duration) &&
            hasDistinctTranslations(document?.location);

          if (!hasLocalizedCoreCopy) {
            return "Publish-ready tours need distinct English and Russian core copy.";
          }

          if (!hasMeaningfulAlt(document?.coverImage?.alt)) {
            return "Publish-ready tours need meaningful cover image alt text.";
          }

          if (
            hasJunkContent([
              document?.title?.en,
              document?.title?.ru,
              document?.summary?.en,
              document?.summary?.ru,
              document?.location?.en,
              document?.location?.ru,
              document?.coverImage?.alt?.en,
              document?.coverImage?.alt?.ru
            ])
          ) {
            return "Remove test or placeholder copy before publishing.";
          }

          if (document?.durationDays === 1 && document.category === "multiday") {
            return "One-day tours cannot be published as Multi-Day.";
          }

          if ((document?.durationDays || 0) > 1 && document?.category && document.category !== "multiday") {
            return "Multi-day tours must use the Multi-Day category.";
          }

          return true;
        })
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "sections",
      title: "Flexible sections",
      type: "array",
      of: [
        defineArrayMember({ type: "richTextSection" }),
        defineArrayMember({ type: "placesSection" }),
        defineArrayMember({ type: "highlightsSection" }),
        defineArrayMember({ type: "includesSection" }),
        defineArrayMember({ type: "excludesSection" }),
        defineArrayMember({ type: "idealForSection" }),
        defineArrayMember({ type: "accommodationSection" })
      ]
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "localizedString"
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "localizedText"
    }),
    defineField({
      name: "seoKeywords",
      title: "SEO Keywords",
      type: "localizedStringList"
    })
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }]
    }
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "duration.en",
      media: "coverImage.image"
    }
  }
});

const websiteInquiry = defineType({
  name: "websiteInquiry",
  title: "Website Inquiry",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "status", title: "Status", type: "string" }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "contact", title: "Contact", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "arrivalDate", title: "Arrival Date", type: "string" }),
    defineField({ name: "groupSize", title: "Group Size", type: "string" }),
    defineField({ name: "serviceType", title: "Service Type", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text", rows: 6 }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime" }),
    defineField({ name: "emailedAt", title: "Emailed At", type: "datetime" }),
    defineField({ name: "emailError", title: "Email Error", type: "text", rows: 3 }),
    defineField({ name: "sourceIp", title: "Source IP", type: "string" })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "serviceType"
    }
  }
});

export const schemaTypes = [
  localizedString,
  localizedText,
  localizedStringList,
  coverImage,
  itineraryStop,
  packagePanelItem,
  placesSection,
  accommodationItem,
  accommodationSection,
  richTextSection,
  highlightsSection,
  includesSection,
  excludesSection,
  idealForSection,
  tourPackage,
  websiteInquiry
];
