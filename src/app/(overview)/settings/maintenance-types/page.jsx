"use client"

import { getAllMaintenanceTypes } from "@/actions/maintenance-types-actions";
import MaintenanceMethod from "@/components/Add Maintenance/MaintenanceMethod";
import MaintenanceTypeCreationModal from "@/components/Add Maintenance/MaintenanceTypeCreationModal";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const [maintenanceTypes, setMaintenanceTypes] = useState([]);

    useEffect(() => {
        getAllMaintenanceTypes()
            .then(((data) => {
                setMaintenanceTypes(data);
                console.log("Maintenance Types Data:", data);
            }))
    }, [])

    return (
        <div className="w-[97%] max-h-[95%] bg-white rounded-lg overflow-y-auto">
            <div className="w-full p-8">
                <p className={`text-[#606060] text-xl font-bold`}>Maintenance Types</p>

                <div className="mt-8 flex w-full">
                    <div className="w-3/4 p-6 pr-6 rounded-lg bg-[#f0f0f0]">
                        <div className="mt-4 w-1/4">
                            {maintenanceTypes.map((type, index) => (
                                <MaintenanceMethod key={index} data={type} />
                            ))}
                        </div>

                        <MaintenanceTypeCreationModal />
                    </div>

                    <div className="w-1/4 pb-2 mx-2 p-6 border-l border-black/25 flex flex-col justify-end">
                        <Button
                            as={Link}
                            href="/settings"
                            className="bg-white text-[#0c0c0c] font-extralight rounded-md border hover:shadow-sm hover:text-red-600"
                        >
                            Cancel
                        </Button>
                        <Button 
                            as={Link}
                            href="/settings"
                            className="bg-[#0c0c0c] text-white font-extralight rounded-md mt-2 hover:bg-green-600"
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}