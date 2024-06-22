import PaymentDeletionModal from "./paymentDeletionModal";

export default function PaymentMethod({ account, onDelete }) {
    return(
        <div className="w-full rounded-lg bg-transparent border border-black flex items-center justify-between my-1"> 
            <p className="ml-5">{account}</p>
            <PaymentDeletionModal onDelete={onDelete} />
        </div>
    )
}