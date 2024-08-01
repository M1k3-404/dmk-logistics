"use client"

import { sidebarItems } from '@/data/static-data';
import { Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';
import { CiMinimize2 } from 'react-icons/ci';

export default function Sidebar() {
    const [active,setActive] = useState("Warehouse");

    return (
        <div className="h-screen w-12 border-r">
            <div className="flex flex-col items-center justify-center p-2">
                <div className='border-b-2 border-black/25 mt-1 p-1'>
                    <CiMinimize2 size={20} className='mb-2' />
                </div>
                <div className="flex flex-col mt-5 space-y-3">
                    {sidebarItems.map((item, index) => (
                        <Tooltip key={index} content={item.name} placement='right' className='bg-violet-200 rounded-md backdrop-blur-lg backdrop-opacity-50 text-sm p-2'>
                            <Link 
                                className={`flex items-center justify-center p-2 transition-all duration-300 cursor-pointer ${active === item.name ? "bg-violet-200 rounded-lg" : "hover:rounded-lg hover:bg-gray-200"}`} 
                                onClick={() => setActive(item.name)}
                                href={item.path}
                            >
                                {item.icon}
                            </Link>
                        </Tooltip>
                    ))}
                </div>
            </div>
        </div>
    )
}