"use client";

import React, { useState } from "react";
import { Artist } from "@/lib/artists";
import ContentfulImage from "@/lib/contentful-image";
import ForwardButton from "../buttons/forward";
import { useRouter } from "next/navigation";
import { ExpandMoreIcon } from "../icons/expand-more";
import Carousel from "../carousel";

interface TranslationsObject {
  aboutArtist: string;
  aboutExhibitions: string;
  readMore: string;
  readLess: string;
}

const MAX_NO_CHARACTERS_BIO = 500;

const Section: React.FC<{
  artist: Artist;
  translations: TranslationsObject;
  id: string;
}> = ({ artist, translations, id }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleExhibitionsClick = () => {
    const exhibitionsNames = artist.exhibitions
      .map((exhibition) => exhibition.title)
      .join(" ");
    router.push(`/exhibitions?search=${encodeURIComponent(exhibitionsNames)}`);
  };

  const handleToggleBio = () => {
    setIsExpanded((prev) => !prev);
  };

  const getCroppedText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const cropped = text.slice(0, maxLength);
    const lastPeriodIndex = cropped.lastIndexOf(".");
    return lastPeriodIndex !== -1
      ? cropped.slice(0, lastPeriodIndex + 1)
      : cropped + "...";
  };

  console.log(artist)
  return (
    <div id={id} className="flex flex-col gap-20 my-20 w-full">
      <div className="flex flex-row justify-between gap-36 w-full">
        <div className="flex flex-col gap-2 w-full md:w-2/3">
          <div className="block md:hidden w-full ">
            <ContentfulImage
              src={artist?.picture?.url || ""}
              alt={
                artist?.picture?.alt || `${artist?.name || "Artist"}'s picture`
              }
              width={500}
              height={500}
            />
          </div>
          <h3 className="text-gray-900 pt-10 md:pt-0">{artist?.name}</h3>
          <p className="text-gray-600">
            {artist?.bio &&
              (isExpanded
                ? artist.bio.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))
                : getCroppedText(artist.bio, MAX_NO_CHARACTERS_BIO)
                  .split("\n")
                  .map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  )))}
          </p>
          {artist?.bio && artist.bio.length > MAX_NO_CHARACTERS_BIO && (
            <span
              onClick={handleToggleBio}
              className="font-extrabold text-blue-600 hover:text-blue-800 mt-2 cursor-pointer flex items-center gap-2"
            >
              {isExpanded ? translations.readLess : translations.readMore}
              <ExpandMoreIcon rotate180={isExpanded} />
            </span>
          )}
        </div>
        <div className="hidden md:block w-full md:w-1/3 ">
          <ContentfulImage
            src={artist?.picture?.url || ""}
            alt={
              artist?.picture?.alt || `${artist?.name || "Artist"}'s picture`
            }
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="flex flex-row gap-10">
        {/*<ForwardButton>{translations.aboutArtist}</ForwardButton>*/}
        {artist.exhibitions.length > 0 && (
          <ForwardButton onClick={handleExhibitionsClick}>
            {translations.aboutExhibitions}
          </ForwardButton>
        )}
      </div>
      <div className="hidden md:flex">
        <Carousel
          images={[]}
          visibleCount={3}
        />
      </div>
    </div>
  );
};

export default Section;
