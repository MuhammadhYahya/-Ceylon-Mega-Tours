import { defineArrayMember, defineField, defineType } from "sanity";

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
      type: "string",
      description: "Used during rollout before Sanity image assets are uploaded."
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "localizedString",
      validation: (rule) => rule.required()
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
      type: "localizedText",
      description: "Optional short note about this stop."
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "coverImage",
      description: "Optional relevant image for this stop."
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
      type: "localizedText",
      description: "Optional short note shown under the item title."
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "coverImage",
      description: "Optional image for this panel item."
    })
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "title.ru",
      media: "image.image"
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: media ? `${subtitle || ""}${subtitle ? " - " : ""}Image added` : subtitle,
        media
      };
    }
  }
});

const highlightsList = defineType({
  name: "highlightsList",
  title: "Highlights List",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Panel Title",
      type: "localizedString"
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({ type: "packagePanelItem" }),
        defineArrayMember({
          type: "localizedString",
          title: "Legacy text item"
        })
      ],
      validation: (rule) => rule.min(1).required()
    })
  ]
});

const includesList = defineType({
  name: "includesList",
  title: "Includes List",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Panel Title",
      type: "localizedString"
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({ type: "packagePanelItem" }),
        defineArrayMember({
          type: "localizedString",
          title: "Legacy text item"
        })
      ],
      validation: (rule) => rule.min(1).required()
    })
  ]
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
      type: "localizedText",
      description: "Optional short note about this accommodation."
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "coverImage",
      description: "Optional hotel or room image."
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

const ctaNote = defineType({
  name: "ctaNote",
  title: "CTA Note",
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
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "localizedText",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "localizedString",
      validation: (rule) => rule.required()
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
      initialValue: true
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
        defineArrayMember({ type: "placesSection" }),
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

export const schemaTypes = [
  localizedString,
  localizedText,
  coverImage,
  itineraryStop,
  packagePanelItem,
  highlightsList,
  includesList,
  placesSection,
  accommodationItem,
  accommodationSection,
  richTextSection,
  ctaNote,
  tourPackage
];
