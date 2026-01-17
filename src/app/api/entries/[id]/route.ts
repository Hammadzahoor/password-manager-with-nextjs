import { NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Entry from "@/lib/entryModel";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDb();
  const entry = await Entry.findById(params.id);
  if (!entry) {
    return NextResponse.json({ message: "Entry not found" }, { status: 404 });
  }
  return NextResponse.json(entry);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await connectDb();
  const updates = await request.json();
  const entry = await Entry.findByIdAndUpdate(params.id, updates, { new: true });
  if (!entry) {
    return NextResponse.json({ message: "Entry not found" }, { status: 404 });
  }
  return NextResponse.json(entry);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDb();
  const entry = await Entry.findByIdAndDelete(params.id);
  if (!entry) {
    return NextResponse.json({ message: "Entry not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Entry deleted" });
}
