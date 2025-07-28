import { fetchGraphQL } from "../api";
import { Artwork } from "../artworks";
import { Exhibition } from "../exhibitions";

export interface Artist {
  id: string;
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
  exhibitions: Exhibition[];
  artworks: Artwork[];
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

export async function fetchArtistDetails(
  artistId: string,
  preview = false
): Promise<Partial<Artist>> {
  const query = `
    query {
      artist(id: "${artistId}") {
        exhibitionsCollection(limit: 5) {
          items {
            sys { id }
            title
            picture { url }
            startDate
            endDate
          }
        }
        artworksCollection(limit: 10) {
          items {
            sys { id }
            name
            imagesCollection(limit: 1) {
              items {
                url(transform: { quality: 10 }) 
                title
                description
              }
            }
            available
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, preview);

  if (response.errors) {
    console.error(response.errors);
    throw new Error("Failed to fetch Artist by ID");
  }

  const artist = response.data.artist;

  return {
    exhibitions:
      artist.exhibitionsCollection?.items.map((ex: any) => ({
        id: ex.sys.id,
        title: ex.title,
        picture: ex.picture,
        startDate: ex.startDate,
        endDate: ex.endDate,
      })) || [],
    artworks:
      artist.artworksCollection?.items.map((art: any) => ({
        id: art.sys.id,
        name: art.name || "",
        images:
          art.imagesCollection?.items.map((img: any) => ({
            url: img.url,
            title: img.title || "",
            description: img.description || "",
          })) || [],
        available: art.available,
      })) || [],
  };
}
