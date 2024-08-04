'use client'

import { GoChevronDown, GoChevronUp } from "react-icons/go";
import SalesModal from "../salesModal";
import CollapsedRow from "./collapsedRow";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button, Chip } from "@nextui-org/react";

const VehicleRow = ({ vehicle, isSelected, onToggle, isSold, reload }) => {
    // const renderCollapsedRow = useCallback((vehicle) => {
    //     return(
    //         <div className="w-full grid grid-cols-4 gap-x-2">
    //             <div className="col-span-3 flex flex-col">
    //                 <div className="grid grid-cols-3 gap-y-4 p-2 border-b border-black/25">
    //                     <Input
    //                         isReadOnly
    //                         classNames={{
    //                             base: "bg-transparent",
    //                             label: "mr-2",
    //                             inputWrapper: "w-[25%] rounded-lg bg-gray-200",
    //                             input: "text-center text-sm text-[#0c0c0c]",
    //                         }}
    //                         defaultValue={vehicle.months}
    //                         size="sm"
    //                         variant="flat"
    //                         label="Months"
    //                         labelPlacement="outside-left"
    //                     />

    //                     <Input
    //                         isReadOnly
    //                         classNames={{
    //                             base: "bg-transparent",
    //                             label: "mr-2",
    //                             inputWrapper: `w-[75%] rounded-lg ${vehicle.cr === "Pending" ? "bg-red-200" : "bg-green-200"}`,
    //                             input: "text-center text-sm text-[#0c0c0c]",
    //                         }}
    //                         defaultValue={vehicle.cr}
    //                         size="sm"
    //                         variant="flat"
    //                         label="CR"
    //                         labelPlacement="outside-left"
    //                     />

    //                     <Input
    //                         isReadOnly
    //                         classNames={{
    //                             base: "bg-transparent",
    //                             label: "mr-2",
    //                             inputWrapper: "w-[100%] rounded-lg bg-gray-200",
    //                             input: "text-center text-sm text-[#0c0c0c]",
    //                         }}
    //                         defaultValue={vehicle.purchasedFrom}
    //                         size="sm"
    //                         variant="flat"
    //                         label="Purchased From"
    //                         labelPlacement="outside-left"
    //                     />

    //                     <Input
    //                         isReadOnly
    //                         classNames={{
    //                             base: "bg-transparent",
    //                             label: "mr-7",
    //                             inputWrapper: "w-[75%] rounded-lg bg-gray-200",
    //                             input: "text-center text-sm text-[#0c0c0c]",
    //                         }}
    //                         defaultValue={vehicle.coc}
    //                         size="sm"
    //                         variant="flat"
    //                         label="COC"
    //                         labelPlacement="outside-left"
    //                     />
    //                 </div>

    //                 <div className="p-4 border-b border-black/25">
    //                     <p className="mt-1 mb-2 font-medium">Payment Details</p>
    //                     <Table className="w-[75%]" >
    //                         <TableHeader className="border-b border-black/25">
    //                             <TableRow>
    //                                 <TableHead className="text-black">Date</TableHead>
    //                                 <TableHead className="text-black">Account</TableHead>
    //                                 <TableHead className="text-black">Amount</TableHead>
    //                             </TableRow>
    //                         </TableHeader>
    //                         <TableBody>
    //                             {vehicle.payments.map((payment, index) => {
    //                                 return(
    //                                     <TableRow key={index}>
    //                                         <TableCell>{payment.date}</TableCell>
    //                                         <TableCell>{payment.account}</TableCell>
    //                                         <TableCell>{payment.amount}</TableCell>
    //                                     </TableRow>
    //                                 )
    //                             })}
    //                         </TableBody>
    //                     </Table>
    //                 </div>

    //                 <div className="p-4">
    //                     <p className="mt-1 mb-2 font-medium">Mainteneace Records</p>
    //                     <Table className="w-[75%]">
    //                         <TableHeader className="border-b border-black/25">
    //                             <TableRow>
    //                                 <TableHead className="text-black">Date</TableHead>
    //                                 <TableHead className="text-black">Description</TableHead>
    //                                 <TableHead className="text-black">Account</TableHead>
    //                                 <TableHead className="text-black">Amount</TableHead>
    //                             </TableRow>
    //                         </TableHeader>
    //                         <TableBody>
    //                             {vehicle.maintenance.map((maintenance, index) => {
    //                                 return(
    //                                     <TableRow key={index}>
    //                                         <TableCell>{maintenance.date}</TableCell>
    //                                         <TableCell>{maintenance.description}</TableCell>
    //                                         <TableCell>{maintenance.account}</TableCell>
    //                                         <TableCell>{maintenance.amount}</TableCell>
    //                                     </TableRow>
    //                                 )
    //                             })}
    //                         </TableBody>
    //                     </Table>
    //                 </div>
    //             </div>

    //             <div className="col-span-1 border-l border-black/25">
    //                 <div className="h-full p-3 flex flex-col justify-end">
    //                     <div className="w-full py-3 border-b border-black/25">
    //                         <Button 
    //                             as={Link}
    //                             href={{
    //                                 pathname: `/dashboard/payment/${vehicle.id}`,
    //                                 query: { vehicle: JSON.stringify(vehicle) }
    //                             }}
    //                             className="w-full bg-[#0c0c0c] text-white px-12 font-extralight rounded-md hover:bg-[#1d1d1d] " 
    //                             size="sm"
    //                         >
    //                             Edit Payments
    //                         </Button>
    //                         <Button 
    //                             as={Link}
    //                             href={`/dashboard/maintenance/${vehicle.id}`}
    //                             className="w-full bg-[#0c0c0c] text-white px-12 font-extralight rounded-md hover:bg-[#1d1d1d] mt-2" 
    //                             size="sm"
    //                         >
    //                             Edit Maintenace
    //                         </Button>
    //                     </div>
    //                     <Button 
    //                         as={Link}
    //                         href={{
    //                             pathname: `/dashboard/edit-vehicle/${vehicle.id}`,
    //                             query: { vehicle: JSON.stringify(vehicle) }
    //                         }}
    //                         className="bg-white text-black px-12 font-extralight rounded-md hover:bg-[#fafafa] mt-3" 
    //                         size="sm"
    //                     >
    //                         Edit Record
    //                     </Button>

    //                     <VehicleDeletionModal vehicle={vehicle} reload={reload} />
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // });

    // // sold vehicles: collapsed row component
    // const renderSoldCollapsedRow = useCallback((vehicle) => {
    //     return(
    //         <div className="w-full grid grid-cols-4 gap-x-2">
    //             <div className="col-span-3 flex flex-col">
    //                 <div className="grid grid-cols-2 gap-y-4 p-2 border-b border-black/25">
    //                     <Input
    //                         isReadOnly
    //                         classNames={{
    //                             base: "bg-transparent",
    //                             label: "mr-2",
    //                             inputWrapper: "w-[100%] rounded-lg bg-gray-200",
    //                             input: "text-center text-sm text-[#0c0c0c]",
    //                         }}
    //                         defaultValue={vehicle.date}
    //                         size="sm"
    //                         variant="flat"
    //                         label="Purchased Date"
    //                         labelPlacement="outside-left"
    //                     />
                        
    //                     <Input
    //                         isReadOnly
    //                         classNames={{
    //                             base: "bg-transparent",
    //                             label: "mr-2",
    //                             inputWrapper: "w-[25%] rounded-lg bg-gray-200",
    //                             input: "text-center text-sm text-[#0c0c0c]",
    //                         }}
    //                         defaultValue={vehicle.months}
    //                         size="sm"
    //                         variant="flat"
    //                         label="Months"
    //                         labelPlacement="outside-left"
    //                     />

    //                     <Input
    //                         isReadOnly
    //                         classNames={{
    //                             base: "bg-transparent",
    //                             label: "mr-2",
    //                             inputWrapper: "w-[100%] rounded-lg bg-gray-200",
    //                             input: "text-center text-sm text-[#0c0c0c]",
    //                         }}
    //                         defaultValue={vehicle.purchasedFrom}
    //                         size="sm"
    //                         variant="flat"
    //                         label="Purchased From"
    //                         labelPlacement="outside-left"
    //                     />
    //                 </div>

    //                 <div className="p-4 border-b border-black/25">
    //                     <p className="mt-1 mb-2 font-medium">Payment Details</p>
    //                     <Table className="w-[75%]">
    //                         <TableHeader className="border-b border-black/25">
    //                             <TableRow>
    //                                 <TableHead className="text-black">Date</TableHead>
    //                                 <TableHead className="text-black">Account</TableHead>
    //                                 <TableHead className="text-black">Amount</TableHead>
    //                             </TableRow>
    //                         </TableHeader>
    //                         <TableBody>
    //                             {vehicle.payments.map((payment, index) => {
    //                                 return(
    //                                     <TableRow key={index}>
    //                                         <TableCell>{payment.date}</TableCell>
    //                                         <TableCell>{payment.account}</TableCell>
    //                                         <TableCell>{payment.amount}</TableCell>
    //                                     </TableRow>
    //                                 )
    //                             })}
    //                         </TableBody>
    //                     </Table>
    //                 </div>

    //                 <div className="p-4">
    //                     <p className="mt-1 mb-2 font-medium">Mainteneace Records</p>
    //                     <Table className="w-[75%]">
    //                         <TableHeader className="border-b border-black/25">
    //                             <TableRow>
    //                                 <TableHead className="text-black">Date</TableHead>
    //                                 <TableHead className="text-black">Description</TableHead>
    //                                 <TableHead className="text-black">Account</TableHead>
    //                                 <TableHead className="text-black">Amount</TableHead>
    //                             </TableRow>
    //                         </TableHeader>
    //                         <TableBody>
    //                             {vehicle.maintenance.map((maintenance, index) => {
    //                                 return(
    //                                     <TableRow key={index}>
    //                                         <TableCell>{maintenance.date}</TableCell>
    //                                         <TableCell>{maintenance.description}</TableCell>
    //                                         <TableCell>{maintenance.account}</TableCell>
    //                                         <TableCell>{maintenance.amount}</TableCell>
    //                                     </TableRow>
    //                                 )
    //                             })}
    //                         </TableBody>
    //                     </Table>
    //                 </div>
    //             </div>

    //             <div className="col-span-1 border-l border-black/25">
    //                 <div className="h-full p-3 flex flex-col justify-end">
    //                     <SalesModal btnText={"Edit Record"} vehicle={vehicle} />
    //                     <RestorationModal vehicle={vehicle} />
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // });

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