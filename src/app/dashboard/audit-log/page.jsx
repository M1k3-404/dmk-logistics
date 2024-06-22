"use client"

import AuditLog from "@/components/Audit Log/auditLog";
import { auditLogs } from "@/components/vehicleData";
import { BreadcrumbItem, Breadcrumbs, Input } from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function Page() {
    const [filterValue, setFilterValue] = useState("");
    const hasSearchFilter = Boolean(filterValue);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
        } else {
            setFilterValue("");
        }
    }, []);

    const filteredLogs = useMemo(() => {
        let filteredLogs = auditLogs;

        if(hasSearchFilter) {
            filteredLogs = filteredLogs.filter((log) =>
                log.description.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        return filteredLogs;
    }, [auditLogs, filterValue]);

    return (
        <div className="w-[95%] max-h-[95%] p-6 bg-white rounded-lg overflow-y-auto">
            <div className="w-full">
                <Breadcrumbs
                    separator="/"
                    itemClasses={{
                        separator: "text-xl font-bold px-2"
                    }}
                >
                    <BreadcrumbItem>
                        <p className={`text-[#606060] text-xl font-bold`}>Settings</p>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <p className={`text-[#606060] text-xl font-bold`}>Audit Log</p>
                    </BreadcrumbItem>
                </Breadcrumbs>

                <div className="mt-8 w-[90%] mx-auto">
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full bg-transparent",
                            inputWrapper: "rounded-lg bg-[#f5f5f5]",
                            innerWrapper: "px-1",
                        }}
                        placeholder="Search"
                        size="md"
                        variant="flat"
                        startContent={<IoIosSearch className="mr-1" />}
                        value={filterValue}
                        onClear={() => setFilterValue("")}
                        onValueChange={onSearchChange}
                    />

                    <div className="mt-4 w-full min-h-full overflow-y-auto">
                        {filteredLogs.map((log, index) => {
                            return (
                                <AuditLog
                                    key={index}
                                    description={log.description}
                                    time={log.time}
                                    date={log.date}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}