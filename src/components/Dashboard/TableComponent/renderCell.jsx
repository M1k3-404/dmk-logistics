import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@nextui-org/react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import SalesModel from "../salesModal";
import { useCallback } from "react";

const renderCell = ({isRowOpen, selectedRow, handleRowClick, vehicle }) => {
    return(
        <>
            <TableRow key={vehicle.id}>
                <TableCell>
                    {
                        selectedRow === vehicle.id ? (
                            <Button
                                isIconOnly
                                radius="full"
                                className="bg-transparent hover:bg-[#ebebeb]" 
                                onClick={() => handleRowClick(vehicle)}
                            >
                                <GoChevronUp size={16} />
                            </Button>
                        ) : (
                            <Button 
                                isIconOnly
                                radius="full"
                                className="bg-transparent hover:bg-[#ebebeb]"
                                onClick={() => handleRowClick(vehicle)}
                            >
                                <GoChevronDown size={16} />
                            </Button>
                        )
                    }
                </TableCell>
                <TableCell>{vehicle.date}</TableCell>
                <TableCell>{vehicle.vehicleNo}</TableCell>
                <TableCell>{vehicle.make}</TableCell>
                <TableCell>{vehicle.yom}</TableCell>
                <TableCell>{vehicle.document}</TableCell>
                <TableCell>{vehicle.pCost}</TableCell>
                <TableCell>{vehicle.pRemaining}</TableCell>
                <TableCell>{vehicle.totalCost}</TableCell>
                <TableCell>{vehicle.sellingPrice}</TableCell>
                <TableCell>            
                    <SalesModel vehicle={vehicle} />
                </TableCell>
            </TableRow>
            {
            selectedRow === vehicle.id && (
                <TableRow>
                    <TableCell colspan="11" className="rounded-b-lg bg-[#ebebeb]">
                        {renderCollapsedRow(vehicle)}
                    </TableCell>
                </TableRow>
            )
            }
        </>
    )
};

const renderCollapsedRow = () => useCallback((vehicle) => {
    return(
        <div className="w-full grid grid-cols-4 gap-x-2">
            <div className="col-span-3 flex flex-col">
            <div className="grid grid-cols-3 gap-y-4 p-5 border-b border-black/25">
                <Input
                isReadOnly
                classNames={{
                    base: "bg-transparent",
                    label: "mr-2",
                    inputWrapper: "w-[25%] rounded-lg bg-[#f5f5f5]",
                    input: "text-center text-sm text-[#0c0c0c]",
                }}
                defaultValue={vehicle.months}
                size="sm"
                variant="flat"
                label="Months"
                labelPlacement="outside-left"
                />
                
                <Input
                isReadOnly
                classNames={{
                    base: "bg-transparent",
                    label: "mr-2",
                    inputWrapper: "w-[75%] rounded-lg bg-[#f5f5f5]",
                    input: "text-center text-sm text-[#0c0c0c]",
                }}
                defaultValue={vehicle.cr}
                size="sm"
                variant="flat"
                label="CR"
                labelPlacement="outside-left"
                />

                <Input
                isReadOnly
                classNames={{
                    base: "bg-transparent",
                    label: "mr-2",
                    inputWrapper: "w-[100%] rounded-lg bg-[#f5f5f5]",
                    input: "text-center text-sm text-[#0c0c0c]",
                }}
                defaultValue={vehicle.purchasedFrom}
                size="sm"
                variant="flat"
                label="Purchased From"
                labelPlacement="outside-left"
                />

                <Input
                isReadOnly
                classNames={{
                    base: "bg-transparent",
                    label: "mr-2",
                    inputWrapper: "w-[75%] rounded-lg bg-[#f5f5f5]",
                    input: "text-center text-sm text-[#0c0c0c]",
                }}
                defaultValue={vehicle.coc}
                size="sm"
                variant="flat"
                label="COC"
                labelPlacement="outside-left"
                />
            </div>

            <div className="p-5 border-b border-black/25">
                <p className="my-2 font-medium">Payment Details</p>
                <Table className="w-[75%]">
                <TableHeader className="border-b border-black/25">
                    <TableRow>
                    <TableHead className="text-black">Date</TableHead>
                    <TableHead className="text-black">Account</TableHead>
                    <TableHead className="text-black">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vehicle.payments.map((payment, index) => {
                    return(
                        <TableRow key={index}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.account}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        </TableRow>
                    )
                    })}
                </TableBody>
                </Table>
            </div>

            <div className="p-5">
                <p className="my-2 font-medium">Mainteneace Records</p>
                <Table className="w-[75%]">
                <TableHeader className="border-b border-black/25">
                    <TableRow>
                    <TableHead className="text-black">Date</TableHead>
                    <TableHead className="text-black">Description</TableHead>
                    <TableHead className="text-black">Account</TableHead>
                    <TableHead className="text-black">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vehicle.maintenance.map((maintenance, index) => {
                    return(
                        <TableRow key={index}>
                        <TableCell>{maintenance.date}</TableCell>
                        <TableCell>{maintenance.description}</TableCell>
                        <TableCell>{maintenance.account}</TableCell>
                        <TableCell>{maintenance.amount}</TableCell>
                        </TableRow>
                    )
                    })}
                </TableBody>
                </Table>
            </div>
            </div>

            <div className="col-span-1 border-l border-black/25">
            <div className="h-full p-5 flex flex-col justify-end">
                <div className="w-full py-4 border-b border-black/25">
                <Button className="w-full bg-[#0c0c0c] text-white px-12 font-extralight rounded-md hover:bg-[#1d1d1d] " size="sm">Edit Payments</Button>
                <Button className="w-full bg-[#0c0c0c] text-white px-12 font-extralight rounded-md hover:bg-[#1d1d1d] mt-2" size="sm">Edit Maintenace</Button>
                </div>
                <Button className="bg-white text-black px-12 font-extralight rounded-md hover:bg-[#fafafa] mt-4" size="sm">Edit Record</Button>
                <VehicleDeletionModal vehicle={vehicle} />
            </div>
            </div>
        </div>
    )
});

export default renderCell;