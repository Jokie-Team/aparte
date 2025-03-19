import { NextApiRequest, NextApiResponse } from "next";
import { fetchExhibitionDetails } from "@/lib/exhibitions/fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid exhibition ID" });
  }

  try {
    const details = await fetchExhibitionDetails(id, false);
    res.status(200).json(details);
  } catch (error) {
    console.error(`Error fetching exhibition details for ID ${id}:`, error);
    res.status(500).json({ error: "Failed to fetch exhibition details" });
  }
}
