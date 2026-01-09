"use client";

import { MovieCard } from "@/components/global/movie-card";
import Link from "next/link";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

interface ApiContinueWatching {
  id: number;
  title: string;
  cover_image: string;
  rating: number;
  progress?: number;
  category?: {
    id: number;
    name: string;
    image: string;
  };
  description?: string;
}

interface Movie {
  id: number;
  title: string;
  cover_image: string;
  rating: number;
  progress?: number;
  category?: string;
  description?: string;
  isWatching?: boolean;
}

const getContinueWatching = async (): Promise<Movie[]> => {
  const response = await axiosInstance.get("/content/continue-watching/");
  const apiData: ApiContinueWatching[] = Array.isArray(response.data)
    ? response.data
    : response.data.results || [];

  // Transform and limit to 5 items
  return apiData.slice(0, 5).map((item) => ({
    ...item,
    category: item.category?.name,
    isWatching: true,
  }));
};

export function ContinueWatching() {
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery<Movie[]>({
    queryKey: ["continue-watching"],
    queryFn: getContinueWatching,
  });

  if (isLoading) {
    return (
      <section className="px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Continue Watching
          </h2>
          <Link
            href="/continue-watching"
            className="text-orange-500 font-semibold hover:underline"
          >
            See More
          </Link>
        </div>
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Continue Watching
          </h2>
          <Link
            href="/continue-watching"
            className="text-orange-500 font-semibold hover:underline"
          >
            See More
          </Link>
        </div>
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-red-500">Error loading continue watching</p>
        </div>
      </section>
    );
  }

  if (!movies || movies.length === 0) {
    return null; // Hide section if no items
  }
console.log("mo",movies);

  return (
    <section className="px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-foreground">
          Continue Watching
        </h2>
        <Link
          href="/continue-watching"
          className="text-orange-500 font-semibold hover:underline"
        >
          See More
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-[1800px]:grid-cols-5! gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
