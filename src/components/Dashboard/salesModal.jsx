import { Button, Input } from "@nextui-org/react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { useState } from "react";
import { HandleSaveChanges } from "@/actions/sales-actions";

export default function SalesModal({ btnText, vehicle }) {
    const [openModal, setOpenModal] = useState(false);

    const [date, setDate] = useState("");
    const [buyerName, setBuyerName] = useState("");
    const [sellingPrice, setSellingPrice] = useState(vehicle.sellingPrice);

    const [errorStatus, setErrorStatus] = useState([]);

    const handleSave = () => {
        const saleRecord = {
            // "date": date,
            "buyerName": buyerName,
            "sellingPrice": sellingPrice
        };

        const requiredFields = HandleSaveChanges(saleRecord);
        setErrorStatus(requiredFields);
    }

    const handleCancel = () => {
        setBuyerName("");
        setSellingPrice(vehicle.sellingPrice);

        setOpenModal(false);
    }

    return (
        <AlertDialog open={openModal} onOpenChange={setOpenModal}>
            <AlertDialogTrigger asChild>
                <Button 
                    className="bg-[#0c0c0c] text-white px-12 font-extralight rounded-md" 
                    size="sm"
                    onClick={() => setOpenModal(true)}
                >
                    {btnText}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogDescription>
                        <p className="text-black">Please enter the buyer’s details and selling price to confirm the sale.</p>
                        <Input
                            type="text"
                            label="Buyer's Name"
                            labelPlacement="outside-left"
                            variant="flat"
                            errorMessage={errorStatus[0]?.error}
                            isInvalid={errorStatus[0]?.isInvalid}
                            onChange={(e) => setBuyerName(e.target.value)}
                            classNames={{
                                mainWrapper: "w-full",
                                label: "text-sm w-[30%] mr-3",
                                inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                input: "text-left text-sm text-black",
                                errorMessage: "text-red-600 text-xs"
                            }}
                            className="mt-4"
                            size="sm"                          
                        />
                        <Input
                            type="number"
                            label="Selling Price"
                            labelPlacement="outside-left"
                            variant="flat"
                            errorMessage={errorStatus[1]?.error}
                            isInvalid={errorStatus[1]?.isInvalid}
                            onChange={(e) => setSellingPrice(e.target.value)}
                            classNames={{
                                mainWrapper: "w-full",
                                label: "text-sm w-[30%] mr-3",
                                inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                input: "text-left text-sm text-black",
                                errorMessage: "text-red-600 text-xs"
                            }}
                            defaultValue={vehicle.sellingPrice}
                            className="mt-2"
                            size="sm"
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4">
                    <Button 
                        size="sm"
                        className="bg-[#0c0c0c] px-8 text-white font-extralight rounded-md hover:bg-[#1d1d1d]"
                        onClick={handleSave}
                    >
                        Confirm
                    </Button>
                    <Button 
                        size="sm"
                        className="bg-white px-8 text-[#0c0c0c] font-extralight rounded-md border hover:shadow-sm hover:bg-white"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}