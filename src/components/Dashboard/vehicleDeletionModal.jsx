import { Button } from "@nextui-org/react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "../ui/alert-dialog";

export default function VehicleDeletionModal({ vehicle }) {
    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button 
                    className="bg-red-500 text-white px-12 font-extralight rounded-md hover:bg-red-600 mt-2" 
                    size="sm"
                >
                    Delete Record
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogDescription>
                        <p className="text-black">Are you sure you want to delete this vehicle record? This action is irreversible.</p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-2">
                    <AlertDialogAction asChild>
                        <Button 
                            size="sm"
                            className="bg-white px-8 text-[#0c0c0c] font-extralight rounded-md border hover:shadow-sm hover:bg-white"
                        >
                            Yes
                        </Button>
                        
                    </AlertDialogAction>
                    <AlertDialogCancel asChild>
                        <Button 
                            size="sm"
                            className="bg-[#0c0c0c] px-8 text-white font-extralight rounded-md hover:bg-[#1d1d1d] hover:text-white"
                        >
                            No
                        </Button>
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}