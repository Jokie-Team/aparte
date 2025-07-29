"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Arrow } from "./icons/arrow";
import ImagePreview from "./ImagePreview";

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
  const [showPreview, setShowPreview] = useState(false);

  if (!images.length) return null;

  const goPrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goNext = () => {
    setSelectedIndex((prev) =>
      prev < images.length - 1 ? prev + 1 : prev
    );
  };

  const handleOpenPreview = () => setShowPreview(true);
  const handleClosePreview = () => setShowPreview(false);

  const currentImage = images[selectedIndex];

  return (
    <div className={`relative w-full max-w-full mx-auto ${className}`}>
      {showPreview && currentImage && (
        <ImagePreview
          image={{
            ...currentImage,
            title: currentImage.title || "Sem título",
          }}
          onClose={handleClosePreview}
          isOpen={showPreview}
        />
      )}

      {selectedIndex > 0 && (
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
        >
          <Arrow direction="left" size={24} />
        </button>
      )}

      <div className="w-full aspect-square relative cursor-pointer" onClick={handleOpenPreview}>
        <Image
          src={currentImage.url}
          alt={currentImage.description || "Imagem"}
          fill
          className="object-contain"
          sizes="100vw"
        />
      </div>

      {selectedIndex < images.length - 1 && (
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
        >
          <Arrow direction="right" size={24} />
        </button>
      )}
    </div>
  );
};

export default MobileGallery;
