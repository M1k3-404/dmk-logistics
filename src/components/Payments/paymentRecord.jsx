import { Button, DateInput, Input, Select, SelectItem, SelectSection } from "@nextui-org/react";
import { RiDraggable } from "react-icons/ri";
import RecordDeletionModal from "../Maintenance/recordDeletionModal";
import { useEffect, useState } from "react";
import { CiCircleCheck, CiEdit, CiCircleMinus } from "react-icons/ci";
import { parseDate } from "@internationalized/date";

export default function PaymentRecord({record, newRecord, paymentTypes, editable, onDelete, deleteNewRecord}) {
    const [isNewRecord, setIsNewRecord] = useState(newRecord);
    const [isEditable, setIsEditable] = useState(editable);

    return(
        <div className={`w-full grid grid-cols-9 items-center rounded-lg border border-black my-1 ${ isEditable ? "border-dashed" : "border-solid"}`}>
            <Button 
                isIconOnly
                className="col-span-1 ml-3"
            >
                <RiDraggable />
            </Button>

            <DateInput 
                isReadOnly={!isEditable}
                defaultValue={!isNewRecord ? parseDate(record.date) : null}
                isRequired
                variant="underlined"
                className="col-span-2"
            />

            <Select
                isDisabled={!isEditable}
                isRequired
                variant="underlined"
                placeholder="account"
                className="col-span-2"
                defaultSelectedKeys={!isNewRecord ? [record.account] : []}
                classNames={{
                    base: "w-5/6",
                    popoverContent: "w-[200px]",
                    listboxWrapper: "bg-white shadow-lg rounded-lg",
                }}
            >
                <SelectSection
                    showDivider
                >
                    {paymentTypes.map((type) => (
                        <SelectItem key={type.paymentTitle}>{type.paymentTitle}</SelectItem>
                    ))}
                </SelectSection>
            </Select>

            <Input
                isReadOnly={!isEditable}
                isRequired
                variant="underlined"
                placeholder="amount"
                className="col-span-3 placeholder:text-black"
                defaultValue={!isNewRecord ? record.amount : null}
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

                {
                    isNewRecord ? (
                        <Button
                            isIconOnly
                            className="mx-auto"
                        >
                            <CiCircleMinus 
                                className="hover:text-red-500"
                                onClick={deleteNewRecord}
                            />
                        </Button>
                    ) : (
                        <RecordDeletionModal onDelete={onDelete} />
                    )
                }
            </div>
        </div>
    )
}