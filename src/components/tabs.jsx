"use client"

import React, { useCallback } from "react";
import { Button } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react"
import { IoIosAddCircle } from "react-icons/io";
import Link from "next/link";
import { soldVehicleTableHeads, vehicleTableHeads } from "@/data/static-data";
import { getAllVehicles } from "@/actions/vehicle/vehicle-getAll-action";
import DashboardTable from "./dashboard";

export default function Tabs() {
    const [activeVehicles, setActiveVehicles] = useState([]);
    const [soldVehicles, setSoldVehicles] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(0);
    const [selectedTab, setSelectedTab] = useState(0);
    const firstBtnRef = useRef();
    const fetchVehicles = useCallback(async () => {
        try {
            const { activeVehicles, soldVehicles } = await getAllVehicles();
            setActiveVehicles(activeVehicles);
            setSoldVehicles(soldVehicles);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    }, []);

    useEffect(() => {
        fetchVehicles();
    }, [fetchVehicles, reloadTrigger]);

    useEffect(() => {
        firstBtnRef.current.focus();
    }, []);

    const items = [
        { title: "Active", content: <DashboardTable tableHeaders={vehicleTableHeads} data={activeVehicles} tab={"vehicles"} reload={setReloadTrigger} /> },
        { title: "Sold", content: <DashboardTable tableHeaders={soldVehicleTableHeads} data={soldVehicles} tab={"sold vehicles"} /> },
    ]

    return(
        <div>
            <div className="pt-6 mx-8 flex justify-between items-center">
                <div className="flex space-x-2">
                    {items.map((item, index) => (
                        <Button
                            ref={index === 0 ? firstBtnRef : null}
                            key={index}
                            onClick={() => setSelectedTab(index)}
                            className={`bg-transparent text-[#606060] rounded-lg font-bold px-5 py-1 transition-colors duration-200 ease-in-out ${selectedTab === index ? 'bg-green-200 text-black' : 'hover:text-black'}`}
                        >
                            {item.title}
                        </Button>
                    ))}
                </div>
                
                <Button 
                    className="bg-[#0c0c0c] hover:bg-[#1d1d1d] px-4 py-1 text-white font-light rounded-lg"
                    as={Link}
                    href="/dashboard/add-vehicle"
                >
                    <IoIosAddCircle />
                    Add Vehicle
                </Button>
            </div>

            <div className="mt-5 mx-8">
                {items[selectedTab].content}
            </div>
        </div>
    )
} 