export const service = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", type: "localizedString" },
    { name: "description", type: "localizedString" },
    { name: "stats", type: "localizedString" },
    {
      name: "image",
      type: "object",
      fields: [
        { name: "src", type: "url" },
        { name: "alt", type: "localizedString" }
      ]
    }
  ]
};
