import { fetchGraphQL } from "../api";
import { Exhibition } from "../exhibitions";

export interface Artist {
  exhibitions: Exhibition[];
  name: string;
  bio: string;
  picture: {
    url: string;
    alt?: string;
    title?: string;
    description?: string;
    width?: number;
    height?: number;
  };
}

export async function fetchAllArtists(preview = false): Promise<Artist[]> {
  const query = `
    {
      artistCollection(limit: 400) {
        items {
          name
          picture { url }
          bio
          exhibitionsCollection(limit: 5) {
            items {
              ... on Exhibition {
                sys { id }
                title
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, preview);
  if (response.errors) {
    console.log(response.errors);
    throw new Error("Failed to fetch artists");
  }

  return response.data.artistCollection.items.map((artist: any) => ({
    name: artist.name,
    picture: artist.picture,
    bio: artist.bio,
    exhibitions: artist.exhibitionsCollection?.items || [], // Garante que exhibitions é sempre um array
  }));
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
