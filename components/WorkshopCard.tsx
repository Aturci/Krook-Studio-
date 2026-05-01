"use client";

import { motion } from "framer-motion";
import type { Workshop } from "@/data/workshops";
import ContactButtons from "./ContactButtons";

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
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-lg tracking-wide text-bone leading-snug">
            {workshop.title}
          </h3>
          {/* City badge */}
          <span
            className={`self-start px-2 py-0.5 font-sans text-[10px] tracking-widest uppercase border ${
              workshop.city === "Berlin"
                ? "border-petrol/40 text-petrol bg-petrol/10"
                : "border-terracotta/40 text-terracotta bg-terracotta/10"
            }`}
          >
            {workshop.city}
          </span>
        </div>
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
          {new Date(workshop.date + "T00:00:00").toLocaleDateString("en-GB", {
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
              ? "text-terracotta"
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
        <ContactButtons subject={`Workshop booking: ${workshop.title}`} />
      )}
    </motion.article>
  );
}
