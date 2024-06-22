"use client"

import EditablePaymentMethod from "@/components/Add Payment/editablePaymentMethod";
import PaymentMethod from "@/components/Add Payment/paymentMethod";
import { paymentTypes } from "@/components/vehicleData";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

export default function() {
    const [editableRecords, setEditableRecords] = useState([]);

    const handleAddRecord = () => {
        setEditableRecords((prevRecords) => [...prevRecords, {}]);
    }

    const handleDeleteRecord = (index) => {
        paymentTypes.splice(index);
    }

    const handleDeleteNewRecord = (index) => {
        setEditableRecords((prevRecords) => {
            const updatedRecords = [...prevRecords];
            updatedRecords.splice(index);
            return updatedRecords;
        })
    }

    return(
        <div className="w-[95%] p-6 bg-white rounded-lg overflow-auto">
            <div className="w-full">
                <Breadcrumbs
                    separator="/"
                    itemClasses={{
                        separator: "text-xl font-bold px-2"
                    }}
                >
                    <BreadcrumbItem>
                        <p className={`text-[#606060] text-xl font-bold`}>Settings</p>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <p className={`text-[#606060] text-xl font-bold`}>Add Payment Methods</p>
                    </BreadcrumbItem>
                </Breadcrumbs>  
                <p className="mt-1 text-sm">Add any additional payment methods.</p>

                <div className="mt-8 flex w-full">
                    <div className="w-3/4 pr-6 pl-12">
                        <p className="font-semibold">Payment Methods</p>
                        <div className="mt-4 w-1/4">
                            {paymentTypes.map((paymentType, index) => {
                                return(
                                    <PaymentMethod 
                                        key={index} 
                                        account={paymentType.name}
                                        onDelete={() => handleDeleteRecord(index)}
                                    />
                                )
                            })}
                            {editableRecords.map((_, index) => (
                                <EditablePaymentMethod 
                                    key={index}
                                    onDelete={() => handleDeleteNewRecord(index)}
                                />
                            ))}
                            <Button
                                className="w-full mt-1 bg-transparent border border-black rounded-lg hover:bg-[#0c0c0c] hover:text-white"
                                onClick={handleAddRecord}
                            >
                                <BsFillPlusCircleFill />
                                <span>Add Payment Method</span>
                            </Button>
                        </div>
                    </div>

                    <div className="w-1/4 pb-2 p-6 border-l border-black/25 flex flex-col justify-end">
                        <Button
                            as={Link}
                            href="/dashboard"
                            className="bg-white text-[#0c0c0c] font-extralight rounded-md border hover:shadow-sm hover:text-red-600"
                        >
                            Cancel
                        </Button>
                        <Button 
                            as={Link}
                            href="/dashboard"
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