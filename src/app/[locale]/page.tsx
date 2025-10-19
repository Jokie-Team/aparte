import React from "react";
import { getTranslations } from "next-intl/server";
import Section from "@/src/components/section/exhibitions";
import RandomGallery from "@/src/components/RandomGallery";
import { groupExhibitionsByDate } from "@/src/utils/exhibitions";
import Tag from "@/src/components/tags/tag";

import { fetchAllExhibitions } from "@/lib/exhibitions/fetch";

export const dynamic = "force-dynamic";

export default async function LocalePage() {
  const t = await getTranslations("homepage");

  let exhibitions: any[] = [];
  try {
    exhibitions = await fetchAllExhibitions(true);
  } catch (error) {
    console.error("Fetch exhibitions error:", error);
    exhibitions = [];
  }

  const groupedExhibitions = groupExhibitionsByDate(exhibitions ?? []);

  let exhibitionsToShow = groupedExhibitions.current ?? [];
  let label = t("currentExhibitions");

  if (exhibitionsToShow.length === 0 && (groupedExhibitions.future ?? []).length > 0) {
    const nextStart = (groupedExhibitions.future ?? [])
      .map((e) => new Date(e.startDate).toISOString().split("T")[0])
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];

    exhibitionsToShow = (groupedExhibitions.future ?? []).filter(
      (e) => new Date(e.startDate).toISOString().split("T")[0] === nextStart
    );
    label = t("futureExhibitions");
  }

  if (exhibitionsToShow.length === 0) {
    const allPast = groupedExhibitions.past ?? {};
    const years = Object.keys(allPast);
    if (years.length > 0) {
      const mostRecentYear = Math.max(...years.map(Number));
      const allPastLast = allPast[mostRecentYear] ?? [];
      const lastEnd = allPastLast
        .map((e) => new Date(e.endDate).toISOString().split("T")[0])
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];

      exhibitionsToShow = allPastLast.filter(
        (e) => new Date(e.endDate).toISOString().split("T")[0] === lastEnd
      );
      label = t("pastExhibitions");
    }
  }

  const artworks = (exhibitionsToShow ?? []).flatMap((e) => e?.artworks ?? []);
  const randomSubset = artworks.sort(() => 0.5 - Math.random()).slice(0, 8);

  return (
    <div className="flex flex-col">
      <div className="px-6 py-10 w-full overflow-x-hidden">
        <RandomGallery artworks={randomSubset} />
      </div>

      <div className="px-6 pt-28">
        <Tag text={label} />
      </div>

      {(exhibitionsToShow ?? []).length > 0 && (
        <div className="px-6 pt-6 pb-52 w-full flex flex-col gap-20">
          {(exhibitionsToShow ?? []).map((exhibition, index) => (
            <React.Fragment key={exhibition.id}>
              <Section
                exhibition={exhibition}
                isImageRight={index % 2 !== 0}
                translations={{
                  readMore: t("section.readMore"),
                  readLess: t("section.readLess"),
                }}
              />
              {index < (exhibitionsToShow?.length ?? 0) - 1 && (
                <div className="border-t border-gray-300 w-full" />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
