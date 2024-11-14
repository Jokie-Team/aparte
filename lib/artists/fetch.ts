import { fetchGraphQL } from "../api";

interface Artist {
  name: string;
  bio: string;
  image: { url: string };
  artworks: string[];
}

export async function fetchAllArtists(preview = false): Promise<Artist[]> {
  const query = `
    {
      artistCollection {
        items {
          name
          picture { url }
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, preview);
  if (response.errors) throw new Error("Failed to fetch artists");

  return response.data.artistCollection.items;
}

export async function fetchArtistById(id: string, preview = false) {
  const query = `
    query ($id: String!) {
      artist(id: $id) {
        name
        picture { url }
      }
    }
  `;
  const response = await fetchGraphQL(query, preview);

  if (response.errors) throw new Error("Failed to fetch Artist by ID");
  return response.data.artist;
}
