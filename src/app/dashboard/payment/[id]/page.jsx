"use client"

import { getAllPaymentTypes } from "@/actions/payment-types-actions";
import EditablePaymentRecord from "@/components/Payments/editablePaymentRecord";
import PaymentRecord from "@/components/Payments/paymentRecord";
import { vehicles } from "@/components/vehicleData";
import { parseDate } from "@internationalized/date";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Payment({ params }) {
    const { id } = params;
    const searchParams = useSearchParams();
    const vehicleQuery = searchParams.get("vehicle");

    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);

    const [date, setDate] = useState(null);
    const [vehicleNo, setVehicleNo] = useState(null);
    const [cr, setCr] = useState(null);
    const [purchasedFrom, setPurchasedFrom] = useState(null);
    const [pCost, setPCost] = useState(null);
    const [pRemaining, setPRemaining] = useState(null);
    const [payments, setPayments] = useState([]);

    const [paymentTypes, setPaymentTypes] = useState([]);

    useEffect(() => {
        if (vehicleQuery) {
            setVehicle(JSON.parse(vehicleQuery));
            setLoading(false);
            console.log(vehicleQuery);

            setDate(parseDate(JSON.parse(vehicleQuery).date));
            setVehicleNo(JSON.parse(vehicleQuery).vehicleNo);
            setCr(JSON.parse(vehicleQuery).cr);
            setPurchasedFrom(JSON.parse(vehicleQuery).purchasedFrom);
            setPCost(JSON.parse(vehicleQuery).pCost);
            setPRemaining(JSON.parse(vehicleQuery).pRemaining);
            setPayments(JSON.parse(vehicleQuery).payments);
        }
    }, [])

    useEffect(() => {
        getAllPaymentTypes()
            .then(((data) => {
                setPaymentTypes(data);
                console.log("Payment Types Data:", data);
            }))
    }, [])

    const [editableRecords, setEditableRecords] = useState([]);

    const handleAddNewRecord = () => {
        setEditableRecords((prevRecords) => [...prevRecords, {}]);
    }

    const handleDeleteNewRecord = (index) => {
        setEditableRecords((prevRecords) => {
            const updatedRecords = [...prevRecords];
            updatedRecords.splice(index);
            return updatedRecords;
        })
    }

    // const handleEditRecord = (index) => {
    //     //Edit
    // }

    // const handleDeleteRecord = (index) => {
    //     //Delete
    // }

    // const handleSaveRecord = (index) => {
    //     //Save
    // }

    if (loading) {
        return <div className="w-[95%] h-[25%] p-6 bg-white rounded-lg">Loading...</div>
    }

    return(
        <div className="w-[95%] p-6 bg-white rounded-lg overflow-y-auto">
            <div className="w-full">
                <p className={`text-[#606060] text-xl font-bold`}>Payments</p>  

                <div className="mt-8 flex w-full">
                    <div className="w-3/4 pr-6 pl-12">
                        <div className="w-full grid grid-cols-2 gap-x-12 gap-y-6 pb-5 border-b border-black/25">
                            <Input
                                label="Date"
                                labelPlacement="outside-left"
                                variant="flat"
                                isReadOnly
                                classNames={{
                                    base: "w-full",
                                    label: "mr-2 w-[25%]",
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.date}
                            />

                            <Input
                                label="Vehicle No"
                                labelPlacement="outside-left"
                                variant="flat"
                                isReadOnly
                                classNames={{
                                    base: "w-full",
                                    label: "mr-2 w-[25%]",
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.vehicleNo}
                            />

                            <Input
                                label="CR"
                                labelPlacement="outside-left"
                                variant="flat"
                                isReadOnly
                                classNames={{
                                    base: "w-full",
                                    label: "mr-2 w-[25%]",
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.cr}
                            />

                            <Input
                                label="Purchased From"
                                labelPlacement="outside-left"
                                variant="flat"
                                isReadOnly
                                classNames={{
                                    base: "w-full",
                                    label: "mr-2 w-[25%]",
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.purchasedFrom}
                            />

                            <Input
                                label="P/Cost"
                                labelPlacement="outside-left"
                                variant="flat"
                                isReadOnly
                                classNames={{
                                    base: "w-full",
                                    label: "mr-2 w-[25%]",
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.pCost}
                            />

                            <Input
                                label="P/Remaining"
                                labelPlacement="outside-left"
                                variant="flat"
                                isReadOnly
                                classNames={{
                                    base: "w-full",
                                    label: "mr-2 w-[25%]",
                                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.pRemaining}
                            />
                        </div>

                        <div className="w-full py-5">
                            <p className="mb-4 font-medium">Payments</p>
                            {vehicle.payments.map((payment, index) => {
                                return(
                                    <PaymentRecord 
                                        key={index}
                                        record={payment}
                                        paymentTypes={paymentTypes}
                                        editable={false}
                                        newRecord={false}
                                        onDelete={() => handleDeleteRecord(index)}
                                    />
                                )
                            })}
                            {editableRecords.map((_, index) => {
                                return(
                                    <PaymentRecord
                                        key={index}
                                        record={_}
                                        paymentTypes={paymentTypes}
                                        editable={true}
                                        newRecord={true}
                                        onDelete={() => handleDeleteNewRecord(index)}
                                        deleteNewRecord = {handleDeleteNewRecord}
                                    />
                                )
                            })}
                            <Button
                                className="w-full bg-transparent rounded-lg border border-black"
                                onClick={handleAddNewRecord}
                            >
                                Add New Payment
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