import FAQSection from "@/components/home/FAQSection";
import FeaturedTrips from "@/components/home/FeaturedTrips";
import HeroBanner from "@/components/home/HeroBanner";
import { HowItWorks } from "@/components/home/HowItWorks";
import Newsletter from "@/components/home/Newsletter";
import { PopularCategories } from "@/components/home/PopularCategories";
import TripsInsights from "@/components/home/TripsInsights";
import WhyTrustUs from "@/components/home/WhyTrustUs";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-200">
      <HeroBanner />
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <PopularCategories />
        <HowItWorks />
        <FeaturedTrips />
        <WhyTrustUs />
        <TripsInsights />
        <FAQSection />
        <Newsletter />
      </main>
    </div>
  );
}
