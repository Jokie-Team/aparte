"use client";
import { Artist } from "@/lib/artists";
import { PictureProps } from "@/lib/types";
import BackButton from "@/src/components/buttons/back";
import Carousel from "@/src/components/carousel";
import ExpandableText from "@/src/components/ExpandableText";
import GalleryModal from "@/src/components/GalleryModal";
import Tag from "@/src/components/tags/tag";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ArtistClient = ({
  artist,
  translations,
}: {
  artist: Artist;
  translations: Record<string, string>;
}) => {
  const [activeTab, setActiveTab] = useState<"artworks" | "exhibitions">(
    "artworks",
  );
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isGalleryOpen]);

  if (!artist) return <div className="p-10">A carregar artista...</div>;

  const artworksPerPage = 12;
  const initialArtworks = artist.artworks.slice(0, artworksPerPage);
  const remainingArtworks = artist.artworks.slice(artworksPerPage);

  const hasPicture = artist.picture?.url;
  const hasArtwork = artist.artworks?.length > 0;

  const openGallery = (index: number) => {
    setSelectedIndex(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => setGalleryOpen(false);
  const navigateGallery = (newIndex: number) => setSelectedIndex(newIndex);

  const galleryArtworks = artist.artworks?.map((artwork: any) => ({
    imageUrl: artwork.images?.[0]?.url,
    title: artwork.name,
    available: artwork.available,
    width: artwork.width,
    height: artwork.height,
    depth: artwork.depth,
    technique: artwork.technique,
  }));

  return (
    <div className="px-10 py-10 space-y-10">
      <BackButton />
      <div className="space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-64 items-start">
          <div className="col-span-1 space-y-10">
            <h2>{artist.name}</h2>
            <ExpandableText
              text={artist.bio}
              readMoreLabel={translations.readMore}
              readLessLabel={translations.readLess}
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
                  text={translations.artistArtwork}
                />
              </button>
            )}
            {artist.exhibitions?.length > 0 && (
              <button onClick={() => setActiveTab("exhibitions")}>
                <Tag
                  size="small"
                  clickable={true}
                  selected={activeTab === "exhibitions"}
                  text={translations.artistExhibitions}
                />
              </button>
            )}
          </div>
        )}
        {activeTab === "artworks" && hasArtwork && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
              {initialArtworks.map((artwork: any, index: number) => {
                const image = artwork.images?.[0];
                return image ? (
                  <button
                    key={artwork.id}
                    className="relative group w-full text-left focus:outline-none"
                    onClick={() => openGallery(index)}
                    aria-label={artwork.title || "untitled"}
                  >
                    <div className="relative group">
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
                          {translations.unavailable}
                        </span>
                      )}
                    </div>
                  </button>
                ) : null;
              })}
            </div>
            {remainingArtworks.length > 0 && (
              <div className="text-center text-sm text-gray-500">
                {translations.moreArtworksAvailable}
              </div>
            )}
          </div>
        )}

        {isGalleryOpen && (
          <GalleryModal
            artworks={galleryArtworks}
            currentIndex={selectedIndex}
            onClose={closeGallery}
            onNavigate={navigateGallery}
            translations={{
              unavailable: translations.unavailable,
            }}
          />
        )}

        {activeTab === "exhibitions" && artist.exhibitions?.length > 0 && (
          <div className="space-y-8">
            <div className="md:flex">
              <Carousel
                images={artist?.exhibitions
                  .filter(
                    (exhibition: {
                      title: string;
                      picture: PictureProps | null;
                    }) => exhibition.title && exhibition.picture?.url,
                  )
                  .map(
                    (exhibition: {
                      picture: PictureProps | null;
                      title: string;
                      startDate: any;
                      endDate: any;
                    }) => ({
                      url: exhibition.picture!.url,
                      title: exhibition.title,
                      startDate: exhibition.startDate,
                      endDate: exhibition.endDate,
                    }),
                  )}
                visibleCount={3}
                type="exhibition"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
