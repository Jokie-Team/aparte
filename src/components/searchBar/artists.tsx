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

  // Group artists by the first letter
  const groupedArtists = useMemo(() => {
    const grouped = groupByFirstLetter(artists);
    // Sort each group of artists alphabetically
    for (const letter in grouped) {
      grouped[letter].sort((a, b) => a.name.localeCompare(b.name));
    }

    return grouped;
  }, [artists]);

  // Filter artists by search term and sort alphabetically
  const filteredArtists = useMemo(() => {
    if (!artists.length || !groupedArtists) return {};
    if (!searchTerm) return groupedArtists;

    const filtered: ArtistsGroupedByLetter = {};
    for (const [letter, group] of Object.entries(groupedArtists)) {
      const matchingArtists = filterArtistsBySearchTerms(group, searchTerm);
      if (matchingArtists.length) filtered[letter] = matchingArtists;
    }

    return filtered;
  }, [groupedArtists, searchTerm]);

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
                onClick={() => setSelectedLetter(letter)}
                className={clsx("cursor-pointer", {
                  underline: selectedLetter === letter,
                })}
              >
                {letter}
              </h4>
            </div>
          ))}
      </div>
      <div className="pt-3 flex flex-row gap-3 justify-between overflow-x-scroll">
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
