import { Button } from "@nextui-org/react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "../ui/alert-dialog";
import { CiCircleMinus } from "react-icons/ci";
import { useEffect, useState } from "react";
import { deletePayment } from "@/actions/payment-actions";
import { deleteQuotation } from "@/actions/quotation-actions";
import { deleteSalesPayment } from "@/actions/sales-payment-actions";

export default function RecordDeletionModal({ recordType, id }) {
    const [openModal, setOpenModal] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (session) {
            setUserId(session.userId);
        } else {
            console.error("User is not logged in or session is missing userId.");
        }
    }, []);

    const handleDeletion = () => {
        if (recordType === 'quotation') {
            deleteQuotation(id, userId);
        } else if (recordType === 'payment') {
            deletePayment(id, userId);
        } else if (recordType === 'salesPayment') {
            deleteSalesPayment(id, userId);
        }
        setOpenModal(false);
    }

    return(
        <AlertDialog open={openModal} onOpenChange={setOpenModal}>
            <AlertDialogTrigger asChild>
                <Button
                    isIconOnly
                    className="mx-auto"
                >
                    <CiCircleMinus 
                        className="hover:text-red-500"
                        onClick={() => setOpenModal(true)}
                    />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogDescription>
                        <p className="text-black">Are you sure you want to delete this record? This action is irreversible.</p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-2">
                    <Button
                        size="sm"
                        className="bg-white px-8 text-[#0c0c0c] font-extralight rounded-md border hover:shadow-sm hover:bg-white"
                        onClick={handleDeletion}
                    >
                        Yes
                    </Button>
                    <Button
                        as={AlertDialogCancel}
                        size="sm"
                        className="bg-[#0c0c0c] px-8 text-white font-extralight rounded-md hover:bg-[#1d1d1d] hover:text-white"
                    >
                        No
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}