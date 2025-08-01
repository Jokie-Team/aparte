"use client";

import React, { useEffect, useRef, useState } from "react";
import { Artist } from "@/lib/artists";
import ContentfulImage from "@/lib/contentful-image";
import ForwardButton from "../buttons/forward";
import { useRouter } from "next/navigation";
import Carousel from "../carousel";
import { Artwork, fetchArtworksByArtist } from "@/lib/artworks";
import Link from "next/link";
import ExpandableText from "../ExpandableText";

interface TranslationsObject {
  aboutArtist: string;
  seeExhibitions: string;
  seeArtworks: string;
  artistExhibitions: string;
  readMore: string;
  readLess: string;
}

const Section: React.FC<{
  artist: Artist;
  translations: TranslationsObject;
  artistId: string;
}> = ({ artist, translations, artistId }) => {
  const router = useRouter();
  const [artistWithAllDetails, setDetails] = useState<Artist>(artist);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          fetch(`/api/artists/${artistId}`)
            .then((res) => {
              if (!res.ok) {
                throw new Error(`Failed to fetch details for ${artistId}`);
              }
              return res.json();
            })
            .then((data) => {
              setDetails({ ...artist, ...data });
            })
            .catch((error) =>
              console.error(`Error fetching details for ${artistId}:`, error)
            );

          fetchArtworksByArtist(artistId)
            .then((fetchedArtworks) => {
              setArtworks(fetchedArtworks);
            })
            .catch((error) =>
              console.error(`Error fetching artworks for ${artistId}:`, error)
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
  }, [artistId]);

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
              src={artistWithAllDetails?.picture?.url || ""}
              alt={
                artistWithAllDetails?.picture?.alt ||
                `${artistWithAllDetails?.name || "Artist"}'s picture`
              }
              width={500}
              height={500}
            />
          </div>
          <h3 className="text-gray-900 pt-10 md:pt-0">
            {artistWithAllDetails?.name}
          </h3>
          <ExpandableText
            text={artistWithAllDetails?.bio || ""}
            readMoreLabel={translations.readMore}
            readLessLabel={translations.readLess}
          />
        </div>
        <div className="hidden md:block w-full md:w-1/3 ">
          <ContentfulImage
            src={artistWithAllDetails?.picture?.url || ""}
            alt={
              artistWithAllDetails?.picture?.alt ||
              `${artistWithAllDetails?.name || "Artist"}'s picture`
            }
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="flex flex-row gap-10">
        {artistWithAllDetails.artworks?.length > 0 && <Link href={`/artists/${artistWithAllDetails.id}`}>
          <ForwardButton>{translations.seeArtworks}</ForwardButton>
        </Link>}
      </div>
      {artistWithAllDetails.exhibitions?.length > 0 ? (
        <div className="hidden md:flex">
          <Carousel
            images={artistWithAllDetails?.exhibitions
              .filter((exhibition) => exhibition.title && exhibition.picture?.url)
              .map((exhibition) => ({
                url: exhibition.picture?.url,
                title: exhibition.title,
                startDate: exhibition.startDate,
                endDate: exhibition.endDate,
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
