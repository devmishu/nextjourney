import { getUser } from "@/lib/core/session";
import { createTrip } from "@/lib/actions/trips";
import { redirect } from "next/navigation";
import { AddTripForm } from "./AddTripForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Trip — NextJourney",
  description:
    "Create and publish a new trip on NextJourney. Fill in your trip details, set the price, travel style, and share your adventure with thousands of travelers.",
};

export default async function AddEventPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  async function handleCreateTrip(formData: FormData) {
    "use server";

    const sessionUser = await getUser();
    if (!sessionUser) redirect("/login");

    const newTrip = {
      userId: sessionUser.id,
      title: formData.get("title") as string,
      shortDescription: formData.get("shortDescription") as string,
      fullDescription: formData.get("fullDescription") as string,
      price: Number(formData.get("price")),
      date: formData.get("date") as string,
      duration: formData.get("duration") as string,
      travelStyle: formData.get("travelStyle") as string,
      category: formData.get("category") as string,
      location: formData.get("location") as string,
      imageUrl: formData.get("imageUrl") as string,
    };

    await createTrip(newTrip);
    redirect("/manage-trips");
  }

  return <AddTripForm userName={user.name ?? "Traveler"} action={handleCreateTrip} />;
}
