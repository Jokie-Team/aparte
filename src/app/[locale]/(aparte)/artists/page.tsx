import { getTranslations } from "next-intl/server";
import React, { useMemo } from "react";
import { Artist } from "@/lib/artists";
import { ArtistsSidebar } from "@/src/components/sidebar/artists";

const Artists = async () => {
  const t = await getTranslations("artists");

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

  return (
    <div className="m-12 flex flex-row gap-24">
      <ArtistsSidebar artists={artists} />
      <div className="w-full">
        <h2 className="mb-8">{t("title")}</h2>
        {/* {artists.map((item, index) => (
          <>
            <div key={item.letter}>
              {artists.map((artist, index) => (
                <React.Fragment key={artist.name}>
                  <Section artistItem={artist} />
                  {index !== item.artists.length - 1 && (
                    <div className="my-32 border-b border-gray-200" />
                  )}
                </React.Fragment>
              ))}
            </div>
            {index !== artists.length - 1 && (
              <div className="my-32 border-b border-gray-200" />
            )}
          </>
        ))} */}
      </div>
    </div>
  );
};

export default Artists;
