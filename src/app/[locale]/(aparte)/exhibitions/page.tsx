import React from "react";
import { getTranslations } from "next-intl/server";
import { Exhibition } from "@/lib/exhibitions";
import ExhibitionsSidebar from "@/src/components/sidebar/exhibitions";
import Section from "@/src/components/section/exhibitions";
import { groupExhibitionsByDate } from "@/src/utils/exhibitions";

type ExhibitionsProps = {
  searchParams: { search?: string };
};

const Exhibitions = async ({ searchParams }: ExhibitionsProps) => {
  const t = await getTranslations("exhibitions");
  const searchTerm = searchParams.search?.toLowerCase() || "";
  let exhibitions: Exhibition[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/exhibitions`,
      {
        cache: "no-store",
        next: { revalidate: 10 },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to fetch exhibitions: ${res.status} - ${errorText}`
      );
    }
    exhibitions = await res.json();
  } catch (error) {
    console.error("Fetch exhibitions error:", error);
  }

  const groupedExhibitions = groupExhibitionsByDate(exhibitions);
  const orderedExhibitions = [
    ...groupedExhibitions.current,
    ...groupedExhibitions.future,
    ...Object.entries(groupedExhibitions.past)
      .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
      .flatMap(([, exhibitions]) =>
        exhibitions.sort(
          (a, b) =>
            new Date(b.startDate || 0).getTime() -
            new Date(a.startDate || 0).getTime()
        )
      ),
  ].filter((exhibition) =>
    exhibition.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="m-12 flex flex-row w-full gap-24">
      <div className="w-1/4 flex-shrink-0">
        <ExhibitionsSidebar
          exhibitions={exhibitions}
          translations={{
            emptyState: t("sidebar.emptyState"),
            current: t("sidebar.current"),
            future: t("sidebar.future"),
            past: t("sidebar.past"),
            search: t("sidebar.search"),
          }}
          searchValue={searchTerm}
        />
      </div>

      <div className="w-full">
        <h2 className="mb-8">{t("title")}</h2>
        {orderedExhibitions.map((exhibitionItem, index) => (
          <div
            key={exhibitionItem.title}
            id={`exhibition-${exhibitionItem.title
              .replaceAll(" ", "-")
              .toLowerCase()}`}
          >
            <Section
              exhibition={exhibitionItem}
              translations={{
                readMore: t("section.readMore"),
                readLess: t("section.readLess"),
                aboutArtworks: t("section.aboutArtworks"),
                aboutArtist: t("section.aboutArtist"),
                aboutArtists: t("section.aboutArtists"),
              }}
            />
            {index !== orderedExhibitions.length - 1 && (
              <div className="my-32 border-b border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exhibitions;
