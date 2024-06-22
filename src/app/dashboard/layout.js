import { Inter } from "next/font/google";
import "../globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <NextUIProvider>
            <body className={`${inter.className} h-screen w-screen`}>
                <Header />

                <div className="w-screen h-screen bg-[#f1f1f1] flex justify-center items-center pt-14">
                    {children}
                </div>
            </body>
        </NextUIProvider>
        </html>
    );
}
