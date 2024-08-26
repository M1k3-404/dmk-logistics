import { Inter } from "next/font/google";
import "../globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { memo } from "react";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children}) => {
    return (
        <div className={`${inter.className} h-screen w-screen flex justify-start`}>
            <Sidebar />
            <div className="h-screen w-full bg-blue-200 flex-col overflow-x-hidden">
                <Header />
                <div className="h-[94%] w-full flex justify-center items-center bg-[#f1f1f1]">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default memo(Layout);