'use client'

import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, Button } from "@nextui-org/react";
import { memo, useEffect, useState } from "react";
import { LogOut } from "@/actions/user-actions";

const UserMenu = () => {
    const [session, setSession] = useState(JSON.parse("{}"));

    useEffect(() => {
        if (typeof window !== "undefined") {
            const session = localStorage.getItem("session");

            if (session) {
                setSession(JSON.parse(session));
            }
        }
    }, [])

    const getInitials = (name) => {
        if (!name) return '';
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('');
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer">
                    <Avatar name={session ? getInitials(session.userName) : ''} size="sm" className="rounded-lg bg-violet-200 text-sm" />
                    <p className="ml-2 font-light">{session ? session.userName : "Guest"}</p>
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
                    <Button className="hover:bg-red-500 hover:text-white w-full text-left" size="sm" onClick={() => LogOut()}>Logout</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default memo(UserMenu);