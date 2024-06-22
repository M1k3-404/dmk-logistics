"use client"

import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    return(
        <div className="w-3/4 mt-32 mx-auto">
            <Input 
                type="text"
                placeholder="Username" 
                className="w-full mt-10" 
                variant="underlined"
                size="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
                type="password"
                placeholder="Password"
                className="w-full mt-5" 
                variant="underlined"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex mt-5 justify-between items-center">
                <Checkbox
                    size="sm"
                    radius="none"
                    classNames={{
                        label: "text-[#5d5d5d] text-sm"
                    }}
                    onValueChange={setRememberMe}
                >
                    Remember me
                </Checkbox>
                <p className="text-sm text-[#5d5d5d]">Forgot password?</p>
            </div>

            <Button
                as={Link}
                href="/dashboard"
                className="w-full bg-[#0c0c0c] text-white rounded-lg py-2 mt-16 hover:bg-[#1d1d1d]"
            >
                Login
            </Button>
        </div>
    )
}