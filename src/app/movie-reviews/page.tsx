import MovieReviewCard from "@/components/movie-reviews/movie-review-block";
import { supabase } from "@/lib/supabaseClient";

export default async function MovieReviews() {

// Fetch data
    const { data, error } = await supabase.from("MovieReviews").select().order("rank", { ascending: true });

    // Optional: handle error
    if (error) {
        console.error("Error fetching movie reviews:", error.message);
        return <div>Failed to load movie reviews.</div>;
    }

    // data can be null if no rows, so default to empty array
    const reviews = data ?? [];

    return (
        <div className="w-full h-full flex flex-col items-center justify-center pt-6 px-12">
            <div className="flex flex-col gap-4">
                {reviews.map((r) => (
                    <MovieReviewCard key={r.id} review={r} />
                ))}
            </div>
        </div>
    )
}