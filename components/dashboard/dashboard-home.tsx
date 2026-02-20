"use client";

import { DashboardProfileHeader } from "./dashboard-profile-header";
import { DashboardStats } from "./dashboard-stats";
import { DashboardActions } from "./dashboard-actions";
import { DashboardHorizontalSection } from "./dashboard-horizontal-section";
import { MovieCard } from "@/components/global/movie-card";
import { WorkshopDashboardCard } from "./workshop-dashboard-card";
import { TalentDashboardCard } from "./talent-dashboard-card";

interface DashboardHomeProps {
  user: {
    name: string;
    image: string;
    role: string;
    rating: number;
    reviewCount: number;
    isAvailable: boolean;
    isVerified: boolean;
  };
}

export function DashboardHome({ user }: DashboardHomeProps) {
  // Mock data for carousels (should be replaced with API calls eventually)
  const movies = [
    {
      id: 1,
      name: "The Conjuring",
      cover_image:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80",
      rating_mean: 4.5,
      category: "Horror",
    },
    {
      id: 2,
      name: "Siko",
      cover_image:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&q=80",
      rating_mean: 4.2,
      category: "Comedy",
    },
    {
      id: 3,
      name: "Beşam",
      cover_image:
        "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&q=80",
      rating_mean: 4.8,
      category: "Drama",
    },
  ];

  const workshops = [
    {
      id: 1,
      title: "Acting Workshop",
      date: "12 Oct",
      provider: "Mohamed Sobhy",
      image:
        "https://images.unsplash.com/photo-1503091900741-998e53558c74?w=500&q=80",
    },
    {
      id: 2,
      title: "Singing Workshop",
      date: "30 Oct",
      provider: "Mohamed Monir",
      image:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500&q=80",
    },
  ];

  const talents = [
    {
      id: 1,
      name: "Ali Mohamed",
      role: "Actor",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      role: "Actress",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
    {
      id: 3,
      name: "Omar Zeyad",
      role: "Director",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    },
  ];

  return (
    <div className="space-y-8 max-w-(--breakpoint-2xl) mx-auto">
      <DashboardProfileHeader {...user} />

      <DashboardStats />

      <DashboardActions />

      <DashboardHorizontalSection title="For Rent">
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[160px] max-w-[160px]">
            <MovieCard
              movie={movie as Parameters<typeof MovieCard>[0]["movie"]}
            />
          </div>
        ))}
      </DashboardHorizontalSection>

      <DashboardHorizontalSection title="New Workshops">
        {workshops.map((workshop) => (
          <WorkshopDashboardCard key={workshop.id} {...workshop} />
        ))}
      </DashboardHorizontalSection>

      <DashboardHorizontalSection title="Find Talent">
        {talents.map((talent) => (
          <TalentDashboardCard key={talent.id} {...talent} />
        ))}
      </DashboardHorizontalSection>

      <DashboardHorizontalSection title="Find Student">
        {talents.map((talent) => (
          <TalentDashboardCard key={talent.id} {...talent} />
        ))}
      </DashboardHorizontalSection>
    </div>
  );
}
