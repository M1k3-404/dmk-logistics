"use client"

import { getAllAuditLogs } from "@/actions/audit-log-actions";
import AuditLog from "@/components/Audit Log/auditLog";
import { auditLogs } from "@/components/vehicleData";
import { BreadcrumbItem, Breadcrumbs, Input } from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function Page() {
    const [auditLogs, setAuditLogs] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const hasSearchFilter = Boolean(filterValue);

    useEffect(() => {
        getAllAuditLogs()
            .then(((data) => {
                setAuditLogs(data);
                console.log("Audit Logs Data:", data);
            }))
    }, []);

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
                <p className={`text-[#606060] text-xl font-bold`}>Audit Logs</p>

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

                    <div className="mt-4 w-full">
                        {filteredLogs.map((log, index) => {
                            return (
                                <AuditLog
                                    key={index}
                                    description={log.description}
                                    timeDate={log.loggedAt}
                                    user={log.userId}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}