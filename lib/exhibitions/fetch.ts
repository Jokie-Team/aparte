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

async function fetchArtistsForExhibition(
  exhibitionId: string,
  preview = false
): Promise<Artist[]> {
  const ARTIST_CHUNK_SIZE = 100;
  let skip = 0;

  const artistsQuery = `
  query {
    exhibition(id: "${exhibitionId}") {
      artistsCollection(where: {sys: {publishedAt_exists: true}}, limit: ${ARTIST_CHUNK_SIZE}, skip: ${skip}) {
        total
        items {
          sys { id }
          name
        }
      }
    }
  }
`;

  const response = await fetchGraphQL(artistsQuery, preview);
  if (response.errors) {
    console.error(response.errors);
    throw new Error(`Failed to fetch artists for exhibition ${exhibitionId}`);
  }

  const artists = response.data.exhibition.artistsCollection.items.map(
    (artist: any) => ({
      id: artist.sys.id,
      name: artist.name || "",
    })
  );

  return artists;
}

const exhibitionsCache: { [key: string]: Exhibition[] } = {};
const exhibitionDetailsCache: { [key: string]: Partial<Exhibition> } = {};

export async function fetchAllExhibitions(
  preview = false,
  withDetails = false
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
          picture: null,
          artists: [],
          artworks: [],
        })
      );

      if (withDetails) {
        const detailedExhibitions = await Promise.all(
          exhibitions.map(async (exhibition: any) => {
            const details = await fetchExhibitionDetails(
              exhibition.id,
              preview
            );
            return { ...exhibition, ...details };
          })
        );
        allExhibitions = [...allExhibitions, ...detailedExhibitions];
      } else {
        allExhibitions = [...allExhibitions, ...exhibitions];
      }

      skip += CHUNK_SIZE;
      hasMore = skip < total;

      if (hasMore) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error(`Error fetching chunk at skip ${skip}:`, error);
      throw error;
    }
  }

  exhibitionsCache[cacheKey] = allExhibitions;
  return allExhibitions;
}

export async function fetchExhibitionDetails(
  exhibitionId: string,
  preview = false
): Promise<Partial<Exhibition>> {
  if (exhibitionDetailsCache[exhibitionId]) {
    return exhibitionDetailsCache[exhibitionId];
  }

  const detailsQuery = `
  query {
    exhibition(id: "${exhibitionId}") {
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
        }
      }
    }
  }
  `;

  try {
    const [detailsResponse, artists] = await Promise.all([
      fetchGraphQL(detailsQuery, preview),
      fetchArtistsForExhibition(exhibitionId, preview),
    ]);

    if (detailsResponse.errors) {
      console.error(detailsResponse.errors);
      throw new Error(`Failed to fetch details for exhibition ${exhibitionId}`);
    }

    const details = detailsResponse.data.exhibition;
    const exhibitionDetails = {
      picture: {
        url: details.picture?.url || "",
        title: details.picture?.title || "",
        description: details.picture?.description || "",
      },
      artworks:
        details.artworksCollection?.items.map((artwork: any) => ({
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
        })) || [],
      artists,
    };

    exhibitionDetailsCache[exhibitionId] = exhibitionDetails;
    return exhibitionDetails;
  } catch (error) {
    console.error(
      `Error fetching details for exhibition ${exhibitionId}:`,
      error
    );
    throw error;
  }
}
