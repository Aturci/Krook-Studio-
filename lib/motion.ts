import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
