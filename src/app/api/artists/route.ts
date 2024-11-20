import { fetchAllArtists, fetchArtistById } from "@/lib/artists";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const artist = await fetchArtistById(id);
      return NextResponse.json(artist);
    } else {
      const artists = await fetchAllArtists();
      console.log("here");

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
