import { fetchAllArtists, fetchArtistDetails } from "@/lib/artists";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import BackButton from "@/src/components/buttons/back";
import ExpandableText from "@/src/components/ExpandableText";
import Carousel from "@/src/components/carousel";
import ForwardButton from "@/src/components/buttons/forward";
import Tag from "@/src/components/tags/tag";

interface ArtistPageProps {
  params: {
    locale: string;
    artistId: string;
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const t = await getTranslations("artists");
  const { artistId } = params;

  const allArtists = await fetchAllArtists();
  const base = allArtists.find((a) => a.id === artistId);

  if (!base) return <div className="m-4">Artista não encontrado</div>;

  const details = await fetchArtistDetails(artistId);
  const artist = { ...base, ...details };

  const artworksPerPage = 12; // 3 rows of 4 columns
  const initialArtworks = artist.artworks.slice(0, artworksPerPage);
  const remainingArtworks = artist.artworks.slice(artworksPerPage);

  const hasPicture = artist.picture?.url;
  const hasArtwork = artist.artworks?.length > 0;

  return (
    <div className="px-10 py-10 space-y-10">
      <BackButton />
      <div className="space-y-40">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-64 items-start">
          <div className="col-span-1 space-y-10">
            <h2>{artist.name}</h2>
            <ExpandableText
              text={artist.bio}
              readMoreLabel={t("section.readMore")}
              readLessLabel={t("section.readLess")}
            />
            <div className="flex flex-row w-full justify-end gap-10">
              {hasArtwork && (
                <ForwardButton>
                  {t("section.seeArtworks")}
                </ForwardButton>
              )}
              {artist.exhibitions.length > 0 && (
                <ForwardButton>
                  {t("section.seeExhibitions")}
                </ForwardButton>
              )}
            </div>
          </div>

          <div className="flex flex-row space-x-6 justify-end w-full">
            {hasPicture && !hasArtwork && (
              <div className="w-1/2 aspect-square">
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

        {hasArtwork && (
          <div className="space-y-8">
            <div className="pt-28">
              <Tag text={t("section.artistArtworks")} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {initialArtworks.map((artwork) => {
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
                    <span className="absolute top-2 left-2 text-xs bg-white rounded px-2 py-1 shadow">
                      {artwork.name}
                    </span>
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
        {artist.exhibitions?.length > 0 && (
          <div className="space-y-8">
            <div className="pt-28">
              <Tag text={t("section.artistExhibitions")} />
            </div>
            <div className="h-[30vh]">
              <Carousel
                images={artist.exhibitions.map((exhibition) => ({
                  url: exhibition.picture?.url || "/images/placeholder.jpg",
                  title: exhibition.title,
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
