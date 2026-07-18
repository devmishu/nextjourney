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
    <section className="w-full bg-transparent text-current transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* ─── Breadcrumb Navigation ─── */}
        <nav className="flex items-center gap-2 text-xs font-medium opacity-60 mb-8 select-none">
          <Link
            href="/"
            className="hover:opacity-100 transition-opacity flex items-center gap-1"
          >
            <FiHome className="text-sm" />
          </Link>
          <FiChevronRight className="opacity-40" />
          <span className="opacity-100 font-semibold">About Us</span>
        </nav>

        {/* ─── Main Content Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* ─── Left Column: Text & Stats (6 Cols) ─── */}
          <div className="lg:col-span-6 space-y-6">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              Get to know us
            </div>

            {/* Main Title & Paragraph */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.15]">
                About NextJourney
              </h1>
              <p className="text-sm font-medium leading-relaxed opacity-70 max-w-xl">
                We're passionate about travel and believe that every journey has
                the power to transform lives. Our mission is to help you
                discover amazing places, plan unforgettable trips, and create
                memories that last a lifetime.
              </p>
            </div>

            {/* Stats Wrapper (Flexbox structure to maintain layout horizontally) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              {/* Stat 1 */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-emerald-500 shrink-0">
                  <FiBriefcase className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight text-neutral-900 dark:text-neutral-50 tabular-nums">
                    10K+
                  </span>
                  <span className="text-[11px] font-medium opacity-60 whitespace-nowrap">
                    Happy Travelers
                  </span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-emerald-500 shrink-0">
                  <FiGlobe className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight text-neutral-900 dark:text-neutral-50 tabular-nums">
                    500+
                  </span>
                  <span className="text-[11px] font-medium opacity-60 whitespace-nowrap">
                    Destinations
                  </span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-emerald-500 shrink-0">
                  <FiStar className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight text-neutral-900 dark:text-neutral-50 tabular-nums">
                    99%
                  </span>
                  <span className="text-[11px] font-medium opacity-60 whitespace-nowrap">
                    Satisfaction Rate
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Right Column: Visual Image Container (6 Cols) ─── */}
          <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[380px] md:h-[440px] rounded-[2.5rem] overflow-hidden group border border-neutral-200 dark:border-neutral-800 shadow-sm">
            {/* Native img tag matching exact requirement */}
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop"
              alt="Traveler looking at beautiful lake and mountains"
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover object-center transform scale-101 select-none transition-transform duration-700 group-hover:scale-103"
            />

            {/* Floating Info Tag (Bottom Left) */}
            <div className="absolute bottom-6 left-6 max-w-[240px] p-3 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-white/20 dark:border-neutral-800/40 shadow-xl flex items-center gap-3 select-none">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0">
                <FiHeart className="w-4 h-4 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-neutral-900 dark:text-neutral-50 leading-tight">
                  Let's journey the world
                </span>
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
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
