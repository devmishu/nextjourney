"use client";

import { Skeleton } from "@heroui/react";

export default function Loading() {
  // কয়টি রো (row) দেখাবে তার একটি অ্যারে
  const rows = [1, 2, 3, 4, 5];

  return (
    <div className="app-container py-10">
      {/* Title Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-8 w-32 rounded-lg mb-2" />
        <Skeleton className="h-4 w-64 rounded-lg" />
      </div>

      {/* Table Container Skeleton */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 pb-4 border-b border-zinc-800 mb-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-4 w-20 rounded-lg" />
          ))}
        </div>

        {/* Table Rows */}
        {rows.map((row) => (
          <div key={row} className="grid grid-cols-6 gap-4 items-center mb-6">
            <Skeleton className="h-4 w-8 rounded-lg" /> 
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-xl" /> 
              <Skeleton className="h-4 w-32 rounded-lg" /> 
            </div>
            <Skeleton className="h-4 w-24 rounded-lg" /> 
            <Skeleton className="h-4 w-20 rounded-lg" /> 
            <Skeleton className="h-4 w-16 rounded-lg" /> 
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16 rounded-lg" /> 
              <Skeleton className="h-8 w-16 rounded-lg" /> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
