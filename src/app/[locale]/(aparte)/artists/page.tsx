import { getTranslations } from "next-intl/server";
import React, { useMemo } from "react";
import { Artist } from "@/lib/artists";
import { ArtistsSidebar } from "@/src/components/sidebar/artists";
import { groupByFirstLetter } from "@/src/utils/artists";
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/artists`
    );

    if (!res.ok) throw new Error("Failed to fetch artists");
    artists = await res.json();
  } catch (error) {
    console.error(error);
  }

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="m-12 flex flex-row gap-24">
      <ArtistsSidebar artists={artists} />
      <div className="w-full">
        <h2 className="mb-8">{t("title")}</h2>
        {Object.entries(groupByFirstLetter(filteredArtists)).map(
          ([letter, group]) => (
            <>
              <div key={letter}>
                {group.map((artist, index) => (
                  <React.Fragment key={artist.name}>
                    <Section
                      artist={artist}
                      translations={{
                        aboutArtists: t("section.about"),
                      }}
                    />
                    {index !== group.length - 1 && (
                      <div className="my-32 border-b border-gray-200" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              {/* {index !== artists.length - 1 && (
                <div className="my-32 border-b border-gray-200" />
              )} */}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Artists;
