/* ------------------------------------------------------------------ */
/*  SAVORÉ — single source of truth for all content.                   */
/*  A real client can re-brand by editing this file only.              */
/* ------------------------------------------------------------------ */

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ------------------------------ Brand ----------------------------- */

export const brand = {
  name: "SAVORÉ",
  sub: "RESTAURANT",
  tagline: "Good Food. Good People. Great Memories.",
  scriptTagline: "Good Food Brings People Together",
} as const;

export const restaurantInfo = {
  name: "SAVORÉ Restaurant",
  tagline: "Good Food. Good People. Great Memories.",
  address: "123 Food Street, Jaipur, India",
  hours: "Mon – Sun · 11:00 AM – 11:00 PM",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  email: "hello@savore.in",
  whatsapp:
    "https://wa.me/919876543210?text=Hello%20SAVOR%C3%89!%20I%27d%20like%20to%20book%20a%20table.",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=Food+Street+Jaipur+India",
  mapEmbed:
    "https://www.google.com/maps?q=Jaipur%2C%20Rajasthan%2C%20India&z=14&output=embed",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    maps: "https://maps.google.com/?q=Jaipur+India",
  },
  established: "2016",
} as const;

/* ------------------------------ Images ---------------------------- */

export const imagery = {
  heroBackground: img("1552566626-52f8b828add9", 2000),
  heroPlate: img("1544025162-d76694265947", 1200),
  heroWine: img("1510812431401-41d2bd2722f3", 600),
  aboutMain: img("1414235077428-338989a2e8c0", 1200),
  aboutAccent: img("1466978913421-dad2ebd01d17", 800),
  whyBackground: img("1552566626-52f8b828add9", 2000),
  chefMain: img("1577219491135-ce391730fb2c", 1400),
  chefPlate: img("1551218808-94e220e084d2", 800),
  reservationSide: img("1510812431401-41d2bd2722f3", 1000),
} as const;

/* ------------------------------ Stats ----------------------------- */

export interface BrandStat {
  icon: "chef" | "leaf" | "heart" | "gem";
  title: string;
  caption: string;
}

export const brandStats: BrandStat[] = [
  { icon: "chef", title: "Expert Chefs", caption: "Passionate culinary professionals" },
  { icon: "leaf", title: "Fresh Ingredients", caption: "Locally sourced, seasonal, and pure" },
  { icon: "heart", title: "Memorable Experience", caption: "Great food, warm ambience, always" },
  { icon: "gem", title: "Exceptional Quality", caption: "A fine dining experience like no other" },
];

export interface Kpi {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  caption: string;
  icon: "chef" | "leaf" | "users" | "star";
}

export const kpis: Kpi[] = [
  { value: 5, suffix: "+", label: "Expert Chefs", caption: "Passionate culinary artists", icon: "chef" },
  { value: 100, suffix: "%", label: "Fresh Ingredients", caption: "Locally sourced & seasonal", icon: "leaf" },
  { value: 10, suffix: "K+", label: "Happy Guests", caption: "Serving smiles every day", icon: "users" },
  { value: 4.8, decimals: 1, label: "Average Rating", caption: "Loved by our guests", icon: "star" },
];

/* ------------------------------ Menu ------------------------------ */

export type MenuCategory = "starters" | "main" | "desserts" | "beverages";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  rating: number;
  category: MenuCategory;
  image: string;
  badges: string[];
}

export const menuCategories: Array<{ id: "all" | MenuCategory; label: string }> = [
  { id: "all", label: "All" },
  { id: "starters", label: "Starters" },
  { id: "main", label: "Main Course" },
  { id: "desserts", label: "Desserts" },
  { id: "beverages", label: "Beverages" },
];

export const menuItems: MenuItem[] = [
  {
    id: "bruschetta",
    name: "Classic Bruschetta",
    description: "Grilled bread, fresh tomatoes, basil, olive oil.",
    ingredients: ["Vine-ripened tomatoes", "Sourdough", "Fresh basil", "Extra-virgin olive oil", "Balsamic glaze", "Sea salt"],
    price: 320,
    rating: 4.8,
    category: "starters",
    image: img("1572695157366-5e585ab2b69f", 900),
    badges: ["Vegetarian", "Chef's Pick"],
  },
  {
    id: "pasta",
    name: "Truffle Alfredo Pasta",
    description: "Creamy sauce, truffle oil, parmesan.",
    ingredients: ["Hand-rolled fettuccine", "Black truffle oil", "Aged parmesan", "Cream", "Cracked pepper"],
    price: 520,
    rating: 4.9,
    category: "main",
    image: img("1621996346565-e3dbc646d9a9", 900),
    badges: ["Vegetarian", "Signature"],
  },
  {
    id: "salmon",
    name: "Grilled Salmon",
    description: "Fresh salmon, seasonal vegetables, lemon butter sauce.",
    ingredients: ["Norwegian salmon", "Lemon butter", "Baby greens", "Charred lemon", "Micro herbs"],
    price: 780,
    rating: 4.9,
    category: "main",
    image: img("1467003909585-2f8a72700288", 900),
    badges: ["High Protein"],
  },
  {
    id: "lamb",
    name: "Herb Crusted Lamb",
    description: "Tender lamb, herbs, roasted veggies, red wine reduction.",
    ingredients: ["Herb crust", "New Zealand lamb", "Roasted root vegetables", "Red wine jus", "Rosemary"],
    price: 820,
    rating: 5.0,
    category: "main",
    image: img("1544025162-d76694265947", 900),
    badges: ["Chef's Special"],
  },
  {
    id: "lava-cake",
    name: "Chocolate Lava Cake",
    description: "Rich chocolate, warm center, vanilla ice cream.",
    ingredients: ["70% dark chocolate", "Vanilla bean ice cream", "Cocoa dust", "Gold leaf"],
    price: 380,
    rating: 4.9,
    category: "desserts",
    image: img("1606313564200-e75d5e30476c", 900),
    badges: ["Vegetarian", "Bestseller"],
  },
  {
    id: "tiramisu",
    name: "Classic Tiramisu",
    description: "Layers of coffee, mascarpone, and love.",
    ingredients: ["Espresso-soaked savoiardi", "Mascarpone cream", "Cocoa", "Vanilla"],
    price: 420,
    rating: 4.7,
    category: "desserts",
    image: img("1571877227200-a0d98ea607e9", 900),
    badges: ["Vegetarian"],
  },
  {
    id: "mocktail",
    name: "Signature Mocktail",
    description: "A refreshing blend of fruits and herbs.",
    ingredients: ["Seasonal berries", "Rosemary", "Citrus", "Sparkling water", "Cane sugar"],
    price: 280,
    rating: 4.8,
    category: "beverages",
    image: img("1514362545857-3bc16c4c7d1b", 900),
    badges: ["Non-alcoholic", "Refreshing"],
  },
  {
    id: "coffee",
    name: "Artisan Coffee",
    description: "Freshly brewed, perfectly crafted.",
    ingredients: ["Single-origin arabica", "Slow-steamed milk", "House blend"],
    price: 220,
    rating: 4.9,
    category: "beverages",
    image: img("1495474472287-4d71bcdd2085", 900),
    badges: ["Vegetarian"],
  },
];

/* ----------------------------- Gallery ---------------------------- */

export type GalleryCategory = "ambience" | "food" | "drinks" | "people" | "events";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
}

export const galleryCategories: Array<{ id: "all" | GalleryCategory; label: string }> = [
  { id: "all", label: "All" },
  { id: "ambience", label: "Ambience" },
  { id: "food", label: "Food" },
  { id: "drinks", label: "Drinks" },
  { id: "people", label: "People" },
  { id: "events", label: "Events" },
];

export const galleryItems: GalleryItem[] = [
  { id: "g1", src: img("1552566626-52f8b828add9", 1000), alt: "Warm dining room with pendant lights", caption: "The Warm Glow of SAVORÉ", category: "ambience" },
  { id: "g2", src: img("1414235077428-338989a2e8c0", 1000), alt: "Chef finishing a plated dish", caption: "Finishing Touches", category: "food" },
  { id: "g3", src: img("1510812431401-41d2bd2722f3", 1000), alt: "Red wine glasses by candlelight", caption: "Evenings in Gold", category: "drinks" },
  { id: "g4", src: img("1528605248644-14dd04022da1", 1000), alt: "Friends sharing dinner together", caption: "Together at the Table", category: "people" },
  { id: "g5", src: img("1606313564200-e75d5e30476c", 1000), alt: "Chocolate lava cake dessert", caption: "Sweet Endings", category: "food" },
  { id: "g6", src: img("1517248135467-4c7edcad34c4", 1000), alt: "Restaurant interior with set tables", caption: "A Room That Welcomes", category: "ambience" },
  { id: "g7", src: img("1466978913421-dad2ebd01d17", 1000), alt: "Celebration table with wine and dishes", caption: "Celebrations, Curated", category: "events" },
  { id: "g8", src: img("1467003909585-2f8a72700288", 1000), alt: "Grilled salmon plated with vegetables", caption: "From the Main Kitchen", category: "food" },
  { id: "g9", src: img("1511795409834-ef04bbd61622", 1000), alt: "Guests toasting with glasses", caption: "Moments Worth Toasting", category: "events" },
  { id: "g10", src: img("1470337458703-46ad1756a187", 1000), alt: "Artisan coffee served dark", caption: "Slow Coffee Rituals", category: "drinks" },
  { id: "g11", src: img("1424847651672-bf20a4b0982b", 1000), alt: "Moody interior corner with warm light", caption: "Corners of Calm", category: "ambience" },
  { id: "g12", src: img("1514362545857-3bc16c4c7d1b", 1000), alt: "Signature mocktail with rosemary", caption: "The Signature Pour", category: "drinks" },
];

/* --------------------------- Testimonials ------------------------- */

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "An unforgettable dining experience. The food, ambience and service were simply perfect.",
    name: "Aarav Mehta",
    role: "Food Lover",
    avatar: img("1507003211169-0a1dd7228f2d", 200),
    rating: 5,
  },
  {
    id: "t2",
    quote: "SAVORÉ is my go-to place for every special occasion. The flavours are exceptional!",
    name: "Priya Sharma",
    role: "Regular Guest",
    avatar: img("1494790108377-be9c29b29330", 200),
    rating: 5,
  },
  {
    id: "t3",
    quote: "Beautiful ambience, delicious food and amazing service. Truly a gem in the city!",
    name: "Rohan Verma",
    role: "Travel Blogger",
    avatar: img("1500648767791-00dcc994a43e", 200),
    rating: 5,
  },
  {
    id: "t4",
    quote: "Every dish felt like it was made just for us. The truffle pasta alone is worth the visit.",
    name: "Ishita Kapoor",
    role: "Anniversary Dinner",
    avatar: img("1534528741775-53994a69daeb", 200),
    rating: 5,
  },
];

/* --------------------------- Reservations ------------------------- */

export interface ReservationInput {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  requests?: string;
}

export interface ReservationResult extends ReservationInput {
  id: string;
  createdAt: string;
}

export const reservationTimeSlots = [
  "11:30 AM", "12:30 PM", "1:30 PM", "2:30 PM", "6:00 PM",
  "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM",
];

export const guestOptions = ["1 Guest", "2 Guests", "3 Guests", "4 Guests", "5 Guests", "6 Guests", "8 Guests", "10+ Guests"];
