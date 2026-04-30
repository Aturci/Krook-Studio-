"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Workshop } from "@/data/workshops";

type WorkshopCardProps = {
  workshop: Workshop;
};

export default function WorkshopCard({ workshop }: WorkshopCardProps) {
  const spotsLow = workshop.spotsRemaining <= 2;
  const sold = workshop.spotsRemaining === 0;

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="border border-ash/30 hover:border-gold/40 transition-colors duration-300 p-8 flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <h3 className="font-display text-lg tracking-wide text-bone leading-snug">
          {workshop.title}
        </h3>
        <span className="font-serif text-xl text-gold shrink-0">
          €{workshop.price}
        </span>
      </div>

      {/* Description */}
      <p className="font-serif text-base text-bone/60 leading-relaxed">
        {workshop.description}
      </p>

      {/* Meta */}
      <div className="flex flex-col gap-1 pt-2 border-t border-ash/20">
        <p className="font-sans text-xs text-bone/40 tracking-wide">
          {new Date(workshop.date).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p
          className={`font-sans text-xs tracking-wide ${
            sold
              ? "text-bone/30"
              : spotsLow
              ? "text-rust"
              : "text-bone/50"
          }`}
        >
          {sold
            ? "Sold out"
            : `${workshop.spotsRemaining} of ${workshop.spotsTotal} spots remaining`}
        </p>
      </div>

      {/* CTA */}
      {!sold && (
        <Link
          href={`/workshops#book-${workshop.id}`}
          className="self-start px-6 py-3 bg-rust text-bone font-sans text-xs tracking-[0.2em] uppercase hover:bg-rust/80 transition-colors duration-200"
        >
          Reserve a spot
        </Link>
      )}
    </motion.article>
  );
}
