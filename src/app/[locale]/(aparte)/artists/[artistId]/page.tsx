import { useTranslations } from "next-intl";

import { fetchAllArtistsIds, fetchArtistById } from "@/lib/artists";
import { ArtistClient } from "./ArtistClient";

export async function generateStaticParams() {
  const artists = await fetchAllArtistsIds();
  return artists;
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artist = await fetchArtistById(id);

  if (!artist) {
    throw new Error("Artist not found");
  }

  const t = await useTranslations("artists");

  return (
    <ArtistClient
      artist={artist}
      translations={{
        title: t("title"),
        readMore: t("section.readMore"),
        readLess: t("section.readLess"),
        artistArtwork: t("section.artistArtworks"),
        artistExhibitions: t("section.artistExhibitions"),
        unavailable: t("section.unavailable"),
        moreArtworksAvailable: t("section.moreArtworksAvailable"),
      }}
    />
  );
}
