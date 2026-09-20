import { delay } from "./utils";
import type { ReservationInput, ReservationResult } from "../data/restaurant";

/**
 * Integration layer. The site ships fully functional offline, and every call
 * transparently upgrades to a real backend the moment an env var is set:
 *  - VITE_RESERVATION_API_URL  → POST reservations (webhook, CRM, Convex action…)
 *  - VITE_CONCIERGE_API_URL    → POST { message, history } → { reply }
 */

function reservationId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SVR-${stamp}-${rand}`;
}

export async function submitReservation(input: ReservationInput): Promise<ReservationResult> {
  const endpoint = import.meta.env.VITE_RESERVATION_API_URL;

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...input, source: "website" }),
    });
    if (!res.ok) throw new Error(`Reservation service responded with ${res.status}`);
    const data = (await res.json()) as Partial<ReservationResult>;
    return {
      ...input,
      id: data.id ?? reservationId(),
      createdAt: data.createdAt ?? new Date().toISOString(),
    };
  }

  // Local simulation so the experience is complete without a backend.
  await delay(1900);
  return {
    ...input,
    id: reservationId(),
    createdAt: new Date().toISOString(),
  };
}

export async function subscribeNewsletter(email: string): Promise<boolean> {
  const endpoint = import.meta.env.VITE_RESERVATION_API_URL; // shared intake endpoint
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
