import { NextResponse } from "next/server";

const CORP_FILES = ["As01.png", "As02.png", "As03.png", "As04.png"];

function getCorporateClient(filename: string) {
  const lower = filename.toLowerCase();
  if (lower.startsWith("as")) return "Apollo Sage Hospitals";
  return "BrandQube Corporate Events";
}

function getCorporateTitle(filename: string) {
  const client = getCorporateClient(filename);
  return `${client} Corporate Event & Brand Promotion`;
}

export async function GET() {
  const items = CORP_FILES.map((file) => ({
    id: file,
    filename: file,
    client: getCorporateClient(file),
    title: getCorporateTitle(file),
    channel: "Corporate Events",
    year: "2025",
    imageUrl: `/work/customised-stationery.png`,
  }));

  return NextResponse.json(items, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
