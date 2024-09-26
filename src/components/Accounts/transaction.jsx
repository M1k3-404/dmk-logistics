import { memo } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const Transaction = ({ data }) => {
    const date = data.date.split("T")[0];

    return (
        <div className="w-full grid grid-cols-12 py-2 px-4 rounded-lg hover:border">
            <div className="col-span-2 text-left flex justify-start items-center gap-x-6">
                {data.isInflow ? <FaLongArrowAltRight className="text-green-400" /> : <FaLongArrowAltLeft className="text-red-400" />}
                <p>{date}</p>
            </div>

            <div className="col-span-7">
                <p>{data.description}</p>
            </div>

            <div className="col-span-3 text-right">
                <p>LKR {data.amount.toLocaleString()}.00</p>
            </div>
        </div>
    )
}

export default memo(Transaction);