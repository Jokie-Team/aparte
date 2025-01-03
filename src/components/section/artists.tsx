"use client";

import React from "react";
import { Artist } from "@/lib/artists";
import ContentfulImage from "@/lib/contentful-image";
import ForwardButton from "../buttons/forward";
import { useRouter } from "next/navigation";

interface TranslationsObject {
  aboutArtist: string;
  aboutExhibitions: string;
}

const MAX_NO_CHARACTERS_BIO = 700;

const Section: React.FC<{
  artist: Artist;
  translations: TranslationsObject;
}> = ({ artist, translations }) => {
  const router = useRouter();

  const handleExhibitionsClick = () => {
    const exhibitionsNames = artist.exhibitions
      .map((exhibition) => exhibition.title)
      .join(" ");
    router.push(`/exhibitions?search=${encodeURIComponent(exhibitionsNames)}`);
  };

  return (
    <div className="flex flex-col gap-20 my-20 w-full">
      <div className="flex flex-row justify-between gap-36 w-full">
        <div className="flex flex-col gap-2 w-2/3">
          <h3 className="text-gray-900">{artist?.name}</h3>
          <p className="text-gray-600">
            {artist?.bio && artist.bio.length > MAX_NO_CHARACTERS_BIO
              ? artist.bio.slice(0, MAX_NO_CHARACTERS_BIO) + "..."
              : artist?.bio || "Biography not available"}
          </p>

        </div>
        <div className="w-1/3">
          <ContentfulImage
            src={artist?.picture?.url || "/images/placeholder.jpeg"}
            alt={artist?.picture?.alt || `${artist?.name || "Artist"}'s picture`}
            width={500}
            height={500}
          />
        </div>

      </div>
      <div className="flex flex-row gap-10">
        {/*<ForwardButton>{translations.aboutArtist}</ForwardButton>*/}
        {artist.exhibitions.length > 0 &&
          <ForwardButton onClick={handleExhibitionsClick}>{translations.aboutExhibitions}</ForwardButton>}
      </div>
    </div>
  )
};

export default Section;
