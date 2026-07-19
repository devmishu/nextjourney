import AboutHero from "@/components/AboutHero";
import FAQSection from "@/components/home/FAQSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import Newsletter from "@/components/home/Newsletter";
import WhyTrustUs from "@/components/home/WhyTrustUs";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-200">
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <AboutHero />
        <HowItWorks />
        <WhyTrustUs />
        <FAQSection />
        <Newsletter />
      </main>
    </div>
  );
}
