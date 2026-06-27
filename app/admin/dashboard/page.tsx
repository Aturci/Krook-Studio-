"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Tab = "rings" | "workshops" | "gallery" | "journal";

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── Ring ───────────────────────────────────────────────────────────────────

type Ring = {
  id?: number;
  name: string;
  slug: string;
  category: string;
  material: string;
  stone: string;
  price: number | "";
  description: string;
  image_url: string;
  made_to_order: boolean;
  sort_order: number | "";
};

const emptyRing: Ring = {
  name: "",
  slug: "",
  category: "collection",
  material: "",
  stone: "",
  price: "",
  description: "",
  image_url: "",
  made_to_order: false,
  sort_order: "",
};

function RingsTab() {
  const [items, setItems] = useState<Ring[]>([]);
  const [form, setForm] = useState<Ring>(emptyRing);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from("rings")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setItems(data as Ring[]);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function select(item: Ring) {
    setForm({ ...item });
    setMsg("");
  }

  function reset() {
    setForm(emptyRing);
    setMsg("");
  }

  function set(field: keyof Ring, value: unknown) {
    setForm((f) => {
      const next = { ...f, [field]: value } as Ring;
      if (field === "name" && !f.id) {
        next.slug = toSlug(value as string);
      }
      return next;
    });
  }

  async function save() {
    if (!supabase) return;
    setSaving(true);
    setMsg("");
    const payload = {
      ...form,
      price: form.price === "" ? null : Number(form.price),
      sort_order: form.sort_order === "" ? null : Number(form.sort_order),
    };
    const { error } = form.id
      ? await supabase.from("rings").update(payload).eq("id", form.id)
      : await supabase.from("rings").insert(payload);
    setSaving(false);
    if (error) {
      setMsg("Error: " + error.message);
    } else {
      setMsg("Saved!");
      reset();
      load();
    }
  }

  async function del() {
    if (!supabase || !form.id) return;
    if (!confirm("Delete this ring?")) return;
    setDeleting(true);
    const { error } = await supabase.from("rings").delete().eq("id", form.id);
    setDeleting(false);
    if (error) {
      setMsg("Error: " + error.message);
    } else {
      setMsg("Deleted.");
      reset();
      load();
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Rings ({items.length})
          </h2>
          <button
            onClick={reset}
            className="text-xs text-terracotta hover:underline"
          >
            + New ring
          </button>
        </div>
        <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => select(item)}
              className={`w-full text-left px-3 py-2.5 border rounded text-sm transition-colors ${
                form.id === item.id
                  ? "border-terracotta bg-terracotta/5 text-terracotta"
                  : "border-gray-200 bg-white hover:border-gray-300 text-gray-800"
              }`}
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-gray-400 mt-0.5">
                {item.category} · {item.price ? `€${item.price}` : "no price"}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded p-5 space-y-3">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
          {form.id ? "Edit ring" : "New ring"}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="block text-xs text-gray-500 mb-1">Name</label>
            <input
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs text-gray-500 mb-1">Slug</label>
            <input
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400 font-mono"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Category</label>
            <select
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400 bg-white"
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              <option value="collection">Collection</option>
              <option value="one-of-a-kind">One of a kind</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Price (€)</label>
            <input
              type="number"
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Material</label>
            <input
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.material}
              onChange={(e) => set("material", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Stone</label>
            <input
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.stone}
              onChange={(e) => set("stone", e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs text-gray-500 mb-1">Description</label>
            <textarea
              rows={3}
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400 resize-none"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs text-gray-500 mb-1">Image URL</label>
            <input
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.image_url}
              onChange={(e) => set("image_url", e.target.value)}
            />
            {form.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.image_url}
                alt="preview"
                className="mt-2 h-14 object-cover rounded border border-gray-200"
              />
            )}
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Sort order</label>
            <input
              type="number"
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.sort_order}
              onChange={(e) => set("sort_order", e.target.value)}
            />
          </div>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={form.made_to_order}
                onChange={(e) => set("made_to_order", e.target.checked)}
                className="rounded"
              />
              Made to order
            </label>
          </div>
        </div>

        {msg && (
          <p className={`text-xs ${msg.startsWith("Error") ? "text-red-500" : "text-green-600"}`}>
            {msg}
          </p>
        )}

        <div className="flex gap-2 pt-1">
          <button
            onClick={save}
            disabled={saving || !form.name}
            className="flex-1 bg-terracotta text-white text-xs tracking-wider uppercase py-2.5 rounded hover:bg-terracotta/80 transition-colors disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          {form.id && (
            <button
              onClick={del}
              disabled={deleting}
              className="px-4 bg-red-500 text-white text-xs tracking-wider uppercase py-2.5 rounded hover:bg-red-600 transition-colors disabled:opacity-40"
            >
              {deleting ? "…" : "Delete"}
            </button>
          )}
          <button
            onClick={reset}
            className="px-4 bg-gray-100 text-gray-600 text-xs tracking-wider uppercase py-2.5 rounded hover:bg-gray-200 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Workshop ────────────────────────────────────────────────────────────────

type Workshop = {
  id?: number;
  title: string;
  city: string;
  date: string;
  price: number | "";
  spots_total: number | "";
  spots_remaining: number | "";
  description: string;
};

const emptyWorkshop: Workshop = {
  title: "",
  city: "Berlin",
  date: "",
  price: "",
  spots_total: "",
  spots_remaining: "",
  description: "",
};

function WorkshopsTab() {
  const [items, setItems] = useState<Workshop[]>([]);
  const [form, setForm] = useState<Workshop>(emptyWorkshop);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from("workshops")
      .select("*")
      .order("date", { ascending: true });
    if (data) setItems(data as Workshop[]);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function select(item: Workshop) {
    setForm({ ...item });
    setMsg("");
  }

  function reset() {
    setForm(emptyWorkshop);
    setMsg("");
  }

  function set(field: keyof Workshop, value: unknown) {
    setForm((f) => ({ ...f, [field]: value }) as Workshop);
  }

  async function save() {
    if (!supabase) return;
    setSaving(true);
    setMsg("");
    const payload = {
      ...form,
      price: form.price === "" ? null : Number(form.price),
      spots_total: form.spots_total === "" ? null : Number(form.spots_total),
      spots_remaining:
        form.spots_remaining === "" ? null : Number(form.spots_remaining),
    };
    const { error } = form.id
      ? await supabase.from("workshops").update(payload).eq("id", form.id)
      : await supabase.from("workshops").insert(payload);
    setSaving(false);
    if (error) {
      setMsg("Error: " + error.message);
    } else {
      setMsg("Saved!");
      reset();
      load();
    }
  }

  async function del() {
    if (!supabase || !form.id) return;
    if (!confirm("Delete this workshop?")) return;
    setDeleting(true);
    const { error } = await supabase
      .from("workshops")
      .delete()
      .eq("id", form.id);
    setDeleting(false);
    if (error) {
      setMsg("Error: " + error.message);
    } else {
      setMsg("Deleted.");
      reset();
      load();
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Workshops ({items.length})
          </h2>
          <button
            onClick={reset}
            className="text-xs text-terracotta hover:underline"
          >
            + New workshop
          </button>
        </div>
        <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => select(item)}
              className={`w-full text-left px-3 py-2.5 border rounded text-sm transition-colors ${
                form.id === item.id
                  ? "border-terracotta bg-terracotta/5 text-terracotta"
                  : "border-gray-200 bg-white hover:border-gray-300 text-gray-800"
              }`}
            >
              <div className="font-medium">{item.title}</div>
              <div className="text-xs text-gray-400 mt-0.5">
                {item.city} · {item.date || "no date"} · {item.spots_remaining ?? "?"} spots left
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded p-5 space-y-3">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
          {form.id ? "Edit workshop" : "New workshop"}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="block text-xs text-gray-500 mb-1">Title</label>
            <input
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">City</label>
            <select
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400 bg-white"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
            >
              <option value="Berlin">Berlin</option>
              <option value="Cape Town">Cape Town</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Date</label>
            <input
              type="date"
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Price (€)</label>
            <input
              type="number"
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Total spots</label>
            <input
              type="number"
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.spots_total}
              onChange={(e) => set("spots_total", e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs text-gray-500 mb-1">Spots remaining</label>
            <input
              type="number"
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.spots_remaining}
              onChange={(e) => set("spots_remaining", e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs text-gray-500 mb-1">Description</label>
            <textarea
              rows={4}
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400 resize-none"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>
        </div>

        {msg && (
          <p className={`text-xs ${msg.startsWith("Error") ? "text-red-500" : "text-green-600"}`}>
            {msg}
          </p>
        )}

        <div className="flex gap-2 pt-1">
          <button
            onClick={save}
            disabled={saving || !form.title}
            className="flex-1 bg-terracotta text-white text-xs tracking-wider uppercase py-2.5 rounded hover:bg-terracotta/80 transition-colors disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          {form.id && (
            <button
              onClick={del}
              disabled={deleting}
              className="px-4 bg-red-500 text-white text-xs tracking-wider uppercase py-2.5 rounded hover:bg-red-600 transition-colors disabled:opacity-40"
            >
              {deleting ? "…" : "Delete"}
            </button>
          )}
          <button
            onClick={reset}
            className="px-4 bg-gray-100 text-gray-600 text-xs tracking-wider uppercase py-2.5 rounded hover:bg-gray-200 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

type GalleryItem = {
  id?: number;
  image_url: string;
  title: string;
  linked_product_slug: string;
  sort_order: number | "";
};

const emptyGallery: GalleryItem = {
  image_url: "",
  title: "",
  linked_product_slug: "",
  sort_order: "",
};

function GalleryTab() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState<GalleryItem>(emptyGallery);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setItems(data as GalleryItem[]);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function select(item: GalleryItem) {
    setForm({ ...item });
    setMsg("");
  }

  function reset() {
    setForm(emptyGallery);
    setMsg("");
  }

  function set(field: keyof GalleryItem, value: unknown) {
    setForm((f) => ({ ...f, [field]: value }) as GalleryItem);
  }

  async function save() {
    if (!supabase) return;
    setSaving(true);
    setMsg("");
    const payload = {
      ...form,
      sort_order: form.sort_order === "" ? null : Number(form.sort_order),
    };
    const { error } = form.id
      ? await supabase.from("gallery").update(payload).eq("id", form.id)
      : await supabase.from("gallery").insert(payload);
    setSaving(false);
    if (error) {
      setMsg("Error: " + error.message);
    } else {
      setMsg("Saved!");
      reset();
      load();
    }
  }

  async function del() {
    if (!supabase || !form.id) return;
    if (!confirm("Delete this gallery item?")) return;
    setDeleting(true);
    const { error } = await supabase.from("gallery").delete().eq("id", form.id);
    setDeleting(false);
    if (error) {
      setMsg("Error: " + error.message);
    } else {
      setMsg("Deleted.");
      reset();
      load();
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Gallery ({items.length})
          </h2>
          <button
            onClick={reset}
            className="text-xs text-terracotta hover:underline"
          >
            + New image
          </button>
        </div>
        <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => select(item)}
              className={`w-full text-left px-3 py-2.5 border rounded text-sm transition-colors flex items-center gap-3 ${
                form.id === item.id
                  ? "border-terracotta bg-terracotta/5 text-terracotta"
                  : "border-gray-200 bg-white hover:border-gray-300 text-gray-800"
              }`}
            >
              {item.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image_url}
                  alt=""
                  className="h-10 w-10 object-cover rounded flex-shrink-0"
                />
              )}
              <div>
                <div className="font-medium">{item.title || "Untitled"}</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  sort: {item.sort_order ?? "—"}{item.linked_product_slug ? ` · ${item.linked_product_slug}` : ""}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded p-5 space-y-3">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
          {form.id ? "Edit image" : "New image"}
        </h2>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Image URL</label>
            <input
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.image_url}
              onChange={(e) => set("image_url", e.target.value)}
            />
            {form.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.image_url}
                alt="preview"
                className="mt-2 h-14 object-cover rounded border border-gray-200"
              />
            )}
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Title</label>
            <input
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Linked product slug (optional)</label>
            <input
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400 font-mono"
              value={form.linked_product_slug}
              onChange={(e) => set("linked_product_slug", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Sort order</label>
            <input
              type="number"
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.sort_order}
              onChange={(e) => set("sort_order", e.target.value)}
            />
          </div>
        </div>

        {msg && (
          <p className={`text-xs ${msg.startsWith("Error") ? "text-red-500" : "text-green-600"}`}>
            {msg}
          </p>
        )}

        <div className="flex gap-2 pt-1">
          <button
            onClick={save}
            disabled={saving || !form.image_url}
            className="flex-1 bg-terracotta text-white text-xs tracking-wider uppercase py-2.5 rounded hover:bg-terracotta/80 transition-colors disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          {form.id && (
            <button
              onClick={del}
              disabled={deleting}
              className="px-4 bg-red-500 text-white text-xs tracking-wider uppercase py-2.5 rounded hover:bg-red-600 transition-colors disabled:opacity-40"
            >
              {deleting ? "…" : "Delete"}
            </button>
          )}
          <button
            onClick={reset}
            className="px-4 bg-gray-100 text-gray-600 text-xs tracking-wider uppercase py-2.5 rounded hover:bg-gray-200 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Journal ─────────────────────────────────────────────────────────────────

type JournalPost = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string;
  date: string;
  tags: string; // comma-separated in the form, stored as array
};

const emptyJournal: JournalPost = {
  title: "",
  slug: "",
  excerpt: "",
  cover_image_url: "",
  date: "",
  tags: "",
};

function JournalTab() {
  const [items, setItems] = useState<JournalPost[]>([]);
  const [form, setForm] = useState<JournalPost>(emptyJournal);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from("journal")
      .select("*")
      .order("date", { ascending: false });
    if (data) {
      // tags might be array in DB — convert to comma string for the form
      setItems(
        (data as Array<JournalPost & { tags: string[] | string }>).map((p) => ({
          ...p,
          tags: Array.isArray(p.tags) ? p.tags.join(", ") : p.tags ?? "",
        }))
      );
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function select(item: JournalPost) {
    setForm({ ...item });
    setMsg("");
  }

  function reset() {
    setForm(emptyJournal);
    setMsg("");
  }

  function set(field: keyof JournalPost, value: unknown) {
    setForm((f) => {
      const next = { ...f, [field]: value } as JournalPost;
      if (field === "title" && !f.id) {
        next.slug = toSlug(value as string);
      }
      return next;
    });
  }

  async function save() {
    if (!supabase) return;
    setSaving(true);
    setMsg("");
    const tagsArray = form.tags
      ? form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];
    const payload = { ...form, tags: tagsArray };
    const { error } = form.id
      ? await supabase.from("journal").update(payload).eq("id", form.id)
      : await supabase.from("journal").insert(payload);
    setSaving(false);
    if (error) {
      setMsg("Error: " + error.message);
    } else {
      setMsg("Saved!");
      reset();
      load();
    }
  }

  async function del() {
    if (!supabase || !form.id) return;
    if (!confirm("Delete this journal post?")) return;
    setDeleting(true);
    const { error } = await supabase.from("journal").delete().eq("id", form.id);
    setDeleting(false);
    if (error) {
      setMsg("Error: " + error.message);
    } else {
      setMsg("Deleted.");
      reset();
      load();
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Journal ({items.length})
          </h2>
          <button
            onClick={reset}
            className="text-xs text-terracotta hover:underline"
          >
            + New post
          </button>
        </div>
        <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => select(item)}
              className={`w-full text-left px-3 py-2.5 border rounded text-sm transition-colors ${
                form.id === item.id
                  ? "border-terracotta bg-terracotta/5 text-terracotta"
                  : "border-gray-200 bg-white hover:border-gray-300 text-gray-800"
              }`}
            >
              <div className="font-medium">{item.title}</div>
              <div className="text-xs text-gray-400 mt-0.5">
                {item.date || "no date"} · {item.slug}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded p-5 space-y-3">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
          {form.id ? "Edit post" : "New post"}
        </h2>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Title</label>
            <input
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Slug</label>
            <input
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400 font-mono"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Excerpt</label>
            <textarea
              rows={3}
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400 resize-none"
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Cover image URL</label>
            <input
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.cover_image_url}
              onChange={(e) => set("cover_image_url", e.target.value)}
            />
            {form.cover_image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.cover_image_url}
                alt="preview"
                className="mt-2 h-14 object-cover rounded border border-gray-200"
              />
            )}
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Date</label>
            <input
              type="date"
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Tags <span className="text-gray-400">(comma-separated)</span>
            </label>
            <input
              className="border border-gray-200 rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-gray-400"
              value={form.tags}
              placeholder="silver, rings, gemstones"
              onChange={(e) => set("tags", e.target.value)}
            />
          </div>
        </div>

        {msg && (
          <p className={`text-xs ${msg.startsWith("Error") ? "text-red-500" : "text-green-600"}`}>
            {msg}
          </p>
        )}

        <div className="flex gap-2 pt-1">
          <button
            onClick={save}
            disabled={saving || !form.title}
            className="flex-1 bg-terracotta text-white text-xs tracking-wider uppercase py-2.5 rounded hover:bg-terracotta/80 transition-colors disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          {form.id && (
            <button
              onClick={del}
              disabled={deleting}
              className="px-4 bg-red-500 text-white text-xs tracking-wider uppercase py-2.5 rounded hover:bg-red-600 transition-colors disabled:opacity-40"
            >
              {deleting ? "…" : "Delete"}
            </button>
          )}
          <button
            onClick={reset}
            className="px-4 bg-gray-100 text-gray-600 text-xs tracking-wider uppercase py-2.5 rounded hover:bg-gray-200 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("rings");
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "rings", label: "Rings" },
    { key: "workshops", label: "Workshops" },
    { key: "gallery", label: "Gallery" },
    { key: "journal", label: "Journal" },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <span className="font-display text-xl tracking-widest text-void">
          KROOK <span className="font-sans text-xs tracking-[0.15em] uppercase text-gray-400 ml-2">Admin</span>
        </span>
        <button
          onClick={logout}
          disabled={loggingOut}
          className="text-xs text-gray-500 hover:text-gray-800 tracking-wider uppercase transition-colors disabled:opacity-40"
        >
          {loggingOut ? "…" : "Log out"}
        </button>
      </header>

      {/* Tab nav */}
      <nav className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-0">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-3.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                tab === key
                  ? "border-terracotta text-terracotta"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {!supabase && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded px-4 py-3 text-sm text-amber-800">
            Supabase is not configured. Set <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> environment variables.
          </div>
        )}
        {tab === "rings" && <RingsTab />}
        {tab === "workshops" && <WorkshopsTab />}
        {tab === "gallery" && <GalleryTab />}
        {tab === "journal" && <JournalTab />}
      </main>
    </div>
  );
}
