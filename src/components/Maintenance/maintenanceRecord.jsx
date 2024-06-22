import { Button } from "@nextui-org/react";
import { RiDraggable } from "react-icons/ri";
import RecordDeletionModal from "./recordDeletionModal";

export default function MaintenaceRecord({record, onDelete}) {
    return(
        <div className="w-full grid grid-cols-10 items-center rounded-lg border border-black my-1">
            <Button 
                isIconOnly
                className="col-span-1 ml-3"
            >
                <RiDraggable />
            </Button>
            <p className="col-span-2">{record.date}</p>
            <p className="col-span-2">{record.description}</p>
            <p className="col-span-2">{record.account}</p>
            <p className="col-span-2">{record.amount}</p>
            <RecordDeletionModal onDelete={onDelete} />
        </div>
    )
}