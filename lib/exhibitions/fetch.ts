import { fetchGraphQL } from "../api";
import { Artist } from "../artists";
import { PictureProps } from "../types";

export interface Exhibition {
  title: string;
  description: string;
  picture: PictureProps;
  artists: Artist[];
  startDate: string;
  endDate: string;
  artworks: PictureProps[];
  id: string;
}

export async function fetchAllExhibitions(preview = false): Promise<Artist[]> {
  const query = `
  query {
    exhibitionCollection(limit: 200) {
      items {
        sys { id }
        title
        picture { 
          url 
        }
        description
        artistsCollection(limit: 40) {
          items {
            sys { id }
            name
          }
        }
        artworksCollection(limit: 5) {
          items {
            url
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
    console.log(response.errors);
    throw new Error("Failed to fetch exhibitions");
  }

  return response.data.exhibitionCollection.items.map((item: any) => ({
    id: item.sys.id,
    title: item.title,
    description: item.description,
    picture: item.picture,
    artists: item.artistsCollection.items,
    artworks: item.artworksCollection.items,
    startDate: item.startDate,
    endDate: item.endDate,
  }));
}
