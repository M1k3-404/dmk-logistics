import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button, Input } from "@nextui-org/react";
import { IoIosAddCircle } from "react-icons/io";
import { addPaymentType } from "@/actions/payment-types-actions";

export default function PaymentTypeCreationModal() {
    const [openModal, setOpenModal] = useState(false);

    const [paymentName, setPaymentName] = useState("");
    const [initialBalance, setInitialBalance] = useState(0);

    const [errorStatus, setErrorStatus] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (session && session.userId) {
            setUserId(session.userId);
        } else {
            console.error("User is not logged in or session is missing userId.");
        }
    }, []);

    const handleSave = () => {
        const paymentType = {
            "paymentName": paymentName,
            "initialBalance": initialBalance
        };

        const requiredFields = addPaymentType(paymentType, setOpenModal, userId);
        setErrorStatus(requiredFields);
    }

    const handleCancel = () => {
        setPaymentName("");
        setInitialBalance(0);

        setOpenModal(false);
    }

    return(
        <AlertDialog open={openModal} onOpenChange={setOpenModal}>
            <AlertDialogTrigger asChild>
                <Button 
                    className="w-1/4 rounded-lg bg-transparent border border-black flex items-center justify-center mt-3 mb-1"
                >
                    <IoIosAddCircle />
                    Add Payment Method
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <Input
                        type="text"
                        label="Payment Type"
                            labelPlacement="outside-left"
                            variant="flat"
                            errorMessage={errorStatus[0]?.error}
                            isInvalid={errorStatus[0]?.isInvalid}
                            onChange={(e) => setPaymentName(e.target.value)}
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
                        type="text"
                        label="Initial Balance"
                            labelPlacement="outside-left"
                            variant="flat"
                            errorMessage={errorStatus[1]?.error}
                            isInvalid={errorStatus[1]?.isInvalid}
                            onChange={(e) => setInitialBalance(e.target.value)}
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