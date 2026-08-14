import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, memoryCareers } from "@/lib/db";
import { sendCareerApplicationEmail } from "@/lib/emailService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, position, portfolio, coverLetter } = body || {};

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone number are required." },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const application = {
      id: Date.now().toString(36),
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      position: position ? String(position).trim() : "General Application",
      portfolio: portfolio ? String(portfolio).trim() : "",
      coverLetter: coverLetter ? String(coverLetter).trim() : "",
      createdAt: new Date(),
      status: "new",
    };

    let insertedId = application.id;
    if (db) {
      const result = await db.collection("careers").insertOne(application);
      insertedId = result.insertedId.toString();
    } else {
      memoryCareers.unshift(application);
    }

    sendCareerApplicationEmail({ ...application, createdAt: new Date() }).catch((err) => {
      console.error("[careers email dispatch error]", err);
    });

    return NextResponse.json(
      {
        ok: true,
        id: insertedId,
        message: "Application submitted successfully! Our HR team will get in touch.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Careers API error:", err);
    return NextResponse.json({ error: (err as Error).message || "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    if (db) {
      const list = await db
        .collection("careers")
        .find()
        .sort({ createdAt: -1 })
        .toArray();
      return NextResponse.json(list);
    }
    return NextResponse.json(memoryCareers);
  } catch (err) {
    console.error("Careers list error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
