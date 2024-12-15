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
      artistCollection {
        items {
          name
          picture { url }
          bio
          exhibitionsCollection {
            items {
              ... on Exhibition {
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
