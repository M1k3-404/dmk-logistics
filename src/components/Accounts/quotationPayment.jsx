import { memo, useEffect, useState } from "react"
import { Button } from "@nextui-org/react";
import { getAllPaymentTypes } from "@/actions/payment-types-actions";
import { CiCircleMinus } from "react-icons/ci";
import { deleteQuotationPayment } from "@/actions/quotation-payment-actions";

const QuotationPayment = ({ data }) => {
    const date = data.dateOfPayment.split("T")[0];
    const [paymentType, setPaymentType] = useState("");

    useEffect(() => {
        getPaymentType(data.paymentTypeId).then((paymentType) => {
            setPaymentType(paymentType);
        });
    }, []);

    const getPaymentType = async (id) => {
        const paymentTypes = await getAllPaymentTypes();
        const paymentType = paymentTypes.find((type) => type.id === id);
        return paymentType.paymentTitle;
    }

    return(
        <div className="w-full grid grid-cols-3 content-center place-items-stretch py-2 px-4 rounded-lg hover:border">
            <div className="col-span-1 text-left flex justify-start items-center gap-x-6">
                <p>{date}</p>
            </div>

            <div className="col-span-1 flex justify-start items-center">
                <p>{paymentType}</p>
            </div>

            <div className="col-span-1 text-left flex justify-start items-center">
                <p>LKR {data.paymentAmount}.00</p>
            </div>

            {/* <div className="col-span-1 flex justify-end items-center gap-x-6">
                <Button isIconOnly onClick={deleteQuotationPayment(data.id)}>
                    <CiCircleMinus className="hover:text-red-500" />
                </Button>
            </div> */}
        </div>
    )
}

export default memo(QuotationPayment);