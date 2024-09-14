import { Button, DateInput, DatePicker, Input, Select, SelectItem, SelectSection } from "@nextui-org/react";
import { RiDraggable } from "react-icons/ri";
import RecordDeletionModal from "../Maintenance/recordDeletionModal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CiCircleCheck, CiEdit, CiCircleMinus } from "react-icons/ci";
import { parseDate } from "@internationalized/date";
import { addPayment, editPayment } from "@/actions/payment-actions";

export default function PaymentRecord({record, newRecord, paymentTypes, editable, deleteNewRecord, vehicleId, onAddPayment}) {
    const [isNewRecord, setIsNewRecord] = useState(newRecord);
    const [isEditable, setIsEditable] = useState(editable);

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (session) {
            setUserId(session.userId);
        } else {
            console.error("User is not logged in or session is missing userId.");
        }
    }, []);

    console.log('Record:', record);
    const id = isNewRecord ? null : record.id;
    const [formState, setFormState] = useState({
        date: isNewRecord ? null : parseDate(record.date),
        account: isNewRecord ? null : record.paymentTypeId,
        amount: isNewRecord ? null : record.paymentAmount
    });

    const [errorStatus, setErrorStatus] = useState([]);

    const handleChange = useCallback((name, value) => {
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }, []);

    const handleSave = useCallback(() => {
        const requiredFields = addPayment(formState, paymentTypes, vehicleId, onAddPayment, setIsNewRecord, userId);
        setErrorStatus(requiredFields);
    }, [formState, paymentTypes, vehicleId, onAddPayment, userId]);

    const handleEdit = useCallback(() => {
        const requiredFields = editPayment(formState, paymentTypes, vehicleId, id, setIsEditable, userId);
        setErrorStatus(requiredFields);
    }, [formState, paymentTypes, vehicleId, id, userId]);

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
            <RecordDeletionModal recordType={"payment"} id={id} />
        )
    ), [isNewRecord, deleteNewRecord, id]);

    const headingClasses = "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small";

    return(
        <div className={`w-full grid grid-cols-9 items-center rounded-lg border border-black my-1 ${ isEditable ? "border-dashed" : "border-solid"}`}>
            <Button isIconOnly className="col-span-1 ml-3">
                <RiDraggable />
            </Button>

            <DatePicker
                isReadOnly={!isEditable}
                value={formState.date}
                onChange={(value) => handleChange("date", value)}
                isRequired
                classNames={{
                    base: "w-[60%]",
                    popoverContent: "bg-white shadow-lg rounded-lg",
                }}
                variant="underlined"
                className="col-span-2"
            />
            {/* <DateInput 
                isReadOnly={!isEditable}
                value={formState.date}
                onChange={(value) => handleChange("date", value)}
                isRequired
                variant="underlined"
                className="col-span-2"
            /> */}

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