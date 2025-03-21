import { NextApiRequest, NextApiResponse } from "next";
import { fetchArtistDetails } from "@/lib/artists";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid artist ID" });
  }

  try {
    const details = await fetchArtistDetails(id, false);

    res.status(200).json(details);
  } catch (error) {
    console.error(`Error fetching artist details for ID ${id}:`, error);
    res.status(500).json({ error: "Failed to fetch artist details" });
  }
}
