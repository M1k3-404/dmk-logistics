import Tabs from "@/components/Accounts/tabs";
import { memo } from "react"

const Page = () => {
    return (
        <div className="w-[97%] h-[95%] bg-white rounded-lg">
            <Tabs />
        </div>
    )
}

export default memo(Page);