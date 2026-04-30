"use client";

import { motion } from "framer-motion";
import WorkshopCard from "@/components/WorkshopCard";
import { workshops } from "@/data/workshops";
import { fadeInUp, stagger } from "@/lib/motion";

export default function WorkshopsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-20 flex flex-col gap-4 max-w-2xl"
        >
          <motion.span
            variants={fadeInUp}
            className="font-sans text-xs tracking-[0.25em] uppercase text-bone/30"
          >
            Berlin studio
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl sm:text-5xl tracking-wide text-bone"
          >
            Workshops
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-serif text-lg text-bone/60 italic leading-relaxed"
          >
            Small groups, real tools, your hands in the material. These sessions
            happen in the studio where every Krook piece is made. You work
            alongside, not just next to.
          </motion.p>
        </motion.div>

        {/* Workshop cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col gap-8"
        >
          {workshops.map((w) => (
            <motion.div key={w.id} variants={fadeInUp}>
              <WorkshopCard workshop={w} />
            </motion.div>
          ))}
        </motion.div>

        {/* Private sessions note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-20 border-t border-ash/20 pt-12 flex flex-col gap-4 max-w-lg"
        >
          <h2 className="font-display text-xl tracking-wide text-bone">
            Private sessions
          </h2>
          <p className="font-serif text-base text-bone/60 leading-relaxed">
            Want to book the studio for a private group, a birthday, or a
            one-on-one? Get in touch and we&apos;ll make it happen.
          </p>
          <a
            href="https://instagram.com/krook.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start font-sans text-xs tracking-[0.2em] uppercase text-bone/60 hover:text-bone border-b border-bone/20 hover:border-bone pb-1 transition-all duration-200"
          >
            Message on Instagram →
          </a>
        </motion.div>
      </div>
    </div>
  );
}
