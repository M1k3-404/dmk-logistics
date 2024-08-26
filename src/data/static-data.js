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
    "Sold Price",
    "Buyer's Name",
];

const users = [
    {
        id: 0,
        name: "Admin",
        role: "Admin",
        password: "Adm830@DMK24"
    },

    {
        id: 1,
        name: "Dilruksh Wickramarathne",
        role: "Owner",
        password: "DW125@DMK24"
    },

    {
        id: 2,
        name: "Lilan Wickramarathne",
        role: "User",
        password: "LW692@DMK24"
    },

    {
        id: 3,
        name: "Ravi Mahagedara",
        role: "User",
        password: "RM381@DMK24"
    },
]

export { sidebarItems, vehicleTableHeads, soldVehicleTableHeads, users };