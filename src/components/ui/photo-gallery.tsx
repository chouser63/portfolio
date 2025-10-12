
import Image from "next/image";

export type Photo = {
    src: string;
    description?: string;
};

export default function PhotoGallery({ photos }: { photos: Photo[] }) {

    let shuffledPhotos = photos.sort(() => Math.random() - 0.5);

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {photos.map((photo, index) => (
                <div key={index} className="w-full h-64 overflow-hidden rounded-lg relative group">
                    <img
                        src={photo.src}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {photo.description && (
                        <div className="absolute bottom-0 bg-slate-950 text-white w-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 p-1 pl-2">
                            {photo.description}
                        </div>
                    )}
                </div>
            ))}
        </div>

    )

}