import { memo } from "react"
import Account from "./account";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import AddVendorModal from "./addVendorModal";

const AccountsDashboard = ({ data, tab, reload }) => {
    console.log("1: ", data);

    return (
        <div className="w-full h-full">
            <p className="font-semibold">
                Active ({data.length})
            </p>

            <div className="mt-2 h-[250px] rounded-lg py-4 flex justify-center">
                <Carousel className="w-[95%]">
                    <CarouselContent>
                        {data.map((account, index) => (
                            <CarouselItem key={index} className="basis-1/3">
                                {tab === "account" ? (
                                    <Account key={index} name={account.account.accountName} balance={account.account.storeBalance} data={account.transactions} type={tab} />
                                ) : (
                                    <Account key={index} id={account.vendorInfo.id} name={account.vendorInfo.vendorName} balance={account.vendorInfo.totalDue} data={account.listOfQuotations} type={tab} />
                                )}
                            </CarouselItem>
                        ))}
                        {tab === "vendor" && (
                            <CarouselItem className="basis-1/3">
                                <AddVendorModal reload={reload} />
                            </CarouselItem>
                        )}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            {/* {tab === "vendor" && (
                <>
                    <p className="mt-6 font-semibold">Inactive ({})</p>

                    <div className="mt-2 min-w-full h-[250px] rounded-lg overflow-x-auto grid grid-cols-4 gap-x-4 py-4">
                        <Account name="Commercial Bank" balance={4000000} type={"vendor"} />
                    </div>
                </>
            )} */}
        </div>
    )
}

export default memo(AccountsDashboard);