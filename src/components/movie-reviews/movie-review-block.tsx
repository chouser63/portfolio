import Image from "next/image";

export type MovieReview = {
  id: number | string;
  name: string;
  description: string;
  image_url?: string;
  rank: number;
};

export default function MovieReviewCard({ review }: { review: MovieReview }) {
  return (
    <article
      role="article"
      className="flex items-stretch bg-white dark:bg-slate-800 shadow-sm rounded-lg overflow-hidden"
    >
      {/* Rank column */}
      <div className="flex items-center justify-center w-16 bg-sky-300 text-white font-semibold text-3xl">
        {review.rank}
      </div>

      {/* Content */}
      <div className="flex flex-1 gap-4 p-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white truncate">
            {review.name}
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
            {review.description}
          </p>
        </div>

        {/* Optional image - hidden on very small screens */}
        {review.image_url && (
          <div className="w-28 h-20 relative flex-shrink-0 hidden sm:block">
            <Image
              src={review.image_url}
              alt={review.name}
              fill
              sizes="112px"
              className="object-cover rounded-md"
              priority={false}
            />
          </div>
        )}
      </div>
    </article>
  );
}