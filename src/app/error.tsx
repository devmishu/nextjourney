"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 px-4 transition-colors duration-200">
      <div className="text-center max-w-md space-y-6">
        {/* Error Status Indicator */}
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60">
          <svg
            className="w-8 h-8 text-zinc-900 dark:text-zinc-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Something went wrong!
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            An unexpected error occurred while processing your request. Please
            try refreshing or returning home.
          </p>
        </div>

        {/* Action Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          {/* Try Again / Reload Button */}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-6 h-11 inline-flex items-center justify-center text-sm font-semibold rounded-xl text-white bg-zinc-900 hover:bg-zinc-800 dark:text-zinc-950 dark:bg-zinc-100 dark:hover:bg-zinc-200 shadow-sm cursor-pointer transition-all"
          >
            Try Again
          </button>

          {/* Go Home Link */}
          <Link
            href="/"
            className="w-full sm:w-auto px-6 h-11 inline-flex items-center justify-center text-sm font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
          >
            Go back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
