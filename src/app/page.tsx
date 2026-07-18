import FeaturedTrips from "@/components/home/FeaturedTrips";
import HeroBanner from "@/components/home/HeroBanner";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-200">
      <HeroBanner />
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <FeaturedTrips />
      </main>
    </div>
  );
}
