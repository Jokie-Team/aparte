"use client";
import { Exhibition } from "@/lib/exhibitions";
import { ExhibitionsSearchBar } from "@/src/components/searchBar/exhibitions";
import Section from "@/src/components/section/exhibitions";
import ExhibitionsSidebar from "@/src/components/sidebar/exhibitions";
import { groupExhibitionsByDate } from "@/src/utils/exhibitions";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

type ExhibitionsClientProps = {
  exhibitions: Exhibition[];
  translations?: Record<string, string>;
};

const normalizeText = (text: string) =>
  (text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();

export const ExhibitionsClient = ({
  exhibitions,
  translations,
}: ExhibitionsClientProps) => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams?.get("search")?.toLowerCase() || "";
  const group = searchParams?.get("group")?.toLowerCase() || "";

  const groupedExhibitions = useMemo(
    () => groupExhibitionsByDate(exhibitions),
    [exhibitions],
  );

  const orderedExhibitions = useMemo(() => {
    let filtered: Exhibition[] = [];

    switch (group) {
      case "current":
        filtered = groupedExhibitions.current ?? [];
        break;

      case "future":
        filtered = groupedExhibitions.future ?? [];
        break;

      case "past":
        filtered = Object.entries(groupedExhibitions.past ?? {})
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .flatMap(([, exhs]) =>
            exhs.sort(
              (a, b) =>
                new Date(b.startDate || 0).getTime() -
                new Date(a.startDate || 0).getTime(),
            ),
          );
        break;

      default:
        filtered = [
          ...(groupedExhibitions.current ?? []),
          ...(groupedExhibitions.future ?? []),
          ...Object.entries(groupedExhibitions.past ?? {})
            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
            .flatMap(([, exhs]) =>
              exhs.sort(
                (a, b) =>
                  new Date(b.startDate || 0).getTime() -
                  new Date(a.startDate || 0).getTime(),
              ),
            ),
        ];
    }

    if (!searchTerm) return filtered;

    return filtered.filter((exhibition) =>
      normalizeText(exhibition.title).includes(normalizeText(searchTerm)),
    );
  }, [searchTerm, group, groupedExhibitions]);

  return (
    <div className="p-12 flex flex-row w-full gap-24">
      <div className="hidden md:block w-1/4 flex-shrink-0">
        <ExhibitionsSidebar
          exhibitions={orderedExhibitions}
          translations={{
            emptyState: translations?.emptyState || "",
            current: translations?.current || "",
            future: translations?.future || "",
            past: translations?.past || "",
            search: translations?.search || "",
          }}
          searchValue={searchTerm}
        />
      </div>

      <div className="w-full">
        <h2 className="mb-8">{translations?.title || ""}</h2>

        <ExhibitionsSearchBar
          exhibitions={exhibitions ?? []}
          translations={{
            emptyState: translations?.emptyState || "",
            current: translations?.current || "",
            future: translations?.future || "",
            past: translations?.past || "",
            search: translations?.search || "",
          }}
          searchValue={searchTerm}
        />

        {(orderedExhibitions ?? []).map((exhibitionItem, index) => (
          <div key={exhibitionItem.id} id={exhibitionItem.id}>
            <Section
              exhibition={exhibitionItem}
              exhibitionId={exhibitionItem.id}
              translations={{
                readMore: translations?.readMore || "",
                readLess: translations?.readLess || "",
                exhibitionArtworks: translations?.exhibitionArtworks || "",
                aboutArtist: translations?.aboutArtist || "",
                aboutArtists: translations?.aboutArtists || "",
              }}
              showCarousel={true}
            />
            {index !== (orderedExhibitions?.length ?? 0) - 1 && (
              <div className="my-32 border-b border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExhibitionsClient;
