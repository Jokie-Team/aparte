import { fetchExhibitionById } from "@/lib/exhibitions/fetch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const exhibition = await fetchExhibitionById(id);
    if (!exhibition) {
      return NextResponse.json(
        { error: "Exhibition not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(exhibition);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch exhibition" },
      { status: 500 },
    );
  }
}
