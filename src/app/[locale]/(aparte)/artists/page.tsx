import { getTranslations } from "next-intl/server";
import React, { Suspense } from "react";
import { fetchAllArtists } from "@/lib/artists";
import { ArtistsClient } from "./ArtistsClient";
import Spinner from "@/src/components/spinner";

export const revalidate = 1800;

const Artists = async () => {
  const [t, artists] = await Promise.all([
    getTranslations("artists"),
    fetchAllArtists(),
  ]);

  const translations = {
    title: t("title"),
    emptyState: t("sidebar.emptyState"),
    search: t("sidebar.search"),
    aboutArtist: t("section.aboutArtist"),
    seeExhibitions: t("section.seeExhibitions"),
    seeArtworks: t("section.seeArtworks"),
    artistExhibitions: t("section.artistExhibitions"),
    readLess: t("section.readLess"),
    readMore: t("section.readMore"),
  };

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[40vh]">
          <Spinner />
        </div>
      }
    >
      <ArtistsClient artists={artists} translations={translations} />
    </Suspense>
  );
};

export default Artists;
