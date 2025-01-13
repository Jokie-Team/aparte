"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ImageData {
  url: string;
  description?: string;
  title?: string;
}

interface MobileGalleryProps {
  images: ImageData[];
  className?: string;
}

const MobileGallery: React.FC<MobileGalleryProps> = ({
  images,
  className = "",
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images.length) return null;

  return (
    <div className={`flex flex-row gap-4 w-full ${className}`}>
      <div className="flex flex-col gap-2 w-16">
        {images.map((image, index) => (
          <div
            key={`thumb-${index}`}
            className="relative w-16 h-16 cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={image.url}
              alt={image.description || `Thumbnail ${index + 1}`}
              fill
              className="object-cover rounded-sm"
              sizes="64px"
            />
          </div>
        ))}
      </div>
      <div className="relative flex-1 aspect-square">
        <Image
          src={images[selectedIndex].url}
          alt={
            images[selectedIndex].description || `Image ${selectedIndex + 1}`
          }
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={selectedIndex === 0}
        />
      </div>
    </div>
  );
};

export default MobileGallery;
