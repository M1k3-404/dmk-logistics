import { Button } from "@nextui-org/react";
import Link from "next/link";
import { CiCreditCard1, CiGrid32, CiPassport1, CiSettings } from "react-icons/ci";

export default function Settings() {
    return (
        <div className="w-[97%] h-[95%] bg-white rounded-lg overflow-y-auto">
            <div className="w-full h-full p-8">
                <p className={`text-[#606060] text-2xl font-bold flex items-center`}>
                    <span className="mr-3 border border-[#606060] rounded-lg p-1"><CiSettings /></span>
                    Settings
                </p>

                <div className="mt-8 w-full space-y-1">
                    <Button 
                        as={Link}
                        href="/settings/payment-methods"
                        className="w-full flex items-center justify-start border border-black rounded-lg p-2 hover:bg-black hover:text-white"
                    >
                        <CiCreditCard1 size={21} className="mx-4" />
                        <p>Payment Methods</p>
                    </Button>
                    <Button 
                        as={Link}
                        href="/settings/maintenance-types"
                        className="w-full flex items-center justify-start border border-black rounded-lg p-2 hover:bg-black hover:text-white"
                    >
                        <CiPassport1 size={21} className="mx-4" />
                        <p>Maintenance Type</p>
                    </Button>
                    <Button
                        as={Link}
                        href="/settings/audit-log"
                        className="w-full flex items-center justify-start border border-black rounded-lg p-2 hover:bg-black hover:text-white"
                    >
                        <CiGrid32 size={21} className="mx-4" />
                        <p>Audit Log</p>
                    </Button>
                </div>
            </div>
        </div>
    )
}