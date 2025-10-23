"use client";
import React, { useState } from "react";
import { Arrow } from "./icons/arrow";
import Tag from "./tags/tag";
import { ImageLoader } from "./loader";

interface ItemProps {
  url: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  depth?: number;
  technique?: string;
  startDate?: string;
  endDate?: string;
}

interface CarouselProps {
  images: ItemProps[];
  visibleCount: number;
  title?: string;
  type?: "artwork" | "exhibition";
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  visibleCount,
  title = "",
  type = "artwork",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedIndexes, setLoadedIndexes] = useState<number[]>([]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - visibleCount ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <div className="relative w-full">
      {title !== "" && images.length > 0 && (
        < div className="py-6" >
          <Tag size="extrasmall" text={title} />
        </div >
      )}

      {
        currentIndex > 0 && (
          <button onClick={handlePrev} className="absolute left-0 z-10">
            <Arrow size={28} direction="left" />
          </button>
        )
      }

      {
        currentIndex < images.length - visibleCount && (
          <button onClick={handleNext} className="absolute right-6 z-10">
            <Arrow size={28} direction="right" />
          </button>
        )
      }

      <div className={`overflow-hidden w-full ${images.length > visibleCount ? "mt-16" : ""}`}>
        <div
          className="grid gap-8"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
          }}
        >
          {images.slice(currentIndex, currentIndex + visibleCount).map((image, index) => {
            const realIndex = currentIndex + index;
            const isLoaded = loadedIndexes.includes(realIndex);

            return (
              <div
                key={realIndex}
                className="relative group flex items-center justify-center"
              >
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white">
                    <ImageLoader />
                  </div>
                )}
                <img
                  src={image.url}
                  alt={image.title || "Sem título"}
                  className={`object-contain w-full h-auto transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  onLoad={() =>
                    setLoadedIndexes((prev) =>
                      prev.includes(realIndex) ? prev : [...prev, realIndex]
                    )
                  }
                />
                {type === "exhibition" ? (
                  <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-0 transition-all duration-300 flex items-center justify-center">
                    <div className="px-4 text-center text-white opacity-100 group-hover:opacity-0 transition-all duration-300">
                      <p className="text-[16px]">{image.title || "Sem título"}</p>
                      <p className="text-[12px] italic mt-1">
                        {new Date(image.startDate || "").toLocaleDateString()} -{" "}
                        {new Date(image.endDate || "").toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                    <div className="px-4 text-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <>
                        <p className="text-[16px]">{image.title || "Sem título"}</p>
                        <p className="text-[12px] italic mt-1">{image.technique || ""}</p>
                        {(image.width || image.height || image.depth) && (
                          <p className="text-[12px] italic mt-1">
                            {image?.width || "-"} × {image?.height || "-"} {image?.depth ? `× ${image?.depth}` : ""}
                          </p>
                        )}
                      </>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div >
  );
};

export default Carousel;
