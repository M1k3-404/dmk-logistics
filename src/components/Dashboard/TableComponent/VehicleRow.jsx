'use client'

import { GoChevronDown, GoChevronUp } from "react-icons/go";
import SalesModal from "../salesModal";
import CollapsedRow from "./collapsedRow";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button, Chip } from "@nextui-org/react";

const VehicleRow = ({ vehicle, isSelected, onToggle, isSold, reload }) => {
    return (
        <>
            <TableRow key={vehicle.vehicle.id}>
                <TableCell>
                    <Button
                        isIconOnly
                        radius="full"
                        className="bg-transparent hover:bg-[#ebebeb]"
                        onClick={() => onToggle(vehicle.vehicle.id)}
                    >
                        {isSelected ? <GoChevronUp size={16} /> : <GoChevronDown size={16} />}
                    </Button>
                </TableCell>
                <TableCell>{isSold ? vehicle.salesDetails.dateOfSale.slice(0, 10) : vehicle.purchaseDetails.boughtDate.slice(0, 10)}</TableCell>
                <TableCell>
                    <Chip className="bg-violet-200">{vehicle.vehicle.vehicleNumber}</Chip>
                </TableCell>
                <TableCell>{vehicle.vehicle.make}</TableCell>
                <TableCell>{vehicle.vehicle.YearOfManufacture.slice(0, 4)}</TableCell>
                <TableCell>{vehicle.purchaseDetails.legalOwnerName}</TableCell>
                <TableCell>{vehicle.purchaseDetails.agreedAmount}</TableCell>
                { !isSold && (
                    <TableCell>
                        {vehicle.additionalData.remainingCost > 0 ? <span className="text-red-400">{vehicle.additionalData.remainingCost}</span> : <Chip className="bg-green-200">Complete</Chip>}
                    </TableCell>
                )}
                <TableCell>{vehicle.analytics.totalCost}</TableCell>
                <TableCell>{vehicle.vehicle.ExpectedSellingPrice}</TableCell>
                {isSold && <TableCell>{vehicle.salesDetails.buyerName}</TableCell>}
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