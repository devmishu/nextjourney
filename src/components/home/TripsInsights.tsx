"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FiTrendingUp } from "react-icons/fi";
import { getTrips } from "@/lib/apis/trips";


interface TripData {
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

interface ApiResponse {
  result: TripData[];
}



export default function TripsInsights() {
  const [data, setData] = useState<TripData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response: ApiResponse = await getTrips(null);
        setData(response.result);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="p-8 text-center text-secondary">Loading insights...</div>
    );

  return (
    <section className=" py-16 transition-colors duration-300">
      <div className="app-container">
        <div className="card-primary p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-emerald-600 dark:text-emerald-400">
              <FiTrendingUp size={24} />
            </div>
            <h2 className="text-2xl font-black text-primary">Trips Insights</h2>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="currentColor"
                  className="opacity-10"
                />
                <XAxis
                  dataKey="title"
                  tick={{ fill: "currentColor", fontSize: 10 }}
                  className="text-secondary"
                  tickLine={false}
                  interval={0} 
                />
                <YAxis
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  className="text-secondary"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "1rem",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="price" radius={[8, 8, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill="#028A65"
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
