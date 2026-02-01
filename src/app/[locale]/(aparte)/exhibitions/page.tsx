import { fetchAllExhibitions } from "@/lib/exhibitions";
import { ExhibitionsClient } from "./ExhibitionsClient";
import { getTranslations } from "next-intl/server";

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
    <ExhibitionsClient exhibitions={exhibitions} translations={translations} />
  );
};

export default Exhibitions;
