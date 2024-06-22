import { Button, Input } from "@nextui-org/react";
import { MdCancel } from "react-icons/md";

export default function EditablePaymentMethod({onDelete}) {
    return(
        <div className="w-full rounded-lg bg-transparent border border-dashed border-black flex items-center justify-between my-1"> 
            <Input 
                className="ml-5"
                placeholder="Account Name"
                variant="underlined"
            />
            <Button
                isIconOnly
                className="bg-transparent hover:text-red-500"
                onClick={onDelete}
            >
                <MdCancel />
            </Button>
        </div>
    )
}