import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Entry from "@/lib/entryModel";

export async function GET() {
  await connectDb();
  const entries = await Entry.find().sort({ createdAt: -1 });
  return NextResponse.json(entries);
}

export async function POST(request: Request) {
  await connectDb();
  const body = await request.json();
  const { name, username, password, url, notes, status, risk } = body;

  if (!name || !username || !password) {
    return NextResponse.json(
      { message: "name, username, password required" },
      { status: 400 }
    );
  }

  const entry = await Entry.create({ name, username, password, url, notes, status, risk });
  return NextResponse.json(entry, { status: 201 });
}
