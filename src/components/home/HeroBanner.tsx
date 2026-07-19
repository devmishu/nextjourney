// src/components/HeroBanner.tsx
"use client"; // যেহেতু এটি ক্লায়েন্ট সাইড অ্যানিমেশন, তাই এই লাইনটি জরুরি
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion"; // ১. Framer Motion ইম্পোর্ট করুন

export default function HeroBanner() {
  // অ্যানিমেশন কনফিগারেশন
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center bg-zinc-100 dark:bg-zinc-950 overflow-hidden transition-colors duration-200">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop')",
        }}
        aria-hidden="true"
      />

      {/* Visual Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent dark:from-zinc-950/95 dark:via-zinc-950/75 dark:to-transparent" />

      {/* ── Content Container (অ্যানিমেশন যোগ করা হয়েছে) ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-12 w-full py-16 z-10"
      >
        <div className="max-w-xl md:max-w-2xl space-y-6">
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight leading-[1.1] uppercase"
          >
            Explore The World <br />
            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold normal-case">
              Your Next Journey
            </span>{" "}
            <br />
            Starts Here
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed max-w-md md:max-w-lg"
          >
            Discover amazing places, unforgettable experiences and create
            memories that last a lifetime.
          </motion.p>

          {/* Action Button */}
          <motion.div variants={itemVariants} className="pt-4">
            <Link
              href="/trips"
              className="px-6 h-12 inline-flex items-center justify-center gap-2.5 text-sm font-bold rounded-xl text-white bg-zinc-950 hover:bg-zinc-800 dark:text-zinc-950 dark:bg-zinc-50 dark:hover:bg-zinc-200 shadow-md group transition-all duration-200"
            >
              <span>Explore Trips</span>
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
