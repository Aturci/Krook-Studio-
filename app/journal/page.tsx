"use client";

import { motion } from "framer-motion";
import JournalCard from "@/components/JournalCard";
import { journalPosts } from "@/data/journal";
import { fadeInUp, stagger } from "@/lib/motion";

export default function JournalPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-16 flex flex-col gap-4 max-w-xl"
        >
          <motion.span
            variants={fadeInUp}
            className="font-sans text-xs tracking-[0.25em] uppercase text-bone/30"
          >
            Notes from the studio
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl sm:text-5xl tracking-wide text-bone"
          >
            Journal
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-serif text-lg text-bone/60 italic leading-relaxed"
          >
            Process notes, material finds, things worth writing down.
          </motion.p>
        </motion.div>

        {/* Posts grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-14"
        >
          {journalPosts.map((post) => (
            <motion.div key={post.id} variants={fadeInUp}>
              <JournalCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
