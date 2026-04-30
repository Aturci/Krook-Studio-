export type Workshop = {
  id: number;
  title: string;
  description: string;
  date: string;
  spotsTotal: number;
  spotsRemaining: number;
  price: number;
};

export const workshops: Workshop[] = [
  {
    id: 1,
    title: "Wax Carving Vol.I",
    description:
      "Learn the ancient art of lost-wax carving in a small group setting in the Krook studio. You'll carve your own ring from wax block using professional tools, then have it cast in sterling silver. No experience needed — just curiosity and steady hands. You leave with a one-of-a-kind piece and the knowledge to make more.",
    date: "2025-06-14",
    spotsTotal: 6,
    spotsRemaining: 2,
    price: 85,
  },
  {
    id: 2,
    title: "Stone Setting Workshop",
    description:
      "Get hands-on with bezel and prong setting techniques used in every Krook piece. You'll work with a pre-made silver base and choose your stone from the studio collection, then set it yourself under close guidance. By the end you'll understand why handmade jewelry looks the way it does — and why machines can't replicate it.",
    date: "2025-07-05",
    spotsTotal: 6,
    spotsRemaining: 4,
    price: 110,
  },
];
