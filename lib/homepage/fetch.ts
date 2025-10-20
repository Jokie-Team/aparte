import { fetchGraphQL } from "../api";
import { Exhibition } from "../exhibitions";
import { Artist } from "../artists";
import { Artwork } from "../artworks";

type ExhibitionLite = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
};

function mapLite(items: any[]): ExhibitionLite[] {
  return (items ?? []).map((e: any) => ({
    id: e?.sys?.id ?? "",
    title: e?.title ?? "",
    description: e?.description ?? "",
    startDate: e?.startDate ?? "",
    endDate: e?.endDate ?? "",
  }));
}

async function fetchCurrentLite(preview = false): Promise<ExhibitionLite[]> {
  const today = new Date().toISOString().split("T")[0];

  const query = `
    query ($today: DateTime!) {
      exhibitionCollection(
        where: { startDate_lte: $today, endDate_gte: $today }
        order: startDate_DESC
        limit: 20
      ) {
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

  const res = await fetchGraphQL(query, preview, { today });
  if (res.errors) throw new Error(JSON.stringify(res.errors));
  return mapLite(res?.data?.exhibitionCollection?.items);
}

async function fetchFutureNextGroupLite(preview = false): Promise<ExhibitionLite[]> {
  const today = new Date().toISOString().split("T")[0];

  // 1) buscar a data de início mais próxima
  const firstQuery = `
    query ($today: Date!) {
      exhibitionCollection(
        where: { startDate_gt: $today }
        order: startDate_ASC
        limit: 1
      ) {
        items { startDate }
      }
    }
  `;
  const firstRes = await fetchGraphQL(firstQuery, preview, { today });
  if (firstRes.errors) throw new Error(JSON.stringify(firstRes.errors));

  const nextStart = firstRes?.data?.exhibitionCollection?.items?.[0]?.startDate;
  if (!nextStart) return [];

  // 2) buscar todas as futuras com essa mesma data de início
  const groupQuery = `
    query ($start: Date!) {
      exhibitionCollection(
        where: { startDate: $start }
        order: title_ASC
        limit: 50
      ) {
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
  const groupRes = await fetchGraphQL(groupQuery, preview, { start: nextStart });
  if (groupRes.errors) throw new Error(JSON.stringify(groupRes.errors));

  return mapLite(groupRes?.data?.exhibitionCollection?.items);
}

async function fetchExhibitionDetails(id: string, preview = false): Promise<Exhibition> {
  const q = `
    query ($id: String!) {
      exhibition(id: $id) {
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
      }
    }
  `;

  const res = await fetchGraphQL(q, preview, { id });
  if (res.errors) throw new Error(JSON.stringify(res.errors));

  const e = res?.data?.exhibition;

  const artworks: Artwork[] =
    e?.artworksCollection?.items?.map((a: any) => ({
      id: a?.sys?.id ?? "",
      name: a?.name ?? "",
      width: a?.width ?? 0,
      height: a?.height ?? 0,
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
    id: e?.sys?.id ?? id,
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
  } as Exhibition;
}

/**
 * Exposições para a homepage:
 * - atuais; se não houver, devolve o grupo de futuras mais próximo
 */
export async function fetchHomepageExhibitions(preview = false): Promise<Exhibition[]> {
  // 1) atuais
  let lite = await fetchCurrentLite(preview);

  // 2) se não houver atuais, buscar grupo futuro mais próximo
  if (!lite.length) {
    lite = await fetchFutureNextGroupLite(preview);
  }

  if (!lite.length) return [];

  // 3) buscar detalhes por ID em queries pequenas
  //    (use concurrency limitada para ser simpático com a API)
  const MAX_PAR = 3;
  const out: Exhibition[] = [];

  for (let i = 0; i < lite.length; i += MAX_PAR) {
    const slice = lite.slice(i, i + MAX_PAR);
    const chunk = await Promise.all(slice.map((e) => fetchExhibitionDetails(e.id, preview)));
    out.push(...chunk);
  }

  return out;
}
