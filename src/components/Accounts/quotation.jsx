import { Button } from "@nextui-org/react";
import { memo, useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Chip } from "@nextui-org/react";
import { getVehicleBYId } from "@/actions/vehicle-actions";
import { getAllMaintenanceTypes } from "@/actions/maintenance-types-actions";
import QuotationPayment from "./quotationPayment";
import { getAllPaymentTypes, getEveryPaymentType } from "@/actions/payment-types-actions";
import AddQuotationPaymentModal from "./addQuotationPaymentModal";

const Quotation = ({ data }) => {
    console.log('Quotation:', data);
    const isCompleted = data.quotationInformation.isCompleted;
    const date = data.quotationInformation.quotationDate.split("T")[0];
    const [vehicleNo, setVehicleNo] = useState("");
    const [maintenanceType, setMaintenanceType] = useState("");
    const [paymentTypes, setPaymentTypes] = useState([]);

    useEffect(() => {
        getVehicleNo(data.quotationInformation.vehicleId).then((vehicleNo) => {
            setVehicleNo(vehicleNo);
        });

        getMaintenanceType(data.quotationInformation.maintenanceTypeId).then((maintenanceType) => {
            setMaintenanceType(maintenanceType);
        });

        getPaymentTypes();
    }, [data]);

    const getMaintenanceType = async (id) => {
        const maintenanceTypes = await getAllMaintenanceTypes();
        const maintenanceType = maintenanceTypes.find((type) => type.id === id);
        return maintenanceType.maintenanceTypeName;
    }

    const getVehicleNo = async (id) => {
        const vehicle = await getVehicleBYId(id);
        return vehicle.vehicle.vehicleNumber;
    }

    const getPaymentTypes = async () => {
        const paymentTypes = await getEveryPaymentType();
        setPaymentTypes(paymentTypes);
    }

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger className="rounded-lg hover:no-underline hover:border px-2">
                    <div className="w-full grid grid-cols-11 content-center place-items-stretch px-4 rounded-lg">
                        <div className="col-span-2 text-left flex justify-start items-center gap-x-6">
                            <FaCircleCheck className={!isCompleted && "invisible"} />
                            <p>{date}</p>
                        </div>

                        <div className="col-span-2 text-left">
                            <Chip className="bg-violet-200">{vehicleNo}</Chip>
                        </div>

                        <div className="col-span-3 text-left">
                            <p>{maintenanceType}</p>
                        </div>

                        <div className="col-span-2 text-left">
                            <p>LKR {data.quotationInformation.quotedAmount.toLocaleString()}.00</p>
                        </div>

                        <div className="col-span-2 text-left text-red-500">
                            <p>LKR {data.quotationInformation.dueAmount.toLocaleString()}.00</p>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-12">
                    <AddQuotationPaymentModal data={data} paymentTypes={paymentTypes} />
                    {data.listOfQuotationPayments.map((record, index) => (
                        <QuotationPayment data={record} key={index} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default memo(Quotation);