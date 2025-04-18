"use client";
import { useEffect, useMemo, useState } from "react";
import { SearchInput } from "../searchInput/searchInput";
import { Artist } from "@/lib/artists";
import { usePathname, useRouter } from "next/navigation";
import { filterArtistsBySearchTerms } from "@/src/utils/artists";
import clsx from "clsx";
import { set } from "lodash";

export type ArtistsGroupedByLetter = Record<string, Artist[]>;

interface SearchBarProps {
  artists: Artist[];
  translations: {
    emptyState: string;
    search: string;
  };
  searchValue?: string;
}

const ArtistsSearchBar: React.FC<SearchBarProps> = ({
  artists,
  translations,
  searchValue,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(searchValue || "");
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLetter, setSelectedLetter] = useState<string | undefined>();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    try {
      const params = new URLSearchParams();
      if (value) {
        params.set("search", value);
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handleLetterSelection = (letter: string) => {
    const artistsForLetter =
      groupedArtists[letter]?.map((artist) => artist.name).join(", ") || "";
    setSelectedLetter(letter);
    setSearchTerm(artistsForLetter);

    try {
      const params = new URLSearchParams();
      if (artistsForLetter) {
        params.set("search", artistsForLetter);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const normalizeText = (name: string) => {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();
  };

  const groupedArtists = useMemo(() => {
    const grouped: Record<string, Artist[]> = {};

    artists.forEach((artist) => {
      const normalizedFirstLetter =
        normalizeText(artist.name)[0].toUpperCase() || "#";
      if (!grouped[normalizedFirstLetter]) {
        grouped[normalizedFirstLetter] = [];
      }
      grouped[normalizedFirstLetter].push(artist);
    });

    const sortedGrouped: Record<string, Artist[]> = {};
    Object.keys(grouped)
      .sort((a, b) => a.localeCompare(b))
      .forEach((key) => {
        sortedGrouped[key] = grouped[key].sort((a, b) =>
          normalizeText(a.name).localeCompare(normalizeText(b.name))
        );
      });

    return sortedGrouped;
  }, [artists]);

  const filteredArtists = useMemo(() => {
    if (!artists.length || !groupedArtists) return {};
    if (!searchTerm) return groupedArtists;

    const filtered: ArtistsGroupedByLetter = {};
    for (const [letter, group] of Object.entries(groupedArtists)) {
      const matchingArtists = filterArtistsBySearchTerms(group, searchTerm);
      if (matchingArtists.length) filtered[letter] = matchingArtists;
    }
    return filtered;
  }, [groupedArtists, searchTerm, selectedLetter]);

  useEffect(() => {
    if (Object.keys(filteredArtists).length > 0) {
      setSelectedLetter(Object.keys(filteredArtists)[0]);
    }
  }, [filteredArtists]);

  return (
    <div className="block md:hidden w-full">
      <SearchInput
        value={searchTerm}
        handleSearchChange={handleSearchChange}
        search={translations.search}
        handleClear={() => {
          setSearchTerm("");
        }}
      />
      {Object.keys(filteredArtists).length === 0 && (
        <p className="text-gray-500">{translations.emptyState}</p>
      )}
      <div className="pt-3 flex flex-row gap-3 overflow-x-scroll">
        {Object.entries(filteredArtists)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([letter], index) => (
            <div key={`${index}-${letter}`}>
              <h4
                onClick={() => handleLetterSelection(letter)}
                className={clsx("cursor-pointer", {
                  underline: selectedLetter === letter,
                })}
              >
                {letter}
              </h4>
            </div>
          ))}
      </div>
      <div className="pt-3 flex flex-row gap-3 overflow-x-scroll">
        {selectedLetter &&
          filteredArtists[selectedLetter]?.map((artist: Artist) => (
            <span key={artist.name} className="whitespace-nowrap">
              {artist.name}
            </span>
          ))}
      </div>
    </div>
  );
};

export { ArtistsSearchBar };
