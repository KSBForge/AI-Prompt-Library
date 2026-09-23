import type { BookingInput, BookingResult } from "../data/luxe";

/* ------------------------------------------------------------------ */
/*  Singletons for smooth scrolling + scroll locking (Lenis aware)     */
/* ------------------------------------------------------------------ */

type LenisLike = {
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => void;
  stop: () => void;
  start: () => void;
};

let lenisInstance: LenisLike | null = null;

export function setLenis(instance: LenisLike | null) {
  lenisInstance = instance;
}

/** Smoothly scroll to a section id like "#services". Uses Lenis when active. */
export function scrollToSection(hash: string, offset = -76) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, { offset, duration: 1.5 });
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

let lockCount = 0;

export function lockBodyScroll() {
  lockCount += 1;
  if (lockCount === 1) {
    lenisInstance?.stop();
    document.body.style.overflow = "hidden";
  }
}

export function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    lenisInstance?.start();
    document.body.style.overflow = "";
  }
}

/* ------------------------------------------------------------------ */
/*  Calendar export (.ics) for confirmed appointments                  */
/* ------------------------------------------------------------------ */

function icsStamp(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `T${pad(date.getHours())}${pad(date.getMinutes())}00`
  );
}

/** Converts "7:30 PM" style slots to 24h hours/minutes. */
function to24h(time: string): { h: number; min: number } {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return { h: 19, min: 0 };
  let h = parseInt(match[1], 10);
  const min = parseInt(match[2], 10);
  const suffix = match[3].toUpperCase();
  if (suffix === "PM" && h !== 12) h += 12;
  if (suffix === "AM" && h === 12) h = 0;
  return { h, min };
}

/** Generates an .ics file so guests can add the appointment to their calendar. */
export function downloadBookingICS(booking: BookingResult) {
  const start = new Date(`${booking.date}T00:00:00`);
  const { h, min } = to24h(booking.time);
  start.setHours(h, min, 0, 0);
  const end = new Date(start.getTime() + 60 * 60 * 1000); // assume 1h appointment
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//LUXE Unisex Salon//Appointment//EN",
    "BEGIN:VEVENT",
    `UID:${booking.ref}@luxesalon.in`,
    `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(start)}`,
    `DTEND:${icsStamp(end)}`,
    `SUMMARY:${booking.service} at LUXE Unisex Salon`,
    `DESCRIPTION:Appointment ${booking.ref}. ${booking.message ? `Notes: ${booking.message}` : ""}`.trim(),
    "LOCATION:C-Scheme\\, Jaipur\\, Rajasthan",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `LUXE-${booking.ref}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
