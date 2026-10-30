export type TabId = "feed" | "places" | "talents";

export type PillId = "hitech" | "wifi" | "next";

export type Filters = {
  pill: PillId | null;
  query: string;
};

export const pills: { id: PillId; label: string; context: string }[] = [
  { id: "hitech", label: "#HITECH_City", context: "HITEC City corridor" },
  { id: "wifi", label: "#150Mbps_WiFi", context: "150 Mbps and up" },
  { id: "next", label: "#NextJS_Devs", context: "Next.js builders" },
];

export type PulseItem = {
  id: string;
  kicker: string;
  title: string;
  detail: string;
  meta: string;
  tone: "cyber" | "ion" | "volt";
  tags: PillId[];
  search: string;
};

export type Cafe = {
  id: string;
  name: string;
  area: string;
  wifi: number;
  outlets: number;
  vibe: string;
  vibeScore: number;
  workers: number;
  image: string;
  blurb: string;
  tags: PillId[];
  search: string;
};

export type Desk = {
  id: string;
  name: string;
  area: string;
  image: string;
  left: number;
  dayPrice: number;
  weekPrice: number;
  wifi: number;
  tags: PillId[];
  search: string;
};

export type Talent = {
  id: string;
  name: string;
  role: string;
  area: string;
  skills: string[];
  rate: string;
  preview: "github" | "figma";
  image: string;
  signal: string;
  tags: PillId[];
  search: string;
};

export const pulse: PulseItem[] = [
  {
    id: "fluxlane",
    kicker: "Funding",
    title: "Fluxlane closes ₹48 Cr",
    detail: "Series A for on-device inference, led out of Gachibowli.",
    meta: "2h · Gachibowli",
    tone: "cyber",
    tags: ["hitech"],
    search: "Fluxlane funding Series A Gachibowli HITEC HITECH AI",
  },
  {
    id: "midnight",
    kicker: "Hacker house",
    title: "Midnight Build opens 12 beds",
    detail: "A residents' house for teams shipping through the night.",
    meta: "Today · Jubilee Hills",
    tone: "volt",
    tags: ["next"],
    search: "Midnight Build hacker house Jubilee Hills Next.js",
  },
  {
    id: "meetup",
    kicker: "Meetup",
    title: "Next.js Hyd at T-Hub",
    detail: "Server components, after hours. 180 already in.",
    meta: "Tonight · 7:30",
    tone: "ion",
    tags: ["hitech", "next"],
    search: "Next.js meetup T-Hub Madhapur HITEC HITECH",
  },
  {
    id: "signal",
    kicker: "Signal",
    title: "Financial District hits 220",
    detail: "Third Wave just posted a live test above 200 Mbps.",
    meta: "12m · FD",
    tone: "ion",
    tags: ["hitech", "wifi"],
    search: "Third Wave Financial District wifi 220 Mbps HITEC HITECH",
  },
];

export const cafes: Cafe[] = [
  {
    id: "third-wave",
    name: "The Third Wave",
    area: "Financial District",
    wifi: 220,
    outlets: 8,
    vibe: "Chill / Ambient House Music",
    vibeScore: 68,
    workers: 14,
    image: "/media/third-wave.jpg",
    blurb: "Corner banquettes, late espresso, clean uploads.",
    tags: ["hitech", "wifi"],
    search: "The Third Wave Financial District cafe wifi HITEC HITECH",
  },
  {
    id: "northstar",
    name: "Northstar Coffee",
    area: "Gachibowli",
    wifi: 180,
    outlets: 6,
    vibe: "Focused / Low chatter",
    vibeScore: 38,
    workers: 9,
    image: "/media/northstar.jpg",
    blurb: "Single-origin bar, long tables, heads-down hours.",
    tags: ["hitech", "wifi"],
    search: "Northstar Coffee Gachibowli wifi HITEC HITECH",
  },
  {
    id: "signal-room",
    name: "Signal Room",
    area: "HITEC City",
    wifi: 155,
    outlets: 9,
    vibe: "Social / Indie pop",
    vibeScore: 82,
    workers: 21,
    image: "/media/signal-room.jpg",
    blurb: "Packed after six. Outlets along the window rail.",
    tags: ["hitech", "wifi"],
    search: "Signal Room HITEC City HITECH wifi cafe",
  },
];

export const desks: Desk[] = [
  {
    id: "skyview",
    name: "Skyview Day Pass",
    area: "Financial District",
    image: "/media/skyview.jpg",
    left: 2,
    dayPrice: 699,
    weekPrice: 2499,
    wifi: 300,
    tags: ["hitech", "wifi"],
    search: "Skyview Day Pass Financial District desk HITEC HITECH wifi",
  },
  {
    id: "thub",
    name: "T-Hub Bay",
    area: "Madhapur",
    image: "/media/thub.jpg",
    left: 5,
    dayPrice: 499,
    weekPrice: 1799,
    wifi: 180,
    tags: ["hitech", "wifi", "next"],
    search: "T-Hub Bay Madhapur desk Next.js HITEC HITECH wifi",
  },
  {
    id: "orbit",
    name: "Orbit Desk",
    area: "Gachibowli",
    image: "/media/orbit.jpg",
    left: 1,
    dayPrice: 599,
    weekPrice: 2199,
    wifi: 160,
    tags: ["hitech", "wifi"],
    search: "Orbit Desk Gachibowli HITEC HITECH wifi",
  },
  {
    id: "atrium",
    name: "Atrium 4",
    area: "HITEC City",
    image: "/media/atrium.jpg",
    left: 4,
    dayPrice: 449,
    weekPrice: 1599,
    wifi: 210,
    tags: ["hitech", "wifi"],
    search: "Atrium 4 HITEC City HITECH desk wifi",
  },
];

export const talents: Talent[] = [
  {
    id: "ananya",
    name: "Ananya Rao",
    role: "Product Engineer",
    area: "Gachibowli",
    skills: ["Next.js", "React", "TypeScript", "Tailwind"],
    rate: "₹6,000 / day",
    preview: "github",
    image: "/media/ananya.jpg",
    signal: "Product UI for infra teams that have to feel fast.",
    tags: ["next", "hitech"],
    search: "Ananya Rao Product Engineer Next.js React TypeScript Gachibowli HITEC HITECH",
  },
  {
    id: "kabir",
    name: "Kabir Shah",
    role: "Product Designer",
    area: "Madhapur",
    skills: ["Figma", "Motion", "Brand", "iOS"],
    rate: "₹5,500 / day",
    preview: "figma",
    image: "/media/kabir.jpg",
    signal: "Brand systems and the motion that sells them.",
    tags: ["hitech"],
    search: "Kabir Shah Product Designer Figma Motion Madhapur HITEC HITECH",
  },
  {
    id: "sana",
    name: "Sana Qureshi",
    role: "ML Engineer",
    area: "HITEC City",
    skills: ["Python", "PyTorch", "RAG", "Evals"],
    rate: "₹8,000 / day",
    preview: "github",
    image: "/media/sana.jpg",
    signal: "Eval harnesses for models that speak the city.",
    tags: ["hitech"],
    search: "Sana Qureshi ML Engineer Python PyTorch HITEC HITECH",
  },
  {
    id: "ishaan",
    name: "Ishaan Verma",
    role: "Full-stack",
    area: "Kondapur",
    skills: ["Next.js", "Postgres", "tRPC", "Node"],
    rate: "₹4,500 / day",
    preview: "github",
    image: "/media/ishaan.jpg",
    signal: "Next.js apps with boring, fast data layers.",
    tags: ["next", "hitech"],
    search: "Ishaan Verma Full-stack Next.js Postgres Kondapur HITEC HITECH",
  },
];

export function matches(tags: PillId[], search: string, filters: Filters) {
  if (filters.pill && !tags.includes(filters.pill)) return false;
  const query = filters.query.trim().toLowerCase();
  if (!query) return true;
  return search.toLowerCase().includes(query);
}

export const intents = ["Building", "Hiring", "Remote", "Designing"] as const;
export type Intent = (typeof intents)[number];
