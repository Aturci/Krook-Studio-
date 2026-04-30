"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

const TEXT = "raw · organic · underground · handcrafted · berlin · one of a kind · ";

export default function MarqueeText() {
  return (
    <div className="overflow-hidden border-y border-ash/30 py-4 bg-void select-none">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        {/* Duplicate for seamless loop */}
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="font-sans text-xs tracking-[0.25em] uppercase text-bone/40 pr-0"
          >
            {TEXT}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
