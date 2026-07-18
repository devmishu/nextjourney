"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 px-4 transition-colors duration-200">
      <div className="text-center max-w-md space-y-6">
        {/* Large 404 Status */}
        <h1 className="text-8xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter animate-pulse">
          404
        </h1>

        {/* Text Content */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Page Not Found
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Button using global classes */}
        <div className="pt-4">
          <Link
            href="/"
            className="px-6 h-11 inline-flex items-center justify-center text-sm font-semibold rounded-xl text-white bg-zinc-900 hover:bg-zinc-800 dark:text-zinc-950 dark:bg-zinc-100 dark:hover:bg-zinc-200 shadow-sm transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
