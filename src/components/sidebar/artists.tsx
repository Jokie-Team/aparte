"use client";
import { useMemo, useState } from "react";
import { SearchInput } from "../searchInput/searchInput";
import { Artist } from "@/lib/artists";
import { usePathname, useRouter } from "next/navigation";
import { filterArtistsBySearchTerms } from "@/src/utils/artists";
import { Arrow } from "../icons/arrow";

export type ArtistsGroupedByLetter = Record<string, Artist[]>;

interface SidebarProps {
  artists: Artist[];
  translations: {
    emptyState: string;
    search: string;
  };
  searchValue?: string;
}

const ArtistsSidebar: React.FC<SidebarProps> = ({
  artists,
  translations,
  searchValue,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(searchValue || "");
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

  const normalizeName = (name: string) => {
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
        normalizeName(artist.name)[0].toUpperCase() || "#";
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
          normalizeName(a.name).localeCompare(normalizeName(b.name))
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
  }, [groupedArtists, searchTerm]);

  return (
    <aside
      id="artists-sidebar"
      aria-label="Artists Sidebar"
      className="space-y-12 relative overflow-y-auto max-h-screen"
      style={{ scrollBehavior: "smooth" }}
    >
      <SearchInput
        value={searchTerm}
        handleSearchChange={handleSearchChange}
        search={translations.search}
      />
      {Object.keys(filteredArtists).length === 0 && (
        <p className="text-gray-500">{translations.emptyState}</p>
      )}
      {Object.entries(filteredArtists)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([letter, group], index) => (
          <div key={`${index}-${letter}`}>
            <div className="flex flex-row gap-10 justify-between">
              <h4>{letter}</h4>
              <ul key={letter} className="w-2/3">
                {group.map((artist: Artist, index: number) => (
                  <li
                    key={artist.id}
                    id={'list-item-' + artist.id}
                    className={`w-full py-3 flex items-center justify-between border-b border-gray-200 text-gray-800 hover:text-black font-normal ${index === 0 ? "border-t" : ""
                      } group transition-all duration-300 hover:py-6`}
                  >
                    <button
                      onClick={() => {
                        const sidebar = document.querySelector(
                          "aside[aria-label='Artists Sidebar']"
                        );
                        const listItem = document.getElementById('list-item-' + artist.id);

                        if (sidebar && listItem) {
                          const sidebarRect = sidebar.getBoundingClientRect();
                          const listItemRect = listItem.getBoundingClientRect();

                          const offset =
                            listItemRect.top - sidebarRect.top;
                          sidebar.scrollTop += offset;
                        }

                        const element = document.getElementById(artist.id);
                        const sections = document.getElementById("sections");

                        if (element && sections) {
                          const elementPosition = element.getBoundingClientRect().top;
                          const headerOffset = document.querySelector("header")?.offsetHeight || 200;
                          const offsetPosition = elementPosition - headerOffset;
                          sections.scrollTop += offsetPosition;
                        }
                      }}

                      className="w-full text-left flex flex-row justify-between items-center"
                    >
                      <span className="truncate group-hover:overflow-visible group-hover:whitespace-normal group-hover:truncate-none">
                        {artist.name}
                      </span>

                      <span className="opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <Arrow size={24} direction="right" fill="#000" />
                      </span>
                    </button>
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
