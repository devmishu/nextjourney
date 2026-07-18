import { Skeleton } from "@heroui/react";

export default function GlobalLoading() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-200">
      {/* ── Global Header/Navbar Skeleton ── */}
      <header className="w-full border-b border-zinc-100 dark:border-zinc-900 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Skeleton className="w-28 h-7 rounded-lg" />

          {/* Nav Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-6">
            <Skeleton className="w-16 h-4 rounded-md" />
            <Skeleton className="w-16 h-4 rounded-md" />
            <Skeleton className="w-16 h-4 rounded-md" />
          </div>

          {/* Right Action Button / Profile */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-24 h-9 rounded-xl hidden sm:block" />
          </div>
        </div>
      </header>

      {/* ── Main Content Container ── */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        {/* Banner / Hero Section Placeholder */}
        <div className="space-y-4">
          <Skeleton className="w-1/3 h-4 rounded-md" />
          <Skeleton className="w-2/3 sm:w-1/2 h-10 sm:h-12 rounded-xl" />
          <Skeleton className="w-full sm:w-3/4 h-5 rounded-lg" />
        </div>

        {/* ── Dynamic Grid Layout (Fits Cards, Trips, or Tools) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-900/10 space-y-4"
            >
              {/* Card Image Placeholder */}
              <Skeleton className="w-full aspect-video rounded-xl" />

              {/* Card Details */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Skeleton className="w-1/4 h-4 rounded-md" />
                  <Skeleton className="w-1/5 h-4 rounded-md" />
                </div>
                <Skeleton className="w-11/12 h-6 rounded-lg" />
                <Skeleton className="w-full h-4 rounded-md" />
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-900">
                <Skeleton className="w-20 h-5 rounded-md" />
                <Skeleton className="w-16 h-8 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
