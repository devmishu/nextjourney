"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { TfiFolder } from "react-icons/tfi";
import { FiPlus } from "react-icons/fi";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

export function EmptyState({
  title,
  description,
  buttonText,
  buttonHref,
}: EmptyStateProps) {
  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-neutral-800 shadow-xs max-w-2xl mx-auto my-6 transition-colors duration-200">
      {/* ─── Premium Minimal Icon Wrapper ─── */}
      <div className="w-16 h-16 rounded-2xl bg-neutral-50 dark:bg-zinc-800/50 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-center text-neutral-400 dark:text-zinc-500 mb-6 shrink-0">
        <TfiFolder className="w-7 h-7 stroke-[1.5]" />
      </div>

      {/* ─── Content Text ─── */}
      <div className="space-y-2 max-w-md">
        <h3 className="text-xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
          {title}
        </h3>
        <p className="text-sm font-medium leading-relaxed opacity-60">
          {description}
        </p>
      </div>

      {/* ─── Optional Action Button ─── */}
      {buttonText && buttonHref && (
        <div className="mt-6 pt-2">
          <Link
            href={buttonHref}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-all duration-200 shadow-md cursor-pointer rounded-full"
          >
            <FiPlus className="text-sm stroke-[3]" />
            {buttonText}
          </Link>
        </div>
      )}
    </div>
  );
}
