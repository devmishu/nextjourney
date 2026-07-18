// src/components/HeroBanner.tsx
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function HeroBanner() {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-zinc-100 dark:bg-zinc-950 overflow-hidden transition-colors duration-200 shadow-xs">
      {/* ── Background Image Layer ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-102 select-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop')",
        }}
        aria-hidden="true"
      />

      {/* ── Visual Overlays for Readability (Light/Dark Mode) ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent dark:from-zinc-950/95 dark:via-zinc-950/75 dark:to-transparent transition-colors duration-200" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/10 dark:from-zinc-950/20 dark:via-transparent dark:to-zinc-950/10" />

      {/* ── Content Container (Aligned with global grid but fluid) ── */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-12 w-full py-16 z-10">
        <div className="max-w-xl md:max-w-2xl space-y-6">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight leading-[1.1] uppercase">
            Explore The World <br />
            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold normal-case">
              Your Next Journey
            </span>{" "}
            <br />
            Starts Here
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed max-w-md md:max-w-lg">
            Discover amazing places, unforgettable experiences and create
            memories that last a lifetime.
          </p>

          {/* Action Button */}
          <div className="pt-4">
            <Link
              href="/trips"
              className="px-6 h-12 inline-flex items-center justify-center gap-2.5 text-sm font-bold rounded-xl text-white bg-zinc-950 hover:bg-zinc-800 dark:text-zinc-950 dark:bg-zinc-50 dark:hover:bg-zinc-200 shadow-md group transition-all duration-200 cursor-pointer"
            >
              <span>Explore Trips</span>
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
