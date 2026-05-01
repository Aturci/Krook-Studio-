"use client";

import { motion } from "framer-motion";
import { fadeInUp, stagger } from "@/lib/motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col gap-16"
        >
          {/* Heading */}
          <div className="flex flex-col gap-4">
            <motion.span
              variants={fadeInUp}
              className="font-sans text-xs tracking-[0.25em] uppercase text-bone/30"
            >
              The studio
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl sm:text-5xl tracking-wide text-bone"
            >
              About Krook
            </motion.h1>
          </div>

          {/* Main copy */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-16"
          >
            <motion.div variants={fadeInUp} className="flex flex-col gap-6">
              <p className="font-serif text-xl text-bone/80 leading-relaxed italic">
                &quot;I started making rings because I couldn&apos;t find anything that
                felt like mine. Everything was too clean, too safe, too made
                for someone who doesn&apos;t exist.&quot;
              </p>
              <p className="font-serif text-base text-bone/60 leading-relaxed">
                Krook Studio is a one-person operation working out of a studio
                in Berlin-Neukölln. Every piece is hand-fabricated using
                traditional metalsmithing techniques — sawing, filing,
                soldering, stone setting. No casting machines. No outsourcing.
              </p>
              <p className="font-serif text-base text-bone/60 leading-relaxed">
                The stones come from flea markets, mineral fairs, and the
                occasional lucky find. They&apos;re chosen for character, not
                perfection — inclusions, asymmetries, weird colour shifts.
                Exactly what most jewellers would reject.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col gap-6">
              <p className="font-serif text-base text-bone/60 leading-relaxed">
                The name comes from an old Nordic word for a bend in a river —
                that point where the water changes direction unexpectedly. It&apos;s
                that quality in materials I&apos;m always looking for: the moment
                something familiar becomes strange.
              </p>
              <p className="font-serif text-base text-bone/60 leading-relaxed">
                Made-to-order pieces take 3–6 weeks. Ready-to-ship pieces leave
                the studio within 3 working days. Everything is wrapped in
                recycled paper and sent without unnecessary packaging.
              </p>
              <div className="border-t border-ash/30 pt-6 flex flex-col gap-2">
                <span className="font-sans text-xs tracking-widest uppercase text-bone/30">
                  Follow the process
                </span>
                <a
                  href="https://instagram.com/krook.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-sm tracking-wide text-gold hover:text-bone transition-colors"
                >
                  @krook.studio
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Values strip */}
          <motion.div
            variants={fadeInUp}
            className="border-t border-ash/30 pt-12 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {[
              {
                label: "Raw",
                body: "Unpolished where polish would lie. The marks of making are part of the piece.",
              },
              {
                label: "Organic",
                body: "Materials sourced from the earth, kept close to how they were found.",
              },
              {
                label: "Underground",
                body: "Not for the mainstream. Made for people who wear what they mean.",
              },
            ].map((v) => (
              <div key={v.label} className="flex flex-col gap-3">
                <h3 className="font-display text-sm tracking-widest text-gold uppercase">
                  {v.label}
                </h3>
                <p className="font-serif text-base text-bone/50 leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
