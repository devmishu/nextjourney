"use client";

import React from "react";
import { Skeleton } from "@heroui/react";
import { TripCard, type TripData } from "./TripCard";
import { MdOutlineTravelExplore } from "react-icons/md";

/* ── Skeleton Cards ─────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="card-primary overflow-hidden flex flex-col">
      {/* Image skeleton */}
      <div className="w-full aspect-[4/3] overflow-hidden">
        <Skeleton className="w-full h-full rounded-none" />
      </div>
      {/* Body skeleton */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <Skeleton className="h-5 w-4/5 rounded-lg" />
        <Skeleton className="h-3 w-full rounded-lg" />
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <hr className="border-zinc-100 dark:border-zinc-800" />
        <div className="flex flex-col gap-2.5">
          <Skeleton className="h-4 w-2/3 rounded-lg" />
          <Skeleton className="h-4 w-1/2 rounded-lg" />
          <Skeleton className="h-4 w-3/5 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/* ── Empty State ─────────────────────────────────────────────────── */
function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 gap-5 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
        }}
      >
        <MdOutlineTravelExplore
          className="text-4xl"
          style={{ color: "var(--primary)" }}
        />
      </div>
      <div>
        <p className="text-primary font-bold text-lg mb-1">No trips found</p>
        <p className="text-secondary text-sm">
          Try adjusting your filters or search query.
        </p>
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────── */
interface TripsGridProps {
  trips: TripData[];
  isLoading?: boolean;
  itemsPerPage?: number;
}

export function TripsGrid({
  trips,
  isLoading = false,
  itemsPerPage = 8,
}: TripsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: itemsPerPage }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="grid grid-cols-1">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {trips.map((trip) => (
        <TripCard key={trip._id} trip={trip} />
      ))}
    </div>
  );
}
