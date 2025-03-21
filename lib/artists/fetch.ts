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

export async function fetchArtistById(id: string, preview = false): Promise<Artist> {
  const query = `
    query {
      artist(id: $id) {
        sys { id }
        name
        bio
        picture {
          url
          title
          description
          width
          height
        }
        exhibitionsCollection(limit: 5) {
          items {
            sys { id }
            title
          }
        }
        artworksCollection(limit: 10) {
          items {
            sys { id }
            name
            imagesCollection(limit: 1) {
              items {
                url
                title
                description
              }
            }
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
    id: artist.sys.id,
    name: artist.name,
    bio: artist.bio,
    picture: artist.picture,
    exhibitions: artist.exhibitionsCollection?.items.map((ex: any) => ({
      id: ex.sys.id,
      title: ex.title,
    })) || [],
    artworks: artist.artworksCollection?.items.map((art: any) => ({
      id: art.sys.id,
      name: art.name || "",
      images:
        art.imagesCollection?.items.map((img: any) => ({
          url: img.url,
          title: img.title || "",
          description: img.description || "",
        })) || [],
    })) || [],
  };
}
