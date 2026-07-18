"use server"
import { protectedFetch, serverFetch } from "../core/server";

interface TripData {
    _id:string,
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

export interface EventResponse {
  result: TripData[];
  total: number;
}

export const getTrips = async (quaryString:string | null):Promise<EventResponse> => {
    return serverFetch<EventResponse>(`/api/trips?${quaryString}`);
} 


export const getFeaturedTrips = async ():Promise<TripData[]> => {
    return serverFetch<TripData[]>(`/api/trips/featured`);
} 

export const getMyTrips = async (userId:string | null | undefined):Promise<TripData[]> => {
    return protectedFetch<TripData[]>(`/api/trips/user/${userId}`);
} 
export const getSingleTrips = async (tripId:string):Promise<TripData> => {
    return serverFetch<TripData>(`/api/trips/${tripId}`);
} 

