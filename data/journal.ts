export type JournalPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  date: string;
  tags: string[];
};

export const journalPosts: JournalPost[] = [
  {
    id: 1,
    title: "Why I stopped polishing my work",
    slug: "why-i-stopped-polishing",
    excerpt:
      "Perfection is a lie jewelers tell themselves. The scratch, the asymmetry, the inclusion in the stone — these aren't flaws to hide. They're the proof that a human made this thing. I stopped chasing the mirror finish and started chasing something true.",
    coverImage: "https://picsum.photos/seed/journal-polishing/800/500",
    date: "2025-05-10",
    tags: ["process", "philosophy", "craft"],
  },
  {
    id: 2,
    title: "Finding stones in a Berlin market",
    slug: "finding-stones-berlin-market",
    excerpt:
      "Every Sunday I go to the Mauerpark flea market before the tourists arrive. This is where the stones are — tucked inside old cigar boxes, wrapped in newspaper, priced by feel. A labradorite that cost three euros became the centrepiece of the Nest ring. You can't plan that.",
    coverImage: "https://picsum.photos/seed/journal-berlin-market/800/500",
    date: "2025-04-22",
    tags: ["berlin", "materials", "process"],
  },
];
