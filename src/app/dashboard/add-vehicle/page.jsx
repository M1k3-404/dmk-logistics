"use client"
import { Button, DateInput, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, Select, SelectItem, useDisclosure } from "@nextui-org/react";
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

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const handleSave = () => {
        console.log("Date:", date);
        console.log("Vehicle No:", vehicleNo);
        console.log("Make:", make);
        console.log("YOM:", yom);
        console.log("CR:", cr);
        console.log("Purchased From:", purchasedFrom);
        console.log("Document:", document);
        console.log("P/Cost:", pCost);
    }

    const handleCancel = () => {
        setDate("");
        setVehicleNo("");
        setMake("");
        setYom("");
        setCr("");
        setPurchasedFrom("");
        setDocument("");
        setPCost("");

        location.href = "/dashboard";
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
                                classNames={{  
                                    label: "mr-2",  
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                }}
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
                            />
                        </div>
                    </div>

                    <div className="w-1/4 p-6 pb-2 border-l border-black/25 flex flex-col justify-end">
                        <Button 
                            className="bg-white text-[#0c0c0c] font-extralight rounded-md border hover:shadow-sm hover:text-red-600"
                            onPress={onOpen}
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

                    <Modal 
                        size="lg"
                        isDismissable={false}
                        backdrop="blur"
                        isOpen={isOpen} 
                        onOpenChange={onOpenChange}
                        classNames={{
                            base: "bg-white shadow-lg rounded-lg pt-4 px-2 py-4",
                            closeButton: "text-[#606060] hover:text-[#0c0c0c] hidden",
                            footer: "pb-0"
                        }}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalBody>
                                        <p>Are you sure you want to cancel this current process?</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button 
                                            size="sm"
                                            onClick={handleCancel}
                                            className="bg-[#0c0c0c] text-white font-extralight rounded-md hover:bg-[#1d1d1d]"
                                        >
                                            Yes
                                        </Button>
                                        <Button 
                                            size="sm"
                                            onPress={onClose}
                                            className="bg-white text-[#0c0c0c] font-extralight rounded-md border hover:shadow-sm"
                                        >
                                            No
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div>
            </div>
        </div>
    )
}