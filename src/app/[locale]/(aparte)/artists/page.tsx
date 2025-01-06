import { getTranslations } from "next-intl/server";
import React from "react";
import { Artist } from "@/lib/artists";
import { ArtistsSidebar } from "@/src/components/sidebar/artists";
import Section from "@/src/components/section/artists";

const normalizeName = (name: string) => {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
};

const groupArtistsByFirstLetter = (artists: Artist[]) => {
  const grouped: Record<string, Artist[]> = {};

  artists.forEach((artist) => {
    const firstLetter = normalizeName(artist.name)[0]?.toUpperCase() || "#";
    if (!grouped[firstLetter]) grouped[firstLetter] = [];
    grouped[firstLetter].push(artist);
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
};

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

  const filteredArtists = artists.filter((artist) =>
    normalizeName(artist.name).includes(normalizeName(searchTerm))
  );

  const groupedArtists = groupArtistsByFirstLetter(filteredArtists);

  return (
    <div className="m-12 flex flex-row w-full gap-24">
      <div className="w-1/4 flex-shrink-0">
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
        {Object.entries(groupedArtists).map(([letter, group], groupIndex) => (
          <div key={letter} id={`group-${letter}`}>
            {group.map((artist, artistIndex) => (
              <React.Fragment key={artist.name}>
                <Section
                  id={`artist-${artist.name.replaceAll(" ", "-").toLowerCase()}`}
                  artist={artist}
                  translations={{
                    aboutArtist: t("section.aboutArtist"),
                    aboutExhibitions: t("section.aboutExhibitions"),
                    readLess: t("section.readLess"),
                    readMore: t("section.readMore"),
                  }}
                />
                {!(artistIndex === group.length - 1 &&
                  groupIndex === Object.entries(groupedArtists).length - 1) && (
                    <div className="my-32 border-b border-gray-200" />
                  )}
              </React.Fragment>
            ))}

          </div>
        ))}
      </div>

    </div>
  );
};

export default Artists;
