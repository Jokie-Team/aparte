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
    depth?: number;
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
  const CHUNK_SIZE = 200;
  let allArtists: Artist[] = [];
  let hasMore = true;
  let skip = 0;

  const countQuery = `
  query {
    artistCollection {
      total
    }
  }
  `;

  const countResponse = await fetchGraphQL(countQuery, preview);
  if (countResponse.errors) {
    console.error(countResponse.errors);
    throw new Error("Failed to fetch artists count");
  }

  const total = countResponse.data.artistCollection.total;

  while (hasMore) {
    const query = `
    {
      artistCollection(where:{sys:{id_exists:true}}, limit: ${CHUNK_SIZE}, skip: ${skip}) {
        items {
          sys { id }
          name
          picture { url }
          bio
          exhibitionsCollection(where:{sys:{id_exists:true}}, limit: 5) {
            items {
              sys { id }
              title
              picture { url }
              startDate
              endDate
            }
          }
          artworksCollection(where:{sys:{id_exists:true}},limit: 10) {
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
              width
              height
              depth
              technique
            }
          }
        }
      }
    }
  `;

    try {
      const response = await fetchGraphQL(query, preview);

      // Log errors but don't throw - GraphQL can return partial data with errors
      if (response.errors) {
        console.warn(
          "GraphQL errors (continuing with partial data):",
          response.errors,
        );
      }

      const artists = response.data.artistCollection.items.map(
        (artist: any) => ({
          id: artist.sys.id,
          name: artist.name,
          picture: artist.picture,
          bio: artist.bio,
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
                art.imagesCollection?.items
                  ?.filter((img: any) => img !== null)
                  .map((img: any) => ({
                    url: img.url,
                    title: img.title || "",
                    description: img.description || "",
                  })) || [],
              available: art.available,
              width: art.width,
              height: art.height,
              depth: art.depth,
              technique: art.technique,
            })) || [],
        }),
      );

      skip += CHUNK_SIZE;
      hasMore = skip < total;

      allArtists = allArtists.concat(artists);
    } catch (error) {
      console.error(`Error fetching chunk at skip ${skip}:`, error);
      throw error;
    }
  }
  artistsCache[cacheKey] = allArtists;
  return allArtists;
}

export async function fetchArtistById(
  id: string,
  preview = false,
): Promise<Artist | null> {
  try {
    const query = `
    {
      artist(id: "${id}") {
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
        exhibitionsCollection(where:{sys:{id_exists:true}}) {
          items {
            sys { id }
            title
            description
            startDate
            endDate
            picture {
              url
              title
              description
            }
          }
        }
        artworksCollection(where:{sys:{id_exists:true}}) {
          items {
            sys { id }
            name
            imagesCollection {
              items {
                url
                title
                description
              }
            }
            available
            width
            height
            technique
          }
        }
      }
    }
    `;

    const artist = await fetchGraphQL(query, preview, { id });

    // Log errors but don't throw - GraphQL can return partial data with errors
    if (artist.errors) {
      console.warn(
        "GraphQL errors (continuing with partial data):",
        artist.errors,
      );
    }

    return {
      id: artist.data.artist.sys.id,
      name: artist.data.artist.name,
      bio: artist.data.artist.bio,
      picture: artist.data.artist.picture,
      exhibitions: artist.data.artist.exhibitionsCollection.items.map(
        (ex: any) => ({
          id: ex.sys.id,
          title: ex.title,
          description: ex.description,
          startDate: ex.startDate,
          endDate: ex.endDate,
          picture: ex.picture,
        }),
      ),
      artworks: artist.data.artist.artworksCollection.items.map((art: any) => ({
        id: art.sys.id,
        name: art.name || "",
        images:
          art.imagesCollection?.items
            ?.filter((img: any) => img !== null)
            .map((img: any) => ({
              url: img.url,
              title: img.title || "",
              description: img.description || "",
            })) || [],
        available: art.available,
        width: art.width,
        height: art.height,
        technique: art.technique,
      })),
    };
  } catch (error) {
    throw new Error("Failed to fetch artist by ID: " + error);
  }
}

export async function fetchAllArtistsIds(preview = false): Promise<string[]> {
  const query = `
    {
      artistCollection {
        items {
          sys { id }
        }
      }
    }
    `;

  try {
    const response = await fetchGraphQL(query, preview);
    if (response.errors) {
      console.error(response.errors);
      throw new Error("Failed to fetch artists IDs");
    }

    const artistIds = response.data.artistCollection.items.map(
      (item: any) => item.sys.id,
    );
    return artistIds;
  } catch (error) {
    console.error("Error fetching artist IDs:", error);
    throw error;
  }
}
