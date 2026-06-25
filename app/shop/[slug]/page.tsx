import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { rings, type Ring } from "@/data/rings";
import ContactButtons from "@/components/ContactButtons";

export const dynamic = "force-dynamic";

type DbRing = {
  id: number;
  name: string;
  slug: string;
  material: string;
  stone: string;
  description: string;
  price: number;
  category: string;
  image: string;
  image_alt: string | null;
  made_to_order: boolean;
};

function dbRingToRing(r: DbRing): Ring {
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    material: r.material,
    stone: r.stone,
    description: r.description,
    price: r.price,
    category: r.category as Ring["category"],
    image: r.image,
    imageAlt: r.image_alt ?? undefined,
    madeToOrder: r.made_to_order,
  };
}

function formatCategory(cat: string): string {
  if (cat === "one-of-a-kind") return "One of a Kind";
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let ring: Ring | null = null;

  // Try Supabase first
  if (supabase) {
    const { data, error } = await supabase
      .from("rings")
      .select("*")
      .eq("slug", params.slug)
      .single();

    if (!error && data) {
      ring = dbRingToRing(data as DbRing);
    }
  }

  // Fallback to static data
  if (!ring) {
    ring = rings.find((r) => r.slug === params.slug) ?? null;
  }

  if (!ring) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Back link */}
        <div className="mb-10">
          <Link
            href="/shop"
            className="font-sans text-xs tracking-[0.2em] uppercase text-bone/30 hover:text-bone/60 transition-colors duration-200"
          >
            ← Back to shop
          </Link>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 lg:items-start">

          {/* LEFT — Image */}
          <div className="w-full lg:w-[55%] lg:sticky lg:top-28">
            <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-[80vh] overflow-hidden bg-void">
              <Image
                src={ring.image}
                alt={ring.imageAlt ?? ring.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
            </div>
          </div>

          {/* RIGHT — Details */}
          <div className="w-full lg:w-[45%] flex flex-col gap-7 lg:pt-6">

            {/* Eyebrow */}
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-bone/30">
              {formatCategory(ring.category)}
            </span>

            {/* Name */}
            <h1 className="font-display text-5xl sm:text-6xl tracking-widest text-bone leading-none">
              {ring.name}
            </h1>

            {/* Material · Stone */}
            <p className="font-sans text-sm tracking-wide text-bone/40">
              {ring.material} · {ring.stone}
            </p>

            {/* Price */}
            <p className="font-serif text-3xl text-gold">€{ring.price}</p>

            {/* Divider */}
            <hr className="border-ash/20" />

            {/* Description */}
            <p className="font-serif text-lg text-bone/60 leading-relaxed">
              {ring.description}
            </p>

            {/* Made to order badge */}
            {ring.madeToOrder && (
              <div className="inline-flex self-start items-center gap-2 px-4 py-2 border border-petrol/40 bg-petrol/10">
                <span className="w-1.5 h-1.5 rounded-full bg-petrol" />
                <span className="font-sans text-xs tracking-[0.18em] uppercase text-petrol">
                  Made to order — allow 3–4 weeks
                </span>
              </div>
            )}

            {/* CTA buttons */}
            <ContactButtons subject={`Inquiry: ${ring.name}`} />

          </div>
        </div>
      </div>
    </div>
  );
}
