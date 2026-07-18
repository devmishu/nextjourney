"use client";

import React, { useState, useEffect } from "react";
import { FiFilter, FiChevronDown, FiSearch, FiX } from "react-icons/fi";

/* ── Static filter data ─────────────────────────────────────────── */
export const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Forest",
  "Desert",
  "Island",
  "Historical",
  "Wildlife",
  "Cruise",
  "Road Trip",
] as const;

export const TRAVEL_STYLES = [
  "Adventure",
  "Cultural",
  "Relaxation",
  "Backpacking",
  "Luxury",
  "Budget",
  "Family",
  "Solo",
  "Group",
  "Eco-Tourism",
] as const;

export const LOCATIONS = [
  "All Locations",
  "Bali, Indonesia",
  "Paris, France",
  "Machu Picchu, Peru",
  "Santorini, Greece",
  "Kyoto, Japan",
  "Safari, Kenya",
  "New York, USA",
  "Sydney, Australia",
  "Cairo, Egypt",
  "Patagonia, Argentina",
] as const;

/* ── Types ─────────────────────────────────────────────────────── */
export interface FilterState {
  location: string;
  categories: string[];
  travelStyles: string[];
  destinationSearch: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  categoryCounts?: Record<string, number>;
  travelStyleCounts?: Record<string, number>;
}

/* ── Accordion Section ─────────────────────────────────────────── */
function AccordionSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100 cursor-pointer hover:opacity-75 transition-opacity"
        aria-expanded={open}
      >
        <span>{title}</span>
        <FiChevronDown
          className={`text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {open && (
        <div className="pb-4 flex flex-col gap-2 animate-in fade-in slide-in-from-top-1 duration-150">
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Checkbox Item ─────────────────────────────────────────────── */
function CheckItem({
  label,
  count,
  checked,
  onToggle,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      className="flex items-center justify-between gap-2 cursor-pointer group select-none py-1 px-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
    >
      <div className="flex items-center gap-2.5 w-full">
        <input type="checkbox" checked={checked} readOnly className="sr-only" />
        <div
          className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-150 shrink-0 ${
            checked
              ? "border-zinc-900 bg-zinc-900 dark:border-zinc-100 dark:bg-zinc-100"
              : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 group-hover:border-zinc-400 dark:group-hover:border-zinc-500"
          }`}
        >
          {checked && (
            <svg
              viewBox="0 0 10 8"
              fill="none"
              className="w-2.5 h-2 text-white dark:text-zinc-950"
            >
              <path
                d="M1 4l3 3 5-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span
          className={`text-xs font-medium transition-colors ${
            checked
              ? "text-zinc-900 dark:text-zinc-50 font-semibold"
              : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200"
          }`}
        >
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span
          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md tabular-nums transition-colors ${
            checked
              ? "text-white bg-zinc-900 dark:text-zinc-950 dark:bg-zinc-100"
              : "text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800"
          }`}
        >
          {count}
        </span>
      )}
    </div>
  );
}

/* ── Main Sidebar ──────────────────────────────────────────────── */
export function FilterSidebar({
  filters,
  onChange,
  onReset,
  categoryCounts = {},
  travelStyleCounts = {},
}: FilterSidebarProps) {
  const [searchTerm, setSearchTerm] = useState(filters.destinationSearch);

  useEffect(() => {
    setSearchTerm(filters.destinationSearch);
  }, [filters.destinationSearch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== filters.destinationSearch) {
        onChange({ ...filters, destinationSearch: searchTerm });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onChange, filters]);

  const hasActiveFilters =
    filters.location !== "All Locations" ||
    filters.categories.length > 0 ||
    filters.travelStyles.length > 0 ||
    filters.destinationSearch.length > 0;

  function toggleCategory(cat: string) {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  }

  function toggleTravelStyle(style: string) {
    const next = filters.travelStyles.includes(style)
      ? filters.travelStyles.filter((s) => s !== style)
      : [...filters.travelStyles, style];
    onChange({ ...filters, travelStyles: next });
  }

  return (
    <aside className="filter-sidebar flex flex-col gap-0 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <FiFilter className="text-sm text-zinc-900 dark:text-zinc-100" />
          <span className="text-zinc-900 dark:text-zinc-100 text-sm font-bold">
            Filters
          </span>
          {hasActiveFilters && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white bg-zinc-900 dark:text-zinc-950 dark:bg-zinc-100">
              {filters.categories.length +
                filters.travelStyles.length +
                (filters.location !== "All Locations" ? 1 : 0) +
                (filters.destinationSearch ? 1 : 0)}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              onReset();
            }}
            className="text-xs font-semibold cursor-pointer transition-opacity hover:opacity-75 text-zinc-900 dark:text-zinc-100 underline underline-offset-4"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Destination Search */}
      <div className="mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <p className="text-zinc-900 dark:text-zinc-100 text-xs font-semibold mb-2 uppercase tracking-wider">
          Search Destination
        </p>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g. Bali, Paris..."
            className="w-full pl-8 pr-7 h-9 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                onChange({ ...filters, destinationSearch: "" });
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer"
            >
              <FiX className="text-xs" />
            </button>
          )}
        </div>
      </div>

      {/* Location Select */}
      <AccordionSection title="Location" defaultOpen={true}>
        <div className="flex flex-col gap-1">
          {LOCATIONS.map((loc) => {
            const isSelected =
              filters.location === loc ||
              (loc === "All Locations" && !filters.location);
            return (
              <div
                key={loc}
                onClick={() => onChange({ ...filters, location: loc })}
                className="flex items-center gap-2.5 cursor-pointer group py-1 px-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors select-none"
              >
                <input
                  type="radio"
                  name="trip-location"
                  checked={isSelected}
                  readOnly
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? "border-zinc-900 dark:border-zinc-100"
                      : "border-zinc-300 dark:border-zinc-600 group-hover:border-zinc-400 dark:group-hover:border-zinc-500"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                  )}
                </div>
                <span
                  className={`text-xs font-medium truncate ${
                    isSelected
                      ? "text-zinc-900 dark:text-zinc-50 font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200"
                  }`}
                >
                  {loc}
                </span>
              </div>
            );
          })}
        </div>
      </AccordionSection>

      {/* Category */}
      <AccordionSection title="Category" defaultOpen={true}>
        {CATEGORIES.map((cat) => (
          <CheckItem
            key={cat}
            label={cat}
            count={categoryCounts[cat]}
            checked={filters.categories.includes(cat)}
            onToggle={() => toggleCategory(cat)}
          />
        ))}
      </AccordionSection>

      {/* Travel Style */}
      <AccordionSection title="Travel Style" defaultOpen={false}>
        {TRAVEL_STYLES.map((style) => (
          <CheckItem
            key={style}
            label={style}
            count={travelStyleCounts[style]}
            checked={filters.travelStyles.includes(style)}
            onToggle={() => toggleTravelStyle(style)}
          />
        ))}
      </AccordionSection>
    </aside>
  );
}
