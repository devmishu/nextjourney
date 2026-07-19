"use client";

import React from "react";
import Link from "next/link";
import {
  FiHome,
  FiChevronRight,
  FiBriefcase,
  FiGlobe,
  FiStar,
  FiHeart,
} from "react-icons/fi";

export default function AboutHero() {
  return (
    
    <section className=" transition-colors duration-300">
      <div className="app-container py-12 md:py-16">
        
        <nav className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-8">
          <Link
            href="/"
            className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors flex items-center"
          >
            <FiHome className="text-sm" />
          </Link>
          <FiChevronRight className="text-zinc-300 dark:text-zinc-700" />
          <span className="text-primary font-semibold">About Us</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100/40 dark:border-emerald-900/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Get to know us
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary leading-[1.1]">
              Redefining How You Explore the World
            </h1>

            <p className="text-sm font-medium leading-relaxed text-secondary max-w-xl">
              We're passionate about travel and believe that every journey has
              the power to transform lives. Our mission is to help you discover
              amazing places, plan unforgettable trips, and create memories that
              last a lifetime.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
              {[
                {
                  icon: <FiBriefcase />,
                  val: "10K+",
                  label: "Happy Travelers",
                },
                { icon: <FiGlobe />, val: "100+", label: "Destinations" },
                { icon: <FiStar />, val: "99%", label: "Satisfaction" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="text-[#028A65] dark:text-emerald-400">
                    {stat.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-black text-primary tracking-tight">
                      {stat.val}
                    </h4>
                    <p className="text-[10px] uppercase font-bold text-secondary">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-6 relative w-full h-[400px] rounded-[2rem] overflow-hidden border border-zinc-100 dark:border-zinc-800">
            <img
              src="./images/about-banner.jpg"
              alt="Travel"
              className="w-full h-full object-cover"
            />

            {/* Floating Info */}
            <div className="absolute bottom-6 left-6 p-4 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-white/50 dark:border-zinc-800 shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#028A65] flex items-center justify-center text-white">
                <FiHeart className="fill-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary">Let's journey</p>
                <p className="text-[10px] text-[#028A65] font-bold">
                  together!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
