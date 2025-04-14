import { fetchGraphQL } from "../api";
import { PictureProps } from "../types";

export interface Artwork {
  id: string;
  name: string;
  year?: number;
  height?: number;
  width?: number;
  available?: boolean;
  technique?: string;
  artists: { id: string }[];
  images: PictureProps[];
}

export async function fetchArtworksByArtist(
  artistId: string,
  preview = false
): Promise<Artwork[]> {

  const query = `
    query GetArtistArtworks {
      artworkCollection(limit: 50) {
        items {
          sys { id }
          name
          year
          height
          width
          available
          technique
          artistsCollection(limit: 5) {
            items {
              sys { id }
            }
          }
          imagesCollection(limit: 3) {
            items {
              url
            }
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL(query, preview);

  if (response.errors) {
    console.error("GraphQL error in fetchArtworksByArtist:", JSON.stringify(response.errors, null, 2));
    throw new Error("Failed to fetch artworks by artist");
  }

  const items = response.data.artworkCollection?.items.filter((item: { artistsCollection: { items: any[]; }; }) =>
    item.artistsCollection?.items.some(artist => artist.sys.id === artistId)
  ) || [];

  return mapArtworks(items);
}

function mapArtworks(items: any[]): Artwork[] {
  return items.map((item) => ({
    id: item.sys.id,
    name: item.name || "",
    year: item.year ?? undefined,
    height: item.height ?? undefined,
    width: item.width ?? undefined,
    available: item.available ?? false,
    technique: item.technique || "",
    artists:
      item.artistsCollection?.items.map((artist: any) => ({
        id: artist.sys.id,
      })) || [],
    images:
      item.imagesCollection?.items.map((image: any) => ({
        url: image.url,
        title: image.title || "",
        description: image.description || "",
      })) || [],
  }));
}
