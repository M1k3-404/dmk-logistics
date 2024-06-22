import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <NextUIProvider>
            <body className={`${inter.className} h-screen w-screen`}>
                {children}
            </body>
        </NextUIProvider>
        </html>
    );
}
