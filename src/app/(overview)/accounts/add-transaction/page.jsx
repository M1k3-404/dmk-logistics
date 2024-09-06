'use client' 

import { getAllAccounts } from "@/actions/accounts-actions";
import { addGeneralTransaction } from "@/actions/transaction-actions";
import { Button, DateInput, Input, Select, SelectItem } from "@nextui-org/react";
import { memo, useCallback, useEffect, useState } from "react";

const Page = () => {
    const [formState, setFormState] = useState({
        from: "",
        to: "",
        date: "",
        amount: "",
        description: "",
    });
    const [accounts, setAccounts] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (session) {
            setUserId(session.userId);
        } else {
            console.error("User is not logged in or session is missing userId.");
        }
    }, []);

    const fetchAccounts = async () => {
        try {
            setAccounts(await getAllAccounts());
        } catch (error) {
            console.error('Error fetching payment types:', error);
        }
    }

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleChange = useCallback((name, value) => {
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }, []);

    const handleSave = useCallback(() => {
        const requiredFields = addGeneralTransaction(formState, accounts, userId);
    }, [formState, accounts, userId]);

    return(
        <div className="w-[97%] p-6 bg-white rounded-lg">
            <p className={`text-[#606060] text-xl font-bold`}>General Transaction</p>

            <div className="mt-8">
                <Select
                    name="from"
                    label="From"
                    labelPlacement="inside"
                    placeholder="Select account"
                    variant="flat"
                    className="mb-6"
                    onChange={(e) => handleChange("from", e.target.value)}
                    classNames={{
                        label: "mb-10 font-medium",
                        popoverContent: "w-[300px]",
                        listboxWrapper: "bg-white shadow-lg rounded-lg",
                    }}
                >
                    {accounts.map((type) => (
                        <SelectItem key={type.account.accountName}>{type.account.accountName}</SelectItem>
                    ))}
                </Select>

                <Select
                    name="to"
                    label="To"
                    labelPlacement="inside"
                    placeholder="Select account"
                    variant="flat"
                    className="mb-6"
                    onChange={(e) => handleChange("to", e.target.value)}
                    classNames={{
                        label: "mb-10 font-medium",
                        popoverContent: "w-[300px]",
                        listboxWrapper: "bg-white shadow-lg rounded-lg",
                    }}
                >
                    {accounts.map((type) => (
                        <SelectItem key={type.account.accountName}>{type.account.accountName}</SelectItem>
                    ))}
                </Select>

                <DateInput
                    name="date"
                    label="Date"
                    labelPlacement="inside"
                    variant="flat"
                    className="mb-6"
                    onChange={(value) => handleChange("date", value)}
                    classNames={{
                        mainWrapper: "rounded-lg p-2",
                        label: "font-medium",
                    }}
                />

                <Input
                    name="amount"
                    type="number"
                    label="Amount"
                    labelPlacement="inside"
                    placeholder="Enter amount"
                    variant="flat"
                    className="mb-6"
                    onChange={(e) => handleChange("amount", e.target.value)}
                    classNames={{
                        label: "mb-10 font-medium",
                    }}
                />

                <Input
                    name="description"
                    label="Description"
                    labelPlacement="inside"
                    placeholder="Enter description"
                    variant="flat"
                    onChange={(e) => handleChange("description", e.target.value)}
                    classNames={{
                        label: "mb-10 font-medium",
                    }}
                />
            </div>

            <div className="flex justify-end gap-x-4 mt-16">
                <Button
                    size="sm"
                    className="bg-white px-12 text-[#0c0c0c] font-extralight rounded-md border hover:shadow-sm hover:bg-white"
                    onClick={() => window.location.href = "/accounts"}
                >
                    Cancel
                </Button>
                <Button
                    size="sm"
                    className="bg-[#0c0c0c] px-12 text-white font-extralight rounded-md hover:bg-[#1d1d1d]"
                    onClick={handleSave}
                >
                    Send
                </Button>
            </div>
        </div>
    )
}

export default memo(Page);