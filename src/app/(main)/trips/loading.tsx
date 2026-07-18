import { Skeleton } from "@heroui/react";

export default function TripsLoading() {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="main-bg flex-1 pb-16">
      {/* 1. Hero Section Skeleton Mockup */}
      <div className="bg-emerald-950/20 dark:bg-emerald-950/40 py-16 animate-pulse">
        <div className="app-container max-w-4xl space-y-4">
          <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-700 rounded-md" />
          <div className="h-12 w-48 bg-zinc-300 dark:bg-zinc-700 rounded-xl" />
          <div className="h-5 w-full bg-zinc-300 dark:bg-zinc-700 rounded-md max-w-xl" />
          <div className="flex gap-2 pt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-8 w-20 bg-zinc-300 dark:bg-zinc-700 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Top Utility Bar Skeleton */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 shadow-xs py-3 animate-pulse">
        <div className="app-container flex items-center gap-4">
          <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          <div className="h-10 flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          <div className="h-10 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        </div>
      </div>

      {/* Main Layout Grid Skeleton */}
      <div className="app-container mt-6">
        <div className="flex gap-6 items-start">
          {/* 2. Sidebar Filter Skeleton */}
          <aside className="hidden lg:block w-64 xl:w-72 shrink-0 bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 space-y-6">
            <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
            <div className="space-y-3">
              <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-xl" />
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                </div>
              ))}
            </div>
          </aside>

          {/* 3. Right Side Cards Grid Skeleton */}
          <main className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {skeletonCards.map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-xs flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] w-full">
                  <Skeleton className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 z-10">
                    <Skeleton className="h-6 w-20 rounded-lg" />
                  </div>
                  <div className="absolute bottom-3 right-3 z-10">
                    <Skeleton className="h-7 w-16 rounded-xl" />
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex flex-col flex-1 gap-3.5">
                  <Skeleton className="h-6 w-3/4 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-3.5 w-full rounded-md" />
                    <Skeleton className="h-3.5 w-5/6 rounded-md" />
                  </div>
                  <div className="h-px bg-zinc-100 dark:bg-zinc-800 w-full my-1" />
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4 rounded-full shrink-0" />
                        <Skeleton className="h-3.5 w-1/2 rounded-md" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
