"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, stagger } from "@/lib/motion";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
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
          subject: "General inquiry",
        }),
      });

      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col gap-16"
        >
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-xl">
            <motion.span
              variants={fadeInUp}
              className="font-sans text-xs tracking-[0.25em] uppercase text-bone/30"
            >
              Get in touch
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl sm:text-5xl tracking-wide text-bone"
            >
              Contact
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="font-serif text-lg text-bone/60 italic leading-relaxed"
            >
              Questions about a piece, custom orders, workshop bookings, or
              just want to say something. Nico reads everything.
            </motion.p>
          </div>

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-16"
          >
            {/* Form */}
            <motion.div variants={fadeInUp}>
              {status === "success" ? (
                <div className="flex flex-col gap-4 py-12">
                  <div className="text-3xl opacity-20">◇</div>
                  <p className="font-serif text-xl text-bone/80">
                    Message sent.
                  </p>
                  <p className="font-sans text-sm text-bone/50">
                    Nico will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                      rows={6}
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
                    className="px-6 py-4 bg-terracotta text-bone font-sans text-xs tracking-[0.2em] uppercase hover:bg-terracotta/80 disabled:opacity-50 transition-colors duration-200"
                  >
                    {status === "loading" ? "Sending…" : "Send message"}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Aside */}
            <motion.div variants={fadeInUp} className="flex flex-col gap-8">
              {/* Instagram */}
              <div className="flex flex-col gap-3">
                <span className="font-sans text-xs tracking-widest uppercase text-bone/30">
                  Prefer to DM?
                </span>
                <p className="font-serif text-base text-bone/60 leading-relaxed">
                  Instagram is the fastest way to reach the studio for quick
                  questions or to see work in progress.
                </p>
                <a
                  href="https://ig.me/m/krook.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start px-5 py-3 bg-petrol text-bone font-sans text-xs tracking-[0.2em] uppercase hover:bg-petrol/80 transition-colors duration-200"
                >
                  Message on Instagram
                </a>
              </div>

              {/* Details */}
              <div className="border-t border-ash/20 pt-8 flex flex-col gap-4">
                <span className="font-sans text-xs tracking-widest uppercase text-bone/30">
                  Studio
                </span>
                <p className="font-serif text-base text-bone/60">
                  Berlin-Neukölln &amp; Cape Town
                </p>
                <p className="font-serif text-base text-bone/60">
                  @krook.studio
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
