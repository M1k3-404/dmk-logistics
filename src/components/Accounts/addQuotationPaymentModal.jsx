"use client"

const { useState, useEffect } = require("react")
import { Button, DateInput, Input, Select, SelectItem, SelectSection } from "@nextui-org/react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "../ui/alert-dialog";
import { addQuotationPayment } from "@/actions/quotation-payment-actions";

const AddQuotationPaymentModal = ({ data, paymentTypes }) => {
    const [formState, setFormState] = useState({
        date: "",
        quotationId: data.quotationInformation.id,
        paymentTypeId: "",
        paymentAmount: "",
    });
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (session && session.userId) {
            setUserId(session.userId);
        } else {
            console.error("User is not logged in or session is missing userId.");
        }
    }, []);
    
    const handleInputChange = (field) => (value) => {
        setFormState((prev) => ({ ...prev, [field]: value }));
    }

    const handleSave = () => {
        const requiredFields = addQuotationPayment(formState, paymentTypes, userId);
        setFormState({
            date: "",
            quotationId: data.quotationInformation.id,
            paymentTypeId: "",
            paymentAmount: "",
        })
    }

    return (
        <div className="w-full rounded-lg flex justify-between items-center gap-x-12 my-2">
            <DateInput
                label="Date"
                labelPlacement="outside-left"
                variant="flat"
                onChange={handleInputChange("date")}
                classNames={{
                    label: "text-sm w-[24%]",
                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                }}
                className="mt-4"
                size="sm"          
            />

            <Select
                label="Account"
                labelPlacement="outside-left"
                variant="flat"
                className="mt-2"
                onChange={(e) => handleInputChange("paymentTypeId")(e.target.value)}
                classNames={{
                    base: "w-full p-2 flex items-center",
                    label: "text-sm w-[30%] mr-3",
                    trigger: "w-full bg-[#f5f5f5] rounded-lg",
                    popoverContent: "w-[200px]",
                    listboxWrapper: "bg-white shadow-lg rounded-lg",
                }}
            >
                <SelectSection
                    showDivider 
                    title={"Active"} 
                    classNames={{
                        heading: "text-xs text-default-500 ml-1",
                    }}
                >
                    {paymentTypes.filter((type) => type.entityStatus).map((type) => (
                        <SelectItem key={type.paymentTitle} className="hover:bg-black/5 rounded-md">{type.paymentTitle}</SelectItem>
                    ))}
                </SelectSection>
                <SelectSection 
                    showDivider 
                    title={"Inactive"}
                    classNames={{
                        heading: "text-xs text-default-500 ml-1",
                    }}
                >
                    {paymentTypes.filter((type) => !type.entityStatus).map((type) => (
                        <SelectItem key={type.paymentTitle} className="hover:bg-black/5 rounded-md" isDisabled>{type.paymentTitle}</SelectItem>
                    ))}
                </SelectSection>
            </Select>

            <Input
                type="number"
                label="Amount"
                labelPlacement="outside-left"
                variant="flat"
                onChange={e => handleInputChange("paymentAmount")(e.target.value)}
                classNames={{
                    mainWrapper: "w-full",
                    label: "text-sm w-[30%] mr-3",
                    inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                    input: "text-left text-sm text-black",
                }}
                className="mt-2"
                size="sm"
            />

            <Button
                size="sm"
                className="bg-[#0c0c0c] mt-2 px-12 text-white font-extralight rounded-md hover:bg-[#1d1d1d]"
                onClick={handleSave}
            >
                pay
            </Button>
        </div>
    )
}

export default AddQuotationPaymentModal;