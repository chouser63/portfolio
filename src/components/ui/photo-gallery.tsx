'use client'

import { Suspense, useState } from "react";
import { Skeleton } from "./skeleton";

export type Photo = {
    src: string;
    description?: string;
};

interface EnlargedImage {
    src: string;
    alt: string;
}

/**
 * PhotoGallery Component
 * see Documentation: ../../../docs/components/photo-gallery.md
 */
export default function PhotoGallery({ photos }: { photos: Photo[] }) {

    const [enlargedImage, setEnlargedImage] = useState<EnlargedImage | null>(null);

    //User clicks on HTML image element --> display enlarged version 
    const handleImageClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName !== "IMG") {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        setEnlargedImage({
            src: target.getAttribute("src") || "",
            alt: target.getAttribute("alt") || "",
        });
    };

    const handleCloseEnlarged = () => {
        setEnlargedImage(null);
    };


    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {photos.map((photo, index) => (
                    <div key={index} className="w-full h-64 overflow-hidden rounded-lg relative group">
                        <Suspense fallback={<Skeleton className="absolute inset-0 z-10" />}>
                            <img
                            src={photo.src}
                            alt={`Photo ${index + 1}`}
                            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300`}
                            onClick={handleImageClick}
                        />
                        {photo.description && (
                            <div className="absolute bottom-0 bg-slate-950 text-white w-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 p-1 pl-2"
                                key={`description-${index}`}>
                                {photo.description}
                            </div>
                        )}
                        </Suspense>
                        
                    </div>
                ))}
            </div>
            {enlargedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50"
                    onClick={handleCloseEnlarged}
                >
                    <img
                        src={enlargedImage?.src}
                        alt={enlargedImage?.alt}
                        className="max-w-[90%] max-h-[90vh] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>

    )

}