import { fetchGraphQL } from "../api";
import { Artist } from "../artists";
import { Artwork } from "../artworks";
import { PictureProps } from "../types";

export interface Exhibition {
  title: string;
  description: string;
  picture: PictureProps;
  artists: Artist[];
  startDate: string;
  endDate: string;
  artworks: Artwork[];
  id: string;
}

export async function fetchAllExhibitions(preview = false): Promise<Exhibition[]> {
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
          picture {
            url
            title
            description
          }
          artistsCollection(limit: 10) {
            items {
              sys { id }
              name
            }
          }
          artworksCollection(limit: 5) {
            items {
              sys { id }
              name
              imagesCollection(limit: 5) {
                items {
                  url
                  title
                  description
                }
              }
            }
          }
          startDate
          endDate
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

      const exhibitions = response.data.exhibitionCollection.items.map((item: any) => ({
        id: item.sys.id,
        title: item.title || "",
        description: item.description || "",
        picture: {
          url: item.picture?.url || "",
          title: item.picture?.title || "",
          description: item.picture?.description || "",
        },
        artists: item.artistsCollection?.items.map((artist: any) => ({
          id: artist.sys.id,
          name: artist.name || "",
        })) || [],
        artworks: item.artworksCollection?.items.map((artwork: any) => ({
          id: artwork.sys.id,
          name: artwork.name || "",
          images: artwork.imagesCollection?.items.map((image: any) => ({
            url: image.url,
            title: image.title || "",
            description: image.description || "",
          })) || [],
        })) || [],
        startDate: item.startDate || "",
        endDate: item.endDate || "",
      }));

      allExhibitions = [...allExhibitions, ...exhibitions];
      
      skip += CHUNK_SIZE;
      hasMore = skip < total;

      if (hasMore) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

    } catch (error) {
      console.error(`Error fetching chunk at skip ${skip}:`, error);
      throw error;
    }
  }

  return allExhibitions;
}