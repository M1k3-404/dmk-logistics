import { memo, useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button, Input } from "@nextui-org/react";
import { IoIosAddCircle } from "react-icons/io";
import { AddVendor } from "@/actions/vendors-actions";

const AddVendorModal = ({ reload }) => {
    const [openModal, setOpenModal] = useState(false);
    const [vendorName, setVendorName] = useState("");

    const handleSave = () => {
        console.log(vendorName);
        const response = AddVendor(vendorName, reload, setOpenModal);
    }

    const handleCancel = () => {
        setVendorName("");
        setOpenModal(false);
    }

    return (
        <AlertDialog open={openModal} onOpenChange={setOpenModal}>
            <AlertDialogTrigger asChild>
                <Button 
                    className="w-full h-full bg-transparent border border-dashed rounded-lg text-center flex hover:bg-[#0c0c0c] hover:text-white"
                >
                    <IoIosAddCircle />
                    <p>Add Vendor</p>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogDescription>
                        <p className="text-black">Please enter the vendor’s details to add a new vendor.</p>
                        
                        <Input
                            type="text"
                            label="Vendor Name"
                            labelPlacement="outside-left"
                            variant="flat"
                            onChange={(e) => setVendorName(e.target.value)}
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
    )
}

export default memo(AddVendorModal);