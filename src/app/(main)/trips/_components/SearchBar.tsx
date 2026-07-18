"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search trips, destinations...",
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Keep local state in sync if parent resets */
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setLocalValue(v);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange(v);
      }, 400);
    },
    [onChange],
  );

  const handleClear = useCallback(() => {
    setLocalValue("");
    onChange("");
  }, [onChange]);

  return (
    <div className=" relative flex-1 min-w-0">
      {/* Search icon prefix */}
      <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none text-base" />

      <input
        id="trips-search-input"
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search trips"
        className="input-primary w-full pl-10 pr-9 h-10 text-sm"
      />

      {/* Clear button */}
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
        >
          <FiX className="text-sm" />
        </button>
      )}
    </div>
  );
}
