export const experience = {
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    { name: "title", type: "localizedString" },
    { name: "description", type: "localizedString" },
    { name: "duration", type: "localizedString" },
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
