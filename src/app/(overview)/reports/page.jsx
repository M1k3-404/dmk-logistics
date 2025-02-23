"use client"

import { getReportsData } from "@/actions/reports-action";
import ChartComponent from "@/components/Reports/ChartComponent";
import { useMonthStore } from "@/stores/useMonthStore";
import { useEffect, useState } from "react";

export default function Page() {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { selectedMonth, selectedYear } = useMonthStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getReportsData();
                setReportData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const currentMonth = selectedMonth || new Date().toLocaleString('default', { month: 'short' });
    const currentYear = selectedYear || new Date().getFullYear();

    const currentMonthData = reportData.find(
        (item) => item.year === currentYear && item.month === currentMonth
    )

    return (
        <div className="w-[97%] h-[95%] bg-white rounded-lg overflow-y-auto grid grid-cols-4">
            <div className="h-full col-span-3 p-5">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error.message}</p>
                ) : (
                    <ChartComponent existingData={reportData} />
                )}
            </div>
            <div className="h-full p-5 grid grid-rows-3 gap-y-5 text-center">
                <div className="w-full border border-gray-300 rounded-md flex flex-col items-center justify-center">
                    <p className="text-4xl font-medium">LKR {currentMonthData?.totalOutstanding || 0}</p>
                    <p className="text-xl font-light">Total Outstanding</p>
                    <p className="text-sm text-gray-300">{currentMonth} {currentYear}</p>
                </div>
                <div className="w-full border border-gray-300 rounded-md flex flex-col items-center justify-center">
                    <p className="text-4xl font-medium">LKR {currentMonthData?.totalDue || 0}</p>
                    <p className="text-xl font-light">Total Due</p>
                    <p className="text-sm text-gray-300">{currentMonth} {currentYear}</p>
                </div>
                <div className="w-full border border-gray-300 rounded-md flex flex-col items-center justify-center">
                    <p className="text-4xl font-medium">{currentMonthData?.totalSales || 0}</p>
                    <p className="text-xl font-light">Total Sales</p>
                    <p className="text-sm text-gray-300">{currentMonth} {currentYear}</p>
                </div>
            </div>
        </div>
    );
}