export type GalleryItem = {
  id: number;
  image: string;
  title: string;
  linkedProductSlug?: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "https://picsum.photos/seed/gallery-ring1/600/800",
    title: "Garnet Claw in natural light",
    linkedProductSlug: "garnet-claw",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/gallery-studio1/600/900",
    title: "Berlin studio — the bench",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/gallery-ring2/600/700",
    title: "Moonstone Dome on skin",
    linkedProductSlug: "moonstone-dome",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/gallery-process1/600/1000",
    title: "Wax carving in progress",
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/gallery-ring3/600/750",
    title: "Obsidian Crown close-up",
    linkedProductSlug: "obsidian-crown",
  },
  {
    id: 6,
    image: "https://picsum.photos/seed/gallery-stones/600/850",
    title: "Stone collection — Mauerpark finds",
  },
  {
    id: 7,
    image: "https://picsum.photos/seed/gallery-ring4/600/700",
    title: "Labradorite Nest — flash detail",
    linkedProductSlug: "labradorite-nest",
  },
  {
    id: 8,
    image: "https://picsum.photos/seed/gallery-studio2/600/900",
    title: "Tools of the trade",
  },
];
