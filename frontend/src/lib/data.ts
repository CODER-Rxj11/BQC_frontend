/**
 * Single source of truth for site content.
 * Swap these arrays for a CMS/API later without touching components.
 */

export type NavLink = { label: string; href: string };

/** Primary navigation — real routes (multi-page architecture). */
export const nav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Verticals", href: "/verticals" },
  { label: "Work", href: "/work" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const site = {
  name: "BrandQube India",
  legalName: "BrandQube India Pvt. Ltd.",
  tagline: "The Real World Is Our Canvas",
  promise: "Make your brand impossible to ignore.",
  uvp: "We don't just design your brand. We put it everywhere your customers already are.",
  description:
    "BrandQube India is a bold, full-stack advertising agency — outdoor, on-vehicle, on-screen and online. One partner, twelve channels, from the highway to the home screen.",
  email: "sales@brandqubeindia.com",
  phone: "+91 97555 00240",
  whatsapp: "+919755500240",
  address: "Manya Arcade, R/30, Railway Track Side, Zone-II, M.P. Nagar, Bhopal, 462016",
  city: "Bhopal, India",
  url: "https://brandqubeindia.com",
  socials: [
    { label: "Instagram", href: "https://instagram.com/brandqube_communication_" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
};

export type Stat = { value: string; label: string };
export const stats: Stat[] = [
  { value: "12", label: "Advertising channels" },
  { value: "200+", label: "Brands put on the map" },
  { value: "15", label: "Cities covered" },
  { value: "10K+", label: "Campaigns delivered" },
];

/* ── Services: 4 pillars × 12 offerings (blueprint §2.2) ───────────────── */
export type Service = { name: string; blurb: string };
export type Pillar = {
  key: string;
  label: string;
  headline: string;
  intro: string;
  image?: string;
  category?: "outdoor" | "activations" | "retail" | "branding";
  services: Service[];
};

export const pillars: Pillar[] = [
  {
    key: "on-ground-activations",
    label: "On-Ground Activations",
    headline: "Meet them in the moment.",
    intro:
      "High-impact experiential campaigns that connect brands directly with consumers through interactive and memorable engagements.",
    image: "/work/mela-activities.png",
    category: "activations",
    services: [
      { name: "Experiential Campaigns", blurb: "Interactive campaigns connecting brands directly with consumers." },
      { name: "Mela & Exhibition Stalls", blurb: "Temporary showroom setups at Vyapar & RTO melas with live displays." },
      { name: "Roadshows & Field Outreach", blurb: "Crowd engagement programs supported by tent setups & seating." },
    ],
  },
  {
    key: "outdoor-transit-branding",
    label: "Outdoor & Transit",
    headline: "Own every skyline & route.",
    intro:
      "Strategic placement across hoardings, billboards, buses, autos, and high-traffic zones to ensure maximum reach and visibility.",
    image: "/work/transit-advertising.png",
    category: "outdoor",
    services: [
      { name: "Hoardings & Billboards", blurb: "High-visibility placements where the whole city looks up." },
      { name: "Bus & Transit Panels", blurb: "Public bus panels & full wraps for continuous on-road exposure." },
      { name: "Auto Hood Branding", blurb: "Mobility-driven advertising weaving through every city street." },
    ],
  },
  {
    key: "demo-van-campaigns",
    label: "Demo Van Campaigns",
    headline: "Mobile marketing units.",
    intro:
      "Mobile marketing units that take your brand directly to target audiences, driving awareness, lead generation, and test rides.",
    image: "/work/demo-van-activity.png",
    category: "activations",
    services: [
      { name: "Branded Display Vans", blurb: "Custom mobile display units with audio-visual setups." },
      { name: "Live Demos & Test Rides", blurb: "On-the-spot vehicle demonstrations and interactive communication." },
      { name: "Leaflet & Sample Distribution", blurb: "Targeted insertion and direct product information sharing." },
    ],
  },
  {
    key: "retail-showroom-branding",
    label: "Retail & Showroom",
    headline: "Elevate retail presence.",
    intro:
      "Comprehensive showroom branding with ACP work, premium signages, interiors, and impactful visual merchandising.",
    image: "/work/showroom-development.png",
    category: "retail",
    services: [
      { name: "Showroom Development", blurb: "Turnkey retail construction, layout planning & office setups." },
      { name: "ACP Work & Façade Cladding", blurb: "Aluminium composite panel exterior elevation enhancement." },
      { name: "Signage & Visual Merchandising", blurb: "Illuminated 3D signages, display units & traffic stoppers." },
    ],
  },
  {
    key: "corporate-events-promotions",
    label: "Corporate Events",
    headline: "Seamless event execution.",
    intro:
      "Seamless execution of brand launches, dealer meets, product showcases, and promotional events with premium experience delivery.",
    image: "/work/outdoor-indoor-branding.png",
    category: "activations",
    services: [
      { name: "Brand Launches & Dealer Meets", blurb: "Full stage setup, sound, hospitality, and event management." },
      { name: "Product Showcases", blurb: "Interactive display zones designed for direct customer engagement." },
      { name: "Promotional & Loan Melas", blurb: "Financing melas and sales-driven consumer activation events." },
    ],
  },
  {
    key: "wall-wrap-advertising",
    label: "Wall Wrap Advertising",
    headline: "Large-format wall graphics.",
    intro:
      "Large-format, high-impact wall graphics that transform spaces into powerful brand communication tools, ideal for rural visibility.",
    image: "/work/wall-wrap-advertising.png",
    category: "outdoor",
    services: [
      { name: "Rural & Highway Wall Wraps", blurb: "Durable wraps ensuring long-lasting impact across key routes." },
      { name: "Storefront & Building Wraps", blurb: "Custom-designed graphics for showrooms and commercial walls." },
      { name: "Indoor & Outdoor Wall Media", blurb: "Flexible placement in parking areas, malls, and high-traffic zones." },
    ],
  },
  {
    key: "customised-stationery",
    label: "Customised Stationery",
    headline: "Strengthen brand identity.",
    intro:
      "Professionally designed business essentials including letterheads, visiting cards, envelopes, and corporate kits.",
    image: "/work/customised-stationery.png",
    category: "branding",
    services: [
      { name: "Corporate Stationery Kits", blurb: "Letterheads, visiting cards, envelopes, and corporate essentials." },
      { name: "Event Collateral & Displays", blurb: "Standees, gazebos, canopies, selfie booths, and placards." },
      { name: "Brand Identity Print Media", blurb: "High-quality print assets ensuring consistency across touchpoints." },
    ],
  },
];

/* ── Group verticals / business domains ("Our Group", not client industries) ─ */
export type Vertical = {
  slug: string;
  label: string;
  headline: string;
  blurb: string;
  icon: string;
};

// TODO: replace with confirmed subsidiary list
export const verticals: Vertical[] = [
  {
    slug: "ooh-advertising",
    label: "OOH Advertising",
    headline: "Our core canvas.",
    blurb:
      "Hoardings, wall wraps, vehicle and on-ground branding — the business we started with and still lead in.",
    icon: "🏙️",
  },
  {
    slug: "event-management",
    label: "Event Management",
    headline: "Beyond the billboard.",
    blurb: "Launches, activations and on-ground experiences produced end-to-end.",
    icon: "🎪",
  },
  {
    slug: "digital-marketing",
    label: "Digital Marketing",
    headline: "Every screen, covered.",
    blurb: "Performance, social and search that carries the same campaign online.",
    icon: "📱",
  },
];

export const getVertical = (slug: string) => verticals.find((v) => v.slug === slug);

/* ── Case studies (blueprint §2.4) ─────────────────────────────────────── */
export type Project = {
  slug: string;
  client: string;
  title: string;
  channel: string;
  year: string;
  result: string;
  brief: string;
  briefImage?: string;
  canvas: string;
  image: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "transit-advertising",
    client: "BrandQube Transit",
    title: "Continuous On-Road Brand Exposure Across Bus & Auto Media",
    channel: "Transit Advertising",
    year: "2025",
    result: "High-Visibility Routes",
    brief: "High-visibility public bus panels and auto hood branding delivering continuous on-road exposure.",
    briefImage: "/work/transit-brief.png",
    canvas: "Bus & Auto Panels · Pan-India",
    image: "/work/transit-advertising.png",
    featured: true,
  },
  {
    slug: "wall-wrap-advertising",
    client: "BrandQube Wall Wrap",
    title: "Large-Format High-Impact Wall Graphics & Localized Branding",
    channel: "Wall wrap Advertising",
    year: "2025",
    result: "100% Space Flexibility",
    brief: "Transforming walls, buildings, and showroom spaces into powerful branding assets using durable wraps.",
    canvas: "Custom Wall Wraps · Urban & Rural",
    image: "/work/wall-wrap-advertising.png",
  },
  {
    slug: "demo-van-activity",
    client: "BrandQube Mobile Units",
    title: "Mobile Experiential Marketing Units & Product Demonstrations",
    channel: "Demo Van Activity",
    year: "2025",
    result: "Direct Audience Engagement",
    brief: "Fully branded vans traveling across key locations offering live vehicle demonstrations and product awareness.",
    canvas: "Branded Vans · Key Corridors",
    image: "/work/demo-van-activity.png",
  },
  {
    slug: "mela-activities",
    client: "BrandQube Melas",
    title: "Exciting On-Ground Experiences & Live Vehicle Displays",
    channel: "Mela Activities",
    year: "2025",
    result: "Boosted Conversions",
    brief: "Creating high customer engagement through on-ground experiences, vehicle displays, and instant finance options.",
    canvas: "On-Ground Stalls · Mela Events",
    image: "/work/mela-activities.png",
  },
  {
    slug: "showroom-development",
    client: "BrandQube Showrooms",
    title: "Complete Showroom Development, ACP Work & Interior Signages",
    channel: "Showroom Development",
    year: "2025",
    result: "Modern Retail Experience",
    brief: "Premium ACP work, indoor and outdoor signages, and customized office furniture matching showroom standards.",
    canvas: "Showroom Setups · Retail Spaces",
    image: "/work/showroom-development.png",
  },
  {
    slug: "outdoor-indoor-branding",
    client: "BrandQube 360 Branding",
    title: "Integrated Outdoor & Indoor Dealership Branding Solutions",
    channel: "Outdoor & Indoor Branding",
    year: "2025",
    result: "360° Brand Recall",
    brief: "Comprehensive indoor classroom/showroom displays paired with outdoor hoardings, banners, and street branding.",
    canvas: "Indoor & Outdoor · 360° Media",
    image: "/work/outdoor-indoor-branding.png",
  },
];

/* ── Clients (marquee, blueprint §2.5) ─────────────────────────────────── */
export const clients: string[] = [
  "Metro Rides",
  "Aurelia",
  "Nova",
  "Zephyr",
  "Grönt",
  "Rangoli",
  "BrandQube",
  "Lumen",
  "Kite",
  "Orbit",
  "Sable",
  "Pulse",
];

/* ── Process (blueprint §2.6) ──────────────────────────────────────────── */
export type Step = { no: string; title: string; body: string };
export const process: Step[] = [
  { no: "01", title: "Discover", body: "We learn your market, audience and the streets they move through." },
  { no: "02", title: "Design", body: "Bold creative built for the real world — and mocked up on it." },
  { no: "03", title: "Deploy", body: "We produce, print and install across every channel you need." },
  { no: "04", title: "Dominate", body: "Your brand, everywhere — measured, reported and optimised." },
];

/* ── Testimonials (blueprint §2.7) ─────────────────────────────────────── */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  channel: string;
  initials?: string;
  avatar?: string;
};
export const testimonials: Testimonial[] = [
  {
    quote:
      "Within a month our cabs were everywhere. People started recognising us before we'd even spent on digital.",
    name: "Ananya Rao",
    role: "Founder, Metro Rides",
    channel: "Cab Branding",
    initials: "AR",
    avatar: "/testimonials/ananya.webp",
  },
  {
    quote:
      "One highway hoarding did what six months of ads couldn't. BrandQube understands scale like nobody else.",
    name: "Vikram Shah",
    role: "Marketing Head, Aurelia Jewels",
    channel: "Hoardings",
    initials: "VS",
    avatar: "/testimonials/vikram.webp",
  },
  {
    quote:
      "They turned a blank wall into the most photographed spot on campus. That's not signage — that's culture.",
    name: "Meera Iyer",
    role: "Brand Lead, Nova",
    channel: "Wall Painting",
    initials: "MI",
    avatar: "/testimonials/meera.webp",
  },
];

/* ── Contact channel chips (blueprint §2.9) — the 12 services, concise ──── */
export const channelChips: string[] = [
  "On-Ground Activations",
  "Outdoor & Transit Media",
  "Demo Van Campaigns",
  "Retail & Showroom Branding",
  "Corporate Events & Promotions",
  "Wall Wrap Advertising",
  "Customised Stationery",
];

/* ── Lookup helpers (routing / related content) ────────────────────────── */
export const getPillar = (key: string) => pillars.find((p) => p.key === key);

/** Case studies whose channel belongs to a given service pillar. */
export function projectsForPillar(key: string): Project[] {
  const pillar = getPillar(key);
  if (!pillar) return [];
  const names = new Set(pillar.services.map((s) => s.name));
  return projects.filter((p) => names.has(p.channel));
}

/* ── Pan-India Presence Hubs & Operational Network ─────────────────────── */
export type PresenceHub = {
  id: string;
  city: string;
  state: string;
  region: "Central" | "North" | "West" | "South" | "East";
  role: string;
  isHQ?: boolean;
  x: number; // percentage X on map SVG
  y: number; // percentage Y on map SVG
  highlights: string[];
  activeAssets: string;
};

export const presenceHubs: PresenceHub[] = [
  {
    id: "bhopal",
    city: "Bhopal",
    state: "Madhya Pradesh",
    region: "Central",
    role: "Headquarters & Central Production Hub",
    isHQ: true,
    x: 48,
    y: 50,
    highlights: ["Central Ops Base", "Large Format Fabrication", "Statewide Fleet Depot"],
    activeAssets: "1,200+ Active Hoardings & Transit Units",
  },
  {
    id: "indore",
    city: "Indore",
    state: "Madhya Pradesh",
    region: "Central",
    role: "Commercial & Retail Hub",
    x: 43,
    y: 53,
    highlights: ["High-Traffic Commercial Zones", "Auto Hood & Bus Wrap Fleet", "Vyapar Mela Stalls"],
    activeAssets: "850+ Outdoor & Mobility Touchpoints",
  },
  {
    id: "delhi",
    city: "Delhi NCR",
    state: "Delhi / Haryana / UP",
    region: "North",
    role: "Northern Operations Hub",
    x: 44,
    y: 31,
    highlights: ["High-Density Transit Routes", "Corporate Activations", "National Highway Billboards"],
    activeAssets: "2,500+ Metro & Billboard Sites",
  },
  {
    id: "mumbai",
    city: "Mumbai & Pune",
    state: "Maharashtra",
    region: "West",
    role: "Western Regional Network",
    x: 35,
    y: 65,
    highlights: ["Expressway Wall Wraps", "Financial Hub Billboards", "Suburban Bus Wraps"],
    activeAssets: "1,800+ High-Impact Outdoor Sites",
  },
  {
    id: "bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    region: "South",
    role: "Southern Tech & Transit Hub",
    x: 45,
    y: 83,
    highlights: ["IT Corridor Hoardings", "Demo Van Campaigns", "Showroom Branding"],
    activeAssets: "1,100+ Digital & Physical Displays",
  },
  {
    id: "hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    region: "South",
    role: "South-Central Hub",
    x: 52,
    y: 68,
    highlights: ["Highway Wall Wraps", "City Transit Media", "Experiential Roadshows"],
    activeAssets: "900+ Outdoor & Mall Media Units",
  },
  {
    id: "jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    region: "North",
    role: "Northern Heritage & Highway Hub",
    x: 38,
    y: 39,
    highlights: ["National Highway Wraps", "District Campaign Vans", "Retail Frontage"],
    activeAssets: "700+ Rural & Highway Assets",
  },
  {
    id: "lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    region: "North",
    role: "North-Central Highway Hub",
    x: 56,
    y: 38,
    highlights: ["High-Density Wall Painting", "State Transit Wraps", "Field Activations"],
    activeAssets: "1,400+ Highway & Rural Wall Wraps",
  },
  {
    id: "ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    region: "West",
    role: "Western Commercial Hub",
    x: 31,
    y: 50,
    highlights: ["Industrial Corridor Billboards", "Demo Vans", "Corporate Showrooms"],
    activeAssets: "950+ Billboard & Transit Units",
  },
  {
    id: "kolkata",
    city: "Kolkata",
    state: "West Bengal",
    region: "East",
    role: "Eastern Corridor Hub",
    x: 76,
    y: 52,
    highlights: ["Urban Bus Wraps", "Exhibition Stalls", "Wall Graphics Network"],
    activeAssets: "800+ Eastern Transit & Billboard Sites",
  },
];

export const presenceMetrics = [
  { value: "15+", label: "States Covered" },
  { value: "50+", label: "Cities & Districts" },
  { value: "10,000+", label: "Campaign Touchpoints" },
  { value: "24/7", label: "Mobile Transit Fleet" },
];

