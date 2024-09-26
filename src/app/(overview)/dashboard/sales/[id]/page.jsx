"use client"

import { memo, useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import { getVehicleBYId } from "@/actions/vehicle-actions";
import { getAllPaymentTypes, getEveryPaymentType } from "@/actions/payment-types-actions";
import SalesRecord from "@/components/Sales/SalesRecord";

const Sales = ({ params }) => {
    const { id } = params;

    const [state, setState] = useState({
        vehicle: null,
        paymentTypes: [],
        editableRecords: [],
        loading: true
    });

    useEffect(() => {
        const initializePage = async () => {
            try {
                const Vehicle = await getVehicleBYId(id);
                const paymentTypes = await getEveryPaymentType();

                console.log('data:', Vehicle);
                setState({
                    vehicle: Vehicle,
                    paymentTypes: paymentTypes,
                    editableRecords: [],
                    loading: false,
                })
            } catch (error) {
                console.error('Error initializing page:', error);
            }
        };

        initializePage();
    }, [id]);

    const handleAddNewRecord = () => {
        setState((prevState) => ({
            ...prevState,
            editableRecords: [...prevState.editableRecords, {}],
        }));
    };

    const handleDeleteNewRecord = (index) => {
        setState((prevState) => {
            const updatedRecords = [...prevState.editableRecords];
            updatedRecords.splice(index, 1);
            return {
                ...prevState,
                editableRecords: updatedRecords
            };
        });
    };

    const handleAddPayment = (newPayment) => {
        setState((prevState) => ({
            ...prevState,
            vehicle: {
                ...prevState.vehicle,
                payments: [...prevState.vehicle.payments, newPayment]
            },
            editableRecords: prevState.editableRecords.filter(record => record !== newPayment)
        }));
    };

    if (state.loading) {
        return <div className="w-[95%] h-[25%] p-6 bg-white rounded-lg">Loading...</div>
    }

    return(
        <div className="w-[95%] p-6 bg-white rounded-lg overflow-y-auto">
            <div className="w-full">
                <p className="text-[#606060] text-xl font-bold">Sales</p>

                <div className="mt-8 flex w-full">
                    <div className="w-3/4 pr-6 pl-12">
                        <div className="w-full grid grid-cols-2 gap-x-12 gap-y-6 pb-5 border-b border-black/25">
                            {[
                                { label: 'Date of Sale', value: state.vehicle.salesDetails.dateOfSale.slice(0, 10) },
                                { label: 'Vehicle No', value: state.vehicle.vehicle.vehicleNumber },
                                { label: 'Buyer', value: state.vehicle.salesDetails.buyerName },
                                { label: 'S/Amount', value: state.vehicle.salesDetails.saleAmount.toLocaleString() },
                                { label: 'S/Remaining', value: state.vehicle.additionalData.remainingSAmount.toLocaleString() },
                            ].map((field, index) => (
                                <Input
                                    key={index}
                                    label={field.label}
                                    labelPlacement="outside-left"
                                    variant="flat"
                                    isReadOnly
                                    classNames={{
                                        base: "w-full",
                                        label: "mr-2 w-[25%]",
                                        inputWrapper: "w-full rounded-lg bg-[#f5f5f5]",
                                        input: "text-center text-sm text-[#0c0c0c]",
                                    }}
                                    defaultValue={field.value}
                                />
                            ))}
                        </div>

                        <div className="w-full py-5">
                            <p className="mb-4 font-medium">Payments</p>
                            {state.vehicle.listOfSalesPayments.map((payment, index) => {
                                return(
                                    <SalesRecord 
                                        key={index}
                                        salesDetailsId={state.vehicle.salesDetails.id}
                                        record={payment}
                                        paymentTypes={state.paymentTypes}
                                        editable={false}
                                        newRecord={false}
                                    />
                                )
                            })}
                            {state.editableRecords.map((_, index) => {
                                return(
                                    <SalesRecord
                                        key={index}
                                        salesDetailsId={state.vehicle.salesDetails.id}
                                        record={_}
                                        paymentTypes={state.paymentTypes}
                                        editable={true}
                                        newRecord={true}
                                        deleteNewRecord = {() => handleDeleteNewRecord(index)}
                                        onAddPayment={handleAddPayment}
                                    />
                                )
                            })}

                            <Button
                                className="w-full bg-transparent rounded-lg border border-black"
                                onClick={handleAddNewRecord}
                                disabled={state.vehicle.additionalData.remainingSAmount === 0}
                            >
                                Add New Payment
                            </Button>
                        </div>
                    </div>

                    <div className="w-1/4 p-6 border-l border-black/25 flex flex-col justify-end">
                        <Button 
                            as={Link}
                            href="/dashboard"
                            className="bg-[#0c0c0c] text-white font-extralight rounded-md mt-2 hover:bg-green-600"
                        >
                            Save Changes & Exit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// export async function generateStaticParams() {
//     const vehicles = await getAllVehicles();
//     return vehicles.map(vehicle => ({
//         id: vehicle.vehicle.id.toString(),
//     }));
// }

export default memo(Sales);