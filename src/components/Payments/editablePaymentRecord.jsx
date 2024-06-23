import { Button, DateInput, Input, Select, SelectItem, SelectSection } from "@nextui-org/react";
import { RiDraggable } from "react-icons/ri";
import { CiCircleMinus, CiEdit } from "react-icons/ci";
import { useState } from "react";

export default function EditablePaymentRecord({onDelete}) {

    return(
        <div className="w-full grid grid-cols-10 items-center rounded-lg border border-dashed border-black my-1">
            <Button 
                isIconOnly
                className="col-span-1 ml-3"
            >
                <RiDraggable />
            </Button>

            <DateInput
                isRequired
                variant="underlined"
                className="col-span-3"
            />

            <Select
                isRequired
                variant="underlined"
                placeholder="account"
                className="col-span-2"
                classNames={{
                    base: "w-5/6",
                    listboxWrapper: "bg-white shadow-lg rounded-lg",
                }}
            >
                <SelectSection
                    showDivider
                >
                    <SelectItem key="1">Cash</SelectItem>
                    <SelectItem key="2">DMK Auto</SelectItem>
                    <SelectItem key="3">DDW Online</SelectItem>
                    <SelectItem key="other">Other</SelectItem>
                </SelectSection>
            </Select>

            <Input
                isRequired
                variant="underlined"
                placeholder="amount"
                className="col-span-3 placeholder:text-black"
                startContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-xs mr-1">LKR</span>
                    </div>
                }
            />

            <Button
                isIconOnly
                onClick={onDelete}
                className="mx-auto"
            >
                <CiCircleMinus className="hover:text-red-500" />
            </Button>
        </div>
    )
}