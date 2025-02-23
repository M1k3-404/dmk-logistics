"use client"

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useMonthStore } from "@/stores/useMonthStore";

export default function ChartComponent({ existingData }) {
    const { setSelectedMonth } = useMonthStore();
    const [selectedyear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMetric, setSelectedMetric] = useState("revenue");
    const [expandedMonth, setExpandedMonth] = useState(null);

    const allMonths = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = Array.from({ length: new Date().getFullYear() - 2024 + 1 }, (_, i) => 2024 + i);

    const filteredData = existingData.filter(data => data.year === selectedyear);

    const calculateMonthlyData = (month) => {
        const monthdata = filteredData.find(data => data.month === month);
        const monthlyRevenue = monthdata?.daily.reduce((acc, day) => acc + day.revenue, 0) || 0;
        const monthlyProfit = monthdata?.daily.reduce((acc, day) => acc + day.profit, 0) || 0;
        return {
            month,
            year: selectedyear,
            revenue: monthlyRevenue,
            profit: monthlyProfit,
        }
    }

    const chartData = allMonths.map(month =>
        calculateMonthlyData(month)
    );

    const getDaysInMonth = (month, year) => {
        const monthIndex = allMonths.indexOf(month);
        return new Date(year, monthIndex + 1, 0).getDate();
    }

    const getDailyData = (month) => {
        const monthData = filteredData.find(data => data.month === month);
        const daysInMonth = getDaysInMonth(month, selectedyear);

        return Array.from({ length: daysInMonth }, (_, i) => {
            const existingDay = monthData?.daily.find(day => day.date === i + 1);
            return existingDay || { date: i + 1, revenue: 0, profit: 0 };
        })
    }

    const chartConfig = {
        revenue: {
            label: "Revenue",
            color: "#60a5fa",
        },
        profit: {
            label: "Profit",
            color: "#8884d8",
        },
    };

    const handleBarClick = (data) => {
        console.log(data);
        setSelectedMonth(data.month, data.year);
        if (expandedMonth === data.month) {
            setExpandedMonth(null);
        } else {
            setExpandedMonth(data.month);
        }
    }

    return (
        <div className="h-full w-full flex flex-col">
            <div className="flex flex-row-reverse gap-2">
                <div>
                    <Select value={selectedMetric} onValueChange={(value) => setSelectedMetric(value)}>
                        <SelectTrigger className="w-full border border-gray-300 rounded-md">
                            <SelectValue placeholder="metric" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(chartConfig).map(metric => (
                                <SelectItem key={metric} value={metric}>{chartConfig[metric].label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                
                <div>
                    <Select value={selectedyear.toString()} onValueChange={(value) => setSelectedYear(Number(value))}>
                        <SelectTrigger className="w-full border border-gray-300 rounded-md">
                            <SelectValue placeholder="year" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map(year => (
                                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        
            <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart 
                    accessibilityLayer 
                    data={expandedMonth ? getDailyData(expandedMonth) : chartData}
                    onClick={(e) => handleBarClick(e.activePayload[0].payload)}
                >
                    <XAxis
                        dataKey={expandedMonth ? "date" : "month"}
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => expandedMonth ? value : value.slice(0, 3)}
                    />
                    <YAxis
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey={selectedMetric} fill={chartConfig[selectedMetric].color} radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    );
}
