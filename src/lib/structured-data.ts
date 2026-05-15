import { SITE_URL } from "./site";

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${SITE_URL}/#business`,
  name: "Trump-Hollow Builders LLC",
  description:
    "Full-service custom remodel contractor specializing in kitchens, baths, additions, built-ins, and architectural woodworking.",
  url: SITE_URL,
  telephone: "+1-503-504-0191",
  email: "dtrump58@yahoo.com",
  image: `${SITE_URL}/dropbox/Large%20Flat001.jpg`,
  priceRange: "$$$",
  areaServed: {
    "@type": "Place",
    name: "Greater Portland Metro Area",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "OR",
    addressCountry: "US",
  },
  sameAs: [] as string[],
};

const faqs = [
  {
    question: "How long does a typical kitchen remodel take?",
    answer:
      "A typical kitchen remodel takes 8-12 weeks depending on the scope of work. Custom cabinetry may add 4-6 weeks for fabrication. We provide detailed timelines during the design phase and keep you informed throughout the project.",
  },
  {
    question: "Do you provide design services?",
    answer:
      "Yes! As a design/build firm, we handle everything from initial concept and 3D renderings to final construction. Our team works collaboratively with you to create designs that match your vision and budget.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve the Greater Portland Metro Area and surrounding communities. If you're unsure whether we service your area, please give us a call and we'll be happy to discuss your project.",
  },
  {
    question: "Do you offer free consultations?",
    answer:
      "Yes, we offer free on-site consultations. We'll meet with you at your home to discuss your project, assess the space, understand your goals, and provide initial recommendations and rough estimates.",
  },
  {
    question: "Can you work with my existing architect or designer?",
    answer:
      "We frequently collaborate with architects and designers to bring their visions to life. Our team has extensive experience interpreting plans and can provide valuable input on constructability and material selections.",
  },
  {
    question: "What sets your custom cabinetry apart?",
    answer:
      "Our custom cabinetry is built in-house by master craftsmen using premium hardwoods and traditional joinery techniques. Each piece is made to your exact specifications, ensuring a perfect fit and finish that stock cabinets simply cannot match.",
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};
