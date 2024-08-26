import { Button, Input, Progress } from "@nextui-org/react";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "../ui/alert-dialog";
import { useEffect, useMemo, useState } from "react";
import { users } from "../vehicleData";
import { DeleteSale } from "@/actions/sales-actions";

export default function RestorationModal({ vehicle, reload }) {
    const [openModal, setOpenModal] = useState(false);
    const [stage, setStage] = useState("initial");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (session && session.userId) {
            setUserId(session.userId);
        } else {
            console.error("User is not logged in or session is missing userId.");
        }
    }, []);

    const validatePassword = () => {
        console.log("password: " + password);
        // if (password === users[0].password) {
        //     console.log("success!")
        //     setOpenModal(false)
        //     setPassword("")
        //     setStage("initial")
        // } else {
        //     console.log("invalid!")
        // }
        DeleteSale(vehicle.salesDetails.id, reload, userId);
    }

    const handleCancel = () => {
        setPassword("")
        setStage("initial")
        setOpenModal(false)
    }

    const initialStage = useMemo(() => {
        return(
            <AlertDialogContent>
                <AlertDialogHeader>
                    <Progress
                        aria-label="Loading..."
                        value={50}
                        size="sm"
                        className="mb-3"
                    />
                    <p className="text-black">Are you sure you want to restore this vehicle record?</p>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-2">
                    <Button
                        size="sm"
                        className="bg-white px-8 text-[#0c0c0c] font-extralight text-sm rounded-md border hover:shadow-sm hover:bg-white"
                        onClick={() => setStage("final")}
                    >
                        Yes
                    </Button>
                    <Button 
                        size="sm"
                        className="bg-[#0c0c0c] px-8 text-white font-extralight text-sm rounded-md hover:bg-[#1d1d1d] hover:text-white"
                        onClick={handleCancel}
                    >
                        No
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        )
    });

    const finalStage = useMemo(() => {
        return(
            <AlertDialogContent>
                <AlertDialogHeader>
                    <Progress
                        aria-label="Loading..."
                        value={100}
                        size="sm"
                        className="mb-4"
                    />
                    <Input
                            required
                            type="password"
                            classNames={{
                                base: "bg-transparent",
                                label: "text-sm w-full",
                                mainWrapper: "w-full",
                                inputWrapper: "w-full active:border-b border-black",
                                input: "text-left text-sm text-[#0c0c0c]",
                            }}
                            value={password}
                            className="mt-4"
                            size="sm"
                            variant="underlined"
                            label="Please enter the password to confirm"
                            labelPlacement="outside-left"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-2">
                    <Button
                        type="submit"
                        size="sm"
                        className="bg-[#0c0c0c] px-8 text-white font-extralight text-sm rounded-md hover:bg-[#1d1d1d]"
                        onClick={validatePassword}
                    >
                        Confirm
                    </Button>
                    <Button
                        size="sm"
                        className="bg-white px-8 text-[#0c0c0c] font-extralight text-sm rounded-md border hover:shadow-sm hover:bg-white"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        )
    })

    return(
        <AlertDialog open={openModal} onOpenChange={setOpenModal}>
            <AlertDialogTrigger asChild>
                <Button 
                    className="bg-red-500 text-white px-12 font-extralight rounded-md hover:bg-red-600 mt-2" 
                    size="sm"
                    onClick={() => setOpenModal(true)}
                >
                    Restore Record
                </Button>
            </AlertDialogTrigger>

            { stage === "initial" ? initialStage : finalStage }            
        </AlertDialog>
    )
}