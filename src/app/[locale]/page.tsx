import React from "react";
import { getTranslations } from "next-intl/server";
import Section from "@/src/components/section/exhibitions";
import RandomGallery from "@/src/components/RandomGallery";
import Tag from "@/src/components/tags/tag";

import { fetchHomepageExhibitions } from "@/lib/homepage/fetch";
import { Exhibition } from "@/lib/exhibitions";

export const revalidate = 1800;

export default async function LocalePage() {
  const t = await getTranslations("homepage");
  let exhibitions: Exhibition[] = [];

  try {
    exhibitions = await fetchHomepageExhibitions(false);
  } catch (error) {
    console.error("Error fetching homepage exhibitions:", error);
  }

  const today = new Date().toISOString().split("T")[0];
  let label = t("currentExhibitions");
  if (exhibitions.length > 0) {
    const { startDate, endDate } = exhibitions[0];
    if (startDate > today) label = t("futureExhibitions");
    else if (endDate < today) label = t("pastExhibitions");
  }

  const artworks = exhibitions.flatMap((e) => e?.artworks ?? []);
  const allImages = artworks.flatMap((a, index) =>
    a.images.map((img) => ({
      ...img,
      id: `${a.id}-${index}`,
      title: img.title || "",
      description: img.description || "",
    })),
  );

  const images = allImages.sort(() => 0.5 - Math.random()).slice(0, 8);

  return (
    <>
      {images.map((img) => (
        <link key={img.id} rel="preload" as="image" href={img.url} />
      ))}
      <div className="flex flex-col">
        <div className="px-6 py-10 w-full overflow-x-hidden">
          <RandomGallery images={images} />
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
    </>
  );
}
