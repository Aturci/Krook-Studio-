export type Workshop = {
  id: number;
  title: string;
  description: string;
  date: string;
  city: "Berlin" | "Cape Town";
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
    date: "2026-05-23",
    city: "Berlin",
    spotsTotal: 6,
    spotsRemaining: 2,
    price: 85,
  },
  {
    id: 2,
    title: "Stone Setting Workshop",
    description:
      "Get hands-on with bezel and prong setting techniques used in every Krook piece. You'll work with a pre-made silver base and choose your stone from the studio collection, then set it yourself under close guidance. By the end you'll understand why handmade jewelry looks the way it does.",
    date: "2026-06-07",
    city: "Cape Town",
    spotsTotal: 6,
    spotsRemaining: 4,
    price: 110,
  },
  {
    id: 3,
    title: "Wax Carving Vol.II",
    description:
      "A deeper dive into wax carving for those who have done the intro session. We focus on more complex forms — hollow structures, textured surfaces, and multi-part settings. Bring a sketch of what you want to make.",
    date: "2026-06-28",
    city: "Berlin",
    spotsTotal: 5,
    spotsRemaining: 5,
    price: 95,
  },
  {
    id: 4,
    title: "Ring Fabrication",
    description:
      "Start from sheet and wire, end with a finished ring. This session covers sawing, filing, soldering, and finishing. No casting, no shortcuts — pure bench work. The most honest introduction to the craft.",
    date: "2026-07-12",
    city: "Cape Town",
    spotsTotal: 6,
    spotsRemaining: 3,
    price: 120,
  },
];
