"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease, delay },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-void px-6">
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Faint radial glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-terracotta/5 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center gap-8 max-w-3xl">
        {/* Jester / diamond SVG */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <JesterSymbol />
        </motion.div>

        {/* Brand name */}
        <motion.h1
          custom={0.15}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display text-5xl sm:text-7xl md:text-8xl tracking-widest text-bone leading-none"
        >
          KROOK STUDIO
        </motion.h1>

        {/* Tagline */}
        <motion.p
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-serif text-xl sm:text-2xl text-bone/70 italic leading-relaxed max-w-lg"
        >
          Bold handcrafted treasures with that raw organic beauty present in nature.
        </motion.p>

        {/* CTA */}
        <motion.div
          custom={0.45}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Link
            href="/shop"
            className="inline-block mt-2 px-8 py-4 bg-terracotta text-bone font-sans text-xs tracking-[0.2em] uppercase hover:bg-terracotta/80 transition-colors duration-200"
          >
            Explore the world
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-bone/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function JesterSymbol() {
  return (
    <motion.svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Outer diamond */}
      <path
        d="M32 4L60 32L32 60L4 32L32 4Z"
        stroke="#D2BFA3"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner diamond */}
      <path
        d="M32 14L50 32L32 50L14 32L32 14Z"
        stroke="#B15341"
        strokeWidth="1"
        fill="none"
        strokeDasharray="3 3"
      />
      {/* Center dot */}
      <circle cx="32" cy="32" r="3" fill="#D2BFA3" />
      {/* Corner marks */}
      <circle cx="32" cy="6" r="1.5" fill="#D2BFA3" opacity="0.5" />
      <circle cx="58" cy="32" r="1.5" fill="#D2BFA3" opacity="0.5" />
      <circle cx="32" cy="58" r="1.5" fill="#D2BFA3" opacity="0.5" />
      <circle cx="6" cy="32" r="1.5" fill="#D2BFA3" opacity="0.5" />
    </motion.svg>
  );
}
