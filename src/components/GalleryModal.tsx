import React from "react";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export interface Artwork {
    imageUrl: string;
    title: string;
    available: boolean;
    width: number;
    height: number;
}

interface GalleryModalProps {
    artworks: Artwork[];
    currentIndex: number;
    onClose: () => void;
    onNavigate: (newIndex: number) => void;
    t: (key: string) => string;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
    artworks,
    currentIndex,
    onClose,
    onNavigate,
    t,
}) => {
    const artwork = artworks[currentIndex];

    if (!artwork) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-8 text-gray-600 hover:text-black"
                aria-label="Close"
            >
                <XMarkIcon className="w-7 h-7" />
            </button>

            {/* Left Arrow */}
            {currentIndex > 0 && (
                <button
                    onClick={() => onNavigate(currentIndex - 1)}
                    className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                    aria-label="Previous"
                >
                    <ChevronLeftIcon className="w-8 h-8" />
                </button>
            )}

            {/* Right Arrow */}
            {currentIndex < artworks.length - 1 && (
                <button
                    onClick={() => onNavigate(currentIndex + 1)}
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                    aria-label="Next"
                >
                    <ChevronRightIcon className="w-8 h-8" />
                </button>
            )}

            {/* Main Content */}
            <div className="flex w-full max-w-5xl mx-auto">
                {/* Image */}
                <div className="flex-1 flex items-center justify-center">
                    <img
                        src={artwork.imageUrl}
                        alt={artwork.title || "Sem título"}
                        className="max-h-[80vh] max-w-full object-contain"
                    />

                </div>
                {/* Details */}
                <div className="flex-1 flex flex-col justify-center pl-12">
                    <h2 className="text-2xl font-light mb-4">{artwork.title || "Sem título"}</h2>
                    {artwork.width && artwork.height && (
                        <h3 className="text-xl font-light">{artwork.width} × {artwork.height}</h3>
                    )}
                    <div className="text-sm text-gray-700 mt-4">
                        {!artwork.available && (
                            <span className="flex w-fit items-center gap-2 text-sm font-medium bg-white rounded px-3 py-1 shadow-md">
                                <span className="w-2 h-2 rounded-full bg-red" />
                                {t("section.unavailable")}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryModal;
