"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawer from "./CartDrawer";

const shopDropdownLinks = [
  { href: "/shop/collection", label: "Permanent Collection" },
  { href: "/shop/one-of-a-kind", label: "One of a Kind" },
  { href: "/shop/fashion", label: "Fashion" },
];

const navLinks = [
  { href: "/workshops", label: "Workshops" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const cartCount = 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled ? "bg-void border-b border-ash/40" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-base tracking-widest text-bone hover:text-gold transition-colors"
          >
            KROOK
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {/* Shop dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button className="font-sans text-xs tracking-widest uppercase text-bone/70 hover:text-bone transition-colors flex items-center gap-1">
                Shop
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                </svg>
              </button>
              <AnimatePresence>
                {shopOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 bg-void border border-ash/40 py-2 min-w-[200px] z-50"
                  >
                    {shopDropdownLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block px-4 py-2.5 font-sans text-xs tracking-widest uppercase text-bone/60 hover:text-bone hover:bg-ash/10 transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-xs tracking-widest uppercase text-bone/70 hover:text-bone transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Cart icon */}
            <li>
              <button
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
                className="relative text-bone/70 hover:text-bone transition-colors"
              >
                <CartIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-terracotta text-bone text-[10px] rounded-full flex items-center justify-center font-sans">
                    {cartCount}
                  </span>
                )}
              </button>
            </li>
          </ul>

          {/* Mobile: cart + hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative text-bone/70 hover:text-bone transition-colors"
            >
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-terracotta text-bone text-[10px] rounded-full flex items-center justify-center font-sans">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="text-bone/70 hover:text-bone transition-colors"
            >
              <HamburgerIcon />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-void z-40 flex flex-col overflow-y-auto"
          >
            {/* Close button */}
            <div className="flex justify-between items-center px-6 h-16">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="font-display text-base tracking-widest text-bone"
              >
                KROOK
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="text-bone/60 hover:text-bone transition-colors text-3xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Links */}
            <motion.ul
              className="flex-1 flex flex-col items-center justify-center gap-8 py-12"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.07 } },
                hidden: {},
              }}
            >
              {/* Shop expandable */}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex flex-col items-center gap-3"
              >
                <button
                  onClick={() => setMobileShopOpen((v) => !v)}
                  className="font-display text-3xl tracking-widest text-bone hover:text-gold transition-colors flex items-center gap-3"
                >
                  Shop
                  <span className="text-xl">{mobileShopOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence>
                  {mobileShopOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col items-center gap-3 overflow-hidden"
                    >
                      {shopDropdownLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="font-sans text-sm tracking-widest uppercase text-bone/60 hover:text-bone transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>

              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-3xl tracking-widest text-bone hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            {/* Bottom */}
            <div className="px-6 pb-10 text-center">
              <p className="font-sans text-xs tracking-widest text-bone/30 uppercase">
                @krook.studio
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
