import Link from "next/link";
import {
  FiArrowLeft,
  FiHeart,
  FiShare2,
  FiCalendar,
  FiClock,
  FiTag,
  FiGlobe,
  FiDollarSign,
  FiFileText,
} from "react-icons/fi";
// আপনার এপিআই মেথডের সঠিক পাথ অনুযায়ী এটি ইমপোর্ট নিশ্চিত করে নিবেন:
import { getSingleTrips } from "@/lib/apis/trips";

export interface TripData {
  _id: string;
  userId: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  date: string;
  duration: string;
  travelStyle: string;
  imageUrl: string;
  category: string;
  location: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function TripDetailsPage({ params }: PageProps) {
  // Next.js ১৬+ এর নিয়ম অনুযায়ী প্রথমে params আনর‍্যাপ করতে হবে
  const resolvedParams = await params;

  // আপনার এপিআই ফাংশনে আইডি পাস করে ডেটা কল করা হলো
  const trip: TripData = await getSingleTrips(resolvedParams.id);

  return (
    <div className="main-bg min-h-screen pb-24">
      {/*  Top Utility Action Bar  */}
      <div className="w-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md sticky top-0 z-40 border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/trips"
            className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
          >
            <FiArrowLeft className="text-base transition-transform group-hover:-translate-x-0.5" />
            <span>Back to All Trips</span>
          </Link>

         
        </div>
      </div>

      {/*  Main Responsive Content Layout  */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/*  Left Column: Banner & Info  */}
          <div className="lg:col-span-2 space-y-8">
            {/* Banner Image wrapper */}
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800/50 shadow-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={trip.imageUrl}
                alt={trip.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title & Headline Block */}
            <div className="space-y-3">
              <h1 className="text-primary text-3xl sm:text-4xl font-extrabold tracking-tight">
                {trip.title}
              </h1>
              <p className="text-secondary text-base max-w-3xl leading-relaxed">
                {trip.shortDescription}
              </p>
            </div>

            {/* Horizontal Icons Meta Strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 pb-6 border-b border-zinc-100 dark:border-zinc-800 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <FiCalendar className="text-emerald-600 dark:text-emerald-400 text-base" />
                <span>{formatDate(trip.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <FiClock className="text-emerald-600 dark:text-emerald-400 text-base" />
                <span>{trip.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <FiTag className="text-emerald-600 dark:text-emerald-400 text-base" />
                <span>{trip.travelStyle}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <FiGlobe className="text-emerald-600 dark:text-emerald-400 text-base" />
                <span>{trip.category}</span>
              </div>
            </div>

            {/* Detailed Description Block */}
            <div className="space-y-4">
              <h2 className="text-primary text-xl font-bold tracking-tight">
                About This Trip
              </h2>
              <div className="text-secondary text-sm sm:text-base leading-relaxed whitespace-pre-line prose dark:prose-invert">
                {trip.fullDescription}
              </div>
            </div>
          </div>

          {/*  Right Column: Tabular Sidebar Card (Sticky)  */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-3xl p-6 shadow-xs space-y-1">
              {/* Row: Title */}
              <div className="flex items-center justify-between py-4 border-b border-zinc-100/80 dark:border-zinc-800/50 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <FiFileText className="text-lg" />
                  </div>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                    Trip Title
                  </span>
                </div>
                <span className="text-zinc-900 dark:text-zinc-100 font-semibold text-sm text-right line-clamp-1">
                  {trip.title}
                </span>
              </div>

              {/* Row: Date */}
              <div className="flex items-center justify-between py-4 border-b border-zinc-100/80 dark:border-zinc-800/50 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <FiCalendar className="text-lg" />
                  </div>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                    Date
                  </span>
                </div>
                <span className="text-zinc-900 dark:text-zinc-100 font-semibold text-sm text-right">
                  {formatDate(trip.date)}
                </span>
              </div>

              {/* Row: Duration */}
              <div className="flex items-center justify-between py-4 border-b border-zinc-100/80 dark:border-zinc-800/50 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <FiClock className="text-lg" />
                  </div>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                    Duration
                  </span>
                </div>
                <span className="text-zinc-900 dark:text-zinc-100 font-semibold text-sm text-right">
                  {trip.duration}
                </span>
              </div>

              {/* Row: Travel Style */}
              <div className="flex items-center justify-between py-4 border-b border-zinc-100/80 dark:border-zinc-800/50 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <FiTag className="text-lg" />
                  </div>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                    Travel Style
                  </span>
                </div>
                <span className="text-zinc-900 dark:text-zinc-100 font-semibold text-sm text-right">
                  {trip.travelStyle}
                </span>
              </div>

              {/* Row: Category */}
              <div className="flex items-center justify-between py-4 border-b border-zinc-100/80 dark:border-zinc-800/50 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <FiGlobe className="text-lg" />
                  </div>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                    Category
                  </span>
                </div>
                <span className="text-zinc-900 dark:text-zinc-100 font-semibold text-sm text-right">
                  {trip.category}
                </span>
              </div>

              {/* Row: Price */}
              <div className="flex items-center justify-between py-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <FiDollarSign className="text-lg" />
                  </div>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                    Price
                  </span>
                </div>
                <span className="text-zinc-900 dark:text-zinc-100 font-bold text-base text-right">
                  {trip.price === 0
                    ? "Free"
                    : `$${trip.price.toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
