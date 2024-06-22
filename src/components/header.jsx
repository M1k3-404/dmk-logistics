import UserMenu from "./userMenu";

export default function Header() {
    return ( 
        <header className="absolute top-0 w-screen bg-white text-[#0c0c0c] p-5 flex justify-between rounded-b-lg">
            <p className="mx-2">DMK Auto</p>
            <UserMenu />
        </header>
    );
}