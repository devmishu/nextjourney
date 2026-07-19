"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FiMapPin, FiX } from "react-icons/fi";
import { SearchBar } from "./_components/SearchBar";
import { FilterSidebar, type FilterState } from "./_components/FilterSidebar";
import { TripsGrid } from "./_components/TripsGrid";
import { getTrips } from "@/lib/apis/trips";
import type { TripData } from "./_components/TripCard";

/* -- Constants -- */
const ITEMS_PER_PAGE = 6;

const SORT_OPTIONS = [
  { value: "Newest", label: "Newest First" },
  { value: "Oldest", label: "Oldest First" },
  { value: "PriceLowToHigh", label: "Price: Low → High" },
  { value: "PriceHighToLow", label: "Price: High → Low" },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]["value"];

const DEFAULT_FILTERS: FilterState = {
  location: "All Locations",
  categories: [],
  travelStyles: [],
  destinationSearch: "",
};

/* -- Pagination Helper -- */
function getPaginationRange(currentPage: number, totalPages: number) {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
}

/* -- Helpers -- */
function buildQueryString(
  search: string,
  filters: FilterState,
  sortBy: SortOption,
  page: number,
): string {
  const params = new URLSearchParams();
  const effectiveSearch = [search, filters.destinationSearch]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (effectiveSearch) params.set("search", effectiveSearch);
  if (filters.categories && filters.categories.length > 0)
    params.set("category", filters.categories.join(","));
  if (filters.location && filters.location !== "All Locations")
    params.set("location", filters.location);
  if (filters.travelStyles && filters.travelStyles.length > 0)
    params.set("travelStyle", filters.travelStyles.join(","));

  params.set("sortBy", sortBy);
  params.set("page", String(page));
  params.set("itemsPerPage", String(ITEMS_PER_PAGE));

  return params.toString();
}

function computeCounts(trips: TripData[]) {
  const categories: Record<string, number> = {};
  const travelStyles: Record<string, number> = {};
  trips.forEach((t) => {
    if (t.category) categories[t.category] = (categories[t.category] ?? 0) + 1;
    if (t.travelStyle)
      travelStyles[t.travelStyle] = (travelStyles[t.travelStyle] ?? 0) + 1;
  });
  return { categories, travelStyles };
}

export interface TripsClientShellProps {
  initialTrips: TripData[];
  initialTotal: number;
}

export function TripsClientShell({
  initialTrips,
  initialTotal,
}: TripsClientShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [trips, setTrips] = useState<TripData[]>(initialTrips);
  const [total, setTotal] = useState(initialTotal);
  const [search, setSearch] = useState<string>(
    searchParams.get("search") ?? "",
  );
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get("sortBy") as SortOption) ?? "Newest",
  );
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") ?? "1", 10),
  );
  const [filters, setFilters] = useState<FilterState>(() => {
    const location = searchParams.get("location") ?? "All Locations";
    const categoryParam = searchParams.get("category");
    const travelStyleParam = searchParams.get("travelStyle");
    return {
      location,
      categories: categoryParam ? categoryParam.split(",") : [],
      travelStyles: travelStyleParam ? travelStyleParam.split(",") : [],
      destinationSearch: "",
    };
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  const counts = computeCounts(trips);

  const updateQueryParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") params.delete(key);
        else params.set(key, value);
      });
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
    setSortBy((searchParams.get("sortBy") as SortOption) ?? "Newest");
    setPage(parseInt(searchParams.get("page") ?? "1", 10));
    setFilters(() => ({
      location: searchParams.get("location") ?? "All Locations",
      categories: searchParams.get("category")?.split(",") ?? [],
      travelStyles: searchParams.get("travelStyle")?.split(",") ?? [],
      destinationSearch: searchParams.get("destinationSearch") ?? "",
    }));
  }, [searchParams]);

  const fetchData = useCallback(
    (
      currentSearch: string,
      currentFilters: FilterState,
      currentSort: SortOption,
      currentPage: number,
    ) => {
      const qs = buildQueryString(
        currentSearch,
        currentFilters,
        currentSort,
        currentPage,
      );
      startTransition(async () => {
        try {
          const data = await getTrips(qs);
          setTrips(data.result);
          setTotal(data.total);
        } catch (err) {
          console.error("Failed to fetch trips:", err);
        }
      });
    },
    [],
  );

  useEffect(() => {
    fetchData(search, filters, sortBy, page);
  }, [search, filters, sortBy, page, fetchData]);

  const handleSearch = useCallback(
    (value: string) => updateQueryParams({ search: value, page: "1" }),
    [updateQueryParams],
  );

  const handleFilterChange = useCallback(
    (newFilters: FilterState) => {
      updateQueryParams({
        location:
          newFilters.location !== "All Locations" ? newFilters.location : null,
        category:
          newFilters.categories.length > 0
            ? newFilters.categories.join(",")
            : null,
        travelStyle:
          newFilters.travelStyles.length > 0
            ? newFilters.travelStyles.join(",")
            : null,
        destinationSearch: newFilters.destinationSearch || null,
        page: "1",
      });
      setFilters(newFilters);
    },
    [updateQueryParams],
  );

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newSort = e.target.value as SortOption;
      updateQueryParams({ sortBy: newSort, page: "1" });
      setSortBy(newSort);
    },
    [updateQueryParams],
  );

  const handleReset = useCallback(() => {
    updateQueryParams({
      location: null,
      category: null,
      travelStyle: null,
      destinationSearch: null,
      sortBy: "Newest",
      page: "1",
    });
    setFilters(DEFAULT_FILTERS);
    setSearch("");
    setSortBy("Newest");
    setPage(1);
  }, [updateQueryParams]);

  const handlePageChange = useCallback(
    (p: number) => {
      updateQueryParams({ page: String(p) });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateQueryParams],
  );

  return (
    <div className="main-bg flex-1 pb-16">
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 shadow-xs">
        <div className="app-container py-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 shrink-0">
              <FiMapPin
                className="text-sm shrink-0"
                style={{ color: "var(--primary)" }}
              />
              <span className="text-primary font-semibold text-sm tabular-nums">
                {total.toLocaleString()}
              </span>
              <span className="text-secondary text-sm">
                {total === 1 ? "Trip" : "Trips"} Found
              </span>
            </div>
            <SearchBar value={search} onChange={handleSearch} />
            <div className="flex items-center gap-2 shrink-0">
              <label htmlFor="trips-sort" className="text-secondary text-xs">
                Sort by:
              </label>
              <select
                id="trips-sort"
                value={sortBy}
                onChange={handleSortChange}
                className="input-primary h-10 text-xs pr-8 appearance-none cursor-pointer min-w-[150px]"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <>
          <div
            className="mobile-drawer-overlay"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white dark:bg-zinc-900 overflow-y-auto shadow-2xl transition-transform">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-primary font-bold">Filters</span>
              <button onClick={() => setIsSidebarOpen(false)}>
                <FiX />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleReset}
                categoryCounts={counts.categories}
                travelStyleCounts={counts.travelStyles}
              />
            </div>
          </div>
        </>
      )}

      <div className="app-container mt-6">
        <div className="flex gap-6 items-start">
          <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-20">
            <FilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleReset}
              categoryCounts={counts.categories}
              travelStyleCounts={counts.travelStyles}
            />
          </aside>
          <main className="flex-1 min-w-0 flex flex-col gap-6">
            <TripsGrid
              trips={trips}
              isLoading={isPending}
              itemsPerPage={ITEMS_PER_PAGE}
            />

            {/* Pagination UI */}
            {totalPages > 1 && (
              <div className="flex justify-center pt-6 px-4">
                <div className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-900/50 p-1.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/50 shadow-xs flex-wrap justify-center">
                  {/* Prev Button */}
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                    className="px-3 h-9 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Prev
                  </button>

                  {/* Page Numbers */}
                  {getPaginationRange(page, totalPages).map((p, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        typeof p === "number" && handlePageChange(p)
                      }
                      disabled={p === "..."}
                      className={`w-9 h-9 text-xs font-semibold rounded-lg transition-all ${
                        p === page
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm"
                          : p === "..."
                            ? "cursor-default text-zinc-400 dark:text-zinc-600"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                    className="px-3 h-9 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
