import { Button, Input } from "@nextui-org/react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

export default function SalesModal({ vehicle }) {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="bg-[#0c0c0c] text-white px-12 font-extralight rounded-md" size="sm">Sell</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogDescription>
                        <p className="text-black">Please enter the buyer’s details and selling price to confirm the sale.</p>
                        <Input
                            required
                            type="text"
                            classNames={{
                                base: "bg-transparent",
                                label: "text-sm w-[30%] mr-3",
                                mainWrapper: "w-full",
                                inputWrapper: "w-full focus:border-b border-black",
                                input: "text-left text-sm text-[#0c0c0c]",
                            }}
                            className="mt-4"
                            size="sm"
                            variant="underlined"
                            label="Buyer's Name"
                            labelPlacement="outside-left"
                        />
                        <Input
                            type="text"
                            classNames={{
                                base: "bg-transparent",
                                label: "text-sm w-[30%] mr-3",
                                mainWrapper: "w-full",
                                inputWrapper: "w-full focus:border-b border-black",
                                input: "text-left text-sm text-[#0c0c0c]",
                            }}
                            defaultValue={vehicle.sellingPrice}
                            className="mt-2"
                            size="sm"
                            variant="underlined"
                            label="Selling Price"
                            labelPlacement="outside-left"
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4">
                    <AlertDialogAction asChild>
                        <Button 
                            size="sm"
                            className="bg-[#0c0c0c] px-8 text-white font-extralight rounded-md hover:bg-[#1d1d1d]"
                        >
                            Confirm
                        </Button>
                    </AlertDialogAction>
                    <AlertDialogCancel asChild>
                        <Button 
                            size="sm"
                            className="bg-white px-8 text-[#0c0c0c] font-extralight rounded-md border hover:shadow-sm hover:bg-white"
                        >
                            Cancel
                        </Button>
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}