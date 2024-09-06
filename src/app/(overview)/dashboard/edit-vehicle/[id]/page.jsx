"use client"

import { editVehicle } from "@/actions/vehicle-actions";
import { useFormState } from "@/lib/hooks/useFormState";
import { parseDate } from "@internationalized/date";
import { Button, DateInput, Input, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const initialState = {
    date: "",
    vehicleNo: "",
    make: "",
    yom: "",
    cr: "",
    purchasedFrom: "",
    document: "",
    pCost: "",
    sellingPrice: ""
}

export default function Page({ params }) {
    const { id } = params;
    const searchParams = useSearchParams();
    const vehicleQuery = searchParams.get("vehicle");

    const [formState, handleChange, handleDateChange, errorStatus, setErrorStatus, setFormState] = useFormState(initialState);
    const [loading, setLoading] = useState(true);

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (session) {
            setUserId(session.userId);
        } else {
            console.error("User is not logged in or session is missing userId.");
        }
    }, []);

    useEffect(() => {
        const vehicle = JSON.parse(vehicleQuery);
        console.log('vehicle:', vehicle);
        setFormState({
            date: parseDate(vehicle.purchaseDetails.boughtDate),
            vehicleNo: vehicle.vehicle.vehicleNumber,
            make: vehicle.vehicle.make,
            yom: parseDate(vehicle.vehicle.YearOfManufacture),
            cr: vehicle.vehicle.isCR.toLowerCase(),
            purchasedFrom: vehicle.purchaseDetails.purchasedFrom,
            document: vehicle.purchaseDetails.legalOwnerName,
            pCost: vehicle.purchaseDetails.agreedAmount,
            sellingPrice: vehicle.vehicle.ExpectedSellingPrice
        })

        setLoading(false);
    }, [vehicleQuery]);

    const handleSave = async () => {
        const status = await editVehicle(formState, id, userId);
        setErrorStatus(status);
    }

    if (loading) {
        return <div className="w-[95%] h-[25%] p-6 bg-white rounded-lg">Loading...</div>
    }

    return(
        <div className="w-[95%] p-6 bg-white rounded-lg">
            <div className="w-full">
                <p className={`text-[#606060] text-xl font-bold`}>Edit Vehicle Details</p>

                <div className="mt-8 flex w-full">
                    <div className="w-3/4 pr-6 pl-12">
                        <div className="w-full grid grid-cols-2 gap-x-12 gap-y-6 pb-5">
                            <DateInput
                                name="date"
                                label="Date of Purchase"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus[0]?.error}
                                isInvalid={errorStatus[0]?.isInvalid}
                                onChange={(date) => handleDateChange('date', date)}
                                classNames={{  
                                    label: "mr-2",  
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                                defaultValue={formState.date}
                            />

                            <Input
                                name="vehicleNo"
                                label="Vehicle No"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus[1]?.error}
                                isInvalid={errorStatus[1]?.isInvalid}
                                onChange={(e) => handleChange(e)}
                                classNames={{
                                    mainWrapper: ["ml-8 w-full"],
                                    label: "mr-10",
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                                value={formState.vehicleNo}
                            />

                            <Input
                                name="make"
                                label="Make"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus[2]?.error}
                                isInvalid={errorStatus[2]?.isInvalid}
                                onChange={(e) => handleChange(e)}
                                classNames={{
                                    mainWrapper: ["ml-24 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                                value={formState.make}
                            />

                            <DateInput
                                name="yom"
                                label="YOM"
                                labelPlacement="outside-left"
                                variant="flat"
                                granularity="year"
                                errorMessage={errorStatus[3]?.error}
                                isInvalid={errorStatus[3]?.isInvalid}
                                onChange={(yom) => handleDateChange('yom', yom)}
                                classNames={{
                                    label: "mr-24",  
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs",
                                }}
                                defaultValue={formState.yom}
                            />

                            <Select
                                name="cr"
                                label="CR"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus[4]?.error}
                                isInvalid={errorStatus[4]?.isInvalid}
                                onChange={(e) => handleChange(e)}
                                classNames={{                    
                                    popoverContent: ["bg-white rounded-lg shadow-lg"],
                                    mainWrapper: ["ml-28"],
                                    trigger: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                                defaultSelectedKeys={[formState.cr.toLowerCase()]}
                            >
                                <SelectItem key={"pending"} className="rounded-lg hover:bg-[#ebebeb]">Pending</SelectItem>
                                <SelectItem key={"ok"} className="rounded-lg hover:bg-[#ebebeb]">Ok</SelectItem>
                            </Select>

                            <Input
                                name="purchasedFrom"
                                label="Purchased from"
                                labelPlacement="outside-left"
                                variant="flat"
                                className="w-full col-start-1 col-span-1"
                                errorMessage={errorStatus[5]?.error}
                                isInvalid={errorStatus[5]?.isInvalid}
                                onChange={(e) => handleChange(e)}
                                classNames={{
                                    mainWrapper: ["ml-12 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                                value={formState.purchasedFrom}
                            />

                            <Input
                                name="document"
                                label="Document"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus[6]?.error}
                                isInvalid={errorStatus[6]?.isInvalid}
                                onChange={(e) => handleChange(e)}
                                classNames={{
                                    mainWrapper: ["ml-14 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                                value={formState.document}
                            />

                            <Input
                                name="pCost"
                                type="number"
                                label="P/Cost"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus[7]?.error}
                                isInvalid={errorStatus[7]?.isInvalid}
                                onChange={(e) => handleChange(e)}
                                classNames={{
                                    mainWrapper: ["ml-20 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-xs mr-1">LKR</span>
                                    </div>
                                }
                                value={formState.pCost}
                            />

                            <Input
                                name="sellingPrice"
                                type="number"
                                label="Selling Price"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus[8]?.error}
                                isInvalid={errorStatus[8]?.isInvalid}
                                onChange={(e) => handleChange(e)}
                                classNames={{
                                    mainWrapper: ["ml-16 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-xs mr-1">LKR</span>
                                    </div>
                                }
                                value={formState.sellingPrice}
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
                            onClick={handleSave}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}