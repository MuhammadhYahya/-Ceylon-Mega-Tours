export const homepage = {
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    { name: "header", type: "object" },
    { name: "hero", type: "object" },
    { name: "aboutSection", type: "object" },
    {
      name: "trustPoints",
      type: "array",
      of: [{ type: "reference", to: [{ type: "trustPoint" }] }]
    },
    { name: "servicesSection", type: "object" },
    { name: "destinations", type: "object" },
    { name: "hybridShowcaseSection", type: "object" },
    { name: "whyChooseUs", type: "object" },
    { name: "experiencesSection", type: "object" },
    { name: "tourPackagesSection", type: "object" },
    { name: "gallerySection", type: "object" },
    { name: "testimonialsSection", type: "object" },
    { name: "inquiry", type: "object" },
    { name: "footer", type: "object" }
  ]
};
