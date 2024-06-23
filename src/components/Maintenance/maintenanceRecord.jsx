import { Button, DateInput, Input, Select, SelectItem, SelectSection } from "@nextui-org/react";
import { RiDraggable } from "react-icons/ri";
import RecordDeletionModal from "./recordDeletionModal";
import { useState } from "react";
import { parseDate } from "@internationalized/date";
import { CiCircleCheck, CiEdit } from "react-icons/ci";

export default function MaintenaceRecord({record, onDelete}) {
    const [isEditable, setIsEditable] = useState(false);

    return(
        <div className="w-full grid grid-cols-10 items-center rounded-lg border border-black my-1">
            <Button 
                isIconOnly
                className="col-span-1 ml-3"
            >
                <RiDraggable />
            </Button>

            <DateInput 
                isReadOnly={!isEditable}
                defaultValue={parseDate(record.date)}
                isRequired
                variant="underlined"
                className="col-span-2"
            />

            <Select
                isDisabled={!isEditable}
                isRequired
                variant="underlined"
                placeholder="description"
                className="col-span-2"
                defaultSelectedKeys={[record.description.toLowerCase()]}
                classNames={{
                    base: "w-3/5",
                    listboxWrapper: "bg-white shadow-lg rounded-lg"
                }}
            >
                <SelectSection
                    showDivider
                >
                    <SelectItem key="repair">Repair</SelectItem>
                    <SelectItem key="tyres">Tyres</SelectItem>
                    <SelectItem key="battery">Battery</SelectItem>
                    <SelectItem key="bro">BRO</SelectItem>
                    <SelectItem key="other">Other</SelectItem>
                </SelectSection>
            </Select>

            <Select
                isDisabled={!isEditable}
                isRequired
                variant="underlined"
                placeholder="account"
                className="col-span-2"
                defaultSelectedKeys={[record.account.toLowerCase()]}
                classNames={{
                    base: "w-5/6",
                    listboxWrapper: "bg-white shadow-lg rounded-lg",
                }}
            >
                <SelectSection
                    showDivider
                >
                    <SelectItem key="cash">Cash</SelectItem>
                    <SelectItem key="dmk auto">DMK Auto</SelectItem>
                    <SelectItem key="bank">DDW Online</SelectItem>
                    <SelectItem key="other">Other</SelectItem>
                </SelectSection>
            </Select>

            <Input
                isReadOnly={!isEditable}
                isRequired
                variant="underlined"
                placeholder="amount"
                className="col-span-2 placeholder:text-black"
                defaultValue={record.amount}
                startContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-xs mr-1">LKR</span>
                    </div>
                }
            />

            <div className="col-span-1 flex justify-start">
                {
                    isEditable ? (
                        <Button
                            isIconOnly
                            onClick={() => setIsEditable(false)}
                        >
                            <CiCircleCheck className="hover:text-green-600" />
                        </Button>
                    ) : (
                        <Button
                            isIconOnly
                            onClick={() => setIsEditable(true)}
                        >
                            <CiEdit className="hover:text-green-600" />
                        </Button>
                    )
                }

                <RecordDeletionModal onDelete={onDelete} />
            </div>
        </div>
    )
}