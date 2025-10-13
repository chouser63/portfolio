'use client'

import { Suspense, useState } from "react";
import Image from "next/image";
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

    //User clicks on image element --> display enlarged version 
    const handleImageClick = (src: string, alt: string) => {
        setEnlargedImage({
            src,
            alt,
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
                        <Suspense fallback={<Skeleton className="absolute inset-0 z-10 bg-emerald-300" />}>
                            <Image
                                src={photo.src}
                                alt={`Photo ${index + 1}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                                onClick={() => handleImageClick(photo.src, `Photo ${index + 1}`)}
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
                    <div className="relative max-w-[90%] max-h-[90vh]">
                        <Image
                            src={enlargedImage.src}
                            alt={enlargedImage.alt}
                            width={0}
                            height={0}
                            sizes="90vw"
                            className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>

    )

}