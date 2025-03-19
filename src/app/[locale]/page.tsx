import React from "react";
import { fetchArtworks } from "@/lib/artworks";
import { getTranslations } from "next-intl/server";
import Section from "@/src/components/section/homepage";
import RandomGallery from "@/src/components/random-gallery";
import { groupExhibitionsByDate } from "@/src/utils/exhibitions";

export default async function LocalePage() {
  const t = await getTranslations("homepage");

  const randomArtworks = await fetchArtworks(false, 9);

  let exhibitions = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/exhibitions`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch exhibitions: ${res.status} - ${await res.text()}`);
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

  if (exhibitionsToShow.length === 0) {
    exhibitionsToShow = groupedExhibitions.future;
  }

  if (exhibitionsToShow.length === 0) {
    const pastYears = Object.keys(groupedExhibitions.past)
      .map(Number)
      .sort((a, b) => b - a);

    if (pastYears.length > 0) {
      const mostRecentYear = pastYears[0];
      exhibitionsToShow = groupedExhibitions.past[mostRecentYear];
    }
  }

  return (
    <div className="flex flex-col">
      <div className="px-6 py-10 w-full overflow-x-hidden overflow-y-hidden">
        <RandomGallery artworks={randomArtworks} />
        <h1 className="bottom-0 left-0">{t("title")}</h1>
      </div>

      {exhibitionsToShow.length > 0 && (
        <div className="px-6 py-10 w-full">
          {exhibitionsToShow.map((exhibition) => (
            <Section
              key={exhibition.id}
              exhibition={exhibition}
              translations={{
                readMore: t("section.readMore"),
                readLess: t("section.readLess"),
                aboutArtworks: t("section.aboutArtworks"),
                aboutArtist: t("section.aboutArtist"),
                aboutArtists: t("section.aboutArtists"),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
