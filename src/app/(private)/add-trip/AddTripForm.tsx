"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiImage,
  FiSend,
  FiCheckCircle,
  FiInfo,
  FiTag,
  FiAlignLeft,
  FiType,
} from "react-icons/fi";
import { FaCompass } from "react-icons/fa6";
import { MdOutlineTravelExplore } from "react-icons/md";
import toast from "react-hot-toast"; // ১. ইম্পোর্ট করা হয়েছে
import { redirect } from "next/navigation";

interface AddTripFormProps {
  userName: string;
  action: (formData: FormData) => Promise<void>;
}

interface PreviewState {
  title: string;
  shortDescription: string;
  price: string;
  date: string;
  duration: string;
  travelStyle: string;
  category: string;
  location: string;
  imageUrl: string;
}

const TRAVEL_STYLES = [
  "Adventure",
  "Cultural",
  "Relaxation",
  "Backpacking",
  "Luxury",
  "Budget",
  "Family",
  "Solo",
  "Group",
  "Eco-Tourism",
];

const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Forest",
  "Desert",
  "Island",
  "Historical",
  "Wildlife",
  "Cruise",
  "Road Trip",
];

export function AddTripForm({ userName, action }: AddTripFormProps) {
  const [preview, setPreview] = useState<PreviewState>({
    title: "",
    shortDescription: "",
    price: "",
    date: "",
    duration: "",
    travelStyle: "",
    category: "",
    location: "",
    imageUrl: "",
  });

  const [shortDescLen, setShortDescLen] = useState(0);
  const [fullDescLen, setFullDescLen] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === "shortDescription") setShortDescLen(value.length);
    if (name === "fullDescription") setFullDescLen(value.length);
    setPreview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);

    try {
      // সার্ভার অ্যাকশন কল করুন
      const result = await action(formData);

      // যদি রেজাল্ট সফল হয়
      toast.success("Trip added successfully! ✈️");
      
      // ফর্ম রিসেট বা অন্যান্য কাজ এখানে করুন
      formRef.current?.reset();
    } catch (error) {
      // যদি কোনো এরর হয়
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  // ইমেজ চেকিং কন্ডিশন সহজ করা হয়েছে
  const previewImageValid =
    preview.imageUrl && preview.imageUrl.trim().length > 10;

  return (
    <main className="main-bg min-h-screen py-8 pb-16">
      <div className="app-container">
        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2">
          <Link
            href="/"
            className="text-secondary text-xs font-medium hover:underline transition-all"
          >
            Home
          </Link>
          <span className="text-secondary text-xs">›</span>
          <span
            className="text-xs font-semibold"
            style={{ color: "var(--primary)" }}
          >
            Add Trip
          </span>
        </nav>

        {/* ── Page Heading ── */}
        <div className="mb-10">
          <h1 className="text-primary text-3xl font-extrabold tracking-tight mb-1">
            Add New Trip
          </h1>
          <p className="text-secondary text-sm">
            Share your travel experience with thousands of explorers, {userName}
            .
          </p>
        </div>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* ════════ LEFT: Form ════════ */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            aria-label="Add new trip form"
          >
            {/* ─ Title & Short Description ─ */}
            <div className="card-primary p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <FiType
                  className="text-sm"
                  style={{ color: "var(--primary)" }}
                />
                <span className="text-primary text-sm font-bold">
                  Basic Info
                </span>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="title"
                  className="text-primary text-xs font-semibold uppercase tracking-wider"
                >
                  Trip Title
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none" />
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    placeholder="e.g. Magical Bali Sunset Retreat"
                    onChange={handleChange}
                    className="input-primary w-full pl-9"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="shortDescription"
                    className="text-primary text-xs font-semibold uppercase tracking-wider"
                  >
                    Short Description
                  </label>
                  <span
                    className={`text-xs font-mono tabular-nums ${
                      shortDescLen > 110
                        ? "text-red-500"
                        : shortDescLen > 90
                          ? "text-amber-500"
                          : "text-secondary"
                    }`}
                  >
                    {shortDescLen}/120
                  </span>
                </div>
                <input
                  id="shortDescription"
                  name="shortDescription"
                  type="text"
                  required
                  maxLength={120}
                  placeholder="One captivating sentence about your trip…"
                  onChange={handleChange}
                  className="input-primary w-full"
                />
              </div>
            </div>

            {/* ─ Full Description ─ */}
            <div className="card-primary p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <FiAlignLeft
                    className="text-sm"
                    style={{ color: "var(--primary)" }}
                  />
                  <span className="text-primary text-sm font-bold">
                    Full Description
                  </span>
                </div>
                <span
                  className={`text-xs font-mono tabular-nums ${
                    fullDescLen > 1900
                      ? "text-red-500"
                      : fullDescLen > 1700
                        ? "text-amber-500"
                        : "text-secondary"
                  }`}
                >
                  {fullDescLen}/2000
                </span>
              </div>
              <textarea
                id="fullDescription"
                name="fullDescription"
                required
                rows={7}
                maxLength={2000}
                placeholder="Describe the experience in detail — what travelers will see, do, feel, and remember…"
                onChange={handleChange}
                className="input-primary w-full resize-none leading-relaxed"
              />
            </div>

            {/* ─ Price, Date, Duration ─ */}
            <div className="card-primary p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <FiDollarSign
                  className="text-sm"
                  style={{ color: "var(--primary)" }}
                />
                <span className="text-primary text-sm font-bold">
                  Pricing & Schedule
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Price */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="price"
                    className="text-primary text-xs font-semibold uppercase tracking-wider"
                  >
                    Price
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs font-bold text-zinc-400 pointer-events-none select-none">
                      $
                    </span>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      required
                      min={0}
                      step="0.01"
                      placeholder="0.00"
                      onChange={handleChange}
                      className="input-primary w-full pl-7 pr-12"
                    />
                    <span className="absolute right-3 text-xs font-semibold text-zinc-400 pointer-events-none select-none">
                      USD
                    </span>
                  </div>
                </div>

                {/* Date */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="date"
                    className="text-primary text-xs font-semibold uppercase tracking-wider"
                  >
                    Date
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none" />
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      onChange={handleChange}
                      className="input-primary w-full pl-9"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="duration"
                    className="text-primary text-xs font-semibold uppercase tracking-wider"
                  >
                    Duration
                  </label>
                  <div className="relative">
                    <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none" />
                    <input
                      id="duration"
                      name="duration"
                      type="text"
                      required
                      placeholder="e.g. 7 Days"
                      onChange={handleChange}
                      className="input-primary w-full pl-9"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ─ Travel Style, Category, Location ─ */}
            <div className="card-primary p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <MdOutlineTravelExplore
                  className="text-sm"
                  style={{ color: "var(--primary)" }}
                />
                <span className="text-primary text-sm font-bold">
                  Classification
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Travel Style */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="travelStyle"
                    className="text-primary text-xs font-semibold uppercase tracking-wider"
                  >
                    Travel Style
                  </label>
                  <select
                    id="travelStyle"
                    name="travelStyle"
                    required
                    onChange={handleChange}
                    className="input-primary w-full appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select style…
                    </option>
                    {TRAVEL_STYLES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="category"
                    className="text-primary text-xs font-semibold uppercase tracking-wider"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    onChange={handleChange}
                    className="input-primary w-full appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select category…
                    </option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="location"
                    className="text-primary text-xs font-semibold uppercase tracking-wider"
                  >
                    Location
                  </label>
                  <div className="relative">
                    <FaCompass className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none" />
                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      placeholder="e.g. Bali, Indonesia"
                      onChange={handleChange}
                      className="input-primary w-full pl-9"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ─ Image URL ─ */}
            <div className="card-primary p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <FiImage
                  className="text-sm"
                  style={{ color: "var(--primary)" }}
                />
                <span className="text-primary text-sm font-bold">
                  Cover Image
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="imageUrl"
                  className="text-primary text-xs font-semibold uppercase tracking-wider"
                >
                  Image URL
                </label>
                <div className="relative">
                  <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none" />
                  <input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/…"
                    onChange={handleChange}
                    className="input-primary w-full pl-9"
                  />
                </div>
                <p className="text-secondary text-xs flex items-center gap-1.5 mt-0.5">
                  <FiInfo className="shrink-0 text-xs" />
                  Use a publicly accessible image URL (Unsplash, Pexels, etc.).
                  The preview card will update in real time.
                </p>
              </div>
            </div>

            {/* ─ Form Actions ─ */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <Link href="/manage-trips" className="button-outline">
                Cancel
              </Link>
              <button
                id="submit-trip-btn"
                type="submit"
                disabled={isPending}
                className="button-primary ml-auto gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <span className="inline-block w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Publishing…
                  </>
                ) : (
                  <>
                    Add Trip
                    <FiSend className="text-sm" />
                  </>
                )}
              </button>
            </div>

            {/* ─ Tips Card ─ */}
            <div
              className="rounded-2xl p-5 flex flex-col gap-3 border"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--primary) 8%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--primary) 20%, transparent)",
              }}
            >
              <div className="flex items-center gap-2">
                <FiCheckCircle
                  className="text-base shrink-0"
                  style={{ color: "var(--primary)" }}
                />
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--primary)" }}
                >
                  Tips for a great trip listing
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {[
                  "Use a vivid, high-resolution cover image (min 1200×800 px).",
                  "Write a short description that hooks readers in one sentence.",
                  'Be specific about duration — "7 Days / 6 Nights" performs better.',
                  "Set a fair price; free trips are welcome too (enter 0).",
                  "Include the exact city & country in the Location field.",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FiCheckCircle
                      className="shrink-0 mt-0.5 text-xs"
                      style={{ color: "var(--primary)" }}
                    />
                    <span className="text-xs text-secondary leading-relaxed">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </form>

          {/* ════════ RIGHT: Live Preview Card ════════ */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-4">
            {/* Preview Card */}
            <div className="card-primary overflow-hidden">
              {/* Image area */}
              <div className="relative w-full aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                {previewImageValid ? (
                  // ৩. onError এর ভুল লজিকটি রিমুভ করা হয়েছে যাতে ইমেজ হাইড না হয়ে রিফ্লেক্ট করে
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview.imageUrl}
                    alt="Trip cover preview"
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <FiImage className="text-4xl text-zinc-300 dark:text-zinc-600" />
                    <p className="text-xs text-secondary">
                      Image preview will appear here
                    </p>
                  </div>
                )}

                {/* Category badge overlay */}
                {preview.category && (
                  <span
                    className="absolute top-3 left-3 badge-category text-white text-[10px] shadow-sm px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    {preview.category}
                  </span>
                )}
                {preview.price && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-50 shadow-sm">
                    ${preview.price}
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col gap-3">
                {/* Title */}
                <h2 className="text-primary text-lg font-bold leading-snug min-h-[28px]">
                  {preview.title || (
                    <span className="text-secondary font-normal italic">
                      Your trip title…
                    </span>
                  )}
                </h2>

                {/* Short Description */}
                <p className="text-secondary text-xs leading-relaxed min-h-[32px]">
                  {preview.shortDescription || (
                    <span className="italic">
                      Short description appears here…
                    </span>
                  )}
                </p>

                {/* Divider */}
                <hr className="border-zinc-100 dark:border-zinc-800" />

                {/* Structured details */}
                <ul className="flex flex-col gap-2.5">
                  <PreviewRow
                    icon={<FiCalendar />}
                    label="Date"
                    value={preview.date || "—"}
                  />
                  <PreviewRow
                    icon={<FiClock />}
                    label="Duration"
                    value={preview.duration || "—"}
                  />
                  <PreviewRow
                    icon={<MdOutlineTravelExplore />}
                    label="Style"
                    value={preview.travelStyle || "—"}
                  />
                  <PreviewRow
                    icon={<FiTag />}
                    label="Category"
                    value={preview.category || "—"}
                  />
                  <PreviewRow
                    icon={<FiDollarSign />}
                    label="Price"
                    value={preview.price ? `$${preview.price} USD` : "—"}
                  />
                  <PreviewRow
                    icon={<FiMapPin />}
                    label="Location"
                    value={preview.location || "—"}
                  />
                </ul>
              </div>
            </div>

            {/* Confirmation alert */}
            <div
              className="rounded-2xl p-4 flex items-start gap-3 border"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--primary) 8%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--primary) 18%, transparent)",
              }}
            >
              <FiCheckCircle
                className="text-base shrink-0 mt-0.5"
                style={{ color: "var(--primary)" }}
              />
              <div>
                <p
                  className="text-xs font-bold mb-0.5"
                  style={{ color: "var(--primary)" }}
                >
                  Looks good!
                </p>
                <p className="text-xs text-secondary leading-relaxed">
                  Your trip will be visible to thousands of travelers around the
                  world once published.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── Small helper ── */
function PreviewRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-center gap-2.5">
      <span
        className="flex items-center justify-center w-6 h-6 rounded-lg text-xs shrink-0"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--primary) 10%, transparent)",
          color: "var(--primary)",
        }}
      >
        {icon}
      </span>
      <span className="text-secondary text-xs w-16 shrink-0">{label}</span>
      <span className="text-primary text-xs font-medium truncate">{value}</span>
    </li>
  );
}
