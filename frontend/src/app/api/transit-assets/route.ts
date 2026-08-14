import { NextResponse } from "next/server";

const TRANSIT_FILES = ["as01.png", "pw01.png", "pw02.png", "tvs01.png", "tvs02.png", "tvs03.png", "tvs04.png"];

function getTransitClient(filename: string) {
  const lower = filename.toLowerCase();
  if (lower.startsWith("as")) return "Apollo Sage Hospitals";
  if (lower.startsWith("pw")) return "PhysicsWallah Vidyapeeth";
  if (lower.startsWith("tvs")) return "TVS Motors";
  if (lower.startsWith("hero")) return "Hero MotoCorp";
  if (lower.startsWith("bajaj")) return "Bajaj Auto";
  if (lower.startsWith("mahindra")) return "Mahindra";
  if (lower.startsWith("maruti")) return "Maruti Suzuki";
  return "BrandQube Transit Media";
}

function getTransitTitle(filename: string) {
  const client = getTransitClient(filename);
  return `${client} Outdoor & Transit Branding`;
}

export async function GET() {
  const items = TRANSIT_FILES.map((file) => ({
    id: file,
    filename: file,
    client: getTransitClient(file),
    title: getTransitTitle(file),
    channel: "Outdoor & Transit",
    year: "2025",
    imageUrl: `/work/transit-advertising.png`,
  }));

  return NextResponse.json(items, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
