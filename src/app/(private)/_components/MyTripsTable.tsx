"use client";
import Link from "next/link";
import { AlertDialog, Button } from "@heroui/react";
import { FiEye, FiTrash2, FiMapPin, FiCalendar } from "react-icons/fi";
import { TripData } from "../page";
import { MdDeleteOutline } from "react-icons/md";

interface MyTripsTableProps {
  trips: TripData[];
  onHandleDeleteTrip: (tripId: string) => Promise<void>;
}

export default function MyTripsTable({
  trips,
  onHandleDeleteTrip,
}: MyTripsTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-zinc-900 shadow-xs p-2">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead>
          <tr className="bg-neutral-50 dark:bg-zinc-900/50">
            <th className="w-12 text-center py-4 px-4 border-b border-neutral-100 dark:border-neutral-800 rounded-l-2xl text-neutral-500 dark:text-zinc-400 font-bold text-xs">
              #
            </th>
            <th className="w-80 py-4 px-4 border-b border-neutral-100 dark:border-neutral-800 text-neutral-500 dark:text-zinc-400 font-bold text-xs">
              Trip Title
            </th>
            <th className="py-4 px-4 border-b border-neutral-100 dark:border-neutral-800 text-neutral-500 dark:text-zinc-400 font-bold text-xs">
              Destination
            </th>
            <th className="py-4 px-4 border-b border-neutral-100 dark:border-neutral-800 text-neutral-500 dark:text-zinc-400 font-bold text-xs">
              Start Date
            </th>
            <th className="py-4 px-4 border-b border-neutral-100 dark:border-neutral-800 text-neutral-500 dark:text-zinc-400 font-bold text-xs">
              Budget
            </th>
            <th className="py-4 px-4 border-b border-neutral-100 dark:border-neutral-800 text-neutral-500 dark:text-zinc-400 font-bold text-xs">
              Status
            </th>
            <th className="text-center py-4 px-4 border-b border-neutral-100 dark:border-neutral-800 rounded-r-2xl text-neutral-500 dark:text-zinc-400 font-bold text-xs">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {trips.map((trip, index) => {
            const isCompleted = index > 0;

            return (
              <tr
                key={trip._id}
                className="hover:bg-neutral-50/50 dark:hover:bg-zinc-800/30 transition-colors duration-150"
              >
                {/* Index Column */}
                <td className="text-center py-4 px-4 border-b border-neutral-100/50 dark:border-neutral-800/50 font-bold text-neutral-400 dark:text-zinc-500 tabular-nums text-sm align-middle">
                  {index + 1}
                </td>

                {/* Title & Image Column */}
                <td className="py-4 px-4 border-b border-neutral-100/50 dark:border-neutral-800/50 text-sm align-middle">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-zinc-800 border border-neutral-200/60 dark:border-zinc-700/60 shrink-0 relative">
                      <img
                        src={
                          trip.imageUrl ||
                          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=150"
                        }
                        alt={trip.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-bold text-neutral-900 dark:text-zinc-50 line-clamp-1">
                      {trip.title}
                    </span>
                  </div>
                </td>

                {/* Destination Column */}
                <td className="py-4 px-4 border-b border-neutral-100/50 dark:border-neutral-800/50 text-sm align-middle">
                  <div className="flex items-center gap-1.5 text-neutral-600 dark:text-zinc-300 font-medium">
                    <FiMapPin className="text-emerald-500 shrink-0" />
                    <span className="line-clamp-1">{trip.location}</span>
                  </div>
                </td>

                {/* Date Column */}
                <td className="py-4 px-4 border-b border-neutral-100/50 dark:border-neutral-800/50 text-sm align-middle">
                  <div className="flex items-center gap-1.5 text-neutral-600 dark:text-zinc-300 font-medium tabular-nums">
                    <FiCalendar className="text-neutral-400 dark:text-zinc-500 shrink-0" />
                    <span>{trip.date || "N/A"}</span>
                  </div>
                </td>

                {/* Budget Column */}
                <td className="py-4 px-4 border-b border-neutral-100/50 dark:border-neutral-800/50 font-bold text-neutral-900 dark:text-zinc-50 tabular-nums text-sm align-middle">
                  ${trip.price?.toLocaleString()}
                </td>

                {/* Status Badge Column */}
                <td className="py-4 px-4 border-b border-neutral-100/50 dark:border-neutral-800/50 text-sm align-middle">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                      isCompleted
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                        : "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                    }`}
                  >
                    {isCompleted ? "Completed" : "Upcoming"}
                  </span>
                </td>

                {/* Actions Button Column */}
                <td className="py-4 px-4 border-b border-neutral-100/50 dark:border-neutral-800/50 text-sm align-middle">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/trips/${trip._id}`}
                      className="inline-flex items-center justify-center gap-1.5 h-9 px-3 border border-neutral-200 dark:border-zinc-700 hover:bg-neutral-50 dark:hover:bg-zinc-800 text-neutral-700 dark:text-zinc-300 font-bold text-xs rounded-xl transition-colors duration-150"
                    >
                      <FiEye className="text-xs" />
                      View
                    </Link>

                    <AlertDialog>
                      <Button
                        variant="bordered"
                        size="sm"
                        radius="lg"
                        startContent={<FiTrash2 className="text-xs" />}
                        className="h-9 px-3 border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 font-bold text-xs rounded-xl transition-colors duration-150"
                      >
                        <MdDeleteOutline className="text-xs" />
                        Delete
                      </Button>

                      <AlertDialog.Backdrop className="bg-black/40 backdrop-blur-sm">
                        <AlertDialog.Container>
                          <AlertDialog.Dialog className="sm:max-w-[400px] rounded-3xl border border-neutral-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                              <AlertDialog.Icon status="danger" />
                              <AlertDialog.Heading className="text-neutral-900 dark:text-white font-bold">
                                Delete trip permanently?
                              </AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                              <p className="text-neutral-600 dark:text-zinc-400 text-sm">
                                This will permanently delete your trip and all
                                of its associated data. This action cannot be
                                undone.
                              </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                              <Button
                                slot="close"
                                variant="tertiary"
                                className="rounded-xl font-bold hover:bg-neutral-100 dark:hover:bg-zinc-800"
                              >
                                Cancel
                              </Button>
                              <Button
                                slot="close"
                                variant="danger"
                                onClick={() => onHandleDeleteTrip(trip._id)}
                                className="rounded-xl font-bold"
                              >
                                Delete Trip
                              </Button>
                            </AlertDialog.Footer>
                          </AlertDialog.Dialog>
                        </AlertDialog.Container>
                      </AlertDialog.Backdrop>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
