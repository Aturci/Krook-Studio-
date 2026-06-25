"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import JournalCard from "@/components/JournalCard";
import { journalPosts, type JournalPost } from "@/data/journal";
import { fadeInUp, stagger } from "@/lib/motion";
import { supabase } from "@/lib/supabase";

type DbJournalPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  date: string;
  tags: string[];
};

export default function JournalPage() {
  const [items, setItems] = useState<JournalPost[]>(journalPosts);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("journal_posts")
      .select("*")
      .order("date", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setItems(
            (data as DbJournalPost[]).map((r) => ({
              id: r.id,
              title: r.title,
              slug: r.slug,
              excerpt: r.excerpt,
              coverImage: r.cover_image,
              date: r.date,
              tags: r.tags,
            }))
          );
        }
      });
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
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
            Notes from the studio
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-4xl sm:text-5xl tracking-wide text-bone"
          >
            Journal
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-serif text-lg text-bone/60 italic leading-relaxed"
          >
            Process notes, material finds, things worth writing down.
          </motion.p>
        </motion.div>

        {/* Posts grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-14"
        >
          {items.map((post) => (
            <motion.div key={post.id} variants={fadeInUp}>
              <JournalCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
