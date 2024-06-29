import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Page404() {
    return(
        <div className="flex flex-col bg-[#0c0c0c] items-center justify-center h-screen">
            <p className="text-9xl font-black text-white">404</p>
            <p className="text-4xl text-white font-bold">Page not found</p>
            <Button
                as={Link}
                href="/dashboard"
                className="bg-white text-black px-20 font-light rounded-md hover:bg-[#fafafa] mt-6"
                size="sm"
            >
                Go Back Home
            </Button>
        </div>
    )
}