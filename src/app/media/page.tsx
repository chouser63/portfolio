import PhotoGallery from "@/components/ui/photo-gallery"
import { Photo } from "@/components/ui/photo-gallery";

export default function Media() {

    let photos: Photo[] = [
    { src: "/images/gallery1.JPG", description: "Libertyville, IL" },
    { src: "/images/gallery2.JPG", description: "Libertyville, IL" },
    { src: "/images/gallery3.JPG", description: "Taken in Badlands National Park on a road trip my brother and I took from Illinois to Seattle." },
    { src: "/images/gallery4.JPG", description: "My brother Cole standing at the edge of a cliff in Badlands." },
    { src: "/images/gallery5.JPG", description: "Cannon Mountain, Franciona, NH" },
    { src: "/images/gallery6.JPG", description: "Us?" },
    { src: "/images/gallery7.JPG", description: "Mission Hill, Boston" },
    { src: "/images/gallery8.JPG", description: "Mission Hill, Boston" },
    { src: "/images/gallery9.JPG", description: "Mission Hill, Boston + Blue the dog" },
    { src: "/images/gallery10.JPG", description: "Cannon Mountain, Franciona, NH" }
];

    photos.sort(() => Math.random() - 0.5);

    return (
        <div>
            <PhotoGallery photos={photos} />
        </div>
    )



}