import { memo } from "react";
import UserMenu from "./userMenu";

const Header = () => {
    return ( 
        <header className="h-[6%] bg-white text-[#0c0c0c] pr-4 flex justify-end items-center">
            <UserMenu />
        </header>
    );
}

export default memo(Header);