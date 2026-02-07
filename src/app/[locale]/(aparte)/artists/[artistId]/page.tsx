import { fetchAllArtistsIds, fetchArtistById } from "@/lib/artists";
import { ArtistClient } from "./ArtistClient";
import { getTranslations } from "next-intl/server";

export const revalidate = 1800;

export async function generateStaticParams() {
  const artists = await fetchAllArtistsIds();
  const locales = ["en", "pt"];

  return locales.flatMap((locale) =>
    artists.map((artist) => ({
      locale,
      artistId: artist,
    })),
  );
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ locale: string; artistId: string }>;
}) {
  const { artistId, locale } = await params;
  const artist = await fetchArtistById(artistId);

  if (!artist) {
    throw new Error("Artist not found");
  }

  const t = await getTranslations({
    locale: locale,
    namespace: "artists",
  });

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
