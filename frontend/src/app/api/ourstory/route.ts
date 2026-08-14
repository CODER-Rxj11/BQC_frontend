import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    if (!db) {
      return NextResponse.json({
        id: "ourstory",
        alt: "BrandQube Execution",
        imageUrl: "/ourstry.webp",
      });
    }

    const host = req.headers.get("host") || "";
    const protocol = req.headers.get("x-forwarded-proto") || "https";
    const base = `${protocol}://${host}`;

    const doc = await db.collection("site_assets").findOne({ key: "ourstory" });
    if (!doc) {
      return NextResponse.json({
        id: "ourstory",
        alt: "BrandQube Execution",
        imageUrl: "/ourstry.webp",
      });
    }

    return NextResponse.json({
      id: doc.key,
      alt: doc.alt || "BrandQube Execution",
      imageUrl: `${base}/ourstry.webp`,
    });
  } catch (err) {
    console.error("Ourstory API error:", err);
    return NextResponse.json({
      id: "ourstory",
      alt: "BrandQube Execution",
      imageUrl: "/ourstry.webp",
    });
  }
}
