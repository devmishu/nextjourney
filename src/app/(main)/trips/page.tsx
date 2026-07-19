// Server component for the All Trips page – URL driven
import type { Metadata } from "next";
import { getTrips } from "@/lib/apis/trips";
import { TripsClientShell } from "./TripsClientShell";
import HeroSection from "./HeroSections";

/*  Metadata */
export const metadata: Metadata = {
  title: "All Trips — NextJourney",
  description:
    "Browse and discover all available trips on NextJourney. Filter by category, location, travel style, and price to find your perfect adventure.",
};

/*  Helper: Build query string from incoming URL params  */
function buildServerQuery(
  params: Record<string, string | string[] | undefined>,
) {
  const qs = new URLSearchParams();
  const search = typeof params.search === "string" ? params.search : "";
  const category = typeof params.category === "string" ? params.category : "";
  const location = typeof params.location === "string" ? params.location : "";
  const sortBy = typeof params.sortBy === "string" ? params.sortBy : "Newest";
  const page = typeof params.page === "string" ? params.page : "1";

  if (search) qs.set("search", search);
  if (category) qs.set("category", category);
  if (location) qs.set("location", location);

  qs.set("sortBy", sortBy);
  qs.set("page", page);
  qs.set("itemsPerPage", "8");
  return qs.toString();
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/* -- Page -- */
export default async function TripsPage({ searchParams }: PageProps) {
 
  const resolvedSearchParams = await searchParams;

  // Server‑side fetch using the incoming query parameters
  let initialTrips: Awaited<ReturnType<typeof getTrips>>["result"] = [];
  let initialTotal = 0;

  try {
   
    const queryString = buildServerQuery(resolvedSearchParams);
    const data = await getTrips(queryString);
    initialTrips = data.result;
    initialTotal = data.total;
  } catch (err) {
    console.error("Initial trips fetch failed:", err);
  }

  return (
    <>
      <HeroSection />
      <TripsClientShell 
        initialTrips={initialTrips}
        initialTotal={initialTotal}
      />
    </>
  );
}
