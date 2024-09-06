"use client"

import { addVehicle } from "@/actions/vehicle/vehicle-add-action";
import CancellationModal from "@/components/Add Vehicle/cancellationModal";
import { useFormState } from "@/lib/hooks/useFormState";
import { Button, DateInput, Input, Select, SelectItem } from "@nextui-org/react";
import { memo, useEffect, useState } from "react";

const initialState = {
    date: "",
    vehicleNo: "",
    make: "",
    yom: "",
    cr: "",
    purchasedFrom: "",
    document: "",
    pCost: ""
};

const Page = () => {
    const [formState, handleChange, handleDateChange, errorStatus, setErrorStatus] = useFormState(initialState);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (session) {
            setUserId(session.userId);
        } else {
            console.error("User is not logged in or session is missing userId.");
        }
    }, []);

    const handleSave = async () => {
        const errors = await addVehicle(formState, userId);
        setErrorStatus(errors);
    }

    return (
        <div className="w-[95%] p-6 bg-white rounded-lg">
            <div className="w-full">
                <p className={`text-[#606060] text-xl font-bold`}>Add Vehicle Details</p>

                <div className="mt-8 flex w-full">
                    <div className="w-3/4 pr-6">
                        <div className="w-full grid grid-cols-2 gap-x-12 gap-y-6 pb-5">
                            <DateInput
                                name="date"
                                label="Date of Purchase"
                                labelPlacement="outside-left"
                                variant="flat"
                                format="dd/MM/yyyy"
                                errorMessage={errorStatus.date}
                                isInvalid={!!errorStatus.date}
                                onChange={(date) => handleDateChange('date', date)} 
                                classNames={{  
                                    label: "mr-2",  
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                            />

                            <Input
                                name="vehicleNo"
                                label="Vehicle No"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus.vehicleNo}
                                isInvalid={!!errorStatus.vehicleNo}
                                onChange={(e) => handleChange(e)}
                                classNames={{
                                    mainWrapper: ["ml-8 w-full"],
                                    label: "mr-2",
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                            />

                            <Input
                                name="make"
                                label="Make"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus.make}
                                isInvalid={!!errorStatus.make}
                                onChange={(e) => handleChange(e)}
                                classNames={{
                                    mainWrapper: ["ml-24 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                            />

                            <DateInput
                                name="yom"
                                label="YOM"
                                labelPlacement="outside-left"
                                variant="flat"
                                granularity="year"
                                errorMessage={errorStatus.yom}
                                isInvalid={!!errorStatus.yom}
                                onChange={(yom) => handleDateChange('yom', yom)}
                                classNames={{  
                                    label: "mr-16",  
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                            />

                            <Select
                                name="cr"
                                label="CR"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus.cr}
                                isInvalid={!!errorStatus.cr}
                                onChange={(e) => handleChange(e)}
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
                                name="purchasedFrom"
                                label="Purchased from"
                                labelPlacement="outside-left"
                                variant="flat"
                                className="w-full col-span-2"
                                errorMessage={errorStatus.purchasedFrom}
                                isInvalid={!!errorStatus.purchasedFrom}
                                onChange={(e) => handleChange(e)}
                                classNames={{
                                    mainWrapper: ["ml-8 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                            />

                            <Input
                                name="document"
                                label="Document"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus.document}
                                isInvalid={!!errorStatus.document}
                                onChange={(e) => handleChange(e)}
                                classNames={{
                                    mainWrapper: ["ml-14 w-full"],
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    errorMessage: "text-red-600 text-xs"
                                }}
                            />

                            <Input
                                name="pCost"
                                type="number"
                                label="P/Cost"
                                labelPlacement="outside-left"
                                variant="flat"
                                errorMessage={errorStatus.pCost}
                                isInvalid={!!errorStatus.pCost}
                                onChange={(e) => handleChange(e)}
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

export default memo(Page);