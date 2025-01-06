"use client";

import React, { useState } from "react";
import { Exhibition } from "@/lib/exhibitions";
import ContentfulImage from "@/lib/contentful-image";
import { Artist } from "@/lib/artists";
import ForwardButton from "../buttons/forward";
import { useRouter } from "next/navigation";
import Carousel from "../carousel";
import { ExpandMoreIcon } from "../icons/expand-more";
import { useLocale } from "next-intl";

interface TranslationsObject {
  readMore: string;
  readLess: string;
  aboutArtworks: string;
  aboutArtist: string;
  aboutArtists: string;
}

type SectionProps = {
  exhibition: Exhibition;
  translations: TranslationsObject;
};

const MAX_NO_CHARACTERS_DESCRIPTION = 300;

const Section: React.FC<SectionProps> = ({ exhibition, translations }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleArtistsClick = () => {
    const artistNames = exhibition.artists
      .map((artist) => artist.name)
      .join(" ");
    router.push(`/artists?search=${encodeURIComponent(artistNames)}`);
  };

  const mapArtistsToArtistsList = (artists: Artist[]) => {
    let artistsList = "";

    if (artists.length === 1) return artists[0].name;

    artists.map((artist, index) => {
      if (index === artists.length - 1) {
        artistsList = artistsList + artist.name;
      } else {
        artistsList = artistsList + artist.name + ", ";
      }
    });
    return artistsList;
  };

  const handleToggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  const getCroppedText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const cropped = text.slice(0, maxLength);
    const lastPeriodIndex = cropped.lastIndexOf(".");
    return lastPeriodIndex !== -1 ? cropped.slice(0, lastPeriodIndex + 1) : cropped + "...";
  };

  return (
    <div
      id={`exhibition-${exhibition.title
        .replaceAll(" ", "-")
        .toLowerCase()}`}
      className="flex flex-col space-y-8"
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col space-y-4 w-1/2">
          <h3 className="text-gray-900">{exhibition.title}</h3>
          <p className="text-gray-600">
            {exhibition?.description &&
              (isExpanded
                ? exhibition.description.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))
                : getCroppedText(exhibition.description, MAX_NO_CHARACTERS_DESCRIPTION)
                  .split("\n")
                  .map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  )))}
          </p>
          {exhibition?.description &&
            exhibition.description.length > MAX_NO_CHARACTERS_DESCRIPTION && (
              <span
                onClick={handleToggleDescription}
                className="font-extrabold text-blue-600 hover:text-blue-800 mt-2 cursor-pointer flex items-center gap-2"
              >
                {isExpanded ? translations.readLess : translations.readMore}
                <ExpandMoreIcon rotate180={isExpanded} />
              </span>
            )}
          <div>
            <div className="border-t border-gray-300 !mt-10" />
            <p className="text-gray-800 font-medium !my-3">
              {exhibition.artists.length > 0 &&
                mapArtistsToArtistsList(exhibition.artists)}
            </p>
            <div className="border-t border-gray-300 !m-0" />
          </div>
        </div>

        <div className="sm:w-2/5">
          <ContentfulImage
            src={exhibition?.picture?.url || "/images/placeholder.jpeg"}
            alt={exhibition?.title || "Exhibition"}
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
        {/* <ForwardButton>{translations.aboutArtworks}</ForwardButton> */}
      </div>
      <Carousel images={exhibition?.artworks || []} visibleCount={3} />
    </div>
  );
};

export default Section;
