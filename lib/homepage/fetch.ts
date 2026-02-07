import { fetchGraphQL } from "../api";
import { Exhibition } from "../exhibitions";
import { Artist } from "../artists";
import { Artwork } from "../artworks";

const exhibitionFragment = `
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
  artworksCollection(limit: 12) {
    items {
      sys { id }
      name
      width
      height
      depth
      imagesCollection(limit: 1) {
        items {
          url
          title
          description
        }
      }
    }
  }
  artistsCollection(limit: 50) {
    items {
      sys { id }
      name
    }
  }
`;

export async function fetchHomepageExhibitions(
  preview = false,
): Promise<Exhibition[]> {
  const today = new Date().toISOString().split("T")[0];

  const query = `
   query ($today: DateTime!) {
       current: exhibitionCollection(
         where: { startDate_lte: $today, endDate_gte: $today }
         order: startDate_DESC
         limit: 20
       ) {
         items { ${exhibitionFragment} }
       }
        future: exhibitionCollection(
         where: { startDate_gt: $today }
         order: startDate_ASC
         limit: 1
       ) {
         items { ${exhibitionFragment} }
       }
     }
  `;

  const res = await fetchGraphQL(query, preview, { today });
  if (res.errors) throw new Error(JSON.stringify(res.errors));

  const current = res?.data?.current?.items ?? [];
  const future = res?.data?.future?.items ?? [];

  let currentExhibitions = current.length ? current : [];

  if (!currentExhibitions.length && future.length) {
    const nextStart = future[0].startDate;
    currentExhibitions = future.filter((e: any) => e.startDate === nextStart);
  }

  return currentExhibitions.map(mapExhibitionDetails);
}

function mapExhibitionDetails(e: any): Exhibition {
  const artworks: Artwork[] =
    e?.artworksCollection?.items?.map((a: any) => ({
      id: a?.sys?.id ?? "",
      name: a?.name ?? "",
      width: a?.width ?? 0,
      height: a?.height ?? 0,
      depth: a?.depth ?? 0,
      images:
        a?.imagesCollection?.items?.map((img: any) => ({
          url: img?.url ?? "",
          title: img?.title ?? "",
          description: img?.description ?? "",
        })) ?? [],
    })) ?? [];

  const artists: Artist[] =
    e?.artistsCollection?.items?.map((ar: any) => ({
      id: ar?.sys?.id ?? "",
      name: ar?.name ?? "",
    })) ?? [];

  return {
    id: e?.sys?.id ?? "",
    title: e?.title ?? "",
    description: e?.description ?? "",
    startDate: e?.startDate ?? "",
    endDate: e?.endDate ?? "",
    picture: e?.picture
      ? {
          url: e.picture.url ?? "",
          title: e.picture.title ?? "",
          description: e.picture.description ?? "",
        }
      : null,
    artworks,
    artists,
  };
}
