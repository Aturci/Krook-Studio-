"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { rings, type Ring } from "@/data/rings";
import { fadeInUp, stagger } from "@/lib/motion";
import { supabase } from "@/lib/supabase";

export default function ShopPage() {
  const [items, setItems] = useState<Ring[]>(rings);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("rings")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        if (data && data.length > 0) {
          setItems(
            data.map((r) => ({
              id: r.id,
              name: r.name,
              slug: r.slug,
              material: r.material,
              stone: r.stone,
              description: r.description,
              price: r.price,
              category: r.category,
              image: r.image,
              imageAlt: r.image_alt ?? undefined,
              madeToOrder: r.made_to_order,
            }))
          );
        }
      });
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
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
            All pieces
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-4xl sm:text-5xl tracking-wide text-bone"
          >
            The Shop
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-serif text-lg text-bone/60 italic max-w-lg"
          >
            Each piece is made by hand in Berlin. No two are identical. Some
            are ready to ship, some are made when you order them.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
        >
          {items.map((ring) => (
            <motion.div key={ring.id} variants={fadeInUp}>
              <ProductCard ring={ring} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 text-center font-serif text-base text-bone/30 italic"
        >
          All pieces are sterling silver unless stated. Sizing available on request.
        </motion.p>
      </div>
    </div>
  );
}
