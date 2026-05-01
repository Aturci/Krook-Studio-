import Link from "next/link";

const footerLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/workshops", label: "Workshops" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ash/30 bg-void">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="font-display text-lg tracking-widest text-bone">
            KROOK
          </Link>
          <p className="font-serif text-base text-bone/60 leading-relaxed max-w-xs">
            Bold handcrafted treasures with that raw organic beauty present in nature.
            Made by hand in Berlin.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <span className="font-sans text-xs tracking-widest uppercase text-bone/30">
            Navigate
          </span>
          <ul className="flex flex-col gap-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-sm text-bone/60 hover:text-bone transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / Social */}
        <div className="flex flex-col gap-4">
          <span className="font-sans text-xs tracking-widest uppercase text-bone/30">
            Find us
          </span>
          <a
            href="https://instagram.com/krook.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm text-bone/60 hover:text-bone transition-colors"
          >
            @krook.studio
          </a>
          <span className="font-sans text-sm text-bone/40">Berlin · Cape Town</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ash/20 px-6 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-sans text-xs text-bone/30">
          © {new Date().getFullYear()} Krook Studio. All rights reserved.
        </p>
        <p className="font-sans text-xs text-bone/20 tracking-widest uppercase">
          raw · organic · underground
        </p>
      </div>
    </footer>
  );
}
