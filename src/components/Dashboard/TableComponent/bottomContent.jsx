import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Button } from "@nextui-org/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useMemo } from "react";

const BottomContent = ({page, pages, setPage}) => useMemo(() => {
    const clampedPages = Math.max(1, pages);

    return(
        <Pagination className="flex justify-end py-3">
            <PaginationContent>
                <PaginationItem>
                    <Button
                        isIconOnly
                        className="cursor-pointer rounded-md hover:bg-gray-200 active:bg-transparent active:border"
                        onClick={() => setPage(page-1)}
                        isDisabled={page <= 1}
                    >
                        <HiChevronLeft />
                    </Button>
                </PaginationItem>
                {
                    Array.from({length: clampedPages}, (_, i) => (
                        <PaginationItem key={i} onClick={() => setPage(i + 1)}>
                            <PaginationLink className="cursor-pointer" isActive={i + 1 === page}>{i + 1}</PaginationLink>
                        </PaginationItem>
                    ))
                }
                <PaginationItem>
                    <Button
                        isIconOnly
                        className="cursor-pointer rounded-md hover:bg-gray-200 active:bg-transparent active:border"
                        onClick={() => setPage(page + 1)}
                        isDisabled={page >= clampedPages}
                    >
                        <HiChevronRight />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
});

export default BottomContent;