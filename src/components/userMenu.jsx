import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar } from "@nextui-org/react";
import { memo } from "react";

const UserMenu = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer">
                    <Avatar name="DW" size="sm" className="rounded-lg bg-violet-200 text-sm" />
                    <p className="ml-2 font-light">Dilruksh Wickramarathne</p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-3 px-8 py-4">
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-light">Quick Links</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/add-vehicle">Add Vehicle</Link>
                    </DropdownMenuItem>           
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard">Accounts</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/settings">Settings</Link>
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

export default memo(UserMenu);