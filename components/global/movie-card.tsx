"use client";

import { Star } from "lucide-react";
import { Button } from "../ui/button";
import MovieCategoryBadge from "./movie-category-badge";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    cover_image: string;
    rating: number;
    progress?: number;
    description?: string;
    category?: string;
    contentType?: "movie" | "series";
  };
}

export function MovieCard({ movie }: MovieCardProps) {
  const {
    id,
    title,
    cover_image,
    rating,
    progress = 0,
    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    category = "Comedy",
    contentType = "movie",
  } = movie;

  const router = useRouter();

  const handleWatchClick = () => {
    if (contentType === "series") {
      router.push(`/series/${id}`);
    } else {
      router.push(`/movie/${id}`);
    }
  };
  return (
    <div className="group/moviecard cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl mb-3 bg-secondary  aspect-2/3 shadow-lg group-hover/moviecard:shadow-2xl transition-all duration-300">
        <MovieCategoryBadge
          category={category}
          className="absolute top-3 left-3"
        />
        {/* Image */}
        <Image
          src={cover_image}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover group-hover/moviecard:scale-110 transition-transform duration-500 ease-out"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover/moviecard:opacity-100 transition-opacity duration-300" />

        {/* Rating badge - always visible */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow-lg">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold text-white">{rating}</span>
        </div>

        {/* Progress bar - always visible at bottom */}
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 backdrop-blur-sm">
            <div
              className="h-full bg-linear-to-r from-purple-500 via-orange-500 to-pink-500 transition-all duration-300 relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        )}

        {/* Hover content - always visible on mobile, hover on desktop */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-0 opacity-100 md:translate-y-2 md:opacity-0 md:group-hover/moviecard:translate-y-0 md:group-hover/moviecard:opacity-100 transition-all duration-300">
          <h3 className="text-base font-bold text-white mb-2 line-clamp-2 drop-shadow-lg">
            {title}
          </h3>
          <p className="text-sm text-white/80 line-clamp-3 mb-4 drop-shadow-lg">
            {description}
          </p>
          <Button
            size={"xl"}
            onClick={(e) => {
              e.stopPropagation();
              handleWatchClick();
            }}
            className="w-full bg-purple-600 text-white hover:bg-purple-700 font-semibold py-2 px-4 rounded-lg text-sm transition-colors duration-200 backdrop-blur-sm"
          >
            {progress > 0 ? "Continue Watching" : "Watch Now"}
          </Button>
        </div>
      </div>

      {/* Title below card - hidden on mobile, visible on desktop when not hovering */}
      <div className="hidden md:block md:group-hover/moviecard:opacity-0 transition-opacity duration-200">
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-tight">
          {title}
        </h3>
      </div>
    </div>
  );
}
