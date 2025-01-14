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
import MobileGallery from "../MobileGallery";

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
  const locale = useLocale();

  const handleArtistsClick = () => {
    const artistNames = exhibition.artists
      .map((artist) => artist.name)
      .join(", ");
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
    return lastPeriodIndex !== -1
      ? cropped.slice(0, lastPeriodIndex + 1)
      : cropped + "...";
  };

  return (
    <div id={exhibition.id} className="flex flex-col space-y-8">
      <div className="block pt-10 md:hidden">
        <MobileGallery
          images={
            exhibition?.artworks
              .map((artwork) => artwork.images[0])
              .slice(0, 5) || []
          }
        />
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col space-y-4 w-full md:w-1/2">
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
                : getCroppedText(
                    exhibition.description,
                    MAX_NO_CHARACTERS_DESCRIPTION
                  )
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
            <p className="text-gray-500 !my-3">
              {`${new Intl.DateTimeFormat(locale, {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(
                new Date(exhibition.startDate)
              )} - ${new Intl.DateTimeFormat(locale, {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date(exhibition.endDate))}`}
            </p>
            <div className="border-t border-gray-300 !mb-10 !mt-0" />
          </div>
        </div>

        <div className="hidden md:block md:w-2/5">
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
        <ForwardButton
          onClick={handleArtistsClick}
          className="w-full md:w-auto"
        >
          {exhibition.artists.length > 1
            ? translations.aboutArtists
            : translations.aboutArtist}
        </ForwardButton>
        {/* <ForwardButton>{translations.aboutArtworks}</ForwardButton> */}
      </div>
      <div className="hidden md:flex">
        <Carousel
          images={
            exhibition?.artworks.map((artwork) => artwork.images[0]) || []
          }
          visibleCount={3}
        />
      </div>
    </div>
  );
};

export default Section;
