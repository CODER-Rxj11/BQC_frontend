import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, memoryEnquiries } from "@/lib/db";
import { sendLeadNotificationEmail } from "@/lib/emailService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, city, budget, channels, message } = body || {};

    if (!name || (!email && !phone)) {
      return NextResponse.json(
        { error: "Name and at least email or phone number are required." },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const lead = {
      id: Date.now().toString(36),
      name: String(name).trim(),
      email: email ? String(email).trim() : "",
      phone: phone ? String(phone).trim() : "",
      city: city ? String(city).trim() : "",
      budget: budget ? String(budget).trim() : "",
      channels: Array.isArray(channels) ? channels.map(String) : [],
      message: message ? String(message).trim() : "",
      createdAt: new Date(),
      status: "new",
    };

    let insertedId = lead.id;
    if (db) {
      const result = await db.collection("enquiries").insertOne(lead);
      insertedId = result.insertedId.toString();
    } else {
      memoryEnquiries.unshift(lead);
    }

    // Send email notification in background
    sendLeadNotificationEmail({ ...lead, createdAt: new Date() }).catch((err) => {
      console.error("[enquiries email dispatch error]", err);
    });

    return NextResponse.json(
      {
        ok: true,
        id: insertedId,
        message: "Enquiry stored successfully and sales team notified via email.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Enquiry API error:", err);
    return NextResponse.json({ error: (err as Error).message || "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    if (db) {
      const list = await db
        .collection("enquiries")
        .find()
        .sort({ createdAt: -1 })
        .toArray();
      return NextResponse.json(list);
    }
    return NextResponse.json(memoryEnquiries);
  } catch (err) {
    console.error("Enquiry list error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
