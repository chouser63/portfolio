import { Github } from "lucide-react";
import { Slideshow } from "./slideshow";

type GalleryItem = {
  title: {
    text: string;
    link?: string;
    github?: string;
  } | string;
  description: string;
  image_urls?: string[];
};

type Gallery = {
  title: string;
  items: GalleryItem[];
};

function StaggeredGallery({ gallery }: { gallery: Gallery }) {
  return (
    <div className="mx-auto h-full w-full sm:space-y-12 sm:pb-8 text-center">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          {gallery.title}
        </h1>
      </div>

      <ul className="space-y-20 p-4">
        {gallery.items.map((galleryItem, index) => {
          const isEven = index % 2 === 0;
          return (
            <li key={`row-${index}`}>
              <div className={`flex flex-col ${galleryItem.image_urls ? 'items-center justify-center' : 'items-start justify-start'} md:gap-8 md:px-8 lg:flex-row`}>
                <div
                  className={`order-1 ${isEven ? "lg:order-1" : "lg:order-2"} mb-4 space-y-2 text-left lg:mb-0 ${galleryItem.image_urls ? 'lg:w-1/2' : 'lg:w-full'}`}
                >
                  <h1 className="text-2xl font-bold sm:text-3xl">
                    <div className="flex flex-row items-center justify-start">
                      {typeof galleryItem.title === 'string' ? (
                        galleryItem.title
                      ) : (
                        galleryItem.title.link ? (
                          <a href={galleryItem.title.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline decoration-blue-400 underline-offset-4 hover:text-blue-800 hover:decoration-blue-800 transition-colors">
                            {galleryItem.title.text}
                          </a>
                        ) : galleryItem.title.text
                      )}

                      {typeof galleryItem.title !== 'string' && galleryItem.title.github && (
                        <a href={galleryItem.title.github} target="_blank" rel="noopener noreferrer">
                          <Github className="ml-6 inline h-12 w-12 hover:text-gray-600 dark:hover:text-gray-300 transition-colors hover:scale-105" />
                        </a>
                      )}


                    </div>
                  </h1>
                  <p className="text-xl leading-relaxed text-slate-700 dark:text-white">
                    {galleryItem.description}
                  </p>
                </div>


                {galleryItem.image_urls ? (
                  <div
                    className={`w-full order-2 ${isEven ? "lg:order-2" : "lg:order-1"} lg:w-1/2`}
                  >
                    <div className="mx-auto w-full aspect-square md:max-w-[85%] lg:max-w-[500px]">
                      <Slideshow images={galleryItem.image_urls || []} />
                    </div>
                  </div>
                ) : (
                  <></>
                )}



              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { StaggeredGallery };
