import { fetchGraphQL } from "../api";
import { Exhibition } from "../exhibitions";

export interface Artist {
  id: string;
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

const artistsCache: { [key: string]: Artist[] } = {};

export async function fetchAllArtists(preview = false): Promise<Artist[]> {
  const cacheKey = preview ? "preview" : "production";

  if (artistsCache[cacheKey]) {
    return artistsCache[cacheKey];
  }

  const query = `
    {
      artistCollection(limit: 400) {
        items {
          sys { id }
          name
          picture { url }
          bio
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, preview);
  if (response.errors) {
    console.log(response.errors);
    throw new Error("Failed to fetch artists");
  }

  const artists = response.data.artistCollection.items.map((artist: any) => ({
    id: artist.sys.id,
    name: artist.name,
    picture: artist.picture,
    bio: artist.bio,
    exhibitions: [],
  }));

  artistsCache[cacheKey] = artists;
  return artists;
}

export async function fetchArtistExhibitions(
  artistId: string,
  preview = false
): Promise<Exhibition[]> {
  const query = `
    query {
      artist(id: "${artistId}") {
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
  `;

  const response = await fetchGraphQL(query, preview);
  if (response.errors) {
    console.error(response.errors);
    throw new Error(`Failed to fetch exhibitions for artist ${artistId}`);
  }

  return response.data.artist.exhibitionsCollection?.items || [];
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
