'use client'

import { GoChevronDown, GoChevronUp } from "react-icons/go";
import SalesModal from "../salesModal";
import CollapsedRow from "./collapsedRow";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button, Chip } from "@nextui-org/react";

const VehicleRow = ({ vehicle, isSelected, onToggle, isSold, reload }) => {
    return (
        <>
            <TableRow key={vehicle.id}>
                <TableCell>
                    <Button
                        isIconOnly
                        radius="full"
                        className="bg-transparent hover:bg-[#ebebeb]"
                        onClick={() => onToggle(vehicle.id)}
                    >
                        {isSelected ? <GoChevronUp size={16} /> : <GoChevronDown size={16} />}
                    </Button>
                </TableCell>
                <TableCell>{isSold ? vehicle.dateSold : vehicle.date}</TableCell>
                <TableCell>
                    <Chip className="bg-violet-200">{vehicle.vehicleNo}</Chip>
                </TableCell>
                <TableCell>{vehicle.make}</TableCell>
                <TableCell>{vehicle.yom}</TableCell>
                <TableCell>{vehicle.document}</TableCell>
                <TableCell>{vehicle.pCost}</TableCell>
                { !isSold && (
                    <TableCell>
                        {vehicle.pRemaining > 0 ? <span className="text-red-400">{vehicle.pRemaining}</span> : <Chip className="bg-green-200">Complete</Chip>}
                    </TableCell>
                )}
                <TableCell>{vehicle.totalCost}</TableCell>
                <TableCell>{vehicle.sellingPrice}</TableCell>
                {isSold && <TableCell>{vehicle.buyer}</TableCell>}
                {!isSold && (
                    <TableCell>
                        <SalesModal btnText={"Sell"} vehicle={vehicle} reload={reload} />
                    </TableCell>
                )}
            </TableRow>
            {isSelected && (
                <TableRow>
                    <TableCell colSpan={11}>
                        <CollapsedRow vehicle={vehicle} isSold={isSold} reload={reload} />
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}

export default VehicleRow;