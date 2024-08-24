import { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button, Input } from "@nextui-org/react";
import { IoIosAddCircle } from "react-icons/io";
import { addMaintenanceType } from "@/actions/maintenance-types-actions";

export default function MaintenanceTypeCreationModal() {
    const [openModal, setOpenModal] = useState(false);

    const [maintenanceTitle, setmaintenanceTitle] = useState("");

    const [errorStatus, setErrorStatus] = useState([]);

    const handleSave = () => {
        const maintenanceType = {
            "maintenanceTitle": maintenanceTitle,
        };

        const requiredFields = addMaintenanceType(maintenanceType, setOpenModal);
        setErrorStatus(requiredFields);
    }

    const handleCancel = () => {
        setmaintenanceTitle("");

        setOpenModal(false);
    }

    return(
        <AlertDialog open={openModal} onOpenChange={setOpenModal}>
            <AlertDialogTrigger asChild>
                <Button 
                    className="w-1/4 rounded-lg bg-transparent border border-black flex items-center justify-center mt-3 mb-1"
                >
                    <IoIosAddCircle />
                    Add Maintenance Method
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <Input
                        type="text"
                        label="Maintenance Type"
                        labelPlacement="outside-left"
                        variant="flat"
                        onChange={(e) => setmaintenanceTitle(e.target.value)}
                        classNames={{
                            mainWrapper: "w-full",
                            label: "text-sm w-[30%] mr-3",
                            inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                            input: "text-left text-sm text-black",
                        }}
                        className="mt-2"
                        size="sm"                          
                    />
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-4">
                    <Button
                        size="sm"
                        className="bg-[#0c0c0c] px-8 text-white font-extralight rounded-md hover:bg-[#1d1d1d]"
                        onClick={handleSave}
                    >
                        Save Changes
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