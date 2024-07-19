import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-w-screen min-h-screen bg-[#202125] flex p-20 space-x-5">
            <Button 
                as={Link}
                href="/dashboard"
                className="bg-[#27282c] text-white text-lg font-medium rounded-md border border-white/25 p-24 hover:bg-[#292a2e] hover:shadow-sm hover:shadow-white/25 transition-all duration-100"
            >
                Dashboard
            </Button>

            <Button 
                as={Link}
                href="/dashboard"
                className="bg-[#27282c] text-white text-lg font-medium rounded-md border border-white/25 p-24 hover:bg-[#292a2e] hover:shadow-sm hover:shadow-white/25 transition-all duration-100"
            >
                Accounts
            </Button>
        </div>
    );
}