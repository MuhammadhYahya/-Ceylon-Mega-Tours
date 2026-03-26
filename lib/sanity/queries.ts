import groq from "groq";

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    header,
    hero,
    aboutSection,
    trustPoints[]->,
    servicesSection,
    destinations,
    hybridShowcaseSection,
    whyChooseUs,
    experiencesSection,
    tourPackagesSection,
    gallerySection,
    testimonialsSection,
    inquiry,
    footer
  }
`;
