"use client";
import { useEffect, useMemo, useState } from "react";
import { SearchInput } from "../searchInput/searchInput";
import { Artist } from "@/lib/artists";
import { usePathname, useRouter } from "next/navigation";
import {
  filterArtistsBySearchTerms,
  groupByFirstLetter,
} from "@/src/utils/artists";
import clsx from "clsx";
import { Exhibition } from "@/lib/exhibitions";
import { groupExhibitionsByDate } from "@/src/utils/exhibitions";

export type ArtistsGroupedByLetter = Record<string, Artist[]>;

interface SearchBarProps {
  exhibitions: Exhibition[];
  translations: {
    emptyState: string;
    current: string;
    future: string;
    past: string;
    search: string;
  };
  searchValue?: string;
}

export type exhibitionGroup = "current" | "past" | "future";

const ExhibitionsSearchBar: React.FC<SearchBarProps> = ({
  exhibitions,
  translations,
  searchValue,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(searchValue || "");
  const router = useRouter();
  const pathname = usePathname();
  const [selectedGroup, setSelectedGroup] = useState<
    exhibitionGroup | undefined
  >();

  const groupedExhibitions = useMemo(
    () => groupExhibitionsByDate(exhibitions),
    [exhibitions]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    try {
      const params = new URLSearchParams();
      if (value) {
        params.set("search", value);
      }
      if (selectedGroup) {
        params.set("group", selectedGroup);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handleGroupClick = (group: exhibitionGroup) => {
    setSelectedGroup(group);
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set("search", searchTerm);
    }
    if (selectedGroup === group) {
      params.delete("group");
    } else {
      params.set("group", group);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredExhibitions = useMemo(() => {
    const sortedPast: [string, Exhibition[]][] = Object.entries(
      groupedExhibitions.past
    )
      .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
      .map(([year, exhibitions]) => {
        const filteredAndSorted = exhibitions
          .filter((exhibition) =>
            exhibition.title.toLowerCase().includes(searchTerm)
          )
          .sort(
            (a, b) =>
              new Date(b.startDate || 0).getTime() -
              new Date(a.startDate || 0).getTime()
          );
        return [year, filteredAndSorted];
      });

    return {
      current: groupedExhibitions.current.filter((exhibition) =>
        exhibition.title.toLowerCase().includes(searchTerm)
      ),
      future: groupedExhibitions.future.filter((exhibition) =>
        exhibition.title.toLowerCase().includes(searchTerm)
      ),
      past: sortedPast,
    };
  }, [groupedExhibitions, searchTerm]);

  return (
    <div className="block md:hidden w-full ">
      <SearchInput
        value={searchTerm}
        handleSearchChange={handleSearchChange}
        search={translations.search}
        handleClear={() => {
          setSearchTerm("");
        }}
      />
      {Object.keys(filteredExhibitions).length === 0 && (
        <p className="text-gray-500">{translations.emptyState}</p>
      )}
      <div className="pt-3 mb-9 flex flex-row justify-between gap-3 overflow-x-scroll">
        <span
          className={clsx("whitespace-nowrap cursor-pointer", {
            "underline font-bold": selectedGroup === "current",
          })}
          onClick={() => handleGroupClick("current")}
        >
          {translations.current}
        </span>
        <span
          className={clsx("whitespace-nowrap cursor-pointer", {
            "underline font-bold": selectedGroup === "future",
          })}
          onClick={() => handleGroupClick("future")}
        >
          {translations.future}
        </span>
        <span
          className={clsx("whitespace-nowrap cursor-pointer", {
            "underline font-bold": selectedGroup === "past",
          })}
          onClick={() => handleGroupClick("past")}
        >
          {translations.past}
        </span>
      </div>
    </div>
  );
};

export { ExhibitionsSearchBar };
