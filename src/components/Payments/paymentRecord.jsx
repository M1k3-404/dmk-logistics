import { Button, DateInput, Input, Select, SelectItem, SelectSection } from "@nextui-org/react";
import { RiDraggable } from "react-icons/ri";
import RecordDeletionModal from "../Maintenance/recordDeletionModal";
import { useState } from "react";
import { CiCircleCheck, CiEdit, CiCircleMinus } from "react-icons/ci";
import { parseDate } from "@internationalized/date";
import { addPayment, editPayment } from "@/actions/payment-actions";

export default function PaymentRecord({record, newRecord, paymentTypes, editable, deleteNewRecord, vehicleId}) {
    const [isNewRecord, setIsNewRecord] = useState(newRecord);
    const [isEditable, setIsEditable] = useState(editable);

    const id = isNewRecord ? null : record.id;
    const [date, setDate] = useState(isNewRecord ? null : parseDate(record.date));
    const [account, setAccount] = useState(isNewRecord ? null : record.account);
    const [amount, setAmount] = useState(isNewRecord ? null : record.amount);

    const [errorStatus, setErrorStatus] = useState([]);

    const handleSave = () => {
        const paymentRecord = {
            "date": date,
            "account": account,
            "amount": amount
        };

        const requiredFields = addPayment(paymentRecord, paymentTypes, vehicleId);
        setErrorStatus(requiredFields);
    }

    const handleEdit = () => {
        const paymentRecord = {
            "date": date,
            "account": account,
            "amount": amount
        };

        const requiredFields = editPayment(paymentRecord, paymentTypes, vehicleId, id, setIsEditable);
        setErrorStatus(requiredFields);
    }

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
                value={date}
                onChange={(value) => setDate(value)}
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
                selectedKeys={account ? [account] : []}
                onChange={(e) => setAccount(e.target.value)}
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
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
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
                            onClick={isNewRecord ? handleSave : handleEdit}
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
                        <RecordDeletionModal id={id} />
                    )
                }
            </div>
        </div>
    )
}