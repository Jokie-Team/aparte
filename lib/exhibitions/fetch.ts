import { fetchGraphQL } from "../api";
import { Artist } from "../artists";
import { Artwork } from "../artworks";
import { PictureProps } from "../types";

export interface Exhibition {
  title: string;
  description: string;
  picture: PictureProps | null;
  artists: Artist[];
  startDate: string;
  endDate: string;
  artworks: Artwork[];
  id: string;
}

const exhibitionsCache: { [key: string]: Exhibition[] } = {};

export async function fetchAllExhibitions(
  preview = false,
  withDetails = false,
): Promise<Exhibition[]> {
  const cacheKey = `${preview ? "preview" : "production"}_${withDetails}`;

  if (exhibitionsCache[cacheKey]) {
    return exhibitionsCache[cacheKey];
  }

  const CHUNK_SIZE = 200;
  let allExhibitions: Exhibition[] = [];
  let hasMore = true;
  let skip = 0;

  const countQuery = `
  query {
    exhibitionCollection {
      total
    }
  }
  `;

  const countResponse = await fetchGraphQL(countQuery, preview);
  if (countResponse.errors) {
    console.error(countResponse.errors);
    throw new Error("Failed to fetch exhibitions count");
  }

  const total = countResponse.data.exhibitionCollection.total;

  while (hasMore) {
    const query = `
    query {
      exhibitionCollection(limit: ${CHUNK_SIZE}, skip: ${skip}) {
        items {
          sys { id }
          title
          description
          startDate
          endDate
          picture {
            url(transform: { quality: 5 }) 
            title
            description
          }
          artworksCollection(limit: 15) {
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
      if (response.errors) {
        console.error(response.errors);
        throw new Error("Failed to fetch exhibitions chunk");
      }

      const exhibitions = response.data.exhibitionCollection.items.map(
        (item: any) => ({
          id: item.sys.id,
          title: item.title || "",
          description: item.description || "",
          startDate: item.startDate || "",
          endDate: item.endDate || "",
          picture: {
            url: item.picture?.url || "",
            title: item.picture?.title || "",
            description: item.picture?.description || "",
          },
          artworks:
            item.artworksCollection?.items.map((artwork: any) => ({
              id: artwork.sys.id,
              name: artwork.name || "",
              images:
                artwork.imagesCollection?.items.map((image: any) => ({
                  url: image.url,
                  title: image.title || "",
                  description: image.description || "",
                })) || [],
              width: artwork.width || 0,
              height: artwork.height || 0,
              depth: artwork.depth || 0,
              technique: artwork.technique || "",
            })) || [],
          artists:
            item.artistsCollection?.items.map((artist: any) => ({
              id: artist.sys.id,
              name: artist.name || "",
            })) || [],
        }),
      );

      skip += CHUNK_SIZE;
      hasMore = skip < total;

      allExhibitions = allExhibitions.concat(exhibitions);
    } catch (error) {
      console.error(`Error fetching chunk at skip ${skip}:`, error);
      throw error;
    }
  }

  exhibitionsCache[cacheKey] = allExhibitions;
  return allExhibitions;
}

export async function fetchExhibitionById(
  id: string,
  preview = false,
): Promise<Exhibition | null> {
  const query = `
    query {
      exhibition(id: "${id}") {
        sys { id }
        title
        description
        startDate
        endDate
        picture {
          url(transform: { quality: 5 }) 
          title
          description
        }
        artworksCollection {
          items {
            sys { id }
            name
            imagesCollection {
              items {
                url(transform: { quality: 10 }) 
                title
                description
              }
            }
            width
            height
            depth
            technique
          }
        }
        artistsCollection {
          items {
            sys { id }
            name
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, preview);
  if (response.errors) {
    console.error(response.errors);
    throw new Error("Failed to fetch exhibition by ID");
  }

  const item = response.data.exhibition;
  if (!item) return null;
  return {
    id: item.sys.id,
    title: item.title || "",
    description: item.description || "",
    startDate: item.startDate || "",
    endDate: item.endDate || "",
    picture: {
      url: item.picture?.url || "",
      title: item.picture?.title || "",
      description: item.picture?.description || "",
    },
    artworks:
      item.artworksCollection?.items.map((artwork: any) => ({
        id: artwork.sys.id,
        name: artwork.name || "",
        images:
          artwork.imagesCollection?.items.map((image: any) => ({
            url: image.url,
            title: image.title || "",
            description: image.description || "",
          })) || [],
        width: artwork.width || 0,
        height: artwork.height || 0,
        depth: artwork.depth || 0,
        technique: artwork.technique || "",
      })) || [],
    artists:
      item.artistsCollection?.items.map((artist: any) => ({
        id: artist.sys.id,
        name: artist.name || "",
      })) || [],
  };
}
