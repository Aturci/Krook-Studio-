"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { rings, type Ring } from "@/data/rings";
import { fadeInUp, stagger } from "@/lib/motion";
import { supabase } from "@/lib/supabase";

export default function OneOfAKindPage() {
  const [items, setItems] = useState<Ring[]>(rings.filter((r) => r.category === "one-of-a-kind"));

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("rings")
      .select("*")
      .eq("category", "one-of-a-kind")
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
            One of a Kind
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-serif text-lg text-bone/60 italic max-w-lg"
          >
            Singular pieces. When it&apos;s gone, it&apos;s gone.
          </motion.p>
        </motion.div>

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
      </div>
    </div>
  );
}
