"use client"

import { vehicles } from "@/components/vehicleData";
import { parseDate } from "@internationalized/date";
import { BreadcrumbItem, Breadcrumbs, Button, DateInput, DatePicker, Input, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";

export default function Page({ params }) {
    const id = params.id;
    const vehicle = vehicles[id-1];

    const defaultCr = () => {
        if(vehicle.cr === "Pending") {
            return ["1"];
        } else {
            return ["2"];
        }
    }

    return(
        <div className="w-[95%] p-6 bg-white rounded-lg">
            <div className="w-full">
                <Breadcrumbs
                    separator="/"
                    itemClasses={{
                        separator: "text-xl font-bold px-2"
                    }}
                >
                    <BreadcrumbItem href="/dashboard">
                        <p className={`text-[#606060] text-xl font-bold`}>{vehicle.vehicleNo}</p>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <p className={`text-[#606060] text-xl font-bold`}>Edit Details</p>
                    </BreadcrumbItem>
                </Breadcrumbs>

                <div className="mt-8 flex w-full">
                    <div className="w-3/4 pr-6 pl-12">
                        <div className="w-full grid grid-cols-2 gap-x-12 gap-y-6 pb-5">
                            <DateInput
                                label="Date of Purchase"
                                labelPlacement="outside-left"
                                variant="flat"
                                classNames={{  
                                    label: "mr-2",  
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                }}
                                defaultValue={parseDate(vehicle.date)}
                            />

                            <Input
                                isClearable
                                label="Vehicle No"
                                labelPlacement="outside-left"
                                variant="flat"
                                classNames={{
                                    mainWrapper: ["ml-8 w-full"],
                                    label: "mr-10",
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                }}
                                defaultValue={vehicle.vehicleNo}
                            />

                            <Input
                                isClearable
                                label="Make"
                                labelPlacement="outside-left"
                                variant="flat"
                                classNames={{
                                    mainWrapper: ["ml-24 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                }}
                                defaultValue={vehicle.make}
                            />

                            <Input
                                isClearable
                                label="YOM"
                                labelPlacement="outside-left"
                                variant="flat"
                                classNames={{
                                    mainWrapper: ["ml-24 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                }}
                                defaultValue={vehicle.yom}
                            />

                            <Select
                                label="CR"
                                labelPlacement="outside-left"
                                variant="flat"
                                classNames={{                    
                                    popoverContent: ["bg-white rounded-lg shadow-lg"],
                                    mainWrapper: ["ml-28"],
                                    trigger: "w-full rounded-lg bg-[#f5f5f5]",
                                }}
                                defaultSelectedKeys={[vehicle.cr.toLowerCase()]}
                            >
                                <SelectItem key={"pending"} className="rounded-lg hover:bg-[#ebebeb]">Pending</SelectItem>
                                <SelectItem key={"ok"} className="rounded-lg hover:bg-[#ebebeb]">Ok</SelectItem>
                            </Select>

                            <Input
                                isClearable
                                label="Purchased from"
                                labelPlacement="outside-left"
                                variant="flat"
                                className="w-full col-span-2"
                                classNames={{
                                    mainWrapper: ["ml-8 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                }}
                                defaultValue={vehicle.purchasedFrom}
                            />

                            <Input
                                isClearable
                                label="Document"
                                labelPlacement="outside-left"
                                variant="flat"
                                classNames={{
                                    mainWrapper: ["ml-14 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                }}
                                defaultValue={vehicle.document}
                            />

                            <Input
                                isClearable
                                label="P/Cost"
                                labelPlacement="outside-left"
                                variant="flat"
                                classNames={{
                                    mainWrapper: ["ml-8 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                }}
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-xs mr-1">LKR</span>
                                    </div>
                                }
                                defaultValue={vehicle.pCost}
                            />
                        </div>    
                    </div>

                    <div className="w-1/4 p-6 pb-2 border-l border-black/25 flex flex-col justify-end">
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