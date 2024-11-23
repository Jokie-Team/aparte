"use client";

import React from "react";
import { Exhibition } from "@/lib/exhibitions";
import ContentfulImage from "@/lib/contentful-image";
import { Artist } from "@/lib/artists";
import ForwardButton from "../buttons/forward";
import { useRouter } from "next/navigation";

interface TranslationsObject {
  aboutArtworks: string;
  aboutArtist: string;
  aboutArtists: string;
}

type SectionProps = {
  exhibition: Exhibition;
  translations: TranslationsObject;
};

const Section: React.FC<SectionProps> = ({ exhibition, translations }) => {
  const router = useRouter();

  const handleArtistsClick = () => {
    const artistNames = exhibition.artists
      .map((artist) => artist.name)
      .join(",");
    router.push(`/artists?search=${encodeURIComponent(artistNames)}`);
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="inline-flex h-auto w-fit px-4 py-2.5 rounded-3xl border border-[#2b2b2b]">
        <div className="text-[#2b2b2b] text-base font-extrabold font-['Neue Haas Unica']">
          ✴ Coleção / Série X
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col space-y-4 w-1/2">
          <h3 className="text-gray-900">{exhibition.title}</h3>
          <p className="text-gray-600">{exhibition.description}</p>
          <div>
            <div className="border-t border-gray-300 !mt-10" />
            <p className="text-gray-800 font-medium !my-3">
              {exhibition.artists.length > 0 &&
                exhibition.artists.reduce(
                  (acc: string, artist: Artist) => acc + artist.name,
                  ""
                )}
            </p>
            <div className="border-t border-gray-300 !m-0" />
            <p className="text-gray-500 !my-3">
              {`${new Date(exhibition.startDate).toDateString()} - ${new Date(
                exhibition.endDate
              ).toDateString()}`}
            </p>
            <div className="border-t border-gray-300 !mb-10 !mt-0" />
          </div>
        </div>

        <div className="sm:w-1/3 w-full">
          <ContentfulImage
            src={exhibition.picture.url}
            alt={exhibition.title}
            width={400}
            height={400}
            className="rounded object-cover"
          />
        </div>
      </div>

      <div className="flex flex-row gap-10">
        <ForwardButton onClick={handleArtistsClick}>
          {exhibition.artists.length > 1
            ? translations.aboutArtists
            : translations.aboutArtist}
        </ForwardButton>
        <ForwardButton>{translations.aboutArtworks}</ForwardButton>
      </div>
      {/* <Carousel
        images={exhibition?.artworks || artistItem?.artworks || []}
        visibleCount={3}
      /> */}
    </div>
  );
};

export default Section;
