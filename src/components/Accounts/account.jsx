import { Button } from "@nextui-org/react";
import Link from "next/link";
import { memo } from "react";

const Account = ({ id, name, balance, data, type }) => {
    const encodedData = encodeURIComponent(JSON.stringify(data));

    return (
        <Button 
            className="w-full h-full bg-[#f4f4f4] rounded-lg text-center flex-col hover:bg-[#0c0c0c] hover:text-white"
            as={Link}
            href={ type === "account" ? {
                pathname: `/accounts/account/${name}`,
                query: { name: name, balance: balance, transactions: encodedData }
            } : {
                pathname: `/accounts/vendor/${id}`,
                query: { name: name, balance: balance, quotations: encodedData }
            }}
        >
            <p className="text-3xl mt-20 font-bold">{balance}.00</p>
            <p className="mt-8 mb-4 text-lg font-medium">{name}</p>
        </Button>
    );
}

export default memo(Account);