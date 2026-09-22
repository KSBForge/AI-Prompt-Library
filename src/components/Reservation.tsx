import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  CalendarPlus,
  Check,
  Clock,
  Gem,
  Heart,
  Loader2,
  Lock,
  MessageSquare,
  Phone,
  User,
  Users,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import {
  guestOptions,
  reservationTimeSlots,
  type ReservationResult,
} from "../data/restaurant";
import { submitReservation } from "../lib/api";
import { downloadReservationICS } from "../lib/scroll";
import { cn } from "../lib/utils";
import { EASE, Reveal } from "./ui/Reveal";
import { ScriptText } from "./ui/ScriptText";
import { SectionHeading } from "./ui/SectionHeading";

interface FormState {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  requests: string;
}

const EMPTY: FormState = { name: "", phone: "", date: "", time: "", guests: "", requests: "" };
const today = new Date().toISOString().split("T")[0];

const assurances = [
  { icon: CalendarCheck, title: "Easy Booking", caption: "Quick & simple reservation process" },
  { icon: Gem, title: "Exclusive Experience", caption: "A premium dining atmosphere" },
  { icon: Heart, title: "Memorable Moments", caption: "Good food, great company" },
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-[11px] font-medium text-[#e08a7a]">
      {message}
    </p>
  );
}

export function Reservation() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [result, setResult] = useState<ReservationResult | null>(null);

  const set = (key: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = "Please share your full name.";
    if (!/^[+\d][\d\s-]{7,14}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number.";
    if (!form.date) next.date = "Choose a date for your visit.";
    else if (form.date < today) next.date = "Please choose today or a future date.";
    if (!form.time) next.time = "Select a preferred time.";
    if (!form.guests) next.guests = "How many guests will join us?";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status !== "idle" || !validate()) return;
    setStatus("submitting");
    try {
      const reservation = await submitReservation({
        name: form.name.trim(),
        phone: form.phone.trim(),
        date: form.date,
        time: form.time,
        guests: parseInt(form.guests, 10) || 2,
        requests: form.requests.trim() || undefined,
      });
      setResult(reservation);
      setStatus("success");
    } catch {
      setStatus("idle");
      setErrors({ name: "Something went wrong — please try again or call us." });
    }
  }

  function reset() {
    setForm(EMPTY);
    setErrors({});
    setResult(null);
    setStatus("idle");
  }

  const inputCls = (invalid?: string) =>
    cn("field-input pl-10", invalid && "border-[#e08a7a]/60 focus:border-[#e08a7a] focus:ring-[#e08a7a]/15");

  return (
    <section id="reservation" data-parallax-root className="relative overflow-hidden section-pad">
      {/* soft candle-light glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[540px] w-[540px] rounded-full bg-gold/[0.07] blur-[150px]" />

      <div className="container-luxe grid items-start gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* Story side */}
        <div className="pt-2">
          <SectionHeading
            eyebrow="Reservation"
            title={
              <>
                A Table
                <br />
                for <span className="gold-text italic">Lifetime</span>
                <br />
                Memories
              </>
            }
            description="At SAVORÉ, every reservation is the beginning of a special story. Book your table and let us make your moments truly unforgettable."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {assurances.map((item, i) => (
              <Reveal key={item.title} delay={0.2 + i * 0.1}>
                <div className="group text-left sm:text-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:shadow-[0_0_26px_-6px_rgba(201,164,92,0.7)]">
                    <item.icon className="h-5 w-5" strokeWidth={1.4} />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-ivory">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{item.caption}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <ScriptText lines={["Good Food", "Brings People Together"]} underline className="mt-14 text-3xl" />
          </Reveal>
        </div>

        {/* Reservation card */}
        <Reveal delay={0.15}>
          <div className="glass-strong relative overflow-hidden rounded-[26px] p-7 shadow-lift sm:p-10">
            <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <div className="flex items-center justify-center gap-4">
                    <span className="h-px w-10 bg-gold/50" />
                    <p className="text-[11px] font-semibold uppercase tracking-luxe text-gold">Book a Table</p>
                    <span className="h-px w-10 bg-gold/50" />
                  </div>
                  <h3 className="mt-3 text-center font-serif text-3xl text-ivory">Reserve Your Table</h3>
                  <p className="mt-2 text-center text-xs text-muted">
                    Fill in the details below and we'll take care of the rest.
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="res-name" className="field-label">Full Name</label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" strokeWidth={1.6} />
                        <input
                          id="res-name"
                          type="text"
                          autoComplete="name"
                          placeholder="Enter your name"
                          value={form.name}
                          onChange={(e) => set("name")(e.target.value)}
                          className={inputCls(errors.name)}
                        />
                      </div>
                      <FieldError message={errors.name} />
                    </div>

                    <div>
                      <label htmlFor="res-phone" className="field-label">Phone Number</label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" strokeWidth={1.6} />
                        <input
                          id="res-phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="Enter your number"
                          value={form.phone}
                          onChange={(e) => set("phone")(e.target.value)}
                          className={inputCls(errors.phone)}
                        />
                      </div>
                      <FieldError message={errors.phone} />
                    </div>

                    <div>
                      <label htmlFor="res-date" className="field-label">Date</label>
                      <div className="relative">
                        <CalendarCheck className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" strokeWidth={1.6} />
                        <input
                          id="res-date"
                          type="date"
                          min={today}
                          value={form.date}
                          onChange={(e) => set("date")(e.target.value)}
                          className={cn(inputCls(errors.date), "[color-scheme:dark]")}
                        />
                      </div>
                      <FieldError message={errors.date} />
                    </div>

                    <div>
                      <label htmlFor="res-time" className="field-label">Time</label>
                      <div className="relative">
                        <Clock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" strokeWidth={1.6} />
                        <select
                          id="res-time"
                          value={form.time}
                          onChange={(e) => set("time")(e.target.value)}
                          className={cn(inputCls(errors.time), "appearance-none pr-9", !form.time && "text-muted/50")}
                        >
                          <option value="" disabled className="bg-secondary text-muted">Select time</option>
                          {reservationTimeSlots.map((slot) => (
                            <option key={slot} value={slot} className="bg-secondary text-ivory">
                              {slot}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold/70">▾</span>
                      </div>
                      <FieldError message={errors.time} />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="res-guests" className="field-label">Number of Guests</label>
                      <div className="relative">
                        <Users className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" strokeWidth={1.6} />
                        <select
                          id="res-guests"
                          value={form.guests}
                          onChange={(e) => set("guests")(e.target.value)}
                          className={cn(inputCls(errors.guests), "appearance-none pr-9", !form.guests && "text-muted/50")}
                        >
                          <option value="" disabled className="bg-secondary text-muted">Select guests</option>
                          {guestOptions.map((option, i) => (
                            <option
                              key={option}
                              value={option === "10+ Guests" ? "10" : String(i + 1)}
                              className="bg-secondary text-ivory"
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold/70">▾</span>
                      </div>
                      <FieldError message={errors.guests} />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="res-requests" className="field-label">
                        Special Requests <span className="normal-case text-muted/60">(optional)</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="pointer-events-none absolute left-3.5 top-4 h-4 w-4 text-gold/70" strokeWidth={1.6} />
                        <textarea
                          id="res-requests"
                          rows={3}
                          placeholder="Any special requests? (e.g. birthday, anniversary)"
                          value={form.requests}
                          onChange={(e) => set("requests")(e.target.value)}
                          className={cn(inputCls(), "resize-none")}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="group relative flex w-full items-center justify-center gap-3 rounded-full bg-gold py-4 text-[13px] font-bold uppercase tracking-wider2 text-primary shadow-gold-glow transition-all duration-500 hover:bg-gold-bright disabled:cursor-wait disabled:opacity-80"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.4} />
                            Securing your table…
                          </>
                        ) : (
                          <>
                            Confirm Reservation
                            <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                          </>
                        )}
                      </button>
                      <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted">
                        <Lock className="h-3 w-3 text-gold/80" />
                        Your information is secure with us.
                      </p>
                    </div>
                  </form>
                </motion.div>
              ) : (
                result && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="py-2 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.15 }}
                      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/60 bg-gold/10 shadow-gold-glow"
                    >
                      <Check className="h-9 w-9 text-gold" strokeWidth={2.2} />
                    </motion.span>

                    <p className="mt-6 text-[11px] font-semibold uppercase tracking-luxe text-gold">Thank You</p>
                    <h3 className="mt-2 font-serif text-3xl text-ivory">Reservation Confirmed</h3>
                    <p className="mx-auto mt-3 max-w-sm text-xs leading-relaxed text-muted">
                      We can't wait to welcome you, {result.name.split(" ")[0]}. Our concierge will
                      confirm your table shortly.
                    </p>

                    <div className="mx-auto mt-7 max-w-md rounded-2xl border border-gold/20 bg-black/30 p-5 text-left">
                      <div className="flex items-center justify-between border-b border-gold/10 pb-3">
                        <span className="text-[10px] uppercase tracking-wider2 text-muted">Reservation ID</span>
                        <span className="font-mono text-sm font-semibold text-gold">{result.id}</span>
                      </div>
                      <dl className="mt-3 space-y-2 text-[13px]">
                        {[
                          ["Guest", result.name],
                          ["Date", new Date(`${result.date}T00:00`).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })],
                          ["Time", result.time],
                          ["Guests", `${result.guests}`],
                        ].map(([label, value]) => (
                          <div key={label} className="flex items-center justify-between">
                            <dt className="text-muted">{label}</dt>
                            <dd className="font-medium text-ivory">{value}</dd>
                          </div>
                        ))}
                        {result.requests ? (
                          <div className="flex items-start justify-between gap-6">
                            <dt className="shrink-0 text-muted">Requests</dt>
                            <dd className="text-right font-medium text-ivory/85">{result.requests}</dd>
                          </div>
                        ) : null}
                      </dl>
                    </div>

                    <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                      <button
                        onClick={() => downloadReservationICS(result)}
                        className="thin-gold-border inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wider2 text-ivory transition-all duration-400 hover:border-gold/70 hover:bg-gold/10 hover:text-gold-bright"
                      >
                        <CalendarPlus className="h-4 w-4" strokeWidth={1.7} />
                        Add to Calendar
                      </button>
                      <button
                        onClick={reset}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider2 text-primary shadow-gold-glow transition-all duration-400 hover:bg-gold-bright"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
