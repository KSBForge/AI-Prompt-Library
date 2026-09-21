/* ------------------------------------------------------------------ */
/*  LUXE — UNISEX SALON · single source of truth for all content.      */
/*  A real client can re-brand by editing this file only.              */
/*  Testimonials are demo content — replace `testimonials` with real   */
/*  client reviews without touching any component code.                */
/* ------------------------------------------------------------------ */

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ------------------------------ Brand ----------------------------- */

export const brand = {
  name: "LUXE",
  sub: "UNISEX SALON",
  tagline: "Beauty Beyond Boundaries",
  scriptTagline: "Self Care Looks Good On You",
  motto: "GOOD HAIR BETTER MOOD",
} as const;

export const salonInfo = {
  name: "LUXE Unisex Salon",
  tagline: "Premium Unisex Salon for Hair, Skin & Self-Care",
  address: "C-Scheme, Jaipur, Rajasthan",
  hours: "Mon – Sun · 10:00 AM – 9:00 PM",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  email: "hello@luxesalon.in",
  whatsapp: "https://wa.me/919876543210",
  whatsappText:
    "https://wa.me/919876543210?text=Hello%20LUXE!%20I%27d%20like%20to%20book%20an%20appointment.",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=C-Scheme+Jaipur+Rajasthan+India",
  mapEmbed:
    "https://www.google.com/maps?q=C-Scheme%2C%20Jaipur%2C%20Rajasthan%2C%20India&z=14&output=embed",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    whatsapp: "https://wa.me/919876543210",
  },
  established: "2016",
  location: "Jaipur, Rajasthan",
} as const;

/* ------------------------------ Imagery --------------------------- */
/*  Warm-lit editorial photography chosen to mirror the LUXE reference */
/*  deck: champagne marble reception, glow mirrors, charcoal interiors. */

export const imagery = {
  heroMain: img("1562320801-941cc54cf4db", 2200), // warm salon interior glow
  heroAccent: img("1522337360788-8b13dee82a3f", 700), // ambient warmth accent
  aboutMain: img("1560066984-138dadb4c035", 1400), // stylist at work
  aboutAccent: img("1521590832167-7bcbfaa6381f", 800), // mirror + chair
  servicesBackdrop: img("1521590832167-7bcbfaa6381f", 2000),
  productsMain: img("1522335789203-aabd1fc54bc9", 1400), // premium products
  finalCta: img("1560869713-da8bd449eb95", 2000), // stylist & client
  bookingSide: img("1522108823255-3734d03cdfff", 900),
  galleryAmbience: img("1633681924625-63b4390f7f28", 1200), // dark luxe salon
  galleryVibe: img("1507003211169-0a1dd7228f2d", 1000),
} as const;

/* --------------------------- Hero strip --------------------------- */

export interface HeroMarker {
  index: string;
  label: string;
}

export const heroMarkers: HeroMarker[] = [
  { index: "01", label: "Expert Stylists" },
  { index: "02", label: "Premium Products" },
  { index: "03", label: "Relaxing Experience" },
  { index: "04", label: "For Every You" },
];

/* ------------------------------ Stats ----------------------------- */

export interface Kpi {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  caption: string;
  icon: "gem" | "users" | "star" | "heart" | "leaf" | "scissors" | "sparkle" | "camera";
}

export const stats = [
  { value: 5, suffix: "K+", label: "Happy Clients", caption: "Confidence delivered daily", icon: "users" as const },
  { value: 10, suffix: "+", label: "Expert Stylists", caption: "Trained in global trends", icon: "scissors" as const },
  { value: 50, suffix: "+", label: "Premium Products", caption: "Global brands, authentic", icon: "gem" as const },
  { value: 100, suffix: "%", label: "Client Satisfaction", caption: "Hygiene you can trust", icon: "star" as const },
];

export const galleryStats = [
  { value: 5, suffix: "K+", label: "Happy Clients", icon: "users" as const },
  { value: 10, suffix: "+", label: "Expert Stylists", icon: "star" as const },
  { value: 100, suffix: "%", label: "Client Satisfaction", icon: "heart" as const },
];

export const testimonialStats = [
  { value: 5, suffix: "K+", label: "Happy Clients", icon: "users" as const },
  { value: 4.9, decimals: 1, suffix: "/5", label: "Average Rating", icon: "star" as const },
  { value: 90, suffix: "%", label: "Repeat Clients", icon: "heart" as const },
  { value: 50, suffix: "K+", label: "Community", icon: "camera" as const },
];

/* ---------------------------- Benefits ---------------------------- */

export interface Benefit {
  icon: "gem" | "users" | "star" | "heart" | "leaf" | "scissors" | "sparkle" | "camera";
  title: string;
  caption: string;
}

export const aboutBenefits: Benefit[] = [
  { icon: "gem", title: "Premium Experience", caption: "Luxury in every detail" },
  { icon: "users", title: "Expert Stylists", caption: "Skill. Friendly. Pro." },
  { icon: "leaf", title: "Hygienic & Safe", caption: "Your safety, our priority" },
  { icon: "heart", title: "For Everyone", caption: "Beauty has no gender" },
];

export const serviceAssurances: Benefit[] = [
  { icon: "gem", title: "Premium Products", caption: "Only the best for you" },
  { icon: "users", title: "Expert Stylists", caption: "Skilled. Friendly. Pro." },
  { icon: "sparkle", title: "Hygienic & Safe", caption: "Your safety is our priority" },
  { icon: "heart", title: "Personalized Care", caption: "Because you're unique" },
];

export const productPillars: Benefit[] = [
  { icon: "leaf", title: "Premium & Authentic", caption: "Original, high-quality products from global brands." },
  { icon: "sparkle", title: "Safe & Dermatologist Approved", caption: "Gentle on your skin & hair. Safe for everyday use." },
  { icon: "gem", title: "Visible Results", caption: "Real care. Real difference. You'll feel it." },
  { icon: "heart", title: "For Everyone", caption: "Curated for all hair types, skin types and beauty needs." },
];

export const offerPerks: Benefit[] = [
  { icon: "gem", title: "Seasonal Offers", caption: "New deals every month" },
  { icon: "star", title: "Member Discounts", caption: "Special rates for loyal clients" },
  { icon: "users", title: "Refer & Earn", caption: "Bring friends & get rewarded" },
  { icon: "sparkle", title: "Combo Packages", caption: "More beauty. More savings." },
];

export const finalCtaPillars: Benefit[] = [
  { icon: "gem", title: "Premium Products", caption: "" },
  { icon: "scissors", title: "Expert Stylists", caption: "" },
  { icon: "leaf", title: "Hygienic & Safe", caption: "" },
  { icon: "users", title: "Unisex Salon", caption: "" },
];

/* ---------------------------- Services ---------------------------- */

export type ServiceCategory =
  | "haircut"
  | "colour"
  | "treatment"
  | "facial"
  | "nails"
  | "grooming"
  | "makeup"
  | "spa";

export interface Service {
  id: string;
  name: string;
  short: string;
  description: string;
  price: string;
  image: string;
  icon: ServiceCategory;
}

export const services: Service[] = [
  {
    id: "haircut",
    name: "Haircut & Styling",
    short: "Trendy cuts. Timeless style.",
    description:
      "Precision cuts tailored to your face shape, hair texture and lifestyle — finished with a polished blow-dry style.",
    price: "from ₹399",
    image: img("1620331312220-0e4e6abd6fa2", 900),
    icon: "haircut",
  },
  {
    id: "colour",
    name: "Hair Colouring",
    short: "Vibrant shades. You.",
    description:
      "Global colour, balayage, highlights and grey coverage using ammonia-free professional formulas that keep hair glossy.",
    price: "from ₹2,999",
    image: img("1519699047748-de8e457a634e", 900),
    icon: "colour",
  },
  {
    id: "treatment",
    name: "Hair Treatments",
    short: "Stronger, healthier hair.",
    description:
      "Deep repair rituals for damaged, frizzy or chemically treated hair — keratin, botox therapy and scalp detox treatments.",
    price: "from ₹1,499",
    image: img("1526045478516-99145907023c", 900),
    icon: "treatment",
  },
  {
    id: "facial",
    name: "Facial & Skin Care",
    short: "Radiant skin, always.",
    description:
      "Dermatologist-approved facials, clean-ups and glow peels — customised after a skin analysis by our experts.",
    price: "from ₹1,499",
    image: img("1570172619644-dfd03ed5d881", 900),
    icon: "facial",
  },
  {
    id: "nails",
    name: "Manicure & Pedicure",
    short: "Groomed to perfection.",
    description:
      "Luxury mani-pedi with exfoliation, massage and premium polish — plus gel extensions for flawless, lasting finishes.",
    price: "from ₹799",
    image: img("1519014816548-bf5fe059798b", 900),
    icon: "nails",
  },
  {
    id: "grooming",
    name: "Grooming & Beard Care",
    short: "Sharp looks. Every day.",
    description:
      "Sculpted beard trims, hot-towel shaves and express facials designed exclusively for the modern gentleman.",
    price: "from ₹799",
    image: img("1503951914875-452162b0f3f1", 900),
    icon: "grooming",
  },
  {
    id: "makeup",
    name: "Makeup & Bridal",
    short: "For your special moments.",
    description:
      "HD and airbrush makeup for weddings, engagements and soirées — with trials, draping and hair styling available.",
    price: "from ₹4,999",
    image: img("1595476108010-b4d1f102b1b1", 900),
    icon: "makeup",
  },
  {
    id: "spa",
    name: "Body Spa & Relaxation",
    short: "Unwind. Rejuvenate.",
    description:
      "Aroma oils, deep-tissue and relaxation therapies that melt stress away — the perfect end to any LUXE visit.",
    price: "from ₹1,999",
    image: img("1544161515-4ab6ce6db874", 900),
    icon: "spa",
  },
];

/* ----------------------------- Gallery ---------------------------- */

export type GalleryCategory =
  | "haircuts"
  | "colour"
  | "skin"
  | "grooming"
  | "makeup"
  | "spa"
  | "space";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
}

export const galleryCategories: Array<{ id: "all" | GalleryCategory; label: string }> = [
  { id: "all", label: "All" },
  { id: "haircuts", label: "Haircuts" },
  { id: "colour", label: "Hair Colour" },
  { id: "skin", label: "Skin Care" },
  { id: "grooming", label: "Grooming" },
  { id: "makeup", label: "Makeup" },
  { id: "spa", label: "Spa" },
  { id: "space", label: "Bridal" },
];

export const galleryItems: GalleryItem[] = [
  { id: "g1", src: img("1620331312220-0e4e6abd6fa2", 1000), alt: "Fresh men's fade haircut", caption: "The Signature Fade", category: "haircuts" },
  { id: "g2", src: img("1519699047748-de8e457a634e", 1000), alt: "Glossy balayage colour result", caption: "Golden Hour Balayage", category: "colour" },
  { id: "g3", src: img("1526045478516-99145907023c", 1000), alt: "Hair spa wash ritual", caption: "Wash-Day Rituals", category: "skin" },
  { id: "g4", src: img("1570172619644-dfd03ed5d881", 1000), alt: "Calming facial treatment", caption: "The Glow Series", category: "skin" },
  { id: "g5", src: img("1519014816548-bf5fe059798b", 1000), alt: "Manicure in progress", caption: "Hands, Perfected", category: "grooming" },
  { id: "g6", src: img("1503951914875-452162b0f3f1", 1000), alt: "Beard sculpt and trim", caption: "The Gentleman's Trim", category: "grooming" },
  { id: "g7", src: img("1595476108010-b4d1f102b1b1", 1000), alt: "Bridal makeup artistry", caption: "The Bridal Edit", category: "makeup" },
  { id: "g8", src: img("1544161515-4ab6ce6db874", 1000), alt: "Relaxing body spa session", caption: "Stillness & Steam", category: "spa" },
  { id: "g9", src: imagery.galleryAmbience, alt: "LUXE salon interior with glow mirrors", caption: "Our Space", category: "space" },
  { id: "g10", src: imagery.productsMain, alt: "Premium salon products styled on marble", caption: "Premium Products", category: "space" },
  { id: "g11", src: imagery.finalCta, alt: "Stylist finishing a client's look", caption: "The LUXE Finish", category: "haircuts" },
  { id: "g12", src: img("1522337360788-8b13dee82a3f", 1000), alt: "Warm champagne light through the salon", caption: "The Vibe", category: "space" },
];

/* --------------------------- Testimonials ------------------------- */
/*  DEMO CONTENT — swap these objects with real client reviews.       */

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  service: string;
  image: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "Absolutely loved the experience! My hair feels healthier and looks amazing. The staff is so professional and friendly!",
    name: "Ananya S.",
    service: "Hair Colour",
    image: img("1494790108377-be9c29b29330", 400),
    rating: 5,
  },
  {
    id: "t2",
    quote: "Best grooming experience in the city. Clean, stylish and super professional. Highly recommended!",
    name: "Rohan M.",
    service: "Haircut & Grooming",
    image: img("1500648767791-00dcc994a43e", 400),
    rating: 5,
  },
  {
    id: "t3",
    quote: "My skin has never felt better! The facial was so relaxing and the results were visible. Definitely coming back.",
    name: "Kritika P.",
    service: "Skin Care",
    image: img("1438761681033-6461ffad8d80", 400),
    rating: 5,
  },
  {
    id: "t4",
    quote: "Great ambience, skilled stylists and excellent service. LUXE never disappoints!",
    name: "Aarav K.",
    service: "Regular Client",
    image: img("1507003211169-0a1dd7228f2d", 400),
    rating: 4,
  },
  {
    id: "t5",
    quote: "Loved my new hair colour! The team understood exactly what I wanted. Amazing service and vibe!",
    name: "Sneha T.",
    service: "Hair Colour",
    image: img("1544005313-94ddf0286df2", 400),
    rating: 5,
  },
];

/* ------------------------------ Offers ---------------------------- */

export interface Offer {
  id: string;
  name: string;
  tagline: string;
  price: string;
  was: string;
  discount: string;
  image: string;
}

export const offers: Offer[] = [
  {
    id: "o1",
    name: "Haircut & Styling",
    tagline: "Trendy. Sharp. Confident.",
    price: "₹399",
    was: "₹499",
    discount: "20% OFF",
    image: img("1620331312220-0e4e6abd6fa2", 800),
  },
  {
    id: "o2",
    name: "Hair Colour",
    tagline: "Vibrant shades for a new you.",
    price: "₹2,999",
    was: "₹3,999",
    discount: "25% OFF",
    image: img("1519699047748-de8e457a634e", 800),
  },
  {
    id: "o3",
    name: "Facial Care",
    tagline: "Healthy, glowing skin.",
    price: "₹1,499",
    was: "₹2,199",
    discount: "30% OFF",
    image: img("1570172619644-dfd03ed5d881", 800),
  },
  {
    id: "o4",
    name: "Grooming Package",
    tagline: "Haircut + Beard + Cleanup.",
    price: "₹799",
    was: "₹1,099",
    discount: "25% OFF",
    image: img("1503951914875-452162b0f3f1", 800),
  },
  {
    id: "o5",
    name: "Hair Treatment Ritual",
    tagline: "Keratin repair & scalp detox.",
    price: "₹1,999",
    was: "₹2,999",
    discount: "33% OFF",
    image: img("1526045478516-99145907023c", 800),
  },
  {
    id: "o6",
    name: "Luxury Mani-Pedi",
    tagline: "Groomed hands & feet.",
    price: "₹649",
    was: "₹999",
    discount: "35% OFF",
    image: img("1519014816548-bf5fe059798b", 800),
  },
  {
    id: "o7",
    name: "Bridal Glow Package",
    tagline: "Facial + makeup trial combo.",
    price: "₹4,999",
    was: "₹6,999",
    discount: "28% OFF",
    image: img("1595476108010-b4d1f102b1b1", 800),
  },
  {
    id: "o8",
    name: "Groom's Grooming Package",
    tagline: "Haircut + beard + facial.",
    price: "₹1,199",
    was: "₹1,699",
    discount: "30% OFF",
    image: img("1503951914875-452162b0f3f1", 800),
  },
];

/* ----------------------------- Products --------------------------- */

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Keratin Repair Shampoo",
    category: "Hair Care",
    description: "Sulphate-free daily cleanser that rebuilds strength from root to tip.",
    price: "₹899",
    badge: "Bestseller",
    image: img("1556228578-8c89e6adf883", 800),
  },
  {
    id: "p2",
    name: "Argan Glow Hair Oil",
    category: "Hair Care",
    description: "Cold-pressed argan elixir for mirror shine and a frizz-free finish.",
    price: "₹1,299",
    image: img("1556228720-195a672e8a03", 800),
  },
  {
    id: "p3",
    name: "Vitamin-C Radiance Serum",
    category: "Skin Care",
    description: "Brightening serum that evens tone and restores a lit-from-within glow.",
    price: "₹1,499",
    badge: "Stylist Pick",
    image: img("1620916566398-39f1143ab7be", 800),
  },
  {
    id: "p4",
    name: "Deep Moisture Day Cream",
    category: "Skin Care",
    description: "Silky ceramide hydrator for 24-hour comfort and suppleness.",
    price: "₹1,199",
    image: img("1598440947619-2c35fc9aa908", 800),
  },
  {
    id: "p5",
    name: "Charcoal Detox Face Mask",
    category: "Skin Care",
    description: "A weekly clay ritual that purifies pores without stripping the skin.",
    price: "₹799",
    image: img("1571781926291-c477ebfd024b", 800),
  },
  {
    id: "p6",
    name: "Gentleman's Beard Elixir",
    category: "Grooming",
    description: "Nourishing beard oil with a warm sandalwood trail.",
    price: "₹699",
    badge: "New",
    image: img("1608248543803-ba4f8c70ae0b", 800),
  },
];

/* ----------------------------- Brands ----------------------------- */

export const productBrands = [
  "KÉRASTASE",
  "L'ORÉAL PRO",
  "OLAPLEX",
  "MOROCCANOIL",
  "CLINIQUE",
  "THE ORDINARY",
] as const;

/* ----------------------------- Booking ---------------------------- */

export interface BookingInput {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  message?: string;
}

export interface BookingResult extends BookingInput {
  ref: string;
  createdAt: string;
}

export const bookingTimeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
  "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM",
];

export const bookingServiceOptions = services.map((s) => s.name);
