import { fetchGraphQL } from "../api";
import { MediaProps } from "../types";

export interface Artwork {
  id: string;
  name: string;
  year?: number;
  height?: number;
  width?: number;
  available?: boolean;
  technique?: string;
  artists: { id: string }[];
  images: MediaProps[];
}

export async function fetchAllArtworks(preview = false): Promise<Artwork[]> {
  const query = `
  query {
    artworkCollection {
      items {
        sys {
          id
        }
        name
        year
        height
        width
        available
        technique
        artistsCollection {
          items {
            sys {
              id
            }
          }
        }
        imagesCollection {
          items {
            file {
              url
            }
            title
            description
          }
        }
      }
    }
  }
  `;

  const response = await fetchGraphQL(query, preview);
  if (response.errors) {
    console.error(response.errors);
    throw new Error("Failed to fetch artworks");
  }

  return response.data.artworkCollection.items.map((item: any) => ({
    id: item.sys.id,
    name: item.name || "",
    year: item.year || undefined,
    height: item.height || undefined,
    width: item.width || undefined,
    available: item.available || false,
    technique: item.technique || "",
    artists: item.artistsCollection?.items.map((artist: any) => ({
      id: artist.sys.id,
    })) || [],
    images: item.imagesCollection?.items.map((image: any) => ({
      url: image.file.url,
      title: image.title || "",
      description: image.description || "",
    })) || [],
  }));
}
