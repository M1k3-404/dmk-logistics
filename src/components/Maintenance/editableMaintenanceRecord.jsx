import { Button, DateInput, Input, Select, SelectItem, SelectSection } from "@nextui-org/react";
import { RiDraggable } from "react-icons/ri";
import { CiCircleCheck, CiCircleMinus } from "react-icons/ci";
import { useEffect, useState } from "react";
import { HandleSaveChanges } from "@/actions/maintenance-actions";

export default function EditableMaintenaceRecord({onDelete}) {
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [account, setAccount] = useState("");
    const [amount, setAmount] = useState("");

    const [isInvalid, setIsInvalid] = useState(false);

    // useEffect(() => {
    //     const hasError = errorStatus.some(field => field.isInvalid);
    //     setIsInvalid(hasError);
    // }, [errorStatus]);

    // useEffect(() => {
    //     newRecord({
    //         date: date,
    //         description: description,
    //         account: account,
    //         amount: amount
    //     })
    // }, [date, description, account, amount]);

    const handleSave = () => {
        const record = {
            date: date,
            description: description,
            account: account,
            amount: amount
        }

        const status = HandleSaveChanges(record);
        setIsInvalid(status);
    }

    return(
        <div className={`w-full grid grid-cols-10 items-center rounded-lg border border-dashed my-1 ${isInvalid ? 'border-red-500' : 'border-black'}`}>
            <Button 
                isIconOnly
                className="col-span-1 ml-3"
            >
                <RiDraggable />
            </Button>
            <DateInput
                variant="underlined"
                className="col-span-2"
                onChange={setDate}
            />
            <Select
                isRequired
                variant="underlined"
                placeholder="description"
                className="col-span-2"
                classNames={{
                    base: "w-3/5",
                    listboxWrapper: "bg-white shadow-lg rounded-lg"
                }}
                onChange={(e) => setDescription(e.target.value)}
            >
                <SelectSection
                    showDivider
                >
                    <SelectItem key={1}>Repair</SelectItem>
                    <SelectItem key={2}>Tyres</SelectItem>
                    <SelectItem key={3}>Battery</SelectItem>
                    <SelectItem key={4}>BRO</SelectItem>
                    <SelectItem key={5}>Other</SelectItem>
                </SelectSection>
            </Select>
            <Select
                isRequired
                variant="underlined"
                placeholder="account"
                className="col-span-2"
                classNames={{
                    base: "w-5/6",
                    listboxWrapper: "bg-white shadow-lg rounded-lg",
                }}
                onChange={(e) => setAccount(e.target.value)}
            >
                <SelectSection
                    showDivider
                >
                    <SelectItem key={1}>Cash</SelectItem>
                    <SelectItem key={2}>DMK Auto</SelectItem>
                    <SelectItem key={3}>DDW Online</SelectItem>
                    <SelectItem key={4}>Other</SelectItem>
                </SelectSection>
            </Select>
            <Input
                type="number"
                variant="underlined"
                placeholder="amount"
                className="col-span-2 placeholder:text-black"
                onChange={(e) => setAmount(e.target.value)}
            />

            <div className="col-span-1 flex justify-start">
                <Button
                    isIconOnly
                    onClick={handleSave}
                >
                    <CiCircleCheck className="hover:text-green-600" />
                </Button>
                <Button
                    isIconOnly
                    className="mx-auto"
                    onClick={onDelete}
                >
                <CiCircleMinus className="hover:text-red-500" />
            </Button>
            </div>
        </div>
    )
}