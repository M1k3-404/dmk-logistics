"use client"

import { sidebarItems } from '@/data/static-data';
import { Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { memo, useCallback, useEffect, useState } from 'react';
import { CiMinimize2 } from 'react-icons/ci';

const Sidebar = () => {
    const [active, setActive] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('activeSidebarItem') || "Warehouse";
        }
        return "Warehouse";
    });

    const handleClick = useCallback((name) => {
        setActive(name);
        if (typeof window !== 'undefined') {
            return localStorage.setItem('activeSidebarItem', name);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedActiveItem = localStorage.getItem('activeSidebarItem');
            if (savedActiveItem) {
                setActive(savedActiveItem);
            }
        }
    }, []);

    return (
        <div className="h-screen w-12 border-r">
            <div className="flex flex-col items-center justify-center p-2">
                <div className='border-b-2 border-black/25 mt-1 p-1'>
                    <CiMinimize2 size={20} className='mb-2' />
                </div>
                <div className="flex flex-col mt-5 space-y-3">
                    {sidebarItems.map((item) => (
                        <Tooltip
                            key={item.name} 
                            content={item.name} 
                            placement='right' 
                            className='bg-violet-200 rounded-md backdrop-blur-lg backdrop-opacity-50 text-sm p-2'
                        >
                            <Link 
                                className={`flex items-center justify-center p-2 transition-all duration-300 cursor-pointer ${active === item.name ? "bg-violet-200 rounded-lg" : "hover:rounded-lg hover:bg-gray-200"}`} 
                                onClick={() => handleClick(item.name)}
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

export default memo(Sidebar);