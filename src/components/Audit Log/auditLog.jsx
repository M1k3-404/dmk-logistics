import { users } from "@/data/static-data";
import { Chip } from "@nextui-org/react";

export default function AuditLog({description, timeDate, user}) {
    const userData = users.find((u) => u.id === user);

    const userName = userData ? userData.name : user;

    return(
        <div className="w-full p-2 my-1 bg-transparent rounded-lg border border-black">
            <p>
                <span>
                    <Chip size="sm" className="bg-violet-200 mr-2">{userName}</Chip>
                </span>
                {description}
            </p>

            <div className="w-full flex justify-end">
                <div className="flex gap-x-2">
                    <p className="text-xs">{timeDate.slice(11, 19)}</p>
                    <p className="text-xs">|</p>
                    <p className="text-xs">{timeDate.slice(0, 10)}</p>
                </div>
            </div>
        </div>
    )
}