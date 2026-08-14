import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

const DEFAULT_PROJECTS = [
  {
    slug: "transit-advertising",
    client: "BrandQube Transit",
    title: "Continuous On-Road Brand Exposure",
    channel: "Transit Advertising",
    year: "2025",
    result: "High-Visibility Bus & Auto Routes",
    imageUrl: "/work/transit-advertising.png",
    order: 1,
    featured: true,
  },
  {
    slug: "wall-wrap-advertising",
    client: "BrandQube Wall Wrap",
    title: "High-Impact Wall Graphics & Localized Branding",
    channel: "Wall wrap Advertising",
    year: "2025",
    result: "100% Custom Space Flexibility",
    imageUrl: "/work/wall-wrap-advertising.png",
    order: 2,
  },
  {
    slug: "demo-van-activity",
    client: "BrandQube Mobile Units",
    title: "Mobile Experiential Marketing & Lead Generation",
    channel: "Demo Van Activity",
    year: "2025",
    result: "Direct Local Audience Engagement",
    imageUrl: "/work/demo-van-activity.png",
    order: 3,
  },
  {
    slug: "mela-activities",
    client: "BrandQube Melas",
    title: "Exciting On-Ground Experiences & Live Vehicle Displays",
    channel: "Mela Activities",
    year: "2025",
    result: "Boosted Conversions & Customer Trust",
    imageUrl: "/work/mela-activities.png",
    order: 4,
  },
  {
    slug: "showroom-development",
    client: "BrandQube Showrooms",
    title: "Complete Showroom Development & ACP Signage Work",
    channel: "Showroom Development",
    year: "2025",
    result: "Consistent Modern Retail Experience",
    imageUrl: "/work/showroom-development.png",
    order: 5,
  },
  {
    slug: "outdoor-indoor-branding",
    client: "BrandQube 360 Branding",
    title: "Integrated Outdoor & Indoor Dealership Branding",
    channel: "Outdoor & Indoor Branding",
    year: "2025",
    result: "360° Brand Recall Across Key Touchpoints",
    imageUrl: "/work/outdoor-indoor-branding.png",
    order: 6,
  },
];

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    if (!db) {
      return NextResponse.json(DEFAULT_PROJECTS, {
        headers: { "Cache-Control": "public, max-age=3600" },
      });
    }

    const items = await db.collection("projects").find().sort({ order: 1 }).toArray();
    if (!items || items.length === 0) {
      return NextResponse.json(DEFAULT_PROJECTS);
    }

    return NextResponse.json(items, {
      headers: { "Cache-Control": "public, max-age=3600" },
    });
  } catch (err) {
    console.error("Projects API error:", err);
    return NextResponse.json(DEFAULT_PROJECTS);
  }
}
