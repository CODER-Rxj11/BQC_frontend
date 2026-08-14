import { NextResponse } from "next/server";

const DEMO_VAN_FILES = [
  "Ather01.png", "Ather02.png", "gulf01.png", "gulf02.png", "gulf03.png",
  "hero01.png", "hero02.png", "hero03.png", "jio_cinema.png", "maaza.png",
  "maaza02.png", "maaza03.png", "ms01.png", "ph01.png", "ph02.png",
  "tata_tea.png", "tata_tea02.png", "tvs01.png", "tvs02.png", "tvs03.png",
  "tvs04.png", "tvs05.png"
];

function getDemoVanClient(filename: string) {
  const lower = filename.toLowerCase();
  if (lower.startsWith("ather")) return "Ather Energy";
  if (lower.startsWith("gulf")) return "Gulf Oil";
  if (lower.startsWith("hero")) return "Hero MotoCorp";
  if (lower.startsWith("jio")) return "Jio Cinema";
  if (lower.startsWith("maaza")) return "Maaza";
  if (lower.startsWith("ms")) return "Maruti Suzuki";
  if (lower.startsWith("ph") || lower.startsWith("police") || lower.startsWith("mp")) return "MP Police Headquarters";
  if (lower.startsWith("tata")) return "Tata Tea Agni";
  if (lower.startsWith("tvs")) return "TVS Motors";
  return "BrandQube Demo Van";
}

function getDemoVanTitle(filename: string) {
  const client = getDemoVanClient(filename);
  return `${client} Mobile Experiential Demo Van Campaign`;
}

export async function GET() {
  const items = DEMO_VAN_FILES.map((file) => ({
    id: file,
    filename: file,
    client: getDemoVanClient(file),
    title: getDemoVanTitle(file),
    channel: "Demo Van Campaigns",
    year: "2025",
    imageUrl: `/work/demo-van-activity.png`,
  }));

  return NextResponse.json(items, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
