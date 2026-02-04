"use client";

import React, { useEffect, useRef, useState } from "react";
import { Artist } from "@/lib/artists";
import ContentfulImage from "@/lib/contentful-image";
import ForwardButton from "../buttons/forward";
import Carousel from "../carousel";
import { Artwork, fetchArtworksByArtist } from "@/lib/artworks";
import Link from "next/link";
import ExpandableText from "../ExpandableText";

interface TranslationsObject {
  aboutArtist: string;
  aboutArtists: string;
  seeExhibitions: string;
  seeArtworks: string;
  artistExhibitions: string;
  exhibitionArtworks: string;
  readMore: string;
  readLess: string;
}

const Section: React.FC<{
  artist: Artist;
  translations: TranslationsObject;
  artistId: string;
}> = ({ artist, translations, artistId }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      id={artistId}
      ref={sectionRef}
      className="flex flex-col gap-20 my-20 w-full"
    >
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
          <ExpandableText
            text={artist?.bio || ""}
            readMoreLabel={translations.readMore}
            readLessLabel={translations.readLess}
          />
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
        {artist.artworks?.length > 0 && (
          <Link href={`/artists/${artist.id}`}>
            <ForwardButton>{translations.seeArtworks}</ForwardButton>
          </Link>
        )}
      </div>
      {artist.exhibitions?.length > 0 ? (
        <div className="hidden md:flex">
          <Carousel
            images={artist?.exhibitions
              .filter(
                (exhibition) => exhibition.title && exhibition.picture?.url,
              )
              .map((exhibitionWithImage) => ({
                url: exhibitionWithImage.picture!.url,
                title: exhibitionWithImage.title,
                startDate: exhibitionWithImage.startDate,
                endDate: exhibitionWithImage.endDate,
              }))}
            visibleCount={3}
            title={translations.artistExhibitions}
            type="exhibition"
          />
        </div>
      ) : null}
    </div>
  );
};

export default Section;
