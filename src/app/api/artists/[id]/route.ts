import { fetchArtistById } from "@/lib/artists";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const artist = await fetchArtistById(id);
    if (!artist) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }
    return NextResponse.json(artist);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch artist" },
      { status: 500 },
    );
  }
}
