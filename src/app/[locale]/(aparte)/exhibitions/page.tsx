import { fetchAllExhibitions } from "@/lib/exhibitions";
import { ExhibitionsClient } from "./ExhibitionsClient";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export const revalidate = 1800;

const Exhibitions = async () => {
  const [t, exhibitions] = await Promise.all([
    getTranslations("exhibitions"),
    fetchAllExhibitions(false),
  ]);

  const translations = {
    title: t("title"),
    emptyState: t("sidebar.emptyState"),
    current: t("sidebar.current"),
    future: t("sidebar.future"),
    past: t("sidebar.past"),
    search: t("sidebar.search"),
    readMore: t("section.readMore"),
    readLess: t("section.readLess"),
    exhibitionArtworks: t("section.exhibitionArtworks"),
    aboutArtist: t("section.aboutArtist"),
    aboutArtists: t("section.aboutArtists"),
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExhibitionsClient
        exhibitions={exhibitions}
        translations={translations}
      />
    </Suspense>
  );
};

export default Exhibitions;
