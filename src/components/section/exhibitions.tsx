"use client";

import React, { useState, useEffect, useRef } from "react";
import { Exhibition } from "@/lib/exhibitions";
import ContentfulImage from "@/lib/contentful-image";
import { Artist } from "@/lib/artists";
import ForwardButton from "../buttons/forward";
import { useRouter } from "next/navigation";
import Carousel from "../carousel";
import { ExpandMoreIcon } from "../icons/expand-more";
import { useLocale } from "next-intl";
import MobileGallery from "../MobileGallery";
import Link from "next/link";

interface TranslationsObject {
  readMore: string;
  readLess: string;
  aboutArtist: string;
  aboutArtists: string;
}

type SectionProps = {
  exhibition: Exhibition;
  exhibitionId: string;
  translations: TranslationsObject;
};

const MAX_NO_CHARACTERS_DESCRIPTION = 300;

const Section: React.FC<SectionProps> = ({
  exhibition,
  exhibitionId,
  translations,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [exhibitionWithAllDetails, setDetails] =
    useState<Exhibition>(exhibition);

  const router = useRouter();
  const locale = useLocale();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          fetch(`/api/exhibitions/${exhibitionId}`)
            .then((res) => {
              if (!res.ok) {
                throw new Error(`Failed to fetch details for ${exhibitionId}`);
              }
              return res.json();
            })
            .then((data) => {
              setDetails({ ...exhibition, ...data });
            })
            .catch((error) =>
              console.error(
                `Error fetching details for ${exhibitionId}:`,
                error
              )
            );
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [exhibitionId]);

  const handleArtistsClick = () => {
    const artistNames = exhibitionWithAllDetails.artists
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
    <div
      ref={sectionRef}
      id={exhibition.id}
      className="flex flex-col space-y-8"
      style={{ height: "1200px", overflowY: "hidden" }}
    >
      <div className="block pt-10 md:hidden">
        <MobileGallery
          images={
            exhibitionWithAllDetails.artworks?.map(
              (artwork) => artwork.images[0]
            ) || []
          }
        />
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col space-y-4 w-full md:w-1/2">
          <h3 className="text-gray-900">{exhibitionWithAllDetails.title}</h3>
          <p className="text-gray-600">
            {exhibitionWithAllDetails?.description &&
              (isExpanded
                ? exhibitionWithAllDetails.description
                  .split("\n")
                  .map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))
                : getCroppedText(
                  exhibitionWithAllDetails.description,
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
          {exhibitionWithAllDetails?.description &&
            exhibitionWithAllDetails.description.length >
            MAX_NO_CHARACTERS_DESCRIPTION && (
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
            {exhibitionWithAllDetails?.artists.length > 0 && (
              <>
                <p className="text-gray-800 font-medium !my-3">
                  {mapArtistsToArtistsList(exhibitionWithAllDetails.artists)}
                </p>
                <div className="border-t border-gray-300 !m-0" />
              </>
            )}
            <p className="text-gray-500 !my-3">
              {`${new Intl.DateTimeFormat(locale, {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(
                new Date(exhibitionWithAllDetails.startDate)
              )} - ${new Intl.DateTimeFormat(locale, {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date(exhibitionWithAllDetails.endDate))}`}
            </p>
            <div className="border-t border-gray-300 !mb-10 !mt-0" />
          </div>
        </div>

        {exhibitionWithAllDetails?.picture?.url && (
          <div className="hidden md:block md:w-2/5">
            <ContentfulImage
              src={exhibitionWithAllDetails?.picture?.url}
              alt={exhibitionWithAllDetails?.title || "Exhibition"}
              width={400}
              height={400}
              className="rounded object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex flex-row gap-10">
        {exhibitionWithAllDetails.artists.length > 0 ? exhibitionWithAllDetails.artists.length == 1 ?
          <Link href={`/artists/${exhibitionWithAllDetails.artists[0].id}`}>
            <ForwardButton>{translations.aboutArtist}</ForwardButton>
          </Link> :
          <ForwardButton
            onClick={handleArtistsClick}
            className="w-full md:w-auto"
          >
            {translations.aboutArtists}
          </ForwardButton>
          : null}
      </div>
      <div className="hidden md:flex">
        <Carousel
          images={exhibitionWithAllDetails?.artworks
            .filter((artwork) => artwork.name && artwork.images?.[0]?.url)
            .map((artwork) => ({
              url: artwork.images[0].url,
              title: artwork.name,
              height: artwork.height,
              width: artwork.width,
            }))}
          visibleCount={3}
        />
      </div>
    </div>
  );
};

export default Section;
