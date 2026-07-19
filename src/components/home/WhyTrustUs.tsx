"use client";

import React from "react";
import { FiShield, FiThumbsUp, FiClock, FiUsers } from "react-icons/fi";

interface TrustFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const trustFeatures: TrustFeature[] = [
  {
    icon: <FiShield className="w-6 h-6" />,
    title: "Secure Booking",
    description:
      "Your data and transactions are protected with industry-standard encryption.",
  },
  {
    icon: <FiThumbsUp className="w-6 h-6" />,
    title: "Verified Reviews",
    description:
      "Real experiences from real travelers to help you make informed decisions.",
  },
  {
    icon: <FiClock className="w-6 h-6" />,
    title: "24/7 Support",
    description:
      "Our dedicated team is always ready to assist you anytime, anywhere.",
  },
  {
    icon: <FiUsers className="w-6 h-6" />,
    title: "Expert Community",
    description:
      "Join thousands of explorers sharing tips and hidden gems worldwide.",
  },
];

export default function WhyTrustUs() {
  return (
    <section className=" py-16 md:py-24 transition-colors duration-300">
      <div className="app-container">
       
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-4 tracking-tight">
            Why Travelers & Attendees Trust NextJourney
          </h2>
          <p className="text-secondary font-medium">
            We prioritize transparency, safety, and community to ensure your
            travel experiences are nothing short of extraordinary.
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all hover:shadow-lg text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
