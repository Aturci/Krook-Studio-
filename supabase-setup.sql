-- ============================================================
-- Krook Studio — Supabase Setup
-- Run once in the Supabase SQL Editor
-- ============================================================

-- ── RINGS ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rings (
  id            serial PRIMARY KEY,
  name          text        NOT NULL,
  slug          text        NOT NULL UNIQUE,
  material      text        NOT NULL,
  stone         text        NOT NULL,
  description   text        NOT NULL,
  price         integer     NOT NULL,
  category      text        NOT NULL CHECK (category IN ('collection', 'one-of-a-kind', 'fashion')),
  image         text        NOT NULL,
  image_alt     text,
  made_to_order boolean     NOT NULL DEFAULT false,
  sort_order    integer     NOT NULL DEFAULT 0
);

ALTER TABLE rings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read rings" ON rings FOR SELECT USING (true);

INSERT INTO rings (name, slug, material, stone, description, price, category, image, image_alt, made_to_order, sort_order) VALUES
(
  'Garnet Claw',
  'garnet-claw',
  'Sterling silver',
  'Raw garnet',
  'Primal and unapologetic. A raw garnet gripped by hand-forged silver claws — like something unearthed from a forgotten tomb. Each piece carries its own inclusions, its own story.',
  180,
  'collection',
  'https://picsum.photos/seed/olivewood/600/700',
  'Olive tree roots',
  false,
  1
),
(
  'Moonstone Dome',
  'moonstone-dome',
  'Sterling silver',
  'Cabochon moonstone',
  'A full moon caught in silver. The adularescence shifts with every angle of light — milky, ethereal, alive. Set in a heavy oxidised band that grounds the otherworldly stone.',
  220,
  'collection',
  'https://picsum.photos/seed/rockpattern/600/700',
  'Organic rock pattern',
  false,
  2
),
(
  'Citrine Slab',
  'citrine-slab',
  'Brass with silver plating',
  'Raw citrine slice',
  'A slab of frozen sunlight. The citrine is kept raw, unpolished, set flat like a geological specimen. Bold enough to start conversations, strange enough to end them.',
  290,
  'one-of-a-kind',
  'https://picsum.photos/seed/bark/600/700',
  'Bark texture',
  true,
  3
),
(
  'Labradorite Nest',
  'labradorite-nest',
  'Sterling silver',
  'Labradorite',
  'Woven silver wire cradles a labradorite that flashes blue and green depending on the light. The nest setting is intentionally irregular — no two are identical.',
  250,
  'one-of-a-kind',
  'https://picsum.photos/seed/labradorite-nest/600/700',
  NULL,
  false,
  4
),
(
  'Red Star Signet',
  'red-star-signet',
  'Oxidised sterling silver',
  'Red garnet inlay',
  'A signet ring reborn as a relic. The star motif is hand-engraved, the garnet inlay blood-red against the darkened silver. Wear it like a seal, wear it like a scar.',
  160,
  'fashion',
  'https://picsum.photos/seed/red-star-signet/600/700',
  NULL,
  false,
  5
),
(
  'Obsidian Crown',
  'obsidian-crown',
  'Sterling silver',
  'Obsidian',
  'Volcanic glass set in a crown of jagged silver spires. The obsidian is mirror-black, cut to reveal its glassy fracture. Heavy, dramatic, not for the faint-hearted.',
  320,
  'fashion',
  'https://picsum.photos/seed/obsidian-crown/600/700',
  NULL,
  true,
  6
);


-- ── WORKSHOPS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS workshops (
  id               serial PRIMARY KEY,
  title            text    NOT NULL,
  description      text    NOT NULL,
  date             date    NOT NULL,
  city             text    NOT NULL CHECK (city IN ('Berlin', 'Cape Town')),
  spots_total      integer NOT NULL,
  spots_remaining  integer NOT NULL,
  price            integer NOT NULL
);

ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read workshops" ON workshops FOR SELECT USING (true);

INSERT INTO workshops (title, description, date, city, spots_total, spots_remaining, price) VALUES
(
  'Wax Carving Vol.I',
  'Learn the ancient art of lost-wax carving in a small group setting in the Krook studio. You''ll carve your own ring from wax block using professional tools, then have it cast in sterling silver. No experience needed — just curiosity and steady hands. You leave with a one-of-a-kind piece and the knowledge to make more.',
  '2026-09-20',
  'Berlin',
  6,
  6,
  85
),
(
  'Stone Setting Workshop',
  'Get hands-on with bezel and prong setting techniques used in every Krook piece. You''ll work with a pre-made silver base and choose your stone from the studio collection, then set it yourself under close guidance. By the end you''ll understand why handmade jewelry looks the way it does.',
  '2026-10-04',
  'Cape Town',
  6,
  6,
  110
),
(
  'Wax Carving Vol.II',
  'A deeper dive into wax carving for those who have done the intro session. We focus on more complex forms — hollow structures, textured surfaces, and multi-part settings. Bring a sketch of what you want to make.',
  '2026-10-18',
  'Berlin',
  5,
  5,
  95
),
(
  'Ring Fabrication',
  'Start from sheet and wire, end with a finished ring. This session covers sawing, filing, soldering, and finishing. No casting, no shortcuts — pure bench work. The most honest introduction to the craft.',
  '2026-11-08',
  'Cape Town',
  6,
  6,
  120
);


-- ── JOURNAL POSTS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS journal_posts (
  id           serial PRIMARY KEY,
  title        text        NOT NULL,
  slug         text        NOT NULL UNIQUE,
  excerpt      text        NOT NULL,
  cover_image  text        NOT NULL,
  date         date        NOT NULL,
  tags         text[]      NOT NULL DEFAULT '{}'
);

ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read journal_posts" ON journal_posts FOR SELECT USING (true);

INSERT INTO journal_posts (title, slug, excerpt, cover_image, date, tags) VALUES
(
  'Why I stopped polishing my work',
  'why-i-stopped-polishing',
  'Perfection is a lie jewelers tell themselves. The scratch, the asymmetry, the inclusion in the stone — these aren''t flaws to hide. They''re the proof that a human made this thing. I stopped chasing the mirror finish and started chasing something true.',
  'https://picsum.photos/seed/journal-polishing/800/500',
  '2025-05-10',
  '{process,philosophy,craft}'
),
(
  'Finding stones in a Berlin market',
  'finding-stones-berlin-market',
  'Every Sunday I go to the Mauerpark flea market before the tourists arrive. This is where the stones are — tucked inside old cigar boxes, wrapped in newspaper, priced by feel. A labradorite that cost three euros became the centrepiece of the Nest ring. You can''t plan that.',
  'https://picsum.photos/seed/journal-berlin-market/800/500',
  '2025-04-22',
  '{berlin,materials,process}'
);


-- ── GALLERY ITEMS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_items (
  id                   serial PRIMARY KEY,
  image                text    NOT NULL,
  title                text    NOT NULL,
  linked_product_slug  text,
  sort_order           integer NOT NULL DEFAULT 0
);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gallery_items" ON gallery_items FOR SELECT USING (true);

INSERT INTO gallery_items (image, title, linked_product_slug, sort_order) VALUES
('https://picsum.photos/seed/gallery-ring1/600/800',  'Garnet Claw in natural light',        'garnet-claw',     1),
('https://picsum.photos/seed/gallery-studio1/600/900','Berlin studio — the bench',            NULL,              2),
('https://picsum.photos/seed/gallery-ring2/600/700',  'Moonstone Dome on skin',               'moonstone-dome',  3),
('https://picsum.photos/seed/gallery-process1/600/1000','Wax carving in progress',            NULL,              4),
('https://picsum.photos/seed/gallery-ring3/600/750',  'Obsidian Crown close-up',              'obsidian-crown',  5),
('https://picsum.photos/seed/gallery-stones/600/850', 'Stone collection — Mauerpark finds',  NULL,              6),
('https://picsum.photos/seed/gallery-ring4/600/700',  'Labradorite Nest — flash detail',      'labradorite-nest',7),
('https://picsum.photos/seed/gallery-studio2/600/900','Tools of the trade',                   NULL,              8);
