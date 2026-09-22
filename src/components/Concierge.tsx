import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  askConciergeRemote,
  type ConciergeAction,
  conciergeReply,
  greeting,
} from "../lib/concierge";
import { cn } from "../lib/utils";
import { scrollToSection } from "../lib/scroll";

interface Message {
  role: "user" | "assistant";
  content: string;
  action?: ConciergeAction;
}

const quickActions = [
  { label: "View Menu", prompt: "Show me the menu" },
  { label: "Book Table", prompt: "I'd like to book a table" },
  { label: "Today's Specials", prompt: "What are today's specials?" },
  { label: "Ask SAVORÉ", prompt: "" },
];

const actionTargets: Record<Exclude<ConciergeAction, null>, string> = {
  menu: "#menu",
  reservation: "#reservation",
  contact: "#contact",
  gallery: "#gallery",
  specials: "#menu",
};

const actionLabels: Record<Exclude<ConciergeAction, null>, string> = {
  menu: "Explore the Menu",
  reservation: "Reserve a Table",
  contact: "Find Us",
  gallery: "See the Ambience",
  specials: "View Specials",
};

export function Concierge() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  async function send(raw: string) {
    const text = raw.trim();
    if (!text || typing) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setTyping(true);

    let reply: { content: string; action?: ConciergeAction };
    try {
      const remote = await askConciergeRemote(
        text,
        messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
      );
      if (remote) {
        reply = { content: remote };
      } else {
        const local = conciergeReply(text);
        reply = { content: local.reply, action: local.action };
      }
    } catch {
      const local = conciergeReply(text);
      reply = { content: local.reply, action: local.action };
    }

    // keep the cinematic pace — never resolve instantly
    await new Promise((r) => setTimeout(r, 650 + Math.random() * 500));
    setTyping(false);
    setMessages((m) => [...m, { role: "assistant", content: reply.content, action: reply.action }]);
  }

  return (
    <div className="fixed bottom-5 right-5 z-[85] flex flex-col items-end gap-4 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.94 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong flex h-[min(66vh,540px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl shadow-lift"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-gold/15 bg-black/30 px-5 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
                <Sparkles className="h-4.5 w-4.5 text-gold" strokeWidth={1.6} />
              </span>
              <div className="flex-1">
                <p className="font-serif text-[15px] text-ivory">SAVORÉ Concierge</p>
                <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider2 text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                  Online · replies instantly
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close concierge"
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-ivory"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* messages */}
            <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] px-4 py-3 text-[13px] leading-relaxed",
                      message.role === "user"
                        ? "rounded-2xl rounded-br-sm bg-gold font-medium text-primary"
                        : "rounded-2xl rounded-tl-sm border border-gold/15 bg-black/40 text-ivory/90",
                    )}
                  >
                    {message.content}
                    {message.action ? (
                      <button
                        onClick={() => scrollToSection(actionTargets[message.action as Exclude<ConciergeAction, null>])}
                        className="mt-2.5 block text-[11px] font-bold uppercase tracking-wider2 text-gold underline-offset-4 hover:underline"
                      >
                        {actionLabels[message.action as Exclude<ConciergeAction, null>]} →
                      </button>
                    ) : null}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-gold/15 bg-black/40 px-4 py-3.5">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: dot * 0.18 }}
                        className="h-1.5 w-1.5 rounded-full bg-gold"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* quick actions */}
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {quickActions.map((quick) => (
                <button
                  key={quick.label}
                  onClick={() => (quick.prompt ? send(quick.prompt) : inputRef.current?.focus())}
                  className="rounded-full border border-gold/30 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider2 text-gold/90 transition-all duration-300 hover:border-gold/70 hover:bg-gold/10"
                >
                  {quick.label}
                </button>
              ))}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-gold/15 bg-black/30 px-4 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about dishes, timings, tables…"
                aria-label="Message the SAVORÉ concierge"
                className="w-full bg-transparent text-[13px] text-ivory placeholder:text-muted/50 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || typing}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-primary transition-all duration-300 hover:bg-gold-bright disabled:opacity-40"
              >
                <Send className="h-4 w-4" strokeWidth={2} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close SAVORÉ concierge" : "Open SAVORÉ concierge"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold text-primary shadow-[0_10px_40px_-8px_rgba(201,164,92,0.9)]"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-gold/25 [animation-duration:2.6s]" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -60, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 60, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative"
          >
            {open ? <X className="h-5.5 w-5.5" strokeWidth={2} /> : <Sparkles className="h-5.5 w-5.5" strokeWidth={1.9} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
