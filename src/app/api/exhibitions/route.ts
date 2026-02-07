import { fetchAllExhibitions, fetchExhibitionById } from "@/lib/exhibitions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const details = searchParams.get("details") === "true";

  try {
    const exhibitions = await fetchAllExhibitions(false, details);
    return NextResponse.json(exhibitions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
