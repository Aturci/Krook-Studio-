"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Ring } from "@/data/rings";

type ProductCardProps = {
  ring: Ring;
};

export default function ProductCard({ ring }: ProductCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex flex-col"
    >
      <Link href={`/shop/${ring.slug}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[3/4] bg-ash/20 mb-5">
          <Image
            src={ring.image}
            alt={ring.imageAlt ?? ring.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {ring.madeToOrder && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-void/80 font-sans text-[10px] tracking-widest uppercase text-bone/60 border border-ash/30">
              Made to order
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-sm tracking-wider text-bone group-hover:text-gold transition-colors">
              {ring.name}
            </h3>
            <span className="font-serif text-base text-gold shrink-0">
              €{ring.price}
            </span>
          </div>
          <p className="font-sans text-xs text-bone/40 tracking-wide">
            {ring.material} · {ring.stone}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
