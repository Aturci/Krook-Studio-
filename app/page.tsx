"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import MarqueeText from "@/components/MarqueeText";
import { rings } from "@/data/rings";
import { workshops } from "@/data/workshops";
import { fadeInUp, stagger } from "@/lib/motion";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Background transitions from charred black to bone white as hero exits
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.5, 1],
    ["#1A1A1A", "#F4F1EB"]
  );

  const featured = rings.slice(0, 3);

  return (
    <motion.div style={{ backgroundColor }}>
      {/* Hero — always dark */}
      <div ref={heroRef}>
        <HeroSection />
      </div>

      {/* Marquee — always dark */}
      <div className="bg-void">
        <MarqueeText />
      </div>

      {/* Permanent Collection — light section */}
      <section className="bg-bone">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="flex flex-col gap-16"
          >
            {/* Heading */}
            <motion.div variants={fadeInUp} className="flex flex-col gap-3">
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-void/40">
                From the studio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-wide text-void">
                Permanent Collection
              </h2>
            </motion.div>

            {/* Grid */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
            >
              {featured.map((ring) => (
                <motion.div key={ring.id} variants={fadeInUp}>
                  <ProductCardLight ring={ring} />
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="flex justify-center">
              <Link
                href="/shop/collection"
                className="font-sans text-xs tracking-[0.2em] uppercase text-void/50 hover:text-void border-b border-void/20 hover:border-void pb-1 transition-all duration-200"
              >
                View all pieces →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Workshop Teaser — back to dark */}
      <section className="border-t border-ash/30 bg-void">
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
            <h2 className="font-serif text-3xl sm:text-4xl tracking-wide text-bone leading-snug">
              Make something with your hands
            </h2>
            <p className="font-serif text-lg text-bone/60 leading-relaxed">
              Small group workshops in Berlin and Cape Town. Wax carving, stone
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
            {workshops.slice(0, 3).map((w) => (
              <motion.div
                key={w.id}
                variants={fadeInUp}
                className="border border-ash/30 p-6 flex flex-col gap-2 hover:border-gold/40 transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-sm tracking-wide text-bone">
                      {w.title}
                    </h3>
                    <span
                      className={`self-start px-1.5 py-0.5 font-sans text-[9px] tracking-widest uppercase border ${
                        w.city === "Berlin"
                          ? "border-petrol/40 text-petrol"
                          : "border-terracotta/40 text-terracotta"
                      }`}
                    >
                      {w.city}
                    </span>
                  </div>
                  <span className="font-serif text-base text-gold shrink-0">
                    €{w.price}
                  </span>
                </div>
                <p className="font-sans text-xs text-bone/40">
                  {new Date(w.date + "T00:00:00").toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="font-sans text-xs text-terracotta">
                  {w.spotsRemaining} spot{w.spotsRemaining !== 1 ? "s" : ""} remaining
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
}

// Light-background variant of ProductCard for the bone section
import Image from "next/image";
import type { Ring } from "@/data/rings";

function ProductCardLight({ ring }: { ring: Ring }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex flex-col"
    >
      <Link href={`/shop/${ring.slug}`} className="block">
        <div className="relative overflow-hidden aspect-[3/4] bg-sandy/20 mb-5">
          <Image
            src={ring.image}
            alt={ring.imageAlt ?? ring.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {ring.madeToOrder && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-bone/80 font-sans text-[10px] tracking-widest uppercase text-void/60 border border-sandy/40">
              Made to order
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-sm tracking-wider text-void group-hover:text-petrol transition-colors">
              {ring.name}
            </h3>
            <span className="font-serif text-base text-petrol shrink-0">
              €{ring.price}
            </span>
          </div>
          <p className="font-sans text-xs text-void/40 tracking-wide">
            {ring.material} · {ring.stone}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
