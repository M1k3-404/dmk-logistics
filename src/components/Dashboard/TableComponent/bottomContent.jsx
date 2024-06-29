import { Pagination } from "@nextui-org/react";
import { useMemo } from "react";

const bottomContent = ({page, pages, setPage}) => useMemo(() => {
    return(
        <Pagination
            showControls
            classNames={{
            base: "w-full flex justify-end items-center mt-1",
            wrapper: "bg-transparent p-1 gap-1",
            prev: "rounded-md border text-[#0c0c0c] hover:bg-[#0c0c0c] hover:text-white",
            next: "rounded-md border text-[#0c0c0c] hover:bg-[#0c0c0c] hover:text-white",
            item: "bg-transparent border rounded-md text-[#0c0c0c] hover:bg-[#0c0c0c] hover:text-white",
            cursor: "bg-[#0c0c0c] text-white rounded-md",
            }}
            variant="flat"
            size="sm"
            page={page}
            total={pages}
            onChange={setPage}
        />  
    )
});

export default bottomContent;