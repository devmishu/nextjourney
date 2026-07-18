import { deleteTrip } from "@/lib/actions/trips";
import { getMyTrips } from "@/lib/apis/trips";
import { getUser } from "@/lib/core/session";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import MyTripsTable from "../_components/MyTripsTable";
import { EmptyState } from "@/components/EmptyState";



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

export default async function MyTripsPage() {
  const user = await getUser();
  const myTrips: TripData[] = (await getMyTrips(user?.id)) || [];

  const handleDeletTrip = async (tripId: string) => {
    "use server";
    if (!tripId) return;
    await deleteTrip(tripId);
  };

  return (
    <section className="w-full bg-transparent py-12 min-h-[calc(100vh-80px)] flex flex-col justify-start text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium opacity-60 mb-6 select-none">
          <Link
            href="/dashboard"
            className="hover:opacity-100 transition-opacity"
          >
            Dashboard
          </Link>
          <FiChevronRight className="opacity-40" />
          <span className="opacity-100 font-semibold text-emerald-600 dark:text-emerald-400">
            My Trips
          </span>
        </nav>

        {/* Page Header */}
        <div className="text-left mb-8 space-y-1">
          <h1 className="text-3xl font-black text-neutral-900 dark:text-neutral-50 tracking-tight">
            My Trips
          </h1>
          <p className="text-sm font-medium opacity-60">
            Here are all the trips you have added.
          </p>
        </div>

        {/* Dynamic Render Condition */}
        {myTrips.length === 0 ? (
          <EmptyState
            title="No Listed Trips Yet"
            description="You haven't published any trips under your account. Add your first journey now!"
            buttonText="Create Your First Trip"
            buttonHref="/add-trip"
          />
        ) : (
          <MyTripsTable trips={myTrips} onHandleDeleteTrip={handleDeletTrip} />
        )}
      </div>
    </section>
  );
}
