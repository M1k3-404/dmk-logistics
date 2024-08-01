"use client"

import { editVehicle } from "@/actions/vehicle-actions";
import { parseDate } from "@internationalized/date";
import { Button, DateInput, Input, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const { id } = params;
    const searchParams = useSearchParams();
    const vehicleQuery = searchParams.get("vehicle");

    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);

    const [date, setDate] = useState(null);
    const [vehicleNo, setVehicleNo] = useState(null);
    const [make, setMake] = useState(null);
    const [yom, setYom] = useState(null);
    const [cr, setCr] = useState(null);
    const [purchasedFrom, setPurchasedFrom] = useState(null);
    const [document, setDocument] = useState(null);
    const [pCost, setPCost] = useState(null);
    const [sellingPrice, setSellingPrice] = useState(null);

    const [errorStatus, setErrorStatus] = useState([]);

    useEffect(() => {
        if (vehicleQuery) {
            setVehicle(JSON.parse(vehicleQuery));
            setLoading(false);
            console.log(vehicleQuery);

            setDate(parseDate(JSON.parse(vehicleQuery).date));
            setVehicleNo(JSON.parse(vehicleQuery).vehicleNo);
            setMake(JSON.parse(vehicleQuery).make);
            setYom(JSON.parse(vehicleQuery).yom);
            setCr(JSON.parse(vehicleQuery).cr);
            setPurchasedFrom(JSON.parse(vehicleQuery).purchasedFrom);
            setDocument(JSON.parse(vehicleQuery).document);
            setPCost(JSON.parse(vehicleQuery).pCost);
            setSellingPrice(JSON.parse(vehicleQuery).sellingPrice);
        }
    }, []);

    const handleSave = () => {
        const vehicleData = {
            "date": date,
            "vehicleNo": vehicleNo,
            "make": make,
            "yom": yom,
            "cr": cr,
            "purchasedFrom": purchasedFrom,
            "document": document,
            "pCost": pCost,
            "sellingPrice": sellingPrice
        };
        console.log('Vehicle data:', vehicleData);
        
        const status = editVehicle(vehicleData, id);
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
                                label="Date of Purchase"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus[0]?.error}
                                isInvalid={errorStatus[0]?.isInvalid}
                                onChange={setDate}
                                classNames={{  
                                    label: "mr-2",  
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                                defaultValue={parseDate(vehicle.date)}
                            />

                            <Input
                                label="Vehicle No"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus[1]?.error}
                                isInvalid={errorStatus[1]?.isInvalid}
                                onChange={(e) => setVehicleNo(e.target.value)}
                                classNames={{
                                    mainWrapper: ["ml-8 w-full"],
                                    label: "mr-10",
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                                defaultValue={vehicle.vehicleNo}
                            />

                            <Input
                                label="Make"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus[2]?.error}
                                isInvalid={errorStatus[2]?.isInvalid}
                                onChange={(e) => setMake(e.target.value)}
                                classNames={{
                                    mainWrapper: ["ml-24 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                                defaultValue={vehicle.make}
                            />

                            <Input
                                label="YOM"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus[3]?.error}
                                isInvalid={errorStatus[3]?.isInvalid}
                                onChange={(e) => setYom(e.target.value)}
                                classNames={{
                                    mainWrapper: ["ml-24 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                                defaultValue={vehicle.yom}
                            />

                            <Select
                                label="CR"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus[4]?.error}
                                isInvalid={errorStatus[4]?.isInvalid}
                                onChange={(e) => setCr(e.target.value)}
                                classNames={{                    
                                    popoverContent: ["bg-white rounded-lg shadow-lg"],
                                    mainWrapper: ["ml-28"],
                                    trigger: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                                defaultSelectedKeys={[vehicle.cr.toLowerCase()]}
                            >
                                <SelectItem key={"pending"} className="rounded-lg hover:bg-[#ebebeb]">Pending</SelectItem>
                                <SelectItem key={"ok"} className="rounded-lg hover:bg-[#ebebeb]">Ok</SelectItem>
                            </Select>

                            <Input
                                label="Purchased from"
                                labelPlacement="outside-left"
                                variant="flat"
                                className="w-full col-start-1 col-span-1"
                                errorMessage={errorStatus[5]?.error}
                                isInvalid={errorStatus[5]?.isInvalid}
                                onChange={(e) => setPurchasedFrom(e.target.value)}
                                classNames={{
                                    mainWrapper: ["ml-12 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                                defaultValue={vehicle.purchasedFrom}
                            />

                            <Input
                                label="Document"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus[6]?.error}
                                isInvalid={errorStatus[6]?.isInvalid}
                                onChange={(e) => setDocument(e.target.value)}
                                classNames={{
                                    mainWrapper: ["ml-14 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                                defaultValue={vehicle.document}
                            />

                            <Input
                                type="number"
                                label="P/Cost"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus[7]?.error}
                                isInvalid={errorStatus[7]?.isInvalid}
                                onChange={(e) => setPCost(e.target.value)}
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
                                defaultValue={vehicle.pCost}
                            />

                            <Input
                                type="number"
                                label="Selling Price"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus[8]?.error}
                                isInvalid={errorStatus[8]?.isInvalid}
                                onChange={(e) => setPCost(e.target.value)}
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
                                defaultValue={vehicle.sellingPrice}
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