import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button, Input } from "@nextui-org/react"
import Link from "next/link"
import VehicleDeletionModal from "../vehicleDeletionModal"
import SalesModal from "../salesModal"
import RestorationModal from "../restorationModal"
import EditSalesModal from "../editSalesModal"
import { useEffect, useState } from "react"

const ActiveVehiclesActions = ({ vehicle, reload, userId }) => {
    return (
        <>
            <div className="w-full py-3 border-b border-black/25">
                <Button 
                    as={Link}
                    href={`/dashboard/payment/${vehicle.vehicle.id}`}
                    className="w-full bg-[#0c0c0c] text-white px-12 font-extralight rounded-md hover:bg-[#1d1d1d] " 
                    size="sm"
                >
                    Edit Payments
                </Button>
                <Button 
                    as={Link}
                    href={`/dashboard/maintenance/${vehicle.vehicle.id}`}
                    className="w-full bg-[#0c0c0c] text-white px-12 font-extralight rounded-md hover:bg-[#1d1d1d] mt-2" 
                    size="sm"
                >
                    Edit Maintenace
                </Button>
            </div>
            <Button 
                as={Link}
                href={{
                    pathname: `/dashboard/edit-vehicle/${vehicle.vehicle.id}`,
                    query: { vehicle: JSON.stringify(vehicle) }
                }}
                className="bg-white text-black px-12 font-extralight rounded-md hover:bg-[#fafafa] mt-3" 
                size="sm"
            >
                Edit Record
            </Button>

            <VehicleDeletionModal vehicle={vehicle} reload={reload} userId={userId} />
        </>
    )
}

const SoldVehiclesActions = ({ vehicle, reload }) => {
    return (
        <>
            <div className="w-full py-3 border-b border-black/25">
                <Button 
                    as={Link}
                    href={`/dashboard/sales/${vehicle.vehicle.id}`}
                    className="w-full bg-[#0c0c0c] text-white px-12 font-extralight rounded-md hover:bg-[#1d1d1d] " 
                    size="sm"
                >
                    Sales Payments
                </Button>
            </div>
            <EditSalesModal btnText={"Edit Record"} vehicle={vehicle} reload={reload} />
            <RestorationModal vehicle={vehicle} reload={reload} />
        </>
    )
}

const CollapsedRow = ({ vehicle, isSold, reload }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (session) {
            setUserId(session.userId);
        } else {
            console.error("User is not logged in or session is missing userId.");
        }
    }, []);

    return (
        <div className="w-full grid grid-cols-4 gap-x-2">
            {/* Left Content */}
            <div className="col-span-3 flex flex-col">
                {/* Vehicle Details */}
                <div className={`grid gap-y-4 p-2 border-b border-black/25 ${isSold ? 'grid-cols-2' : 'grid-cols-3'}`}>
                    { !isSold ? (
                        <>
                            <Input
                                isReadOnly
                                classNames={{
                                    base: "bg-transparent",
                                    label: "mr-2",
                                    inputWrapper: "w-[25%] rounded-lg bg-gray-200",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.additionalData.months}
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
                                    inputWrapper: `w-[75%] rounded-lg ${vehicle.vehicle.isCR === "Pending" ? "bg-red-200" : "bg-green-200"}`,
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.vehicle.isCR}
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
                                    inputWrapper: "w-[100%] rounded-lg bg-gray-200",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.purchaseDetails.purchasedFrom}
                                size="sm"
                                variant="flat"
                                label="Purchased From"
                                labelPlacement="outside-left"
                            />

                            <Input
                                isReadOnly
                                classNames={{
                                    base: "bg-transparent",
                                    label: "mr-7",
                                    inputWrapper: "w-[75%] rounded-lg bg-gray-200",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.analytics.cocAmount.toLocaleString()}
                                size="sm"
                                variant="flat"
                                label="COC"
                                labelPlacement="outside-left"
                            />
                        </>
                    ) : (
                        <>
                            <Input
                                isReadOnly
                                classNames={{
                                    base: "bg-transparent",
                                    label: "mr-2",
                                    inputWrapper: "w-[100%] rounded-lg bg-gray-200",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.purchaseDetails.boughtDate.slice(0, 10)}
                                size="sm"
                                variant="flat"
                                label="Purchased Date"
                                labelPlacement="outside-left"
                            />
                            
                            <Input
                                isReadOnly
                                classNames={{
                                    base: "bg-transparent",
                                    label: "mr-2",
                                    inputWrapper: "w-[100%] rounded-lg bg-gray-200",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.additionalData.months}
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
                                    inputWrapper: "w-[100%] rounded-lg bg-gray-200",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.purchaseDetails.purchasedFrom}
                                size="sm"
                                variant="flat"
                                label="Purchased From"
                                labelPlacement="outside-left"
                            />

                            <Input
                                isReadOnly
                                classNames={{
                                    base: "bg-transparent",
                                    label: "mr-8",
                                    inputWrapper: "w-[100%] rounded-lg bg-gray-200",
                                    input: "text-center text-sm text-[#0c0c0c]",
                                }}
                                defaultValue={vehicle.analytics.pnL.toLocaleString()}
                                size="sm"
                                variant="flat"
                                label="PnL"
                                labelPlacement="outside-left"
                            />
                        </>
                    )}
                </div>

                {/* Payment Details */}
                <div className="p-4 border-b border-black/25">
                    <p className="mt-1 mb-2 font-medium">Payment Details</p>
                    <Table className="w-[75%]" >
                        <TableHeader className="border-b border-black/25">
                            <TableRow>
                                <TableHead className="text-black">Date</TableHead>
                                <TableHead className="text-black">Account</TableHead>
                                <TableHead className="text-black">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vehicle.listOfPayments.map((payment, index) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell>{payment.date}</TableCell>
                                        <TableCell>{payment.paymentTypeId}</TableCell>
                                        <TableCell>{payment.paymentAmount.toLocaleString()}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>

                {/* Maintenance Details */}
                <div className="p-4 border-b border-black/25">
                    <p className="mt-1 mb-2 font-medium">Mainteneace Records</p>
                    <Table className="w-[75%]">
                        <TableHeader className="border-b border-black/25">
                            <TableRow>
                                <TableHead className="text-black">Date</TableHead>
                                <TableHead className="text-black">Description</TableHead>
                                <TableHead className="text-black">Vendor</TableHead>
                                <TableHead className="text-black">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vehicle.listOfQuotations.map((quotation, index) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell>{quotation.quotationInformation.quotationDate}</TableCell>
                                        <TableCell>{quotation.quotationInformation.maintenanceTypeId}</TableCell>
                                        <TableCell>{quotation.quotationInformation.vendorId}</TableCell>
                                        <TableCell>{quotation.quotationInformation.quotedAmount.toLocaleString()}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>

                {/* Sales Details */}
                {isSold && (
                    <div className="p-4">
                        <p className="mt-1 mb-2 font-medium">Sales Records</p>
                        <Table className="w-[75%]" >
                            <TableHeader className="border-b border-black/25">
                                <TableRow>
                                    <TableHead className="text-black">Date</TableHead>
                                    <TableHead className="text-black">Account</TableHead>
                                    <TableHead className="text-black">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {vehicle.listOfSalesPayments.map((payment, index) => {
                                    return(
                                        <TableRow key={index}>
                                            <TableCell>{payment.date}</TableCell>
                                            <TableCell>{payment.salesPaymentTypeId}</TableCell>
                                            <TableCell>{payment.salesAmount.toLocaleString()}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>

            {/* Right Content */}
            <div className="col-span-1 border-l border-black/25">
                <div className="h-full p-3 flex flex-col justify-end">
                    { !isSold ? (
                        <ActiveVehiclesActions vehicle={vehicle} reload={reload} userId={userId} />
                    ) : (
                        <SoldVehiclesActions vehicle={vehicle} reload={reload} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CollapsedRow;