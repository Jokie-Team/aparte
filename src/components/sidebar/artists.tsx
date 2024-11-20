"use client";
import { useEffect, useMemo, useState } from "react";
import { SearchInput } from "../searchInput/searchInput";
import { Artist } from "@/lib/artists";
import { usePathname, useRouter } from "next/navigation";
import { groupByFirstLetter } from "@/src/utils/artists";

export type ArtistsGroupedByLetter = Record<string, Artist[]>;

interface SidebarProps {
  artists: Artist[];
  translations: {
    emptyState: string;
  };
}

const ArtistsSidebar: React.FC<SidebarProps> = ({ artists, translations }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();

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

  const groupedArtists = useMemo(() => groupByFirstLetter(artists), [artists]);

  const filteredArtists = useMemo(() => {
    if (!artists.length || !groupedArtists) return {};
    if (!searchTerm) return groupedArtists;

    const filtered: ArtistsGroupedByLetter = {};
    for (const [letter, group] of Object.entries(groupedArtists)) {
      const matchingArtists = group.filter((artist) =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchingArtists.length) filtered[letter] = matchingArtists;
    }
    return filtered;
  }, [groupedArtists, searchTerm]);

  return (
    <aside aria-label="Artists Sidebar" className="space-y-12">
      <SearchInput value={searchTerm} handleSearchChange={handleSearchChange} />
      {Object.keys(filteredArtists).length === 0 && (
        <p className="text-gray-500">{translations.emptyState}</p>
      )}
      {Object.entries(filteredArtists)?.map(([letter, group], index) => (
        <div key={`${index}-${letter}`}>
          <div className="flex flex-row justify-between items-center gap-3">
            <h4>{letter}</h4>
            <ul>
              {group.map((artist: Artist, index: number) => (
                <li
                  key={artist.name}
                  className={`h-12 w-52 flex items-center justify-between border-b border-gray-200 text-gray-800 hover:text-black font-normal ${
                    index === 0 ? "border-t" : ""
                  }`}
                >
                  {artist.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="my-12 border-b border-gray-300" />
        </div>
      ))}
    </aside>
  );
};

export { ArtistsSidebar };
