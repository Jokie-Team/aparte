import { fetchAllArtists, fetchArtistDetails } from "@/lib/artists";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import BackButton from "@/src/components/buttons/back";
import ExpandableText from "@/src/components/ExpandableText";

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

  return (
    <div className="px-10 py-10 space-y-10">
      <BackButton />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-64 items-start">
        <div className="col-span-2 space-y-10">
          <h2>{artist.name}</h2>
          <ExpandableText
            text={artist.bio}
            readMoreLabel={t("section.readMore")}
            readLessLabel={t("section.readLess")}
          />
        </div>

        {artist.picture?.url && (
          <Image
            src={artist.picture.url}
            alt={artist.picture.title || artist.name}
            width={300}
            height={300}
            className="rounded object-cover w-full h-auto"
          />
        )}
      </div>

      {artist.artworks?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {artist.artworks.map((artwork) => {
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
      )}
    </div>
  );
}
