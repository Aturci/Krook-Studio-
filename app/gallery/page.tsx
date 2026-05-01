"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { galleryItems } from "@/data/gallery";
import { fadeInUp, stagger } from "@/lib/motion";

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-16 flex flex-col gap-4 max-w-xl"
        >
          <motion.span
            variants={fadeInUp}
            className="font-sans text-xs tracking-[0.25em] uppercase text-bone/30"
          >
            From the studio
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-4xl sm:text-5xl tracking-wide text-bone"
          >
            Gallery
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-serif text-lg text-bone/60 italic leading-relaxed"
          >
            Pieces in the world. Process in the studio. Stones before they become something.
          </motion.p>
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="columns-1 sm:columns-2 lg:columns-3 gap-5"
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="break-inside-avoid mb-5 relative group overflow-hidden"
            >
              <div className="relative w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-void/0 group-hover:bg-void/70 transition-all duration-400 flex items-end p-6">
                  <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <p className="font-display text-sm tracking-wider text-bone mb-2 leading-snug">
                      {item.title}
                    </p>
                    {item.linkedProductSlug && (
                      <Link
                        href={`/shop/${item.linkedProductSlug}`}
                        className="font-sans text-xs tracking-widest uppercase text-bone/70 hover:text-bone border-b border-bone/40 pb-0.5 transition-colors"
                      >
                        View piece →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
