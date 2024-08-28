import { getVehicleBYId } from "@/actions/vehicle-actions";
import { Button, Chip, DateInput, Input, Select, SelectItem, SelectSection } from "@nextui-org/react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { CiCircleCheck, CiCircleMinus, CiEdit } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import { RiDraggable } from "react-icons/ri";
import RecordDeletionModal from "../Maintenance/recordDeletionModal";
import { parseDate } from "@internationalized/date";
import { addQuotation, editQuotation } from "@/actions/quotation-actions";

const Quotation = ({ data, newRecord, editable, vendors, maintenanceTypes, deleteNewRecord, vehicleId, onAddQuotation }) => {
    const [isNewRecord, setIsNewRecord] = useState(newRecord);
    const [isEditable, setIsEditable] = useState(editable);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (session && session.userId) {
            setUserId(session.userId);
        } else {
            console.error("User is not logged in or session is missing userId.");
        }
    }, []);

    console.log('quote:', data);
    const id = isNewRecord ? null : data.quotationInformation.id;
    const [formState, setFormState] = useState({
        date: isNewRecord ? null : parseDate(data.quotationInformation.quotationDate),
        vendor: isNewRecord ? null : data.quotationInformation.vendorId,
        maintenanceType: isNewRecord ? null : data.quotationInformation.maintenanceTypeId,
        quotedAmount: isNewRecord ? null : data.quotationInformation.quotedAmount,
        isCompleted: isNewRecord ? false : data.quotationInformation.isCompleted
    });

    const [errorStatus, setErrorStatus] = useState([]);

    const handleChange = useCallback((name, value) => {
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }, []);

    const handleSave = useCallback(() => {
        const requiredFields = addQuotation(formState, vendors, maintenanceTypes, vehicleId, userId);
        setErrorStatus(requiredFields);
    }, [formState, vendors, maintenanceTypes, vehicleId, userId]);

    const handleEdit = useCallback(() => {
        const requiredFields = editQuotation(formState, vendors, maintenanceTypes, vehicleId, id, setIsEditable, userId);
        setErrorStatus(requiredFields);
    }, [formState, vendors, maintenanceTypes, vehicleId, id, userId]); 

    const renderSaveButton = useMemo(() => (
        <Button isIconOnly 
        onClick={isNewRecord ? handleSave : handleEdit}
        >
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
            <RecordDeletionModal recordType={"quotation"} id={id} />
        )
    ), [isNewRecord, deleteNewRecord, id]);

    return(
        <div className={`w-full grid grid-cols-11 items-center rounded-lg border border-black my-1 ${ isEditable ? "border-dashed" : "border-solid"}`}>
            <Button isIconOnly className="col-span-1 ml-3">
                <RiDraggable />
            </Button>
            
            <div className="col-span-2 text-left flex justify-start items-center gap-x-6">
                <FaCircleCheck className={!formState.isCompleted && "invisible"} />
                <DateInput
                    isReadOnly={!isEditable}
                    value={formState.date}
                    format="yyyy-MM-dd"
                    onChange={(value) => handleChange("date", value)}
                    isRequired
                    variant="underlined"
                />
            </div>

            <Select
                isDisabled={!isEditable}
                isRequired
                variant="underlined"
                placeholder="vendor"
                className="col-span-2"
                selectedKeys={formState.vendor ? [formState.vendor] : []}
                onChange={(e) => handleChange("vendor", e.target.value)}
                classNames={{
                    base: "w-full",
                    popoverContent: "w-[200px]",
                    listboxWrapper: "bg-white shadow-lg rounded-lg",
                }}
            >
                <SelectSection
                    showDivider
                >
                    {vendors.map((vendor) => (
                        <SelectItem key={vendor.vendorInfo.vendorName}>{vendor.vendorInfo.vendorName}</SelectItem>
                    ))}
                </SelectSection>
            </Select>

            <Select
                isDisabled={!isEditable}
                isRequired
                variant="underlined"
                placeholder="maintenace"
                className="col-span-2"
                selectedKeys={formState.maintenanceType ? [formState.maintenanceType] : []}
                onChange={(e) => handleChange("maintenanceType", e.target.value)}
                classNames={{
                    base: "w-full",
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
                    {maintenanceTypes.filter((type) => type.entityStatus).map((type) => (
                        <SelectItem key={type.maintenanceTypeName} className="hover:bg-black/5 rounded-md">{type.maintenanceTypeName}</SelectItem>
                    ))}
                </SelectSection>
                <SelectSection
                    showDivider
                    title={"Inactive"}
                    classNames={{
                        heading: "text-xs text-default-500 ml-1",
                    }}
                >
                    {maintenanceTypes.filter((type) => !type.entityStatus).map((type) => (
                        <SelectItem key={type.maintenanceTypeName} className="hover:bg-black/5 rounded-md" isDisabled>{type.maintenanceTypeName}</SelectItem>
                    ))}
                </SelectSection>
            </Select>

            <Input
                isReadOnly={!isEditable}
                isRequired
                variant="underlined"
                placeholder="quoted amount"
                className="col-span-3 placeholder:text-black"
                value={formState.quotedAmount}
                onChange={(e) => handleChange("quotedAmount", e.target.value)}
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

export default memo(Quotation);