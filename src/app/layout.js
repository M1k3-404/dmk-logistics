import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <NextUIProvider>
            <body className={`${inter.className} h-screen w-screen`}>
                {children}
                <Toaster position="bottom-right" />
            </body>
        </NextUIProvider>
        </html>
    );
}
