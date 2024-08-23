import bottomContent from "./Dashboard/TableComponent/bottomContent";
import TopContent from "./Dashboard/TableComponent/topContent";
import VehicleRow from "./Dashboard/TableComponent/VehicleRow";
import { useState, useCallback, useMemo } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";

const DashboardTable = ({ tableHeaders, data, tab, reload }) => {
    const [filterValue, setFilterValue] = useState("");
    const [page, setPage] = useState(1);
    const [selectedVehicles, setSelectedVehicles] = useState([]);

    const hasSearchFilter = Boolean(filterValue);
    const rowsPerPage = 7;

    const handleToggle = (vehicleId) => {
        setSelectedVehicles((prevSelected) => {
            if (prevSelected.includes(vehicleId)) {
                return prevSelected.filter((id) => id !== vehicleId);
            } else {
                return [vehicleId];
            }
        })
    };

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const filteredItems = useMemo(() => {
        let filteredItems = [...data];

        if (hasSearchFilter) {
            filteredItems = filteredItems.filter((vehicle) =>
                vehicle.vehicleNo.toLowerCase().includes(filterValue.toLowerCase()) ||
                vehicle.document.toLowerCase().includes(filterValue.toLowerCase()) ||
                vehicle.date.toLowerCase().includes(filterValue.toLowerCase()) ||
                vehicle.make.toLowerCase().includes(filterValue.toLowerCase()) || 
                vehicle.yom.toLowerCase().includes(filterValue.toLowerCase())
            );       
        }

        return filteredItems;
    }, [data, filterValue]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems]);

    return (
        <>
            {TopContent({ filterValue, setFilterValue, onSearchChange, filteredItems})}

            <Table className="mt-3 mb-4">
                <TableHeader>
                    <TableRow>
                        {tableHeaders.map((head, index) => {
                            return(
                                <TableHead key={index}>{head}</TableHead>
                            )
                        })}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {items.map(vehicle => (
                        tab === "vehicles" ? (
                            <VehicleRow
                                key={vehicle.id}
                                vehicle={vehicle}
                                isSelected={selectedVehicles.includes(vehicle.vehicle.id)}
                                onToggle={handleToggle}
                                isSold={false}
                                reload={reload}
                            />
                        ) : (
                            <VehicleRow
                                key={vehicle.id}
                                vehicle={vehicle}
                                isSelected={selectedVehicles.includes(vehicle.vehicle.id)}
                                onToggle={handleToggle}
                                isSold={true}
                                reload={reload}
                            />
                        )
                        
                    ))}
                </TableBody>
            </Table>

            {bottomContent({ page, pages, setPage })}
        </>
    )
}

export default DashboardTable;