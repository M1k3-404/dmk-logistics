export default function AuditLog({description, time, date}) {
    return(
        <div className="w-full p-2 my-1 bg-transparent rounded-lg border border-black">
            <p>{description}</p>

            <div className="w-full flex justify-end">
                <div className="flex gap-x-2">
                    <p className="text-xs">{time}</p>
                    <p className="text-xs">|</p>
                    <p className="text-xs">{date}</p>
                </div>
            </div>
        </div>
    )
}