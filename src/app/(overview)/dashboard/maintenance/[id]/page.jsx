"use client"

import { getEveryMaintenanceType } from "@/actions/maintenance-types-actions";
import { getAllPaymentTypes } from "@/actions/payment-types-actions";
import { getVehicleBYId } from "@/actions/vehicle-actions";
import { getAllVendors } from "@/actions/vendors-actions";
import Quotation from "@/components/Maintenance/quotation";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Maintenace({ params }) {
    const { id } = params;

    const [state, setState] = useState({
        vehicle: null,
        paymentTypes: [],
        maintenanceTypes: [],
        vendors: [],
        editableRecords: [],
        loading: true
    });

    useEffect(() => {
        const initializePage = async () => {
            try {
                const vehicle = await getVehicleBYId(id);
                const paymentTypes = await getAllPaymentTypes();
                const maintenanceTypes = await getEveryMaintenanceType();
                const vendors = await getAllVendors();
    
                console.log('data:', vehicle);
                setState({
                    vehicle: vehicle,
                    paymentTypes: paymentTypes,
                    maintenanceTypes: maintenanceTypes,
                    vendors: vendors,
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

    const handleAddQuotation = (newQuotation) => {
        setState((prevState) => ({
            ...prevState,
            vehicle: {
                ...prevState.vehicle,
                quotations: [...prevState.vehicle.quotations, newQuotation]
            },
            editableRecords: prevState.editableRecords.filter(record => record !== newQuotation)
        }));
    };

    if (state.loading) {
        return <div className="w-[95%] h-[25%] p-6 bg-white rounded-lg">Loading...</div>
    }

    // ------------------------------------------------------------------------------------------------

    return(
        <div className="w-[95%] p-6 bg-white rounded-lg overflow-y-auto">
            <div className="w-full">
                <p className={`text-[#606060] text-xl font-bold`}>Maintenance</p>
                
                <div className="mt-8 flex w-full">
                    <div className="w-3/4 pr-6 pl-12">
                        <div className="w-full grid grid-cols-2 gap-x-12 gap-y-6 pb-5 border-b border-black/25">
                            {[
                                {label: "Date", value: state.vehicle.purchaseDetails.boughtDate},
                                {label: "Vehicle No", value: state.vehicle.vehicle.vehicleNumber},
                                {label: "Make", value: state.vehicle.vehicle.make},
                                {label: "YOM", value: state.vehicle.vehicle.YearOfManufacture.slice(0, 4)},
                                {label: "CR", value: state.vehicle.vehicle.isCR},
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
                            <p className="mb-4 font-medium">Quotations</p>
                            {state.vehicle.listOfQuotations.map((record, index) => {
                                return(
                                    <Quotation 
                                        data={record}
                                        key={index}
                                        vehicleId={id}
                                        newRecord={false}
                                        editable={false}
                                        vendors={state.vendors}
                                        maintenanceTypes={state.maintenanceTypes}    
                                    />
                                )
                            })}
                            {state.editableRecords.map((_, index) => {
                                return(
                                    <Quotation 
                                        data={_}
                                        key={index} 
                                        vehicleId={id}
                                        vendors={state.vendors}
                                        maintenanceTypes={state.maintenanceTypes}
                                        newRecord={true}
                                        editable={true}
                                        deleteNewRecord={() => handleDeleteNewRecord(index)}
                                        onAddQuotation={handleAddQuotation}
                                    />
                                )
                            })}
                            <Button
                                className="w-full bg-transparent rounded-lg border border-black"
                                onClick={handleAddNewRecord}
                            >
                                Add Quotation
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