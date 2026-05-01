"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type InquiryFormProps = {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function InquiryForm({ isOpen, onClose, subject }: InquiryFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerEmail: email,
          message,
          subject,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function handleClose() {
    onClose();
    // Reset after animation out
    setTimeout(() => {
      setStatus("idle");
      setName("");
      setEmail("");
      setMessage("");
    }, 300);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={handleClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-void border-l border-ash z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ash/40">
              <span className="font-display text-sm tracking-widest text-bone uppercase">
                Inquire
              </span>
              <button
                onClick={handleClose}
                aria-label="Close"
                className="text-bone/60 hover:text-bone transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Subject line */}
            <div className="px-6 pt-5 pb-2">
              <p className="font-sans text-xs tracking-widest uppercase text-bone/30">
                Re:
              </p>
              <p className="font-serif text-base text-bone/80 mt-1">{subject}</p>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 flex flex-col justify-between">
              {status === "success" ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12">
                  <div className="text-3xl opacity-30">◇</div>
                  <p className="font-serif text-lg text-bone/80">
                    Message sent.
                  </p>
                  <p className="font-sans text-sm text-bone/50">
                    Nico will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-xs tracking-widest uppercase text-bone/40">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent border border-ash/40 px-4 py-3 font-serif text-base text-bone placeholder-bone/20 focus:outline-none focus:border-gold/60 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-xs tracking-widest uppercase text-bone/40">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent border border-ash/40 px-4 py-3 font-serif text-base text-bone placeholder-bone/20 focus:outline-none focus:border-gold/60 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-xs tracking-widest uppercase text-bone/40">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-transparent border border-ash/40 px-4 py-3 font-serif text-base text-bone placeholder-bone/20 focus:outline-none focus:border-gold/60 transition-colors resize-none"
                      placeholder="What would you like to know?"
                    />
                  </div>

                  {status === "error" && (
                    <p className="font-sans text-xs text-terracotta">
                      Something went wrong. Try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-2 px-6 py-4 bg-terracotta text-bone font-sans text-xs tracking-[0.2em] uppercase hover:bg-terracotta/80 disabled:opacity-50 transition-colors duration-200"
                  >
                    {status === "loading" ? "Sending…" : "Send message"}
                  </button>
                </form>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
