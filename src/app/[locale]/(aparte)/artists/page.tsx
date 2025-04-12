import { getTranslations } from "next-intl/server";
import React from "react";
import { Artist, fetchAllArtists } from "@/lib/artists";
import { ArtistsSidebar } from "@/src/components/sidebar/artists";
import Section from "@/src/components/section/artists";
import { ArtistsSearchBar } from "@/src/components/searchBar/artists";
import { filterArtistsBySearchTerms } from "@/src/utils/artists";
import { normalizeText } from "@/src/utils/common";

const groupArtistsByFirstLetter = (artists: Artist[]) => {
  const grouped: Record<string, Artist[]> = {};

  artists.forEach((artist) => {
    const firstLetter = normalizeText(artist.name)[0]?.toUpperCase() || "#";
    if (!grouped[firstLetter]) grouped[firstLetter] = [];
    grouped[firstLetter].push(artist);
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
};

type ArtistsProps = {
  searchParams: Promise<{ search?: string }>;
};

const Artists = async ({ searchParams }: ArtistsProps) => {
  const [t, artists] = await Promise.all([
    getTranslations("artists"),
    fetchAllArtists(),
  ]);
  const searchTerm = (await searchParams).search?.toLowerCase() ?? "";

  const filteredArtists = filterArtistsBySearchTerms(artists, searchTerm);

  const groupedArtists = groupArtistsByFirstLetter(filteredArtists);

  return (
    <div className="p-12 flex flex-row w-full gap-24">
      <div className="w-1/4 flex-shrink-0 hidden md:block">
        <ArtistsSidebar
          artists={filteredArtists}
          translations={{
            emptyState: t("sidebar.emptyState"),
            search: t("sidebar.search"),
          }}
          searchValue={searchTerm}
        />
      </div>
      <div className="w-full">
        <h2 className="mb-8">{t("title")}</h2>
        <ArtistsSearchBar
          artists={filteredArtists}
          translations={{
            emptyState: t("sidebar.emptyState"),
            search: t("sidebar.search"),
          }}
          searchValue={searchTerm}
        />
        {Object.entries(groupedArtists).map(([letter, group], groupIndex) => (
          <div key={letter} id={letter}>
            {group.map((artist, artistIndex) => (
              <React.Fragment key={artist.id}>
                <Section
                  artistId={artist.id}
                  artist={artist}
                  translations={{
                    aboutArtist: t("section.aboutArtist"),
                    aboutExhibitions: t("section.aboutExhibitions"),
                    readLess: t("section.readLess"),
                    readMore: t("section.readMore"),
                  }}
                />
                {!(
                  artistIndex === group.length - 1 &&
                  groupIndex === Object.entries(groupedArtists).length - 1
                ) && <div className="my-32 border-b border-gray-200" />}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
