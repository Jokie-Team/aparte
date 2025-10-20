import React from "react";
import { getTranslations } from "next-intl/server";
import Section from "@/src/components/section/exhibitions";
import RandomGallery from "@/src/components/RandomGallery";
import Tag from "@/src/components/tags/tag";

import { fetchHomepageExhibitions } from "@/lib/homepage/fetch";

export const dynamic = "force-dynamic";

export default async function LocalePage() {
  const t = await getTranslations("homepage");

  // 1) Vai buscar SÓ o conjunto que a homepage deve mostrar
  let exhibitions: any[] = [];
  try {
    exhibitions = await fetchHomepageExhibitions(false); 
  } catch (error) {
    console.error("[HOME] fetchHomepageExhibitions error:", error);
    exhibitions = [];
  }

  // 2) Decide o rótulo (current / future / past) com base nas datas do 1º item
  const today = new Date().toISOString().split("T")[0];
  let label = t("currentExhibitions");
  if (exhibitions.length > 0) {
    const { startDate, endDate } = exhibitions[0];
    if (startDate > today) label = t("futureExhibitions");
    else if (endDate < today) label = t("pastExhibitions");
  }

  // 3) Galeria: só obras com imagem válida
  const artworks = exhibitions.flatMap((e) => e?.artworks ?? []);
  const artworksWithImages = artworks.filter((a) => a?.images?.[0]?.url);
  const randomSubset = artworksWithImages.sort(() => 0.5 - Math.random()).slice(0, 8);

  return (
    <div className="flex flex-col">
      <div className="px-6 py-10 w-full overflow-x-hidden">
        <RandomGallery artworks={randomSubset} />
      </div>

      <div className="px-6 pt-28">
        <Tag text={label} />
      </div>

      {exhibitions.length > 0 && (
        <div className="px-6 pt-6 pb-52 w-full flex flex-col gap-20">
          {exhibitions.map((exhibition, index) => (
            <React.Fragment key={exhibition.id}>
              <Section
                exhibition={exhibition}
                isImageRight={index % 2 !== 0}
                translations={{
                  readMore: t("section.readMore"),
                  readLess: t("section.readLess"),
                }}
              />
              {index < exhibitions.length - 1 && (
                <div className="border-t border-gray-300 w-full" />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
