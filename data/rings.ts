export type Ring = {
  id: number;
  name: string;
  slug: string;
  material: string;
  stone: string;
  description: string;
  price: number;
  category: "collection" | "one-of-a-kind" | "fashion";
  image: string;
  imageAlt?: string;
  madeToOrder: boolean;
};

export const rings: Ring[] = [
  {
    id: 1,
    name: "Garnet Claw",
    slug: "garnet-claw",
    material: "Sterling silver",
    stone: "Raw garnet",
    description:
      "Primal and unapologetic. A raw garnet gripped by hand-forged silver claws — like something unearthed from a forgotten tomb. Each piece carries its own inclusions, its own story.",
    price: 180,
    category: "collection",
    image: "https://picsum.photos/seed/olivewood/600/700",
    imageAlt: "Olive tree roots",
    madeToOrder: false,
  },
  {
    id: 2,
    name: "Moonstone Dome",
    slug: "moonstone-dome",
    material: "Sterling silver",
    stone: "Cabochon moonstone",
    description:
      "A full moon caught in silver. The adularescence shifts with every angle of light — milky, ethereal, alive. Set in a heavy oxidised band that grounds the otherworldly stone.",
    price: 220,
    category: "collection",
    image: "https://picsum.photos/seed/rockpattern/600/700",
    imageAlt: "Organic rock pattern",
    madeToOrder: false,
  },
  {
    id: 3,
    name: "Citrine Slab",
    slug: "citrine-slab",
    material: "Brass with silver plating",
    stone: "Raw citrine slice",
    description:
      "A slab of frozen sunlight. The citrine is kept raw, unpolished, set flat like a geological specimen. Bold enough to start conversations, strange enough to end them.",
    price: 290,
    category: "one-of-a-kind",
    image: "https://picsum.photos/seed/bark/600/700",
    imageAlt: "Bark texture",
    madeToOrder: true,
  },
  {
    id: 4,
    name: "Labradorite Nest",
    slug: "labradorite-nest",
    material: "Sterling silver",
    stone: "Labradorite",
    description:
      "Woven silver wire cradles a labradorite that flashes blue and green depending on the light. The nest setting is intentionally irregular — no two are identical.",
    price: 250,
    category: "one-of-a-kind",
    image: "https://picsum.photos/seed/labradorite-nest/600/700",
    madeToOrder: false,
  },
  {
    id: 5,
    name: "Red Star Signet",
    slug: "red-star-signet",
    material: "Oxidised sterling silver",
    stone: "Red garnet inlay",
    description:
      "A signet ring reborn as a relic. The star motif is hand-engraved, the garnet inlay blood-red against the darkened silver. Wear it like a seal, wear it like a scar.",
    price: 160,
    category: "fashion",
    image: "https://picsum.photos/seed/red-star-signet/600/700",
    madeToOrder: false,
  },
  {
    id: 6,
    name: "Obsidian Crown",
    slug: "obsidian-crown",
    material: "Sterling silver",
    stone: "Obsidian",
    description:
      "Volcanic glass set in a crown of jagged silver spires. The obsidian is mirror-black, cut to reveal its glassy fracture. Heavy, dramatic, not for the faint-hearted.",
    price: 320,
    category: "fashion",
    image: "https://picsum.photos/seed/obsidian-crown/600/700",
    madeToOrder: true,
  },
];
