"use client";

import { useAuth } from "@/hooks/use-auth";
import { NotificationMenu } from "./notification-menu";
import { AuthAwareProfileSection } from "./auth-aware-profile";
import MobileMenu from "./mobile-menu";

import Logo from "./logo";
import SiteNav from "./nav";

export function MainHeader() {
  const { isAuthenticated } = useAuth();
  return (
    <header className="sticky md:top-4 top-0 z-50 md:mx-6 md:mt-4 md:rounded-2xl border-b border-white/10 bg-background/80 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Logo />
        {/* Navigation Categories */}
        <SiteNav />

        <div className="flex gap-2">
          <div className=" items-center flex gap-4">
            {isAuthenticated && <NotificationMenu />}
            <AuthAwareProfileSection />
          </div>
          <div className="md:hidden block">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
