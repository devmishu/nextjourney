"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiMapPin,
  FiCalendar,
  FiClock,
  FiHeart,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";
import { MdOutlineTravelExplore } from "react-icons/md";

export interface TripData {
  _id: string;
  userId: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  date: string;
  duration: string;
  travelStyle: string;
  imageUrl: string;
  category: string;
  location: string;
}

/** Maps category → a distinct pill colour using CSS variables / semantic tokens */
const CATEGORY_STYLES: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Beach: {
    bg: "color-mix(in srgb, #0ea5e9 18%, transparent)",
    text: "#0284c7",
    border: "color-mix(in srgb, #0ea5e9 30%, transparent)",
  },
  Mountain: {
    bg: "color-mix(in srgb, #8b5cf6 18%, transparent)",
    text: "#7c3aed",
    border: "color-mix(in srgb, #8b5cf6 30%, transparent)",
  },
  City: {
    bg: "color-mix(in srgb, #f59e0b 18%, transparent)",
    text: "#b45309",
    border: "color-mix(in srgb, #f59e0b 30%, transparent)",
  },
  Forest: {
    bg: "color-mix(in srgb, #22c55e 18%, transparent)",
    text: "#16a34a",
    border: "color-mix(in srgb, #22c55e 30%, transparent)",
  },
  Desert: {
    bg: "color-mix(in srgb, #f97316 18%, transparent)",
    text: "#ea580c",
    border: "color-mix(in srgb, #f97316 30%, transparent)",
  },
  Island: {
    bg: "color-mix(in srgb, #06b6d4 18%, transparent)",
    text: "#0891b2",
    border: "color-mix(in srgb, #06b6d4 30%, transparent)",
  },
  Historical: {
    bg: "color-mix(in srgb, #a78bfa 18%, transparent)",
    text: "#7c3aed",
    border: "color-mix(in srgb, #a78bfa 30%, transparent)",
  },
  Wildlife: {
    bg: "color-mix(in srgb, #84cc16 18%, transparent)",
    text: "#4d7c0f",
    border: "color-mix(in srgb, #84cc16 30%, transparent)",
  },
  Cruise: {
    bg: "color-mix(in srgb, #3b82f6 18%, transparent)",
    text: "#1d4ed8",
    border: "color-mix(in srgb, #3b82f6 30%, transparent)",
  },
  "Road Trip": {
    bg: "color-mix(in srgb, #ec4899 18%, transparent)",
    text: "#be185d",
    border: "color-mix(in srgb, #ec4899 30%, transparent)",
  },
};

const DEFAULT_CATEGORY_STYLE = {
  bg: "color-mix(in srgb, var(--primary) 15%, transparent)",
  text: "var(--primary)",
  border: "color-mix(in srgb, var(--primary) 25%, transparent)",
};

function getCategoryStyle(category: string) {
  return CATEGORY_STYLES[category] ?? DEFAULT_CATEGORY_STYLE;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

interface TripCardProps {
  trip: TripData;
}

export function TripCard({ trip }: TripCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const style = getCategoryStyle(trip.category);

  return (
    <article className="card-primary group relative flex flex-col h-full overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/60 dark:hover:shadow-zinc-900/60">
      {/* ── Image Area ── */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
        {trip.imageUrl && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={trip.imageUrl}
            alt={trip.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <MdOutlineTravelExplore className="text-4xl text-zinc-300 dark:text-zinc-600" />
            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              No image
            </span>
          </div>
        )}

        {/* Gradient overlay for bottom readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Category badge — top-left */}
        {trip.category && (
          <span
            className="absolute top-3 left-3 badge-category text-[10px] shadow-sm font-bold backdrop-blur-sm"
            style={{
              backgroundColor: style.bg,
              color: style.text,
              border: `1px solid ${style.border}`,
            }}
          >
            {trip.category}
          </span>
        )}

        {/* Heart (wishlist) — top-right */}
        <button
          type="button"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted((prev) => !prev);
          }}
          className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-sm shadow transition-all duration-200 cursor-pointer active:scale-90 ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white/80 dark:bg-zinc-900/80 text-zinc-400 hover:text-red-500"
          }`}
        >
          <FiHeart
            className="text-sm"
            style={{ fill: isWishlisted ? "currentColor" : "none" }}
          />
        </button>

        {/* Price pill — bottom-right of image */}
        <div className="absolute bottom-3 right-3">
          <span
            className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-white/95 dark:bg-zinc-900/95 shadow-sm backdrop-blur-sm"
            style={{ color: "var(--primary)" }}
          >
            {trip.price === 0 ? "Free" : `$${trip.price.toLocaleString()}`}
          </span>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <h3 className="text-primary text-base font-bold leading-snug line-clamp-2 group-hover:opacity-80 transition-opacity">
          {trip.title}
        </h3>

        {/* Short description */}
        <p className="text-secondary text-xs leading-relaxed line-clamp-2 flex-1">
          {trip.shortDescription}
        </p>

        {/* Divider */}
        <hr className="border-zinc-100 dark:border-zinc-800" />

        {/* Metadata grid */}
        <ul className="flex flex-col gap-2">
          {/* Location */}
          <li className="flex items-center gap-2 min-w-0">
            <span
              className="flex items-center justify-center w-5 h-5 rounded-md shrink-0 text-[10px]"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--primary) 10%, transparent)",
                color: "var(--primary)",
              }}
            >
              <FiMapPin />
            </span>
            <span className="text-secondary text-xs truncate">
              {trip.location}
            </span>
          </li>

          {/* Date */}
          <li className="flex items-center gap-2 min-w-0">
            <span
              className="flex items-center justify-center w-5 h-5 rounded-md shrink-0 text-[10px]"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--primary) 10%, transparent)",
                color: "var(--primary)",
              }}
            >
              <FiCalendar />
            </span>
            <span className="text-secondary text-xs truncate">
              {formatDate(trip.date)}
            </span>
          </li>

          {/* Duration & Travel Style */}
          <li className="flex items-center gap-2 flex-wrap">
            <span
              className="flex items-center justify-center w-5 h-5 rounded-md shrink-0 text-[10px]"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--primary) 10%, transparent)",
                color: "var(--primary)",
              }}
            >
              <FiClock />
            </span>
            <span className="text-secondary text-xs">{trip.duration}</span>
            {trip.travelStyle && (
              <>
                <span className="text-zinc-300 dark:text-zinc-600 text-xs">
                  ·
                </span>
                <span
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "var(--primary)" }}
                >
                  <FiUsers className="text-[10px]" />
                  {trip.travelStyle}
                </span>
              </>
            )}
          </li>
        </ul>

        {/* ── View Details Button ── */}
        <div className="pt-2 mt-auto">
          <Link
            href={`/trips/${trip._id}`}
            className="button-primary w-full flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-xl transition-all duration-200 group/btn"
          >
            <span>View Details</span>
            <FiArrowRight className="text-sm transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
