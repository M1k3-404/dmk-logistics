import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar } from "@nextui-org/react";

export default function UserMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer">
                    <Avatar name="DW" size="sm" className="rounded-lg bg-violet-200 text-sm" />
                    <p className="ml-2 font-light">Dilruksh Wickramarathne</p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-3 p-4">
                <DropdownMenuGroup>
                    {/* <DropdownMenuItem>Theme</DropdownMenuItem> */}             
                    <DropdownMenuItem asChild>
                        <Link href="/">Home</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-light">Settings</DropdownMenuLabel>
                    <DropdownMenuItem className="mt-1 py-2" asChild>
                        <Link href="/dashboard/add-payment-methods">Add Payment Methods</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-2" asChild>
                        <Link href="/dashboard/audit-log">Audit Log</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500" asChild>
                    <Link href="/login">Logout</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}