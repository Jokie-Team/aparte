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
  const query = `
  query {
    exhibitionCollection(limit: 10) {
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
            imagesCollection {
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

  const response = await fetchGraphQL(query, preview);
  if (response.errors) {
    console.error(response.errors);
    throw new Error("Failed to fetch exhibitions");
  }

  return response.data.exhibitionCollection.items.map((item: any) => ({
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
}
