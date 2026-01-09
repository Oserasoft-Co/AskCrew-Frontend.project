"use client";

import { MovieCard } from "@/components/global/movie-card";
import Link from "next/link";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

interface ApiMovie {
  id: number;
  title: string;
  image: string;
  rating: number;
  isWatching?: boolean;
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
  image: string;
  rating: number;
  isWatching?: boolean;
  progress?: number;
}

const getMoviesAndSeries = async (): Promise<Movie[]> => {
  const response = await axiosInstance.get("/content/movies_with_series/");
  const apiData: ApiMovie[] = response.data;

  // Transform the data to match the expected format
  return apiData.map((item) => ({
    ...item,
    category: item.category?.name,
  }));
};

export function SeriesAndMovies() {
  const {
    data: movies,
    isLoading,
    error,
  } = useQuery<Movie[]>({
    queryKey: ["movies-with-series"],
    queryFn: getMoviesAndSeries,
  });

  if (isLoading) {
    return (
      <section className="px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Series And Movies
          </h2>
          <Link
            href="/in-trend"
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
            Series And Movies
          </h2>
          <Link
            href="/in-trend"
            className="text-orange-500 font-semibold hover:underline"
          >
            See More
          </Link>
        </div>
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-red-500">Error loading movies and series</p>
        </div>
      </section>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <section className="px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Series And Movies
          </h2>
          <Link
            href="/in-trend"
            className="text-orange-500 font-semibold hover:underline"
          >
            See More
          </Link>
        </div>
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-muted-foreground">No movies or series available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-foreground">
          Series And Movies
        </h2>
        <Link
          href="/in-trend"
          className="text-orange-500 font-semibold hover:underline"
        >
          See More
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 min-[1800px]:grid-cols-5! gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
