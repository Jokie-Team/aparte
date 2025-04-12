import React from "react";
import { getTranslations } from "next-intl/server";
import {
  fetchAllExhibitions,
} from "@/lib/exhibitions/fetch";
import ExhibitionsSidebar from "@/src/components/sidebar/exhibitions";
import Section from "@/src/components/section/exhibitions";
import { groupExhibitionsByDate } from "@/src/utils/exhibitions";
import { ExhibitionsSearchBar } from "@/src/components/searchBar/exhibitions";

type ExhibitionsProps = {
  searchParams: Promise<{ search?: string; group?: string }>;
};

const normalizeText = (text: string) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
};

const Exhibitions = async ({ searchParams }: ExhibitionsProps) => {
  const [t, exhibitions, resolvedSearchParams] = await Promise.all([
    getTranslations("exhibitions"),
    fetchAllExhibitions(false),
    searchParams,
  ]);

  const searchTerm = resolvedSearchParams.search?.toLowerCase() || "";
  const group = resolvedSearchParams.group?.toLowerCase() || "";

  const groupedExhibitions = groupExhibitionsByDate(exhibitions);

  const orderedExhibitions = (() => {
    let filtered = [];
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
      normalizeText(exhibition.title).includes(normalizeText(searchTerm))
    );
  })();

  return (
    <div className="p-12 flex flex-row w-full gap-24">
      <div className="hidden md:block w-1/4 flex-shrink-0">
        <ExhibitionsSidebar
          exhibitions={orderedExhibitions}
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
              exhibitionId={exhibitionItem.id}
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
