"use client"

import React from "react";
import { Button } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react"
import { IoIosAddCircle } from "react-icons/io";
import Link from "next/link";
import DashboardTable from "./dashboardTable";
import { soldVehicleTableHeads, vehicleTableHeads } from "@/data/static-data";
import { getALLVehicles } from "@/actions/dashboard-actions";

export default function Tabs() {
    const [activeVehicles, setActiveVehicles] = useState([]);
    const [soldVehicles, setSoldVehicles] = useState([]);

    const items = [
        {title: "Active", content: <DashboardTable tableHeaders={vehicleTableHeads} data={activeVehicles} tab={"vehicles"} />},
        {title: "Sold", content: <DashboardTable tableHeaders={soldVehicleTableHeads} data={soldVehicles} tab={"sold vehicles"} />},
    ]

    const firstBtnRef = useRef();

    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        getALLVehicles()
            .then(({ activeVehicles, soldVehicles }) => {
                setActiveVehicles(activeVehicles);
                setSoldVehicles(soldVehicles);
            })
            .catch(error => {
                console.error('Error fetching vehicles:', error);
            });
    }, []);

    useEffect(() => {
        firstBtnRef.current.focus();
    }, []);

    return(
        <div>
            <div className="mt-6 mx-8 flex justify-between items-center">
                <div className="flex">
                    {items.map((item, index) => (
                        <Button
                            ref={index === 0 ? firstBtnRef : null}
                            key={index}
                            onClick={() => setSelectedTab(index)}
                            className={`bg-transparent text-[#606060] text-xl font-bold px-5 py-1 hover:text-black ${selectedTab === index ? 'text-[#0c0c0c]' : ''}`}
                        >
                            {item.title}
                        </Button>
                    ))}
                </div>
                
                <Button 
                    className="bg-[#0c0c0c] hover:bg-[#1d1d1d] px-8 py-4 text-white font-extralight rounded-md"
                    as={Link}
                    href="/dashboard/add-vehicle"
                >
                    <IoIosAddCircle />
                    Add Vehicle
                </Button>
            </div>

            <div className="mt-5 mx-8">
                {items.map((item, index) => (
                    <div className={`${selectedTab === index ? '' : 'hidden'}`}>
                        {item.content}
                    </div>
                ))}
            </div>
        </div>
    )
} 