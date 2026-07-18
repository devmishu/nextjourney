"use client";

import Link from "next/link";
import {
  FiHome,
  FiChevronRight,
  FiBriefcase,
  FiGlobe,
  FiStar,
  FiHeart,
} from "react-icons/fi";

export default function AboutHero() {
  return (
    <section className="w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* ─── Breadcrumb Navigation ─── */}
        <nav className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-8 select-none">
          <Link
            href="/"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
          >
            <FiHome className="text-sm" />
          </Link>
          <FiChevronRight className="text-zinc-300 dark:text-zinc-700" />
          <span className="text-zinc-900 dark:text-zinc-300 font-semibold">
            About Us
          </span>
        </nav>

        {/* ─── Main Content Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* ─── Left Column: Text & Stats (6 Cols) ─── */}
          <div className="lg:col-span-6 space-y-6">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100/40 dark:border-emerald-900/30">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              Get to know us
            </div>

            {/* Main Title & Paragraph */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.15]">
                About NextJourney
              </h1>
              <p className="text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-xl">
                We're passionate about travel and believe that every journey has
                the power to transform lives. Our mission is to help you
                discover amazing places, plan unforgettable trips, and create
                memories that last a lifetime.
              </p>
            </div>

            {/* Stats Grid Wrapper */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-900">
              {/* Stat 1 */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <FiBriefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-black text-zinc-950 dark:text-zinc-50 tracking-tight tabular-nums">
                    10K+
                  </h4>
                  <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                    Happy Travelers
                  </p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <FiGlobe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-black text-zinc-950 dark:text-zinc-50 tracking-tight tabular-nums">
                    500+
                  </h4>
                  <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                    Destinations
                  </p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <FiStar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-black text-zinc-950 dark:text-zinc-50 tracking-tight tabular-nums">
                    99%
                  </h4>
                  <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                    Satisfaction Rate
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Right Column: Visual Image Container (6 Cols) ─── */}
          <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[380px] md:h-[440px] rounded-[2rem] overflow-hidden group border border-zinc-100 dark:border-zinc-900 shadow-sm">
            {/* Premium Unsplash Image */}
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop"
              alt="Traveler looking at beautiful lake and mountains"
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover object-center transform scale-101 select-none transition-transform duration-700 group-hover:scale-103"
            />

            {/* Floating Info Tag (Bottom Left) */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto max-w-xs p-3 rounded-2xl bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border border-white/40 dark:border-zinc-800/40 shadow-xl flex items-center gap-3 select-none animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0">
                <FiHeart className="w-4 h-4 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-zinc-950 dark:text-zinc-50 leading-tight">
                  Let's journey the world
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  together!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
