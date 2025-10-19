"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Exhibition } from "@/lib/exhibitions";
import ContentfulImage from "@/lib/contentful-image";
import { useLocale } from "next-intl";
import Link from "next/link";
import { ExpandMoreIcon } from "../icons/expand-more";
import Carousel from "../carousel";
import MobileGallery from "../MobileGallery";
import { getBaseUrl } from "@/src/utils/common";

interface TranslationsObject {
  readMore: string;
  readLess: string;
  aboutArtworks?: string;
  aboutArtist?: string;
  aboutArtists?: string;
  exhibitionArtworks?: string;
}

interface SectionProps {
  exhibition: Exhibition;
  translations: TranslationsObject;
  exhibitionId?: string;
  isImageRight?: boolean;
  showGallery?: boolean;
  showCarousel?: boolean;
}

const MAX_NO_CHARACTERS_DESCRIPTION = 300;

const mapLocale = (l?: string) => (l === "pt" ? "pt-PT" : l === "en" ? "en-GB" : "en");

const Section: React.FC<SectionProps> = ({
  exhibition,
  translations,
  exhibitionId,
  isImageRight = false,
  showGallery = false,
  showCarousel = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [exhibitionDetails, setExhibitionDetails] = useState<Exhibition>(exhibition);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const rawLocale = useLocale();
  const fmtLocale = mapLocale(rawLocale);
  const dateFmt = useMemo(
    () => new Intl.DateTimeFormat(fmtLocale, { day: "2-digit", month: "long", year: "numeric" }),
    [fmtLocale]
  );

  useEffect(() => {
    if (!exhibitionId) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          const baseUrl = getBaseUrl();
          fetch(`${baseUrl}/api/exhibitions/${exhibitionId}`)
            .then((res) => res.json())
            .then((data) => setExhibitionDetails({ ...exhibition, ...data }))
            .catch((err) => console.error("Error fetching details:", err));
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [exhibitionId, exhibition]);

  const handleToggleDescription = () => setIsExpanded((prev) => !prev);

  const getCroppedText = (text: string, maxLength: number) => {
    if ((text ?? "").length <= maxLength) return text ?? "";
    const cropped = (text ?? "").slice(0, maxLength);
    const lastPeriodIndex = cropped.lastIndexOf(".");
    return lastPeriodIndex !== -1 ? cropped.slice(0, lastPeriodIndex + 1) : cropped + "...";
  };

  const formatDate = (date?: string) => dateFmt.format(new Date(date ?? Date.now()));

  return (
    <div ref={sectionRef} id={exhibition.id} className="flex flex-col space-y-8">
      {showGallery && (
        <div className="block pt-10 md:hidden">
          <MobileGallery
            images={(exhibitionDetails.artworks ?? [])
              .map((a) => a?.images?.[0])
              .filter(Boolean) as any[]}
          />
        </div>
      )}

      <div className={`flex flex-row justify-between ${isImageRight ? "" : "flex-row-reverse"}`}>
        {exhibitionDetails.picture?.url && (
          <div className="hidden md:block md:w-2/5">
            <ContentfulImage
              src={exhibitionDetails.picture.url}
              alt={exhibitionDetails.title}
              width={600}
              height={600}
              className="object-cover rounded"
            />
          </div>
        )}

        <div className="flex flex-col space-y-4 w-full md:w-1/2">
          <h3 className="text-gray-900">{exhibitionDetails.title}</h3>

          <p className="text-gray-600">
            {(isExpanded
              ? exhibitionDetails.description
              : getCroppedText(exhibitionDetails.description ?? "", MAX_NO_CHARACTERS_DESCRIPTION)
            )
              .split("\n")
              .map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
          </p>

          {(exhibitionDetails.description?.length ?? 0) > MAX_NO_CHARACTERS_DESCRIPTION && (
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
            {(exhibitionDetails.artists?.length ?? 0) > 0 && (
              <>
                <p className="text-gray-800 font-medium !my-3">
                  {(exhibitionDetails.artists ?? []).map((artist, index) => (
                    <span key={index}>
                      <Link href={`/artists/${artist.id}`} className="hover:font-bold transition-all">
                        {artist.name}
                      </Link>
                      {index < (exhibitionDetails.artists?.length ?? 0) - 1 && ", "}
                    </span>
                  ))}
                </p>
                <div className="border-t border-gray-300 !m-0" />
              </>
            )}

            <p className="text-gray-500 !my-3">
              {`${formatDate(exhibitionDetails.startDate)} - ${formatDate(exhibitionDetails.endDate)}`}
            </p>

            <div className="border-t border-gray-300 !mb-10 !mt-0" />
          </div>
        </div>
      </div>

      {showCarousel && (
        <div className="hidden md:flex">
          <Carousel
            images={
              (exhibitionDetails.artworks ?? [])
                .filter((a) => a?.name && a?.images?.[0]?.url)
                .map((a) => ({
                  url: a!.images![0]!.url!,
                  title: a!.name!,
                  height: a!.height,
                  width: a!.width,
                }))
            }
            visibleCount={3}
            title={translations.exhibitionArtworks || ""}
          />
        </div>
      )}
    </div>
  );
};

export default Section;
