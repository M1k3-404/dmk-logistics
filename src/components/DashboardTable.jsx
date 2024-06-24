import { Button, Input } from "@nextui-org/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useCallback, useMemo, useState } from "react";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import VehicleDeletionModal from "./Dashboard/vehicleDeletionModal";
import topContent from "./Dashboard/TableComponent/topContent";
import bottomContent from "./Dashboard/TableComponent/bottomContent";
import RestorationModal from "./Dashboard/restorationModal";
import Link from "next/link";
import SalesModal from "./Dashboard/salesModal";

export default function DashboardTable({tableHeaders, data, tab}) {
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [isRowOpen, setIsRowOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const hasSearchFilter = Boolean(filterValue);
  const rowsPerPage = 6;

  // handle search input value
  const onSearchChange = useCallback((value) => {
    if (value) {
        setFilterValue(value);
        setPage(1);
    } else {
        setFilterValue("");
    }
  }, []);

  // filter function
  const filteredItems = useMemo(() => {
    let filteredVehicles = [...data];

    if (hasSearchFilter) {
        filteredVehicles = filteredVehicles.filter((vehicle) =>
            vehicle.vehicleNo.toLowerCase().includes(filterValue.toLowerCase()) ||
            vehicle.document.toLowerCase().includes(filterValue.toLowerCase()) ||
            vehicle.date.toLowerCase().includes(filterValue.toLowerCase()) ||
            vehicle.make.toLowerCase().includes(filterValue.toLowerCase()) || 
            vehicle.yom.toLowerCase().includes(filterValue.toLowerCase())
        );
    }

    return filteredVehicles;
  }, [data, filterValue])

  // total pages
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  // pagination function
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  // Row Collapsible function
  const handleRowClick = useCallback((vehicle) => {
    setIsRowOpen(!isRowOpen);
    setSelectedRow(vehicle.id);
  }, [isRowOpen, selectedRow]);

  // vehicles: collapsed row component
  const renderCollapsedRow = useCallback((vehicle) => {
    return(
      <div className="w-full grid grid-cols-4 gap-x-2">
        <div className="col-span-3 flex flex-col">
          <div className="grid grid-cols-3 gap-y-4 p-5 border-b border-black/25">
            <Input
              isReadOnly
              classNames={{
                base: "bg-transparent",
                label: "mr-2",
                inputWrapper: "w-[25%] rounded-lg bg-[#f5f5f5]",
                input: "text-center text-sm text-[#0c0c0c]",
              }}
              defaultValue={vehicle.months}
              size="sm"
              variant="flat"
              label="Months"
              labelPlacement="outside-left"
            />
            
            <Input
              isReadOnly
              classNames={{
                base: "bg-transparent",
                label: "mr-2",
                inputWrapper: "w-[75%] rounded-lg bg-[#f5f5f5]",
                input: "text-center text-sm text-[#0c0c0c]",
              }}
              defaultValue={vehicle.cr}
              size="sm"
              variant="flat"
              label="CR"
              labelPlacement="outside-left"
            />

            <Input
              isReadOnly
              classNames={{
                base: "bg-transparent",
                label: "mr-2",
                inputWrapper: "w-[100%] rounded-lg bg-[#f5f5f5]",
                input: "text-center text-sm text-[#0c0c0c]",
              }}
              defaultValue={vehicle.purchasedFrom}
              size="sm"
              variant="flat"
              label="Purchased From"
              labelPlacement="outside-left"
            />

            <Input
              isReadOnly
              classNames={{
                base: "bg-transparent",
                label: "mr-2",
                inputWrapper: "w-[75%] rounded-lg bg-[#f5f5f5]",
                input: "text-center text-sm text-[#0c0c0c]",
              }}
              defaultValue={vehicle.coc}
              size="sm"
              variant="flat"
              label="COC"
              labelPlacement="outside-left"
            />
          </div>

          <div className="p-5 border-b border-black/25">
            <p className="my-2 font-medium">Payment Details</p>
            <Table className="w-[75%]">
              <TableHeader className="border-b border-black/25">
                <TableRow>
                  <TableHead className="text-black">Date</TableHead>
                  <TableHead className="text-black">Account</TableHead>
                  <TableHead className="text-black">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicle.payments.map((payment, index) => {
                  return(
                    <TableRow key={index}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.account}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          <div className="p-5">
            <p className="my-2 font-medium">Mainteneace Records</p>
            <Table className="w-[75%]">
              <TableHeader className="border-b border-black/25">
                <TableRow>
                  <TableHead className="text-black">Date</TableHead>
                  <TableHead className="text-black">Description</TableHead>
                  <TableHead className="text-black">Account</TableHead>
                  <TableHead className="text-black">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicle.maintenance.map((maintenance, index) => {
                  return(
                    <TableRow key={index}>
                      <TableCell>{maintenance.date}</TableCell>
                      <TableCell>{maintenance.description}</TableCell>
                      <TableCell>{maintenance.account}</TableCell>
                      <TableCell>{maintenance.amount}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="col-span-1 border-l border-black/25">
          <div className="h-full p-5 flex flex-col justify-end">
            <div className="w-full py-4 border-b border-black/25">
              <Button 
                as={Link}
                href={`/dashboard/payment/${vehicle.id}`}
                className="w-full bg-[#0c0c0c] text-white px-12 font-extralight rounded-md hover:bg-[#1d1d1d] " 
                size="sm"
              >
                Edit Payments
              </Button>
              <Button 
                as={Link}
                href={`/dashboard/maintenance/${vehicle.id}`}
                className="w-full bg-[#0c0c0c] text-white px-12 font-extralight rounded-md hover:bg-[#1d1d1d] mt-2" 
                size="sm"
              >
                Edit Maintenace
              </Button>
            </div>
            <Button 
              as={Link}
              href={`/dashboard/edit-vehicle/${vehicle.id}`}
              className="bg-white text-black px-12 font-extralight rounded-md hover:bg-[#fafafa] mt-4" 
              size="sm"
            >
              Edit Record
            </Button>

            <VehicleDeletionModal vehicle={vehicle} />
          </div>
        </div>
      </div>
    )
  });

  // sold vehicles: collapsed row component
  const renderSoldCollapsedRow = useCallback((vehicle) => {
    return(
      <div className="w-full grid grid-cols-4 gap-x-2">
        <div className="col-span-3 flex flex-col">
          <div className="grid grid-cols-2 gap-y-4 p-5 border-b border-black/25">
            <Input
              isReadOnly
              classNames={{
                base: "bg-transparent",
                label: "mr-2",
                inputWrapper: "w-[25%] rounded-lg bg-[#f5f5f5]",
                input: "text-center text-sm text-[#0c0c0c]",
              }}
              defaultValue={vehicle.months}
              size="sm"
              variant="flat"
              label="Months"
              labelPlacement="outside-left"
            />

            <Input
              isReadOnly
              classNames={{
                base: "bg-transparent",
                label: "mr-2",
                inputWrapper: "w-[100%] rounded-lg bg-[#f5f5f5]",
                input: "text-center text-sm text-[#0c0c0c]",
              }}
              defaultValue={vehicle.purchasedFrom}
              size="sm"
              variant="flat"
              label="Purchased From"
              labelPlacement="outside-left"
            />
          </div>

          <div className="p-5 border-b border-black/25">
            <p className="my-2 font-medium">Payment Details</p>
            <Table className="w-[75%]">
              <TableHeader className="border-b border-black/25">
                <TableRow>
                  <TableHead className="text-black">Date</TableHead>
                  <TableHead className="text-black">Account</TableHead>
                  <TableHead className="text-black">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicle.payments.map((payment, index) => {
                  return(
                    <TableRow key={index}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.account}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          <div className="p-5">
            <p className="my-2 font-medium">Mainteneace Records</p>
            <Table className="w-[75%]">
              <TableHeader className="border-b border-black/25">
                <TableRow>
                  <TableHead className="text-black">Date</TableHead>
                  <TableHead className="text-black">Description</TableHead>
                  <TableHead className="text-black">Account</TableHead>
                  <TableHead className="text-black">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicle.maintenance.map((maintenance, index) => {
                  return(
                    <TableRow key={index}>
                      <TableCell>{maintenance.date}</TableCell>
                      <TableCell>{maintenance.description}</TableCell>
                      <TableCell>{maintenance.account}</TableCell>
                      <TableCell>{maintenance.amount}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="col-span-1 border-l border-black/25">
          <div className="h-full p-5 flex flex-col justify-end">
                <SalesModal btnText={"Edit Record"} vehicle={vehicle} />
                <RestorationModal vehicle={vehicle} />
          </div>
        </div>
      </div>
    )
  });

  // vehicles: cell component
  const renderCell = useCallback((vehicle) => {
    return(
      <>
        <TableRow key={vehicle.id}>
          <TableCell>
            {
              isRowOpen && selectedRow === vehicle.id ? (
                <Button
                  isIconOnly
                  radius="full"
                  className="bg-transparent hover:bg-[#ebebeb]" 
                  onClick={() => handleRowClick(vehicle)}
                >
                  <GoChevronUp size={16} />
                </Button>
              ) : (
                <Button 
                  isIconOnly
                  radius="full"
                  className="bg-transparent hover:bg-[#ebebeb]"
                  onClick={() => handleRowClick(vehicle)}
                >
                  <GoChevronDown size={16} />
                </Button>
              )
            }
          </TableCell>
          <TableCell>{vehicle.date}</TableCell>
          <TableCell>{vehicle.vehicleNo}</TableCell>
          <TableCell>{vehicle.make}</TableCell>
          <TableCell>{vehicle.yom}</TableCell>
          <TableCell>{vehicle.document}</TableCell>
          <TableCell>{vehicle.pCost}</TableCell>
          <TableCell>{vehicle.pRemaining}</TableCell>
          <TableCell>{vehicle.totalCost}</TableCell>
          <TableCell>{vehicle.sellingPrice}</TableCell>
          <TableCell>            
            <SalesModal btnText={"Sell"} vehicle={vehicle} />
          </TableCell>
        </TableRow>
        {
          isRowOpen && selectedRow === vehicle.id && (
            <TableRow>
              <TableCell colspan="11" className="rounded-b-lg bg-[#ebebeb]">
                {renderCollapsedRow(vehicle)}
              </TableCell>
            </TableRow>
          )
        }
      </>
    )
  })

  // sold vehicles: cell component
  const renderSoldCell = useCallback((vehicle) => {
    return(
      <>
        <TableRow key={vehicle.id}>
          <TableCell>
            {
              isRowOpen && selectedRow === vehicle.id ? (
                <Button
                  isIconOnly
                  radius="full"
                  className="bg-transparent hover:bg-[#ebebeb]" 
                  onClick={() => handleRowClick(vehicle)}
                >
                  <GoChevronUp size={16} />
                </Button>
              ) : (
                <Button 
                  isIconOnly
                  radius="full"
                  className="bg-transparent hover:bg-[#ebebeb]"
                  onClick={() => handleRowClick(vehicle)}
                >
                  <GoChevronDown size={16} />
                </Button>
              )
            }
          </TableCell>
          <TableCell>{vehicle.date}</TableCell>
          <TableCell>{vehicle.vehicleNo}</TableCell>
          <TableCell>{vehicle.make}</TableCell>
          <TableCell>{vehicle.yom}</TableCell>
          <TableCell>{vehicle.document}</TableCell>
          <TableCell>{vehicle.pCost}</TableCell>
          <TableCell>{vehicle.totalCost}</TableCell>
          <TableCell>{vehicle.sellingPrice}</TableCell>
          <TableCell>{vehicle.buyer}</TableCell>
        </TableRow>
        {
          isRowOpen && selectedRow === vehicle.id && (
            <TableRow>
              <TableCell colspan="11" className="rounded-b-lg bg-[#ebebeb]">
                {renderSoldCollapsedRow(vehicle)}
              </TableCell>
            </TableRow>
          )
        }
      </>
    )
  })

  return(
    <>
      {topContent({filterValue, setFilterValue, onSearchChange})}

      <Table className="mt-2">
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
          {items.map(
            tab === "vehicles" ? renderCell : renderSoldCell
          )}
        </TableBody>
      </Table>

      {bottomContent({page, pages, setPage})}
    </>
  )
}