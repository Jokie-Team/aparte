"use client";
import React, { useState } from "react";
import Image from "next/image";
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

  const handleOpenPreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  // Adaptar o formato da imagem para corresponder ao que o ImagePreview espera
  const currentImage = images[selectedIndex] ? {
    ...images[selectedIndex],
    // Garantir que todas as propriedades necessárias existam
    title: images[selectedIndex].title || "Sem título",
  } : null;

  return (
    <div
      className={`flex flex-row gap-4 w-full ${className} max-h-[400px] tablet:max-h-auto`}
    >
      {showPreview && currentImage && (
        <ImagePreview
          image={currentImage}
          onClose={handleClosePreview}
          isOpen={showPreview}
        />
      )}
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
      <div
        className="relative flex-1 aspect-square cursor-pointer"
        onClick={handleOpenPreview}
      >
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
