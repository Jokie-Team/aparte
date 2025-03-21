import { fetchAllArtists, fetchArtistDetails } from "@/lib/artists";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const artist = await fetchArtistDetails(id);
      return NextResponse.json(artist);
    } else {
      const artists = await fetchAllArtists();
      return NextResponse.json(artists);
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
