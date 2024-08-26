"use client"

import { getVendorById } from "@/actions/vendors-actions";
import Quotation from "@/components/Accounts/quotation";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { memo, useEffect, useState } from "react"

const Vendor = ({ params }) => {
    const { id } = params;
    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    const balance = searchParams.get("balance");
    const quotations = JSON.parse(decodeURIComponent(searchParams.get("quotations")));

    const [state, setState] = useState({
        loading: true,
        vendor: null,
    });

    useEffect(() => {
        const initializePage = async () => {
            try {
                const vendor = await getVendorById(id);
                console.log('Vendor:', vendor);

                setState({
                    loading: false,
                    vendor: vendor
                });
            } catch (error) {
                console.error('Error initializing page:', error);
            }
        };

        initializePage();
    }, [id]);

    if (state.loading) {
        return <div className="w-[95%] h-[25%] p-6 bg-white rounded-lg">Loading...</div>
    }

    return (
        <div className="w-[97%] h-[95%] bg-white rounded-lg">
            <div className="w-full h-full">
                <Button className="mt-3 ml-2 rounded-lg" as={Link} href="/accounts">Back</Button>

                <div className="mt-4 mx-8 flex justify-between items-center pb-4 border-b">
                    <div>
                        <p className="text-2xl font-bold">{state.vendor.vendorInfo.vendorName}</p>
                        <p className="text-sm">Total Quotations: <span>{state.vendor.listOfQuotations.length}</span></p>
                    </div>

                    <div className="bg-[#f4f4f4] rounded-lg px-10 py-2 text-center">
                        <p className="text-sm">Total Due</p>
                        <p className="text-lg font-semibold">LKR {state.vendor.vendorInfo.totalDue}.00</p>
                    </div>
                </div>

                <div className="mt-2 mx-8 h-[75%] overflow-y-auto">
                    {state.vendor.listOfQuotations.map((record, index) => (
                        <Quotation data={record} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default memo(Vendor);