import React from "react";
import { getTranslations } from "next-intl/server";
import Section from "@/src/components/section/homepage";
import RandomGallery from "@/src/components/random-gallery";
import { groupExhibitionsByDate } from "@/src/utils/exhibitions";
import Tag from "@/src/components/tags/tag";

export default async function LocalePage() {
  const t = await getTranslations("homepage");

  let exhibitions = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/exhibitions?details=true`,
      {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch exhibitions: ${res.status} - ${await res.text()}`
      );
    }

    const data = await res.json();
    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid JSON format received from API");
    }

    exhibitions = data;
  } catch (error) {
    console.error("Fetch exhibitions error:", error);
  }

  const groupedExhibitions = groupExhibitionsByDate(exhibitions);

  let exhibitionsToShow = groupedExhibitions.current;
  let label = t("currentExhibitions");

  if (exhibitionsToShow.length === 0) {
    exhibitionsToShow = groupedExhibitions.future;
    label = t("futureExhibitions");
  }

  if (exhibitionsToShow.length === 0) {
    const pastYears = Object.keys(groupedExhibitions.past)
      .map(Number)
      .sort((a, b) => b - a);

    if (pastYears.length > 0) {
      const mostRecentYear = pastYears[0];
      exhibitionsToShow = groupedExhibitions.past[mostRecentYear];
    }
    label = t("pastExhibitions");
  }

  return (
    <div className="flex flex-col">
      <div className="px-6 py-10 w-full overflow-x-hidden">
        <RandomGallery />
        {/* <h1>{t("title")}</h1> */}
      </div>
      {/* <div className="border-b border-gray-200" /> */}
      <div className="px-6 pt-28">
        <Tag text={label} />
      </div>
      {exhibitionsToShow.length > 0 && (
        <div className="px-6 pt-6 pb-52 w-full flex flex-col gap-20">
          {exhibitionsToShow.map((exhibition, index) => (
            <React.Fragment key={exhibition.id}>
              <Section
                exhibition={exhibition}
                isImageRight={index % 2 !== 0}
                translations={{
                  readMore: t("section.readMore"),
                  readLess: t("section.readLess"),
                  aboutArtworks: t("section.aboutArtworks"),
                  aboutArtist: t("section.aboutArtist"),
                  aboutArtists: t("section.aboutArtists"),
                }}
              />
              {index < exhibitionsToShow.length - 1 && (
                <div className="border-t border-gray-300 w-full" />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
