"use client"

import Transaction from "@/components/Accounts/transaction";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { memo } from "react"

const Account = ({ params }) => {
    const { id } = params;
    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    const balance = searchParams.get("balance");
    const transactions = JSON.parse(decodeURIComponent(searchParams.get("transactions")));

    console.log("tr:", transactions);

    return (
        <div className="w-[97%] h-[95%] bg-white rounded-lg">
            <div className="w-full h-full">
                <Button className="mt-3 ml-2 rounded-lg" as={Link} href="/accounts">Back</Button>

                <div className="mt-4 mx-8 flex justify-between items-center pb-4 border-b">
                    <div>
                        <p className="text-2xl font-bold">{name}</p>
                        <p className="text-sm">Total Transactions: <span>{transactions.length}</span></p>
                    </div>

                    <div className="bg-[#f4f4f4] rounded-lg px-10 py-2 text-center">
                        <p className="text-sm">Balance</p>
                        <p className="text-lg font-semibold">LKR {balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                    </div>
                </div>

                <div className="mt-2 mx-8 h-[75%] overflow-y-auto">
                    {transactions.map((record, index) => (
                        <Transaction data={record} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default memo(Account);