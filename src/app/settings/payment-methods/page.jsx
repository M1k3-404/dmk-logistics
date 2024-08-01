"use client"

import { getAllPaymentTypes } from "@/actions/payment-types-actions";
import PaymentMethod from "@/components/Add Payment/paymentMethod";
import PaymentTypeCreationModal from "@/components/Add Payment/paymentTypeCreationModal";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";

export default function Page() {
    const [paymentTypes, setPaymentTypes] = useState([]);

    useEffect(() => {
        getAllPaymentTypes()
            .then(((data) => {
                setPaymentTypes(data);
                console.log("Payment Types Data:", data);
            }))
    }, [])

    return (
        <div className="w-[97%] max-h-[95%] bg-white rounded-lg overflow-y-auto">
            <div className="w-full p-8">
                <p className={`text-[#606060] text-xl font-bold`}>Payment Methods</p>

                <div className="mt-8 flex w-full">
                    <div className="w-3/4 p-6 pr-6 rounded-lg bg-[#f0f0f0]">
                        <p className="font-semibold">Payment Methods</p>

                        <div className="mt-4 w-1/4">
                            {paymentTypes.map((type, index) => (
                                <PaymentMethod key={index} data={type} />
                            ))}
                        </div>

                        <PaymentTypeCreationModal />
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