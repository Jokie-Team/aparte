import { getTranslations } from "next-intl/server";
import React, { useMemo } from "react";
import { Artist } from "@/lib/artists";
import { ArtistsSidebar } from "@/src/components/sidebar/artists";
import {
  filterArtistsBySearchTerms,
  groupByFirstLetter,
} from "@/src/utils/artists";
import Section from "@/src/components/section/artists";

type ArtistsProps = {
  searchParams: { search?: string };
};

const Artists = async ({ searchParams }: ArtistsProps) => {
  const t = await getTranslations("artists");
  const searchTerm = searchParams.search?.toLowerCase() || "";

  let artists: Artist[] = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/artists`,
      {
        cache: "no-store",
        next: { revalidate: 10 },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch artists: ${res.status} - ${errorText}`);
    }
    artists = await res.json();
  } catch (error) {
    console.error("Fetch artists error:", error);
  }

  const filteredArtists = filterArtistsBySearchTerms(artists, searchTerm);

  return (
    <div className="m-12 flex flex-row w-full gap-24">
      <div className="w-1/4 flex-shrink-0">
        <ArtistsSidebar
          searchValue={searchTerm}
          artists={filteredArtists}
          translations={{ emptyState: t("sidebar.emptyState"), search: t("sidebar.search") }}
        />
      </div>
      <div className="w-full">
        <h2 className="mb-8">{t("title")}</h2>
        {Object.entries(groupByFirstLetter(filteredArtists)).map(
          ([letter, group], groupIndex, allGroups) => (
            <div key={letter}>
              {group.map((artist, index) => (
                <React.Fragment key={artist.name}>
                  <Section
                    artist={artist}
                    translations={{
                      aboutArtist: t("section.aboutArtist"),
                      aboutExhibitions: t("section.aboutExhibitions"),
                    }}
                  />
                  {!(index === group.length - 1 && groupIndex === allGroups.length - 1) && (
                    <div className="my-32 border-b border-gray-200" />
                  )}
                </React.Fragment>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Artists;
