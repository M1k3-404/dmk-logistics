import { Button, DateInput, Input } from "@nextui-org/react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "../ui/alert-dialog";
import { useState } from "react";
import { AddSale } from "@/actions/sales-actions";

export default function SalesModal({ btnText, vehicle, reload }) {
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        date: "",
        buyerName: "",
        sellingPrice: vehicle.vehicle.ExpectedSellingPrice,
    });
    const [errorStatus, setErrorStatus] = useState([]);

    const handleInputChange = (field) => (value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }

    const handleSave = () => {
        const saleRecord = {
            "id": vehicle.vehicle.id,
            ...formData
        };

        const requiredFields = AddSale(vehicle, saleRecord, setOpenModal, reload);
        setErrorStatus(requiredFields);
    }

    const handleCancel = () => {
        setFormData({
            date: "",
            buyerName: "",
            sellingPrice: vehicle.sellingPrice,
        })
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
                        
                        <DateInput
                            label="Selling Date"
                            labelPlacement="outside-left"
                            variant="flat"
                            errorMessage={errorStatus[1]?.error}
                            isInvalid={errorStatus[1]?.isInvalid}
                            onChange={handleInputChange("date")}
                            classNames={{
                                label: "text-sm w-[24%]",
                                inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                errorMessage: "text-red-600 text-xs"
                            }}
                            className="mt-4"
                            size="sm"          
                        />
                        <Input
                            type="text"
                            label="Buyer's Name"
                            labelPlacement="outside-left"
                            variant="flat"
                            errorMessage={errorStatus[2]?.error}
                            isInvalid={errorStatus[2]?.isInvalid}
                            onChange={(e) => handleInputChange("buyerName")(e.target.value)}
                            classNames={{
                                mainWrapper: "w-full",
                                label: "text-sm w-[30%] mr-3",
                                inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                input: "text-left text-sm text-black",
                                errorMessage: "text-red-600 text-xs"
                            }}
                            className="mt-2"
                            size="sm"                          
                        />
                        <Input
                            type="number"
                            label="Selling Price"
                            labelPlacement="outside-left"
                            variant="flat"
                            errorMessage={errorStatus[3]?.error}
                            isInvalid={errorStatus[3]?.isInvalid}
                            onChange={(e) => handleInputChange("sellingPrice")(e.target.value)}
                            classNames={{
                                mainWrapper: "w-full",
                                label: "text-sm w-[30%] mr-3",
                                inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                input: "text-left text-sm text-black",
                                errorMessage: "text-red-600 text-xs"
                            }}
                            defaultValue={formData.sellingPrice}
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