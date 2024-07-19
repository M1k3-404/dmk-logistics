"use client"

import { HandleSaveChanges } from "@/actions/maintenance-actions";
import EditableMaintenaceRecord from "@/components/Maintenance/editableMaintenanceRecord";
import MaintenaceRecord from "@/components/Maintenance/maintenanceRecord";
import { vehicles } from "@/components/vehicleData";
import { BreadcrumbItem, Breadcrumbs, Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

export default function Maintenace({ params }) {
    const id = params.id;
    const vehicle = vehicles[id-1];

    const [editableRecords, setEditableRecords] = useState([]);

    const handleAddRecord = () => {
        setEditableRecords((prevRecords) => [...prevRecords, {}]);
    }

    const handleDeleteRecord = (index) => {
        vehicle.maintenance.splice(index);
    }

    const handleDeleteNewRecord = (index) => {
        setEditableRecords((prevRecords) => {
            const updatedRecords = [...prevRecords];
            updatedRecords.splice(index);
            return updatedRecords;
        })
    }

    // ------------------------------------------------------------------------------------------------

    return(
        <div className="w-[95%] p-6 bg-white rounded-lg overflow-y-auto">
            <div className="w-full">
                <Breadcrumbs
                    separator="/"
                    itemClasses={{
                        separator: "text-xl font-bold px-2"
                    }}
                >
                    <BreadcrumbItem href="/dashboard">
                        <p className={`text-[#606060] text-xl font-bold`}>"LM ..."</p>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <p className={`text-[#606060] text-xl font-bold`}>Maintenance</p>
                    </BreadcrumbItem>
                </Breadcrumbs>
                
                <div className="mt-8 flex w-full">
                    <div className="w-3/4 pr-6 pl-12">
                        <div className="w-full grid grid-cols-2 gap-x-12 gap-y-6 pb-5 border-b border-black/25">
                            <Input
                                isReadOnly
                                classNames={{
                                    base: "w-full",
                                    label: "mr-2 w-[25%]",
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.date}
                                size="sm"
                                variant="flat"
                                label="Date"
                                labelPlacement="outside-left"
                            />

                            <Input
                                isReadOnly
                                classNames={{
                                    base: "w-full",
                                    label: "mr-2 w-[25%]",
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.vehicleNo}
                                size="sm"
                                variant="flat"
                                label="Vehicle No"
                                labelPlacement="outside-left"
                            />

                            <Input
                                isReadOnly
                                classNames={{
                                    base: "w-full",
                                    label: "mr-2 w-[25%]",
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.make}
                                size="sm"
                                variant="flat"
                                label="Make"
                                labelPlacement="outside-left"
                            />

                            <Input
                                isReadOnly
                                classNames={{
                                    base: "w-full",
                                    label: "mr-2 w-[25%]",
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.yom}
                                size="sm"
                                variant="flat"
                                label="YOM"
                                labelPlacement="outside-left"
                            />

                            <Input
                                isReadOnly
                                classNames={{
                                    base: "w-full",
                                    label: "mr-2 w-[25%]",
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.cr}
                                size="sm"
                                variant="flat"
                                label="CR"
                                labelPlacement="outside-left"
                            />
                        </div>

                        <div className="w-full py-5">
                            <p className="mb-4 font-medium">Maintenance Records</p>
                            {vehicle.maintenance.map((record, index) => {
                                return(
                                    <MaintenaceRecord 
                                        key={index}    
                                        record={record}
                                        onDelete={() => handleDeleteRecord(index)} 
                                    />
                                )
                            })}
                            {editableRecords.map((_, index) => {
                                return(
                                    <EditableMaintenaceRecord 
                                        key={index}
                                        onDelete={() => handleDeleteNewRecord(index)}
                                    />
                                )
                            })}
                            <Button
                                className="w-full bg-transparent rounded-lg border border-black"
                                onClick={handleAddRecord}
                            >
                                Add New Maintenance Record
                            </Button>
                        </div>
                    </div>

                    <div className="w-1/4 p-6 border-l border-black/25 flex flex-col justify-end">
                        <Button 
                            as={Link}
                            href="/dashboard"
                            className="bg-white text-[#0c0c0c] font-extralight rounded-md border hover:shadow-sm hover:text-red-600"
                        >
                            Cancel
                        </Button>
                        
                        <Button
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