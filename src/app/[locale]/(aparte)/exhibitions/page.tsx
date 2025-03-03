import React from "react";
import { getTranslations } from "next-intl/server";
import { Exhibition } from "@/lib/exhibitions";
import ExhibitionsSidebar from "@/src/components/sidebar/exhibitions";
import Section from "@/src/components/section/exhibitions";
import { groupExhibitionsByDate } from "@/src/utils/exhibitions";
import { ExhibitionsSearchBar } from "@/src/components/searchBar/exhibitions";

type ExhibitionsProps = {
  searchParams: Promise<{ search?: string; group?: string }>;
};

const Exhibitions = async ({ searchParams }: ExhibitionsProps) => {
  const t = await getTranslations("exhibitions");
  const searchTerm = (await searchParams).search?.toLowerCase() || "";
  const group = (await searchParams).group?.toLowerCase() || "";

  let exhibitions: Exhibition[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/exhibitions`,
      {
        cache: "no-store",
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

    // Valida se o JSON retornado é válido
    const data = await res.json();
    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid data format received from API");
    }
    exhibitions = data;
  } catch (error) {
    console.error("Fetch exhibitions error:", error);
  }

  const groupedExhibitions = groupExhibitionsByDate(exhibitions);

  const orderedExhibitions = (() => {
    let filtered: Exhibition[] = [];

    switch (group) {
      case "current":
        filtered = [...groupedExhibitions.current];
        break;
      case "future":
        filtered = [...groupedExhibitions.future];
        break;
      case "past":
        filtered = Object.entries(groupedExhibitions.past)
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .flatMap(([, exhibitions]) =>
            exhibitions.sort(
              (a, b) =>
                new Date(b.startDate || 0).getTime() -
                new Date(a.startDate || 0).getTime()
            )
          );
        break;
      default:
        filtered = [
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
        ];
    }

    return filtered.filter((exhibition) =>
      exhibition.title.toLowerCase().includes(searchTerm)
    );
  })();

  return (
    <div className="m-12 flex flex-row w-full gap-24">
      <div className="hidden md:block w-1/4 flex-shrink-0">
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
        <ExhibitionsSearchBar
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
        {orderedExhibitions.map((exhibitionItem, index) => (
          <div key={exhibitionItem.id} id={exhibitionItem.id}>
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
