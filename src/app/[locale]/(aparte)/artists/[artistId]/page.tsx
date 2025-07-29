"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { fetchAllArtists, fetchArtistDetails } from "@/lib/artists";
import BackButton from "@/src/components/buttons/back";
import ExpandableText from "@/src/components/ExpandableText";
import Carousel from "@/src/components/carousel";
import Tag from "@/src/components/tags/tag";

export default function ArtistPage() {
  const params = useParams<{ locale: string; artistId: string }>();
  const t = useTranslations("artists");
  const [artist, setArtist] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"artworks" | "exhibitions">("artworks");

  useEffect(() => {
    async function loadArtist() {
      if (!params?.artistId) return;

      const allArtists = await fetchAllArtists();
      const base = allArtists.find((a) => a.id === params.artistId);

      if (!base) return;
      const details = await fetchArtistDetails(params.artistId);

      setArtist({ ...base, ...details });
    }

    loadArtist();
  }, [params?.artistId]);

  if (!artist) return <div className="p-10">A carregar artista...</div>;

  const artworksPerPage = 12;
  const initialArtworks = artist.artworks.slice(0, artworksPerPage);
  const remainingArtworks = artist.artworks.slice(artworksPerPage);

  const hasPicture = artist.picture?.url;
  const hasArtwork = artist.artworks?.length > 0;

  return (
    <div className="px-10 py-10 space-y-10">
      <BackButton />
      <div className="space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-64 items-start">
          <div className="col-span-1 space-y-10">
            <h2>{artist.name}</h2>
            <ExpandableText
              text={artist.bio}
              readMoreLabel={t("section.readMore")}
              readLessLabel={t("section.readLess")}
            />
            {/* <div className="flex flex-row w-full justify-end gap-10">
              {hasArtwork && <ForwardButton>{t("section.seeArtworks")}</ForwardButton>}
              {artist.exhibitions.length > 0 && <ForwardButton>{t("section.seeExhibitions")}</ForwardButton>}
            </div> */}
          </div>

          <div className="flex flex-row space-x-6 justify-end w-full">
            {hasPicture && !hasArtwork && (
              <div className="w-full md:w-1/2 aspect-square">
                <Image
                  src={artist.picture.url}
                  alt={artist.picture.title || artist.name}
                  width={300}
                  height={300}
                  className="object-cover object-top w-full h-full"
                />
              </div>
            )}
            {!hasPicture && hasArtwork && (
              <div className="w-full">
                <Image
                  src={artist.artworks[0].images?.[0].url}
                  alt={artist.artworks[0].images?.[0].title || artist.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-auto"
                />
              </div>
            )}
            {hasPicture && hasArtwork && (
              <>
                <div className="w-[calc(30%-12px)] h-[70%] aspect-square">
                  <Image
                    src={artist.picture.url}
                    alt={artist.picture.title || artist.name}
                    width={300}
                    height={300}
                    className="object-cover object-top w-full h-full"
                  />
                </div>
                <div className="w-[calc(70%-12px)]">
                  <Image
                    src={artist.artworks[0].images?.[0].url}
                    alt={artist.artworks[0].images?.[0].title || artist.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-auto"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {(artist.artworks?.length > 0 || artist.exhibitions?.length > 0) && (
          <div className="pt-28 flex flex-row space-x-2">
            {artist.artworks?.length > 0 && (
              <button onClick={() => setActiveTab("artworks")}>
                <Tag
                  size="small"
                  clickable={true}
                  selected={activeTab === "artworks"}
                  text={t("section.artistArtworks")}
                />
              </button>
            )}
            {artist.exhibitions?.length > 0 && (
              <button onClick={() => setActiveTab("exhibitions")}>
                <Tag
                  size="small"
                  clickable={true}
                  selected={activeTab === "exhibitions"}
                  text={t("section.artistExhibitions")}
                />
              </button>
            )}
          </div>
        )}
        {activeTab === "artworks" && hasArtwork && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {initialArtworks.map((artwork: any) => {
                const image = artwork.images?.[0];
                return image ? (
                  <div key={artwork.id} className="relative group">
                    <Image
                      src={image.url}
                      alt={image.title || artwork.name}
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover rounded"
                    />
                    {!artwork.available && (
                      <span className="absolute top-2 left-2 flex items-center gap-2 text-sm font-medium bg-white rounded px-3 py-1 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-red" />
                        {t("section.unavailable")}
                      </span>
                    )}
                  </div>
                ) : null;
              })}
            </div>
            {remainingArtworks.length > 0 && (
              <div className="text-center text-sm text-gray-500">
                {t("section.moreArtworksAvailable")}
              </div>
            )}
          </div>
        )}

        {activeTab === "exhibitions" && artist.exhibitions?.length > 0 && (
          <div className="space-y-8">
            <div className="md:flex">
              <Carousel
                images={artist?.exhibitions
                  .filter((exhibition: { title: any; picture: { url: any; }; }) => exhibition.title && exhibition.picture?.url)
                  .map((exhibition: { picture: { url: any; }; title: any; startDate: any; endDate: any; }) => ({
                    url: exhibition.picture?.url,
                    title: exhibition.title,
                    startDate: exhibition.startDate,
                    endDate: exhibition.endDate,
                  }))}
                visibleCount={3}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
