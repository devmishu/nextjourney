
import React from "react";
import { FiSearch, FiCalendar, FiCheckCircle } from "react-icons/fi";

/* ── Types ─────────────────────────────────────────────────────── */
interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const STEPS: StepProps[] = [
  {
    icon: <FiSearch />,
    title: "Find Your Destination",
    description:
      "Browse through our curated list of destinations and filter by your travel style.",
  },
  {
    icon: <FiCalendar />,
    title: "Book Your Trip",
    description:
      "Choose your dates and secure your journey with our seamless booking system.",
  },
  {
    icon: <FiCheckCircle />,
    title: "Enjoy Your Adventure",
    description:
      "Pack your bags and get ready for an unforgettable travel experience.",
  },
];

/* ── Component ─────────────────────────────────────────────────── */
export function HowItWorks() {
  return (
    <section className="py-20 ">
      <div className="app-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">How It Works</h2>
          <p className="text-secondary max-w-lg mx-auto">
            Planning your next adventure is simpler than ever. Follow these
            three easy steps.
          </p> 
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, index) => (
            <div
              key={index}
              className="card-primary p-8 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl text-zinc-900 dark:text-zinc-100">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-primary">{step.title}</h3>
              <p className="text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
