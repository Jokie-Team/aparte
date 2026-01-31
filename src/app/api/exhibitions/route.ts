import { fetchAllExhibitions, fetchExhibitionDetails } from "@/lib/exhibitions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const details = searchParams.get("details") === "true";

  try {
    if (id) {
      const exhibition = await fetchExhibitionDetails(id, false);
      return NextResponse.json(exhibition);
    } else {
      const exhibitions = await fetchAllExhibitions(false, details);
      return NextResponse.json(exhibitions);
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
