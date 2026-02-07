"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";

type Image = {
  id: string;
  title: string;
  url: string;
  description?: string;
};

type RandomGalleryProps = {
  images: Image[];
  count?: number;
};

const breakpointColumnsObj = {
  default: 4,
  700: 3,
};

export default function RandomGallery({ images }: RandomGalleryProps) {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto gap-4 h-full"
      columnClassName="space-y-4"
    >
      {images.map((img, index) => (
        <div key={img.id} className="relative w-full">
          <Image
            src={img.url}
            alt={img.title || "Artwork"}
            width={500}
            height={500}
            className="w-full h-auto object-contain"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
          />
        </div>
      ))}
    </Masonry>
  );
}
