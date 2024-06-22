import { useMemo } from "react";
import { IoIosSearch } from "react-icons/io";
const { Input } = require("@nextui-org/react");

const topContent = ({filterValue, setFilterValue, onSearchChange}) => useMemo(() => {
    return(
        <div className="flex justify-between">
            <Input
                isClearable
                classNames={{
                    base: "w-[85%] bg-transparent",
                    inputWrapper: "rounded-lg bg-[#f5f5f5]",
                    innerWrapper: "px-1",
                }}
                placeholder="Search"
                size="sm"
                variant="flat"
                startContent={<IoIosSearch className="mr-1" />}
                value={filterValue}
                onClear={() => setFilterValue("")}
                onValueChange={onSearchChange}
            />

            <Input
                isReadOnly
                classNames={{
                    base: "w-[12%] bg-transparent",
                    label: "mr-2",
                    inputWrapper: "rounded-lg bg-[#f5f5f5]",
                    input: "text-center text-sm font-semibold text-[#0c0c0c]",
                }}
                defaultValue={12}
                size="sm"
                variant="flat"
                label="Vehicles"
                labelPlacement="outside-left"
            />
        </div>
    )
});

export default topContent;