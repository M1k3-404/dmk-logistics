'use client'

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import AccountsDashboard from "./accountsDashboard";
import { getAllAccounts } from "@/actions/accounts-actions";
import { getAllVendors } from "@/actions/vendors-actions";

const Tabs = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [accounts, setAccounts] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [reload, setReload] = useState(false);

    const fetchAccounts = async () => {
        try {
            setAccounts(await getAllAccounts());
            setVendors(await getAllVendors());
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    }

    useEffect(() => {
        fetchAccounts();
    }, [reload]);

    const items = [
        { title: "Accounts", content: <AccountsDashboard data={accounts} tab="account" /> },
        { title: "Vendors", content: <AccountsDashboard data={vendors} tab="vendor" reload={setReload} /> },
    ]

    return (
        <div className="w-full h-full">
            <div className="pt-6 mx-8 flex justify-between items-center">
                <div className="flex space-x-2">
                    {items.map((item, index) => (
                        <Button
                            key={index}
                            onClick={() => setSelectedTab(index)}
                            className={`bg-transparent text-[#606060] rounded-lg font-bold px-5 py-1 transition-colors duration-200 ease-in-out ${selectedTab === index ? 'bg-green-200 text-black' : 'hover:text-black'}`}
                        >
                            {item.title}
                        </Button>
                    ))}
                </div>

                <Button
                    className="bg-[#0c0c0c] hover:bg-[#1d1d1d] px-4 py-1 text-white font-light rounded-lg"
                    as={Link}
                    href="/accounts/add-transaction"
                >
                    <IoIosAddCircle />
                    Transaction
                </Button>
            </div>

            <div className="mt-8 mx-8">
                {items[selectedTab].content}
            </div>
        </div>
    )
}

export default memo(Tabs);