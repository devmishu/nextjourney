"use server"
import { revalidatePath } from "next/cache";
import { serverDelete, serverMutation } from "../core/server";


interface TripData {
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

export const createTrip = async (newTrip: TripData) => {
    return serverMutation('/api/trips', newTrip, 'POST');
}

export const deleteTrip = async (tripId: string) => {
    revalidatePath('/manage-trips')
    return serverDelete(`/api/trip/${tripId}`);
}