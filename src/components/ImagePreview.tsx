"use client";
import React, { useEffect, useRef } from "react";
import { PictureProps } from "@/lib/types";
import { createPortal } from "react-dom";

interface ImagePreviewProps {
    image: PictureProps;
    onClose: () => void;
    isOpen: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image, onClose, isOpen }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            // Prevent scrolling when modal is open
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    // Close when clicking outside the image
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && e.target === modalRef.current) {
            onClose();
        }
    };

    if (!isOpen) return null;

    // Use portal to render at the document body level to avoid z-index issues
    return createPortal(
        <div
            ref={modalRef}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={handleBackdropClick}
        >
            <div className="relative max-h-[90vh] max-w-[90vw] flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white text-[24px] focus:outline-none"
                    aria-label="Close preview"
                >
                    ×
                </button>

                <div className="bg-white p-2 rounded-md">
                    <img
                        src={image.url}
                        alt={image.title || "Imagem sem título"}
                        className="max-h-[80vh] max-w-[80vw] object-contain"
                    />
                </div>

                {(image.title || image.description) && (
                    <div className="text-white mt-4 text-center">
                        {image.title && <p className="text-[16px]">{image.title}</p>}
                        {image.description && <p className="text-[12px] mt-1 italic">{image.description}</p>}
                        {image.width && image.height && (
                            <p className="text-[12px] mt-1">{image.width} × {image.height}</p>
                        )}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default ImagePreview;
