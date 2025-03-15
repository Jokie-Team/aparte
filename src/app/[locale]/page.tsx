import { fetchArtworks } from "@/lib/artworks";
import RandomGallery from "@/src/components/random-gallery";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function LocalePage() {
  const t = await getTranslations("homepage");

  const randomArtworks = await fetchArtworks(false, 9);

  return (
    <div className="px-6 py-10 w-full overflow-x-hidden overflow-y-hidden">
      <RandomGallery artworks={randomArtworks} />
      <h1 className="bottom-0 left-0">{t("title")}</h1>
    </div>
  );
}
