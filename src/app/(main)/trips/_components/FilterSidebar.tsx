"use client";

import React, { useState } from "react";
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
  /** Category→count map from the results */
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
        className="flex w-full items-center justify-between py-3 text-sm font-semibold text-primary cursor-pointer hover:opacity-75 transition-opacity"
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
    <label className="flex items-center justify-between gap-2 cursor-pointer group select-none py-0.5">
      <div className="flex items-center gap-2.5">
        {/* Custom checkbox */}
        <div
          role="checkbox"
          aria-checked={checked}
          tabIndex={0}
          onClick={onToggle}
          onKeyDown={(e) => e.key === " " && onToggle()}
          className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-150 shrink-0 ${
            checked
              ? "border-[var(--primary)] bg-[var(--primary)]"
              : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 group-hover:border-[var(--primary)]"
          }`}
        >
          {checked && (
            <svg
              viewBox="0 0 10 8"
              fill="none"
              className="w-2.5 h-2 text-white"
            >
              <path
                d="M1 4l3 3 5-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span
          className={`text-xs font-medium transition-colors ${
            checked
              ? "text-zinc-900 dark:text-zinc-50"
              : "text-secondary group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
          }`}
        >
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span
          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md tabular-nums transition-colors ${
            checked
              ? "text-white"
              : "text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800"
          }`}
          style={
            checked
              ? { backgroundColor: "var(--primary)" }
              : {}
          }
        >
          {count}
        </span>
      )}
    </label>
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
    <aside className="filter-sidebar flex flex-col gap-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <FiFilter
            className="text-sm"
            style={{ color: "var(--primary)" }}
          />
          <span className="text-primary text-sm font-bold">Filters</span>
          {hasActiveFilters && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
              style={{ backgroundColor: "var(--primary)" }}
            >
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
            onClick={onReset}
            className="text-xs font-semibold cursor-pointer transition-opacity hover:opacity-75"
            style={{ color: "var(--primary)" }}
          >
            Reset All
          </button>
        )}
      </div>

      {/* Destination Search */}
      <div className="mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <p className="text-primary text-xs font-semibold mb-2 uppercase tracking-wider">
          Search Destination
        </p>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs pointer-events-none" />
          <input
            type="text"
            value={filters.destinationSearch}
            onChange={(e) =>
              onChange({ ...filters, destinationSearch: e.target.value })
            }
            placeholder="e.g. Bali, Paris..."
            className="input-primary w-full pl-8 pr-7 h-9 text-xs"
          />
          {filters.destinationSearch && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, destinationSearch: "" })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              <FiX className="text-xs" />
            </button>
          )}
        </div>
      </div>

      {/* Location Select */}
      <AccordionSection title="Location" defaultOpen={true}>
        <div className="flex flex-col gap-1">
          {LOCATIONS.map((loc) => (
            <label
              key={loc}
              className="flex items-center gap-2.5 cursor-pointer group py-0.5 select-none"
            >
              <input
                type="radio"
                name="trip-location"
                value={loc}
                checked={filters.location === loc || (loc === "All Locations" && !filters.location)}
                onChange={() => onChange({ ...filters, location: loc })}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  filters.location === loc ||
                  (loc === "All Locations" && !filters.location)
                    ? "border-[var(--primary)]"
                    : "border-zinc-300 dark:border-zinc-600 group-hover:border-[var(--primary)]"
                }`}
              >
                {(filters.location === loc ||
                  (loc === "All Locations" && !filters.location)) && (
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--primary)" }}
                  />
                )}
              </div>
              <span
                className={`text-xs font-medium truncate ${
                  filters.location === loc ||
                  (loc === "All Locations" && !filters.location)
                    ? "text-zinc-900 dark:text-zinc-50 font-semibold"
                    : "text-secondary group-hover:text-zinc-700"
                }`}
              >
                {loc}
              </span>
            </label>
          ))}
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
