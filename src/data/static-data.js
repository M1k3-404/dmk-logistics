import { CiDeliveryTruck, CiDollar, CiSettings } from "react-icons/ci";
import { RiMoneyDollarCircleFill, RiSettings5Fill, RiTruckFill } from "react-icons/ri";

const sidebarItems = [
    {
        name: "Warehouse",
        icon: <CiDeliveryTruck size={20} />,
    },

    {
        name: "Accounts",
        icon: <CiDollar size={20} />,
    },

    {
        name: "Settings",
        icon: <CiSettings size={20} />,
    },
];

const vehicleTableHeads = [
    "",
    "Date",
    "Vehicle No",
    "Make",
    "YOM",
    "Document",
    "P/Cost",
    "P/Remaining",
    "Total Cost",
    "Selling Price",
    "",
];

const soldVehicleTableHeads = [
    "",
    "Date",
    "Vehicle No",
    "Make",
    "YOM",
    "Document",
    "P/Cost",
    "Total Cost",
    "Selling Price",
    "Buyer's Name",
];

export { sidebarItems, vehicleTableHeads, soldVehicleTableHeads };