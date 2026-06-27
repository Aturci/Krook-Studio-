"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col gap-10">
        <div className="text-center">
          <h1 className="font-display text-4xl tracking-widest text-bone">KROOK</h1>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-bone/30 mt-2">Studio admin</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-void border border-ash/40 text-bone font-sans text-sm px-4 py-3 focus:outline-none focus:border-bone/40 placeholder:text-bone/20"
            autoFocus
          />
          {error && (
            <p className="font-sans text-xs text-terracotta">Wrong password. Try again.</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-terracotta text-bone font-sans text-xs tracking-[0.2em] uppercase py-3 hover:bg-terracotta/80 transition-colors disabled:opacity-40"
          >
            {loading ? "Checking…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
