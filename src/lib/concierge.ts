import { menuItems, restaurantInfo } from "../data/restaurant";
import { formatINR } from "./utils";

export type ConciergeAction = "menu" | "reservation" | "gallery" | "contact" | "specials";

export interface ConciergeReply {
  reply: string;
  /** Optional action the UI can perform, e.g. scroll to a section. */
  action?: ConciergeAction;
}

const veg = menuItems.filter((m) => m.badges.includes("Vegetarian"));

const rules: Array<{ match: RegExp; reply: () => ConciergeReply }> = [
  {
    match: /menu|dish|food|eat|cuisine|recommend/i,
    reply: () => ({
      reply:
        `Our guests adore the Herb Crusted Lamb (${formatINR(820)}) and the Truffle Alfredo Pasta (${formatINR(520)}). ` +
        `For something lighter, the Grilled Salmon (${formatINR(780)}) is exquisite. Shall I open the full menu for you?`,
      action: "menu",
    }),
  },
  {
    match: /veg|vegetarian|vegan/i,
    reply: () => ({
      reply:
        `Certainly — we have beautiful vegetarian options: ${veg.map((v) => `${v.name} (${formatINR(v.price)})`).join(", ")}. ` +
        `The kitchen is happy to adapt most dishes vegan on request.`,
      action: "menu",
    }),
  },
  {
    match: /special|today|signature|popular|best/i,
    reply: () => ({
      reply:
        `Tonight's specials: Herb Crusted Lamb with red-wine reduction (${formatINR(820)}), our Chocolate Lava Cake (${formatINR(380)}) ` +
        `and the Signature Mocktail (${formatINR(280)}). Today's Specials is one of our most-loved rituals.`,
      action: "specials",
    }),
  },
  {
    match: /time|hour|open|close|timing/i,
    reply: () => ({
      reply: `We welcome guests every day, ${restaurantInfo.hours.replace("Mon – Sun · ", "")}. Last orders are taken until 10:30 PM.`,
      action: "contact",
    }),
  },
  {
    match: /where|location|address|direction|park/i,
    reply: () => ({
      reply: `You'll find us at ${restaurantInfo.address}. Complimentary valet parking is available after 6 PM. Would you like directions?`,
      action: "contact",
    }),
  },
  {
    match: /book|reserv|table|seat|availability/i,
    reply: () => ({
      reply:
        `Wonderful — I'd love to seat you. Tap below and I'll take you to reservations; evenings after 7 PM fill quickly, ` +
        `so booking a day ahead is wise for weekends.`,
      action: "reservation",
    }),
  },
  {
    match: /birthday|anniversary|occasion|celebrat|proposal|event/i,
    reply: () => ({
      reply:
        `How lovely! We curate birthdays, anniversaries and private celebrations — candlelit tables, plated desserts with a sparkler, ` +
        `and personalised menus. Share the date in the special-requests field when booking.`,
      action: "reservation",
    }),
  },
  {
    match: /price|cost|expensive|budget/i,
    reply: () => ({
      reply: `Starters begin at ${formatINR(320)}, mains from ${formatINR(520)}, and desserts & beverages from ${formatINR(220)}. A candlelit dinner for two averages ${formatINR(2200)}.`,
      action: "menu",
    }),
  },
  {
    match: /contact|phone|call|email|whatsapp/i,
    reply: () => ({
      reply: `You can reach us at ${restaurantInfo.phone}, ${restaurantInfo.email}, or WhatsApp us anytime — we reply within minutes.`,
      action: "contact",
    }),
  },
  {
    match: /photo|gallery|ambience|interior/i,
    reply: () => ({
      reply: `Step into the gallery — candlelit rooms, plated artistry and the people who make SAVORÉ what it is.`,
      action: "gallery",
    }),
  },
  {
    match: /hello|hi|hey|good (morning|evening|afternoon)|namaste/i,
    reply: () => ({
      reply: `Namaste, and welcome to SAVORÉ. I can help with the menu, reservations, timings or planning a special evening. What are you in the mood for?`,
    }),
  },
  {
    match: /thank/i,
    reply: () => ({ reply: `Always a pleasure. We can't wait to welcome you to SAVORÉ soon. 🥂` }),
  },
];

export function conciergeReply(message: string): ConciergeReply {
  const found = rules.find((r) => r.match.test(message));
  if (found) return found.reply();
  return {
    reply:
      `I'd be delighted to help — ask me about dishes, vegetarian options, timings, location, or reserving a table. ` +
      `For anything else, call us at ${restaurantInfo.phone}.`,
  };
}

export const conciergeGreetings = [
  "Looking for something special?",
  "Ask me about tonight's specials ✨",
  "I can help you find the perfect table.",
];

/** Opening message shown when the concierge panel is first opened. */
export const greeting: { role: "assistant"; content: string } = {
  role: "assistant",
  content:
    "Namaste, and welcome to SAVORÉ. I can help with dishes, timings, special occasions or reserving your table. Looking for something special?",
};

export async function askConciergeRemote(message: string, history: Array<{ role: "user" | "assistant"; content: string }>): Promise<string | null> {
  const endpoint = import.meta.env.VITE_CONCIERGE_API_URL;
  if (!endpoint) return null;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { reply?: string };
    return typeof data.reply === "string" ? data.reply : null;
  } catch {
    return null; // fall back to the local concierge engine
  }
}
