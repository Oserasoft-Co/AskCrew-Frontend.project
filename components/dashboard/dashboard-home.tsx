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
    {
      id: 4,
      name: "Atlas",
      cover_image:
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&q=80",
      rating_mean: 4.0,
      category: "Action",
    },
    {
      id: 5,
      name: "Midnight",
      cover_image:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80",
      rating_mean: 4.6,
      category: "Thriller",
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
    {
      id: 3,
      title: "Dance Masterclass",
      date: "05 Nov",
      provider: "Fatma Nasser",
      image:
        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&q=80",
    },
    {
      id: 4,
      title: "Film Directing",
      date: "15 Nov",
      provider: "Ahmed Kamal",
      image:
        "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=500&q=80",
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
    {
      id: 4,
      name: "Nour Khalil",
      role: "Producer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    },
    {
      id: 5,
      name: "Youssef Ali",
      role: "Writer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    },
  ];

  return (
    <div className="space-y-8 lg:space-y-10 xl:space-y-12 max-w-[1800px] mx-auto">
      {/* Profile Header */}
      <DashboardProfileHeader {...user} />

      {/* Stats Grid */}
      <DashboardStats />

      {/* Quick Actions */}
      <DashboardActions />

      {/* Content Sections */}
      <div className="space-y-10 lg:space-y-12 xl:space-y-14">
        {/* For Rent */}
        <DashboardHorizontalSection title="For Rent">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[160px] max-w-[160px] lg:min-w-0 lg:max-w-none"
            >
              <MovieCard
                movie={movie as Parameters<typeof MovieCard>[0]["movie"]}
              />
            </div>
          ))}
        </DashboardHorizontalSection>

        {/* New Workshops */}
        <DashboardHorizontalSection title="New Workshops">
          {workshops.map((workshop) => (
            <WorkshopDashboardCard key={workshop.id} {...workshop} />
          ))}
        </DashboardHorizontalSection>

        {/* Find Talent */}
        <DashboardHorizontalSection title="Find Talent">
          {talents.map((talent) => (
            <TalentDashboardCard key={talent.id} {...talent} />
          ))}
        </DashboardHorizontalSection>

        {/* Find Student */}
        <DashboardHorizontalSection title="Find Student">
          {talents.map((talent) => (
            <TalentDashboardCard key={talent.id} {...talent} />
          ))}
        </DashboardHorizontalSection>
      </div>
    </div>
  );
}
