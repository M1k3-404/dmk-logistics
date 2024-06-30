import { Button } from "@nextui-org/react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "../ui/alert-dialog";
import { useState } from "react";

export default function CancellationModal() {
    const [openModal, setOpenModal] = useState(false);

    const handleNo = () => {
        setOpenModal(false)
    }

    const handleYes = () => {
        location.href = "/dashboard"
    }

    return (
        <AlertDialog open={openModal} onOpenChange={setOpenModal}>
            <AlertDialogTrigger asChild>
                <Button 
                    className="bg-white text-[#0c0c0c] font-extralight rounded-md border hover:shadow-sm hover:text-red-600"
                    onClick={() => setOpenModal(true)}
                >
                    Cancel
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogDescription>
                        <p className="text-black">Are you sure you want to cancel this current process?</p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4">
                    <Button 
                        size="sm"
                        onClick={handleYes}
                        className="bg-white px-8 text-[#0c0c0c] font-extralight text-sm rounded-md border hover:shadow-sm hover:bg-white"
                    >
                        Yes
                    </Button>
                    <Button 
                        size="sm"
                        onClick={handleNo}
                        className="bg-[#0c0c0c] px-8 text-white font-extralight text-sm rounded-md hover:bg-[#1d1d1d] hover:text-white"
                    >
                        No
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}