import PaymentDeletionModal from "./paymentDeletionModal";

export default function PaymentMethod({ data }) {
    return(
        <div className="w-full rounded-lg bg-transparent border border-black flex items-center justify-between my-1"> 
            <p className="ml-5">{data.paymentTitle}</p>
            <PaymentDeletionModal id={data.id} />
        </div>
    )
}