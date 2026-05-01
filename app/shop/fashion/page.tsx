"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { rings } from "@/data/rings";
import { fadeInUp, stagger } from "@/lib/motion";

export default function FashionPage() {
  const products = rings.filter((r) => r.category === "fashion");

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-16 flex flex-col gap-4"
        >
          <motion.span
            variants={fadeInUp}
            className="font-sans text-xs tracking-[0.25em] uppercase text-bone/30"
          >
            Shop
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-4xl sm:text-5xl tracking-wide text-bone"
          >
            Fashion
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-serif text-lg text-bone/60 italic max-w-lg"
          >
            Bold statements. Pieces that make themselves known.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
        >
          {products.map((ring) => (
            <motion.div key={ring.id} variants={fadeInUp}>
              <ProductCard ring={ring} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
