import { TripCard } from "@/app/(main)/trips/_components/TripCard";
import { getFeaturedTrips } from "@/lib/apis/trips";

export default async function FeaturedTrips() {
  const trips = await getFeaturedTrips();

  return (
    <section className="py-16 ">
      <div className="app-container">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
            Featured Trips
          </h2>
          <p className="text-secondary text-sm md:text-base max-w-lg mx-auto">
            Handpicked destinations just for you. Explore the world's most
            amazing places.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip._id} trip={trip} />
          ))}
        </div>
      </div>
    </section>
  );
}
