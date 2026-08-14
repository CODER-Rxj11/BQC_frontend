import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    if (!db) {
      return NextResponse.json([]);
    }

    const host = req.headers.get("host") || "";
    const protocol = req.headers.get("x-forwarded-proto") || "https";
    const base = `${protocol}://${host}`;

    const items = await db
      .collection("clients")
      .find({}, { projection: { name: 1, order: 1 } })
      .sort({ order: 1, name: 1 })
      .toArray();

    const formatted = items.map((c) => ({
      id: c._id.toString(),
      name: c.name,
      order: c.order ?? 0,
      logoUrl: `${base}/api/clients/${c._id.toString()}/logo`,
    }));

    return NextResponse.json(formatted, {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=3600",
      },
    });
  } catch (err) {
    console.error("Clients API error:", err);
    return NextResponse.json([], { status: 200 });
  }
}
