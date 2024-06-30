"use client"

import { HandleRequiredFields, HandleSaveChanges } from "@/actions/add-vehicle-actions";
import CancellationModal from "@/components/Add Vehicle/cancellationModal";
import { Button, DateInput, Input, Modal, ModalBody, ModalContent, ModalFooter, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { useState } from "react";

export default function Page() {
    const [date, setDate] = useState("");
    const [vehicleNo, setVehicleNo] = useState("");
    const [make, setMake] = useState("");
    const [yom, setYom] = useState("");
    const [cr, setCr] = useState("");
    const [purchasedFrom, setPurchasedFrom] = useState("");
    const [document, setDocument] = useState("");
    const [pCost, setPCost] = useState("");

    //Change model to shadcn
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [errorStatus, setErrorStatus] = useState([]);

    const handleSave = () => {
        const vehicleData = {
            "date": date,
            "vehicleNo": vehicleNo,
            "make": make,
            "yom": yom,
            "cr": cr,
            "purchasedFrom": purchasedFrom,
            "document": document,
            "pCost": pCost
        };
        
        const status = HandleSaveChanges(vehicleData);
        setErrorStatus(status)
    }

    return(
        <div className="w-[95%] p-6 bg-white rounded-lg">
            <div className="w-full">
                <p className={`text-[#606060] text-xl font-bold`}>Add Vehicle Details</p>

                <div className="mt-8 flex w-full">
                    <div className="w-3/4 pr-6">
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
                                    label: "mr-2",
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
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
                            />

                            <DateInput
                                label="YOM"
                                labelPlacement="outside-left"
                                variant="flat"
                                granularity="year"
                                errorMessage={errorStatus[3]?.error}
                                isInvalid={errorStatus[3]?.isInvalid}
                                onChange={setYom}
                                classNames={{  
                                    label: "mr-16",  
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
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
                            >
                                <SelectItem key={false} className="rounded-lg hover:bg-[#ebebeb]">Pending</SelectItem>
                                <SelectItem key={true} className="rounded-lg hover:bg-[#ebebeb]">Ok</SelectItem>
                            </Select>

                            <Input
                                label="Purchased from"
                                labelPlacement="outside-left"
                                variant="flat"
                                className="w-full col-span-2"
                                errorMessage={errorStatus[5]?.error}
                                isInvalid={errorStatus[5]?.isInvalid}
                                onChange={(e) => setPurchasedFrom(e.target.value)}
                                classNames={{
                                    mainWrapper: ["ml-8 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
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
                                    mainWrapper: ["ml-8 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-xs mr-1">LKR</span>
                                    </div>
                                }
                            />
                        </div>
                    </div>

                    <div className="w-1/4 p-6 pb-2 border-l border-black/25 flex flex-col justify-end">
                        <CancellationModal />
                        
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