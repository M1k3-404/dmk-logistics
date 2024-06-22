import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <p>DMK Transports</p>
            <div className="flex">
                <Button
                    as={Link}
                    href="/dashboard"
                >
                    Dashboard
                </Button>
            </div>
        </>
    );
}