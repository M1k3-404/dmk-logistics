import { Button, DateInput, Input, Select, SelectItem, SelectSection } from "@nextui-org/react";
import { RiDraggable } from "react-icons/ri";
import RecordDeletionModal from "../Maintenance/recordDeletionModal";
import { useCallback, useMemo, useState } from "react";
import { CiCircleCheck, CiEdit, CiCircleMinus } from "react-icons/ci";
import { parseDate } from "@internationalized/date";
import { addPayment, editPayment } from "@/actions/payment-actions";

export default function PaymentRecord({record, newRecord, paymentTypes, editable, deleteNewRecord, vehicleId, onAddPayment}) {
    const [isNewRecord, setIsNewRecord] = useState(newRecord);
    const [isEditable, setIsEditable] = useState(editable);

    const id = isNewRecord ? null : record.id;
    const [formState, setFormState] = useState({
        date: isNewRecord ? null : parseDate(record.date.slice(0, 10)),
        account: isNewRecord ? null : record.account,
        amount: isNewRecord ? null : record.amount
    });

    const [errorStatus, setErrorStatus] = useState([]);

    const handleChange = useCallback((name, value) => {
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }, []);

    const handleSave = useCallback(() => {
        const requiredFields = addPayment(formState, paymentTypes, vehicleId, onAddPayment, setIsNewRecord);
        setErrorStatus(requiredFields);
    }, [formState, paymentTypes, vehicleId]);

    const handleEdit = useCallback(() => {
        const requiredFields = editPayment(formState, paymentTypes, vehicleId, id, setIsEditable);
        setErrorStatus(requiredFields);
    }, [formState, paymentTypes, vehicleId, id]);

    const renderSaveButton = useMemo(() => (
        <Button isIconOnly onClick={isNewRecord ? handleSave : handleEdit}>
            <CiCircleCheck className="hover:text-green-600" />
        </Button>
    ), [isNewRecord, handleSave, handleEdit]);

    const renderEditButton = useMemo(() => (
        <Button isIconOnly onClick={() => setIsEditable(true)}>
            <CiEdit className="hover:text-green-600" />
        </Button>
    ), []);

    const renderDeleteButton = useMemo(() => (
        isNewRecord ? (
            <Button isIconOnly className="mx-auto" onClick={deleteNewRecord}>
                <CiCircleMinus className="hover:text-red-500" />
            </Button>
        ) : (
            <RecordDeletionModal id={id} />
        )
    ), [isNewRecord, deleteNewRecord, id]);

    return(
        <div className={`w-full grid grid-cols-9 items-center rounded-lg border border-black my-1 ${ isEditable ? "border-dashed" : "border-solid"}`}>
            <Button isIconOnly className="col-span-1 ml-3">
                <RiDraggable />
            </Button>

            <DateInput 
                isReadOnly={!isEditable}
                value={formState.date}
                onChange={(value) => handleChange("date", value)}
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
                selectedKeys={formState.account ? [formState.account] : []}
                onChange={(e) => handleChange("account", e.target.value)}
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
                value={formState.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                startContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-xs mr-1">LKR</span>
                    </div>
                }
            />

            <div className="col-span-1 flex justify-start">
                { isEditable ? renderSaveButton : renderEditButton }
                { renderDeleteButton }
            </div>
        </div>
    )
}