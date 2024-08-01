import { CiDeliveryTruck, CiDollar, CiSettings } from "react-icons/ci";

const sidebarItems = [
    {
        name: "Warehouse",
        icon: <CiDeliveryTruck size={20} />,
        path: "/dashboard",
    },

    {
        name: "Accounts",
        icon: <CiDollar size={20} />,
        path: "/accounts",
    },

    {
        name: "Settings",
        icon: <CiSettings size={20} />,
        path: "/settings",
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
    "Date of Sale",
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