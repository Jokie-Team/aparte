import { fetchAllExhibitions } from "@/lib/exhibitions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
    } else {
      const exhibitions = await fetchAllExhibitions();
      return NextResponse.json(exhibitions);
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
