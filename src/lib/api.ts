import { delay } from "./utils";
import type { BookingInput, BookingResult } from "../data/luxe";

/**
 * LUXE integration layer. The site ships fully functional offline, and every
 * call transparently upgrades to a real backend the moment an env var is set:
 *  - VITE_BOOKING_WEBHOOK_URL → POST bookings (n8n / Zapier / Make / CRM…)
 *  - VITE_CONCIERGE_API_URL   → POST { message, history } → { reply }
 *
 * Wire it to Google Sheets via n8n, WhatsApp Cloud API, email automation or
 * AI lead qualification — the payload is plain JSON: BookingInput + source.
 */

function bookingRef(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LX-${stamp}-${rand}`;
}

export async function submitBooking(input: BookingInput): Promise<BookingResult> {
  const endpoint = import.meta.env.VITE_BOOKING_WEBHOOK_URL;

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...input, source: "website" }),
    });
    if (!res.ok) throw new Error(`Booking service responded with ${res.status}`);
    const data = (await res.json()) as Partial<BookingResult>;
    return {
      ...input,
      ref: data.ref ?? bookingRef(),
      createdAt: data.createdAt ?? new Date().toISOString(),
    };
  }

  // Local simulation so the experience is complete without a backend.
  await delay(1900);
  return {
    ...input,
    ref: bookingRef(),
    createdAt: new Date().toISOString(),
  };
}

export async function subscribeNewsletter(email: string): Promise<boolean> {
  const endpoint = import.meta.env.VITE_BOOKING_WEBHOOK_URL; // shared intake endpoint
  try {
    if (endpoint) {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email }),
      });
      return res.ok;
    }
    await delay(1200);
    return true;
  } catch {
    return false;
  }
}
