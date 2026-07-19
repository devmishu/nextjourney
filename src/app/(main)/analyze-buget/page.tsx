"use client";

import React, { useState } from "react";
import { Card, Spinner } from "@heroui/react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { FiUploadCloud, FiTrendingUp, FiInfo } from "react-icons/fi";
const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function BudgetAnalyzer() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

 
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
     
      const res = await fetch(`${baseurl}/api/analyze-budget`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Server response was not ok");
      }

      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Analysis failed", error);
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-between items-center">
      <div className=" max-w-4xl mx-auto py-12 px-4">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <h1 className="text-3xl font-extrabold text-primary mb-2">
            AI Budget Analyzer
          </h1>
          <p className="text-secondary">
            Upload your travel expenses CSV/Excel to get intelligent insights
            and spending trends.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Upload Card */}
          <Card className="md:col-span-1 border border-divider p-6 flex flex-col items-center justify-center gap-4 shadow-sm">
            <FiUploadCloud className="text-5xl text-primary/60" />
            <h3 className="font-bold">Upload Expense File</h3>

            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
              accept=".csv, .xlsx"
            />

            
            <label
              htmlFor="fileInput"
              className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer font-bold hover:opacity-90 transition-opacity"
            >
              Select File
            </label>

            <p className="text-xs text-secondary text-center">
              Supported: CSV, XLSX format
            </p>
          </Card>
          {/* Results Card */}
          <Card className="md:col-span-2 border border-divider p-6 shadow-sm">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 gap-3">
                <Spinner size="lg" />
                <p className="text-primary font-bold">
                  AI is analyzing your travel data...
                </p>
              </div>
            ) : data ? (
              <div className="space-y-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {data.chartData.map((entry: any, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full h-px bg-divider my-4" />
                <div className="bg-primary/5 p-4 rounded-xl">
                  <h4 className="flex items-center gap-2 font-bold mb-2 text-primary">
                    <FiTrendingUp /> AI Insights
                  </h4>
                  <p className="text-sm text-secondary">{data.insight}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-secondary gap-2">
                <FiInfo className="text-4xl opacity-20" />
                <p>
                  Upload a file to see your AI-generated budget report here.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
