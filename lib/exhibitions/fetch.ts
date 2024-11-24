import { fetchGraphQL } from "../api";
import { Artist } from "../artists";
import { ContentfulImageProps } from "../contentful-image";

export interface Exhibition {
  title: string;
  description: string;
  picture: ContentfulImageProps;
  artists: Artist[];
  startDate: string;
  endDate: string;
  artworks: ContentfulImageProps[];
}

export async function fetchAllExhibitions(preview = false): Promise<Artist[]> {
  const query = `
  query {
    exhibitionCollection(limit: 10) {
      items {
        title
        picture { 
          url 
        }
        description
        artistsCollection(limit: 5) {
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
    title: item.title,
    description: item.description,
    picture: item.picture,
    artists: item.artistsCollection.items,
    artworks: item.artworksCollection.items,
    startDate: item.startDate,
    endDate: item.endDate,
  }));
}
