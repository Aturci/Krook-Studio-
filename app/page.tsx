"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import MarqueeText from "@/components/MarqueeText";
import ProductCard from "@/components/ProductCard";
import { rings } from "@/data/rings";
import { workshops } from "@/data/workshops";
import { fadeInUp, stagger } from "@/lib/motion";

export default function HomePage() {
  const featured = rings.slice(0, 3);

  return (
    <>
      <HeroSection />
      <MarqueeText />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="flex flex-col gap-16"
        >
          {/* Heading */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-3">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-bone/30">
              From the studio
            </span>
            <h2 className="font-display text-3xl sm:text-4xl tracking-wide text-bone">
              New work
            </h2>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
          >
            {featured.map((ring) => (
              <motion.div key={ring.id} variants={fadeInUp}>
                <ProductCard ring={ring} />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="flex justify-center">
            <Link
              href="/shop"
              className="font-sans text-xs tracking-[0.2em] uppercase text-bone/60 hover:text-bone border-b border-bone/20 hover:border-bone pb-1 transition-all duration-200"
            >
              View all pieces →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Workshop Teaser */}
      <section className="border-t border-ash/30 bg-ash/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          {/* Text */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-6">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-bone/30">
              Learn the craft
            </span>
            <h2 className="font-display text-3xl sm:text-4xl tracking-wide text-bone leading-snug">
              Make something with your hands
            </h2>
            <p className="font-serif text-lg text-bone/60 leading-relaxed">
              Small group workshops in the Berlin studio. Wax carving, stone
              setting, the whole ritual. You leave with something you made
              yourself.
            </p>
            <Link
              href="/workshops"
              className="self-start px-6 py-3 border border-bone/30 font-sans text-xs tracking-[0.2em] uppercase text-bone hover:bg-bone hover:text-void transition-colors duration-200"
            >
              See upcoming workshops
            </Link>
          </motion.div>

          {/* Upcoming dates */}
          <motion.div variants={stagger} className="flex flex-col gap-4">
            {workshops.map((w) => (
              <motion.div
                key={w.id}
                variants={fadeInUp}
                className="border border-ash/30 p-6 flex flex-col gap-2 hover:border-gold/40 transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-sm tracking-wide text-bone">
                    {w.title}
                  </h3>
                  <span className="font-serif text-base text-gold shrink-0">
                    €{w.price}
                  </span>
                </div>
                <p className="font-sans text-xs text-bone/40">
                  {new Date(w.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="font-sans text-xs text-rust">
                  {w.spotsRemaining} spot{w.spotsRemaining !== 1 ? "s" : ""} remaining
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
