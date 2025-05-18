"use client";
import { PictureProps } from "@/lib/types";
import React, { useState } from "react";
import { Arrow } from "./icons/arrow";
import ImagePreview from "./ImagePreview";

interface CarouselProps {
  images: Array<PictureProps>;
  visibleCount: number;
}

const Carousel: React.FC<CarouselProps> = ({ images, visibleCount }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewImage, setPreviewImage] = useState<PictureProps | null>(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - visibleCount ? prevIndex + 1 : prevIndex
    );
  };

  const openPreview = (image: PictureProps) => {
    setPreviewImage(image);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <div className="relative w-full mt-10">
      {previewImage && (
        <ImagePreview
          image={previewImage}
          onClose={closePreview}
          isOpen={Boolean(previewImage)}
        />
      )}

      {currentIndex > 0 && (
        <button onClick={handlePrev} className="absolute left-0 top-0">
          <Arrow size={28} direction="left" />
        </button>
      )}

      {currentIndex < images.length - visibleCount && (
        <button onClick={handleNext} className="absolute right-6 top-0">
          <Arrow size={28} direction="right" />
        </button>
      )}

      <div className="overflow-hidden w-full mt-16">
        <div
          className="grid grid-cols-3 gap-8"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
          }}
        >
          {images.slice(currentIndex, currentIndex + visibleCount).map((image, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div
                className="inline-flex items-center justify-center cursor-pointer relative"
                onClick={() => openPreview(image)}
              >
                <img
                  src={image.url}
                  alt={image.title || "Obra sem título"}
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                  <div className="px-4 text-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-[16px]">{image.title || "Sem título"}</p>
                    {image.width && image.height && (
                      <p className="text-[12px] italic mt-1">{image.width} × {image.height}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
