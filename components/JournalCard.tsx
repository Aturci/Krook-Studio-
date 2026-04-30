"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { JournalPost } from "@/data/journal";

type JournalCardProps = {
  post: JournalPost;
};

export default function JournalCard({ post }: JournalCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex flex-col"
    >
      <Link href={`/journal/${post.slug}`} className="flex flex-col gap-5">
        {/* Cover image */}
        <div className="relative overflow-hidden aspect-[16/9] bg-ash/20">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3">
          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-[10px] tracking-widest uppercase text-bone/30"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-display text-base tracking-wide text-bone group-hover:text-gold transition-colors leading-snug">
            {post.title}
          </h3>

          <p className="font-serif text-base text-bone/60 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          <p className="font-sans text-xs text-bone/30">
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
