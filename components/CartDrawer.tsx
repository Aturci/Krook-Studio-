"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-void border-l border-ash z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ash">
              <span className="font-display text-sm tracking-widest text-bone uppercase">
                Your Cart
              </span>
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="text-bone/60 hover:text-bone transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Empty state */}
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
              <div className="text-4xl opacity-20">◇</div>
              <p className="font-serif text-lg text-bone/60">
                Your cart is empty.
              </p>
              <p className="font-sans text-sm text-bone/40">
                Go find something worth wearing.
              </p>
              <Link
                href="/shop"
                onClick={onClose}
                className="mt-4 px-6 py-3 bg-rust text-bone font-sans text-sm tracking-widest uppercase hover:bg-rust/80 transition-colors"
              >
                Explore the Shop
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
