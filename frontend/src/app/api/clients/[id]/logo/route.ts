import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let _id: ObjectId;
    try {
      _id = new ObjectId(id);
    } catch {
      return NextResponse.json({ error: "Invalid client id" }, { status: 400 });
    }

    const { db, bucket } = await connectToDatabase();
    if (!db || !bucket) {
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    }

    const client = await db.collection("clients").findOne({ _id });
    if (!client || !client.fileId) {
      return NextResponse.json({ error: "Client logo not found" }, { status: 404 });
    }

    // Read GridFS stream into buffer
    const chunks: Buffer[] = [];
    const downloadStream = bucket.openDownloadStream(client.fileId);

    const buffer = await new Promise<Buffer>((resolve, reject) => {
      downloadStream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
      downloadStream.on("error", reject);
      downloadStream.on("end", () => resolve(Buffer.concat(chunks)));
    });

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": client.contentType || "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("Logo fetch error:", err);
    return NextResponse.json({ error: "Could not retrieve logo" }, { status: 500 });
  }
}
