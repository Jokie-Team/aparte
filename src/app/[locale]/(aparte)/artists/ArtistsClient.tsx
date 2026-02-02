"use client";

import { Artist } from "@/lib/artists";
import { ArtistsSearchBar } from "@/src/components/searchBar/artists";
import Section from "@/src/components/section/artists";
import { ArtistsSidebar } from "@/src/components/sidebar/artists";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

type ArtistClientProps = {
  artists: Artist[];
  translations?: Record<string, string>;
};

export const ArtistsClient = ({ artists, translations }: ArtistClientProps) => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams?.get("search")?.toLowerCase() || "";

  const filteredArtists = useMemo(() => {
    if (!searchTerm) return artists;

    return artists.filter((artist) =>
      artist.name.toLowerCase().includes(searchTerm),
    );
  }, [artists, searchTerm]);

  const groupedArtistsByFirstLetter = useMemo(() => {
    const grouped: Record<string, Artist[]> = {};

    filteredArtists.forEach((artist) => {
      const firstLetter = artist.name?.charAt(0).toUpperCase() || "#";
      if (!grouped[firstLetter]) grouped[firstLetter] = [];
      grouped[firstLetter].push(artist);
    });

    const sortedGrouped: Record<string, Artist[]> = {};
    Object.keys(grouped)
      .sort((a, b) => a.localeCompare(b))
      .forEach((key) => {
        sortedGrouped[key] = grouped[key].sort((a, b) =>
          a.name.localeCompare(b.name),
        );
      });

    return sortedGrouped;
  }, [filteredArtists]);

  return (
    <div className="p-12 flex flex-row w-full gap-24">
      <div className="w-1/4 flex-shrink-0 hidden md:block">
        <ArtistsSidebar
          artists={filteredArtists}
          translations={{
            emptyState: translations?.emptyState || "",
            search: translations?.search || "",
          }}
          searchValue={searchTerm}
        />
      </div>

      <div className="w-full">
        <h2 className="mb-8">{translations?.title}</h2>

        <ArtistsSearchBar
          artists={filteredArtists}
          translations={{
            emptyState: translations?.emptyState || "",
            search: translations?.search || "",
          }}
          searchValue={searchTerm}
        />

        {Object.entries(groupedArtistsByFirstLetter ?? {}).map(
          ([letter, group], groupIndex) => (
            <div key={letter} id={letter}>
              {group.map((artist, artistIndex) => (
                <div key={artist.id}>
                  <Section
                    artistId={artist.id}
                    artist={artist}
                    translations={{
                      aboutArtist: translations?.aboutArtist || "",
                      seeExhibitions: translations?.seeExhibitions || "",
                      seeArtworks: translations?.seeArtworks || "",
                      artistExhibitions: translations?.artistExhibitions || "",
                      readLess: translations?.readLess || "",
                      readMore: translations?.readMore || "",
                      aboutArtists: translations?.aboutArtists || "",
                      exhibitionArtworks:
                        translations?.exhibitionArtworks || "",
                    }}
                  />
                  {!(
                    artistIndex === group.length - 1 &&
                    groupIndex ===
                      Object.entries(groupedArtistsByFirstLetter ?? {}).length -
                        1
                  ) && <div className="my-32 border-b border-gray-200" />}
                </div>
              ))}
            </div>
          ),
        )}
      </div>
    </div>
  );
};
